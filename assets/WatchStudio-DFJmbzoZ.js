var Fe=Object.defineProperty;var Pe=(e,s,a)=>s in e?Fe(e,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[s]=a;var ne=(e,s,a)=>Pe(e,typeof s!="symbol"?s+"":s,a);import{r as n,j as t}from"./vendor-DYJyzUfl.js";import{u as ce,C as $e,O as Ie,E as Ue,h as ze,i as ie,H as Ge,N as re,d as de,j as ue,a as fe,k as Be,b as We,c as me,l as He,g as qe}from"./react-three-s54XUSep.js";import{aq as oe,ap as H,aU as pe,V as Y,be as he,aF as xe,d as be,af as Ke,M as Ve,aJ as Qe,aT as Ye,ai as Je,bf as Xe,at as we,aG as Ze,am as et}from"./three-B81a7shT.js";import{u as tt,A as st,l as at}from"./AdminThreeDModelManager-DdHCBrn5.js";import"./postprocessing-DQGK4Izs.js";import"./index-CfB3Zws8.js";import"./supabase-Ceyhdef9.js";import"./motion-BCTRx_rm.js";const nt="/models/watch-v1.glb",it="/studio.hdr",ge=1.8,ye=[0,0,8],J="#EEEAE1",rt=700,ot=940,lt=720*1e3,ct=[{id:"pbr",label:"PBR"},{id:"arctic",label:"ARCTIC"},{id:"pen",label:"PEN"}],dt={pbr:"#ffffff",arctic:"#ffffff",pen:"#ffffff"},R={id:"local-watch-fallback",name:"Tag Heuer Monaco x Gulf",description:"Built-in local watch model",file_name:"watch-v1.glb",storage_path:"models/watch-v1.glb",source_file_name:null,source_storage_path:null,source_format:null,hdri_file_name:null,hdri_storage_path:null,is_published:!0,is_featured:!0,is_watch:!1,sort_order:0,plaster_color:J,created_at:"",updated_at:"",public_url:nt,hdri_public_url:null};let O=null,L=null;async function ve(e=!1){const s=Date.now();if(e)O=null,L=null;else{if(O&&O.expiresAt>s)return O.models;if(L)return L}const a=at().then(i=>(O={expiresAt:Date.now()+lt,models:i},i));L=a;try{return await a}finally{L===a&&(L=null)}}function Me(e){return e.length>0?e:[R]}const ut=`
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
`;function ft({label:e="..."}){return t.jsx(He,{center:!0,children:t.jsx("div",{className:"whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-[11px] tracking-[0.16em] text-black/55 backdrop-blur-md",children:e})})}function mt({catalogReady:e,geometryReady:s,complete:a,onCompleted:i}){const{active:o,progress:l}=ce(),[f,c]=n.useState(!0),[p,u]=n.useState(!1),[w,v]=n.useState(0),S=n.useRef(!1);if(n.useEffect(()=>{const M=a?100:e?o?Math.min(92,12+l*.8):s?97:88:8;let g=0,d=!1;const y=()=>{v(h=>{const A=Math.max(h,M),_=A-h;return Math.abs(_)<.05?A:Math.min(a?100:99,h+Math.max(a?.35:.08,_*(a?.28:.12)))}),d||(g=window.requestAnimationFrame(y))};return g=window.requestAnimationFrame(y),()=>{d=!0,window.cancelAnimationFrame(g)}},[o,e,a,s,l]),n.useEffect(()=>{if(!a||w<100||S.current)return;S.current=!0,i();const M=window.setTimeout(()=>u(!0),120),g=window.setTimeout(()=>c(!1),680);return()=>{window.clearTimeout(M),window.clearTimeout(g)}},[a,w,i]),!f)return null;const b=Math.min(100,Math.max(0,Math.round(w)));return t.jsx("div",{"data-model-loading-overlay":"true",className:`pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-white px-8 transition-opacity duration-500 ${p?"opacity-0":"opacity-100"}`,children:t.jsxs("div",{className:"w-full max-w-[260px] bg-white px-5 py-4 text-black",children:[t.jsxs("div",{className:"mb-3 flex items-center justify-between text-[10px] tracking-[0.14em]",children:[t.jsx("span",{children:"..."}),t.jsxs("span",{className:"tabular-nums",children:[b,"%"]})]}),t.jsx("div",{className:"h-[3px] w-full overflow-hidden bg-black/10",role:"progressbar","aria-label":"Loading 3D model","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":b,children:t.jsx("div",{className:"h-full origin-left bg-black transition-[width] duration-150 ease-out",style:{width:`${w}%`}})})]})})}class pt extends n.Component{constructor(){super(...arguments);ne(this,"state",{failed:!1})}static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onError?.()}componentDidUpdate(a){a.resetKey!==this.props.resetKey&&this.state.failed&&this.setState({failed:!1})}render(){return this.state.failed?t.jsx(ft,{label:"MODEL COULD NOT LOAD"}):this.props.children}}function je(e){return e==="pen"?new be({color:"#ffffff",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):new we({color:"#ffffff",roughness:.68,metalness:0,clearcoat:.08,clearcoatRoughness:.58,sheen:.06,sheenColor:"#ffffff",envMapIntensity:0})}function ht(e){const s=e.clone();return s instanceof Ze&&(s.envMapIntensity=1.45),s.needsUpdate=!0,s}function X(e){return/\.stl$/i.test(e.file_name)||/\.stl$/i.test(e.storage_path)}const q={hour:"hourshand_pivot",minute:"minuteshand_pivot",second:"secondshand_pivot"},xt=new Y(0,0,1),K=Math.PI*2,le=new et;function V(e,s){let a=null;return e.traverse(i=>{!a&&i.name.trim().toLowerCase()===s&&(a=i)}),a}function bt(e){const s=V(e,q.hour),a=V(e,q.minute),i=V(e,q.second);return!s||!a||!i?null:{hour:{object:s,baseQuaternion:s.quaternion.clone()},minute:{object:a,baseQuaternion:a.quaternion.clone()},second:{object:i,baseQuaternion:i.quaternion.clone()}}}function Q(e,s){le.setFromAxisAngle(xt,s),e.object.quaternion.copy(e.baseQuaternion).multiply(le)}function wt(e,s){const a=s.getSeconds()+s.getMilliseconds()/1e3,i=s.getMinutes()+a/60,o=s.getHours()%12+i/60;Q(e.second,-(a/60)*K),Q(e.minute,-(i/60)*K),Q(e.hour,-(o/12)*K)}function Se(e){const s=e.hdri_public_url;if(!s)return it;const i=(e.hdri_file_name??e.hdri_storage_path??s.split("?",1)[0]).match(/\.(hdr|exr)$/i)?.[1]?.toLowerCase();return i?`${s}#environment.${i}`:s}function P(e){X(e)?de.preload(ue,e.public_url):fe.preload(e.public_url),Be.preload({files:Se(e)})}async function Dt(){try{const e=Me(await ve()),s=e.find(a=>a.is_featured)??e[0];P(s)}catch{P(R)}}function gt(e,s){return e!=="pbr"?je(e):new we({color:/^#[\dA-F]{6}$/i.test(s)?s:J,roughness:.86,metalness:0,clearcoat:.08,clearcoatRoughness:.72,sheen:.08,sheenColor:"#ffffff",envMapIntensity:1.05})}function yt({model:e,mode:s,onReady:a}){const{scene:i,animations:o}=fe(e.public_url),l=n.useMemo(()=>{const c=qe.clone(i),p=e.is_watch?bt(c):null,u=s==="pbr"?null:je(s),w=new Set,v=[],S=s==="pen"?new xe({color:"#050505",toneMapped:!1}):null;c.traverse(d=>{if(d instanceof Ve){if(s==="pbr"){const h=(Array.isArray(d.material)?d.material:[d.material]).map(A=>{const _=ht(A);return w.add(_),_});d.material=Array.isArray(d.material)?h:h[0]}else u&&(d.material=u);if(d.castShadow=s!=="pen",d.receiveShadow=s!=="pen",S){const y=new he(d.geometry,18),h=new Qe(y,S);h.renderOrder=4,d.add(h),v.push(y)}}}),c.updateMatrixWorld(!0);const b=new Ye().setFromObject(c,!0);if(b.isEmpty())return{object:c,watchPivots:p,position:new Y,scale:1,overrideMaterial:u,disposableMaterials:w,creaseLineMaterial:S,disposableGeometries:v};const M=b.getBoundingSphere(new pe),g=Number.isFinite(M.radius)&&M.radius>0?ge/M.radius:1;return{object:c,watchPivots:p,position:M.center.clone().multiplyScalar(-g),scale:g,overrideMaterial:u,disposableMaterials:w,creaseLineMaterial:S,disposableGeometries:v}},[s,e.is_watch,i]),f=n.useMemo(()=>new Je(l.object),[l.object]);return n.useEffect(()=>{if(o.length===0)return;const c=o.map(p=>{const u=f.clipAction(p);return u.reset(),u.enabled=!0,u.paused=!1,u.clampWhenFinished=!1,u.setLoop(Xe,1/0),u.setEffectiveTimeScale(1),u.setEffectiveWeight(1),u.play(),u});return()=>{c.forEach(p=>p.stop()),f.stopAllAction(),o.forEach(p=>f.uncacheClip(p)),f.uncacheRoot(l.object)}},[f,o,l.object]),me((c,p)=>{o.length>0&&f.update(p),l.watchPivots&&wt(l.watchPivots,new Date)}),n.useEffect(()=>()=>{l.overrideMaterial?.dispose(),l.disposableMaterials.forEach(c=>c.dispose()),l.creaseLineMaterial?.dispose(),l.disposableGeometries.forEach(c=>c.dispose())},[l]),n.useLayoutEffect(()=>{a(e.id)},[e.id,l,a]),t.jsx("group",{position:l.position,scale:l.scale,children:t.jsx("primitive",{object:l.object})})}function vt({model:e,mode:s,onReady:a}){const i=de(ue,e.public_url),o=n.useMemo(()=>{const l=i.clone();l.computeVertexNormals(),l.computeBoundingSphere();const f=l.boundingSphere??new pe(new Y,1),c=Number.isFinite(f.radius)&&f.radius>0?ge/f.radius:1;l.translate(-f.center.x,-f.center.y,-f.center.z),l.computeBoundingSphere();const p=gt(s,e.plaster_color??J),u=s==="pen"?new he(l,12):null,w=s==="pen"?new xe({color:"#050505",toneMapped:!1,depthWrite:!1}):null,v=s==="pen"?new be({color:"#050505",side:Ke,toneMapped:!1,depthWrite:!1}):null;return{geometry:l,material:p,edgeGeometry:u,edgeMaterial:w,silhouetteMaterial:v,scale:c}},[s,e.plaster_color,i]);return n.useEffect(()=>()=>{o.geometry.dispose(),o.material.dispose(),o.edgeGeometry?.dispose(),o.edgeMaterial?.dispose(),o.silhouetteMaterial?.dispose()},[o]),n.useLayoutEffect(()=>{a(e.id)},[e.id,o,a]),t.jsxs("group",{scale:o.scale,children:[o.silhouetteMaterial&&t.jsx("mesh",{geometry:o.geometry,material:o.silhouetteMaterial,scale:1.003,renderOrder:1}),t.jsx("mesh",{geometry:o.geometry,material:o.material,castShadow:s!=="pen",receiveShadow:s!=="pen",renderOrder:2}),o.edgeGeometry&&o.edgeMaterial&&t.jsx("lineSegments",{geometry:o.edgeGeometry,material:o.edgeMaterial,scale:1.001,renderOrder:4})]})}function Mt({model:e,mode:s,onReady:a}){return X(e)?t.jsx(vt,{model:e,mode:s,onReady:a}):t.jsx(yt,{model:e,mode:s,onReady:a})}function jt({modelId:e,onReady:s}){return n.useLayoutEffect(()=>{s(e)},[e,s]),null}function St({modelKey:e,controlsRef:s}){const a=We(i=>i.camera);return n.useLayoutEffect(()=>{a.position.set(...ye),a.up.set(0,1,0),a.zoom=1,a.lookAt(0,0,0),a.updateProjectionMatrix();const i=s.current;i&&(i.target.set(0,0,0),i.update(),i.saveState())},[a,s,e]),null}function _t({ready:e,readinessKey:s,onReady:a}){const i=n.useRef(0),o=n.useRef(!1);return n.useEffect(()=>{i.current=0,o.current=!1},[s]),me(()=>{if(!e){i.current=0;return}o.current||(i.current+=1,!(i.current<6)&&(o.current=!0,a(s)))}),null}function Ft({onBack:e}){const[s,a]=n.useState(!1),[i,o]=n.useState(!1),[l,f]=n.useState(!1),[c,p]=n.useState([R]),[u,w]=n.useState(R.id),[v,S]=n.useState("pbr"),[b,M]=n.useState(!1),[g,d]=n.useState(!1),[y,h]=n.useState("outside"),[A,_]=n.useState(!1),[_e,$]=n.useState(!1),[Ee,I]=n.useState(!1),[Z,ee]=n.useState(null),te=n.useRef(null),U=n.useRef(null),C=n.useRef(null),E=n.useRef(null),k=ce(),{loading:Ne,user:Ae,isAdmin:T}=tt(),m=c.find(r=>r.id===u)??c[0]??R,Re=X(m),D=Se(m),z=`${m.public_url}|${D}`,x=v,G=n.useCallback(async(r=!1)=>{_(!1),$(!1),I(!1),h("outside");try{const N=await ve(r),j=Me(N);p(j),w(ae=>j.some(W=>W.id===ae)?ae:j.find(W=>W.is_featured)?.id??j[0].id),ee(null),f(!0)}catch{p([R]),w(R.id),ee("Using the built-in watch until the Supabase 3D table is ready."),f(!0)}},[]);n.useEffect(()=>{G()},[G]),n.useEffect(()=>{T||M(!1)},[T]),n.useEffect(()=>{b&&d(!1)},[b]),n.useEffect(()=>()=>{C.current&&window.clearTimeout(C.current),E.current&&window.clearTimeout(E.current)},[]),n.useEffect(()=>{let r=0;const N=window.requestAnimationFrame(()=>{r=window.requestAnimationFrame(()=>a(!0))});return()=>{window.cancelAnimationFrame(N),window.cancelAnimationFrame(r)}},[]);const B=i?"is-leaving":s?"is-entering":"is-visible",F=`is-${y}`,Le=l&&(Ee||_e),ke=l&&A&&!k.active&&(k.progress>=99.9||k.total===0||k.loaded>=k.total),se=n.useCallback(r=>{r===m.id&&_(!0)},[m.id]),Oe=n.useCallback(r=>{r===z&&$(!0)},[z]),Ce=n.useCallback(()=>{h(r=>r==="outside"?"entering":r),E.current&&window.clearTimeout(E.current),E.current=window.setTimeout(()=>{h(r=>r==="entering"?"visible":r),E.current=null},ot)},[]),Te=n.useCallback(r=>{if(d(!1),r===m.id&&y!=="leaving")return;U.current=r;const N=()=>{const j=U.current;U.current=null,C.current=null,j&&(_(!1),$(!1),I(!1),h("outside"),w(j))};if(y!=="leaving"){if(E.current&&(window.clearTimeout(E.current),E.current=null),y==="outside"){N();return}h("leaving"),C.current=window.setTimeout(N,rt)}},[y,m.id]),De=()=>{i||(d(!1),h("leaving"),o(!0),window.setTimeout(e,900))};return t.jsxs("div",{className:`watch-studio fixed inset-0 z-[200] overflow-hidden text-black ${i?"is-leaving":s?"is-visible":""}`,style:{backgroundColor:dt[x]},children:[t.jsx("style",{children:ut}),t.jsx(mt,{catalogReady:l,geometryReady:A,complete:Le,onCompleted:Ce},`${m.public_url}-${D}`),t.jsxs("div",{className:"fixed left-4 top-4 z-40 flex items-center gap-2 sm:left-6 sm:top-6",children:[t.jsx("div",{className:`watch-studio-piece ${B}`,style:{"--watch-delay":"0ms","--watch-exit-delay":"240ms"},children:t.jsx("button",{type:"button",onClick:De,className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:"← BACK TO BOOK"})}),t.jsx("div",{className:`watch-studio-piece ${B}`,style:{"--watch-delay":"70ms","--watch-exit-delay":"180ms"},children:t.jsx("button",{type:"button",onClick:()=>d(r=>!r),"aria-expanded":g,"aria-controls":"watch-model-library",className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:"MODELS"})})]}),g&&!b&&t.jsx("button",{type:"button","aria-label":"Close model list",className:"fixed inset-0 z-[31] cursor-default bg-transparent",onClick:()=>d(!1)}),t.jsxs("aside",{id:"watch-model-library","aria-hidden":!g||b,className:`watch-model-balloon fixed left-4 top-[76px] z-[35] flex max-h-[72vh] w-[min(88vw,390px)] flex-col overflow-hidden rounded-[34px] border border-black/25 bg-white/95 p-5 shadow-[0_18px_65px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:left-6 sm:top-[82px] ${g&&!b?"is-open":""}`,children:[t.jsxs("div",{className:"mb-4 flex items-start justify-between gap-5",children:[t.jsxs("div",{children:[t.jsx("p",{className:"text-[12px] tracking-[0.18em] text-black/45",children:"3D LIBRARY"}),t.jsx("h1",{className:"mt-1 text-[22px] font-normal",children:"CHOOSE A MODEL"})]}),t.jsx("button",{type:"button",onClick:()=>d(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/25 bg-transparent text-[18px]","aria-label":"Close model list",children:"×"})]}),t.jsx("div",{className:"min-h-0 overflow-y-auto border-t border-black/15",children:c.map((r,N)=>{const j=r.id===m.id;return t.jsxs("button",{type:"button",onClick:()=>Te(r.id),onPointerEnter:()=>P(r),onFocus:()=>P(r),className:`watch-model-list-item grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-colors hover:bg-black/[0.035] ${j?"text-black":"text-black/65"}`,style:{"--model-index":N},children:[t.jsxs("span",{className:"min-w-0",children:[t.jsx("span",{className:"block truncate text-[16px]",children:r.name}),r.description&&t.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/50",children:r.description})]}),t.jsx("span",{className:"text-[14px]",children:r.is_featured?"*":j?">":""})]},r.id)})})]}),!Ne&&Ae&&T&&t.jsx("div",{className:`watch-studio-piece fixed right-4 top-4 z-20 sm:right-6 sm:top-6 ${B}`,style:{"--watch-delay":"80ms","--watch-exit-delay":"180ms"},children:t.jsx("button",{type:"button",onClick:()=>M(r=>!r),className:"flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95",children:b?"CLOSE MANAGER":"MANAGE MODELS"})}),t.jsx("div",{className:`watch-model-stage watch-studio-canvas absolute inset-0 ${F}`,children:t.jsxs($e,{shadows:x!=="pen",dpr:[1,1.5],gl:{antialias:!0,powerPreference:"high-performance"},camera:{position:ye,fov:32,near:.01,far:1e4},children:[t.jsx("ambientLight",{intensity:x==="pen"?2.4:x==="arctic"?1.45:.62}),t.jsx("directionalLight",{position:[7,10,8],intensity:x==="pbr"?2.25:x==="arctic"?1.35:2.1,castShadow:x!=="pen","shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),t.jsx("directionalLight",{position:[-8,2,-5],intensity:x==="pbr"?.9:x==="arctic"?.48:.75}),t.jsx(Ie,{ref:te,makeDefault:!0,enabled:!b&&y==="visible",enableDamping:!0,dampingFactor:.075,enablePan:!0,enableRotate:!0,enableZoom:!0,rotateSpeed:.65,zoomSpeed:.8,panSpeed:.75,screenSpacePanning:!0,minDistance:.01,maxDistance:1e4,mouseButtons:{LEFT:H.ROTATE,MIDDLE:H.DOLLY,RIGHT:H.PAN},touches:{ONE:oe.ROTATE,TWO:oe.DOLLY_PAN}},m.public_url),t.jsx(St,{modelKey:m.public_url,controlsRef:te}),t.jsx(_t,{ready:ke,readinessKey:z,onReady:Oe}),t.jsx(pt,{resetKey:m.public_url,onError:()=>I(!0),children:t.jsx(n.Suspense,{fallback:null,children:l&&t.jsxs(t.Fragment,{children:[t.jsx(Mt,{model:m,mode:x,onReady:se},`${m.public_url}-${x}`),t.jsx(jt,{modelId:m.id,onReady:se})]})})}),x==="pbr"&&t.jsx(n.Suspense,{fallback:null,children:t.jsx(Ue,{files:D},D)}),x!=="pen"&&t.jsx(ze,{position:[0,-1.9,0],scale:10,opacity:x==="arctic"?.12:.24,blur:3.25,far:5,resolution:512,smooth:!0,frames:1}),x==="arctic"&&t.jsxs(ie,{multisampling:0,resolutionScale:.75,children:[t.jsx(Ge,{saturation:-1}),t.jsx(re,{halfRes:!0,quality:"performance",aoRadius:.22,distanceFalloff:.75,intensity:.42,color:"#d6d6d6"})]}),Re&&x==="pbr"&&t.jsx(ie,{multisampling:0,resolutionScale:.75,children:t.jsx(re,{halfRes:!0,quality:"performance",aoRadius:.2,distanceFalloff:.8,intensity:.9,color:"#555555"})})]})}),!b&&t.jsx("aside",{className:"pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4 sm:bottom-6",children:t.jsxs("div",{className:"pointer-events-auto flex w-full max-w-4xl flex-col items-center gap-3",children:[t.jsx("div",{className:`watch-studio-piece max-w-full text-center ${F}`,style:{"--watch-delay":"70ms","--watch-exit-delay":"120ms"},children:t.jsx("p",{className:"max-w-[78vw] truncate text-[12px] tracking-[0.08em] text-black",children:m.name.toUpperCase()})}),m.description&&t.jsx("div",{className:`watch-studio-piece max-w-[min(78vw,620px)] text-center ${F}`,style:{"--watch-delay":"140ms","--watch-exit-delay":"60ms"},children:t.jsx("p",{className:"truncate text-[10px] tracking-[0.04em] text-black/50",children:m.description})}),t.jsx("nav",{className:`watch-studio-piece flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] tracking-[0.12em] text-black ${F}`,style:{"--watch-delay":"210ms","--watch-exit-delay":"0ms"},"aria-label":"3D renderer style",children:ct.map(r=>t.jsx("button",{type:"button",onClick:()=>S(r.id),"aria-pressed":v===r.id,className:`py-1 outline-none transition-opacity focus-visible:underline focus-visible:underline-offset-4 ${v===r.id?"animate-bounce decoration-1 opacity-100":"opacity-45 hover:opacity-100"}`,children:r.label},r.id))}),Z&&t.jsx("div",{className:"text-center text-[9px] text-black/45",children:Z})]})}),b&&T&&t.jsx("section",{className:"fixed inset-x-3 bottom-3 top-20 z-30 flex overflow-hidden rounded-[28px] border border-black/20 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-20 sm:w-[min(760px,calc(100vw-40px))]",children:t.jsx(st,{onModelsChanged:()=>void G(!0)})})]})}export{Ft as default,Dt as preloadWatchStudioExperience};
