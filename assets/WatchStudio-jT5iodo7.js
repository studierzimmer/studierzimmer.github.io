var Ot=Object.defineProperty;var It=(e,t,r)=>t in e?Ot(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ue=(e,t,r)=>It(e,typeof t!="symbol"?t+"":t,r);import{r as a,j as i}from"./react-core-CNRaOV61.js";import{e as Ye,C as zt,O as Ft,E as Pt,f as Ut,g as $e,H as $t,N as Ge,c as Qe,h as Ze,b as Je,i as Gt,u as Ht,a as Re,j as Wt,d as qt}from"./react-three-BrUaqfAs.js";import{d as ee,a8 as He,aa as We,a9 as xe,aH as et,bf as tt,ar as nt,at,$ as Kt,u as Vt,aw as Bt,aG as Xt,a2 as Yt,bc as Qt,af as it,as as Zt,a6 as Jt}from"./three-BwCgyHvQ.js";import{m as en,A as tn}from"./AdminThreeDModelManager-CVmLMH-W.js";import{i as nn,j as an,h as rn,S as sn}from"./index-DBfTEV-P.js";import{updateThreeDModel as on,listPublishedThreeDModels as cn}from"./threeDModelRepository-Bk-VkZW_.js";import{S as qe}from"./SectionNavigation-Cjj2WpjO.js";import"./postprocessing-C_rM_Z8U.js";import"./supabase-BimAfFLu.js";function ln(e,t,r,s,o){const l=new ee(...r),u=new ee,c=new He().setFromVector3(l),b=new ee;let w=!1,p=null;const M=E=>{const g=p;g&&(p=null,E&&(e.position.copy(l),e.up.set(0,1,0),e.zoom=1,t.target.copy(u),e.updateProjectionMatrix(),t.update()),t.enabled=g.enabled,t.enableDamping=g.damping,t.autoRotate=g.autoRotate,s(!1),g.resolve(E))};return{restore:()=>{if(w)return Promise.resolve(!1);if(p)return p.promise;if(e.position.distanceToSquared(l)<1e-8&&t.target.lengthSq()<1e-8&&Math.abs(e.zoom-1)<1e-6)return Promise.resolve(!0);const E=e.position.clone(),g=t.target.clone(),v=e.up.clone(),m=e.zoom,L=t.enabled,S=t.enableDamping,C=t.autoRotate;t.enabled=!1,t.enableDamping=!1,t.autoRotate=!1,t.update(),e.position.copy(E),e.up.copy(v),e.zoom=m,t.target.copy(g),e.updateProjectionMatrix(),t.update();const j=new He().setFromVector3(b.copy(E).sub(g)),de=Math.atan2(Math.sin(c.theta-j.theta),Math.cos(c.theta-j.theta));let V;const B=new Promise(ue=>{V=ue});return p={fromTarget:g,orbit:j,theta:de,zoom:m,elapsed:0,promise:B,resolve:V,enabled:L,damping:S,autoRotate:C},s(!0),o()&&M(!0),B},tick(E){if(!p||!Number.isFinite(E))return;p.elapsed+=Math.max(0,Math.min(E,.05));const g=Math.min(1,p.elapsed/.76),v=g-1,m=1+1.75*v*v*v+.75*v*v;t.target.copy(p.fromTarget).lerp(u,m);const L=Math.exp(Math.log(Math.max(1e-4,p.orbit.radius))*(1-m)+Math.log(c.radius)*m);b.setFromSphericalCoords(L,p.orbit.phi+(c.phi-p.orbit.phi)*m,p.orbit.theta+p.theta*m),e.position.copy(t.target).add(b),e.zoom=Math.exp(Math.log(Math.max(1e-4,p.zoom))*(1-m)),e.updateProjectionMatrix(),t.update(),g===1&&M(!0)},cancel:()=>M(!1),dispose(){w=!0,M(!1)}}}const dn="/models/watch-v1.glb",un="/studio.hdr",rt=1.8,Se=[0,0,8],je="#EEEAE1",fn=700,mn=940,pn=720*1e3,hn=1400,Ke=44;function Ve(){return typeof document>"u"||!document.hidden&&document.visibilityState!=="hidden"}function Be(e,t,r){const s=e?.get(),o=t?"always":"never";!s||s.frameloop===o||(t||(r.current=s.clock.elapsedTime),s.setFrameloop(o),s.clock.elapsedTime=r.current,t&&s.invalidate())}function gn(){const[e,t]=a.useState(Ve),r=a.useRef(null),s=a.useRef(0),o=a.useRef(()=>{});a.useLayoutEffect(()=>{const u=()=>{const c=Ve();Be(r.current,c,s),t(c)};return o.current=u,document.addEventListener("visibilitychange",u),u(),()=>{document.removeEventListener("visibilitychange",u),o.current=()=>{},Be(r.current,!1,s)}},[]);const l=a.useCallback(u=>{r.current=u,o.current()},[]);return{active:e,onCreated:l}}const wn=[{id:"pbr",label:"RENDER"},{id:"arctic",label:"ARCTIC"},{id:"pen",label:"PEN"}],bn={pbr:"#ffffff",arctic:"#ffffff",pen:"#ffffff"},F={id:"local-watch-fallback",name:"Tag Heuer Monaco x Gulf",description:"Built-in local watch model",file_name:"watch-v1.glb",storage_path:"models/watch-v1.glb",source_file_name:null,source_storage_path:null,source_format:null,hdri_file_name:null,hdri_storage_path:null,is_published:!0,is_featured:!0,is_watch:!1,sort_order:0,plaster_color:je,created_at:"",updated_at:"",public_url:dn,hdri_public_url:null};let P=null,J=null;async function st(e=!1){const t=Date.now();if(e)P=null,J=null;else{if(P&&P.expiresAt>t)return P.models;if(J)return J}const r=cn().then(s=>(P={expiresAt:Date.now()+pn,models:s},s));J=r;try{return await r}finally{J===r&&(J=null)}}function ot(e){return e.length>0?e:[F]}const xn=`
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
.watch-info-drawer { opacity:1; transform:scale(0); transform-origin:90% 20%; background:#f3f4f3; transition:transform 720ms cubic-bezier(.22,1.1,.3,1); }
.watch-info-drawer.is-open { transform:scale(1); }
.watch-model-drawer { opacity:1; transform:translate3d(0,104%,0); background:#f3f4f3; transition:transform 720ms cubic-bezier(.22,1.1,.3,1); will-change:transform; }
.watch-model-drawer.is-open { transform:translate3d(0,0,0); }
.watch-info-piece,.watch-model-list-item { opacity:1; transform:scale(0); transition:transform 650ms cubic-bezier(.22,1.1,.3,1); }
.watch-info-drawer.is-open .watch-info-piece,.watch-model-drawer.is-open .watch-model-list-item { transform:scale(1); }

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
`;function vn({label:e="..."}){return i.jsx(Wt,{center:!0,children:i.jsx("div",{className:"whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-[11px] tracking-[0.16em] text-black/55 backdrop-blur-md",children:e})})}function yn({catalogReady:e,geometryReady:t,complete:r,onCompleted:s}){const{active:o,progress:l}=Ye(),[u,c]=a.useState(!0),[b,w]=a.useState(!1),[p,M]=a.useState(0),k=a.useRef(!1);if(a.useEffect(()=>{const g=r?100:e?o?Math.min(92,12+l*.8):t?97:88:8;let v=0,m=!1;const L=()=>{M(S=>{const C=Math.max(S,g),j=C-S;return Math.abs(j)<.05?C:Math.min(r?100:99,S+Math.max(r?.35:.08,j*(r?.28:.12)))}),m||(v=window.requestAnimationFrame(L))};return v=window.requestAnimationFrame(L),()=>{m=!0,window.cancelAnimationFrame(v)}},[o,e,r,t,l]),a.useEffect(()=>{if(!r||p<100||k.current)return;k.current=!0;const g=window.matchMedia("(prefers-reduced-motion: reduce)").matches,v=window.setTimeout(()=>w(!0),g?0:120),m=window.setTimeout(()=>{c(!1),s()},g?1:440);return()=>{window.clearTimeout(v),window.clearTimeout(m)}},[r,p,s]),!u)return null;const E=Math.min(100,Math.max(0,Math.round(p)));return i.jsx("div",{"data-model-loading-overlay":"true",className:"pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-white px-8",children:i.jsxs("div",{className:"w-full max-w-[260px] bg-transparent px-5 py-4 text-black transition-transform duration-300 motion-reduce:duration-0",style:{transform:`scale(${b?0:1})`,transitionTimingFunction:"cubic-bezier(.22,.88,.3,1)"},children:[i.jsxs("div",{className:"mb-3 flex items-center justify-between text-[10px] tracking-[0.14em]",children:[i.jsx("span",{children:"..."}),i.jsxs("span",{className:"tabular-nums",children:[E,"%"]})]}),i.jsx("div",{className:"h-[3px] w-full overflow-hidden bg-black/10",role:"progressbar","aria-label":"Loading 3D model","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":E,children:i.jsx("div",{className:"h-full origin-left bg-black transition-[width] duration-150 ease-out",style:{width:`${p}%`}})})]})})}class Mn extends a.Component{constructor(){super(...arguments);Ue(this,"state",{failed:!1})}static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onError?.()}componentDidUpdate(r){r.resetKey!==this.props.resetKey&&this.state.failed&&this.setState({failed:!1})}render(){return this.state.failed?i.jsx(vn,{label:"MODEL COULD NOT LOAD"}):this.props.children}}function ct(e){return e==="pen"?new at({color:"#ffffff",polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):new it({color:"#ffffff",roughness:.68,metalness:0,clearcoat:.08,clearcoatRoughness:.58,sheen:.06,sheenColor:"#ffffff",envMapIntensity:0})}function En(e){const t=e.clone();return t instanceof Zt&&(t.envMapIntensity=1.45),t.needsUpdate=!0,t}function _e(e){return/\.stl$/i.test(e.file_name)||/\.stl$/i.test(e.storage_path)}const ve={hour:"hourshand_pivot",minute:"minuteshand_pivot",second:"secondshand_pivot"},Sn=new ee(0,0,1),ye=Math.PI*2,Xe=new Jt;function Me(e,t){let r=null;return e.traverse(s=>{!r&&s.name.trim().toLowerCase()===t&&(r=s)}),r}function Rn(e){const t=Me(e,ve.hour),r=Me(e,ve.minute),s=Me(e,ve.second);return!t||!r||!s?null:{hour:{object:t,baseQuaternion:t.quaternion.clone()},minute:{object:r,baseQuaternion:r.quaternion.clone()},second:{object:s,baseQuaternion:s.quaternion.clone()}}}function Ee(e,t){Xe.setFromAxisAngle(Sn,t),e.object.quaternion.copy(e.baseQuaternion).multiply(Xe)}function jn(e,t){const r=t.getSeconds()+t.getMilliseconds()/1e3,s=t.getMinutes()+r/60,o=t.getHours()%12+s/60;Ee(e.second,-(r/60)*ye),Ee(e.minute,-(s/60)*ye),Ee(e.hour,-(o/12)*ye)}function lt(e){const t=e.hdri_public_url;if(!t)return un;const s=(e.hdri_file_name??e.hdri_storage_path??t.split("?",1)[0]).match(/\.(hdr|exr)$/i)?.[1]?.toLowerCase();return s?`${t}#environment.${s}`:t}function le(e){_e(e)?Qe.preload(Ze,e.public_url):Je.preload(e.public_url),Gt.preload({files:lt(e)})}async function Vn(){try{const e=ot(await st()),t=e.find(r=>r.is_featured)??e[0];le(t)}catch{le(F)}}function _n(e,t){return e!=="pbr"?ct(e):new it({color:/^#[\dA-F]{6}$/i.test(t)?t:je,roughness:.86,metalness:0,clearcoat:.08,clearcoatRoughness:.72,sheen:.08,sheenColor:"#ffffff",envMapIntensity:1.05})}function Nn({model:e,mode:t,onReady:r}){const{scene:s,animations:o}=Je(e.public_url),l=a.useMemo(()=>{const c=qt.clone(s),b=e.is_watch?Rn(c):null,w=t==="pbr"?null:ct(t),p=new Set,M=[],k=t==="pen"?new nt({color:"#050505",toneMapped:!1}):null;c.traverse(m=>{if(m instanceof Vt){if(t==="pbr"){const S=(Array.isArray(m.material)?m.material:[m.material]).map(C=>{const j=En(C);return p.add(j),j});m.material=Array.isArray(m.material)?S:S[0]}else w&&(m.material=w);if(m.castShadow=t!=="pen",m.receiveShadow=t!=="pen",k){const L=new tt(m.geometry,18),S=new Bt(L,k);S.renderOrder=4,m.add(S),M.push(L)}}}),c.updateMatrixWorld(!0);const E=new Xt().setFromObject(c,!0);if(E.isEmpty())return{object:c,watchPivots:b,position:new ee,scale:1,overrideMaterial:w,disposableMaterials:p,creaseLineMaterial:k,disposableGeometries:M};const g=E.getBoundingSphere(new et),v=Number.isFinite(g.radius)&&g.radius>0?rt/g.radius:1;return{object:c,watchPivots:b,position:g.center.clone().multiplyScalar(-v),scale:v,overrideMaterial:w,disposableMaterials:p,creaseLineMaterial:k,disposableGeometries:M}},[t,e.is_watch,s]),u=a.useMemo(()=>new Yt(l.object),[l.object]);return a.useEffect(()=>{if(o.length===0)return;const c=o.map(b=>{const w=u.clipAction(b);return w.reset(),w.enabled=!0,w.paused=!1,w.clampWhenFinished=!1,w.setLoop(Qt,1/0),w.setEffectiveTimeScale(1),w.setEffectiveWeight(1),w.play(),w});return()=>{c.forEach(b=>b.stop()),u.stopAllAction(),o.forEach(b=>u.uncacheClip(b)),u.uncacheRoot(l.object)}},[u,o,l.object]),Re((c,b)=>{o.length>0&&u.update(b),l.watchPivots&&jn(l.watchPivots,new Date)}),a.useEffect(()=>()=>{l.overrideMaterial?.dispose(),l.disposableMaterials.forEach(c=>c.dispose()),l.creaseLineMaterial?.dispose(),l.disposableGeometries.forEach(c=>c.dispose())},[l]),a.useLayoutEffect(()=>{r(e.id)},[e.id,l,r]),i.jsx("group",{position:l.position,scale:l.scale,children:i.jsx("primitive",{object:l.object})})}function Ln({model:e,mode:t,onReady:r}){const s=Qe(Ze,e.public_url),o=a.useMemo(()=>{const l=s.clone();l.computeVertexNormals(),l.computeBoundingSphere();const u=l.boundingSphere??new et(new ee,1),c=Number.isFinite(u.radius)&&u.radius>0?rt/u.radius:1;l.translate(-u.center.x,-u.center.y,-u.center.z),l.computeBoundingSphere();const b=_n(t,e.plaster_color??je),w=t==="pen"?new tt(l,12):null,p=t==="pen"?new nt({color:"#050505",toneMapped:!1,depthWrite:!1}):null,M=t==="pen"?new at({color:"#050505",side:Kt,toneMapped:!1,depthWrite:!1}):null;return{geometry:l,material:b,edgeGeometry:w,edgeMaterial:p,silhouetteMaterial:M,scale:c}},[t,e.plaster_color,s]);return a.useEffect(()=>()=>{o.geometry.dispose(),o.material.dispose(),o.edgeGeometry?.dispose(),o.edgeMaterial?.dispose(),o.silhouetteMaterial?.dispose()},[o]),a.useLayoutEffect(()=>{r(e.id)},[e.id,o,r]),i.jsxs("group",{scale:o.scale,children:[o.silhouetteMaterial&&i.jsx("mesh",{geometry:o.geometry,material:o.silhouetteMaterial,scale:1.003,renderOrder:1}),i.jsx("mesh",{geometry:o.geometry,material:o.material,castShadow:t!=="pen",receiveShadow:t!=="pen",renderOrder:2}),o.edgeGeometry&&o.edgeMaterial&&i.jsx("lineSegments",{geometry:o.edgeGeometry,material:o.edgeMaterial,scale:1.001,renderOrder:4})]})}function Tn({model:e,mode:t,onReady:r}){return _e(e)?i.jsx(Ln,{model:e,mode:t,onReady:r}):i.jsx(Nn,{model:e,mode:t,onReady:r})}function An({modelId:e,onReady:t}){return a.useLayoutEffect(()=>{t(e)},[e,t]),null}function kn({modelKey:e,controlsRef:t,returnRef:r,onReturning:s}){const o=Ht(u=>u.camera),l=a.useRef(null);return a.useLayoutEffect(()=>{o.position.set(...Se),o.up.set(0,1,0),o.zoom=1,o.lookAt(0,0,0),o.updateProjectionMatrix();const u=t.current;if(u){u.target.set(0,0,0),u.update(),u.saveState();const c=ln(o,u,Se,s,()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);return l.current=c,r.current=c,()=>{c.dispose(),r.current===c&&(r.current=null),l.current===c&&(l.current=null)}}},[o,t,e,s,r]),Re((u,c)=>l.current?.tick(c)),null}function Cn({ready:e,readinessKey:t,onReady:r}){const s=a.useRef(0),o=a.useRef(!1);return a.useEffect(()=>{s.current=0,o.current=!1},[t]),Re(()=>{if(!e){s.current=0;return}o.current||(s.current+=1,!(s.current<6)&&(o.current=!0,r(t)))}),null}function Bn({onBack:e,onNavigate:t,onLogin:r,category:s,initialModelId:o}){const l=gn(),{settings:u}=nn(),{editing:c,saving:b,registerFields:w}=an(),[p,M]=a.useState({}),[k,E]=a.useState(!1),[g,v]=a.useState(!1),[m,L]=a.useState(!1),[S,C]=a.useState([F]),j=a.useMemo(()=>s?S.filter(n=>en(n,u.model_categories)===s):S,[S,s,u.model_categories]),[de,V]=a.useState(o??F.id),[B,ue]=a.useState("pbr"),[_,G]=a.useState(!1),[T,D]=a.useState(!1),[H,O]=a.useState(!1),[dt,X]=a.useState(!1),[ut,Ne]=a.useState(!1),[Dn,te]=a.useState(0),[On,fe]=a.useState(!1),[In,ft]=a.useState(null),[mt,Le]=a.useState("models"),[U,Y]=a.useState("outside"),[pt,ht]=a.useState(null),[gt,wt]=a.useState(null),[bt,xt]=a.useState(null),[se,Te]=a.useState(null),Ae=a.useRef(null),ne=a.useRef(null),[vt,yt]=a.useState(!1),$=a.useRef(0),Q=a.useRef(!0);a.useEffect(()=>{Q.current=!0;const n=f=>{const y=++$.current,x=(ne.current?.restore()??Promise.resolve(!0)).then(z=>{z&&Q.current&&y===$.current&&(D(!1),O(!1),G(!1))});f.detail.waitUntil(x)},d=()=>{$.current++,ne.current?.cancel()};return window.addEventListener("portfolio:before-exit",n),window.addEventListener("portfolio:before-exit-cancel",d),()=>{Q.current=!1,d(),window.removeEventListener("portfolio:before-exit",n),window.removeEventListener("portfolio:before-exit-cancel",d)}},[]);const me=a.useRef(null),oe=a.useRef(null),A=a.useRef(null),ae=a.useRef(null),Z=a.useRef(null),W=a.useRef(null),ie=Ye(),{isAdmin:re}=rn();a.useEffect(()=>{O(c)},[c]);const h=j.find(n=>n.id===de)??j[0]??F,ke=p[h.id],pe=c&&h.id!==F.id;a.useEffect(()=>{c?O(!0):M({})},[c,h.id]);const Ce=n=>{if(!pe||b)return;const d=h.id;M(f=>({...f,[d]:{...f[d]??{name:h.name,description:h.description,originalName:h.name,originalDescription:h.description},...n}}))};a.useEffect(()=>{if(!c)return;const n=d=>d.name.trim()!==d.originalName||d.description!==d.originalDescription;return w("model-info",{isDirty:()=>Object.values(p).some(n),cancel:()=>M({}),save:async()=>{const d=Object.entries(p).filter(([,f])=>n(f));if(d.some(([,f])=>!f.name.trim()))throw new Error("Inserisci un nome per ogni modello modificato.");for(const[f,y]of d){const x=await on(f,{name:y.name.trim(),description:y.description}),z={name:x.name,description:x.description};C(q=>q.map(K=>K.id===f?{...K,...z}:K)),P&&(P={...P,models:P.models.map(q=>q.id===f?{...q,...z}:q)}),M(q=>{const K={...q};return K[f]===y&&delete K[f],K})}}})},[c,p,w]);const Mt=_e(h),he=lt(h),N=`${h.id}|${h.public_url}|${he}`,De=pt===N,Et=gt===N,St=bt===N,Oe=a.useRef(N);a.useLayoutEffect(()=>{Oe.current!==N&&(Oe.current=N,A.current&&(window.clearTimeout(A.current),A.current=null),Y("outside"))},[N]);const R=B,Ie=k&&!g&&U==="visible"&&!_&&!T&&!H&&!ut,I=a.useCallback(()=>{ae.current&&(window.clearTimeout(ae.current),ae.current=null)},[]),ze=a.useCallback(()=>{I(),Ie&&(ae.current=window.setTimeout(()=>{te(0),Ne(!0),X(!0),ae.current=null},hn))},[Ie,I]),ge=a.useCallback(()=>{te(0),fe(!1),X(!1),I()},[I]),ce=a.useCallback(async(n=!1)=>{try{const d=await st(n),f=ot(d);C(f),V(y=>f.some(x=>x.id===y)?y:f.find(x=>x.is_featured)?.id??f[0].id),Te(null),L(!0)}catch{C([F]),V(F.id),Te("Supabase non è raggiungibile. È disponibile solo l’orologio incluso nel progetto."),L(!0)}},[]);a.useEffect(()=>{ce()},[ce]),a.useEffect(()=>{re||G(!1)},[re]),a.useEffect(()=>{_&&(D(!1),O(!1))},[_]),a.useEffect(()=>{T&&O(!1)},[T]),a.useEffect(()=>(ze(),I),[I,ze]),a.useEffect(()=>{if(!H)return;const n=d=>{const f=d.target;f instanceof Element&&(f.closest("[data-watch-info-panel]")||f.closest("[data-watch-info-toggle]")||O(!1))};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}},[H]),a.useEffect(()=>{const n=y=>{const x=Z.current;if(!x||x.pointerId!==y.pointerId)return;const z=Math.min(120,Math.max(0,y.clientX-x.startX));if(z>=Ke){Z.current=null,ge();return}te(z)},d=y=>{const x=Z.current;if(!x||x.pointerId!==y.pointerId)return;const z=Math.min(120,Math.max(0,y.clientX-x.startX));if(Z.current=null,fe(!1),z>=Ke||z<6){ge();return}te(0)},f=y=>{const x=Z.current;!x||x.pointerId!==y.pointerId||(Z.current=null,fe(!1),te(0))};return window.addEventListener("pointermove",n),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",f),()=>{window.removeEventListener("pointermove",n),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",f)}},[ge]),a.useEffect(()=>()=>{oe.current&&window.clearTimeout(oe.current),A.current&&window.clearTimeout(A.current),I()},[I]),a.useEffect(()=>{let n=0;const d=window.requestAnimationFrame(()=>{n=window.requestAnimationFrame(()=>E(!0))});return()=>{window.cancelAnimationFrame(d),window.cancelAnimationFrame(n)}},[]);const Rt=`is-${U}`,jt=m&&(St||Et),_t=m&&De&&!ie.active&&(ie.progress>=99.9||ie.total===0||ie.loaded>=ie.total),Fe=a.useCallback(n=>{n===h.id&&ht(N)},[N,h.id]),Nt=a.useCallback(n=>{n===N&&wt(n)},[N]),we=a.useCallback(()=>{Y(n=>n==="outside"?"entering":n),A.current&&window.clearTimeout(A.current),A.current=window.setTimeout(()=>{Y(n=>n==="entering"?"visible":n),A.current=null},mn)},[]),Pe=a.useCallback(n=>{if(D(!1),n===h.id&&U!=="leaving")return;me.current=n;const d=()=>{const f=me.current;if(me.current=null,oe.current=null,!!f){if(Y("outside"),f===h.id){we();return}V(f)}};if(U!=="leaving"){if(A.current&&(window.clearTimeout(A.current),A.current=null),U==="outside"){d();return}Y("leaving"),oe.current=window.setTimeout(d,fn)}},[we,U,h.id]),Lt=a.useCallback(n=>{const d=++$.current;(ne.current?.restore()??Promise.resolve(!0)).then(f=>{f&&Q.current&&d===$.current&&Pe(n)})},[Pe]),be=(n,d="other")=>{if(g)return;const f=++$.current;(ne.current?.restore()??Promise.resolve(!0)).then(y=>{!y||!Q.current||f!==$.current||(O(!1),D(!1),G(!1),X(!1),ft(d),Y("leaving"),v(!0),window.setTimeout(()=>{Q.current&&f===$.current&&n()},900))})},Tt=()=>{window.sessionStorage.setItem("gstudios:nav-continuity","models-to-library"),Le("library"),be(e,"library")},At=()=>{X(!1),G(!1),D(!1),O(n=>!n)},kt=n=>{if(n.button!==0||_||T||H||U!=="visible"){W.current=null;return}W.current={pointerId:n.pointerId,startX:n.clientX,startY:n.clientY}},Ct=n=>{const d=W.current;!d||d.pointerId!==n.pointerId||Math.hypot(n.clientX-d.startX,n.clientY-d.startY)>7&&(W.current=null)},Dt=n=>{const d=W.current;W.current=null,!(!d||d.pointerId!==n.pointerId||dt)&&(I(),Ne(!0),X(!0))};return[s&&u.menu_items.find(n=>n.id===s)?.label,...re?[{id:"manage",label:"MANAGE MODELS",action:()=>{D(!1),G(n=>!n)},event:"navigation_click",type:"interface",active:_}]:[]],m&&(j.length===0||o&&!S.some(n=>n.id===o))?i.jsxs("main",{className:"fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-white px-8 text-center text-black",children:[i.jsx(qe,{section:s??"models",onIndex:e}),i.jsx("p",{"data-blossom":!0,className:"blossom",children:o?"Questo modello non è attualmente disponibile.":`Nessun oggetto pubblicato in ${u.menu_items.find(n=>n.id===s)?.label??s}.`}),se&&i.jsx("p",{className:"max-w-sm text-xs leading-relaxed text-black/50",children:se}),i.jsx("button",{className:"border-b border-black/40 py-2 text-xs",onClick:()=>void ce(!0),children:"Riprova"}),re&&i.jsx("button",{className:"text-xs",onClick:r,children:"Gestisci i modelli"})]}):i.jsxs(i.Fragment,{children:[i.jsx("style",{children:xn}),i.jsx(qe,{section:s??"models",onIndex:e,onInfo:At,children:i.jsx("button",{type:"button","aria-expanded":T,"aria-controls":"watch-model-library",onClick:()=>{O(!1),D(n=>!n)},children:"Index"})}),i.jsx(sn,{section:s??"models"}),i.jsxs("div",{className:`watch-studio fixed inset-0 z-[200] overflow-hidden text-black ${g?"is-leaving":k?"is-visible":""}`,style:{backgroundColor:bn[R]},children:[i.jsx(yn,{catalogReady:m,geometryReady:De,complete:jt,onCompleted:we},N),T&&!_&&i.jsx("button",{type:"button","aria-label":"Close model list",className:"fixed inset-0 z-[31] cursor-default bg-transparent",onClick:()=>D(!1)}),i.jsx("aside",{id:"watch-model-library",ref:n=>{n&&(n.inert=!T||_)},"aria-hidden":!T||_,className:`watch-model-drawer fixed z-[65] flex flex-col overflow-hidden ${T&&!_?"is-open":""}`,children:i.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto",children:j.map((n,d)=>{const f=n.id===h.id;return i.jsx("button",{type:"button",onClick:()=>Lt(n.id),onPointerEnter:()=>le(n),onFocus:()=>le(n),className:`watch-model-list-item ${f?"text-black":"text-black/52"}`,style:{"--model-index":d},children:i.jsxs("span",{className:"min-w-0",children:[i.jsx("span",{className:"block text-[clamp(18px,2.8vw,30px)] leading-tight",children:n.name}),n.description&&i.jsx("span",{className:"mx-auto mt-2 block max-w-[58ch] text-[clamp(11px,1.4vw,15px)] leading-relaxed text-black/52",children:n.description})]})},n.id)})})}),i.jsxs("aside",{id:"watch-model-info","data-watch-info-panel":!0,"aria-hidden":!H,className:`watch-info-drawer fixed z-[75] flex flex-col overflow-hidden ${H?"is-open":""}`,children:[i.jsx("button",{type:"button",onClick:()=>O(!1),className:"absolute right-14 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 sm:right-16","aria-label":"Close model information",children:"chiudi"}),i.jsxs("div",{className:"flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-8 py-20 text-center sm:px-12",children:[i.jsx("div",{className:"watch-info-piece w-full",style:{"--info-delay":"80ms"},children:pe?i.jsx("input",{className:"inline-site-input w-full text-center text-[20px]","aria-label":"Nome del modello",value:ke?.name??h.name,disabled:b,onChange:n=>Ce({name:n.target.value})}):i.jsx("p",{className:"text-[clamp(19px,3vw,31px)] leading-tight text-black",children:h.name})}),(h.description||c)&&i.jsx("div",{className:"watch-info-piece mt-4 w-full",style:{"--info-delay":"145ms"},children:pe?i.jsx("textarea",{className:"inline-site-textarea","aria-label":"Descrizione del modello",value:ke?.description??h.description,rows:5,disabled:b,onChange:n=>Ce({description:n.target.value})}):i.jsx("p",{className:"mx-auto max-w-[38ch] text-[clamp(11px,1.4vw,15px)] leading-relaxed text-black/52",children:h.description})}),c&&h.id===F.id&&i.jsx("p",{className:"mt-5 text-[12px] leading-relaxed text-black/50",children:"Il modello incluso nel sito è in sola lettura. I testi dei modelli caricati nella libreria si modificano qui."}),i.jsx("nav",{className:"watch-info-piece mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2",style:{"--info-delay":"210ms"},"aria-label":"3D renderer style",children:wn.map(n=>i.jsx("button",{type:"button",onClick:()=>ue(n.id),"aria-pressed":B===n.id,className:`watch-render-option ${B===n.id?"is-active":""}`,children:n.label},n.id))}),se&&i.jsx("div",{className:"watch-info-piece mt-7 text-[9px] leading-relaxed text-black/45",style:{"--info-delay":"275ms"},children:se})]})]}),i.jsx("div",{"data-blossom":!0,className:`watch-model-stage watch-studio-canvas absolute inset-0 ${Rt}`,onPointerDown:kt,onPointerMove:Ct,onPointerUp:Dt,onPointerCancel:()=>{W.current=null},children:i.jsxs(zt,{frameloop:l.active?"always":"never",onCreated:l.onCreated,resize:{offsetSize:!0},shadows:R!=="pen",dpr:[1,1.5],gl:{antialias:!0,powerPreference:"high-performance"},camera:{position:Se,fov:32,near:.01,far:1e4},children:[i.jsx("ambientLight",{intensity:R==="pen"?2.4:R==="arctic"?1.45:.62}),i.jsx("directionalLight",{position:[7,10,8],intensity:R==="pbr"?2.25:R==="arctic"?1.35:2.1,castShadow:R!=="pen","shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),i.jsx("directionalLight",{position:[-8,2,-5],intensity:R==="pbr"?.9:R==="arctic"?.48:.75}),i.jsx(Ft,{ref:Ae,makeDefault:!0,enabled:!_&&!vt&&U==="visible",enableDamping:!0,dampingFactor:.075,enablePan:!0,enableRotate:!0,enableZoom:!0,rotateSpeed:.65,zoomSpeed:.8,panSpeed:.75,screenSpacePanning:!0,minDistance:.01,maxDistance:1e4,mouseButtons:{LEFT:xe.ROTATE,MIDDLE:xe.DOLLY,RIGHT:xe.PAN},touches:{ONE:We.ROTATE,TWO:We.DOLLY_PAN}},h.public_url),i.jsx(kn,{modelKey:h.public_url,controlsRef:Ae,returnRef:ne,onReturning:yt}),i.jsx(Cn,{ready:_t,readinessKey:N,onReady:Nt}),i.jsx(Mn,{resetKey:h.public_url,onError:()=>xt(N),children:i.jsx(a.Suspense,{fallback:null,children:m&&i.jsxs(i.Fragment,{children:[i.jsx(Tn,{model:h,mode:R,onReady:Fe},`${h.public_url}-${R}`),i.jsx(An,{modelId:h.id,onReady:Fe})]})})}),R==="pbr"&&i.jsx(a.Suspense,{fallback:null,children:i.jsx(Pt,{files:he},he)}),R!=="pen"&&i.jsx(Ut,{position:[0,-1.9,0],scale:10,opacity:R==="arctic"?.12:.24,blur:3.25,far:5,resolution:512,smooth:!0,frames:1}),R==="arctic"&&i.jsxs($e,{multisampling:0,resolutionScale:.75,children:[i.jsx($t,{saturation:-1}),i.jsx(Ge,{halfRes:!0,quality:"performance",aoRadius:.22,distanceFalloff:.75,intensity:.42,color:"#d6d6d6"})]}),Mt&&R==="pbr"&&i.jsx($e,{multisampling:0,resolutionScale:.75,children:i.jsx(Ge,{halfRes:!0,quality:"performance",aoRadius:.2,distanceFalloff:.8,intensity:.9,color:"#555555"})})]})}),_&&re&&i.jsx("section",{id:"watch-model-manager",className:"fixed inset-x-3 bottom-3 top-20 z-30 flex overflow-hidden rounded-[28px] border border-black/20 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-20 sm:w-[min(760px,calc(100vw-40px))]",children:i.jsx(tn,{onModelsChanged:()=>void ce(!0)})})]})]})}export{Bn as default,Vn as preloadWatchStudioExperience};
