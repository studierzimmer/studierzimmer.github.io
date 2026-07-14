var pe=Object.defineProperty;var fe=(s,t,n)=>t in s?pe(s,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[t]=n;var $=(s,t,n)=>fe(s,typeof t!="symbol"?t+"":t,n);import{r as a,j as e}from"./vendor-Dux1OOwi.js";import{u as W,C as he,O as xe,E as be,e as we,f as B,H as ge,N as H,d as ye,g as ve,b as Me,h as je,a as Se}from"./react-three-D_U0l08b.js";import{a7 as K,a6 as F,aQ as q,V,b8 as Y,au as Q,d as Z,a1 as Ee,M as Ne,az as Le,aP as Oe,aa as J,av as ke}from"./three-BAUrErQW.js";import{u as Ae,l as _e,A as Re}from"./AdminThreeDModelManager-wEXp8CET.js";import"./postprocessing-DY-RA8W9.js";import"./index-BsKGy--e.js";import"./supabase-C4Th6Poz.js";import"./motion-BKLCL7uv.js";const De="/models/watch-v1.glb",Te="/studio.hdr",X=1.8,ee=[0,0,8],z="#EEEAE1",Ce=700,Fe=940,ze=[{id:"pbr",label:"PBR"},{id:"arctic",label:"ARCTIC"},{id:"pen",label:"PEN"}],Ie={pbr:"#ffffff",arctic:"#ffffff",pen:"#ffffff"},L={id:"local-watch-fallback",name:"Tag Heuer Monaco x Gulf",description:"Built-in local watch model",file_name:"watch-v1.glb",storage_path:"models/watch-v1.glb",is_published:!0,is_featured:!0,sort_order:0,plaster_color:z,created_at:"",updated_at:"",public_url:De},Ge=`
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

.watch-studio-piece.is-outside,
.watch-model-stage.is-outside {
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
`;function Pe({label:s="LOADING MODEL…"}){return e.jsx(ve,{center:!0,children:e.jsx("div",{className:"whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-[11px] tracking-[0.16em] text-black/55 backdrop-blur-md",children:s})})}function Ue({complete:s,onCompleted:t}){const{active:n,progress:c}=W(),[r,o]=a.useState(!0),[d,b]=a.useState(0),w=a.useRef(!1);if(a.useEffect(()=>{n&&o(!0);const f=s?100:n?Math.min(c,99.5):0;let m=0,E=!1;const l=()=>{b(v=>{const h=f-v;return Math.abs(h)<.1?f:(E||(m=window.requestAnimationFrame(l)),v+h*.14)})};return m=window.requestAnimationFrame(l),()=>{E=!0,window.cancelAnimationFrame(m)}},[n,s,c]),a.useEffect(()=>{if(!s||d<100||w.current)return;w.current=!0;const f=window.setTimeout(()=>o(!1),180),m=window.setTimeout(t,360);return()=>{window.clearTimeout(m),window.clearTimeout(f)}},[s,d,t]),!r)return null;const g=Math.min(100,Math.max(0,Math.round(d)));return e.jsx("div",{className:"pointer-events-none fixed inset-0 z-[25] flex items-center justify-center px-8",children:e.jsxs("div",{className:"watch-studio-piece is-entering w-full max-w-[260px] bg-white/88 px-5 py-4 text-black shadow-[0_12px_50px_rgba(0,0,0,0.12)] backdrop-blur-md",children:[e.jsxs("div",{className:"mb-3 flex items-center justify-between text-[10px] tracking-[0.14em]",children:[e.jsx("span",{children:"LOADING MODEL"}),e.jsxs("span",{className:"tabular-nums",children:[g,"%"]})]}),e.jsx("div",{className:"h-[3px] w-full overflow-hidden bg-black/10",role:"progressbar","aria-label":"Loading 3D model","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":g,children:e.jsx("div",{className:"h-full origin-left bg-black transition-[width] duration-150 ease-out",style:{width:`${d}%`}})})]})})}class $e extends a.Component{constructor(){super(...arguments);$(this,"state",{failed:!1})}static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onError?.()}componentDidUpdate(n){n.resetKey!==this.props.resetKey&&this.state.failed&&this.setState({failed:!1})}render(){return this.state.failed?e.jsx(Pe,{label:"MODEL COULD NOT LOAD"}):this.props.children}}function te(s){return s==="pen"?new Z({color:"#ffffff",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):new J({color:"#efefeb",roughness:.66,metalness:0,clearcoat:.18,clearcoatRoughness:.38,sheen:.12,sheenColor:"#ffffff",envMapIntensity:0})}function Be(s){const t=s.clone();return t instanceof ke&&(t.envMapIntensity=1.45),t.needsUpdate=!0,t}function se(s){return/\.stl$/i.test(s.file_name)||/\.stl$/i.test(s.storage_path)}function He(s,t){return s!=="pbr"?te(s):new J({color:/^#[\dA-F]{6}$/i.test(t)?t:z,roughness:.86,metalness:0,clearcoat:.08,clearcoatRoughness:.72,sheen:.08,sheenColor:"#ffffff",envMapIntensity:1.05})}function Ke({model:s,mode:t,onReady:n}){const{scene:c}=Se(s.public_url),r=a.useMemo(()=>{const o=c.clone(!0),d=t==="pbr"?null:te(t),b=new Set,w=[],g=t==="pen"?new Q({color:"#050505",toneMapped:!1}):null;o.traverse(l=>{if(l instanceof Ne){if(t==="pbr"){const h=(Array.isArray(l.material)?l.material:[l.material]).map(j=>{const x=Be(j);return b.add(x),x});l.material=Array.isArray(l.material)?h:h[0]}else d&&(l.material=d);if(l.castShadow=t!=="pen",l.receiveShadow=t!=="pen",g){const v=new Y(l.geometry,18),h=new Le(v,g);h.renderOrder=4,l.add(h),w.push(v)}}}),o.updateMatrixWorld(!0);const f=new Oe().setFromObject(o,!0);if(f.isEmpty())return{object:o,position:new V,scale:1,overrideMaterial:d,disposableMaterials:b,creaseLineMaterial:g,disposableGeometries:w};const m=f.getBoundingSphere(new q),E=Number.isFinite(m.radius)&&m.radius>0?X/m.radius:1;return{object:o,position:m.center.clone().multiplyScalar(-E),scale:E,overrideMaterial:d,disposableMaterials:b,creaseLineMaterial:g,disposableGeometries:w}},[t,c]);return a.useEffect(()=>()=>{r.overrideMaterial?.dispose(),r.disposableMaterials.forEach(o=>o.dispose()),r.creaseLineMaterial?.dispose(),r.disposableGeometries.forEach(o=>o.dispose())},[r]),a.useLayoutEffect(()=>{n(s.id)},[s.id,r,n]),e.jsx("group",{position:r.position,scale:r.scale,children:e.jsx("primitive",{object:r.object})})}function We({model:s,mode:t,onReady:n}){const c=Me(je,s.public_url),r=a.useMemo(()=>{const o=c.clone();o.computeVertexNormals(),o.computeBoundingSphere();const d=o.boundingSphere??new q(new V,1),b=Number.isFinite(d.radius)&&d.radius>0?X/d.radius:1;o.translate(-d.center.x,-d.center.y,-d.center.z),o.computeBoundingSphere();const w=He(t,s.plaster_color??z),g=t==="pen"?new Y(o,12):null,f=t==="pen"?new Q({color:"#050505",toneMapped:!1,depthWrite:!1}):null,m=t==="pen"?new Z({color:"#050505",side:Ee,toneMapped:!1,depthWrite:!1}):null;return{geometry:o,material:w,edgeGeometry:g,edgeMaterial:f,silhouetteMaterial:m,scale:b}},[t,s.plaster_color,c]);return a.useEffect(()=>()=>{r.geometry.dispose(),r.material.dispose(),r.edgeGeometry?.dispose(),r.edgeMaterial?.dispose(),r.silhouetteMaterial?.dispose()},[r]),a.useLayoutEffect(()=>{n(s.id)},[s.id,r,n]),e.jsxs("group",{scale:r.scale,children:[r.silhouetteMaterial&&e.jsx("mesh",{geometry:r.geometry,material:r.silhouetteMaterial,scale:1.003,renderOrder:1}),e.jsx("mesh",{geometry:r.geometry,material:r.material,castShadow:t!=="pen",receiveShadow:t!=="pen",renderOrder:2}),r.edgeGeometry&&r.edgeMaterial&&e.jsx("lineSegments",{geometry:r.edgeGeometry,material:r.edgeMaterial,scale:1.001,renderOrder:4})]})}function qe({model:s,mode:t,onReady:n}){return se(s)?e.jsx(We,{model:s,mode:t,onReady:n}):e.jsx(Ke,{model:s,mode:t,onReady:n})}function Ve({modelKey:s,controlsRef:t}){const n=ye(c=>c.camera);return a.useLayoutEffect(()=>{n.position.set(...ee),n.up.set(0,1,0),n.zoom=1,n.lookAt(0,0,0),n.updateProjectionMatrix();const c=t.current;c&&(c.target.set(0,0,0),c.update(),c.saveState())},[n,t,s]),null}function it({onBack:s}){const[t,n]=a.useState(!1),[c,r]=a.useState(!1),[o,d]=a.useState(!1),[b,w]=a.useState([L]),[g,f]=a.useState(L.id),[m,E]=a.useState("pbr"),[l,v]=a.useState(!1),[h,j]=a.useState(!1),[x,N]=a.useState("outside"),[ae,A]=a.useState(!1),[ie,_]=a.useState(!1),[I,G]=a.useState(null),P=a.useRef(null),R=a.useRef(null),O=a.useRef(null),M=a.useRef(null),U=W(),{loading:re,user:ne,isAdmin:k}=Ae(),u=b.find(i=>i.id===g)??b[0]??L,oe=se(u),p=m,D=a.useCallback(async()=>{try{const i=await _e(),y=i.length>0?i:[L];w(y),f(S=>y.some(C=>C.id===S)?S:y.find(C=>C.is_featured)?.id??y[0].id),G(null),d(!0)}catch{w([L]),f(L.id),G("Using the built-in watch until the Supabase 3D table is ready."),d(!0)}},[]);a.useEffect(()=>{D()},[D]),a.useEffect(()=>{k||v(!1)},[k]),a.useEffect(()=>{l&&j(!1)},[l]),a.useEffect(()=>{o&&(A(!1),_(!1),N("outside"))},[o,u.public_url]),a.useEffect(()=>()=>{O.current&&window.clearTimeout(O.current),M.current&&window.clearTimeout(M.current)},[]),a.useEffect(()=>{let i=0;const y=window.requestAnimationFrame(()=>{i=window.requestAnimationFrame(()=>n(!0))});return()=>{window.cancelAnimationFrame(y),window.cancelAnimationFrame(i)}},[]);const T=c?"is-leaving":t?"is-entering":"is-visible",le=o&&(ie||ae&&!U.active&&U.progress>=99.9),ce=a.useCallback(i=>{i===u.id&&A(!0)},[u.id]),de=a.useCallback(()=>{N(i=>i==="outside"?"entering":i),M.current&&window.clearTimeout(M.current),M.current=window.setTimeout(()=>{N(i=>i==="entering"?"visible":i),M.current=null},Fe)},[]),ue=a.useCallback(i=>{if(j(!1),i===u.id&&x!=="leaving")return;R.current=i;const y=()=>{const S=R.current;R.current=null,O.current=null,S&&(A(!1),_(!1),N("outside"),f(S))};if(x!=="leaving"){if(M.current&&(window.clearTimeout(M.current),M.current=null),x==="outside"){y();return}N("leaving"),O.current=window.setTimeout(y,Ce)}},[x,u.id]),me=()=>{c||(j(!1),N("leaving"),r(!0),window.setTimeout(s,900))};return e.jsxs("div",{className:`watch-studio fixed inset-0 z-[200] overflow-hidden text-black ${c?"is-leaving":t?"is-visible":""}`,style:{backgroundColor:Ie[p]},children:[e.jsx("style",{children:Ge}),e.jsx(Ue,{complete:le,onCompleted:de},u.public_url),e.jsxs("div",{className:"fixed left-4 top-4 z-40 flex items-center gap-2 sm:left-6 sm:top-6",children:[e.jsx("div",{className:`watch-studio-piece ${T}`,style:{"--watch-delay":"0ms","--watch-exit-delay":"240ms"},children:e.jsx("button",{type:"button",onClick:me,className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:"← BACK TO BOOK"})}),e.jsx("div",{className:`watch-studio-piece ${T}`,style:{"--watch-delay":"70ms","--watch-exit-delay":"180ms"},children:e.jsx("button",{type:"button",onClick:()=>j(i=>!i),"aria-expanded":h,"aria-controls":"watch-model-library",className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:"MODELS"})})]}),h&&!l&&e.jsx("button",{type:"button","aria-label":"Close model list",className:"fixed inset-0 z-[31] cursor-default bg-transparent",onClick:()=>j(!1)}),e.jsxs("aside",{id:"watch-model-library","aria-hidden":!h||l,className:`watch-model-balloon fixed left-4 top-[76px] z-[35] flex max-h-[72vh] w-[min(88vw,390px)] flex-col overflow-hidden rounded-[34px] border border-black/25 bg-white/95 p-5 shadow-[0_18px_65px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:left-6 sm:top-[82px] ${h&&!l?"is-open":""}`,children:[e.jsxs("div",{className:"mb-4 flex items-start justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[12px] tracking-[0.18em] text-black/45",children:"3D LIBRARY"}),e.jsx("h1",{className:"mt-1 text-[22px] font-light",children:"CHOOSE A MODEL"})]}),e.jsx("button",{type:"button",onClick:()=>j(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/25 bg-transparent text-[18px]","aria-label":"Close model list",children:"×"})]}),e.jsx("div",{className:"min-h-0 overflow-y-auto border-t border-black/15",children:b.map((i,y)=>{const S=i.id===u.id;return e.jsxs("button",{type:"button",onClick:()=>ue(i.id),className:`watch-model-list-item grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-colors hover:bg-black/[0.035] ${S?"text-black":"text-black/65"}`,style:{"--model-index":y},children:[e.jsxs("span",{className:"min-w-0",children:[e.jsx("span",{className:"block truncate text-[16px]",children:i.name}),i.description&&e.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/50",children:i.description})]}),e.jsx("span",{className:"text-[14px]",children:i.is_featured?"*":S?">":""})]},i.id)})}),e.jsx("p",{className:"relative mt-3 text-[11px] text-black/40",children:"* Featured"})]}),!re&&ne&&k&&e.jsx("div",{className:`watch-studio-piece fixed right-4 top-4 z-20 sm:right-6 sm:top-6 ${T}`,style:{"--watch-delay":"80ms","--watch-exit-delay":"180ms"},children:e.jsx("button",{type:"button",onClick:()=>v(i=>!i),className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:l?"CLOSE MANAGER":"MANAGE MODELS"})}),e.jsx("div",{className:`watch-model-stage watch-studio-canvas absolute inset-0 ${x}`,children:e.jsxs(he,{shadows:p!=="pen",dpr:[1,1.5],gl:{antialias:!0,powerPreference:"high-performance"},camera:{position:ee,fov:32,near:.01,far:1e4},children:[e.jsx("ambientLight",{intensity:p==="pen"?2.4:p==="arctic"?.65:.62}),e.jsx("directionalLight",{position:[7,10,8],intensity:p==="pbr"?2.25:p==="arctic"?1.35:2.1,castShadow:p!=="pen","shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),e.jsx("directionalLight",{position:[-8,2,-5],intensity:p==="pbr"?.9:p==="arctic"?.45:.75}),e.jsx(xe,{ref:P,makeDefault:!0,enabled:!l&&x==="visible",enableDamping:!0,dampingFactor:.075,enablePan:!0,enableRotate:!0,enableZoom:!0,rotateSpeed:.65,zoomSpeed:.8,panSpeed:.75,screenSpacePanning:!0,minDistance:.01,maxDistance:1e4,mouseButtons:{LEFT:F.ROTATE,MIDDLE:F.DOLLY,RIGHT:F.PAN},touches:{ONE:K.ROTATE,TWO:K.DOLLY_PAN}},u.public_url),e.jsx(Ve,{modelKey:u.public_url,controlsRef:P}),e.jsx($e,{resetKey:u.public_url,onError:()=>_(!0),children:e.jsx(a.Suspense,{fallback:null,children:o&&e.jsx(qe,{model:u,mode:p,onReady:ce},`${u.public_url}-${p}`)})}),p==="pbr"&&e.jsx(be,{files:Te}),p!=="pen"&&e.jsx(we,{position:[0,-1.9,0],scale:6,opacity:.28,blur:2.5,far:4,resolution:512,frames:1}),p==="arctic"&&e.jsxs(B,{multisampling:0,resolutionScale:.75,children:[e.jsx(ge,{saturation:-1}),e.jsx(H,{halfRes:!0,quality:"performance",aoRadius:.22,distanceFalloff:.75,intensity:1.2,color:"#505050"})]}),oe&&p==="pbr"&&e.jsx(B,{multisampling:0,resolutionScale:.75,children:e.jsx(H,{halfRes:!0,quality:"performance",aoRadius:.2,distanceFalloff:.8,intensity:.9,color:"#555555"})})]})}),!l&&e.jsx("aside",{className:"pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4 sm:bottom-6",children:e.jsxs("div",{className:"pointer-events-auto flex w-full max-w-4xl flex-col items-center gap-3",children:[e.jsx("div",{className:`watch-studio-piece max-w-full text-center ${x}`,style:{"--watch-delay":"70ms","--watch-exit-delay":"120ms"},children:e.jsxs("p",{className:"max-w-[78vw] truncate text-[12px] tracking-[0.08em] text-black",children:[u.is_featured?"FEATURED — ":"",u.name.toUpperCase()]})}),u.description&&e.jsx("div",{className:`watch-studio-piece max-w-[min(78vw,620px)] text-center ${x}`,style:{"--watch-delay":"140ms","--watch-exit-delay":"60ms"},children:e.jsx("p",{className:"truncate text-[10px] tracking-[0.04em] text-black/50",children:u.description})}),e.jsx("nav",{className:`watch-studio-piece flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] tracking-[0.12em] text-black ${x}`,style:{"--watch-delay":"210ms","--watch-exit-delay":"0ms"},"aria-label":"3D renderer style",children:ze.map(i=>e.jsx("button",{type:"button",onClick:()=>E(i.id),"aria-pressed":m===i.id,className:`py-1 outline-none transition-opacity focus-visible:underline focus-visible:underline-offset-4 ${m===i.id?"underline decoration-1 underline-offset-4 opacity-100":"opacity-45 hover:opacity-100"}`,children:i.label},i.id))}),I&&e.jsx("div",{className:"text-center text-[9px] text-black/45",children:I})]})}),l&&k&&e.jsx("section",{className:"fixed inset-x-3 bottom-3 top-20 z-30 flex overflow-hidden rounded-[28px] border border-black/20 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-20 sm:w-[min(760px,calc(100vw-40px))]",children:e.jsx(Re,{onModelsChanged:()=>void D()})})]})}export{it as default};
