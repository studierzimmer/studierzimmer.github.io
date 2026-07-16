var fe=Object.defineProperty;var he=(s,t,r)=>t in s?fe(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var H=(s,t,r)=>he(s,typeof t!="symbol"?t+"":t,r);import{r as a,j as e}from"./vendor-Ck_7Hjfu.js";import{u as V,C as xe,O as be,E as we,f as ge,g as W,H as ye,N as K,d as ve,h as Me,b as je,i as Ee,a as Se,e as _e,c as Ne}from"./react-three-MBPzvqYl.js";import{aq as q,ap as $,aU as Y,V as J,bb as Z,aF as Q,d as X,af as Le,M as ke,aJ as Oe,aT as Ae,ai as Re,bc as Te,at as ee,aG as De}from"./three-CQO4KQ3J.js";import{u as Ce,l as Fe,A as Ue}from"./AdminThreeDModelManager-IqhOAIJm.js";import"./postprocessing-C5EpOQZm.js";import"./index-DlVNMNYp.js";import"./supabase-BOKo3cPP.js";import"./motion-C8z4NiLu.js";const $e="/models/watch-v1.glb",ze="/studio.hdr",te=1.8,se=[0,0,8],z="#EEEAE1",Ie=700,Ge=940,Pe=[{id:"pbr",label:"PBR"},{id:"arctic",label:"ARCTIC"},{id:"pen",label:"PEN"}],Be={pbr:"#ffffff",arctic:"#ffffff",pen:"#ffffff"},N={id:"local-watch-fallback",name:"Tag Heuer Monaco x Gulf",description:"Built-in local watch model",file_name:"watch-v1.glb",storage_path:"models/watch-v1.glb",source_file_name:null,source_storage_path:null,source_format:null,hdri_file_name:null,hdri_storage_path:null,is_published:!0,is_featured:!0,sort_order:0,plaster_color:z,created_at:"",updated_at:"",public_url:$e,hdri_public_url:null},He=`
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
`;function We({label:s="LOADING MODEL…"}){return e.jsx(Me,{center:!0,children:e.jsx("div",{className:"whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-[11px] tracking-[0.16em] text-black/55 backdrop-blur-md",children:s})})}function Ke({complete:s,onCompleted:t}){const{active:r,progress:l}=V(),[o,n]=a.useState(!0),[c,d]=a.useState(0),u=a.useRef(!1);if(a.useEffect(()=>{r&&n(!0);const g=s?100:r?Math.min(l,99.5):0;let x=0,_=!1;const h=()=>{d(j=>{const p=g-j;return Math.abs(p)<.1?g:(_||(x=window.requestAnimationFrame(h)),j+p*.14)})};return x=window.requestAnimationFrame(h),()=>{_=!0,window.cancelAnimationFrame(x)}},[r,s,l]),a.useEffect(()=>{if(!s||c<100||u.current)return;u.current=!0;const g=window.setTimeout(()=>n(!1),180),x=window.setTimeout(t,360);return()=>{window.clearTimeout(x),window.clearTimeout(g)}},[s,c,t]),!o)return null;const m=Math.min(100,Math.max(0,Math.round(c)));return e.jsx("div",{className:"pointer-events-none fixed inset-0 z-[25] flex items-center justify-center px-8",children:e.jsxs("div",{className:"watch-studio-piece is-entering w-full max-w-[260px] bg-white/88 px-5 py-4 text-black shadow-[0_12px_50px_rgba(0,0,0,0.12)] backdrop-blur-md",children:[e.jsxs("div",{className:"mb-3 flex items-center justify-between text-[10px] tracking-[0.14em]",children:[e.jsx("span",{children:"LOADING MODEL"}),e.jsxs("span",{className:"tabular-nums",children:[m,"%"]})]}),e.jsx("div",{className:"h-[3px] w-full overflow-hidden bg-black/10",role:"progressbar","aria-label":"Loading 3D model","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":m,children:e.jsx("div",{className:"h-full origin-left bg-black transition-[width] duration-150 ease-out",style:{width:`${c}%`}})})]})})}class qe extends a.Component{constructor(){super(...arguments);H(this,"state",{failed:!1})}static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onError?.()}componentDidUpdate(r){r.resetKey!==this.props.resetKey&&this.state.failed&&this.setState({failed:!1})}render(){return this.state.failed?e.jsx(We,{label:"MODEL COULD NOT LOAD"}):this.props.children}}function ae(s){return s==="pen"?new X({color:"#ffffff",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):new ee({color:"#ffffff",roughness:.68,metalness:0,clearcoat:.08,clearcoatRoughness:.58,sheen:.06,sheenColor:"#ffffff",envMapIntensity:0})}function Ve(s){const t=s.clone();return t instanceof De&&(t.envMapIntensity=1.45),t.needsUpdate=!0,t}function ie(s){return/\.stl$/i.test(s.file_name)||/\.stl$/i.test(s.storage_path)}function Ye(s){const t=s.hdri_public_url;if(!t)return ze;const l=(s.hdri_file_name??s.hdri_storage_path??t.split("?",1)[0]).match(/\.(hdr|exr)$/i)?.[1]?.toLowerCase();return l?`${t}#environment.${l}`:t}function Je(s,t){return s!=="pbr"?ae(s):new ee({color:/^#[\dA-F]{6}$/i.test(t)?t:z,roughness:.86,metalness:0,clearcoat:.08,clearcoatRoughness:.72,sheen:.08,sheenColor:"#ffffff",envMapIntensity:1.05})}function Ze({model:s,mode:t,onReady:r}){const{scene:l,animations:o}=Se(s.public_url),n=a.useMemo(()=>{const d=_e.clone(l),u=t==="pbr"?null:ae(t),m=new Set,g=[],x=t==="pen"?new Q({color:"#050505",toneMapped:!1}):null;d.traverse(p=>{if(p instanceof ke){if(t==="pbr"){const w=(Array.isArray(p.material)?p.material:[p.material]).map(E=>{const L=Ve(E);return m.add(L),L});p.material=Array.isArray(p.material)?w:w[0]}else u&&(p.material=u);if(p.castShadow=t!=="pen",p.receiveShadow=t!=="pen",x){const v=new Z(p.geometry,18),w=new Oe(v,x);w.renderOrder=4,p.add(w),g.push(v)}}}),d.updateMatrixWorld(!0);const _=new Ae().setFromObject(d,!0);if(_.isEmpty())return{object:d,position:new J,scale:1,overrideMaterial:u,disposableMaterials:m,creaseLineMaterial:x,disposableGeometries:g};const h=_.getBoundingSphere(new Y),j=Number.isFinite(h.radius)&&h.radius>0?te/h.radius:1;return{object:d,position:h.center.clone().multiplyScalar(-j),scale:j,overrideMaterial:u,disposableMaterials:m,creaseLineMaterial:x,disposableGeometries:g}},[t,l]),c=a.useMemo(()=>new Re(n.object),[n.object]);return a.useEffect(()=>{if(o.length===0)return;const d=o.map(u=>{const m=c.clipAction(u);return m.reset(),m.enabled=!0,m.paused=!1,m.clampWhenFinished=!1,m.setLoop(Te,1/0),m.setEffectiveTimeScale(1),m.setEffectiveWeight(1),m.play(),m});return()=>{d.forEach(u=>u.stop()),c.stopAllAction(),o.forEach(u=>c.uncacheClip(u)),c.uncacheRoot(n.object)}},[c,o,n.object]),Ne((d,u)=>{o.length>0&&c.update(u)}),a.useEffect(()=>()=>{n.overrideMaterial?.dispose(),n.disposableMaterials.forEach(d=>d.dispose()),n.creaseLineMaterial?.dispose(),n.disposableGeometries.forEach(d=>d.dispose())},[n]),a.useLayoutEffect(()=>{r(s.id)},[s.id,n,r]),e.jsx("group",{position:n.position,scale:n.scale,children:e.jsx("primitive",{object:n.object})})}function Qe({model:s,mode:t,onReady:r}){const l=je(Ee,s.public_url),o=a.useMemo(()=>{const n=l.clone();n.computeVertexNormals(),n.computeBoundingSphere();const c=n.boundingSphere??new Y(new J,1),d=Number.isFinite(c.radius)&&c.radius>0?te/c.radius:1;n.translate(-c.center.x,-c.center.y,-c.center.z),n.computeBoundingSphere();const u=Je(t,s.plaster_color??z),m=t==="pen"?new Z(n,12):null,g=t==="pen"?new Q({color:"#050505",toneMapped:!1,depthWrite:!1}):null,x=t==="pen"?new X({color:"#050505",side:Le,toneMapped:!1,depthWrite:!1}):null;return{geometry:n,material:u,edgeGeometry:m,edgeMaterial:g,silhouetteMaterial:x,scale:d}},[t,s.plaster_color,l]);return a.useEffect(()=>()=>{o.geometry.dispose(),o.material.dispose(),o.edgeGeometry?.dispose(),o.edgeMaterial?.dispose(),o.silhouetteMaterial?.dispose()},[o]),a.useLayoutEffect(()=>{r(s.id)},[s.id,o,r]),e.jsxs("group",{scale:o.scale,children:[o.silhouetteMaterial&&e.jsx("mesh",{geometry:o.geometry,material:o.silhouetteMaterial,scale:1.003,renderOrder:1}),e.jsx("mesh",{geometry:o.geometry,material:o.material,castShadow:t!=="pen",receiveShadow:t!=="pen",renderOrder:2}),o.edgeGeometry&&o.edgeMaterial&&e.jsx("lineSegments",{geometry:o.edgeGeometry,material:o.edgeMaterial,scale:1.001,renderOrder:4})]})}function Xe({model:s,mode:t,onReady:r}){return ie(s)?e.jsx(Qe,{model:s,mode:t,onReady:r}):e.jsx(Ze,{model:s,mode:t,onReady:r})}function et({modelKey:s,controlsRef:t}){const r=ve(l=>l.camera);return a.useLayoutEffect(()=>{r.position.set(...se),r.up.set(0,1,0),r.zoom=1,r.lookAt(0,0,0),r.updateProjectionMatrix();const l=t.current;l&&(l.target.set(0,0,0),l.update(),l.saveState())},[r,t,s]),null}function dt({onBack:s}){const[t,r]=a.useState(!1),[l,o]=a.useState(!1),[n,c]=a.useState(!1),[d,u]=a.useState([N]),[m,g]=a.useState(N.id),[x,_]=a.useState("pbr"),[h,j]=a.useState(!1),[p,v]=a.useState(!1),[w,E]=a.useState("outside"),[L,A]=a.useState(!1),[re,R]=a.useState(!1),[I,G]=a.useState(null),P=a.useRef(null),T=a.useRef(null),k=a.useRef(null),M=a.useRef(null),B=V(),{loading:ne,user:oe,isAdmin:O}=Ce(),f=d.find(i=>i.id===m)??d[0]??N,le=ie(f),D=Ye(f),b=x,C=a.useCallback(async()=>{try{const i=await Fe(),y=i.length>0?i:[N];u(y),g(S=>y.some(U=>U.id===S)?S:y.find(U=>U.is_featured)?.id??y[0].id),G(null),c(!0)}catch{u([N]),g(N.id),G("Using the built-in watch until the Supabase 3D table is ready."),c(!0)}},[]);a.useEffect(()=>{C()},[C]),a.useEffect(()=>{O||j(!1)},[O]),a.useEffect(()=>{h&&v(!1)},[h]),a.useEffect(()=>{n&&(A(!1),R(!1),E("outside"))},[n,f.hdri_public_url,f.public_url]),a.useEffect(()=>()=>{k.current&&window.clearTimeout(k.current),M.current&&window.clearTimeout(M.current)},[]),a.useEffect(()=>{let i=0;const y=window.requestAnimationFrame(()=>{i=window.requestAnimationFrame(()=>r(!0))});return()=>{window.cancelAnimationFrame(y),window.cancelAnimationFrame(i)}},[]);const F=l?"is-leaving":t?"is-entering":"is-visible",ce=n&&(re||L&&!B.active&&B.progress>=99.9),de=a.useCallback(i=>{i===f.id&&A(!0)},[f.id]),ue=a.useCallback(()=>{E(i=>i==="outside"?"entering":i),M.current&&window.clearTimeout(M.current),M.current=window.setTimeout(()=>{E(i=>i==="entering"?"visible":i),M.current=null},Ge)},[]),me=a.useCallback(i=>{if(v(!1),i===f.id&&w!=="leaving")return;T.current=i;const y=()=>{const S=T.current;T.current=null,k.current=null,S&&(A(!1),R(!1),E("outside"),g(S))};if(w!=="leaving"){if(M.current&&(window.clearTimeout(M.current),M.current=null),w==="outside"){y();return}E("leaving"),k.current=window.setTimeout(y,Ie)}},[w,f.id]),pe=()=>{l||(v(!1),E("leaving"),o(!0),window.setTimeout(s,900))};return e.jsxs("div",{className:`watch-studio fixed inset-0 z-[200] overflow-hidden text-black ${l?"is-leaving":t?"is-visible":""}`,style:{backgroundColor:Be[b]},children:[e.jsx("style",{children:He}),e.jsx(Ke,{complete:ce,onCompleted:ue},`${f.public_url}-${D}`),e.jsxs("div",{className:"fixed left-4 top-4 z-40 flex items-center gap-2 sm:left-6 sm:top-6",children:[e.jsx("div",{className:`watch-studio-piece ${F}`,style:{"--watch-delay":"0ms","--watch-exit-delay":"240ms"},children:e.jsx("button",{type:"button",onClick:pe,className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:"← BACK TO BOOK"})}),e.jsx("div",{className:`watch-studio-piece ${F}`,style:{"--watch-delay":"70ms","--watch-exit-delay":"180ms"},children:e.jsx("button",{type:"button",onClick:()=>v(i=>!i),"aria-expanded":p,"aria-controls":"watch-model-library",className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:"MODELS"})})]}),p&&!h&&e.jsx("button",{type:"button","aria-label":"Close model list",className:"fixed inset-0 z-[31] cursor-default bg-transparent",onClick:()=>v(!1)}),e.jsxs("aside",{id:"watch-model-library","aria-hidden":!p||h,className:`watch-model-balloon fixed left-4 top-[76px] z-[35] flex max-h-[72vh] w-[min(88vw,390px)] flex-col overflow-hidden rounded-[34px] border border-black/25 bg-white/95 p-5 shadow-[0_18px_65px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:left-6 sm:top-[82px] ${p&&!h?"is-open":""}`,children:[e.jsxs("div",{className:"mb-4 flex items-start justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[12px] tracking-[0.18em] text-black/45",children:"3D LIBRARY"}),e.jsx("h1",{className:"mt-1 text-[22px] font-light",children:"CHOOSE A MODEL"})]}),e.jsx("button",{type:"button",onClick:()=>v(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/25 bg-transparent text-[18px]","aria-label":"Close model list",children:"×"})]}),e.jsx("div",{className:"min-h-0 overflow-y-auto border-t border-black/15",children:d.map((i,y)=>{const S=i.id===f.id;return e.jsxs("button",{type:"button",onClick:()=>me(i.id),className:`watch-model-list-item grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-colors hover:bg-black/[0.035] ${S?"text-black":"text-black/65"}`,style:{"--model-index":y},children:[e.jsxs("span",{className:"min-w-0",children:[e.jsx("span",{className:"block truncate text-[16px]",children:i.name}),i.description&&e.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/50",children:i.description})]}),e.jsx("span",{className:"text-[14px]",children:i.is_featured?"*":S?">":""})]},i.id)})}),e.jsx("p",{className:"relative mt-3 text-[11px] text-black/40",children:"* Featured"})]}),!ne&&oe&&O&&e.jsx("div",{className:`watch-studio-piece fixed right-4 top-4 z-20 sm:right-6 sm:top-6 ${F}`,style:{"--watch-delay":"80ms","--watch-exit-delay":"180ms"},children:e.jsx("button",{type:"button",onClick:()=>j(i=>!i),className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:h?"CLOSE MANAGER":"MANAGE MODELS"})}),e.jsx("div",{className:`watch-model-stage watch-studio-canvas absolute inset-0 ${w}`,children:e.jsxs(xe,{shadows:b!=="pen",dpr:[1,1.5],gl:{antialias:!0,powerPreference:"high-performance"},camera:{position:se,fov:32,near:.01,far:1e4},children:[e.jsx("ambientLight",{intensity:b==="pen"?2.4:b==="arctic"?1.45:.62}),e.jsx("directionalLight",{position:[7,10,8],intensity:b==="pbr"?2.25:b==="arctic"?1.35:2.1,castShadow:b!=="pen","shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),e.jsx("directionalLight",{position:[-8,2,-5],intensity:b==="pbr"?.9:b==="arctic"?.48:.75}),e.jsx(be,{ref:P,makeDefault:!0,enabled:!h&&w==="visible",enableDamping:!0,dampingFactor:.075,enablePan:!0,enableRotate:!0,enableZoom:!0,rotateSpeed:.65,zoomSpeed:.8,panSpeed:.75,screenSpacePanning:!0,minDistance:.01,maxDistance:1e4,mouseButtons:{LEFT:$.ROTATE,MIDDLE:$.DOLLY,RIGHT:$.PAN},touches:{ONE:q.ROTATE,TWO:q.DOLLY_PAN}},f.public_url),e.jsx(et,{modelKey:f.public_url,controlsRef:P}),e.jsx(qe,{resetKey:f.public_url,onError:()=>R(!0),children:e.jsx(a.Suspense,{fallback:null,children:n&&e.jsx(Xe,{model:f,mode:b,onReady:de},`${f.public_url}-${b}`)})}),b==="pbr"&&e.jsx(we,{files:D},D),b!=="pen"&&e.jsx(ge,{position:[0,-1.9,0],scale:6,opacity:b==="arctic"?.14:.28,blur:2.5,far:4,resolution:512,frames:1}),b==="arctic"&&e.jsxs(W,{multisampling:0,resolutionScale:.75,children:[e.jsx(ye,{saturation:-1}),e.jsx(K,{halfRes:!0,quality:"performance",aoRadius:.22,distanceFalloff:.75,intensity:.42,color:"#d6d6d6"})]}),le&&b==="pbr"&&e.jsx(W,{multisampling:0,resolutionScale:.75,children:e.jsx(K,{halfRes:!0,quality:"performance",aoRadius:.2,distanceFalloff:.8,intensity:.9,color:"#555555"})})]})}),!h&&e.jsx("aside",{className:"pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4 sm:bottom-6",children:e.jsxs("div",{className:"pointer-events-auto flex w-full max-w-4xl flex-col items-center gap-3",children:[e.jsx("div",{className:`watch-studio-piece max-w-full text-center ${w}`,style:{"--watch-delay":"70ms","--watch-exit-delay":"120ms"},children:e.jsxs("p",{className:"max-w-[78vw] truncate text-[12px] tracking-[0.08em] text-black",children:[f.is_featured?"FEATURED — ":"",f.name.toUpperCase()]})}),f.description&&e.jsx("div",{className:`watch-studio-piece max-w-[min(78vw,620px)] text-center ${w}`,style:{"--watch-delay":"140ms","--watch-exit-delay":"60ms"},children:e.jsx("p",{className:"truncate text-[10px] tracking-[0.04em] text-black/50",children:f.description})}),e.jsx("nav",{className:`watch-studio-piece flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] tracking-[0.12em] text-black ${w}`,style:{"--watch-delay":"210ms","--watch-exit-delay":"0ms"},"aria-label":"3D renderer style",children:Pe.map(i=>e.jsx("button",{type:"button",onClick:()=>_(i.id),"aria-pressed":x===i.id,className:`py-1 outline-none transition-opacity focus-visible:underline focus-visible:underline-offset-4 ${x===i.id?"underline decoration-1 underline-offset-4 opacity-100":"opacity-45 hover:opacity-100"}`,children:i.label},i.id))}),I&&e.jsx("div",{className:"text-center text-[9px] text-black/45",children:I})]})}),h&&O&&e.jsx("section",{className:"fixed inset-x-3 bottom-3 top-20 z-30 flex overflow-hidden rounded-[28px] border border-black/20 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-20 sm:w-[min(760px,calc(100vw-40px))]",children:e.jsx(Ue,{onModelsChanged:()=>void C()})})]})}export{dt as default};
