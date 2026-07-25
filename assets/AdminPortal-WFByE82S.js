import{r as a,j as e}from"./vendor-FJugjbCd.js";import{l as pe,c as Qe,u as Ze,d as Xe,s as Y,D as Be,a as _e,b as et,e as Fe,f as tt,g as at,h as st,i as nt,j as rt,m as it,k as lt,n as ct}from"./index-B6_EXeUo.js";import{A as ot,B as dt}from"./AdminThreeDModelManager-1RTGXGsF.js";import{m as U,A as mt}from"./motion-Cje7NOoT.js";import"./three-O18aLqgg.js";import"./react-three-Cf3ZNpbQ.js";import"./postprocessing-dT4kHdQ4.js";import"./supabase-BUBRDUZV.js";const Q="w-full border-0 border-b border-black/30 bg-transparent px-0 py-2 text-[13px] outline-none focus:border-black",ue="border-0 bg-transparent px-2 py-2 text-[12px] underline-offset-4 transition-transform hover:scale-[1.02] hover:underline active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";function ae(s){return s instanceof Error?s.message:"Something went wrong."}function ut({onSectionsChanged:s}){const[o,l]=a.useState([]),[j,r]=a.useState(null),[i,g]=a.useState(!0),[p,b]=a.useState(!1),[f,d]=a.useState(null),[u,y]=a.useState(null),[k,N]=a.useState(""),[E,C]=a.useState(""),[I,h]=a.useState(""),[P,n]=a.useState(""),[v,T]=a.useState(0),[D,O]=a.useState(!0),A=a.useMemo(()=>o.find(c=>c.id===j)??null,[o,j]),L=a.useCallback(async c=>{const w=await pe();return l(w),r(V=>{const M=c??V;return M&&w.some(ie=>ie.id===M)?M:w[0]?.id??null}),s?.(w),w},[s]);a.useEffect(()=>{let c=!0;return pe().then(w=>{c&&(l(w),r(w[0]?.id??null))}).catch(w=>{c&&y(ae(w))}).finally(()=>{c&&g(!1)}),()=>{c=!1}},[]),a.useEffect(()=>{A&&(h(A.name),n(A.code),T(A.sort_order),O(A.is_visible))},[A]);const B=()=>{d(null),y(null)},$=async c=>{c.preventDefault(),B(),b(!0);try{const w=await Qe(k,E,o.length);await L(w.id),N(""),C(""),d("Archive section created. It is now available in book settings.")}catch(w){y(ae(w))}finally{b(!1)}},Z=async c=>{if(c.preventDefault(),!!A){B(),b(!0);try{await Ze(A.id,{name:I,code:P,sort_order:Number.isFinite(v)?v:0,is_visible:D}),await L(A.id),d("Archive section saved.")}catch(w){y(ae(w))}finally{b(!1)}}},X=async()=>{if(A&&window.confirm(`Delete “${A.name}”? Sections containing books cannot be deleted.`)){B(),b(!0);try{await Xe(A),await L(null),d("Archive section deleted.")}catch(c){y(ae(c))}finally{b(!1)}}};return e.jsxs("div",{className:"grid min-h-0 flex-1 md:grid-cols-[260px_minmax(0,1fr)]",children:[e.jsxs("aside",{className:"p-5",children:[e.jsxs("form",{onSubmit:$,className:"mb-8 flex flex-col gap-3",children:[e.jsx("h2",{className:"text-[17px]",children:"CREATE SECTION"}),e.jsxs("label",{className:"text-[11px]",children:["PUBLIC NAME",e.jsx("input",{required:!0,value:k,onChange:c=>N(c.target.value),className:`${Q} mt-1`,placeholder:"PHOTOGRAPHY"})]}),e.jsxs("label",{className:"text-[11px]",children:["LIST CODE",e.jsx("input",{required:!0,maxLength:8,value:E,onChange:c=>C(c.target.value.toUpperCase()),className:`${Q} mt-1`,placeholder:"PHOTO"})]}),e.jsx("button",{type:"submit",disabled:p,className:ue,children:"CREATE SECTION"})]}),e.jsx("div",{children:i?e.jsx("p",{className:"py-4 text-[13px] text-black/50",children:"..."}):o.map(c=>e.jsxs("button",{type:"button",onClick:()=>r(c.id),className:`block w-full border-0 px-2 py-3 text-left transition-colors ${c.id===j?"bg-black text-white":"hover:bg-black/5"}`,children:[e.jsx("span",{className:"block truncate text-[13px]",children:c.name}),e.jsxs("span",{className:"mt-1 block text-[10px] opacity-60",children:[c.code," · ",c.is_visible?"VISIBLE":"HIDDEN"]})]},c.id))})]}),e.jsxs("section",{className:"p-5 md:p-8",children:[(f||u)&&e.jsx("div",{className:`mb-5 border p-3 text-[12px] ${u?"border-red-700 text-red-700":"border-black/25"}`,role:u?"alert":"status",children:u??f}),A?e.jsxs("form",{onSubmit:Z,className:"flex max-w-xl flex-col gap-4",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-[22px]",children:A.name}),e.jsxs("p",{className:"mt-1 font-mono text-[10px] text-black/45",children:["STABLE SLUG · ",A.slug]})]}),e.jsxs("label",{className:"text-[11px]",children:["PUBLIC NAME",e.jsx("input",{required:!0,value:I,onChange:c=>h(c.target.value),className:`${Q} mt-1`})]}),e.jsxs("label",{className:"text-[11px]",children:["LIST CODE",e.jsx("input",{required:!0,maxLength:8,value:P,onChange:c=>n(c.target.value.toUpperCase()),className:`${Q} mt-1`})]}),e.jsxs("label",{className:"text-[11px]",children:["ORDER",e.jsx("input",{type:"number",value:v,onChange:c=>T(Number(c.target.value)),className:`${Q} mt-1`})]}),e.jsxs("label",{className:"flex items-center gap-3 text-[12px]",children:[e.jsx("input",{type:"checkbox",checked:D,onChange:c=>O(c.target.checked)}),"VISIBLE IN THE PUBLIC ARCHIVE"]}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx("button",{type:"submit",disabled:p,className:ue,children:"SAVE SECTION"}),e.jsx("button",{type:"button",disabled:p,onClick:()=>void X(),className:`${ue} border-red-700 text-red-700`,children:"DELETE SECTION"})]})]}):e.jsx("div",{className:"flex min-h-48 items-center justify-center text-[13px] text-black/45",children:"CREATE OR SELECT A SECTION"})]})]})}function Me(s,o){return s instanceof Error?s:typeof s=="object"&&s&&"message"in s?new Error(String(s.message)):new Error(o)}function R(s){const o=Number(s);return Number.isFinite(o)?o:0}function fe(s){return typeof s=="object"&&s!==null?s:{}}function se(s){return Array.isArray(s)?s.map(fe):[]}async function xt(s){const o=new Date,j={p_from:new Date(o.getTime()-s*864e5).toISOString(),p_to:o.toISOString()},[r,i,g]=await Promise.all([Y.rpc("get_analytics_summary",j),Y.rpc("get_analytics_daily",j),Y.rpc("get_analytics_breakdown",j)]);if(r.error)throw Me(r.error,"Unable to load analytics summary.");if(i.error)throw Me(i.error,"Unable to load daily analytics.");const p=fe(r.data),b=se(i.data),f=g.error?{}:fe(g.data);return{summary:{visits:R(p.visits),events:R(p.events),pageViews:R(p.page_views),clicks:R(p.clicks),bookOpens:R(p.book_opens),modelOpens:R(p.model_opens)},daily:b.map(d=>({day:String(d.day??""),visits:R(d.visits),pageViews:R(d.page_views),clicks:R(d.clicks)})),breakdown:{devices:se(f.devices).map(d=>({name:String(d.name??"unknown"),count:R(d.events)})),referrers:se(f.referrers).map(d=>({name:String(d.name??"direct"),count:R(d.visits)})),topTargets:se(f.top_targets).map(d=>({targetType:String(d.target_type??"interface"),targetId:String(d.target_id??"unknown"),count:R(d.events)}))}}}const pt=[7,30,90],Ue={summary:{visits:0,events:0,pageViews:0,clicks:0,bookOpens:0,modelOpens:0},daily:[],breakdown:{devices:[],referrers:[],topTargets:[]}};function ne(s){return new Intl.NumberFormat("en-CH").format(s)}function ft(s,o){const l=new Map(s.map(r=>[r.day,r])),j=new Date;return j.setUTCHours(0,0,0,0),Array.from({length:o},(r,i)=>{const g=new Date(j);g.setUTCDate(j.getUTCDate()-(o-i-1));const p=g.toISOString().slice(0,10);return l.get(p)??{day:p,visits:0,pageViews:0,clicks:0}})}function xe(s,o,l){return s.length===0?"":s.map((j,r)=>{const i=s.length===1?450:r/(s.length-1)*900,g=170-j[o]/Math.max(1,l)*150;return`${i.toFixed(2)},${g.toFixed(2)}`}).join(" ")}function bt(s){const o=s instanceof Error?s.message:String(s);return/schema cache|could not find the function|does not exist|404/i.test(o)?"Analytics is not installed in Supabase yet. Run the privacy-friendly analytics SQL migration, then refresh this section.":o||"Unable to load analytics."}function ht(){const[s,o]=a.useState(30),[l,j]=a.useState(Ue),[r,i]=a.useState(!0),[g,p]=a.useState(null),[b,f]=a.useState(null),[d,u]=a.useState("outside"),y=a.useRef(0);a.useEffect(()=>{const n=window.requestAnimationFrame(()=>u("entering")),v=window.setTimeout(()=>u("visible"),1300);return()=>{window.cancelAnimationFrame(n),window.clearTimeout(v)}},[]);const k=a.useCallback(async()=>{const n=++y.current;i(!0),p(null);try{const v=await xt(s);if(n!==y.current)return;j(v),f(new Date)}catch(v){if(n!==y.current)return;j(Ue),p(bt(v))}finally{n===y.current&&i(!1)}},[s]);a.useEffect(()=>(k(),()=>{y.current+=1}),[k]);const N=a.useMemo(()=>ft(l.daily,s),[s,l.daily]),E=Math.max(1,...N.flatMap(n=>[n.visits,n.pageViews,n.clicks])),C=N[0]?.day??"",I=N[N.length-1]?.day??"",h=n=>({className:`admin-backend-panel is-${d}`,style:{"--panel-delay":`${n}ms`}}),P=[["VISITS",l.summary.visits],["PAGE VIEWS",l.summary.pageViews],["CLICKS",l.summary.clicks],["BOOK OPENS",l.summary.bookOpens],["MODEL OPENS",l.summary.modelOpens],["TOTAL EVENTS",l.summary.events]];return e.jsxs("main",{className:"mx-auto w-full max-w-[1500px] p-5 md:p-8","aria-busy":r,children:[e.jsxs("div",{...h(0),className:`${h(0).className} mb-7 flex flex-wrap items-end justify-between gap-4`,children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-[24px] leading-none",children:"TRAFFIC INFO"}),e.jsx("p",{className:"mt-3 max-w-2xl text-[13px] leading-relaxed text-black/55",children:"Private, first-party session statistics. No IP addresses, emails, full URLs or persistent visitor fingerprints are stored."})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[12px]",children:[pt.map(n=>e.jsxs("button",{type:"button",onClick:()=>o(n),className:`border border-black/35 px-3 py-2 transition-transform hover:scale-[1.03] active:scale-[0.98] ${s===n?"bg-black text-white":""}`,children:[n," DAYS"]},n)),e.jsx("button",{type:"button",onClick:()=>void k(),disabled:r,className:"border border-black/35 px-3 py-2 transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-40",children:r?"...":"REFRESH"})]})]}),g&&e.jsx("div",{...h(40),className:`${h(40).className} mb-6 border border-red-700 p-4 text-[13px] text-red-700`,role:"alert",children:g}),e.jsx("section",{className:"grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",children:P.map(([n,v],T)=>e.jsxs("article",{...h(70+T*35),className:`${h(70+T*35).className} min-w-0 border border-black/20 p-4`,children:[e.jsx("p",{className:"text-[11px] text-black/50",children:n}),e.jsx("p",{className:"mt-5 truncate text-[clamp(24px,3vw,42px)] leading-none",children:r?"…":ne(v)})]},n))}),e.jsxs("section",{...h(310),className:`${h(310).className} mt-6 border border-black/20 p-4 sm:p-6`,children:[e.jsxs("div",{className:"mb-5 flex flex-wrap items-center justify-between gap-3",children:[e.jsx("h2",{className:"text-[17px]",children:"DAILY ACTIVITY"}),e.jsxs("div",{className:"flex flex-wrap gap-4 text-[11px] text-black/60",children:[e.jsx("span",{children:"— VISITS"}),e.jsx("span",{className:"text-black/45",children:"— PAGE VIEWS"}),e.jsx("span",{className:"text-black/25",children:"— CLICKS"})]})]}),e.jsx("div",{className:"h-[190px] w-full",children:e.jsxs("svg",{viewBox:"0 0 900 180",preserveAspectRatio:"none",className:"h-full w-full overflow-visible",role:"img","aria-label":`Daily analytics from ${C} to ${I}`,children:[[20,70,120,170].map(n=>e.jsx("line",{x1:"0",x2:"900",y1:n,y2:n,stroke:"currentColor",strokeOpacity:"0.1",vectorEffect:"non-scaling-stroke"},n)),e.jsx("polyline",{points:xe(N,"clicks",E),fill:"none",stroke:"currentColor",strokeOpacity:"0.24",strokeWidth:"1.5",vectorEffect:"non-scaling-stroke"}),e.jsx("polyline",{points:xe(N,"pageViews",E),fill:"none",stroke:"currentColor",strokeOpacity:"0.5",strokeWidth:"1.5",vectorEffect:"non-scaling-stroke"}),e.jsx("polyline",{points:xe(N,"visits",E),fill:"none",stroke:"currentColor",strokeWidth:"2",vectorEffect:"non-scaling-stroke"})]})}),e.jsxs("div",{className:"mt-2 flex justify-between font-mono text-[10px] text-black/45",children:[e.jsx("span",{children:C}),e.jsx("span",{children:I})]})]}),e.jsxs("section",{className:"mt-6 grid gap-4 lg:grid-cols-3",children:[e.jsxs("article",{...h(350),className:`${h(350).className} border border-black/20 p-5`,children:[e.jsx("h2",{className:"mb-4 text-[16px]",children:"TOP CLICKS"}),l.breakdown.topTargets.length===0?e.jsx("p",{className:"text-[13px] text-black/45",children:"NO DATA YET"}):e.jsx("ol",{className:"divide-y divide-black/10",children:l.breakdown.topTargets.map(n=>e.jsxs("li",{className:"flex gap-3 py-2 text-[12px]",children:[e.jsxs("span",{className:"min-w-0 flex-1 truncate",children:[n.targetId," ",e.jsxs("span",{className:"text-black/40",children:["· ",n.targetType]})]}),e.jsx("span",{children:ne(n.count)})]},`${n.targetType}:${n.targetId}`))})]}),e.jsxs("article",{...h(390),className:`${h(390).className} border border-black/20 p-5`,children:[e.jsx("h2",{className:"mb-4 text-[16px]",children:"DEVICES"}),l.breakdown.devices.length===0?e.jsx("p",{className:"text-[13px] text-black/45",children:"NO DATA YET"}):e.jsx("ul",{className:"divide-y divide-black/10",children:l.breakdown.devices.map(n=>e.jsxs("li",{className:"flex justify-between gap-3 py-2 text-[12px]",children:[e.jsx("span",{children:n.name.toUpperCase()}),e.jsx("span",{children:ne(n.count)})]},n.name))})]}),e.jsxs("article",{...h(430),className:`${h(430).className} border border-black/20 p-5`,children:[e.jsx("h2",{className:"mb-4 text-[16px]",children:"REFERRERS"}),l.breakdown.referrers.length===0?e.jsx("p",{className:"text-[13px] text-black/45",children:"NO DATA YET"}):e.jsx("ul",{className:"divide-y divide-black/10",children:l.breakdown.referrers.map(n=>e.jsxs("li",{className:"flex gap-3 py-2 text-[12px]",children:[e.jsx("span",{className:"min-w-0 flex-1 truncate",children:n.name}),e.jsx("span",{children:ne(n.count)})]},n.name))})]})]}),e.jsxs("aside",{...h(470),className:`${h(470).className} mt-6 border border-black/20 p-5 text-[12px] leading-relaxed text-black/55`,children:[e.jsx("p",{children:"Retention target: 180 days. The deletion RPC must be scheduled or run periodically. Public collection remains blocked by default and starts only after the visitor selects ALLOW ANALYTICS in the privacy settings. Withdrawing consent prevents future events immediately."}),b&&e.jsxs("p",{className:"mt-2 font-mono text-[10px]",children:["UPDATED ",b.toLocaleString("en-CH")]})]})]})}const gt=`
.admin-account-item {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.admin-account-item.is-outside {
  opacity: 0;
}

.admin-account-item.is-entering {
  opacity: 1;
}

.admin-account-item.is-visible {
  transform: scale(1);
  opacity: 1;
}

.admin-account-letter,
.admin-backend-letter {
  display: inline-block;
  transform-origin: 50% 50%;
  white-space: pre;
}

.admin-account-item.is-outside .admin-account-letter,
.admin-backend-panel.is-outside .admin-backend-letter {
  transform: scale(0);
  opacity: 0;
}

.admin-account-item.is-entering .admin-account-letter,
.admin-backend-panel.is-entering .admin-backend-letter {
  animation: elastic-center-scale 760ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
  animation-delay: calc(var(--letter-index, 0) * 24ms + var(--letter-offset, 0ms));
}

.admin-account-item.is-visible .admin-account-letter,
.admin-backend-panel.is-visible .admin-backend-letter {
  transform: scale(1);
  opacity: 1;
}

.admin-backend-panel {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}

.admin-backend-panel.is-outside {
  transform: scale(0);
  opacity: 0;
}

.admin-backend-panel.is-entering {
  animation: elastic-center-scale 940ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
  animation-delay: var(--panel-delay, 0ms);
}

.admin-backend-panel.is-visible {
  transform: scale(1);
  opacity: 1;
}

.admin-integrated {
  background: rgb(207 207 207);
}

.admin-integrated > header {
  border-color: transparent !important;
  background: rgb(207 207 207 / 0.96) !important;
  backdrop-filter: blur(14px);
}

.admin-section-nav {
  left: max(12px, env(safe-area-inset-left));
  top: max(12px, env(safe-area-inset-top));
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(34px, 5vw, 48px);
  align-items: start;
  gap: clamp(1px, 0.6vw, 7px);
}

.admin-section-column {
  position: relative;
  width: 100%;
  height: clamp(96px, 16dvh, 138px);
  border: 0;
  outline: none;
  padding: 0;
  background: transparent;
}

.admin-section-column > span {
  position: absolute;
  left: 50%;
  top: 50%;
  display: inline-flex;
  white-space: nowrap;
  transform: translate(-50%, -50%) rotate(-90deg);
  transform-origin: 50% 50%;
  color: rgb(0 0 0 / 0.42);
  font-size: clamp(11px, 1.5vw, 13px);
  font-weight: 400;
  letter-spacing: 0.08em;
  transition:
    color 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.admin-section-column:hover > span,
.admin-section-column:focus-visible > span {
  color: rgb(0 0 0 / 0.72);
  transform: translate(-50%, -50%) rotate(-90deg) scale(1.08);
}

.admin-section-column.is-active > span {
  color: black;
}

.admin-section-column.admin-section-start {
  margin-left: clamp(9px, 1.5vw, 22px);
}

.admin-manager-content {
  padding-top: clamp(70px, 10dvh, 96px);
}

.admin-section-surface {
  min-height: calc(100dvh - 150px);
  animation: admin-section-arrive 660ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
}

.admin-section-surface aside,
.admin-section-surface section,
.admin-section-surface .admin-backend-panel {
  animation: admin-section-piece-arrive 720ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
}

.admin-section-surface section {
  animation-delay: 70ms;
}

.admin-integrated article[class*="border-"],
.admin-integrated section[class*="border-"],
.admin-integrated aside[class*="border-"],
.admin-integrated div[class*="border-"],
.admin-integrated aside button[class*="border-b"] {
  border-color: transparent !important;
}

@keyframes admin-section-arrive {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes admin-section-piece-arrive {
  0% {
    opacity: 0;
    transform: translate3d(0, 18px, 0) scale(0.97);
  }
  68% {
    opacity: 1;
    transform: translate3d(0, -2px, 0) scale(1.008);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@media (max-width: 380px), (max-height: 700px) {
  .admin-section-nav {
    top: max(8px, env(safe-area-inset-top));
    left: max(7px, env(safe-area-inset-left));
    grid-auto-columns: 31px;
    gap: 0;
  }

  .admin-section-column {
    height: clamp(76px, 20dvh, 104px);
  }

  .admin-manager-content {
    padding-top: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .admin-account-item.is-entering {
    animation-duration: 1ms;
    animation-delay: 0ms;
  }

  .admin-account-letter,
  .admin-backend-letter,
  .admin-backend-panel.is-entering,
  .admin-section-surface,
  .admin-section-surface aside,
  .admin-section-surface section {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
  }
}
`;function re({text:s}){return e.jsx("span",{"aria-label":s,children:Array.from(s).map((o,l)=>e.jsx("span",{"aria-hidden":"true",className:"admin-backend-letter",style:{"--letter-index":l},children:o===" "?" ":o},`${o}-${l}`))})}const _="w-full border-0 border-b border-black/30 bg-transparent px-0 py-2 text-[15px] outline-none focus:border-black",G="border-0 bg-transparent px-2 py-2 text-[14px] underline-offset-4 transition-transform hover:scale-[1.02] hover:underline active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";function F(s){return s instanceof Error?s.message:"Something went wrong."}function H(s){return Number.isFinite(s)?Math.min(255,Math.max(0,Math.round(s??255))):255}function jt({userEmail:s,onNavigate:o,onLibrary:l,onModels:j,onSignOut:r,embedded:i=!1,accountControlsReady:g=!0}){const[p,b]=a.useState(i?"outside":"visible"),[f,d]=a.useState([]),[u,y]=a.useState("books"),[k,N]=a.useState(Be),[E,C]=a.useState(null),[I,h]=a.useState([]),[P,n]=a.useState(!0),[v,T]=a.useState(!1),[D,O]=a.useState(!1),[A,L]=a.useState(null),[B,$]=a.useState(null),[Z,X]=a.useState(""),[c,w]=a.useState(""),[V,M]=a.useState("objects"),[ie,be]=a.useState(!1),[he,ge]=a.useState(""),[W,je]=a.useState("objects"),[ye,ve]=a.useState(""),[Ne,ke]=a.useState(!1),[le,we]=a.useState(!1),[ce,Se]=a.useState(0),[Ee,Ce]=a.useState("a4_long_edge"),[Ae,Te]=a.useState(255),[Oe,Ie]=a.useState(255),[Re,$e]=a.useState(255),[ee,oe]=a.useState([]),[De,te]=a.useState(null),J=a.useRef(null);a.useEffect(()=>{if(!i){b("visible");return}if(!g){b("outside");return}let t=0;const m=window.requestAnimationFrame(()=>{t=window.requestAnimationFrame(()=>{b("entering")})}),S=window.setTimeout(()=>{b("visible")},1850);return()=>{window.cancelAnimationFrame(m),window.cancelAnimationFrame(t),window.clearTimeout(S)}},[g,i]);const x=a.useMemo(()=>f.find(t=>t.id===E)??null,[f,E]),Le=(t,m=0)=>Array.from(t).map((S,z)=>e.jsx("span",{"aria-hidden":"true",className:"admin-account-letter",style:{"--letter-index":z,"--letter-offset":`${m}ms`},children:S===" "?" ":S},`${S}-${z}`)),q=()=>{L(null),$(null)},de=a.useCallback(async t=>{const m=await _e();return d(m),C(S=>{const z=t??S;return z&&m.some(Je=>Je.id===z)?z:m[0]?.id??null}),m},[]),me=a.useCallback(async t=>{T(!0);try{const m=await et(t);h(m)}finally{T(!1)}},[]);a.useEffect(()=>{let t=!0;return(async()=>{n(!0);try{const S=await _e();if(!t)return;d(S),C(S[0]?.id??null)}catch(S){t&&$(F(S))}finally{t&&n(!1)}})(),()=>{t=!1}},[]),a.useEffect(()=>{k.length>0&&!k.some(t=>t.slug===V)&&M(k[0].slug)},[k,V]),a.useEffect(()=>{let t=!0;return pe().then(m=>{t&&m.length>0&&N(m)}).catch(()=>{t&&N(Be)}),()=>{t=!1}},[]),a.useEffect(()=>{if(!x){h([]);return}ge(x.title),je(x.category),ve(x.description),ke(x.is_published),we(x.is_featured),Se(x.sort_order),Ce(x.page_format??"a4_long_edge"),Te(H(x.background_r)),Ie(H(x.background_g)),$e(H(x.background_b)),oe([]),te(null),J.current&&(J.current.value=""),me(x.id).catch(t=>{$(F(t))})},[x,me]);const Ve=t=>{X(t),ie||w(Fe(t))},qe=async t=>{t.preventDefault(),q(),O(!0);try{const m=await tt({title:Z,slug:c,category:V,sort_order:f.length});await de(m.id),X(""),w(""),M("objects"),be(!1),L(`Created “${m.title}”. Its Storage folder is ${m.storage_folder}/.`)}catch(m){$(F(m))}finally{O(!1)}},ze=async t=>{if(t.preventDefault(),!!x){q(),O(!0);try{await at(x.id,{title:he.trim(),category:W,description:ye.trim(),is_published:Ne,sort_order:Number.isFinite(ce)?ce:0,page_format:Ee,background_r:H(Ae),background_g:H(Oe),background_b:H(Re),...x.is_featured&&!le?{is_featured:!1}:{}}),le&&!x.is_featured&&await st(x.id),await de(x.id),L("Book settings saved.")}catch(m){$(F(m))}finally{O(!1)}}},He=t=>{oe(Array.from(t.target.files??[])),te(null)},Ke=async()=>{if(x){q(),O(!0),te(null);try{const t=await nt(x,ee,(m,S)=>te(`${m} / ${S}`));h(t),oe([]),J.current&&(J.current.value=""),L("Images uploaded. Their order follows the natural filename order.")}catch(t){$(F(t))}finally{O(!1)}}},Ye=async t=>{if(!(!x||!window.confirm(`Delete page ${t.page_number}: ${t.file_name}?`))){q(),O(!0);try{await rt(t),await me(x.id),L("Page deleted.")}catch(S){$(F(S))}finally{O(!1)}}},Pe=async(t,m)=>{q(),O(!0);try{const S=await it(I,t,m);h(S)}catch(S){$(F(S))}finally{O(!1)}},We=async()=>{if(!(!x||!window.confirm(`Delete “${x.title}” and every JPG in ${x.storage_folder}/? This cannot be undone.`))){q(),O(!0);try{await lt(x),await de(null),L("Book and image folder deleted.")}catch(m){$(F(m))}finally{O(!1)}}};return e.jsxs("div",{className:"admin-integrated fixed inset-0 z-[100] overflow-y-auto text-black",children:[e.jsx("style",{children:gt}),e.jsx("header",{className:i?"sticky top-0 z-10 flex min-h-[72px] items-start justify-end bg-white px-4 pt-4 sm:min-h-[88px] sm:px-6 sm:pt-6":"sticky top-0 z-10 flex flex-wrap items-center justify-end gap-4 bg-white px-5 py-4 md:px-8",children:e.jsxs("div",{className:"flex h-12 items-center gap-4 text-[13px]",children:[e.jsx("span",{"aria-label":s,className:`${i?`admin-account-item item-email is-${p}`:""} max-w-[min(48vw,280px)] truncate text-black/60`,children:i?Le(s):s}),e.jsx("button",{type:"button",onClick:()=>void r(),"aria-label":"Logout",className:`${i?`admin-account-item item-logout is-${p}`:""} underline underline-offset-4`,children:i?Le("LOGOUT",120):"LOGOUT"})]})}),e.jsxs("nav",{className:"admin-section-nav fixed z-30","aria-label":"Admin sections",children:[e.jsx("button",{type:"button",onClick:o,className:"admin-section-column",children:e.jsx("span",{children:"NAVIGATE"})}),e.jsx("button",{type:"button",onClick:l,className:"admin-section-column",children:e.jsx("span",{children:"LIBRARY"})}),e.jsx("button",{type:"button",className:"admin-section-column",children:e.jsx("span",{children:"LOGIN"})}),e.jsx("button",{type:"button",onClick:j,className:"admin-section-column",children:e.jsx("span",{children:"MODELS"})}),e.jsx("button",{type:"button",onClick:()=>y("books"),"aria-current":u==="books"?"page":void 0,className:`admin-section-column admin-section-start ${u==="books"?"is-active":""}`,children:e.jsx("span",{children:"BOOKS"})}),e.jsx("button",{type:"button",onClick:()=>y("models"),"aria-current":u==="models"?"page":void 0,className:`admin-section-column ${u==="models"?"is-active":""}`,children:e.jsx("span",{children:"3D DATA"})}),e.jsx("button",{type:"button",onClick:()=>y("sections"),"aria-current":u==="sections"?"page":void 0,className:`admin-section-column ${u==="sections"?"is-active":""}`,children:e.jsx("span",{children:"ARCHIVE"})}),e.jsx("button",{type:"button",onClick:()=>y("info"),"aria-current":u==="info"?"page":void 0,className:`admin-section-column ${u==="info"?"is-active":""}`,children:e.jsx("span",{children:"INFO"})})]}),e.jsx("div",{className:"admin-manager-content admin-section-surface",children:u==="models"?e.jsx("main",{className:"mx-auto flex min-h-[calc(100vh-121px)] w-full max-w-[1500px]",children:e.jsx(ot,{})}):u==="sections"?e.jsx("main",{className:"mx-auto flex min-h-[calc(100vh-121px)] w-full max-w-[1500px]",children:e.jsx(ut,{onSectionsChanged:N})}):u==="info"?e.jsx(ht,{}):e.jsxs("main",{className:"mx-auto grid w-full max-w-[1500px] gap-0 md:grid-cols-[320px_minmax(0,1fr)]",children:[e.jsxs("aside",{className:"border-b border-black/20 p-5 md:min-h-[calc(100vh-65px)] md:border-b-0 md:border-r md:p-6",children:[e.jsxs("form",{onSubmit:qe,className:`mb-8 flex flex-col gap-3 ${i?`admin-backend-panel is-${p}`:""}`,style:i?{"--panel-delay":"0ms"}:void 0,children:[e.jsx("h2",{className:"text-[18px]",children:i?e.jsx(re,{text:"CREATE A BOOK"}):"CREATE A BOOK"}),e.jsxs("label",{className:"text-[12px]",children:["TITLE",e.jsx("input",{value:Z,onChange:t=>Ve(t.target.value),required:!0,className:`${_} mt-1`})]}),e.jsxs("label",{className:"text-[12px]",children:["FOLDER / URL SLUG",e.jsx("input",{value:c,onChange:t=>{be(!0),w(Fe(t.target.value))},required:!0,pattern:"[a-z0-9]+(?:-[a-z0-9]+)*",className:`${_} mt-1 font-mono text-[13px]`})]}),e.jsxs("label",{className:"text-[12px]",children:["CATEGORY",e.jsx("select",{value:V,onChange:t=>M(t.target.value),className:`${_} mt-1`,children:k.map(t=>e.jsx("option",{value:t.slug,children:t.name.toUpperCase()},t.id))})]}),e.jsx("button",{type:"submit",disabled:D,className:G,children:"CREATE EMPTY FOLDER"})]}),e.jsxs("div",{className:i?`admin-backend-panel is-${p}`:"",style:i?{"--panel-delay":"90ms"}:void 0,children:[e.jsxs("div",{className:"mb-3 flex items-center justify-between",children:[e.jsx("h2",{className:"text-[18px]",children:i?e.jsx(re,{text:"BOOK FOLDERS"}):"BOOK FOLDERS"}),e.jsx("span",{className:"text-[12px] text-black/50",children:f.length})]}),P?e.jsx("p",{className:"text-[14px]",children:"..."}):f.length===0?e.jsx("p",{className:"text-[14px] leading-relaxed text-black/60",children:"No books yet. Create the first folder above."}):e.jsx("div",{className:"flex flex-col border-t border-black/15",children:f.map(t=>e.jsxs("button",{type:"button",onClick:()=>C(t.id),className:`border-b border-black/15 px-2 py-3 text-left transition-colors ${t.id===E?"bg-black text-white":"hover:bg-black/5"}`,children:[e.jsx("span",{className:"block truncate text-[14px]",children:t.title}),e.jsxs("span",{className:`mt-1 block truncate font-mono text-[11px] ${t.id===E?"text-white/70":"text-black/50"}`,children:[t.storage_folder,"/ ·"," ",t.is_published?"PUBLIC":"DRAFT"]})]},t.id))})]})]}),e.jsxs("section",{className:`min-w-0 p-5 md:p-8 ${i?`admin-backend-panel is-${p}`:""}`,style:i?{"--panel-delay":"180ms"}:void 0,children:[(A||B)&&e.jsx("div",{className:`mb-6 border p-3 text-[14px] ${B?"border-red-700 text-red-700":"border-black/30 text-black"}`,role:B?"alert":"status",children:B??A}),x?e.jsxs("div",{className:"flex flex-col gap-10",children:[e.jsxs("form",{onSubmit:ze,className:"grid gap-5 lg:grid-cols-2",children:[e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-[24px] leading-tight",children:i?e.jsx(re,{text:x.title}):x.title}),e.jsxs("p",{className:"mt-2 font-mono text-[12px] text-black/55",children:["Storage → book-pages/",x.storage_folder,"/"]}),e.jsxs("p",{className:"mt-1 font-mono text-[12px] text-black/55",children:["Public link → /book/",x.slug]})]}),e.jsxs("label",{className:"text-[12px]",children:["TITLE",e.jsx("input",{value:he,onChange:t=>ge(t.target.value),required:!0,className:`${_} mt-1`})]}),e.jsxs("label",{className:"text-[12px]",children:["CATEGORY",e.jsxs("select",{value:W,onChange:t=>je(t.target.value),className:`${_} mt-1`,children:[!k.some(t=>t.slug===W)&&e.jsx("option",{value:W,children:W.toUpperCase()}),k.map(t=>e.jsx("option",{value:t.slug,children:t.name.toUpperCase()},t.id))]})]}),e.jsxs("label",{className:"text-[12px]",children:["PUBLIC ORDER",e.jsx("input",{type:"number",value:ce,onChange:t=>Se(Number(t.target.value)),className:`${_} mt-1`})]}),e.jsxs("label",{className:"text-[12px]",children:["PAGE SIZE / BINDING — BACKEND ONLY",e.jsxs("select",{value:Ee,onChange:t=>Ce(t.target.value),className:`${_} mt-1`,children:[e.jsx("option",{value:"a4_long_edge",children:"A4 — UNFOLDS FROM LONG SIDE"}),e.jsx("option",{value:"a4_short_edge",children:"A4 — UNFOLDS FROM SHORT SIDE"}),e.jsx("option",{value:"square",children:"SQUARE"})]})]})]}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("label",{className:"text-[12px]",children:["DESCRIPTION",e.jsx("textarea",{value:ye,onChange:t=>ve(t.target.value),rows:7,className:`${_} mt-1 resize-y`})]}),e.jsx(dt,{value:{r:Ae,g:Oe,b:Re},onChange:t=>{Te(t.r),Ie(t.g),$e(t.b)}},x.id),e.jsxs("label",{className:"flex items-center gap-3 text-[14px]",children:[e.jsx("input",{type:"checkbox",checked:Ne,onChange:t=>ke(t.target.checked)}),"PUBLISHED — visible to the public"]}),e.jsxs("label",{className:"flex items-center gap-3 text-[14px]",children:[e.jsx("input",{type:"checkbox",checked:le,onChange:t=>we(t.target.checked)}),"FEATURED — opens by default"]}),e.jsxs("div",{className:"mt-auto flex flex-wrap gap-3",children:[e.jsx("button",{type:"submit",disabled:D,className:G,children:"SAVE BOOK"}),e.jsx("button",{type:"button",disabled:D,onClick:()=>void We(),className:`${G} border-red-700 text-red-700`,children:"DELETE BOOK + FOLDER"})]})]})]}),e.jsxs("div",{className:"border-t border-black/20 pt-8",children:[e.jsxs("div",{className:"mb-5 flex flex-wrap items-end justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-[20px]",children:i?e.jsx(re,{text:"JPG PAGES"}):"JPG PAGES"}),e.jsx("p",{className:"mt-1 text-[13px] text-black/55",children:"Select several files at once. Files are appended using natural filename order, so 01.jpg comes before 02.jpg."})]}),e.jsxs("span",{className:"font-mono text-[12px] text-black/50",children:[I.length," PAGE",I.length===1?"":"S"]})]}),e.jsxs("div",{className:"mb-7 flex flex-col gap-3 border border-dashed border-black/30 p-4 sm:flex-row sm:items-center",children:[e.jsx("input",{ref:J,type:"file",accept:".jpg,.jpeg,image/jpeg",multiple:!0,onChange:He,className:"min-w-0 flex-1 text-[13px]"}),e.jsx("button",{type:"button",disabled:D||ee.length===0,onClick:()=>void Ke(),className:G,children:De?`UPLOADING ${De}`:`UPLOAD ${ee.length||""} JPG${ee.length===1?"":"S"}`})]}),v?e.jsx("p",{children:"..."}):I.length===0?e.jsx("div",{className:"border border-black/15 p-8 text-center text-black/50",children:"THIS FOLDER IS EMPTY"}):e.jsx("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",children:I.map((t,m)=>e.jsxs("article",{className:"min-w-0 border border-black/20 p-2",children:[e.jsx("div",{className:"aspect-[3/4] overflow-hidden bg-black/5",children:e.jsx("img",{src:t.public_url,alt:`Page ${t.page_number}: ${t.file_name}`,loading:"lazy",className:"h-full w-full object-contain"})}),e.jsxs("div",{className:"mt-2",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 text-[12px]",children:[e.jsxs("span",{children:["PAGE"," ",t.page_number]}),e.jsx("span",{className:"truncate font-mono text-[10px] text-black/45",children:t.file_name})]}),e.jsxs("div",{className:"mt-2 grid grid-cols-3 gap-1",children:[e.jsx("button",{type:"button",title:"Move earlier",disabled:D||m===0,onClick:()=>void Pe(m,-1),className:G,children:"↑"}),e.jsx("button",{type:"button",title:"Move later",disabled:D||m===I.length-1,onClick:()=>void Pe(m,1),className:G,children:"↓"}),e.jsx("button",{type:"button",title:"Delete page",disabled:D,onClick:()=>void Ye(t),className:`${G} border-red-700 text-red-700`,children:"×"})]})]})]},t.id))})]})]}):e.jsx("div",{className:"flex min-h-[50vh] items-center justify-center text-black/50",children:"CREATE OR SELECT A BOOK"})]})]})},u)]})}const Ge="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";function K({text:s,speed:o=120,revealSpeed:l=45,className:j=""}){const r=a.useRef(null),i=a.useRef(null),g=a.useRef(0),p=a.useRef(!1),b=a.useRef(!1),f=a.useCallback(()=>{i.current!==null&&(window.clearInterval(i.current),i.current=null)},[]),d=a.useCallback(()=>Ge[Math.floor(Math.random()*Ge.length)],[]),u=a.useCallback((N=0)=>s.split("").map((E,C)=>E===" "?" ":C<N?E:d()).join(""),[d,s]),y=a.useCallback(()=>{if(f(),p.current=!1,b.current){r.current&&(r.current.textContent=s);return}r.current&&(r.current.textContent=u()),i.current=window.setInterval(()=>{!r.current||p.current||(r.current.textContent=u())},o)},[f,u,o,s]),k=a.useCallback(()=>{if(f(),p.current=!0,g.current=0,!!r.current){if(b.current){r.current.textContent=s;return}r.current.textContent=u(0),i.current=window.setInterval(()=>{g.current+=1,r.current&&(r.current.textContent=u(g.current)),g.current>=s.length&&(f(),r.current&&(r.current.textContent=s))},l)}},[f,u,l,s]);return a.useEffect(()=>{const N=window.matchMedia("(prefers-reduced-motion: reduce)");b.current=N.matches;const E=C=>{b.current=C.matches,C.matches?(f(),r.current&&(r.current.textContent=s)):y()};return N.addEventListener("change",E),y(),()=>{f(),N.removeEventListener("change",E)}},[f,y,s]),e.jsx("span",{className:`inline-flex justify-center whitespace-pre font-[inherit] tracking-[inherit] ${j}`,onMouseEnter:k,onMouseLeave:y,onFocus:k,onBlur:y,"aria-label":s,children:e.jsx("span",{ref:r,"aria-hidden":"true",children:s})})}function yt(s){return s instanceof Error?s.message:"Unable to sign in."}function vt({onBack:s,onSuccess:o,embedded:l=!1,active:j=!0}){const[r,i]=a.useState(""),[g,p]=a.useState(""),[b,f]=a.useState(!1),[d,u]=a.useState(null),[y,k]=a.useState(!1),[N,E]=a.useState(!1),C=a.useRef(null);a.useEffect(()=>{const v=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{k(!0)})});return()=>{window.cancelAnimationFrame(v),C.current&&window.clearTimeout(C.current)}},[]);const I=()=>{N||(E(!0),k(!1),C.current=window.setTimeout(()=>{s()},650))},h=async v=>{v.preventDefault(),f(!0),u(null);try{const{error:T}=await Y.auth.signInWithPassword({email:r.trim(),password:g});if(T)throw T;await o()}catch(T){u(yt(T))}finally{f(!1)}},P=l?j:y&&!N,n=(v,T=7)=>({initial:!1,animate:P?{scale:1,opacity:1,filter:"blur(0px)"}:{scale:0,opacity:0,filter:"blur(8px)"},transition:{type:"spring",stiffness:390,damping:22,mass:.72,delay:P?v*.07:Math.max(0,T-v)*.035},style:{transformOrigin:"50% 50%"}});return e.jsx("div",{className:`${l?"absolute":"fixed"} inset-0 z-[100] overflow-y-auto bg-white text-black`,children:e.jsxs("div",{className:"mx-auto flex min-h-full w-full max-w-md flex-col px-8 py-8",children:[!l&&e.jsxs("div",{className:"mb-16 flex items-center justify-between text-[16px]",children:[e.jsx(U.button,{...n(0),type:"button",onClick:I,className:"transition-transform hover:scale-110 active:scale-110",children:"← BACK"}),e.jsx(U.span,{...n(1),children:e.jsx(K,{text:"ADMIN PORTAL"})})]}),e.jsxs("form",{onSubmit:h,className:"my-auto flex flex-col gap-5 bg-white px-1 py-6",children:[e.jsx("div",{className:"mb-1 text-center",children:e.jsx(U.h1,{...n(1),className:"mt-2 text-[22px]",children:e.jsx(K,{text:"ADMIN PORTAL"})})}),e.jsxs(U.label,{...n(2),className:"flex flex-col gap-2 text-[14px]",children:[e.jsx("span",{children:e.jsx(K,{text:"USERNAME"})}),e.jsx("input",{type:"email",value:r,onChange:v=>i(v.target.value),autoComplete:"username",required:!0,className:"border border-black/30 bg-transparent px-3 py-2 text-[16px] outline-none transition-colors focus:border-black"})]}),e.jsxs(U.label,{...n(3),className:"flex flex-col gap-2 text-[14px]",children:[e.jsx("span",{children:e.jsx(K,{text:"PASSWORD"})}),e.jsx("input",{type:"password",value:g,onChange:v=>p(v.target.value),autoComplete:"current-password",required:!0,className:"border border-black/30 bg-transparent px-3 py-2 text-[16px] outline-none transition-colors focus:border-black"})]}),e.jsx(mt,{initial:!1,children:d&&e.jsx(U.p,{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},exit:{scale:0,opacity:0},transition:{type:"spring",stiffness:390,damping:22},role:"alert",className:"text-[14px] leading-relaxed text-red-700",children:e.jsx(K,{text:d})},"login-error")}),e.jsx(U.button,{...n(4),type:"submit",disabled:b,className:"border border-black px-4 py-2 text-[16px] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-50",children:b?"SIGNING IN…":e.jsx(K,{text:"ACCESS BACKEND"})})]})]})})}function Ot({onBack:s,onNavigate:o=s,onLibrary:l=s,onModels:j=s,embedded:r=!1,surfaceReady:i=!1}){const{loading:g,user:p,isAdmin:b,error:f,refresh:d}=ct(),u=r?"absolute":"fixed";return g?e.jsx("div",{className:`${u} inset-0 z-[100] flex items-center justify-center bg-white text-black`,children:e.jsx("div",{className:"animate-pulse",children:"..."})}):p?b?e.jsx(jt,{userEmail:p.email??"admin",onBack:s,onNavigate:o,onLibrary:l,onModels:j,embedded:r,accountControlsReady:!r||i,onSignOut:async()=>{await Y.auth.signOut(),await d()}}):e.jsx("div",{className:`${u} inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-white px-8 text-black`,children:e.jsxs("div",{className:"w-full max-w-md border border-black/20 p-6 text-center",children:[e.jsx("p",{className:"mb-4",children:"This account is signed in but is not an administrator."}),f&&e.jsx("p",{className:"mb-4 text-[14px] text-red-700",children:f}),e.jsxs("div",{className:"flex justify-center gap-5",children:[!r&&e.jsx("button",{type:"button",onClick:s,className:"underline",children:"BACK"}),e.jsx("button",{type:"button",onClick:async()=>{await Y.auth.signOut(),await d()},className:"underline",children:"LOG OUT"})]})]})}):e.jsx(vt,{onBack:s,onSuccess:d,embedded:r,active:!r||i})}export{Ot as default};
