const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-DPlCiQ-x.js","assets/vendor-Ck_7Hjfu.js","assets/three-CQO4KQ3J.js","assets/AdminThreeDModelManager-IqhOAIJm.js","assets/react-three-MBPzvqYl.js","assets/postprocessing-C5EpOQZm.js","assets/motion-C8z4NiLu.js","assets/supabase-BOKo3cPP.js","assets/Archive-Bmt-CNpv.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-VEvJrMH6.js","assets/Message-BaBT3jUW.js","assets/NotFound-CNi8HsQ4.js","assets/WatchStudio-uFYb19sC.js"])))=>i.map(i=>d[i]);
import{r as n,ai as In,aj as An,j as e,ak as Yt,al as Xt,am as Jt,an as Qt,ao as On,ap as Zt,aq as en,ar as Bn,as as Mn,at as Pn,au as Ln,av as tn,aw as $n,ax as Dn,ay as Bt,az as lt,ab as nn,aA as Fn,aB as zn,aC as Un,aD as Vn,aE as le,aF as Wn}from"./vendor-Ck_7Hjfu.js";import{_ as je,u as Hn,a as ut,C as Kn,S as Gn,b as qn,W as Yn,c as St,d as an,e as Xn}from"./react-three-MBPzvqYl.js";import{c as Jn}from"./supabase-BOKo3cPP.js";import{V as G,k as Qn,ba as Zn,aA as ea,a8 as ta,P as na,Q as Mt,M as yt,aG as sn,Y as aa}from"./three-CQO4KQ3J.js";import{m as ne,A as gt}from"./motion-C8z4NiLu.js";import"./postprocessing-C5EpOQZm.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function s(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=s(o);fetch(o.href,c)}})();const sa=1,ia=1e6;let bt=0;function ra(){return bt=(bt+1)%Number.MAX_SAFE_INTEGER,bt.toString()}const xt=new Map,Pt=t=>{if(xt.has(t))return;const a=setTimeout(()=>{xt.delete(t),$e({type:"REMOVE_TOAST",toastId:t})},ia);xt.set(t,a)},oa=(t,a)=>{switch(a.type){case"ADD_TOAST":return{...t,toasts:[a.toast,...t.toasts].slice(0,sa)};case"UPDATE_TOAST":return{...t,toasts:t.toasts.map(s=>s.id===a.toast.id?{...s,...a.toast}:s)};case"DISMISS_TOAST":{const{toastId:s}=a;return s?Pt(s):t.toasts.forEach(r=>{Pt(r.id)}),{...t,toasts:t.toasts.map(r=>r.id===s||s===void 0?{...r,open:!1}:r)}}case"REMOVE_TOAST":return a.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(s=>s.id!==a.toastId)}}},st=[];let it={toasts:[]};function $e(t){it=oa(it,t),st.forEach(a=>{a(it)})}function ca({...t}){const a=ra(),s=o=>$e({type:"UPDATE_TOAST",toast:{...o,id:a}}),r=()=>$e({type:"DISMISS_TOAST",toastId:a});return $e({type:"ADD_TOAST",toast:{...t,id:a,open:!0,onOpenChange:o=>{o||r()}}}),{id:a,dismiss:r,update:s}}function la(){const[t,a]=n.useState(it);return n.useEffect(()=>(st.push(a),()=>{const s=st.indexOf(a);s>-1&&st.splice(s,1)}),[t]),{...t,toast:ca,dismiss:s=>$e({type:"DISMISS_TOAST",toastId:s})}}function Ee(...t){return In(An(t))}const ua=Mn,rn=n.forwardRef(({className:t,...a},s)=>e.jsx(Yt,{ref:s,className:Ee("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",t),...a}));rn.displayName=Yt.displayName;const da=Bn("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),on=n.forwardRef(({className:t,variant:a,...s},r)=>e.jsx(Xt,{ref:r,className:Ee(da({variant:a}),t),...s}));on.displayName=Xt.displayName;const ma=n.forwardRef(({className:t,...a},s)=>e.jsx(Jt,{ref:s,className:Ee("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",t),...a}));ma.displayName=Jt.displayName;const cn=n.forwardRef(({className:t,...a},s)=>e.jsx(Qt,{ref:s,className:Ee("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",t),"toast-close":"",...a,children:e.jsx(On,{className:"h-4 w-4"})}));cn.displayName=Qt.displayName;const ln=n.forwardRef(({className:t,...a},s)=>e.jsx(Zt,{ref:s,className:Ee("text-sm font-semibold",t),...a}));ln.displayName=Zt.displayName;const un=n.forwardRef(({className:t,...a},s)=>e.jsx(en,{ref:s,className:Ee("text-sm opacity-90",t),...a}));un.displayName=en.displayName;function pa(){const{toasts:t}=la();return e.jsxs(ua,{children:[t.map(function({id:a,title:s,description:r,action:o,...c}){return e.jsxs(on,{...c,children:[e.jsxs("div",{className:"grid gap-1",children:[s&&e.jsx(ln,{children:s}),r&&e.jsx(un,{children:r})]}),o,e.jsx(cn,{})]},a)}),e.jsx(rn,{})]})}const fa=({...t})=>{const{theme:a="system"}=Pn();return e.jsx(Ln,{theme:a,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})},ha=$n,ga=n.forwardRef(({className:t,sideOffset:a=4,...s},r)=>e.jsx(tn,{ref:r,sideOffset:a,className:Ee("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...s}));ga.displayName=tn.displayName;const ba="https://pmpspnvfgkzprgntihtx.supabase.co",xa="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",De="book-pages",ks="models-3d",$=Jn(ba,xa,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),va=50*1024*1024;function q(t,a){return t instanceof Error?t:typeof t=="object"&&t&&"message"in t?new Error(String(t.message)):new Error(a)}function wa(t){const{data:a}=$.storage.from(De).getPublicUrl(t);return a.publicUrl}function ya(t){return{...t,public_url:wa(t.storage_path)}}function ka(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function ja(t){if(t.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const a of t){const s=a.name.toLowerCase(),r=s.endsWith(".jpg")||s.endsWith(".jpeg"),o=a.type==="image/jpeg"||a.type==="";if(!r||!o)throw new Error(`${a.name} is not a JPG/JPEG image.`);if(a.size>va)throw new Error(`${a.name} is larger than 50 MB.`)}}function Ea(t){return t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function js(){const{data:t,error:a}=await $.rpc("is_admin");if(a)throw q(a,"Unable to verify administrator access.");return t===!0}async function dn(){const{data:t,error:a}=await $.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(a)throw q(a,"Unable to load books.");return t??[]}async function Es(){const{data:t,error:a}=await $.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(a)throw q(a,"Unable to load the admin book list.");return t??[]}async function ke(t){const{data:a,error:s}=await $.from("book_pages").select("*").eq("book_id",t).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(s)throw q(s,"Unable to load the book pages.");return(a??[]).map(ya)}async function Ss(t){const a=Ea(t.slug);if(!a)throw new Error("The book needs a valid slug.");const{data:s,error:r}=await $.from("books").insert({title:t.title.trim(),slug:a,storage_folder:a,category:t.category,description:t.description?.trim()??"",is_published:t.is_published??!1,is_featured:!1,sort_order:t.sort_order??0}).select("*").single();if(r)throw q(r,"Unable to create the book.");return s}async function _s(t,a){const{data:s,error:r}=await $.from("books").update(a).eq("id",t).select("*").single();if(r)throw q(r,"Unable to save the book.");return s}async function Ns(t){const{error:a}=await $.rpc("set_featured_book",{p_book_id:t});if(a)throw q(a,"Unable to set the featured book.")}async function Ts(t,a,s){const r=[...a].sort((d,b)=>d.name.localeCompare(b.name,void 0,{numeric:!0,sensitivity:"base"}));ja(r);let c=(await ke(t.id)).reduce((d,b)=>Math.max(d,b.page_number),0)+1,f=0;for(const d of r){const b=`${t.storage_folder}/${String(c).padStart(4,"0")}-${ka()}.jpg`,{error:v}=await $.storage.from(De).upload(b,d,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(v)throw q(v,`Unable to upload ${d.name}.`);const{error:w}=await $.from("book_pages").insert({book_id:t.id,storage_path:b,file_name:d.name,page_number:c});if(w)throw await $.storage.from(De).remove([b]),q(w,`Unable to register ${d.name}.`);c+=1,f+=1,s?.(f,r.length)}return ke(t.id)}async function Sa(t){const s=(await ke(t)).map((c,f)=>({page:c,nextNumber:f+1})).filter(({page:c,nextNumber:f})=>c.page_number!==f).map(({page:c,nextNumber:f})=>$.from("book_pages").update({page_number:f}).eq("id",c.id)),o=(await Promise.all(s)).find(c=>c.error);if(o?.error)throw q(o.error,"Unable to renumber the pages.")}async function Rs(t){const{error:a}=await $.storage.from(De).remove([t.storage_path]);if(a)throw q(a,"Unable to delete the image from Storage.");const{error:s}=await $.from("book_pages").delete().eq("id",t.id);if(s)throw q(s,"The image was removed, but its database row remains.");await Sa(t.book_id)}async function Cs(t,a,s){const r=a+s;if(a<0||r<0||r>=t.length)return t;const o=t[a],c=t[r],{error:f}=await $.rpc("swap_book_pages",{p_first_page_id:o.id,p_second_page_id:c.id});if(f)throw q(f,"Unable to reorder the pages.");return ke(o.book_id)}async function Is(t){const s=(await ke(t.id)).map(o=>o.storage_path);if(s.length>0){const{error:o}=await $.storage.from(De).remove(s);if(o)throw q(o,"Unable to delete this book's image folder.")}const{error:r}=await $.from("books").delete().eq("id",t.id);if(r)throw q(r,"Unable to delete the book record.")}const _a={a4_long_edge:{width:480,height:679,minWidth:90,maxWidth:600,minHeight:127,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:110,maxWidth:680,minHeight:78,maxHeight:481},square:{width:560,height:560,minWidth:96,maxWidth:620,minHeight:96,maxHeight:620}},Lt=8;function $t(t,a,s){const r=Math.max(2,a-Lt*2),o=Math.max(1,s-Lt*2),c=t.width/t.height,f=r/2/c,d=Math.max(1,Math.min(o,f,t.maxHeight)),b=Math.max(1,Math.min(d*c,t.maxWidth));return{width:Math.floor(b),height:Math.floor(b/c)}}const Na=n.forwardRef(function({page:a,isCover:s},r){return e.jsx("div",{ref:r,"data-density":s?"hard":"soft",className:"h-full w-full overflow-hidden bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:e.jsx("img",{src:a.public_url,alt:`Page ${a.page_number}: ${a.file_name}`,draggable:!1,className:"h-full w-full select-none object-cover object-center"})})});function Ta({book:t,pages:a,initialPage:s=0,bookMotionClassName:r="is-visible",onPageChange:o,onReady:c}){const f=n.useRef(null),d=n.useRef(null),b=t.page_format??"a4_long_edge",v=_a[b],w=Math.min(Math.max(0,Math.floor(s)),Math.max(0,a.length-1)),S=n.useRef(t.id),N=n.useRef(w),[V,T]=n.useState(w),[R,L]=n.useState(0),[B,C]=n.useState(()=>$t(v,640,480)),[_,W]=n.useState(!1),D=n.useCallback(g=>{window.requestAnimationFrame(()=>{const m=g??f.current?.pageFlip();if(!m)return;const y=m.getCurrentPageIndex(),F=m.getBoundsRect();N.current=y,T(y),o?.(y),m.getOrientation()!=="landscape"?L(0):y===0?L(-(F.pageWidth/2)):y>=a.length-1?L(F.pageWidth/2):L(0)})},[o,a.length]);return n.useLayoutEffect(()=>{const g=d.current;if(!g)return;const m=()=>{const F=window.getComputedStyle(g),A=Number.parseFloat(F.paddingLeft)+Number.parseFloat(F.paddingRight),xe=Number.parseFloat(F.paddingTop)+Number.parseFloat(F.paddingBottom),Y=Math.max(1,g.clientWidth-A),E=Math.max(1,g.clientHeight-xe),H=$t(v,Y,E);C(k=>k.width===H.width&&k.height===H.height?k:H),W(!0),D()};m();const y=new ResizeObserver(m);return y.observe(g),window.addEventListener("resize",m),()=>{y.disconnect(),window.removeEventListener("resize",m)}},[v,D]),n.useEffect(()=>{S.current=t.id,N.current=w,T(w),L(0)},[t.id,w]),n.useEffect(()=>{a.length===0&&c?.(t.id)},[t.id,c,a.length]),a.length===0?e.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."}):e.jsxs("div",{className:"flex w-full flex-col items-center",children:[e.jsx("div",{className:`public-book-stage ${r}`,children:e.jsx("div",{ref:d,className:"public-book-viewport relative flex cursor-default items-center justify-center overflow-hidden","data-page":V,children:e.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${R}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform"},children:_&&e.jsx(Dn,{ref:f,className:"mx-auto",style:{margin:"0 auto"},width:B.width,height:B.height,minWidth:1,maxWidth:v.maxWidth,minHeight:1,maxHeight:v.maxHeight,size:"fixed",startPage:S.current===t.id?N.current:w,drawShadow:!0,flippingTime:850,usePortrait:!1,startZIndex:0,autoSize:!1,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!0,disableFlipByClick:!1,onInit:g=>{N.current=g.data.page,T(g.data.page),o?.(g.data.page),D(g.object),c?.(t.id)},onFlip:g=>{N.current=g.data,T(g.data),o?.(g.data),D(g.object)},onChangeOrientation:g=>{D(g.object)},children:a.map((g,m)=>e.jsx(Na,{page:g,isCover:m===0||m===a.length-1},g.id))},`${t.id}-${b}-${B.width}x${B.height}`)})})}),e.jsx("div",{className:`public-book-meta public-book-title item-title flex items-center gap-8 text-[18px] ${r}`,children:e.jsx("span",{className:"max-w-[60vw] truncate",children:t.title})}),t.description&&e.jsx("div",{className:`public-book-meta public-book-description item-description flex items-center gap-8 text-[18px] ${r}`,children:e.jsx("span",{className:"max-w-[60vw] truncate",children:t.description})})]})}const mn="publicBookSession",kt="publicBookReturningToIndex",rt="publicBookReturningToIntro";function _t(){if(typeof window>"u")return null;try{const t=window.sessionStorage.getItem(mn);if(!t)return null;const a=JSON.parse(t);return typeof a.slug!="string"||a.slug.length===0||typeof a.pageIndex!="number"||!Number.isFinite(a.pageIndex)?null:{slug:a.slug,pageIndex:Math.max(0,Math.floor(a.pageIndex))}}catch{return null}}function Pe(t,a){if(typeof window>"u")return;const s={slug:t,pageIndex:Math.max(0,Math.floor(a))};try{window.sessionStorage.setItem(mn,JSON.stringify(s))}catch{}}const pn=()=>je(()=>import("./AdminPortal-DPlCiQ-x.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),Ra=n.lazy(pn),ot=1120,fn=180,Nt=140,Te=ot+Nt,Ca=fn+Te,ct=920,Dt=120,Ft=ct+Nt,jt=1180,Ia=1800,Aa=`
.public-book-shell {
  height: 100vh;
  height: 100dvh;
}

.public-book-nav {
  left: max(12px, env(safe-area-inset-left));
  top: max(12px, env(safe-area-inset-top));
  gap: clamp(5px, 1.8vw, 8px);
  max-width: calc(100vw - 24px);
}

.public-book-nav-icon {
  width: clamp(42px, 12vw, 48px);
  height: clamp(42px, 12vw, 48px);
}

.public-book-nav-text {
  height: clamp(42px, 12vw, 48px);
  padding-inline: clamp(12px, 3.8vw, 16px);
}

.public-book-main {
  padding-top: calc(env(safe-area-inset-top) + 5.25rem);
  padding-bottom: calc(env(safe-area-inset-bottom) + 1.6rem);
}

.public-book-viewport {
  box-sizing: border-box;
  width: min(calc(100vw - clamp(48px, 8vw, 112px)), 1280px);
  height: min(64dvh, 720px, calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 11.5rem));
  min-height: 0;
  padding: clamp(16px, 2.6vw, 34px);
  contain: layout paint;
}

.public-book-surface {
  transform: none;
  opacity: 1;
  filter: blur(0);
  transition:
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 700ms ease,
    filter 700ms ease;
}

.public-book-surface.is-login-muted {
  transform: scale(0.94);
  opacity: 0.25;
  filter: blur(9px);
}

.public-book-title {
  margin-top: clamp(8px, 2.2dvh, 1.75rem);
}

.public-book-description {
  margin-top: clamp(8px, 2dvh, 1.25rem);
}

@media (max-width: 380px), (max-height: 700px) {
  .public-book-nav {
    left: 50%;
    top: max(8px, env(safe-area-inset-top));
    transform: translateX(-50%);
    gap: clamp(4px, 1.4vw, 6px);
    max-width: calc(100vw - 12px);
  }

  .public-book-nav-icon {
    width: 40px;
    height: 40px;
  }

  .public-book-nav-text {
    height: 40px;
    padding-inline: 11px;
    font-size: 12px;
  }

  .public-book-main {
    padding-top: calc(env(safe-area-inset-top) + 4.3rem);
    padding-bottom: calc(env(safe-area-inset-bottom) + 1rem);
  }

  .public-book-viewport {
    width: min(calc(100vw - clamp(36px, 8vw, 64px)), 1280px);
    height: min(58dvh, calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 9.2rem));
    min-height: 0;
    padding: clamp(12px, 2.4vw, 20px);
  }

  .public-book-title,
  .public-book-description {
    font-size: 14px;
  }

  .public-book-label-wrap {
    display: none;
  }

  .public-book-balloon {
    top: calc(env(safe-area-inset-top) + 3.8rem);
    max-height: calc(100dvh - env(safe-area-inset-top) - 4.5rem);
  }
}

@media (max-height: 520px) {
  .public-book-description {
    display: none;
  }

  .public-book-title {
    margin-top: 5px;
  }

  .public-book-viewport {
    height: min(52dvh, calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 8.4rem));
  }
}

.public-book-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.public-book-scroll::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.public-book-background-layer {
  position: absolute;
  inset: -4%;
  transform-origin: 50% 50%;
  will-change: opacity, transform, filter, clip-path;
}

.public-book-background-layer.is-current {
  animation: public-book-background-mix-in ${jt}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${jt}ms cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes public-book-background-mix-in {
  0% {
    opacity: 0;
    transform: scale(1.08);
    filter: blur(30px) saturate(0.88);
    clip-path: circle(0% at 50% 50%);
  }
  52% {
    opacity: 0.72;
    filter: blur(12px) saturate(1.04);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0) saturate(1);
    clip-path: circle(150% at 50% 50%);
  }
}

@keyframes public-book-background-mix-out {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0) saturate(1);
  }
  62% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0) saturate(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.96);
    filter: blur(30px) saturate(0.86);
  }
}

.public-book-stage {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.public-book-meta {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.public-book-meta.is-outside {
  transform: scale(0);
  opacity: 0;
}

.public-book-meta.is-visible {
  transform: scale(1);
  opacity: 1;
}

.public-book-meta.is-entering,
.public-book-meta.is-leaving {
  animation-name: elastic-center-scale;
  animation-duration: ${ot}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-meta.is-fast.is-entering,
.public-book-meta.is-fast.is-leaving {
  animation-duration: ${ct}ms;
}

.public-book-meta.is-entering { animation-direction: normal; }
.public-book-meta.is-leaving {
  animation-direction: reverse;
  pointer-events: none;
}

.public-book-meta.item-title { animation-delay: 70ms; }
.public-book-meta.item-description { animation-delay: 140ms; }

.public-book-stage.is-outside {
  transform: scale(0);
  opacity: 0;
}

.public-book-stage.is-visible {
  transform: scale(1);
  opacity: 1;
}

.public-book-stage.is-entering,
.public-book-stage.is-leaving {
  animation-name: elastic-center-scale;
  animation-duration: ${ot}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-stage.is-fast.is-entering,
.public-book-stage.is-fast.is-leaving {
  animation-duration: ${ct}ms;
}

.public-book-stage.is-entering {
  animation-direction: normal;
}

.public-book-stage.is-leaving {
  pointer-events: none;
  animation-direction: reverse;
}

.public-login-stage {
  opacity: 0;
  transition: opacity 220ms ease;
}

.public-login-stage.is-outside {
  opacity: 0;
  pointer-events: none;
}

.public-login-stage.is-entering,
.public-login-stage.is-visible {
  opacity: 1;
}

.public-login-stage.is-leaving {
  opacity: 1;
}

.public-nav-item,
.public-book-label {
  transform-origin: 50% 50%;
  will-change: transform, opacity, filter;
}

.public-nav-item.is-visible,
.public-book-label.is-visible {
  animation: public-nav-arrive 760ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
  animation-delay: var(--public-nav-delay, 0ms);
}

.public-nav-item.is-leaving,
.public-book-label.is-leaving {
  animation: elastic-center-scale 720ms cubic-bezier(0.22, 0.88, 0.3, 1) reverse both;
  animation-delay: var(--public-nav-exit-delay, 0ms);
  pointer-events: none;
}

.public-nav-item.is-outside,
.public-book-label.is-outside {
  transform: translate3d(0, -72px, 0) scale(0);
  opacity: 0;
  filter: blur(8px);
  pointer-events: none;
}

@keyframes public-nav-arrive {
  0% { transform: translate3d(0, -72px, 0) scale(0); opacity: 0; filter: blur(8px); }
  58% { transform: translate3d(0, 7px, 0) scale(1.12); opacity: 1; filter: blur(0); }
  76% { transform: translate3d(0, -3px, 0) scale(0.94); }
  90% { transform: translate3d(0, 1px, 0) scale(1.025); }
  100% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; filter: blur(0); }
}

@media (prefers-reduced-motion: reduce) {
  .public-book-stage.is-entering,
  .public-book-stage.is-leaving,
  .public-book-meta.is-entering,
  .public-book-meta.is-leaving,
  .public-login-stage.is-entering,
  .public-login-stage.is-leaving,
  .public-nav-item,
  .public-book-label {
    animation-duration: 1ms;
  }
}

.public-route-message {
  will-change: transform, opacity, filter;
  transition:
    transform 760ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 560ms ease,
    filter 560ms ease;
}

.public-route-message.is-outside {
  transform: translate3d(0, 105vh, 0) scale(0.86);
  opacity: 0;
  filter: blur(12px);
}

.public-route-message.is-visible {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .public-book-background-layer.is-current,
  .public-book-background-layer.is-previous {
    animation-duration: 1ms;
  }
}
`,Oa={objects:"OBJ",graphics:"GRPH",concepts:"CNCP"};function vt(t){return t instanceof Error?t.message:"Unable to load the books."}function fe(t){return new Promise(a=>{window.setTimeout(a,t)})}function zt(){return new Promise(t=>{window.requestAnimationFrame(()=>t())})}function Ba(t){const a=s=>Number.isFinite(s)?Math.min(255,Math.max(0,Math.round(s??255))):255;return`rgb(${a(t?.background_r)} ${a(t?.background_g)} ${a(t?.background_b)})`}function Ma(t){return new Promise(a=>{const s=new Image;let r=!1;const o=()=>{r||(r=!0,window.clearTimeout(c),a())},c=window.setTimeout(o,5e3);s.onload=()=>{if(typeof s.decode=="function"){s.decode().catch(()=>{}).finally(o);return}o()},s.onerror=o,s.src=t})}async function Ut(t){await Promise.all(t.slice(0,2).map(a=>Ma(a.public_url)))}function Pa({initialSlug:t,onBack:a,onLogin:s,onThreeD:r,onBookChange:o}){const[c,f]=n.useState([]),[d,b]=n.useState(null),[v,w]=n.useState([]),[S,N]=n.useState(!0),[V,T]=n.useState(!1),[R,L]=n.useState(null),[B,C]=n.useState(!1),[_,W]=n.useState(!1),[D,g]=n.useState("outside"),[m,y]=n.useState(!1),[F,A]=n.useState("outside"),[xe,Y]=n.useState(!1),[E,H]=n.useState(0),[k,J]=n.useState(!1),[ve,Se]=n.useState(!1),x=n.useRef(!0),U=n.useRef(!1),I=n.useRef(null),Re=n.useRef(null),ze=n.useRef(null),ee=n.useRef(!1),re=n.useRef(_t()),K=n.useRef(null),we=n.useRef(0),ue=n.useRef("rgb(255 255 255)"),de=n.useRef(null),Q=n.useRef(null),te=n.useRef(null),[ae,Ue]=n.useState([{id:0,color:ue.current}]),O=n.useMemo(()=>c.find(l=>l.id===d)??null,[c,d]);n.useEffect(()=>{const l=Ba(O);if(l===ue.current)return;ue.current=l;const h={id:++we.current,color:l};Ue(j=>[j[j.length-1],h]),de.current&&window.clearTimeout(de.current),de.current=window.setTimeout(()=>{Ue(j=>j.slice(-1)),de.current=null},jt)},[O,O?.background_b,O?.background_g,O?.background_r]);const oe=n.useCallback(l=>{if(Q.current===l)return Promise.resolve();const h=te.current;return h&&h.finish(),new Promise(j=>{let Z=!1;const ye=()=>{Z||(Z=!0,window.clearTimeout(Ke),te.current?.finish===ye&&(te.current=null),j())},Ke=window.setTimeout(ye,Ia);te.current={bookId:l,finish:ye,timeout:Ke}})},[]),M=n.useCallback(l=>{Q.current=l;const h=te.current;h?.bookId===l&&h.finish()},[]);n.useEffect(()=>{I.current=d},[d]);const me=n.useCallback(()=>{K.current&&(window.clearTimeout(K.current),K.current=null)},[]),se=n.useCallback((l=!1)=>{me();const h=l?Dt:fn,j=l?ct:ot;Y(l),A("outside"),K.current=window.setTimeout(()=>{x.current&&(A("entering"),K.current=window.setTimeout(()=>{x.current&&(A("visible"),Y(!1),K.current=null)},j+Nt))},h)},[me]);n.useEffect(()=>{x.current=!0;const l=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{x.current&&y(!0)})});return()=>{x.current=!1,window.cancelAnimationFrame(l),K.current&&window.clearTimeout(K.current),de.current&&window.clearTimeout(de.current),te.current&&(window.clearTimeout(te.current.timeout),te.current.finish())}},[]),n.useEffect(()=>{let l=!0;return(async()=>{N(!0),L(null);try{const j=await dn();if(!l)return;f(j)}catch(j){l&&L(vt(j))}finally{l&&N(!1)}})(),()=>{l=!1}},[]);const _e=n.useCallback(async l=>{if(!ee.current){ee.current=!0,T(!0),L(null);try{const h=await ke(l.id);if(await Ut(h),!x.current)return;const j=re.current,Z=j?.slug===l.slug?Math.min(j.pageIndex,Math.max(0,h.length-1)):0;Q.current=null;const ye=oe(l.id);if(Bt.flushSync(()=>{Y(!1),A("outside"),b(l.id),w(h),H(Z)}),Pe(l.slug,Z),T(!1),await ye,!x.current)return;se()}catch(h){x.current&&(L(vt(h)),T(!1))}finally{ee.current=!1}}},[se,oe]),pe=n.useCallback(async(l,h)=>{if(x.current){if(U.current){Re.current={book:l,updateRoute:h},C(!1);return}if(I.current===l.id){C(!1);return}U.current=!0,J(!0),T(!0),C(!1),L(null);try{const j=await ke(l.id);if(!x.current||(await Ut(j),!x.current)||(me(),Y(!0),A("leaving"),await fe(Ft),!x.current))return;Q.current=null;const Z=oe(l.id);if(Bt.flushSync(()=>{Y(!0),A("outside"),b(l.id),I.current=l.id,w(j),H(0),T(!1)}),re.current={slug:l.slug,pageIndex:0},Pe(l.slug,0),h&&o?.(l.slug),await zt(),await zt(),await Z,await fe(Dt),!x.current)return;A("entering"),await fe(Ft),x.current&&(A("visible"),Y(!1))}catch(j){x.current&&(L(vt(j)),T(!1),Y(!1),A("visible"))}finally{if(U.current=!1,x.current){J(!1);const j=Re.current;Re.current=null,j&&j.book.id!==I.current&&window.setTimeout(()=>{ze.current?.(j.book,j.updateRoute)},24)}}}},[me,o,oe]);n.useEffect(()=>{ze.current=(l,h)=>{pe(l,h)}},[pe]),n.useEffect(()=>{if(S||c.length===0)return;const l=t?c.find(h=>h.slug===t):null;if(!d){const h=c.find(Z=>Z.is_featured),j=l??h??c[0];_e(j);return}l&&l.id!==d&&!U.current&&pe(l,!1)},[c,t,_e,S,d,pe]);const he=n.useCallback(async()=>{!_||U.current||(U.current=!0,J(!0),g("leaving"),await fe(Te),x.current&&(W(!1),g("outside"),se(),await fe(Ca),U.current=!1,x.current&&J(!1)))},[_,se]);n.useEffect(()=>{const l=h=>{if(h.key==="Escape"){if(_){he();return}C(!1)}};return window.addEventListener("keydown",l),()=>{window.removeEventListener("keydown",l)}},[he,_]);const Ce=async()=>{if(!U.current){if(C(!1),_){await he();return}U.current=!0,J(!0),pn(),!(O&&(me(),A("leaving"),await fe(Te),!x.current))&&(W(!0),g("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{x.current&&g("entering")})}),await fe(Te),U.current=!1,x.current&&(g("visible"),J(!1)))}},Ve=async()=>{if(_){await he();return}U.current||(U.current=!0,J(!0),C(!1),y(!1),me(),A("leaving"),O&&Pe(O.slug,E),window.sessionStorage.setItem(kt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.getItem("returnFromExample")!=="true"?window.sessionStorage.setItem(rt,"true"):window.sessionStorage.removeItem(rt),await fe(Te),x.current&&a())},Ie=async()=>{U.current||_||(U.current=!0,J(!0),Se(!0),C(!1),y(!1),me(),A("leaving"),O&&Pe(O.slug,E),await fe(Te),x.current&&r())},ie=l=>{pe(l,!0)},Ae=n.useCallback(l=>{H(l),O&&(re.current={slug:O.slug,pageIndex:l},Pe(O.slug,l))},[O]),He=`${F==="entering"?"is-entering":F==="visible"?"is-visible":F==="leaving"?"is-leaving":"is-outside"}${xe?" is-fast":""}`,dt=D==="entering"?"is-entering":D==="visible"?"is-visible":D==="leaving"?"is-leaving":"is-outside",ge=m?"is-visible":k||ve?"is-leaving":"is-outside";return e.jsxs("div",{className:"public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:ae[0]?.color??"rgb(255 255 255)"},children:[e.jsx("style",{children:Aa}),e.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:ae.map((l,h)=>e.jsx("div",{className:`public-book-background-layer ${h===ae.length-1?"is-current":"is-previous"}`,style:{backgroundColor:l.color}},l.id))}),B&&!_&&e.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-transparent",onClick:()=>C(!1)}),e.jsxs("div",{className:"public-book-nav fixed z-[170] flex items-center",children:[e.jsx("div",{className:`public-nav-item ${ge}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:e.jsx("button",{type:"button",onClick:()=>void Ve(),disabled:k,className:"public-book-nav-icon flex items-center justify-center rounded-full border border-black/35 bg-transparent transition-transform duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40","aria-label":_?"Back to book":"Back",title:_?"Back to book":"Back",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",className:"h-5 w-5","aria-hidden":"true",children:[e.jsx("path",{d:"M19 12H5"}),e.jsx("path",{d:"m11 18-6-6 6-6"})]})})}),e.jsx("div",{className:`public-nav-item ${ge}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:e.jsx("button",{type:"button",onClick:()=>C(l=>!l),disabled:_,className:`public-book-nav-icon flex items-center justify-center rounded-full border bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${B?"border-black text-black":"border-black/35 text-black"}`,"aria-label":"Choose a book","aria-expanded":B,"aria-controls":"public-book-balloon",title:"Choose a book",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",className:"h-5 w-5","aria-hidden":"true",children:[e.jsx("path",{d:"M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"}),e.jsx("path",{d:"M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"})]})})}),e.jsx("div",{className:`public-nav-item ${ge}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:e.jsx("button",{type:"button",onClick:()=>void Ce(),disabled:k,className:`public-book-nav-text flex items-center justify-center rounded-full border bg-transparent text-[13px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${_?"border-black text-black":"border-black/35 text-black"}`,"aria-expanded":_,children:"LOGIN"})}),e.jsx("div",{className:`public-nav-item ${ge}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:e.jsx("button",{type:"button",onClick:()=>void Ie(),disabled:k||_,className:"public-book-nav-text flex items-center justify-center rounded-full border border-black/35 bg-transparent text-[13px] text-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40",children:"3D"})})]}),e.jsxs("aside",{id:"public-book-balloon",className:`public-book-balloon fixed left-4 top-[76px] z-[150] flex max-h-[72vh] w-[min(88vw,390px)] origin-top-left flex-col rounded-[34px] border border-black/25 bg-white/95 p-5 shadow-[0_18px_65px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] sm:left-[74px] sm:top-[82px] ${B&&!_?"pointer-events-auto scale-100 opacity-100 blur-0":"pointer-events-none scale-0 opacity-0 blur-[10px]"}`,"aria-hidden":!B||_,children:[e.jsx("div",{className:"absolute -top-2 left-[46px] h-4 w-4 rotate-45 border-l border-t border-black/25 bg-white"}),e.jsxs("div",{className:"relative mb-4 flex items-start justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[12px] tracking-[0.18em] text-black/45",children:"LIBRARY"}),e.jsx("h1",{className:"mt-1 text-[22px] font-light",children:"CHOOSE A BOOK"})]}),e.jsx("button",{type:"button",onClick:()=>C(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95","aria-label":"Close book list",children:e.jsx("span",{"aria-hidden":"true",children:"×"})})]}),e.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto border-t border-black/15",children:S?e.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"LOADING..."}):c.length===0?e.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):c.map(l=>{const h=l.id===d;return e.jsxs("button",{type:"button",onClick:()=>ie(l),className:`grid w-full grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-all duration-300 ${h?"translate-x-1 text-black":"text-black/60 hover:translate-x-1 hover:text-black"}`,children:[e.jsx("span",{className:"text-[12px] tracking-wide",children:Oa[l.category]}),e.jsxs("span",{className:"min-w-0",children:[e.jsx("span",{className:"block truncate text-[16px]",children:l.title}),l.description&&e.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/45",children:l.description})]}),e.jsx("span",{className:"flex min-w-[18px] justify-end text-[13px]",children:l.is_featured?"*":h?">":""})]},l.id)})}),e.jsx("p",{className:"relative mt-3 text-[11px] text-black/40",children:"* Featured"})]}),e.jsx("div",{className:"public-book-label-wrap pointer-events-none fixed inset-x-0 top-5 z-[100] flex justify-center px-[230px] sm:top-7",children:O&&e.jsx("p",{className:`public-book-label max-w-full truncate text-center text-[13px] tracking-[0.12em] text-black/55 ${ge}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:O.is_featured?"FEATURED - ":""})}),e.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden px-2 sm:px-5",children:S||V&&!O?e.jsx("div",{className:`public-route-message ${m?"is-visible":"is-outside"}`,children:"LOADING..."}):R?e.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${m?"is-visible":"is-outside"}`,children:R}):c.length===0?e.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${m?"is-visible":"is-outside"}`,children:"No books are public yet."}):O?e.jsx("div",{className:"h-full w-full",children:e.jsx("div",{className:`public-book-surface flex h-full w-full items-center justify-center ${_?"is-login-muted":""}`,children:e.jsx(Ta,{book:O,pages:v,initialPage:E,bookMotionClassName:He,onPageChange:Ae,onReady:M},O.id)})}):null}),_&&e.jsx("div",{className:`public-login-stage fixed inset-0 z-[130] overflow-hidden bg-white ${dt}`,"aria-hidden":D==="outside"||D==="leaving",children:e.jsx(n.Suspense,{fallback:null,children:e.jsx(Ra,{embedded:!0,surfaceReady:D==="entering"||D==="visible",onBack:()=>void he()})})})]})}const hn=n.createContext(void 0),La=({children:t})=>{const[a,s]=n.useState(!1),r=()=>{s(!a)};return n.useEffect(()=>{a?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[a]),e.jsx(hn.Provider,{value:{isDark:a,toggleTheme:r},children:t})},As=()=>{const t=n.useContext(hn);if(t===void 0)throw new Error("useTheme must be used within a ThemeProvider");return t},Vt="/assets/WolfyLight-Bs10J6iU.gif",$a=100,Da=500,Fa=14e3,wt=400,za=({onComplete:t})=>{const[a,s]=n.useState(!1),[r,o]=n.useState(!1),[c,f]=n.useState(!1),[d,b]=n.useState(!1),[v,w]=n.useState({}),[S,N]=n.useState(0),[V,T]=n.useState(!0),R=n.useRef({}),L=n.useRef(null),B=n.useRef(!1),C=n.useRef(!1),{progress:_}=Hn();n.useEffect(()=>{let m;const y=()=>{N(F=>{const A=_-F,xe=Math.max(A*.1,A>0?.5:-.5),Y=Math.abs(A)<.5?_:F+xe;return Y>=100&&setTimeout(()=>T(!1),500),Math.min(100,Math.max(0,Y))}),m=requestAnimationFrame(y)};return m=requestAnimationFrame(y),()=>cancelAnimationFrame(m)},[_]),n.useEffect(()=>{const m=window.matchMedia("(prefers-reduced-motion: reduce)");C.current=m.matches;const y=()=>C.current=m.matches;return m.addEventListener?.("change",y),()=>m.removeEventListener?.("change",y)},[]),n.useEffect(()=>{const m=new Image;m.src=Vt;const y=()=>w({w:m.naturalWidth||400,h:m.naturalHeight||400});m.decode?.().then(()=>{y(),s(!0)}).catch(()=>{m.onload=()=>{y(),s(!0)}})},[]);const W=n.useCallback(()=>{if(B.current)return;if(C.current){B.current=!0,t();return}b(!0);const m=L.current;let y=!1;const F=()=>{y||(y=!0,B.current=!0,t())};if(m){const A=()=>{m.removeEventListener("animationend",A),R.current.fallback&&clearTimeout(R.current.fallback),F()};m.addEventListener("animationend",A,{once:!0}),R.current.fallback=window.setTimeout(F,wt+120)}else R.current.fallback=window.setTimeout(F,wt+50)},[t]);n.useEffect(()=>{if(!a)return;const m=R.current;return C.current?(o(!0),f(!0),m.auto=window.setTimeout(()=>W(),800)):(m.entry=window.setTimeout(()=>o(!0),$a),m.allowExit=window.setTimeout(()=>f(!0),Da),m.auto=window.setTimeout(()=>W(),Fa)),()=>{Object.values(m).forEach(y=>y&&clearTimeout(y))}},[a,W]);const D=()=>{(c||C.current)&&W()},g=r?d?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return e.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${B.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:D,children:[e.jsxs("div",{className:`relative ${g}`,ref:L,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[e.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),e.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),e.jsx("img",{src:Vt,alt:"Loading wolf",width:v.w||800,height:v.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),V&&e.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${S>=100?"opacity-0":"opacity-100"}`,children:[Math.round(S),"%"]}),e.jsx("style",{children:`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          70% { transform: scale(1.4); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-pulse-ring { animation: pulse-ring 1s infinite; }
        .delay-300 { animation-delay: 0.3s; }

        .logo-hidden { transform-origin: 50% 50%; transform: scale(0); opacity: 1; }
        @keyframes elastic-grow {
          0% { transform: scale(0); opacity: 1; }
          55% { transform: scale(1.18); }
          78% { transform: scale(0.95); }
          90% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        .animate-elastic-grow { transform-origin: 50% 50%; animation: elastic-grow 700ms cubic-bezier(.2,1.05,.3,1) forwards; }

        @keyframes elastic-shrink {
          0% { transform: scale(1); opacity: 1; }
          60% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(0); opacity: 1; }
        }
        .animate-elastic-shrink { transform-origin: 50% 50%; animation: elastic-shrink ${wt}ms ease-in forwards; }
      `})]})},X={};typeof window<"u"&&(window.addEventListener("keydown",t=>{X[t.key.toLowerCase()]=!0}),window.addEventListener("keyup",t=>{X[t.key.toLowerCase()]=!1}));const gn={current:null},Le={center:new G(0,0,-300),radius:60},Et=15,Ua=38,Va=95,Wt=[500,200,-300],Wa=new G(500,150,-1e3).normalize(),Ha="#fff4d6",Ka="#0b1e3a",Ga="#0a2a6a";function qa(t,a,s){let r=a-t;for(;r<-Math.PI;)r+=Math.PI*2;for(;r>Math.PI;)r-=Math.PI*2;return t+r*s}function Ya(){const t=n.useRef(null),a=qn(ea,"/waternormals.jpeg");a.wrapS=a.wrapT=ta;const s=n.useMemo(()=>new na(1e4,1e4),[]),r=n.useMemo(()=>new Yn(s,{textureWidth:512,textureHeight:512,waterNormals:a,sunDirection:Wa.clone(),sunColor:new Mt("#fff2cc"),waterColor:new Mt(Ga),distortionScale:10.7,fog:!1}),[s,a]);return r.material.uniforms.waterColor.value.convertSRGBToLinear(),n.useEffect(()=>()=>{s.dispose(),r.material.dispose()},[s,r]),St((o,c)=>{t.current&&(t.current.material.uniforms.time.value+=c)}),e.jsx("primitive",{object:r,ref:t,"rotation-x":-Math.PI/2})}function Xa(){const{scene:t}=ut("/island.gltf"),a=n.useMemo(()=>{const s=t.clone(!0);return s.traverse(r=>{if(!(r instanceof yt))return;const c=(Array.isArray(r.material)?r.material:[r.material]).map(f=>{const d=f.clone();return d instanceof sn&&(d.roughness=Math.max(d.roughness,.82),d.metalness=Math.min(d.metalness,.02),d.envMapIntensity=.08),d.needsUpdate=!0,d});r.material=Array.isArray(r.material)?c:c[0],r.castShadow=!0,r.receiveShadow=!0}),s},[t]);return n.useEffect(()=>()=>{a.traverse(s=>{if(!(s instanceof yt))return;(Array.isArray(s.material)?s.material:[s.material]).forEach(o=>o.dispose())})},[a]),e.jsx("primitive",{object:a,scale:100,position:[0,-5,-300]})}function Ja(){const t=n.useRef(null),{camera:a}=an(),{scene:s}=ut("/wolfy.glb"),r=n.useMemo(()=>Xn.clone(s),[s]),o=n.useRef(new G),c=n.useRef(new G),f=n.useRef(0),d=n.useRef(!0),b=n.useRef(new G(0,0,1));return n.useEffect(()=>{r.traverse(v=>{v instanceof yt&&v.material instanceof sn&&(v.material=v.material.clone(),v.material.roughness=.42,v.material.metalness=.05,v.material.envMapIntensity=.35,v.castShadow=!0,v.receiveShadow=!0)})},[r]),n.useEffect(()=>{gn.current=t.current;const v=S=>{const{x:N,z:V}=S.detail;o.current.set(N,0,V)},w=()=>{d.current&&(d.current=!1,f.current=Ua)};return window.addEventListener("explore-joystick",v),window.addEventListener("explore-jump",w),()=>{window.removeEventListener("explore-joystick",v),window.removeEventListener("explore-jump",w)}},[]),St((v,w)=>{if(!t.current)return;const S=new G(o.current.x+(X.arrowright||X.d?1:0)-(X.arrowleft||X.a?1:0),0,o.current.z+(X.arrowup||X.w?1:0)-(X.arrowdown||X.s?1:0));S.lengthSq()<.01&&S.set(0,0,0);const N=new G;a.getWorldDirection(N),N.y=0,N.normalize();const V=new G().crossVectors(N,new G(0,1,0)).normalize(),T=new G().addScaledVector(N,S.z).addScaledVector(V,S.x);T.lengthSq()>1e-4&&T.normalize(),c.current.lerp(T.multiplyScalar(100),w*6);const R=t.current.position.clone().addScaledVector(c.current,w);if(f.current-=Va*Math.min(w,.05),R.y+=f.current*Math.min(w,.05),R.y<=Et&&(R.y=Et,f.current=0,d.current=!0),R.distanceTo(Le.center)<Le.radius+2){const B=R.clone().sub(Le.center).normalize();R.copy(Le.center.clone().add(B.multiplyScalar(Le.radius+2))),c.current.multiplyScalar(.2)}if(t.current.position.copy(R),S.lengthSq()>.01){const B=T.clone();S.z<-.2&&B.copy(N),b.current.lerp(B,.15).normalize();const C=Math.atan2(b.current.x,b.current.z);t.current.rotation.y=qa(t.current.rotation.y,C,.15)}t.current.userData.joyX=o.current.x}),e.jsx("primitive",{ref:t,object:r,scale:10,position:[0,15,0],rotation:[0,Math.PI,0]})}function Qa(){const{camera:t}=an(),a=n.useRef(0),s=n.useRef(0),r=n.useRef(!1);return n.useEffect(()=>{const o=c=>{r.current=c.detail.enabled};return window.addEventListener("explore-mode",o),()=>window.removeEventListener("explore-mode",o)},[]),St((o,c)=>{const f=gn.current;if(!f)return;s.current+=c*(r.current?1:-1),s.current=aa.clamp(s.current,0,1);const d=s.current*s.current*(3-2*s.current),v=(X.arrowright||X.d?1:0)-(X.arrowleft||X.a?1:0)+(f.userData?.joyX??0);Math.abs(v)>.05&&(a.current-=v*c*2.5);const w=new G(0,22,70);w.applyAxisAngle(new G(0,1,0),a.current);const S=f.position.clone();S.y=Et;const N=S.add(w),T=new G(0,20,100).add(new G(Math.sin(s.current*Math.PI)*20,0,0)).lerp(N,d);t.position.lerp(T,.12);const R=new G(0,5,0),L=f.position.clone();L.y+=6,t.lookAt(R.lerp(L,d))}),null}function Za(){const t=n.useRef(null),a=n.useRef(!1);return n.useEffect(()=>{const s=new Audio("/Ocean.mp3");s.loop=!0,s.preload="auto",s.volume=0,t.current=s;const r=(b,v=2e3)=>{if(!t.current)return;const w=t.current,S=w.volume,N=performance.now(),V=T=>{const R=Math.min((T-N)/v,1);w.volume=S+(b-S)*R,R<1?requestAnimationFrame(V):b===0&&(w.pause(),w.currentTime=0)};requestAnimationFrame(V)},o=async()=>{a.current=!0;try{s.paused&&await s.play(),r(.14,2400)}catch{}},c=()=>{a.current=!1,r(0,1800)},f=b=>{b.detail.active?o():c()},d=()=>{a.current&&o()};return window.addEventListener("skyocean-audio",f),window.addEventListener("pointerdown",d,{passive:!0}),window.addEventListener("keydown",d),document.getElementById("global-sky-ocean-bg")?.getAttribute("data-audio-active")==="1"&&o(),()=>{window.removeEventListener("skyocean-audio",f),window.removeEventListener("pointerdown",d),window.removeEventListener("keydown",d),s.pause(),s.src=""}},[]),null}function es(){return e.jsxs(e.Fragment,{children:[e.jsx(Za,{}),e.jsxs(Kn,{shadows:!0,camera:{position:[0,20,100],fov:55},gl:{antialias:!0,toneMapping:Zn,toneMappingExposure:.8,outputColorSpace:Qn},children:[e.jsx("color",{attach:"background",args:[Ka]}),e.jsx("directionalLight",{position:Wt,intensity:1,color:Ha,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-camera-near":10,"shadow-camera-far":1800,"shadow-camera-left":-500,"shadow-camera-right":500,"shadow-camera-top":500,"shadow-camera-bottom":-500}),e.jsx("ambientLight",{intensity:.35,color:"#ffffff"}),e.jsxs(n.Suspense,{fallback:null,children:[e.jsx(Ya,{}),e.jsx(Xa,{}),e.jsx(Ja,{})]}),e.jsx(Qa,{}),e.jsx(Gn,{distance:1e3,sunPosition:Wt,turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})]})]})}ut.preload("/wolfy.glb");ut.preload("/island.gltf");function Fe(t,a){return t instanceof Error?t:typeof t=="object"&&t&&"message"in t?new Error(String(t.message)):new Error(a)}function ts(t){return t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function ns(){const{data:t,error:a}=await $.from("archive_sections").select("*").eq("is_visible",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(a)throw Fe(a,"Unable to load the archive sections.");return t??[]}async function Os(){const{data:t,error:a}=await $.from("archive_sections").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(a)throw Fe(a,"Unable to load the archive section manager.");return t??[]}async function Bs(t,a,s){const r=t.trim(),o=ts(r),c=a.trim().toUpperCase().slice(0,8);if(!r||!o)throw new Error("Enter a section name.");if(!c)throw new Error("Enter a short section code.");const{data:f,error:d}=await $.from("archive_sections").insert({name:r,slug:o,code:c,sort_order:s,is_visible:!0}).select("*").single();if(d)throw Fe(d,"Unable to create the archive section.");return f}async function Ms(t,a){const s={...a,...a.name!==void 0?{name:a.name.trim()}:{},...a.code!==void 0?{code:a.code.trim().toUpperCase().slice(0,8)}:{}},{data:r,error:o}=await $.from("archive_sections").update(s).eq("id",t).select("*").single();if(o)throw Fe(o,"Unable to save the archive section.");return r}async function Ps(t){const{error:a}=await $.from("archive_sections").delete().eq("id",t.id);if(a)throw Fe(a,"Unable to delete this section. Move its books to another section first.")}const Ht=[{id:"default-objects",slug:"objects",name:"Objects",code:"OBJ",sort_order:0,is_visible:!0,created_at:"",updated_at:""},{id:"default-graphics",slug:"graphics",name:"Graphics",code:"GRPH",sort_order:1,is_visible:!0,created_at:"",updated_at:""},{id:"default-concepts",slug:"concepts",name:"Concepts",code:"CNCP",sort_order:2,is_visible:!0,created_at:"",updated_at:""}],as=`
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { width: 0px; height: 0px; background: transparent; }
.no-scrollbar::-webkit-scrollbar-track { background: transparent; }
.no-scrollbar::-webkit-scrollbar-thumb { background: transparent; border: none; }

input.search-input {
  background-color: transparent !important;
  -webkit-appearance: none;
  appearance: none;
}
input.search-input:-webkit-autofill,
input.search-input:-webkit-autofill:hover,
input.search-input:-webkit-autofill:focus,
input.search-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 10000px transparent inset !important;
  -webkit-text-fill-color: inherit !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

.reveal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  -webkit-tap-highlight-color: transparent;
}

.reveal-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.mask-circle {
  transform-origin: 50% 50%;
  transform-box: fill-box;
  transform: scale(0);
  will-change: transform;
}

.mask-circle.is-opening {
  animation: reveal-elastic 3s 1.5s forwards;
}

.mask-circle.is-closing {
  animation: reveal-elastic 3s 0s reverse both;
}

@keyframes reveal-elastic {
  0% { transform: scale(0); }
  50% { transform: scale(1.25); }
  72% { transform: scale(0.92); }
  88% { transform: scale(9); }
  100% { transform: scale(9); }
}

.reveal-overlay.fade-out {
  animation: overlay-fade 220ms forwards;
}
@keyframes overlay-fade {
  from { opacity: 1; pointer-events: all; }
  to   { opacity: 0; pointer-events: none; visibility: hidden; }
}

.intro-elastic-item,
.index-elastic-item {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.intro-elastic-item.is-outside,
.index-elastic-item.is-outside {
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
}

.intro-elastic-item.is-visible,
.index-elastic-item.is-visible {
  transform: scale(1);
  opacity: 1;
}

.intro-elastic-item.is-entering,
.intro-elastic-item.is-leaving,
.index-elastic-item.is-entering,
.index-elastic-item.is-leaving {
  animation-name: elastic-center-scale;
  animation-duration: 960ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.intro-elastic-item.is-entering,
.index-elastic-item.is-entering {
  animation-direction: normal;
}

.intro-elastic-item.is-leaving,
.index-elastic-item.is-leaving {
  animation-direction: reverse;
  pointer-events: none;
}

.intro-elastic-item.item-start {
  animation-delay: 90ms;
}

.intro-elastic-item.item-back {
  animation-delay: 180ms;
}

.index-elastic-item.item-list {
  animation-delay: 140ms;
}

.main-control-item,
.archive-elastic-item {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.main-control-item.is-outside,
.archive-elastic-item.is-outside {
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
}

.main-control-item.is-visible,
.archive-elastic-item.is-visible {
  transform: scale(1);
  opacity: 1;
}

.main-control-item.is-entering,
.main-control-item.is-leaving,
.archive-elastic-item.is-entering,
.archive-elastic-item.is-leaving {
  animation-name: elastic-center-scale;
  animation-duration: 960ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.main-control-item.is-entering,
.archive-elastic-item.is-entering {
  animation-direction: normal;
}

.main-control-item.is-leaving,
.archive-elastic-item.is-leaving {
  animation-direction: reverse;
  pointer-events: none;
}

.main-control-item.item-back { animation-delay: 0ms; }
.main-control-item.item-archive { animation-delay: 90ms; }
.main-control-item.item-about { animation-delay: 180ms; }
.main-control-item.item-play { animation-delay: 270ms; }

.archive-elastic-item.item-featured { animation-delay: 0ms; }
.archive-elastic-item.item-search { animation-delay: 70ms; }
.archive-elastic-item.item-objects { animation-delay: 140ms; }
.archive-elastic-item.item-graphics { animation-delay: 210ms; }
.archive-elastic-item.item-concepts { animation-delay: 280ms; }
.archive-elastic-item.item-search-field { animation-delay: 350ms; }

@media (prefers-reduced-motion: reduce) {
  .mask-circle.is-opening,
  .mask-circle.is-closing,
  .intro-elastic-item.is-entering,
  .intro-elastic-item.is-leaving,
  .index-elastic-item.is-entering,
  .index-elastic-item.is-leaving,
  .main-control-item.is-entering,
  .main-control-item.is-leaving,
  .archive-elastic-item.is-entering,
  .archive-elastic-item.is-leaving {
    animation-duration: 1ms;
    animation-delay: 0ms;
  }
}

.index-route-shell {
  transform-origin: 50% 50%;
  will-change: transform, opacity, filter, border-radius;
  transition:
    transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 650ms ease,
    filter 650ms ease,
    border-radius 900ms cubic-bezier(0.22, 1, 0.36, 1);
}

.index-route-shell.is-entering {
  transform: translate3d(0, 110vh, 0) scale(0.82);
  opacity: 0;
  filter: blur(14px);
  border-radius: 50%;
}

.index-route-shell.is-entered {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  filter: blur(0);
  border-radius: 0;
}

.index-route-shell.is-returning-from-book {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  filter: blur(0);
  border-radius: 0;
  transition: none;
}

.index-route-shell.is-leaving {
  pointer-events: none;
  animation: index-route-balloon-out 900ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

@keyframes index-route-balloon-out {
  0% {
    transform: translate3d(0, 0, 0) scale(1, 1);
    opacity: 1;
    filter: blur(0);
    border-radius: 0;
  }
  38% {
    transform: translate3d(0, -2vh, 0) scale(1.08, 1.08);
    opacity: 1;
    filter: blur(0);
    border-radius: 16%;
  }
  68% {
    transform: translate3d(0, -3vh, 0) scale(1.4, 0.72);
    opacity: 0.9;
    filter: blur(2px);
    border-radius: 48%;
  }
  100% {
    transform: translate3d(0, -6vh, 0) scale(3.2, 0.05);
    opacity: 0;
    filter: blur(18px);
    border-radius: 50%;
  }
}
`,z={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode"},ss="A short biography will appear here. This text can be replaced when the final copy is ready.",is=()=>{const t=lt(),s=n.useRef(sessionStorage.getItem(kt)==="true"||sessionStorage.getItem(rt)==="true"||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,o=n.useRef(s&&sessionStorage.getItem(z.returnFlag)==="true").current,[c]=n.useState(()=>_t()),[f,d]=n.useState(s),[b,v]=n.useState([]),[w,S]=n.useState(!0),[N,V]=n.useState(null),[T,R]=n.useState(Ht),[L,B]=n.useState(!1),C=n.useCallback(async()=>{S(!0);try{const i=await dn();v(i),V(null)}catch(i){console.error("Unable to load published books",i),V(i instanceof Error?i.message:"Unable to load the published books.")}finally{S(!1)}},[]),_=n.useCallback(async()=>{try{const i=await ns();R(i),B(!0)}catch{R(Ht),B(!1)}},[]);n.useEffect(()=>{C(),_();const i=()=>{C(),_()},u=()=>{document.visibilityState==="visible"&&C()};return window.addEventListener("focus",i),document.addEventListener("visibilitychange",u),()=>{window.removeEventListener("focus",i),document.removeEventListener("visibilitychange",u)}},[_,C]);const W=n.useMemo(()=>b.find(i=>i.is_featured)??b[0]??null,[b]),D=n.useMemo(()=>{if(L)return T;const i=[...T];return b.forEach(u=>{i.some(p=>p.slug===u.category)||i.push({id:`fallback-${u.category}`,slug:u.category,name:u.category.replace(/-/g," "),code:u.category.slice(0,4).toUpperCase(),sort_order:i.length,is_visible:!0,created_at:"",updated_at:""})}),i},[T,L,b]),g=n.useMemo(()=>{const i=new Map(D.map(p=>[p.slug,p])),u=p=>({id:p.id,category:i.get(p.category)?.code??p.category.slice(0,4).toUpperCase(),name:p.title,link:`/book/${encodeURIComponent(p.slug)}`,isFeatured:p.is_featured});return D.reduce((p,P)=>(p[P.slug]=b.filter(be=>be.category===P.slug).map(u),p),{})},[D,b]),m=n.useMemo(()=>Object.values(g).flat(),[g]);n.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const i="__GLOBAL_SKY_OCEAN_BG_ROOT__",u=window;if(u[i])return;const p=document.createElement("div");p.id="global-sky-ocean-bg",Object.assign(p.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(p);const P=nn.createRoot(p);P.render(e.jsx(n.Suspense,{fallback:null,children:e.jsx(es,{})})),u[i]=P},[]);const y=sessionStorage.getItem(z.stage)||"intro",F=sessionStorage.getItem(z.activeButton)||null,A=sessionStorage.getItem(z.searchOpen)==="true",xe=sessionStorage.getItem(z.searchQuery)||"",Y=sessionStorage.getItem(z.exploreMode)==="true",[E,H]=n.useState(y),[k,J]=n.useState(F),[ve,Se]=n.useState(A),[x,U]=n.useState(xe),[I,Re]=n.useState(Y),ze=y==="list"||!!F||A,[ee,re]=n.useState(ze),[K,we]=n.useState(!1),[ue,de]=n.useState(!1),[Q,te]=n.useState(!1),[ae,Ue]=n.useState(!1);n.useEffect(()=>{if(!ae||ue)return;if(s){d(!0);return}d(!1);let i=0;const u=window.requestAnimationFrame(()=>{i=window.requestAnimationFrame(()=>{d(!0)})});return()=>{window.cancelAnimationFrame(u),window.cancelAnimationFrame(i)}},[ae,s,ue]);const[O,oe]=n.useState(!1),[M,me]=n.useState(!1),[se,_e]=n.useState(!1),[pe,he]=n.useState(!1),[Ce,Ve]=n.useState(!o),Ie=n.useRef(null),[ie,Ae]=n.useState(()=>{try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),We=n.useRef(null),He=n.useRef(null);n.useEffect(()=>()=>{Ie.current&&window.clearTimeout(Ie.current)},[]),n.useEffect(()=>{if(!Q||E!=="intro"||se||M||!ie)return;const i=window.setTimeout(()=>{he(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(i)}},[se,Q,M,ie,E]),n.useEffect(()=>{if(E!=="main"&&E!=="list"||M||!ie||Ce)return;const i=window.setTimeout(()=>{Ve(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(i)}},[Ce,M,ie,E]);const[dt,ge]=n.useState(!1),l=n.useRef(null),h=n.useRef(null),[j,Z]=n.useState(!1);n.useEffect(()=>{if(!s)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem(kt),sessionStorage.removeItem(rt),sessionStorage.removeItem("revealDone"),Ae(!1),oe(!1),document.documentElement.style.background="",document.body.style.background="";const i=document.getElementById("global-sky-ocean-bg");i&&(i.style.display="block")},[s]),n.useEffect(()=>{try{sessionStorage.setItem(z.exploreMode,String(I))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:I}}));const i=document.getElementById("global-sky-ocean-bg");i&&i.setAttribute("data-explore",I?"1":"0")},[I]),n.useEffect(()=>{const i=ae&&!ue&&!M;document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active",i?"1":"0");const p=window.setTimeout(()=>{window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:i}}))},0);return()=>window.clearTimeout(p)},[ae,M,ue]),n.useEffect(()=>()=>{document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active","0"),window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:!1}}))},[]),n.useEffect(()=>{sessionStorage.setItem(z.stage,E),sessionStorage.setItem(z.activeButton,k??""),sessionStorage.setItem(z.searchOpen,String(ve)),sessionStorage.setItem(z.searchQuery,x)},[E,k,ve,x]),n.useEffect(()=>{!sessionStorage.getItem(z.splash)&&E==="intro"?de(!0):te(!0),Ue(!0)},[E]);const ye=n.useCallback(()=>{sessionStorage.setItem(z.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const i=document.getElementById("global-sky-ocean-bg");i&&(i.style.display="none"),de(!1),t(W?`/book/${encodeURIComponent(W.slug)}`:"/books")},[W,t]);n.useEffect(()=>{(Q||s)&&!ie&&!O&&!M&&oe(!0)},[Q,s,M,ie,O]);const Ke=n.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}We.current?(We.current.classList.add("fade-out"),setTimeout(()=>{oe(!1),Ae(!0)},240)):(oe(!1),Ae(!0))},[]),Ge=n.useCallback(i=>{M||(He.current=i,oe(!1),me(!0))},[M]),bn=n.useCallback(()=>{const i=He.current;if(!i)return;document.documentElement.style.background="white",document.body.style.background="white";const u=document.getElementById("global-sky-ocean-bg");u&&(u.style.display="none"),t(i)},[t]),ce=n.useCallback(()=>{J(null),Se(!1),U(""),H("main")},[]),qe=n.useCallback(()=>{re(!1)},[]),xn=n.useCallback(()=>{we(!1),ee&&ce(),re(i=>!i),window.dispatchEvent(new Event("mousemove"))},[ee,ce]),vn=n.useCallback(()=>{if(K){we(!1);return}ce(),re(!1),we(!0),window.dispatchEvent(new Event("mousemove"))},[K,ce]),Ye=n.useMemo(()=>m.filter(i=>i.name.toLowerCase().includes(x.toLowerCase())),[m,x]),wn=n.useCallback(()=>{if(k&&k!=="search"&&!x){const i=g[k]||[],u=m.filter(p=>!i.some(P=>P.id===p.id));return[...i,...u]}if(k==="search"&&x){const i=Ye,u=m.filter(p=>!i.some(P=>P.id===p.id));return[...i,...u]}return m},[k,x,g,m,Ye])(),yn=n.useCallback(i=>{k===i?ce():(J(i),H("list"),Se(!1),U(""))},[k,ce]),Tt=n.useCallback(i=>{const u=h.current?h.current.scrollTop:0;sessionStorage.setItem(z.listScroll,String(u));const p={activeButton:k,searchOpen:ve,searchQuery:x,stage:E,introVisible:Q,archiveOpen:ee};try{sessionStorage.setItem(z.snapshot,JSON.stringify(p))}catch{}sessionStorage.setItem(z.returnFlag,"true"),Ge(i)},[k,ee,Ge,Q,ve,x,E]),Rt=n.useCallback(()=>{ce(),qe(),we(!1),_e(!1),he(!1),H("intro")},[qe,ce]),kn=n.useCallback(()=>{se||M||(_e(!0),Ve(!1),qe(),we(!1),Ie.current=window.setTimeout(()=>{H("main"),_e(!1)},1160))},[qe,se,M]),jn=n.useCallback(()=>{!c||M||Ge(`/book/${encodeURIComponent(c.slug)}`)},[Ge,c,M]),En=n.useCallback(()=>{k==="search"?ce():(Se(!0),H("list"),J("search"))},[k,ce]),Xe=n.useCallback(()=>{ge(!1),l.current&&clearTimeout(l.current),l.current=window.setTimeout(()=>{ge(!0)},5e3)},[]);n.useEffect(()=>{const i=["mousemove","mousedown","touchstart","touchmove","keydown"];return i.forEach(u=>{window.addEventListener(u,Xe)}),Xe(),()=>{i.forEach(u=>{window.removeEventListener(u,Xe)}),l.current&&clearTimeout(l.current)}},[Xe]),n.useEffect(()=>{if(!ae||!(sessionStorage.getItem(z.returnFlag)==="true"))return;let u=null;try{const p=sessionStorage.getItem(z.snapshot);u=p?JSON.parse(p):null}catch{}if(u){J(u.activeButton??null),Se(!!u.searchOpen),U(u.searchQuery??""),u.archiveOpen||u.stage==="list"?re(!0):re(!1),u.stage&&H(u.stage),te(!!u.introVisible),u.stage==="list"&&Z(!0),sessionStorage.removeItem(z.returnFlag);return}te(!0),H("main"),re(!0),window.setTimeout(()=>{H("list"),Z(!0),sessionStorage.removeItem(z.returnFlag)},700)},[ae]),n.useEffect(()=>{if(E!=="list"||!j)return;const i=Number(sessionStorage.getItem(z.listScroll)||"0"),u=window.setTimeout(()=>{h.current&&(h.current.scrollTop=Number.isNaN(i)?0:i),Z(!1)},0);return()=>{window.clearTimeout(u)}},[E,j]);const Sn=n.useRef(null),Oe=n.useRef(null),Je=n.useRef(!1),mt=n.useRef(!1),Qe=n.useRef(!1),pt=n.useRef({x:0,y:0}),Be=n.useRef({x:0,y:0}),Ze=60,et=n.useCallback((i,u)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:i,z:u}}))},[]),tt=n.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]);n.useEffect(()=>{if(!I)return;const i=p=>{p.code==="Space"&&(p.preventDefault(),p.stopPropagation(),p.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},u=p=>{p.code==="Space"&&(i(p),p.repeat||tt())};return window.addEventListener("keydown",u,!0),window.addEventListener("keyup",i,!0),()=>{window.removeEventListener("keydown",u,!0),window.removeEventListener("keyup",i,!0)}},[I,tt]);const _n=n.useCallback(i=>{if(!I)return;Je.current=!0,i.currentTarget.setPointerCapture(i.pointerId);const u=i.currentTarget.getBoundingClientRect();Be.current={x:u.left+u.width/2,y:u.top+u.height/2},pt.current={x:i.clientX,y:i.clientY},Qe.current=!1,mt.current=Math.hypot(i.clientX-Be.current.x,i.clientY-Be.current.y)<=34},[I]),Nn=n.useCallback(i=>{if(!Je.current||!Oe.current)return;const u=i.clientX-Be.current.x,p=i.clientY-Be.current.y;Math.hypot(i.clientX-pt.current.x,i.clientY-pt.current.y)>8&&(Qe.current=!0);const P=Math.hypot(u,p),be=P>Ze?Ze:P,At=u/(P||1)*be,Ot=p/(P||1)*be;Oe.current.style.transform=`translate(${At}px, ${Ot}px)`;const Rn=At/Ze,Cn=-Ot/Ze;et(Rn,Cn)},[et]),Ct=n.useCallback(i=>{Je.current&&(Je.current=!1,i.currentTarget.hasPointerCapture(i.pointerId)&&i.currentTarget.releasePointerCapture(i.pointerId),Oe.current&&(Oe.current.style.transform="translate(0px, 0px)"),et(0,0),i.type!=="pointercancel"&&mt.current&&!Qe.current&&tt(),mt.current=!1,Qe.current=!1)},[et,tt]),Tn=n.useCallback(i=>!!(k&&k!=="search"&&g[k]?.some(u=>u.id===i.id)||k==="search"&&x&&Ye.some(u=>u.id===i.id)),[k,g,Ye,x]),ft=Q&&E==="intro"?M||se?"is-leaving":ie?pe?"is-visible":"is-entering":"is-outside":"is-outside",It=(E==="main"||E==="list")&&M?"is-leaving":ie?Ce?"is-visible":"is-entering":"is-outside",nt=E==="main"||E==="list"?It:"is-outside",ht=E==="list"?"-15vh":ee||K?"-42px":"0px",Ne=D.length+3,at=i=>({animate:{y:E==="main"||E==="list"?ht:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:i*.025}}),Me=(i,u=Ne)=>{const p=i*.055,P=Math.max(0,u-1-i)*.035,be={scale:0,opacity:0,filter:"blur(8px)",y:ht};return{initial:be,animate:M?{...be,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:P},opacity:{duration:.16,delay:P},filter:{duration:.2,delay:P},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:P}}}:{scale:1,opacity:1,filter:"blur(0px)",y:ht},exit:{...be,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:P},opacity:{duration:.16,delay:P},filter:{duration:.2,delay:P},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:P}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:p},opacity:{duration:.2,delay:p},filter:{duration:.25,delay:p},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:i*.025}}}};return ae?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:as}),ue?e.jsx(za,{onComplete:ye}):e.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${s?"is-returning-from-book":f?"is-entered":"is-entering"}`,children:[e.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:dt?0:1},children:[e.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${Q&&E==="intro"?"":"pointer-events-none"} ${I?"opacity-0 pointer-events-none":"opacity-100"}`,children:[e.jsxs("p",{className:`intro-elastic-item ${ft} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:Rt,children:["Hello,",e.jsx("br",{}),"My name is Gabriel Dell'Aiuto",e.jsx("br",{})]}),e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("button",{onClick:kn,disabled:!pe||se,className:`intro-elastic-item item-start ${ft} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`,children:e.jsx("span",{className:"animate-bounce",children:"START"})}),c&&e.jsx("button",{type:"button",onClick:jn,disabled:!pe||M,className:`intro-elastic-item item-back ${ft} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`,children:"BACK"})]})]}),e.jsxs("div",{className:"absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl",style:{top:"calc(50% - 24px)"},children:[e.jsxs("div",{className:"flex min-h-12 items-center justify-center gap-5 text-[16px] md:gap-10 md:text-[16px]",children:[e.jsx(ne.div,{...at(0),children:e.jsx("div",{className:`main-control-item item-back ${nt}`,children:e.jsx("button",{onClick:Rt,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:"BACK"})})}),e.jsx(ne.div,{...at(1),children:e.jsx("div",{className:`main-control-item item-archive ${nt}`,children:e.jsx("button",{type:"button",onClick:xn,"aria-expanded":ee,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${ee?"underline underline-offset-4":""} ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:"ARCHIVE"})})}),e.jsx(ne.div,{...at(2),children:e.jsx("div",{className:`main-control-item item-about ${nt}`,children:e.jsx("button",{type:"button",onClick:vn,"aria-expanded":K,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${K?"underline underline-offset-4":""} ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:"ABOUT"})})}),e.jsx(ne.div,{...at(3),children:e.jsx("div",{className:`main-control-item item-play ${nt}`,children:e.jsxs("button",{onClick:i=>{i.currentTarget.blur(),Re(u=>!u)},title:I?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${I?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${I?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),e.jsx("span",{className:`transition-all text-bold whitespace-nowrap ${I?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"PLAY"})]})})})]}),e.jsx(gt,{initial:!1,children:ee&&e.jsxs(ne.div,{initial:!1,className:`mx-auto mt-7 pb-0 text-center leading-[2] transition-opacity duration-500 ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:[e.jsx(ne.div,{...Me(0,Ne),className:"archive-elastic-item item-featured min-h-[32px] text-[14px] md:text-[16px]",children:W?e.jsxs("button",{type:"button",onClick:()=>Tt(`/book/${encodeURIComponent(W.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[e.jsx("span",{className:"shrink-0 text-black/50",children:"FEATURED BOOK"}),e.jsx("span",{className:"truncate",children:W.title})]}):w?e.jsx("span",{className:"text-black/50",children:"LOADING BOOKS..."}):N?e.jsx("button",{type:"button",onClick:()=>void C(),className:"text-black/60 underline underline-offset-4",children:"RETRY BOOK LIST"}):e.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-3 uppercase md:gap-10",children:[e.jsx(ne.div,{...Me(1,Ne),className:"archive-elastic-item item-search",children:e.jsx("button",{onClick:En,className:`z-10 flex items-center text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${k==="search"?"underline":"bg-alpha"}`,children:"search"})}),D.map((i,u)=>e.jsx(ne.div,{...Me(u+2,Ne),className:`archive-elastic-item item-${i.slug}`,children:e.jsx("button",{onClick:()=>{yn(i.slug)},className:`text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${k===i.slug?"underline":"bg-alpha"}`,children:i.name})},i.id))]}),e.jsx(ne.div,{...Me(Ne-1,Ne),className:"archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:e.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${ve?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:e.jsx("input",{type:"text",placeholder:"Search...",value:x,onChange:i=>{U(i.target.value)},className:"w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls")}),e.jsx(gt,{initial:!1,children:K&&e.jsx(ne.div,{initial:!1,className:`mx-auto mt-7 max-w-xl pb-0 text-center leading-[1.55] ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:e.jsxs(ne.div,{...Me(0,2),className:"archive-elastic-item px-2 text-[14px] md:text-[16px]",children:[e.jsx("p",{className:"mb-3 text-[11px] tracking-[0.16em] text-black/50",children:"ABOUT"}),e.jsx("p",{children:ss})]})},"about-panel")})]}),e.jsx("div",{className:`absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] md:text-[16px] ease-in-out ${E==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${I?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:e.jsxs("div",{className:`index-elastic-item item-list ${It}`,children:[e.jsxs("div",{className:"grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] md:text-[16px] font-light",children:[e.jsx("div",{className:"py-[0.5px]",children:"FIELD"}),e.jsx("div",{className:"py-[0.5px]",children:"NAME"})]}),!w&&!N&&m.length===0?e.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):e.jsx("div",{ref:h,className:"overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:e.jsx(gt,{initial:!1,mode:"popLayout",children:wn.map((i,u)=>{const p=Tn(i);return e.jsxs(ne.div,{initial:{scale:0,opacity:0,filter:"blur(7px)"},animate:{scale:1,opacity:1,filter:"blur(0px)"},exit:{scale:0,opacity:0,filter:"blur(7px)"},whileHover:{scale:.97},whileTap:{scale:.95},transition:{scale:{type:"spring",stiffness:430,damping:23,mass:.68,delay:u*.022},opacity:{duration:.18,delay:u*.022},filter:{duration:.22,delay:u*.022}},className:`grid origin-center grid-cols-2 text-[16px] md:text-[16px] backdrop-blur-[1px] cursor-pointer ${p?"text-black":"text-gray-700"}`,onClick:()=>{Tt(i.link)},children:[e.jsx("div",{className:"py-[0.5px] tracking-normal",children:i.category}),e.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[i.name,i.isFeatured?" *":""]})]},`${k??"all"}:${i.id}`)})})})]})})]}),I&&e.jsx("div",{ref:Sn,onPointerDown:_n,onPointerMove:Nn,onPointerUp:Ct,onPointerCancel:Ct,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:e.jsx("div",{ref:Oe,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:e.jsx("span",{"aria-hidden":"true",children:"↑"})})}),(!ie&&(O||s)||M)&&e.jsx("div",{ref:We,className:"reveal-overlay","aria-hidden":"true",children:e.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[e.jsx("defs",{children:e.jsxs("mask",{id:"hole-mask",children:[e.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),e.jsx("circle",{className:`mask-circle ${M?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:M?bn:Ke})]})}),e.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},rs=n.lazy(()=>je(()=>import("./AdminPortal-DPlCiQ-x.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),os=n.lazy(()=>je(()=>import("./Archive-Bmt-CNpv.js"),__vite__mapDeps([8,9,1,2,6,4,5,7]))),cs=n.lazy(()=>je(()=>import("./object01-VEvJrMH6.js"),__vite__mapDeps([10,9,1,2]))),ls=n.lazy(()=>je(()=>import("./Message-BaBT3jUW.js"),__vite__mapDeps([11,1,2,7,4,5,6]))),us=n.lazy(()=>je(()=>import("./NotFound-CNi8HsQ4.js"),__vite__mapDeps([12,1,2]))),ds=n.lazy(()=>je(()=>import("./WatchStudio-uFYb19sC.js"),__vite__mapDeps([13,1,2,4,5,3,7,6]))),ms=new Fn,Kt=()=>{const t=lt();return e.jsx(rs,{onBack:()=>t("/")})},Gt=()=>{const t=lt(),{slug:a}=Wn();return e.jsx(Pa,{initialSlug:a??null,onBack:()=>t("/"),onLogin:()=>t("/login"),onThreeD:()=>t("/3d"),onBookChange:s=>{t(`/book/${encodeURIComponent(s)}`,{replace:!0})}})},ps=()=>{const t=lt();return e.jsx(ds,{onBack:()=>{const a=_t();t(a?`/book/${encodeURIComponent(a.slug)}`:"/books")}})},fs=()=>e.jsx(zn,{client:ms,children:e.jsx(La,{children:e.jsx(ha,{children:e.jsxs("div",{className:"min-h-screen overflow-scroll scrollbar-hide bg-white dark:bg-black",children:[e.jsx(pa,{}),e.jsx(fa,{}),e.jsx(Un,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:e.jsx(n.Suspense,{fallback:e.jsx("div",{className:"fixed inset-0 bg-white"}),children:e.jsxs(Vn,{children:[e.jsx(le,{path:"/",element:e.jsx(is,{})}),e.jsx(le,{path:"/archive",element:e.jsx(os,{})}),e.jsx(le,{path:"/message",element:e.jsx(ls,{})}),e.jsx(le,{path:"/object01",element:e.jsx(cs,{})}),e.jsx(le,{path:"/login",element:e.jsx(Kt,{})}),e.jsx(le,{path:"/admin",element:e.jsx(Kt,{})}),e.jsx(le,{path:"/3d",element:e.jsx(ps,{})}),e.jsx(le,{path:"/books",element:e.jsx(Gt,{})}),e.jsx(le,{path:"/book/:slug",element:e.jsx(Gt,{})}),e.jsx(le,{path:"*",element:e.jsx(us,{})})]})})})]})})})}),qt=sessionStorage.getItem("redirect");qt&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",qt));nn.createRoot(document.getElementById("root")).render(e.jsx(fs,{}));export{Ht as D,ks as M,Es as a,ke as b,Bs as c,Ps as d,Ss as e,_s as f,Ns as g,Ts as h,Rs as i,Is as j,$ as k,Os as l,Cs as m,As as n,la as o,js as p,Ea as s,Ms as u};
