import * as THREE from 'three';

import type { OceanEnvironmentSettings } from '@/types/oceanEnvironment';
type PatchedWater = {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  fragment: string;
  sunDirection: THREE.Vector3;
};

const clamp = (value: unknown, fallback: number, min: number, max: number) => typeof value === 'number' && Number.isFinite(value) ? THREE.MathUtils.clamp(value, min, max) : fallback;
const validColor = (value: unknown, fallback: string) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
const names = ['labSceneColor', 'labSceneDepth', 'labResolution', 'labNearFar', 'labAbove', 'labClarity', 'labNearRadius', 'labDeepColor', 'labShallowColor'];

const gradientDeclarations = /* glsl */ `
uniform sampler2D labSceneColor;
uniform sampler2D labSceneDepth;
uniform vec2 labResolution;
uniform vec2 labNearFar;
uniform float labAbove;
uniform float labClarity;
uniform float labNearRadius;
uniform vec3 labDeepColor;
uniform vec3 labShallowColor;
float labViewDistance(float depth) {
  return labNearFar.x * labNearFar.y / (labNearFar.y - depth * (labNearFar.y - labNearFar.x));
}
`;
const scatterToken = 'vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;';
const scatterReplacement = /* glsl */ `
float labNear = 1.0 - smoothstep(labNearRadius * .2, labNearRadius, length(worldToEye.xz));
vec3 labTint = mix(waterColor, mix(labDeepColor, labShallowColor, labNear), labAbove);
vec3 scatter = max(0.0, dot(surfaceNormal, eyeDirection)) * labTint;
`;
const outgoingToken = 'vec3 outgoingLight = albedo;';
const transmissionReplacement = /* glsl */ `
if (labAbove > .5) {
  vec2 labUv = clamp(gl_FragCoord.xy / max(labResolution, vec2(1.0)), vec2(.001), vec2(.999));
  float labWaterView = -(viewMatrix * vec4(worldPosition.xyz, 1.0)).z;
  float labDepth = texture2D(labSceneDepth, labUv).x;
  float labSceneView = labViewDistance(labDepth);
  float labValid = step(labWaterView + .04, labSceneView) * (1.0 - step(.9999999, labDepth));
  float labPath = max(0.0, labSceneView - labWaterView) * length(worldToEye) / max(.1, labWaterView);
  vec3 labViewNormal = (viewMatrix * vec4(surfaceNormal, 0.0)).xyz;
  vec2 labBentUv = clamp(labUv + labViewNormal.xy * .003, vec2(.001), vec2(.999));
  float labBentDepth = labViewDistance(texture2D(labSceneDepth, labBentUv).x);
  labBentUv = mix(labUv, labBentUv, step(labWaterView + .04, labBentDepth));
  vec3 labScene = texture2D(labSceneColor, labBentUv).rgb;
  vec3 labTransmission = exp(-vec3(.018, .007, .003) * min(labPath, 2500.0) * mix(3.6, .55, labClarity));
  vec3 labThrough = labScene * labTransmission + labTint * (vec3(1.0) - labTransmission);
  vec3 labOriginalDiffuse = (sunColor * diffuseLight * .3 + scatter) * getShadowMask();
  // Replace only part of the diffuse lobe. The original reflection term,
  // Fresnel, normal noise, specular response and shadow mask remain intact.
  albedo += (labThrough - labOriginalDiffuse) * (labAbove * labNear * labClarity * labValid) * (1.0 - reflectance);
  // Grey sky reflections must not bleach the whole distant water body. This
  // is a chromatic absorption filter, not a flat replacement: every ripple,
  // shadow and reflected silhouette retains its original spatial contrast.
  float labHorizontal = length(worldToEye.xz);
  float labFarBody = smoothstep(labNearRadius * .35, labNearRadius * 2.5, labHorizontal);
  float labGrazing = 1.0 - smoothstep(.006, .035, abs(eyeDirection.y));
  float labHorizon = labGrazing * smoothstep(1200.0, 3500.0, labHorizontal);
  vec3 labBlueRatio = labDeepColor / max(.0001, max(labDeepColor.r, max(labDeepColor.g, labDeepColor.b)));
  // Preserve a navy/blue response rather than magnifying a violet cast when
  // the selected deep tint's green channel is very small.
  labBlueRatio.g = max(labBlueRatio.g, labBlueRatio.b * .28);
  vec3 labBlueFiltered = albedo * mix(vec3(1.0), labBlueRatio, .88) + labDeepColor * .10;
  albedo = mix(albedo, labBlueFiltered, labFarBody * (1.0 - labHorizon) * .94);
}
vec3 outgoingLight = albedo;
`;

/** A narrow above-water extension over the original Ocean scene.
 * No vertex/geometry edits, replacement renderer, model or underwater changes. */
export function createOriginalWaterAdapter({ scene, gl }: { scene: THREE.Scene; gl: THREE.WebGLRenderer }) {
  const size = new THREE.Vector2();
  const viewport = new THREE.Vector4();
  const scissor = new THREE.Vector4();
  const direction = new THREE.Vector3(500, 200, -300).normalize();
  const target = new THREE.WebGLRenderTarget(1, 1, {
    minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    type: gl.extensions.has('EXT_color_buffer_float') ? THREE.HalfFloatType : THREE.UnsignedByteType,
    depthBuffer: true,
  });
  target.texture.generateMipmaps = false;
  target.texture.colorSpace = THREE.LinearSRGBColorSpace;
  target.depthTexture = new THREE.DepthTexture(1, 1, THREE.UnsignedIntType);
  target.depthTexture.minFilter = target.depthTexture.magFilter = THREE.NearestFilter;
  target.samples = Math.min(4, gl.capabilities.maxSamples ?? 4);
  let water: PatchedWater | null = null;
  let sky: THREE.ShaderMaterial | null = null;
  let skySunBefore: THREE.Vector3 | null = null;
  let disposed = false;

  const sunMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: true, side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { sunTint: { value: new THREE.Color('#fff1cb') } },
    vertexShader: 'varying vec2 labSunUv;void main(){labSunUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: `varying vec2 labSunUv;uniform vec3 sunTint;void main(){
      float r=length((labSunUv-.5)*2.0);
      float disc=1.0-smoothstep(.065,.078,r);
      float halo=exp(-r*r*18.0)*.12;
      gl_FragColor=vec4(sunTint,max(disc,halo));
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  });
  const sun = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), sunMaterial);
  sun.name = 'Ocean — small visible sun';
  sun.frustumCulled = false;
  sun.renderOrder = 1;
  sun.onBeforeRender = (_renderer, _scene, renderCamera) => {
    sun.quaternion.copy(renderCamera.quaternion);
    sun.updateMatrixWorld();
  };
  scene.add(sun);

  function findOriginals() {
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh || Array.isArray(mesh.material)) return;
      const material = mesh.material as THREE.ShaderMaterial;
      const uniforms = material.uniforms;
      if (!uniforms) return;
      if (!sky && uniforms.sunPosition && uniforms.turbidity && uniforms.rayleigh) {
        sky = material;
        skySunBefore = uniforms.sunPosition.value.clone();
      }
      if (water || !uniforms.rippleSampler || !uniforms.mirrorSampler || !uniforms.waterColor) return;
      if (!material.fragmentShader.includes(scatterToken) || !material.fragmentShader.includes(outgoingToken)) return;
      water = { mesh, material, fragment: material.fragmentShader, sunDirection: uniforms.sunDirection.value.clone() };
      // Intentionally preserve original material identity, vertex shader,
      // original ripple injection, render order, alpha and depth flags.
      material.fragmentShader = gradientDeclarations + material.fragmentShader.replace(scatterToken, scatterReplacement).replace(outgoingToken, transmissionReplacement);
      Object.assign(uniforms, {
        labSceneColor: { value: target.texture }, labSceneDepth: { value: target.depthTexture },
        labResolution: { value: size }, labNearFar: { value: new THREE.Vector2(.1, 90000) },
        labAbove: { value: 0 }, labClarity: { value: .75 }, labNearRadius: { value: 180 },
        labDeepColor: { value: new THREE.Color('#04060B') },
        labShallowColor: { value: new THREE.Color('#0E545D') },
      });
      material.needsUpdate = true;
    });
  }

  function capture(camera: THREE.Camera) {
    if (!water) return;
    gl.getDrawingBufferSize(size);
    if (target.width !== size.x || target.height !== size.y) target.setSize(Math.max(1, size.x), Math.max(1, size.y));
    const previousTarget = gl.getRenderTarget();
    gl.getViewport(viewport); gl.getScissor(scissor);
    const previousScissorTest = gl.getScissorTest();
    const previousXr = gl.xr.enabled;
    const previousShadowAutoUpdate = gl.shadowMap.autoUpdate;
    const previousVisibility = water.mesh.visible;
    try {
      water.mesh.visible = false; // Also prevents original planar-reflection recursion.
      gl.xr.enabled = false;
      // Main rendering updates the original shadows once every frame. As in
      // Water's own reflection pass, reuse that map for this extra capture.
      gl.shadowMap.autoUpdate = false;
      gl.setScissorTest(false);
      gl.setRenderTarget(target);
      gl.clear();
      gl.render(scene, camera);
    } finally {
      water.mesh.visible = previousVisibility;
      gl.xr.enabled = previousXr;
      gl.shadowMap.autoUpdate = previousShadowAutoUpdate;
      gl.setRenderTarget(previousTarget);
      gl.setViewport(viewport); gl.setScissor(scissor); gl.setScissorTest(previousScissorTest);
    }
  }

  return {
    update(camera: THREE.Camera & { near: number; far: number }, _time: number, settings: Partial<OceanEnvironmentSettings> = {}) {
      if (disposed) return;
      if (!water || !sky) findOriginals();
      if (sky) direction.copy(sky.uniforms.sunPosition.value).normalize();
      if (typeof settings.sunElevation === 'number' && typeof settings.sunAzimuth === 'number') {
        const elevation = THREE.MathUtils.degToRad(clamp(settings.sunElevation, 19, 3, 75));
        const azimuth = THREE.MathUtils.degToRad(clamp(settings.sunAzimuth, 121, 0, 360));
        direction.set(Math.cos(elevation) * Math.sin(azimuth), Math.sin(elevation), Math.cos(elevation) * Math.cos(azimuth));
        if (sky) sky.uniforms.sunPosition.value.copy(direction).multiplyScalar(skySunBefore?.length() ?? 616);
      }
      const above = camera.position.y > 0;
      sun.visible = above;
      sun.position.copy(camera.position).addScaledVector(direction, 12000);
      sun.quaternion.copy(camera.quaternion); sun.updateMatrixWorld();
      if (!water) return;
      const uniforms = water.material.uniforms;
      uniforms.labAbove.value = above ? 1 : 0;
      uniforms.labClarity.value = clamp(settings.waterClarity, .75, .2, 1);
      uniforms.labNearRadius.value = clamp(settings.nearRadius, 180, 60, 600);
      uniforms.labNearFar.value.set(camera.near, camera.far);
      uniforms.labDeepColor.value.set(validColor(settings.waterColor, '#04060B'));
      uniforms.labShallowColor.value.set(validColor(settings.shallowColor, '#0E545D'));
      // Match the visible Sky sun, without changing any model light.
      uniforms.sunDirection.value.copy(direction);
      if (above) capture(camera);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      if (water) {
        water.material.fragmentShader = water.fragment;
        water.material.uniforms.sunDirection.value.copy(water.sunDirection);
        names.forEach((name) => { delete water!.material.uniforms[name]; });
        water.material.needsUpdate = true;
      }
      if (sky && skySunBefore) sky.uniforms.sunPosition.value.copy(skySunBefore);
      sun.removeFromParent(); sun.geometry.dispose(); sunMaterial.dispose();
      target.dispose(); target.depthTexture?.dispose();
    },
  };
}
