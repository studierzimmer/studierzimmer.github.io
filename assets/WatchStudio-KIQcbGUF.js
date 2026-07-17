var Le=Object.defineProperty;var Oe=(t,s,i)=>s in t?Le(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i;var X=(t,s,i)=>Oe(t,typeof s!="symbol"?s+"":s,i);import{r as a,j as e}from"./vendor-Dso59N_O.js";import{u as ae,C as Ce,O as Te,E as De,f as Fe,g as ee,H as $e,N as te,b as ie,h as ne,a as re,i as Ue,d as ze,c as oe,j as Ie,e as Ge}from"./react-three-DP099Jq1.js";import{aq as se,ap as W,aU as le,V as ce,bb as de,aF as ue,d as fe,af as Pe,M as Be,aJ as He,aT as We,ai as qe,bc as Ke,at as me,aG as Ve}from"./three-CQO4KQ3J.js";import{u as Ye,A as Je,l as Ze}from"./AdminThreeDModelManager-BWfzwcic.js";import"./postprocessing-C5EpOQZm.js";import"./index-Bo_Q4ATf.js";import"./supabase-BNwldGNI.js";import"./motion-C5B2NUSC.js";const Qe="/models/watch-v1.glb",Xe="/studio.hdr",pe=1.8,he=[0,0,8],q="#EEEAE1",et=700,tt=940,st=720*1e3,at=[{id:"pbr",label:"PBR"},{id:"arctic",label:"ARCTIC"},{id:"pen",label:"PEN"}],it={pbr:"#ffffff",arctic:"#ffffff",pen:"#ffffff"},R={id:"local-watch-fallback",name:"Tag Heuer Monaco x Gulf",description:"Built-in local watch model",file_name:"watch-v1.glb",storage_path:"models/watch-v1.glb",source_file_name:null,source_storage_path:null,source_format:null,hdri_file_name:null,hdri_storage_path:null,is_published:!0,is_featured:!0,sort_order:0,plaster_color:q,created_at:"",updated_at:"",public_url:Qe,hdri_public_url:null};let O=null,A=null;async function xe(t=!1){const s=Date.now();if(t)O=null,A=null;else{if(O&&O.expiresAt>s)return O.models;if(A)return A}const i=Ze().then(o=>(O={expiresAt:Date.now()+st,models:o},o));A=i;try{return await i}finally{A===i&&(A=null)}}function be(t){return t.length>0?t:[R]}const nt=`
.watch-studio {
  opacity: 0;
  filter: blur(24px);
  transition:
    opacity 900ms ease,
    filter 1100ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 760ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-studio.is-visible {
  opacity: 1;
  filter: blur(0);
}

.watch-studio.is-leaving {
  opacity: 0;
  filter: blur(24px);
  pointer-events: none;
}

.watch-studio-canvas {
  touch-action: none;
}

.watch-studio-piece {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}

.watch-studio-piece.is-outside {
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
}

.watch-studio-piece.is-entering {
  animation: elastic-center-scale 900ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
  animation-delay: var(--watch-delay, 0ms);
}

.watch-studio-piece.is-visible {
  transform: scale(1);
  opacity: 1;
}

.watch-studio-piece.is-leaving {
  animation: elastic-center-scale 760ms cubic-bezier(0.22, 0.88, 0.3, 1) reverse both;
  animation-delay: var(--watch-exit-delay, 0ms);
}

.watch-model-stage {
  transform-origin: 50% 50%;
  will-change: transform, opacity, filter;
  backface-visibility: hidden;
}

.watch-model-stage.is-outside {
  transform: scale(1);
  opacity: 0;
  pointer-events: none;
}

.watch-model-stage.is-entering {
  animation: elastic-center-scale 940ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
}

.watch-model-stage.is-visible {
  transform: scale(1);
  opacity: 1;
}

.watch-model-stage.is-leaving {
  animation: elastic-center-scale 700ms cubic-bezier(0.22, 0.88, 0.3, 1) reverse both;
  pointer-events: none;
}

.watch-model-balloon {
  transform: scale(0);
  transform-origin: 36px 0;
  opacity: 0;
  filter: blur(10px);
  pointer-events: none;
  transition:
    transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 300ms ease,
    filter 420ms ease;
}

.watch-model-balloon.is-open {
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
  pointer-events: auto;
}

.watch-model-list-item {
  transform-origin: 50% 50%;
  transform: scale(0);
  opacity: 0;
  transition:
    transform 520ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 260ms ease;
  transition-delay: calc(var(--model-index, 0) * 45ms);
}

.watch-model-balloon.is-open .watch-model-list-item {
  transform: scale(1);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .watch-studio,
  .watch-studio-piece,
  .watch-model-stage,
  .watch-model-balloon,
  .watch-model-list-item {
    transition-duration: 1ms;
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
  }
}
`;function rt({label:t="..."}){return e.jsx(Ie,{center:!0,children:e.jsx("div",{className:"whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-[11px] tracking-[0.16em] text-black/55 backdrop-blur-md",children:t})})}function ot({catalogReady:t,geometryReady:s,complete:i,onCompleted:o}){const{active:r,progress:l}=ae(),[p,d]=a.useState(!0),[u,f]=a.useState(!1),[w,y]=a.useState(0),N=a.useRef(!1);if(a.useEffect(()=>{const j=i?100:t?r?Math.min(92,12+l*.8):s?97:88:8;let c=0,g=!1;const b=()=>{y(M=>{const E=Math.max(M,j),k=E-M;return Math.abs(k)<.05?E:Math.min(i?100:99,M+Math.max(i?.35:.08,k*(i?.28:.12)))}),g||(c=window.requestAnimationFrame(b))};return c=window.requestAnimationFrame(b),()=>{g=!0,window.cancelAnimationFrame(c)}},[r,t,i,s,l]),a.useEffect(()=>{if(!i||w<100||N.current)return;N.current=!0,o();const j=window.setTimeout(()=>f(!0),120),c=window.setTimeout(()=>d(!1),680);return()=>{window.clearTimeout(j),window.clearTimeout(c)}},[i,w,o]),!p)return null;const h=Math.min(100,Math.max(0,Math.round(w)));return e.jsx("div",{"data-model-loading-overlay":"true",className:`pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-white px-8 transition-opacity duration-500 ${u?"opacity-0":"opacity-100"}`,children:e.jsxs("div",{className:"w-full max-w-[260px] bg-white px-5 py-4 text-black",children:[e.jsxs("div",{className:"mb-3 flex items-center justify-between text-[10px] tracking-[0.14em]",children:[e.jsx("span",{children:"..."}),e.jsxs("span",{className:"tabular-nums",children:[h,"%"]})]}),e.jsx("div",{className:"h-[3px] w-full overflow-hidden bg-black/10",role:"progressbar","aria-label":"Loading 3D model","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":h,children:e.jsx("div",{className:"h-full origin-left bg-black transition-[width] duration-150 ease-out",style:{width:`${w}%`}})})]})})}class lt extends a.Component{constructor(){super(...arguments);X(this,"state",{failed:!1})}static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onError?.()}componentDidUpdate(i){i.resetKey!==this.props.resetKey&&this.state.failed&&this.setState({failed:!1})}render(){return this.state.failed?e.jsx(rt,{label:"MODEL COULD NOT LOAD"}):this.props.children}}function we(t){return t==="pen"?new fe({color:"#ffffff",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):new me({color:"#ffffff",roughness:.68,metalness:0,clearcoat:.08,clearcoatRoughness:.58,sheen:.06,sheenColor:"#ffffff",envMapIntensity:0})}function ct(t){const s=t.clone();return s instanceof Ve&&(s.envMapIntensity=1.45),s.needsUpdate=!0,s}function K(t){return/\.stl$/i.test(t.file_name)||/\.stl$/i.test(t.storage_path)}function ge(t){const s=t.hdri_public_url;if(!s)return Xe;const o=(t.hdri_file_name??t.hdri_storage_path??s.split("?",1)[0]).match(/\.(hdr|exr)$/i)?.[1]?.toLowerCase();return o?`${s}#environment.${o}`:s}function $(t){K(t)?ie.preload(ne,t.public_url):re.preload(t.public_url),Ue.preload({files:ge(t)})}async function _t(){try{const t=be(await xe()),s=t.find(i=>i.is_featured)??t[0];$(s)}catch{$(R)}}function dt(t,s){return t!=="pbr"?we(t):new me({color:/^#[\dA-F]{6}$/i.test(s)?s:q,roughness:.86,metalness:0,clearcoat:.08,clearcoatRoughness:.72,sheen:.08,sheenColor:"#ffffff",envMapIntensity:1.05})}function ut({model:t,mode:s,onReady:i}){const{scene:o,animations:r}=re(t.public_url),l=a.useMemo(()=>{const d=Ge.clone(o),u=s==="pbr"?null:we(s),f=new Set,w=[],y=s==="pen"?new ue({color:"#050505",toneMapped:!1}):null;d.traverse(c=>{if(c instanceof Be){if(s==="pbr"){const b=(Array.isArray(c.material)?c.material:[c.material]).map(M=>{const E=ct(M);return f.add(E),E});c.material=Array.isArray(c.material)?b:b[0]}else u&&(c.material=u);if(c.castShadow=s!=="pen",c.receiveShadow=s!=="pen",y){const g=new de(c.geometry,18),b=new He(g,y);b.renderOrder=4,c.add(b),w.push(g)}}}),d.updateMatrixWorld(!0);const N=new We().setFromObject(d,!0);if(N.isEmpty())return{object:d,position:new ce,scale:1,overrideMaterial:u,disposableMaterials:f,creaseLineMaterial:y,disposableGeometries:w};const h=N.getBoundingSphere(new le),j=Number.isFinite(h.radius)&&h.radius>0?pe/h.radius:1;return{object:d,position:h.center.clone().multiplyScalar(-j),scale:j,overrideMaterial:u,disposableMaterials:f,creaseLineMaterial:y,disposableGeometries:w}},[s,o]),p=a.useMemo(()=>new qe(l.object),[l.object]);return a.useEffect(()=>{if(r.length===0)return;const d=r.map(u=>{const f=p.clipAction(u);return f.reset(),f.enabled=!0,f.paused=!1,f.clampWhenFinished=!1,f.setLoop(Ke,1/0),f.setEffectiveTimeScale(1),f.setEffectiveWeight(1),f.play(),f});return()=>{d.forEach(u=>u.stop()),p.stopAllAction(),r.forEach(u=>p.uncacheClip(u)),p.uncacheRoot(l.object)}},[p,r,l.object]),oe((d,u)=>{r.length>0&&p.update(u)}),a.useEffect(()=>()=>{l.overrideMaterial?.dispose(),l.disposableMaterials.forEach(d=>d.dispose()),l.creaseLineMaterial?.dispose(),l.disposableGeometries.forEach(d=>d.dispose())},[l]),a.useLayoutEffect(()=>{i(t.id)},[t.id,l,i]),e.jsx("group",{position:l.position,scale:l.scale,children:e.jsx("primitive",{object:l.object})})}function ft({model:t,mode:s,onReady:i}){const o=ie(ne,t.public_url),r=a.useMemo(()=>{const l=o.clone();l.computeVertexNormals(),l.computeBoundingSphere();const p=l.boundingSphere??new le(new ce,1),d=Number.isFinite(p.radius)&&p.radius>0?pe/p.radius:1;l.translate(-p.center.x,-p.center.y,-p.center.z),l.computeBoundingSphere();const u=dt(s,t.plaster_color??q),f=s==="pen"?new de(l,12):null,w=s==="pen"?new ue({color:"#050505",toneMapped:!1,depthWrite:!1}):null,y=s==="pen"?new fe({color:"#050505",side:Pe,toneMapped:!1,depthWrite:!1}):null;return{geometry:l,material:u,edgeGeometry:f,edgeMaterial:w,silhouetteMaterial:y,scale:d}},[s,t.plaster_color,o]);return a.useEffect(()=>()=>{r.geometry.dispose(),r.material.dispose(),r.edgeGeometry?.dispose(),r.edgeMaterial?.dispose(),r.silhouetteMaterial?.dispose()},[r]),a.useLayoutEffect(()=>{i(t.id)},[t.id,r,i]),e.jsxs("group",{scale:r.scale,children:[r.silhouetteMaterial&&e.jsx("mesh",{geometry:r.geometry,material:r.silhouetteMaterial,scale:1.003,renderOrder:1}),e.jsx("mesh",{geometry:r.geometry,material:r.material,castShadow:s!=="pen",receiveShadow:s!=="pen",renderOrder:2}),r.edgeGeometry&&r.edgeMaterial&&e.jsx("lineSegments",{geometry:r.edgeGeometry,material:r.edgeMaterial,scale:1.001,renderOrder:4})]})}function mt({model:t,mode:s,onReady:i}){return K(t)?e.jsx(ft,{model:t,mode:s,onReady:i}):e.jsx(ut,{model:t,mode:s,onReady:i})}function pt({modelId:t,onReady:s}){return a.useLayoutEffect(()=>{s(t)},[t,s]),null}function ht({modelKey:t,controlsRef:s}){const i=ze(o=>o.camera);return a.useLayoutEffect(()=>{i.position.set(...he),i.up.set(0,1,0),i.zoom=1,i.lookAt(0,0,0),i.updateProjectionMatrix();const o=s.current;o&&(o.target.set(0,0,0),o.update(),o.saveState())},[i,s,t]),null}function xt({ready:t,readinessKey:s,onReady:i}){const o=a.useRef(0),r=a.useRef(!1);return a.useEffect(()=>{o.current=0,r.current=!1},[s]),oe(()=>{if(!t){o.current=0;return}r.current||(o.current+=1,!(o.current<6)&&(r.current=!0,i(s)))}),null}function Nt({onBack:t}){const[s,i]=a.useState(!1),[o,r]=a.useState(!1),[l,p]=a.useState(!1),[d,u]=a.useState([R]),[f,w]=a.useState(R.id),[y,N]=a.useState("pbr"),[h,j]=a.useState(!1),[c,g]=a.useState(!1),[b,M]=a.useState("outside"),[E,k]=a.useState(!1),[ye,U]=a.useState(!1),[Me,z]=a.useState(!1),[V,Y]=a.useState(null),J=a.useRef(null),I=a.useRef(null),C=a.useRef(null),S=a.useRef(null),L=ae(),{loading:ve,user:je,isAdmin:T}=Ye(),m=d.find(n=>n.id===f)??d[0]??R,Se=K(m),D=ge(m),G=`${m.public_url}|${D}`,x=y,P=a.useCallback(async(n=!1)=>{k(!1),U(!1),z(!1),M("outside");try{const _=await xe(n),v=be(_);u(v),w(Q=>v.some(H=>H.id===Q)?Q:v.find(H=>H.is_featured)?.id??v[0].id),Y(null),p(!0)}catch{u([R]),w(R.id),Y("Using the built-in watch until the Supabase 3D table is ready."),p(!0)}},[]);a.useEffect(()=>{P()},[P]),a.useEffect(()=>{T||j(!1)},[T]),a.useEffect(()=>{h&&g(!1)},[h]),a.useEffect(()=>()=>{C.current&&window.clearTimeout(C.current),S.current&&window.clearTimeout(S.current)},[]),a.useEffect(()=>{let n=0;const _=window.requestAnimationFrame(()=>{n=window.requestAnimationFrame(()=>i(!0))});return()=>{window.cancelAnimationFrame(_),window.cancelAnimationFrame(n)}},[]);const B=o?"is-leaving":s?"is-entering":"is-visible",F=`is-${b}`,Ee=l&&(Me||ye),_e=l&&E&&!L.active&&(L.progress>=99.9||L.total===0||L.loaded>=L.total),Z=a.useCallback(n=>{n===m.id&&k(!0)},[m.id]),Ne=a.useCallback(n=>{n===G&&U(!0)},[G]),Re=a.useCallback(()=>{M(n=>n==="outside"?"entering":n),S.current&&window.clearTimeout(S.current),S.current=window.setTimeout(()=>{M(n=>n==="entering"?"visible":n),S.current=null},tt)},[]),ke=a.useCallback(n=>{if(g(!1),n===m.id&&b!=="leaving")return;I.current=n;const _=()=>{const v=I.current;I.current=null,C.current=null,v&&(k(!1),U(!1),z(!1),M("outside"),w(v))};if(b!=="leaving"){if(S.current&&(window.clearTimeout(S.current),S.current=null),b==="outside"){_();return}M("leaving"),C.current=window.setTimeout(_,et)}},[b,m.id]),Ae=()=>{o||(g(!1),M("leaving"),r(!0),window.setTimeout(t,900))};return e.jsxs("div",{className:`watch-studio fixed inset-0 z-[200] overflow-hidden text-black ${o?"is-leaving":s?"is-visible":""}`,style:{backgroundColor:it[x]},children:[e.jsx("style",{children:nt}),e.jsx(ot,{catalogReady:l,geometryReady:E,complete:Ee,onCompleted:Re},`${m.public_url}-${D}`),e.jsxs("div",{className:"fixed left-4 top-4 z-40 flex items-center gap-2 sm:left-6 sm:top-6",children:[e.jsx("div",{className:`watch-studio-piece ${B}`,style:{"--watch-delay":"0ms","--watch-exit-delay":"240ms"},children:e.jsx("button",{type:"button",onClick:Ae,className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:"← BACK TO BOOK"})}),e.jsx("div",{className:`watch-studio-piece ${B}`,style:{"--watch-delay":"70ms","--watch-exit-delay":"180ms"},children:e.jsx("button",{type:"button",onClick:()=>g(n=>!n),"aria-expanded":c,"aria-controls":"watch-model-library",className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:"MODELS"})})]}),c&&!h&&e.jsx("button",{type:"button","aria-label":"Close model list",className:"fixed inset-0 z-[31] cursor-default bg-transparent",onClick:()=>g(!1)}),e.jsxs("aside",{id:"watch-model-library","aria-hidden":!c||h,className:`watch-model-balloon fixed left-4 top-[76px] z-[35] flex max-h-[72vh] w-[min(88vw,390px)] flex-col overflow-hidden rounded-[34px] border border-black/25 bg-white/95 p-5 shadow-[0_18px_65px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:left-6 sm:top-[82px] ${c&&!h?"is-open":""}`,children:[e.jsxs("div",{className:"mb-4 flex items-start justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[12px] tracking-[0.18em] text-black/45",children:"3D LIBRARY"}),e.jsx("h1",{className:"mt-1 text-[22px] font-light",children:"CHOOSE A MODEL"})]}),e.jsx("button",{type:"button",onClick:()=>g(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/25 bg-transparent text-[18px]","aria-label":"Close model list",children:"×"})]}),e.jsx("div",{className:"min-h-0 overflow-y-auto border-t border-black/15",children:d.map((n,_)=>{const v=n.id===m.id;return e.jsxs("button",{type:"button",onClick:()=>ke(n.id),onPointerEnter:()=>$(n),onFocus:()=>$(n),className:`watch-model-list-item grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-colors hover:bg-black/[0.035] ${v?"text-black":"text-black/65"}`,style:{"--model-index":_},children:[e.jsxs("span",{className:"min-w-0",children:[e.jsx("span",{className:"block truncate text-[16px]",children:n.name}),n.description&&e.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/50",children:n.description})]}),e.jsx("span",{className:"text-[14px]",children:n.is_featured?"*":v?">":""})]},n.id)})}),e.jsx("p",{className:"relative mt-3 text-[11px] text-black/40",children:"* Featured"})]}),!ve&&je&&T&&e.jsx("div",{className:`watch-studio-piece fixed right-4 top-4 z-20 sm:right-6 sm:top-6 ${B}`,style:{"--watch-delay":"80ms","--watch-exit-delay":"180ms"},children:e.jsx("button",{type:"button",onClick:()=>j(n=>!n),className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:h?"CLOSE MANAGER":"MANAGE MODELS"})}),e.jsx("div",{className:`watch-model-stage watch-studio-canvas absolute inset-0 ${F}`,children:e.jsxs(Ce,{shadows:x!=="pen",dpr:[1,1.5],gl:{antialias:!0,powerPreference:"high-performance"},camera:{position:he,fov:32,near:.01,far:1e4},children:[e.jsx("ambientLight",{intensity:x==="pen"?2.4:x==="arctic"?1.45:.62}),e.jsx("directionalLight",{position:[7,10,8],intensity:x==="pbr"?2.25:x==="arctic"?1.35:2.1,castShadow:x!=="pen","shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),e.jsx("directionalLight",{position:[-8,2,-5],intensity:x==="pbr"?.9:x==="arctic"?.48:.75}),e.jsx(Te,{ref:J,makeDefault:!0,enabled:!h&&b==="visible",enableDamping:!0,dampingFactor:.075,enablePan:!0,enableRotate:!0,enableZoom:!0,rotateSpeed:.65,zoomSpeed:.8,panSpeed:.75,screenSpacePanning:!0,minDistance:.01,maxDistance:1e4,mouseButtons:{LEFT:W.ROTATE,MIDDLE:W.DOLLY,RIGHT:W.PAN},touches:{ONE:se.ROTATE,TWO:se.DOLLY_PAN}},m.public_url),e.jsx(ht,{modelKey:m.public_url,controlsRef:J}),e.jsx(xt,{ready:_e,readinessKey:G,onReady:Ne}),e.jsx(lt,{resetKey:m.public_url,onError:()=>z(!0),children:e.jsx(a.Suspense,{fallback:null,children:l&&e.jsxs(e.Fragment,{children:[e.jsx(mt,{model:m,mode:x,onReady:Z},`${m.public_url}-${x}`),e.jsx(pt,{modelId:m.id,onReady:Z})]})})}),x==="pbr"&&e.jsx(a.Suspense,{fallback:null,children:e.jsx(De,{files:D},D)}),x!=="pen"&&e.jsx(Fe,{position:[0,-1.9,0],scale:6,opacity:x==="arctic"?.14:.28,blur:2.5,far:4,resolution:512,frames:1}),x==="arctic"&&e.jsxs(ee,{multisampling:0,resolutionScale:.75,children:[e.jsx($e,{saturation:-1}),e.jsx(te,{halfRes:!0,quality:"performance",aoRadius:.22,distanceFalloff:.75,intensity:.42,color:"#d6d6d6"})]}),Se&&x==="pbr"&&e.jsx(ee,{multisampling:0,resolutionScale:.75,children:e.jsx(te,{halfRes:!0,quality:"performance",aoRadius:.2,distanceFalloff:.8,intensity:.9,color:"#555555"})})]})}),!h&&e.jsx("aside",{className:"pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4 sm:bottom-6",children:e.jsxs("div",{className:"pointer-events-auto flex w-full max-w-4xl flex-col items-center gap-3",children:[e.jsx("div",{className:`watch-studio-piece max-w-full text-center ${F}`,style:{"--watch-delay":"70ms","--watch-exit-delay":"120ms"},children:e.jsxs("p",{className:"max-w-[78vw] truncate text-[12px] tracking-[0.08em] text-black",children:[m.is_featured?"FEATURED — ":"",m.name.toUpperCase()]})}),m.description&&e.jsx("div",{className:`watch-studio-piece max-w-[min(78vw,620px)] text-center ${F}`,style:{"--watch-delay":"140ms","--watch-exit-delay":"60ms"},children:e.jsx("p",{className:"truncate text-[10px] tracking-[0.04em] text-black/50",children:m.description})}),e.jsx("nav",{className:`watch-studio-piece flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] tracking-[0.12em] text-black ${F}`,style:{"--watch-delay":"210ms","--watch-exit-delay":"0ms"},"aria-label":"3D renderer style",children:at.map(n=>e.jsx("button",{type:"button",onClick:()=>N(n.id),"aria-pressed":y===n.id,className:`py-1 outline-none transition-opacity focus-visible:underline focus-visible:underline-offset-4 ${y===n.id?"underline decoration-1 underline-offset-4 opacity-100":"opacity-45 hover:opacity-100"}`,children:n.label},n.id))}),V&&e.jsx("div",{className:"text-center text-[9px] text-black/45",children:V})]})}),h&&T&&e.jsx("section",{className:"fixed inset-x-3 bottom-3 top-20 z-30 flex overflow-hidden rounded-[28px] border border-black/20 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-20 sm:w-[min(760px,calc(100vw-40px))]",children:e.jsx(Je,{onModelsChanged:()=>void P(!0)})})]})}export{Nt as default,_t as preloadWatchStudioExperience};
