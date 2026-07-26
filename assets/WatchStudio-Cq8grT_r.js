var ut=Object.defineProperty;var pt=(t,n,s)=>n in t?ut(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s;var Me=(t,n,s)=>pt(t,typeof n!="symbol"?n+"":n,s);import{r as i,j as a}from"./vendor-BsrOnjkE.js";import{u as Ne,C as ft,O as mt,E as ht,f as gt,g as Ee,H as wt,N as Se,d as Le,h as Ae,a as Te,i as bt,b as vt,c as ke,j as xt,e as yt}from"./react-three-CFel4_v1.js";import{aq as je,ap as ie,aU as De,V as ce,be as Ce,aF as Ie,d as Oe,af as Mt,M as Et,aJ as St,aT as jt,ai as Rt,bb as _t,at as ze,aG as Nt,am as Lt}from"./three-DX7GoU75.js";import{A as At,l as Tt}from"./AdminThreeDModelManager-BaSTGA4X.js";import{w as kt,S as Dt}from"./index-D2rXQNH4.js";import"./postprocessing-Y4pHl3pz.js";import"./supabase-antlwfka.js";import"./motion-PEBqIvyR.js";const Ct="/models/watch-v1.glb",It="/studio.hdr",Fe=1.8,Pe=[0,0,8],de="#EEEAE1",Ot=700,zt=940,Ft=720*1e3,Pt=1400,Re=44,$t=[{id:"pbr",label:"RENDER"},{id:"arctic",label:"ARCTIC"},{id:"pen",label:"PEN"}],Ut={pbr:"#ffffff",arctic:"#ffffff",pen:"#ffffff"},O={id:"local-watch-fallback",name:"Tag Heuer Monaco x Gulf",description:"Built-in local watch model",file_name:"watch-v1.glb",storage_path:"models/watch-v1.glb",source_file_name:null,source_storage_path:null,source_format:null,hdri_file_name:null,hdri_storage_path:null,is_published:!0,is_featured:!0,is_watch:!1,sort_order:0,plaster_color:de,created_at:"",updated_at:"",public_url:Ct,hdri_public_url:null};let W=null,P=null;async function $e(t=!1){const n=Date.now();if(t)W=null,P=null;else{if(W&&W.expiresAt>n)return W.models;if(P)return P}const s=Tt().then(r=>(W={expiresAt:Date.now()+Ft,models:r},r));P=s;try{return await s}finally{P===s&&(P=null)}}function Ue(t){return t.length>0?t:[O]}const Gt=`
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

.watch-primary-nav-shell {
  position: fixed;
  left: max(12px, env(safe-area-inset-left));
  top: max(12px, env(safe-area-inset-top));
  z-index: 280;
  transform: translate3d(0, 0, 0);
  transition: transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1);
  will-change: transform;
}

.watch-primary-nav-shell.is-hidden {
  transform: translate3d(calc(-100% - 18px), 0, 0);
}

.watch-primary-nav {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(34px, 5vw, 48px);
  align-items: start;
  gap: clamp(1px, 0.6vw, 7px);
  max-width: calc(100vw - 24px - env(safe-area-inset-left));
}

.watch-primary-nav-column {
  position: relative;
  width: 100%;
  height: clamp(96px, 16dvh, 138px);
  border: 0;
  outline: none;
  padding: 0;
  background: transparent;
  overflow: visible;
}

.watch-primary-nav-column > span {
  position: absolute;
  left: auto;
  right: 50%;
  top: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transform: rotate(-90deg);
  transform-origin: 100% 50%;
  color: rgb(0 0 0 / 0.42);
  font-size: clamp(11px, 1.5vw, 13px);
  font-weight: 400;
  letter-spacing: 0.08em;
  transition:
    color 480ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-primary-nav-column:hover > span,
.watch-primary-nav-column:focus-visible > span {
  color: rgb(0 0 0 / 0.72);
  transform: rotate(-90deg) scale(1.08);
}

.watch-primary-nav-column:focus-visible > span {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.watch-primary-nav-column.is-active > span {
  color: black;
  text-decoration: none;
}

.watch-info-toggle {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  top: max(18px, env(safe-area-inset-top));
  z-index: 285;
  border: 0;
  padding: 8px 0;
  background: transparent;
  color: rgb(0 0 0 / 0.44);
  font-size: clamp(11px, 1.5vw, 13px);
  font-weight: 400;
  letter-spacing: 0.08em;
  transition:
    color 240ms ease,
    opacity 420ms ease,
    transform 640ms cubic-bezier(0.22, 0.88, 0.3, 1);
}

.watch-info-toggle:hover,
.watch-info-toggle:focus-visible,
.watch-info-toggle.is-active {
  color: black;
}

.watch-info-toggle.is-nav-hidden {
  opacity: 0;
  pointer-events: none;
  transform: translate3d(130%, 0, 0);
}

.watch-info-toggle.is-panel-open {
  opacity: 0;
  pointer-events: none;
  transform: translate3d(130%, 0, 0);
}

.watch-nav-reveal-tab {
  --watch-tab-drag: 0px;
  position: fixed;
  left: 0;
  top: max(20px, env(safe-area-inset-top));
  z-index: 290;
  display: flex;
  width: 34px;
  height: 62px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 0 18px 18px 0;
  padding: 0 4px 0 0;
  background: rgb(207 207 207 / 0.96);
  color: rgb(0 0 0 / 0.66);
  box-shadow: 0 10px 32px rgb(0 0 0 / 0.08);
  opacity: 0;
  pointer-events: none;
  touch-action: none;
  transform: translate3d(calc(var(--watch-tab-drag) - 38px), 0, 0);
  transition:
    transform 600ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 260ms ease;
  will-change: transform;
}

.watch-nav-reveal-tab.is-visible {
  opacity: 1;
  pointer-events: auto;
  transform: translate3d(calc(var(--watch-tab-drag) - 5px), 0, 0);
}

.watch-nav-reveal-tab.is-dragging {
  transition: opacity 260ms ease;
}

.watch-nav-reveal-tab > span {
  display: block;
  font-size: 17px;
  font-weight: 400;
  line-height: 1;
  transition: transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-nav-reveal-tab:hover > span,
.watch-nav-reveal-tab:focus-visible > span {
  transform: translateX(3px);
}

@media (max-width: 380px), (max-height: 700px) {
  .watch-primary-nav-shell {
    top: max(8px, env(safe-area-inset-top));
    left: max(7px, env(safe-area-inset-left));
  }

  .watch-primary-nav {
    grid-auto-columns: 31px;
    gap: 0;
    max-width: calc(100vw - 14px);
  }

  .watch-primary-nav-column {
    height: clamp(76px, 20dvh, 104px);
  }

  .watch-info-toggle {
    right: max(10px, env(safe-area-inset-right));
    top: max(8px, env(safe-area-inset-top));
  }

  .watch-nav-reveal-tab {
    top: max(10px, env(safe-area-inset-top));
    height: 54px;
  }
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

.watch-model-drawer {
  left: 0;
  right: 0;
  bottom: 0;
  height: min(72dvh, 720px);
  transform: translate3d(0, 104%, 0);
  opacity: 0;
  background: rgb(207 207 207);
  pointer-events: none;
  transition:
    transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 360ms ease;
  will-change: transform, opacity;
}

.watch-model-drawer.is-open {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  pointer-events: auto;
}

.watch-model-list-item {
  display: flex;
  min-height: clamp(100px, 17dvh, 160px);
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: clamp(22px, 4vw, 46px);
  background: transparent;
  text-align: center;
  transform-origin: 50% 50%;
  transform: scale(0);
  opacity: 0;
  transition:
    transform 520ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 260ms ease;
  transition-delay: calc(var(--model-index, 0) * 55ms);
}

.watch-model-drawer.is-open .watch-model-list-item {
  transform: scale(1);
  opacity: 1;
}

.watch-model-list-item > span {
  width: min(680px, 88vw);
}

.watch-model-list-item:hover > span,
.watch-model-list-item:focus-visible > span {
  transform: scale(1.025);
}

.watch-model-list-item > span {
  transition:
    color 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-info-drawer {
  top: 0;
  right: 0;
  bottom: 0;
  width: min(460px, calc(100vw - 18px));
  transform: translate3d(104%, 0, 0);
  opacity: 0;
  background: rgb(207 207 207);
  pointer-events: none;
  transition:
    transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 360ms ease;
  will-change: transform, opacity;
}

.watch-info-drawer.is-open {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  pointer-events: auto;
}

.watch-info-piece {
  transform-origin: 50% 50%;
  transform: scale(0.72);
  opacity: 0;
  transition:
    transform 560ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 280ms ease;
  transition-delay: var(--info-delay, 0ms);
}

.watch-info-drawer.is-open .watch-info-piece {
  transform: scale(1);
  opacity: 1;
}

.watch-render-option {
  border: 0;
  padding: 8px 0;
  background: transparent;
  color: rgb(0 0 0 / 0.42);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.12em;
  transition:
    color 220ms ease,
    transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-render-option:hover,
.watch-render-option:focus-visible {
  color: rgb(0 0 0 / 0.76);
  transform: scale(1.06);
}

.watch-render-option.is-active {
  color: black;
}

@media (prefers-reduced-motion: reduce) {
  .watch-studio,
  .watch-studio-piece,
  .watch-model-stage,
  .watch-primary-nav-shell,
  .watch-info-toggle,
  .watch-nav-reveal-tab,
  .watch-model-drawer,
  .watch-model-list-item,
  .watch-info-drawer,
  .watch-info-piece {
    transition-duration: 1ms;
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
  }
}
`;function Ht({label:t="..."}){return a.jsx(xt,{center:!0,children:a.jsx("div",{className:"whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-[11px] tracking-[0.16em] text-black/55 backdrop-blur-md",children:t})})}function Wt({catalogReady:t,geometryReady:n,complete:s,onCompleted:r}){const{active:o,progress:l}=Ne(),[b,u]=i.useState(!0),[v,p]=i.useState(!1),[E,A]=i.useState(0),R=i.useRef(!1);if(i.useEffect(()=>{const _=s?100:t?o?Math.min(92,12+l*.8):n?97:88:8;let d=0,f=!1;const h=()=>{A(m=>{const y=Math.max(m,_),S=y-m;return Math.abs(S)<.05?y:Math.min(s?100:99,m+Math.max(s?.35:.08,S*(s?.28:.12)))}),f||(d=window.requestAnimationFrame(h))};return d=window.requestAnimationFrame(h),()=>{f=!0,window.cancelAnimationFrame(d)}},[o,t,s,n,l]),i.useEffect(()=>{if(!s||E<100||R.current)return;R.current=!0,r();const _=window.setTimeout(()=>p(!0),120),d=window.setTimeout(()=>u(!1),680);return()=>{window.clearTimeout(_),window.clearTimeout(d)}},[s,E,r]),!b)return null;const T=Math.min(100,Math.max(0,Math.round(E)));return a.jsx("div",{"data-model-loading-overlay":"true",className:`pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-white px-8 transition-opacity duration-500 ${v?"opacity-0":"opacity-100"}`,children:a.jsxs("div",{className:"w-full max-w-[260px] bg-white px-5 py-4 text-black",children:[a.jsxs("div",{className:"mb-3 flex items-center justify-between text-[10px] tracking-[0.14em]",children:[a.jsx("span",{children:"..."}),a.jsxs("span",{className:"tabular-nums",children:[T,"%"]})]}),a.jsx("div",{className:"h-[3px] w-full overflow-hidden bg-black/10",role:"progressbar","aria-label":"Loading 3D model","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":T,children:a.jsx("div",{className:"h-full origin-left bg-black transition-[width] duration-150 ease-out",style:{width:`${E}%`}})})]})})}class Bt extends i.Component{constructor(){super(...arguments);Me(this,"state",{failed:!1})}static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onError?.()}componentDidUpdate(s){s.resetKey!==this.props.resetKey&&this.state.failed&&this.setState({failed:!1})}render(){return this.state.failed?a.jsx(Ht,{label:"MODEL COULD NOT LOAD"}):this.props.children}}function Ge(t){return t==="pen"?new Oe({color:"#ffffff",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):new ze({color:"#ffffff",roughness:.68,metalness:0,clearcoat:.08,clearcoatRoughness:.58,sheen:.06,sheenColor:"#ffffff",envMapIntensity:0})}function qt(t){const n=t.clone();return n instanceof Nt&&(n.envMapIntensity=1.45),n.needsUpdate=!0,n}function ue(t){return/\.stl$/i.test(t.file_name)||/\.stl$/i.test(t.storage_path)}const se={hour:"hourshand_pivot",minute:"minuteshand_pivot",second:"secondshand_pivot"},Xt=new ce(0,0,1),re=Math.PI*2,_e=new Lt;function oe(t,n){let s=null;return t.traverse(r=>{!s&&r.name.trim().toLowerCase()===n&&(s=r)}),s}function Vt(t){const n=oe(t,se.hour),s=oe(t,se.minute),r=oe(t,se.second);return!n||!s||!r?null:{hour:{object:n,baseQuaternion:n.quaternion.clone()},minute:{object:s,baseQuaternion:s.quaternion.clone()},second:{object:r,baseQuaternion:r.quaternion.clone()}}}function le(t,n){_e.setFromAxisAngle(Xt,n),t.object.quaternion.copy(t.baseQuaternion).multiply(_e)}function Yt(t,n){const s=n.getSeconds()+n.getMilliseconds()/1e3,r=n.getMinutes()+s/60,o=n.getHours()%12+r/60;le(t.second,-(s/60)*re),le(t.minute,-(r/60)*re),le(t.hour,-(o/12)*re)}function He(t){const n=t.hdri_public_url;if(!n)return It;const r=(t.hdri_file_name??t.hdri_storage_path??n.split("?",1)[0]).match(/\.(hdr|exr)$/i)?.[1]?.toLowerCase();return r?`${n}#environment.${r}`:n}function K(t){ue(t)?Le.preload(Ae,t.public_url):Te.preload(t.public_url),bt.preload({files:He(t)})}async function pa(){try{const t=Ue(await $e()),n=t.find(s=>s.is_featured)??t[0];K(n)}catch{K(O)}}function Kt(t,n){return t!=="pbr"?Ge(t):new ze({color:/^#[\dA-F]{6}$/i.test(n)?n:de,roughness:.86,metalness:0,clearcoat:.08,clearcoatRoughness:.72,sheen:.08,sheenColor:"#ffffff",envMapIntensity:1.05})}function Qt({model:t,mode:n,onReady:s}){const{scene:r,animations:o}=Te(t.public_url),l=i.useMemo(()=>{const u=yt.clone(r),v=t.is_watch?Vt(u):null,p=n==="pbr"?null:Ge(n),E=new Set,A=[],R=n==="pen"?new Ie({color:"#050505",toneMapped:!1}):null;u.traverse(f=>{if(f instanceof Et){if(n==="pbr"){const m=(Array.isArray(f.material)?f.material:[f.material]).map(y=>{const S=qt(y);return E.add(S),S});f.material=Array.isArray(f.material)?m:m[0]}else p&&(f.material=p);if(f.castShadow=n!=="pen",f.receiveShadow=n!=="pen",R){const h=new Ce(f.geometry,18),m=new St(h,R);m.renderOrder=4,f.add(m),A.push(h)}}}),u.updateMatrixWorld(!0);const T=new jt().setFromObject(u,!0);if(T.isEmpty())return{object:u,watchPivots:v,position:new ce,scale:1,overrideMaterial:p,disposableMaterials:E,creaseLineMaterial:R,disposableGeometries:A};const _=T.getBoundingSphere(new De),d=Number.isFinite(_.radius)&&_.radius>0?Fe/_.radius:1;return{object:u,watchPivots:v,position:_.center.clone().multiplyScalar(-d),scale:d,overrideMaterial:p,disposableMaterials:E,creaseLineMaterial:R,disposableGeometries:A}},[n,t.is_watch,r]),b=i.useMemo(()=>new Rt(l.object),[l.object]);return i.useEffect(()=>{if(o.length===0)return;const u=o.map(v=>{const p=b.clipAction(v);return p.reset(),p.enabled=!0,p.paused=!1,p.clampWhenFinished=!1,p.setLoop(_t,1/0),p.setEffectiveTimeScale(1),p.setEffectiveWeight(1),p.play(),p});return()=>{u.forEach(v=>v.stop()),b.stopAllAction(),o.forEach(v=>b.uncacheClip(v)),b.uncacheRoot(l.object)}},[b,o,l.object]),ke((u,v)=>{o.length>0&&b.update(v),l.watchPivots&&Yt(l.watchPivots,new Date)}),i.useEffect(()=>()=>{l.overrideMaterial?.dispose(),l.disposableMaterials.forEach(u=>u.dispose()),l.creaseLineMaterial?.dispose(),l.disposableGeometries.forEach(u=>u.dispose())},[l]),i.useLayoutEffect(()=>{s(t.id)},[t.id,l,s]),a.jsx("group",{position:l.position,scale:l.scale,children:a.jsx("primitive",{object:l.object})})}function Jt({model:t,mode:n,onReady:s}){const r=Le(Ae,t.public_url),o=i.useMemo(()=>{const l=r.clone();l.computeVertexNormals(),l.computeBoundingSphere();const b=l.boundingSphere??new De(new ce,1),u=Number.isFinite(b.radius)&&b.radius>0?Fe/b.radius:1;l.translate(-b.center.x,-b.center.y,-b.center.z),l.computeBoundingSphere();const v=Kt(n,t.plaster_color??de),p=n==="pen"?new Ce(l,12):null,E=n==="pen"?new Ie({color:"#050505",toneMapped:!1,depthWrite:!1}):null,A=n==="pen"?new Oe({color:"#050505",side:Mt,toneMapped:!1,depthWrite:!1}):null;return{geometry:l,material:v,edgeGeometry:p,edgeMaterial:E,silhouetteMaterial:A,scale:u}},[n,t.plaster_color,r]);return i.useEffect(()=>()=>{o.geometry.dispose(),o.material.dispose(),o.edgeGeometry?.dispose(),o.edgeMaterial?.dispose(),o.silhouetteMaterial?.dispose()},[o]),i.useLayoutEffect(()=>{s(t.id)},[t.id,o,s]),a.jsxs("group",{scale:o.scale,children:[o.silhouetteMaterial&&a.jsx("mesh",{geometry:o.geometry,material:o.silhouetteMaterial,scale:1.003,renderOrder:1}),a.jsx("mesh",{geometry:o.geometry,material:o.material,castShadow:n!=="pen",receiveShadow:n!=="pen",renderOrder:2}),o.edgeGeometry&&o.edgeMaterial&&a.jsx("lineSegments",{geometry:o.edgeGeometry,material:o.edgeMaterial,scale:1.001,renderOrder:4})]})}function Zt({model:t,mode:n,onReady:s}){return ue(t)?a.jsx(Jt,{model:t,mode:n,onReady:s}):a.jsx(Qt,{model:t,mode:n,onReady:s})}function ea({modelId:t,onReady:n}){return i.useLayoutEffect(()=>{n(t)},[t,n]),null}function ta({modelKey:t,controlsRef:n}){const s=vt(r=>r.camera);return i.useLayoutEffect(()=>{s.position.set(...Pe),s.up.set(0,1,0),s.zoom=1,s.lookAt(0,0,0),s.updateProjectionMatrix();const r=n.current;r&&(r.target.set(0,0,0),r.update(),r.saveState())},[s,n,t]),null}function aa({ready:t,readinessKey:n,onReady:s}){const r=i.useRef(0),o=i.useRef(!1);return i.useEffect(()=>{r.current=0,o.current=!1},[n]),ke(()=>{if(!t){r.current=0;return}o.current||(r.current+=1,!(r.current<6)&&(o.current=!0,s(n)))}),null}function fa({onBack:t,onNavigate:n,onLogin:s}){const[r,o]=i.useState(!1),[l,b]=i.useState(!1),[u,v]=i.useState(!1),[p,E]=i.useState([O]),[A,R]=i.useState(O.id),[T,_]=i.useState("pbr"),[d,f]=i.useState(!1),[h,m]=i.useState(!1),[y,S]=i.useState(!1),[N,z]=i.useState(!1),[We,pe]=i.useState(!1),[Be,$]=i.useState(0),[qe,B]=i.useState(!1),[Xe,Ve]=i.useState(null),[Ye,fe]=i.useState("models"),[D,F]=i.useState("outside"),[me,Q]=i.useState(!1),[Ke,J]=i.useState(!1),[Qe,Z]=i.useState(!1),[he,ge]=i.useState(null),we=i.useRef(null),ee=i.useRef(null),q=i.useRef(null),k=i.useRef(null),U=i.useRef(null),C=i.useRef(null),I=i.useRef(null),G=Ne(),{isAdmin:X}=kt(),g=p.find(e=>e.id===A)??p[0]??O,Je=ue(g),V=He(g),te=`${g.public_url}|${V}`,x=T,be=r&&!l&&D==="visible"&&!d&&!h&&!y&&!We,L=i.useCallback(()=>{U.current&&(window.clearTimeout(U.current),U.current=null)},[]),ve=i.useCallback(()=>{L(),be&&(U.current=window.setTimeout(()=>{$(0),pe(!0),z(!0),U.current=null},Pt))},[be,L]),Y=i.useCallback(()=>{$(0),B(!1),z(!1),L()},[L]),ae=i.useCallback(async(e=!1)=>{Q(!1),J(!1),Z(!1),F("outside");try{const c=await $e(e),w=Ue(c);E(w),R(j=>w.some(M=>M.id===j)?j:w.find(M=>M.is_featured)?.id??w[0].id),ge(null),v(!0)}catch{E([O]),R(O.id),ge("Using the built-in watch until the Supabase 3D table is ready."),v(!0)}},[]);i.useEffect(()=>{ae()},[ae]),i.useEffect(()=>{X||f(!1)},[X]),i.useEffect(()=>{d&&(m(!1),S(!1))},[d]),i.useEffect(()=>{h&&S(!1)},[h]),i.useEffect(()=>(ve(),L),[L,ve]),i.useEffect(()=>{if(!y)return;const e=c=>{const w=c.target;w instanceof Element&&(w.closest("[data-watch-info-panel]")||w.closest("[data-watch-info-toggle]")||S(!1))};return document.addEventListener("pointerdown",e,!0),()=>{document.removeEventListener("pointerdown",e,!0)}},[y]),i.useEffect(()=>{const e=j=>{const M=C.current;if(!M||M.pointerId!==j.pointerId)return;const H=Math.min(120,Math.max(0,j.clientX-M.startX));if(H>=Re){C.current=null,Y();return}$(H)},c=j=>{const M=C.current;if(!M||M.pointerId!==j.pointerId)return;const H=Math.min(120,Math.max(0,j.clientX-M.startX));if(C.current=null,B(!1),H>=Re||H<6){Y();return}$(0)},w=j=>{const M=C.current;!M||M.pointerId!==j.pointerId||(C.current=null,B(!1),$(0))};return window.addEventListener("pointermove",e),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",w),()=>{window.removeEventListener("pointermove",e),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",w)}},[Y]),i.useEffect(()=>()=>{q.current&&window.clearTimeout(q.current),k.current&&window.clearTimeout(k.current),L()},[L]),i.useEffect(()=>{let e=0;const c=window.requestAnimationFrame(()=>{e=window.requestAnimationFrame(()=>o(!0))});return()=>{window.cancelAnimationFrame(c),window.cancelAnimationFrame(e)}},[]);const Ze=`is-${D}`,et=u&&(Qe||Ke),tt=u&&me&&!G.active&&(G.progress>=99.9||G.total===0||G.loaded>=G.total),xe=i.useCallback(e=>{e===g.id&&Q(!0)},[g.id]),at=i.useCallback(e=>{e===te&&J(!0)},[te]),nt=i.useCallback(()=>{F(e=>e==="outside"?"entering":e),k.current&&window.clearTimeout(k.current),k.current=window.setTimeout(()=>{F(e=>e==="entering"?"visible":e),k.current=null},zt)},[]),it=i.useCallback(e=>{if(m(!1),e===g.id&&D!=="leaving")return;ee.current=e;const c=()=>{const w=ee.current;ee.current=null,q.current=null,w&&(Q(!1),J(!1),Z(!1),F("outside"),R(w))};if(D!=="leaving"){if(k.current&&(window.clearTimeout(k.current),k.current=null),D==="outside"){c();return}F("leaving"),q.current=window.setTimeout(c,Ot)}},[D,g.id]),ne=(e,c="other")=>{l||(S(!1),m(!1),f(!1),z(!1),Ve(c),F("leaving"),b(!0),window.setTimeout(e,900))},st=()=>{window.sessionStorage.setItem("gstudios:nav-continuity","models-to-library"),fe("library"),ne(t,"library")},rt=()=>{z(!1),f(!1),m(!1),S(e=>!e)},ot=e=>{N&&(e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),C.current={pointerId:e.pointerId,startX:e.clientX},B(!0))},lt=e=>{if(e.button!==0||d||h||y||D!=="visible"){I.current=null;return}I.current={pointerId:e.pointerId,startX:e.clientX,startY:e.clientY}},ct=e=>{const c=I.current;!c||c.pointerId!==e.pointerId||Math.hypot(e.clientX-c.startX,e.clientY-c.startY)>7&&(I.current=null)},dt=e=>{const c=I.current;I.current=null,!(!c||c.pointerId!==e.pointerId||N)&&(L(),pe(!0),z(!0))},ye=[{id:"navigate",label:"NAVIGATE",action:()=>ne(n),event:"navigation_click",type:"navigation",active:!1},{id:"library",label:"LIBRARY",action:st,event:"navigation_click",type:"navigation",active:!1},{id:"login",label:"LOGIN",action:()=>ne(s),event:"navigation_click",type:"navigation",active:!1},{id:"models",label:"MODELS",action:()=>{const e=!d&&!h&&!y;f(!1),m(!1),fe("models"),e&&(L(),z(!0))},event:"navigation_click",type:"model",active:Ye==="models"&&!d&&!h},{id:"3d-library",label:"3D LIBRARY",action:()=>{f(!1),m(e=>!e)},event:"navigation_click",type:"model",active:h&&!d},...X?[{id:"manage",label:"MANAGE MODELS",action:()=>{m(!1),f(e=>!e)},event:"navigation_click",type:"interface",active:d}]:[]];return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:Gt}),a.jsx("div",{className:`watch-primary-nav-shell ${N?"is-hidden":""}`,"aria-hidden":N,children:a.jsx("div",{className:"watch-primary-nav",children:ye.map((e,c)=>{const w=e.id==="navigate"||e.id==="library"||e.id==="login"||e.id==="models",j=l&&(Xe!=="library"||!w)?"is-leaving":"is-visible";return a.jsx("div",{className:`watch-studio-piece ${j}`,style:{"--watch-delay":`${c*70}ms`,"--watch-exit-delay":`${(ye.length-c-1)*60}ms`},children:a.jsx("button",{type:"button",onClick:()=>{S(!1),e.action()},disabled:l,tabIndex:N?-1:void 0,"aria-expanded":e.id==="3d-library"?h:e.id==="manage"?d:void 0,"aria-controls":e.id==="3d-library"?"watch-model-library":e.id==="manage"?"watch-model-manager":void 0,"data-analytics-event":e.event,"data-analytics-type":e.type,"data-analytics-id":e.id,className:`watch-primary-nav-column disabled:pointer-events-none ${e.active?"is-active":""}`,children:a.jsx("span",{children:e.id==="login"?a.jsx(Dt,{text:"LOGIN"}):e.label})})},e.id)})})}),a.jsx("button",{type:"button","data-watch-info-toggle":!0,onClick:rt,disabled:l,tabIndex:N?-1:void 0,"aria-expanded":y,"aria-controls":"watch-model-info",className:`watch-info-toggle ${y?"is-active is-panel-open":""} ${N?"is-nav-hidden":""}`,children:"INFO"}),a.jsx("button",{type:"button","aria-label":"Reveal navigation","aria-hidden":!N,tabIndex:N?0:-1,onClick:e=>{e.detail===0&&Y()},onPointerDown:ot,className:`watch-nav-reveal-tab ${N?"is-visible":""} ${qe?"is-dragging":""}`,style:{"--watch-tab-drag":`${Be}px`},children:a.jsx("span",{"aria-hidden":"true",children:"→"})}),a.jsxs("div",{className:`watch-studio fixed inset-0 z-[200] overflow-hidden text-black ${l?"is-leaving":r?"is-visible":""}`,style:{backgroundColor:Ut[x]},children:[a.jsx(Wt,{catalogReady:u,geometryReady:me,complete:et,onCompleted:nt},`${g.public_url}-${V}`),h&&!d&&a.jsx("button",{type:"button","aria-label":"Close model list",className:"fixed inset-0 z-[31] cursor-default bg-transparent",onClick:()=>m(!1)}),a.jsxs("aside",{id:"watch-model-library","aria-hidden":!h||d,className:`watch-model-drawer fixed z-[65] flex flex-col overflow-hidden ${h&&!d?"is-open":""}`,children:[a.jsx("button",{type:"button",onClick:()=>m(!1),className:"absolute right-5 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 active:scale-95 sm:right-8","aria-label":"Close model list",children:"×"}),a.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto",children:p.map((e,c)=>{const w=e.id===g.id;return a.jsx("button",{type:"button",onClick:()=>it(e.id),onPointerEnter:()=>K(e),onFocus:()=>K(e),className:`watch-model-list-item ${w?"text-black":"text-black/52"}`,style:{"--model-index":c},children:a.jsxs("span",{className:"min-w-0",children:[a.jsx("span",{className:"block text-[clamp(18px,2.8vw,30px)] leading-tight",children:e.name}),e.description&&a.jsx("span",{className:"mx-auto mt-2 block max-w-[58ch] text-[clamp(11px,1.4vw,15px)] leading-relaxed text-black/52",children:e.description})]})},e.id)})})]}),a.jsxs("aside",{id:"watch-model-info","data-watch-info-panel":!0,"aria-hidden":!y,className:`watch-info-drawer fixed z-[75] flex flex-col overflow-hidden ${y?"is-open":""}`,children:[a.jsx("button",{type:"button",onClick:()=>S(!1),className:"absolute right-14 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 active:scale-95 sm:right-16","aria-label":"Close model information",children:"×"}),a.jsxs("div",{className:"flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-8 py-20 text-center sm:px-12",children:[a.jsx("div",{className:"watch-info-piece w-full",style:{"--info-delay":"80ms"},children:a.jsx("p",{className:"text-[clamp(19px,3vw,31px)] leading-tight text-black",children:g.name})}),g.description&&a.jsx("div",{className:"watch-info-piece mt-4 w-full",style:{"--info-delay":"145ms"},children:a.jsx("p",{className:"mx-auto max-w-[38ch] text-[clamp(11px,1.4vw,15px)] leading-relaxed text-black/52",children:g.description})}),a.jsx("nav",{className:"watch-info-piece mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2",style:{"--info-delay":"210ms"},"aria-label":"3D renderer style",children:$t.map(e=>a.jsx("button",{type:"button",onClick:()=>_(e.id),"aria-pressed":T===e.id,className:`watch-render-option ${T===e.id?"is-active":""}`,children:e.label},e.id))}),he&&a.jsx("div",{className:"watch-info-piece mt-7 text-[9px] leading-relaxed text-black/45",style:{"--info-delay":"275ms"},children:he})]})]}),a.jsx("div",{className:`watch-model-stage watch-studio-canvas absolute inset-0 ${Ze}`,onPointerDown:lt,onPointerMove:ct,onPointerUp:dt,onPointerCancel:()=>{I.current=null},children:a.jsxs(ft,{shadows:x!=="pen",dpr:[1,1.5],gl:{antialias:!0,powerPreference:"high-performance"},camera:{position:Pe,fov:32,near:.01,far:1e4},children:[a.jsx("ambientLight",{intensity:x==="pen"?2.4:x==="arctic"?1.45:.62}),a.jsx("directionalLight",{position:[7,10,8],intensity:x==="pbr"?2.25:x==="arctic"?1.35:2.1,castShadow:x!=="pen","shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),a.jsx("directionalLight",{position:[-8,2,-5],intensity:x==="pbr"?.9:x==="arctic"?.48:.75}),a.jsx(mt,{ref:we,makeDefault:!0,enabled:!d&&D==="visible",enableDamping:!0,dampingFactor:.075,enablePan:!0,enableRotate:!0,enableZoom:!0,rotateSpeed:.65,zoomSpeed:.8,panSpeed:.75,screenSpacePanning:!0,minDistance:.01,maxDistance:1e4,mouseButtons:{LEFT:ie.ROTATE,MIDDLE:ie.DOLLY,RIGHT:ie.PAN},touches:{ONE:je.ROTATE,TWO:je.DOLLY_PAN}},g.public_url),a.jsx(ta,{modelKey:g.public_url,controlsRef:we}),a.jsx(aa,{ready:tt,readinessKey:te,onReady:at}),a.jsx(Bt,{resetKey:g.public_url,onError:()=>Z(!0),children:a.jsx(i.Suspense,{fallback:null,children:u&&a.jsxs(a.Fragment,{children:[a.jsx(Zt,{model:g,mode:x,onReady:xe},`${g.public_url}-${x}`),a.jsx(ea,{modelId:g.id,onReady:xe})]})})}),x==="pbr"&&a.jsx(i.Suspense,{fallback:null,children:a.jsx(ht,{files:V},V)}),x!=="pen"&&a.jsx(gt,{position:[0,-1.9,0],scale:10,opacity:x==="arctic"?.12:.24,blur:3.25,far:5,resolution:512,smooth:!0,frames:1}),x==="arctic"&&a.jsxs(Ee,{multisampling:0,resolutionScale:.75,children:[a.jsx(wt,{saturation:-1}),a.jsx(Se,{halfRes:!0,quality:"performance",aoRadius:.22,distanceFalloff:.75,intensity:.42,color:"#d6d6d6"})]}),Je&&x==="pbr"&&a.jsx(Ee,{multisampling:0,resolutionScale:.75,children:a.jsx(Se,{halfRes:!0,quality:"performance",aoRadius:.2,distanceFalloff:.8,intensity:.9,color:"#555555"})})]})}),d&&X&&a.jsx("section",{id:"watch-model-manager",className:"fixed inset-x-3 bottom-3 top-20 z-30 flex overflow-hidden rounded-[28px] border border-black/20 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-20 sm:w-[min(760px,calc(100vw-40px))]",children:a.jsx(At,{onModelsChanged:()=>void ae(!0)})})]})]})}export{fa as default,pa as preloadWatchStudioExperience};
