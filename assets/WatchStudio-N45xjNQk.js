var zt=Object.defineProperty;var Ft=(e,t,r)=>t in e?zt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var $e=(e,t,r)=>Ft(e,typeof t!="symbol"?t+"":t,r);import{r as a,j as i}from"./react-core-Dk0zBmTC.js";import{e as Qe,C as Pt,O as Ut,E as $t,f as Gt,g as Ge,H as Ht,N as He,c as Ze,h as Je,b as et,i as Wt,u as qt,a as je,j as Vt,d as Kt}from"./react-three-BhdJjNB-.js";import{d as J,a8 as We,aa as qe,a9 as ve,aH as tt,bf as nt,ar as at,at as it,$ as Bt,u as Xt,aw as Yt,aG as Qt,a2 as Zt,bc as Jt,af as rt,as as en,a6 as tn}from"./three-BwCgyHvQ.js";import{m as nn,A as an}from"./AdminThreeDModelManager-IXEq_RX4.js";import{i as rn,j as sn,h as on,ag as ln,S as cn}from"./index-DKNI9Kkl.js";import{updateThreeDModel as dn,listPublishedThreeDModels as un}from"./threeDModelRepository-CWXIHgvU.js";import{S as Ve}from"./SectionNavigation-DYJsd_BZ.js";import"./postprocessing-C_rM_Z8U.js";import"./supabase-BimAfFLu.js";function fn(e,t,r,s,o){const c=new J(...r),d=new J,l=new We().setFromVector3(c),b=new J;let g=!1,p=null;const E=S=>{const w=p;w&&(p=null,S&&(e.position.copy(c),e.up.set(0,1,0),e.zoom=1,t.target.copy(d),e.updateProjectionMatrix(),t.update()),t.enabled=w.enabled,t.enableDamping=w.damping,t.autoRotate=w.autoRotate,s(!1),w.resolve(S))};return{restore:()=>{if(g)return Promise.resolve(!1);if(p)return p.promise;if(e.position.distanceToSquared(c)<1e-8&&t.target.lengthSq()<1e-8&&Math.abs(e.zoom-1)<1e-6)return Promise.resolve(!0);const S=e.position.clone(),w=t.target.clone(),v=e.up.clone(),m=e.zoom,L=t.enabled,R=t.enableDamping,C=t.autoRotate;t.enabled=!1,t.enableDamping=!1,t.autoRotate=!1,t.update(),e.position.copy(S),e.up.copy(v),e.zoom=m,t.target.copy(w),e.updateProjectionMatrix(),t.update();const j=new We().setFromVector3(b.copy(S).sub(w)),de=Math.atan2(Math.sin(l.theta-j.theta),Math.cos(l.theta-j.theta));let K;const ee=new Promise(ue=>{K=ue});return p={fromTarget:w,orbit:j,theta:de,zoom:m,elapsed:0,promise:ee,resolve:K,enabled:L,damping:R,autoRotate:C},s(!0),o()&&E(!0),ee},tick(S){if(!p||!Number.isFinite(S))return;p.elapsed+=Math.max(0,Math.min(S,.05));const w=Math.min(1,p.elapsed/.76),v=w-1,m=1+1.75*v*v*v+.75*v*v;t.target.copy(p.fromTarget).lerp(d,m);const L=Math.exp(Math.log(Math.max(1e-4,p.orbit.radius))*(1-m)+Math.log(l.radius)*m);b.setFromSphericalCoords(L,p.orbit.phi+(l.phi-p.orbit.phi)*m,p.orbit.theta+p.theta*m),e.position.copy(t.target).add(b),e.zoom=Math.exp(Math.log(Math.max(1e-4,p.zoom))*(1-m)),e.updateProjectionMatrix(),t.update(),w===1&&E(!0)},cancel:()=>E(!1),dispose(){g=!0,E(!1)}}}const mn="/models/watch-v1.glb",pn="/studio.hdr",st=1.8,Re=[0,0,8],_e="#EEEAE1",hn=700,wn=940,gn=720*1e3,bn=1400,Ke=44;function Be(){return typeof document>"u"||!document.hidden&&document.visibilityState!=="hidden"}function Xe(e,t,r){const s=e?.get(),o=t?"always":"never";!s||s.frameloop===o||(t||(r.current=s.clock.elapsedTime),s.setFrameloop(o),s.clock.elapsedTime=r.current,t&&s.invalidate())}function xn(){const[e,t]=a.useState(Be),r=a.useRef(null),s=a.useRef(0),o=a.useRef(()=>{});a.useLayoutEffect(()=>{const d=()=>{const l=Be();Xe(r.current,l,s),t(l)};return o.current=d,document.addEventListener("visibilitychange",d),d(),()=>{document.removeEventListener("visibilitychange",d),o.current=()=>{},Xe(r.current,!1,s)}},[]);const c=a.useCallback(d=>{r.current=d,o.current()},[]);return{active:e,onCreated:c}}const vn=[{id:"pbr",label:"RENDER"},{id:"arctic",label:"ARCTIC"},{id:"pen",label:"PEN"}],yn={pbr:"#ffffff",arctic:"#ffffff",pen:"#ffffff"},P={id:"local-watch-fallback",name:"Tag Heuer Monaco x Gulf",description:"Built-in local watch model",file_name:"watch-v1.glb",storage_path:"models/watch-v1.glb",source_file_name:null,source_storage_path:null,source_format:null,hdri_file_name:null,hdri_storage_path:null,is_published:!0,is_featured:!0,is_watch:!1,sort_order:0,plaster_color:_e,created_at:"",updated_at:"",public_url:mn,hdri_public_url:null};let U=null,Z=null;async function ot(e=!1){const t=Date.now();if(e)U=null,Z=null;else{if(U&&U.expiresAt>t)return U.models;if(Z)return Z}const r=un().then(s=>(U={expiresAt:Date.now()+gn,models:s},s));Z=r;try{return await r}finally{Z===r&&(Z=null)}}function lt(e){return e.length>0?e:[P]}const Mn=`
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
  outline: 1px solid currentColor;
  outline-offset: 4px;
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
  left: 0;
  bottom: 0;
  width: min(460px, calc(100vw - 18px));
  transform: translate3d(-104%, 0, 0);
  background: #f3f4f3;
  pointer-events: none;
  transition: transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1);
  will-change: transform;
}

.watch-info-drawer.is-open {
  transform: translate3d(0, 0, 0);
  pointer-events: auto;
}

.watch-info-piece {
  transform: none;
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

/* One scale choreography, with a mirrored exit and no image dissolves. */
@keyframes watch-elastic-scale {
  0% { transform:scale(0); } 48% { transform:scale(1.075); }
  66% { transform:scale(.97); } 80% { transform:scale(1.018); }
  91% { transform:scale(.994); } 100% { transform:scale(1); }
}
.watch-studio,.watch-studio.is-visible,.watch-studio.is-leaving { opacity:1; filter:none; transition:background-color 700ms ease; }
.watch-model-stage { opacity:1 !important; }
.watch-model-stage.is-outside { transform:scale(0); }
.watch-model-stage.is-entering,.watch-model-stage.is-leaving,.watch-studio-piece.is-entering,.watch-studio-piece.is-leaving { animation-name:watch-elastic-scale; }
.watch-info-drawer { opacity:1; }
.watch-model-drawer { opacity:1; transform:translate3d(0,104%,0); background:#f3f4f3; transition:transform 720ms cubic-bezier(.22,1.1,.3,1); will-change:transform; }
.watch-model-drawer.is-open { transform:translate3d(0,0,0); }
.watch-model-list-item { opacity:1; transform:scale(0); transition:transform 650ms cubic-bezier(.22,1.1,.3,1); }
.watch-model-drawer.is-open .watch-model-list-item { transform:scale(1); }

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
`;function En({label:e="..."}){return i.jsx(Vt,{center:!0,children:i.jsx("div",{className:"whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-[11px] tracking-[0.16em] text-black/55 backdrop-blur-md",children:e})})}function Sn({catalogReady:e,geometryReady:t,complete:r,onCompleted:s}){const{active:o,progress:c}=Qe(),[d,l]=a.useState(!0),[b,g]=a.useState(!1),[p,E]=a.useState(0),k=a.useRef(!1);if(a.useEffect(()=>{const w=r?100:e?o?Math.min(92,12+c*.8):t?97:88:8;let v=0,m=!1;const L=()=>{E(R=>{const C=Math.max(R,w),j=C-R;return Math.abs(j)<.05?C:Math.min(r?100:99,R+Math.max(r?.35:.08,j*(r?.28:.12)))}),m||(v=window.requestAnimationFrame(L))};return v=window.requestAnimationFrame(L),()=>{m=!0,window.cancelAnimationFrame(v)}},[o,e,r,t,c]),a.useEffect(()=>{if(!r||p<100||k.current)return;k.current=!0;const w=window.matchMedia("(prefers-reduced-motion: reduce)").matches,v=window.setTimeout(()=>g(!0),w?0:120),m=window.setTimeout(()=>{l(!1),s()},w?1:440);return()=>{window.clearTimeout(v),window.clearTimeout(m)}},[r,p,s]),!d)return null;const S=Math.min(100,Math.max(0,Math.round(p)));return i.jsx("div",{"data-model-loading-overlay":"true",className:"pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-white px-8",children:i.jsxs("div",{className:"w-full max-w-[260px] bg-transparent px-5 py-4 text-black transition-transform duration-300 motion-reduce:duration-0",style:{transform:`scale(${b?0:1})`,transitionTimingFunction:"cubic-bezier(.22,.88,.3,1)"},children:[i.jsxs("div",{className:"mb-3 flex items-center justify-between text-[10px] tracking-[0.14em]",children:[i.jsx("span",{children:"..."}),i.jsxs("span",{className:"tabular-nums",children:[S,"%"]})]}),i.jsx("div",{className:"h-[3px] w-full overflow-hidden bg-black/10",role:"progressbar","aria-label":"Loading 3D model","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":S,children:i.jsx("div",{className:"h-full origin-left bg-black transition-[width] duration-150 ease-out",style:{width:`${p}%`}})})]})})}class Rn extends a.Component{constructor(){super(...arguments);$e(this,"state",{failed:!1})}static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onError?.()}componentDidUpdate(r){r.resetKey!==this.props.resetKey&&this.state.failed&&this.setState({failed:!1})}render(){return this.state.failed?i.jsx(En,{label:"MODEL COULD NOT LOAD"}):this.props.children}}function ct(e){return e==="pen"?new it({color:"#ffffff",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):new rt({color:"#ffffff",roughness:.68,metalness:0,clearcoat:.08,clearcoatRoughness:.58,sheen:.06,sheenColor:"#ffffff",envMapIntensity:0})}function jn(e){const t=e.clone();return t instanceof en&&(t.envMapIntensity=1.45),t.needsUpdate=!0,t}function Ne(e){return/\.stl$/i.test(e.file_name)||/\.stl$/i.test(e.storage_path)}const ye={hour:"hourshand_pivot",minute:"minuteshand_pivot",second:"secondshand_pivot"},_n=new J(0,0,1),Me=Math.PI*2,Ye=new tn;function Ee(e,t){let r=null;return e.traverse(s=>{!r&&s.name.trim().toLowerCase()===t&&(r=s)}),r}function Nn(e){const t=Ee(e,ye.hour),r=Ee(e,ye.minute),s=Ee(e,ye.second);return!t||!r||!s?null:{hour:{object:t,baseQuaternion:t.quaternion.clone()},minute:{object:r,baseQuaternion:r.quaternion.clone()},second:{object:s,baseQuaternion:s.quaternion.clone()}}}function Se(e,t){Ye.setFromAxisAngle(_n,t),e.object.quaternion.copy(e.baseQuaternion).multiply(Ye)}function Ln(e,t){const r=t.getSeconds()+t.getMilliseconds()/1e3,s=t.getMinutes()+r/60,o=t.getHours()%12+s/60;Se(e.second,-(r/60)*Me),Se(e.minute,-(s/60)*Me),Se(e.hour,-(o/12)*Me)}function dt(e){const t=e.hdri_public_url;if(!t)return pn;const s=(e.hdri_file_name??e.hdri_storage_path??t.split("?",1)[0]).match(/\.(hdr|exr)$/i)?.[1]?.toLowerCase();return s?`${t}#environment.${s}`:t}function ce(e){Ne(e)?Ze.preload(Je,e.public_url):et.preload(e.public_url),Wt.preload({files:dt(e)})}async function Yn(){try{const e=lt(await ot()),t=e.find(r=>r.is_featured)??e[0];ce(t)}catch{ce(P)}}function Tn(e,t){return e!=="pbr"?ct(e):new rt({color:/^#[\dA-F]{6}$/i.test(t)?t:_e,roughness:.86,metalness:0,clearcoat:.08,clearcoatRoughness:.72,sheen:.08,sheenColor:"#ffffff",envMapIntensity:1.05})}function An({model:e,mode:t,onReady:r}){const{scene:s,animations:o}=et(e.public_url),c=a.useMemo(()=>{const l=Kt.clone(s),b=e.is_watch?Nn(l):null,g=t==="pbr"?null:ct(t),p=new Set,E=[],k=t==="pen"?new at({color:"#050505",toneMapped:!1}):null;l.traverse(m=>{if(m instanceof Xt){if(t==="pbr"){const R=(Array.isArray(m.material)?m.material:[m.material]).map(C=>{const j=jn(C);return p.add(j),j});m.material=Array.isArray(m.material)?R:R[0]}else g&&(m.material=g);if(m.castShadow=t!=="pen",m.receiveShadow=t!=="pen",k){const L=new nt(m.geometry,18),R=new Yt(L,k);R.renderOrder=4,m.add(R),E.push(L)}}}),l.updateMatrixWorld(!0);const S=new Qt().setFromObject(l,!0);if(S.isEmpty())return{object:l,watchPivots:b,position:new J,scale:1,overrideMaterial:g,disposableMaterials:p,creaseLineMaterial:k,disposableGeometries:E};const w=S.getBoundingSphere(new tt),v=Number.isFinite(w.radius)&&w.radius>0?st/w.radius:1;return{object:l,watchPivots:b,position:w.center.clone().multiplyScalar(-v),scale:v,overrideMaterial:g,disposableMaterials:p,creaseLineMaterial:k,disposableGeometries:E}},[t,e.is_watch,s]),d=a.useMemo(()=>new Zt(c.object),[c.object]);return a.useEffect(()=>{if(o.length===0)return;const l=o.map(b=>{const g=d.clipAction(b);return g.reset(),g.enabled=!0,g.paused=!1,g.clampWhenFinished=!1,g.setLoop(Jt,1/0),g.setEffectiveTimeScale(1),g.setEffectiveWeight(1),g.play(),g});return()=>{l.forEach(b=>b.stop()),d.stopAllAction(),o.forEach(b=>d.uncacheClip(b)),d.uncacheRoot(c.object)}},[d,o,c.object]),je((l,b)=>{o.length>0&&d.update(b),c.watchPivots&&Ln(c.watchPivots,new Date)}),a.useEffect(()=>()=>{c.overrideMaterial?.dispose(),c.disposableMaterials.forEach(l=>l.dispose()),c.creaseLineMaterial?.dispose(),c.disposableGeometries.forEach(l=>l.dispose())},[c]),a.useLayoutEffect(()=>{r(e.id)},[e.id,c,r]),i.jsx("group",{position:c.position,scale:c.scale,children:i.jsx("primitive",{object:c.object})})}function kn({model:e,mode:t,onReady:r}){const s=Ze(Je,e.public_url),o=a.useMemo(()=>{const c=s.clone();c.computeVertexNormals(),c.computeBoundingSphere();const d=c.boundingSphere??new tt(new J,1),l=Number.isFinite(d.radius)&&d.radius>0?st/d.radius:1;c.translate(-d.center.x,-d.center.y,-d.center.z),c.computeBoundingSphere();const b=Tn(t,e.plaster_color??_e),g=t==="pen"?new nt(c,12):null,p=t==="pen"?new at({color:"#050505",toneMapped:!1,depthWrite:!1}):null,E=t==="pen"?new it({color:"#050505",side:Bt,toneMapped:!1,depthWrite:!1}):null;return{geometry:c,material:b,edgeGeometry:g,edgeMaterial:p,silhouetteMaterial:E,scale:l}},[t,e.plaster_color,s]);return a.useEffect(()=>()=>{o.geometry.dispose(),o.material.dispose(),o.edgeGeometry?.dispose(),o.edgeMaterial?.dispose(),o.silhouetteMaterial?.dispose()},[o]),a.useLayoutEffect(()=>{r(e.id)},[e.id,o,r]),i.jsxs("group",{scale:o.scale,children:[o.silhouetteMaterial&&i.jsx("mesh",{geometry:o.geometry,material:o.silhouetteMaterial,scale:1.003,renderOrder:1}),i.jsx("mesh",{geometry:o.geometry,material:o.material,castShadow:t!=="pen",receiveShadow:t!=="pen",renderOrder:2}),o.edgeGeometry&&o.edgeMaterial&&i.jsx("lineSegments",{geometry:o.edgeGeometry,material:o.edgeMaterial,scale:1.001,renderOrder:4})]})}function Cn({model:e,mode:t,onReady:r}){return Ne(e)?i.jsx(kn,{model:e,mode:t,onReady:r}):i.jsx(An,{model:e,mode:t,onReady:r})}function Dn({modelId:e,onReady:t}){return a.useLayoutEffect(()=>{t(e)},[e,t]),null}function On({modelKey:e,controlsRef:t,returnRef:r,onReturning:s}){const o=qt(d=>d.camera),c=a.useRef(null);return a.useLayoutEffect(()=>{o.position.set(...Re),o.up.set(0,1,0),o.zoom=1,o.lookAt(0,0,0),o.updateProjectionMatrix();const d=t.current;if(d){d.target.set(0,0,0),d.update(),d.saveState();const l=fn(o,d,Re,s,()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);return c.current=l,r.current=l,()=>{l.dispose(),r.current===l&&(r.current=null),c.current===l&&(c.current=null)}}},[o,t,e,s,r]),je((d,l)=>c.current?.tick(l)),null}function In({ready:e,readinessKey:t,onReady:r}){const s=a.useRef(0),o=a.useRef(!1);return a.useEffect(()=>{s.current=0,o.current=!1},[t]),je(()=>{if(!e){s.current=0;return}o.current||(s.current+=1,!(s.current<6)&&(o.current=!0,r(t)))}),null}function Qn({onBack:e,onNavigate:t,onLogin:r,category:s,initialModelId:o}){const c=xn(),{settings:d}=rn(),{editing:l,saving:b,registerFields:g}=sn(),[p,E]=a.useState({}),[k,S]=a.useState(!1),[w,v]=a.useState(!1),[m,L]=a.useState(!1),[R,C]=a.useState([P]),j=a.useMemo(()=>s?R.filter(n=>nn(n,d.model_categories)===s):R,[R,s,d.model_categories]),[de,K]=a.useState(o??P.id),[ee,ue]=a.useState("pbr"),[_,H]=a.useState(!1),[T,D]=a.useState(!1),[z,F]=a.useState(!1),[ut,B]=a.useState(!1),[ft,Le]=a.useState(!1),[zn,te]=a.useState(0),[Fn,fe]=a.useState(!1),[Pn,mt]=a.useState(null),[pt,Te]=a.useState("models"),[$,X]=a.useState("outside"),[ht,wt]=a.useState(null),[gt,bt]=a.useState(null),[xt,vt]=a.useState(null),[se,Ae]=a.useState(null),ke=a.useRef(null),ne=a.useRef(null),[yt,Mt]=a.useState(!1),G=a.useRef(0),Y=a.useRef(!0);a.useEffect(()=>{Y.current=!0;const n=f=>{const M=++G.current,x=(ne.current?.restore()??Promise.resolve(!0)).then(I=>{I&&Y.current&&M===G.current&&(D(!1),F(!1),H(!1))});f.detail.waitUntil(x)},u=()=>{G.current++,ne.current?.cancel()};return window.addEventListener("portfolio:before-exit",n),window.addEventListener("portfolio:before-exit-cancel",u),()=>{Y.current=!1,u(),window.removeEventListener("portfolio:before-exit",n),window.removeEventListener("portfolio:before-exit-cancel",u)}},[]);const me=a.useRef(null),oe=a.useRef(null),A=a.useRef(null),ae=a.useRef(null),Q=a.useRef(null),W=a.useRef(null),ie=Qe(),{isAdmin:re}=on();a.useEffect(()=>{F(l)},[l]);const h=j.find(n=>n.id===de)??j[0]??P,Ce=p[h.id],pe=l&&h.id!==P.id;a.useEffect(()=>{l?F(!0):E({})},[l,h.id]);const De=n=>{if(!pe||b)return;const u=h.id;E(f=>({...f,[u]:{...f[u]??{name:h.name,description:h.description,originalName:h.name,originalDescription:h.description},...n}}))};a.useEffect(()=>{if(!l)return;const n=u=>u.name.trim()!==u.originalName||u.description!==u.originalDescription;return g("model-info",{isDirty:()=>Object.values(p).some(n),cancel:()=>E({}),save:async()=>{const u=Object.entries(p).filter(([,f])=>n(f));if(u.some(([,f])=>!f.name.trim()))throw new Error("Inserisci un nome per ogni modello modificato.");for(const[f,M]of u){const x=await dn(f,{name:M.name.trim(),description:M.description}),I={name:x.name,description:x.description};C(q=>q.map(V=>V.id===f?{...V,...I}:V)),U&&(U={...U,models:U.models.map(q=>q.id===f?{...q,...I}:q)}),E(q=>{const V={...q};return V[f]===M&&delete V[f],V})}}})},[l,p,g]);const Et=Ne(h),he=dt(h),N=`${h.id}|${h.public_url}|${he}`,Oe=ht===N,St=gt===N,Rt=xt===N,Ie=a.useRef(N);a.useLayoutEffect(()=>{Ie.current!==N&&(Ie.current=N,A.current&&(window.clearTimeout(A.current),A.current=null),X("outside"))},[N]);const jt=ln(h.id,d.model_view_modes),we=vn.filter(n=>jt.includes(n.id==="pbr"?"render":n.id)),y=we.some(n=>n.id===ee)?ee:we[0].id,ze=k&&!w&&$==="visible"&&!_&&!T&&!z&&!ft,O=a.useCallback(()=>{ae.current&&(window.clearTimeout(ae.current),ae.current=null)},[]),Fe=a.useCallback(()=>{O(),ze&&(ae.current=window.setTimeout(()=>{te(0),Le(!0),B(!0),ae.current=null},bn))},[ze,O]),ge=a.useCallback(()=>{te(0),fe(!1),B(!1),O()},[O]),le=a.useCallback(async(n=!1)=>{try{const u=await ot(n),f=lt(u);C(f),K(M=>f.some(x=>x.id===M)?M:f.find(x=>x.is_featured)?.id??f[0].id),Ae(null),L(!0)}catch{C([P]),K(P.id),Ae("Supabase non è raggiungibile. È disponibile solo l’orologio incluso nel progetto."),L(!0)}},[]);a.useEffect(()=>{le()},[le]),a.useEffect(()=>{re||H(!1)},[re]),a.useEffect(()=>{_&&(D(!1),F(!1))},[_]),a.useEffect(()=>{T&&F(!1)},[T]),a.useEffect(()=>(Fe(),O),[O,Fe]),a.useEffect(()=>{if(!z)return;const n=u=>{const f=u.target;f instanceof Element&&(f.closest("[data-watch-info-panel]")||f.closest("[data-watch-info-toggle]")||F(!1))};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}},[z]),a.useEffect(()=>{const n=M=>{const x=Q.current;if(!x||x.pointerId!==M.pointerId)return;const I=Math.min(120,Math.max(0,M.clientX-x.startX));if(I>=Ke){Q.current=null,ge();return}te(I)},u=M=>{const x=Q.current;if(!x||x.pointerId!==M.pointerId)return;const I=Math.min(120,Math.max(0,M.clientX-x.startX));if(Q.current=null,fe(!1),I>=Ke||I<6){ge();return}te(0)},f=M=>{const x=Q.current;!x||x.pointerId!==M.pointerId||(Q.current=null,fe(!1),te(0))};return window.addEventListener("pointermove",n),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",f),()=>{window.removeEventListener("pointermove",n),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",f)}},[ge]),a.useEffect(()=>()=>{oe.current&&window.clearTimeout(oe.current),A.current&&window.clearTimeout(A.current),O()},[O]),a.useEffect(()=>{let n=0;const u=window.requestAnimationFrame(()=>{n=window.requestAnimationFrame(()=>S(!0))});return()=>{window.cancelAnimationFrame(u),window.cancelAnimationFrame(n)}},[]);const _t=`is-${$}`,Nt=m&&(Rt||St),Lt=m&&Oe&&!ie.active&&(ie.progress>=99.9||ie.total===0||ie.loaded>=ie.total),Pe=a.useCallback(n=>{n===h.id&&wt(N)},[N,h.id]),Tt=a.useCallback(n=>{n===N&&bt(n)},[N]),be=a.useCallback(()=>{X(n=>n==="outside"?"entering":n),A.current&&window.clearTimeout(A.current),A.current=window.setTimeout(()=>{X(n=>n==="entering"?"visible":n),A.current=null},wn)},[]),Ue=a.useCallback(n=>{if(D(!1),n===h.id&&$!=="leaving")return;me.current=n;const u=()=>{const f=me.current;if(me.current=null,oe.current=null,!!f){if(X("outside"),f===h.id){be();return}K(f)}};if($!=="leaving"){if(A.current&&(window.clearTimeout(A.current),A.current=null),$==="outside"){u();return}X("leaving"),oe.current=window.setTimeout(u,hn)}},[be,$,h.id]),At=a.useCallback(n=>{const u=++G.current;(ne.current?.restore()??Promise.resolve(!0)).then(f=>{f&&Y.current&&u===G.current&&Ue(n)})},[Ue]),xe=(n,u="other")=>{if(w)return;const f=++G.current;(ne.current?.restore()??Promise.resolve(!0)).then(M=>{!M||!Y.current||f!==G.current||(F(!1),D(!1),H(!1),B(!1),mt(u),X("leaving"),v(!0),window.setTimeout(()=>{Y.current&&f===G.current&&n()},900))})},kt=()=>{window.sessionStorage.setItem("gstudios:nav-continuity","models-to-library"),Te("library"),xe(e,"library")},Ct=()=>{B(!1),H(!1),D(!1),F(n=>!n)},Dt=n=>{if(n.button!==0||_||T||z||$!=="visible"){W.current=null;return}W.current={pointerId:n.pointerId,startX:n.clientX,startY:n.clientY}},Ot=n=>{const u=W.current;!u||u.pointerId!==n.pointerId||Math.hypot(n.clientX-u.startX,n.clientY-u.startY)>7&&(W.current=null)},It=n=>{const u=W.current;W.current=null,!(!u||u.pointerId!==n.pointerId||ut)&&(O(),Le(!0),B(!0))};return[s&&d.menu_items.find(n=>n.id===s)?.label,...re?[{id:"manage",label:"MANAGE MODELS",action:()=>{D(!1),H(n=>!n)},event:"navigation_click",type:"interface",active:_}]:[]],m&&(j.length===0||o&&!R.some(n=>n.id===o))?i.jsxs("main",{className:"fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-white px-8 text-center text-black",children:[i.jsx(Ve,{section:s??"models",onIndex:e}),i.jsx("p",{"data-blossom":!0,className:"blossom",children:o?"Questo modello non è attualmente disponibile.":`Nessun oggetto pubblicato in ${d.menu_items.find(n=>n.id===s)?.label??s}.`}),se&&i.jsx("p",{className:"max-w-sm text-xs leading-relaxed text-black/50",children:se}),i.jsx("button",{className:"border-b border-black/40 py-2 text-xs",onClick:()=>void le(!0),children:"Riprova"}),re&&i.jsx("button",{className:"text-xs",onClick:r,children:"Gestisci i modelli"})]}):i.jsxs(i.Fragment,{children:[i.jsx("style",{children:Mn}),i.jsx(Ve,{section:s??"models",onIndex:e,onInfo:Ct,infoExpanded:z,infoControls:"watch-model-info",children:i.jsx("button",{type:"button","aria-expanded":T,"aria-controls":"watch-model-library",onClick:()=>{F(!1),D(n=>!n)},children:"List"})}),i.jsx(cn,{section:s??"models"}),i.jsxs("div",{className:`watch-studio fixed inset-0 z-[200] overflow-hidden text-black ${w?"is-leaving":k?"is-visible":""}`,style:{backgroundColor:yn[y]},children:[i.jsx(Sn,{catalogReady:m,geometryReady:Oe,complete:Nt,onCompleted:be},N),T&&!_&&i.jsx("button",{type:"button","aria-label":"Close model list",className:"fixed inset-0 z-[31] cursor-default bg-transparent",onClick:()=>D(!1)}),i.jsx("aside",{id:"watch-model-library",ref:n=>{n&&(n.inert=!T||_)},"aria-hidden":!T||_,className:`watch-model-drawer fixed z-[65] flex flex-col overflow-hidden ${T&&!_?"is-open":""}`,children:i.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto",children:j.map((n,u)=>{const f=n.id===h.id;return i.jsx("button",{type:"button",onClick:()=>At(n.id),onPointerEnter:()=>ce(n),onFocus:()=>ce(n),className:`watch-model-list-item ${f?"text-black":"text-black/52"}`,style:{"--model-index":u},children:i.jsxs("span",{className:"min-w-0",children:[i.jsx("span",{className:"block text-[clamp(18px,2.8vw,30px)] leading-tight",children:n.name}),n.description&&i.jsx("span",{className:"mx-auto mt-2 block max-w-[58ch] text-[clamp(11px,1.4vw,15px)] leading-relaxed text-black/52",children:n.description})]})},n.id)})})}),i.jsx("aside",{id:"watch-model-info","data-watch-info-panel":!0,ref:n=>{n&&(n.inert=!z)},"aria-hidden":!z,className:`watch-info-drawer fixed z-[75] flex flex-col overflow-hidden ${z?"is-open":""}`,children:i.jsxs("div",{className:"flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-8 py-20 text-center sm:px-12",children:[i.jsx("div",{className:"watch-info-piece w-full",style:{"--info-delay":"80ms"},children:pe?i.jsx("input",{className:"inline-site-input w-full text-center text-[20px]","aria-label":"Nome del modello",value:Ce?.name??h.name,disabled:b,onChange:n=>De({name:n.target.value})}):i.jsx("p",{className:"text-[clamp(19px,3vw,31px)] leading-tight text-black",children:h.name})}),(h.description||l)&&i.jsx("div",{className:"watch-info-piece mt-4 w-full",style:{"--info-delay":"145ms"},children:pe?i.jsx("textarea",{className:"inline-site-textarea","aria-label":"Descrizione del modello",value:Ce?.description??h.description,rows:5,disabled:b,onChange:n=>De({description:n.target.value})}):i.jsx("p",{className:"mx-auto max-w-[38ch] text-[clamp(11px,1.4vw,15px)] leading-relaxed text-black/52",children:h.description})}),l&&h.id===P.id&&i.jsx("p",{className:"mt-5 text-[12px] leading-relaxed text-black/50",children:"Il modello incluso nel sito è in sola lettura. I testi dei modelli caricati nella libreria si modificano qui."}),i.jsx("nav",{className:"watch-info-piece mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2",style:{"--info-delay":"210ms"},"aria-label":"3D renderer style",children:we.map(n=>i.jsx("button",{type:"button",onClick:()=>ue(n.id),"aria-pressed":y===n.id,className:`watch-render-option ${y===n.id?"is-active":""}`,children:n.label},n.id))}),se&&i.jsx("div",{className:"watch-info-piece mt-7 text-[9px] leading-relaxed text-black/45",style:{"--info-delay":"275ms"},children:se})]})}),i.jsx("div",{"data-blossom":!0,className:`watch-model-stage watch-studio-canvas absolute inset-0 ${_t}`,onPointerDown:Dt,onPointerMove:Ot,onPointerUp:It,onPointerCancel:()=>{W.current=null},children:i.jsxs(Pt,{frameloop:c.active?"always":"never",onCreated:c.onCreated,resize:{offsetSize:!0},shadows:y!=="pen",dpr:[1,1.5],gl:{antialias:!0,powerPreference:"high-performance"},camera:{position:Re,fov:32,near:.01,far:1e4},children:[i.jsx("ambientLight",{intensity:y==="pen"?2.4:y==="arctic"?1.45:.62}),i.jsx("directionalLight",{position:[7,10,8],intensity:y==="pbr"?2.25:y==="arctic"?1.35:2.1,castShadow:y!=="pen","shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),i.jsx("directionalLight",{position:[-8,2,-5],intensity:y==="pbr"?.9:y==="arctic"?.48:.75}),i.jsx(Ut,{ref:ke,makeDefault:!0,enabled:!_&&!yt&&$==="visible",enableDamping:!0,dampingFactor:.075,enablePan:!0,enableRotate:!0,enableZoom:!0,rotateSpeed:.65,zoomSpeed:.8,panSpeed:.75,screenSpacePanning:!0,minDistance:.01,maxDistance:1e4,mouseButtons:{LEFT:ve.ROTATE,MIDDLE:ve.DOLLY,RIGHT:ve.PAN},touches:{ONE:qe.ROTATE,TWO:qe.DOLLY_PAN}},h.public_url),i.jsx(On,{modelKey:h.public_url,controlsRef:ke,returnRef:ne,onReturning:Mt}),i.jsx(In,{ready:Lt,readinessKey:N,onReady:Tt}),i.jsx(Rn,{resetKey:h.public_url,onError:()=>vt(N),children:i.jsx(a.Suspense,{fallback:null,children:m&&i.jsxs(i.Fragment,{children:[i.jsx(Cn,{model:h,mode:y,onReady:Pe},`${h.public_url}-${y}`),i.jsx(Dn,{modelId:h.id,onReady:Pe})]})})}),y==="pbr"&&i.jsx(a.Suspense,{fallback:null,children:i.jsx($t,{files:he},he)}),y!=="pen"&&i.jsx(Gt,{position:[0,-1.9,0],scale:10,opacity:y==="arctic"?.12:.24,blur:3.25,far:5,resolution:512,smooth:!0,frames:1}),y==="arctic"&&i.jsxs(Ge,{multisampling:0,resolutionScale:.75,children:[i.jsx(Ht,{saturation:-1}),i.jsx(He,{halfRes:!0,quality:"performance",aoRadius:.22,distanceFalloff:.75,intensity:.42,color:"#d6d6d6"})]}),Et&&y==="pbr"&&i.jsx(Ge,{multisampling:0,resolutionScale:.75,children:i.jsx(He,{halfRes:!0,quality:"performance",aoRadius:.2,distanceFalloff:.8,intensity:.9,color:"#555555"})})]})}),_&&re&&i.jsx("section",{id:"watch-model-manager",className:"fixed inset-x-3 bottom-3 top-20 z-30 flex overflow-hidden rounded-[28px] border border-black/20 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-20 sm:w-[min(760px,calc(100vw-40px))]",children:i.jsx(an,{onModelsChanged:()=>void le(!0)})})]})]})}export{Qn as default,Yn as preloadWatchStudioExperience};
