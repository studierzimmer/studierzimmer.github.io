const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-jXiHJKMW.js","assets/vendor-DV02vt9J.js","assets/three-CPy87RPU.js","assets/AdminThreeDModelManager-Dl1m_QMB.js","assets/react-three-CS_Xwiq4.js","assets/postprocessing-Ct1e20Sz.js","assets/motion-BMdt2qQU.js","assets/supabase-wVjNvM5c.js","assets/Archive-Y8yWVWj9.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-D42CH4Ie.js","assets/Message-CmH84buC.js","assets/NotFound-C6WqXkKE.js","assets/WatchStudio-_5srQ4Nq.js"])))=>i.map(i=>d[i]);
import{r as t,ai as vn,aj as yn,j as e,ak as Vt,al as Wt,am as Ht,an as Kt,ao as wn,ap as Gt,aq as Yt,ar as kn,as as jn,at as Sn,au as En,av as qt,aw as Tn,ax as _n,ay as Bt,az as st,ab as Xt,aA as Nn,aB as Rn,aC as Cn,aD as In,aE as se,aF as On}from"./vendor-DV02vt9J.js";import{_ as je,u as Bn,a as it,C as An,S as Pn,b as Mn,W as Ln,c as kt,d as Jt}from"./react-three-CS_Xwiq4.js";import{c as $n}from"./supabase-wVjNvM5c.js";import{V as W,k as Dn,b8 as zn,av as Fn,a8 as Un,P as Vn,M as Wn,aB as Hn,Y as Kn}from"./three-CPy87RPU.js";import{m as fe,A as Gn}from"./motion-BMdt2qQU.js";import"./postprocessing-Ct1e20Sz.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const u of c)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&l(h)}).observe(document,{childList:!0,subtree:!0});function a(c){const u={};return c.integrity&&(u.integrity=c.integrity),c.referrerPolicy&&(u.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?u.credentials="include":c.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function l(c){if(c.ep)return;c.ep=!0;const u=a(c);fetch(c.href,u)}})();const Yn=1,qn=1e6;let gt=0;function Xn(){return gt=(gt+1)%Number.MAX_SAFE_INTEGER,gt.toString()}const bt=new Map,At=n=>{if(bt.has(n))return;const s=setTimeout(()=>{bt.delete(n),$e({type:"REMOVE_TOAST",toastId:n})},qn);bt.set(n,s)},Jn=(n,s)=>{switch(s.type){case"ADD_TOAST":return{...n,toasts:[s.toast,...n.toasts].slice(0,Yn)};case"UPDATE_TOAST":return{...n,toasts:n.toasts.map(a=>a.id===s.toast.id?{...a,...s.toast}:a)};case"DISMISS_TOAST":{const{toastId:a}=s;return a?At(a):n.toasts.forEach(l=>{At(l.id)}),{...n,toasts:n.toasts.map(l=>l.id===a||a===void 0?{...l,open:!1}:l)}}case"REMOVE_TOAST":return s.toastId===void 0?{...n,toasts:[]}:{...n,toasts:n.toasts.filter(a=>a.id!==s.toastId)}}},Qe=[];let Ze={toasts:[]};function $e(n){Ze=Jn(Ze,n),Qe.forEach(s=>{s(Ze)})}function Qn({...n}){const s=Xn(),a=c=>$e({type:"UPDATE_TOAST",toast:{...c,id:s}}),l=()=>$e({type:"DISMISS_TOAST",toastId:s});return $e({type:"ADD_TOAST",toast:{...n,id:s,open:!0,onOpenChange:c=>{c||l()}}}),{id:s,dismiss:l,update:a}}function Zn(){const[n,s]=t.useState(Ze);return t.useEffect(()=>(Qe.push(s),()=>{const a=Qe.indexOf(s);a>-1&&Qe.splice(a,1)}),[n]),{...n,toast:Qn,dismiss:a=>$e({type:"DISMISS_TOAST",toastId:a})}}function Se(...n){return vn(yn(n))}const es=jn,Qt=t.forwardRef(({className:n,...s},a)=>e.jsx(Vt,{ref:a,className:Se("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",n),...s}));Qt.displayName=Vt.displayName;const ts=kn("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),Zt=t.forwardRef(({className:n,variant:s,...a},l)=>e.jsx(Wt,{ref:l,className:Se(ts({variant:s}),n),...a}));Zt.displayName=Wt.displayName;const ns=t.forwardRef(({className:n,...s},a)=>e.jsx(Ht,{ref:a,className:Se("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",n),...s}));ns.displayName=Ht.displayName;const en=t.forwardRef(({className:n,...s},a)=>e.jsx(Kt,{ref:a,className:Se("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",n),"toast-close":"",...s,children:e.jsx(wn,{className:"h-4 w-4"})}));en.displayName=Kt.displayName;const tn=t.forwardRef(({className:n,...s},a)=>e.jsx(Gt,{ref:a,className:Se("text-sm font-semibold",n),...s}));tn.displayName=Gt.displayName;const nn=t.forwardRef(({className:n,...s},a)=>e.jsx(Yt,{ref:a,className:Se("text-sm opacity-90",n),...s}));nn.displayName=Yt.displayName;function ss(){const{toasts:n}=Zn();return e.jsxs(es,{children:[n.map(function({id:s,title:a,description:l,action:c,...u}){return e.jsxs(Zt,{...u,children:[e.jsxs("div",{className:"grid gap-1",children:[a&&e.jsx(tn,{children:a}),l&&e.jsx(nn,{children:l})]}),c,e.jsx(en,{})]},s)}),e.jsx(Qt,{})]})}const is=({...n})=>{const{theme:s="system"}=Sn();return e.jsx(En,{theme:s,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...n})},as=Tn,rs=t.forwardRef(({className:n,sideOffset:s=4,...a},l)=>e.jsx(qt,{ref:l,sideOffset:s,className:Se("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",n),...a}));rs.displayName=qt.displayName;const os="https://pmpspnvfgkzprgntihtx.supabase.co",ls="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",De="book-pages",ii="models-3d",z=$n(os,ls,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),cs=50*1024*1024;function H(n,s){return n instanceof Error?n:typeof n=="object"&&n&&"message"in n?new Error(String(n.message)):new Error(s)}function us(n){const{data:s}=z.storage.from(De).getPublicUrl(n);return s.publicUrl}function ds(n){return{...n,public_url:us(n.storage_path)}}function ms(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function ps(n){if(n.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const s of n){const a=s.name.toLowerCase(),l=a.endsWith(".jpg")||a.endsWith(".jpeg"),c=s.type==="image/jpeg"||s.type==="";if(!l||!c)throw new Error(`${s.name} is not a JPG/JPEG image.`);if(s.size>cs)throw new Error(`${s.name} is larger than 50 MB.`)}}function fs(n){return n.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function ai(){const{data:n,error:s}=await z.rpc("is_admin");if(s)throw H(s,"Unable to verify administrator access.");return n===!0}async function sn(){const{data:n,error:s}=await z.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(s)throw H(s,"Unable to load books.");return n??[]}async function ri(){const{data:n,error:s}=await z.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(s)throw H(s,"Unable to load the admin book list.");return n??[]}async function ke(n){const{data:s,error:a}=await z.from("book_pages").select("*").eq("book_id",n).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(a)throw H(a,"Unable to load the book pages.");return(s??[]).map(ds)}async function oi(n){const s=fs(n.slug);if(!s)throw new Error("The book needs a valid slug.");const{data:a,error:l}=await z.from("books").insert({title:n.title.trim(),slug:s,storage_folder:s,category:n.category,description:n.description?.trim()??"",is_published:n.is_published??!1,is_featured:!1,sort_order:n.sort_order??0}).select("*").single();if(l)throw H(l,"Unable to create the book.");return a}async function li(n,s){const{data:a,error:l}=await z.from("books").update(s).eq("id",n).select("*").single();if(l)throw H(l,"Unable to save the book.");return a}async function ci(n){const{error:s}=await z.rpc("set_featured_book",{p_book_id:n});if(s)throw H(s,"Unable to set the featured book.")}async function ui(n,s,a){const l=[...s].sort((v,p)=>v.name.localeCompare(p.name,void 0,{numeric:!0,sensitivity:"base"}));ps(l);let u=(await ke(n.id)).reduce((v,p)=>Math.max(v,p.page_number),0)+1,h=0;for(const v of l){const p=`${n.storage_folder}/${String(u).padStart(4,"0")}-${ms()}.jpg`,{error:E}=await z.storage.from(De).upload(p,v,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(E)throw H(E,`Unable to upload ${v.name}.`);const{error:_}=await z.from("book_pages").insert({book_id:n.id,storage_path:p,file_name:v.name,page_number:u});if(_)throw await z.storage.from(De).remove([p]),H(_,`Unable to register ${v.name}.`);u+=1,h+=1,a?.(h,l.length)}return ke(n.id)}async function gs(n){const a=(await ke(n)).map((u,h)=>({page:u,nextNumber:h+1})).filter(({page:u,nextNumber:h})=>u.page_number!==h).map(({page:u,nextNumber:h})=>z.from("book_pages").update({page_number:h}).eq("id",u.id)),c=(await Promise.all(a)).find(u=>u.error);if(c?.error)throw H(c.error,"Unable to renumber the pages.")}async function di(n){const{error:s}=await z.storage.from(De).remove([n.storage_path]);if(s)throw H(s,"Unable to delete the image from Storage.");const{error:a}=await z.from("book_pages").delete().eq("id",n.id);if(a)throw H(a,"The image was removed, but its database row remains.");await gs(n.book_id)}async function mi(n,s,a){const l=s+a;if(s<0||l<0||l>=n.length)return n;const c=n[s],u=n[l],{error:h}=await z.rpc("swap_book_pages",{p_first_page_id:c.id,p_second_page_id:u.id});if(h)throw H(h,"Unable to reorder the pages.");return ke(c.book_id)}async function pi(n){const a=(await ke(n.id)).map(c=>c.storage_path);if(a.length>0){const{error:c}=await z.storage.from(De).remove(a);if(c)throw H(c,"Unable to delete this book's image folder.")}const{error:l}=await z.from("books").delete().eq("id",n.id);if(l)throw H(l,"Unable to delete the book record.")}const bs={a4_long_edge:{width:480,height:679,minWidth:160,maxWidth:600,minHeight:226,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:190,maxWidth:680,minHeight:134,maxHeight:481},square:{width:560,height:560,minWidth:180,maxWidth:620,minHeight:180,maxHeight:620}},hs=t.forwardRef(function({page:s,isCover:a},l){return e.jsx("div",{ref:l,"data-density":a?"hard":"soft",className:"h-full w-full overflow-hidden bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:e.jsx("img",{src:s.public_url,alt:`Page ${s.page_number}: ${s.file_name}`,draggable:!1,className:"h-full w-full select-none object-cover object-center"})})});function xs({book:n,pages:s,initialPage:a=0,bookMotionClassName:l="is-visible",onPageChange:c,onReady:u}){const h=t.useRef(null),v=t.useRef(null),p=n.page_format??"a4_long_edge",E=bs[p],_=Math.min(Math.max(0,Math.floor(a)),Math.max(0,s.length-1)),[B,M]=t.useState(_),[F,N]=t.useState(0),y=t.useCallback(f=>{window.requestAnimationFrame(()=>{const g=f??h.current?.pageFlip();if(!g)return;const k=g.getOrientation(),x=g.getCurrentPageIndex(),U=g.getBoundsRect();if(M(x),c?.(x),k!=="landscape"){N(0);return}if(x===0){N(-(U.pageWidth/2));return}if(x>=s.length-1){N(U.pageWidth/2);return}N(0)})},[c,s.length]);return t.useEffect(()=>{const f=v.current;if(!f)return;const g=()=>{y()},k=new ResizeObserver(g);return k.observe(f),window.addEventListener("resize",g),()=>{k.disconnect(),window.removeEventListener("resize",g)}},[y]),t.useEffect(()=>{M(_),N(0)},[n.id,_]),t.useEffect(()=>{s.length===0&&u?.(n.id)},[n.id,u,s.length]),s.length===0?e.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."}):e.jsxs("div",{className:"flex w-full flex-col items-center",children:[e.jsx("div",{className:`public-book-stage ${l}`,children:e.jsx("div",{ref:v,className:"public-book-viewport flex items-center justify-center overflow-visible px-2",children:e.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${F}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform"},children:e.jsx(_n,{ref:h,className:"mx-auto",style:{margin:"0 auto"},width:E.width,height:E.height,minWidth:E.minWidth,maxWidth:E.maxWidth,minHeight:E.minHeight,maxHeight:E.maxHeight,size:"stretch",startPage:_,drawShadow:!0,flippingTime:850,usePortrait:!0,startZIndex:0,autoSize:!0,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!0,disableFlipByClick:!1,onInit:f=>{M(f.data.page),c?.(f.data.page),y(f.object),u?.(n.id)},onFlip:f=>{M(f.data),c?.(f.data),y(f.object)},onChangeOrientation:f=>{y(f.object)},children:s.map((f,g)=>e.jsx(hs,{page:f,isCover:g===0||g===s.length-1},f.id))},`${n.id}-${p}`)})})}),e.jsx("div",{className:`public-book-meta public-book-title item-title flex items-center gap-8 text-[18px] ${l}`,children:e.jsx("span",{className:"max-w-[60vw] truncate",children:n.title})}),n.description&&e.jsx("div",{className:`public-book-meta public-book-description item-description flex items-center gap-8 text-[18px] ${l}`,children:e.jsx("span",{className:"max-w-[60vw] truncate",children:n.description})})]})}const an="publicBookSession",vt="publicBookReturningToIndex",et="publicBookReturningToIntro";function jt(){if(typeof window>"u")return null;try{const n=window.sessionStorage.getItem(an);if(!n)return null;const s=JSON.parse(n);return typeof s.slug!="string"||s.slug.length===0||typeof s.pageIndex!="number"||!Number.isFinite(s.pageIndex)?null:{slug:s.slug,pageIndex:Math.max(0,Math.floor(s.pageIndex))}}catch{return null}}function Me(n,s){if(typeof window>"u")return;const a={slug:n,pageIndex:Math.max(0,Math.floor(s))};try{window.sessionStorage.setItem(an,JSON.stringify(a))}catch{}}const rn=()=>je(()=>import("./AdminPortal-jXiHJKMW.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),vs=t.lazy(rn),tt=1120,on=180,St=140,Ne=tt+St,ys=on+Ne,nt=920,Pt=120,Mt=nt+St,yt=1180,ws=1800,ks=`
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
  padding-bottom: calc(env(safe-area-inset-bottom) + 0.9rem);
}

.public-book-viewport {
  width: min(96vw, 1400px);
  height: min(74dvh, 850px, calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 13rem));
  min-height: 220px;
}

.public-book-title {
  margin-top: clamp(14px, 4dvh, 5rem);
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
    padding-bottom: calc(env(safe-area-inset-bottom) + 0.55rem);
  }

  .public-book-viewport {
    width: min(94vw, 1400px);
    height: min(66dvh, calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 9.5rem));
    min-height: 190px;
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
    margin-top: 8px;
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
  animation: public-book-background-mix-in ${yt}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${yt}ms cubic-bezier(0.4, 0, 0.2, 1) both;
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
  animation-duration: ${tt}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-meta.is-fast.is-entering,
.public-book-meta.is-fast.is-leaving {
  animation-duration: ${nt}ms;
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
  animation-duration: ${tt}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-stage.is-fast.is-entering,
.public-book-stage.is-fast.is-leaving {
  animation-duration: ${nt}ms;
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
`,js={objects:"OBJ",graphics:"GRPH",concepts:"CNCP"};function ht(n){return n instanceof Error?n.message:"Unable to load the books."}function le(n){return new Promise(s=>{window.setTimeout(s,n)})}function Lt(){return new Promise(n=>{window.requestAnimationFrame(()=>n())})}function Ss(n){const s=a=>Number.isFinite(a)?Math.min(255,Math.max(0,Math.round(a??255))):255;return`rgb(${s(n?.background_r)} ${s(n?.background_g)} ${s(n?.background_b)})`}function Es(n){return new Promise(s=>{const a=new Image;let l=!1;const c=()=>{l||(l=!0,window.clearTimeout(u),s())},u=window.setTimeout(c,5e3);a.onload=()=>{if(typeof a.decode=="function"){a.decode().catch(()=>{}).finally(c);return}c()},a.onerror=c,a.src=n})}async function $t(n){await Promise.all(n.slice(0,2).map(s=>Es(s.public_url)))}function Ts({initialSlug:n,onBack:s,onLogin:a,onThreeD:l,onBookChange:c}){const[u,h]=t.useState([]),[v,p]=t.useState(null),[E,_]=t.useState([]),[B,M]=t.useState(!0),[F,N]=t.useState(!1),[y,f]=t.useState(null),[g,k]=t.useState(!1),[x,U]=t.useState(!1),[K,Q]=t.useState("outside"),[d,T]=t.useState(!1),[w,R]=t.useState("outside"),[ie,V]=t.useState(!1),[L,ce]=t.useState(0),[I,ee]=t.useState(!1),[at,te]=t.useState(!1),j=t.useRef(!0),$=t.useRef(!1),ge=t.useRef(null),q=t.useRef(null),Ee=t.useRef(null),ae=t.useRef(!1),Re=t.useRef(jt()),X=t.useRef(null),be=t.useRef(0),O=t.useRef("rgb(255 255 255)"),ue=t.useRef(null),Z=t.useRef(null),J=t.useRef(null),[he,Ce]=t.useState([{id:0,color:O.current}]),C=t.useMemo(()=>u.find(o=>o.id===v)??null,[u,v]);t.useEffect(()=>{const o=Ss(C);if(o===O.current)return;O.current=o;const b={id:++be.current,color:o};Ce(S=>[S[S.length-1],b]),ue.current&&window.clearTimeout(ue.current),ue.current=window.setTimeout(()=>{Ce(S=>S.slice(-1)),ue.current=null},yt)},[C,C?.background_b,C?.background_g,C?.background_r]);const xe=t.useCallback(o=>{if(Z.current===o)return Promise.resolve();const b=J.current;return b&&b.finish(),new Promise(S=>{let G=!1;const oe=()=>{G||(G=!0,window.clearTimeout(Ue),J.current?.finish===oe&&(J.current=null),S())},Ue=window.setTimeout(oe,ws);J.current={bookId:o,finish:oe,timeout:Ue}})},[]),Ie=t.useCallback(o=>{Z.current=o;const b=J.current;b?.bookId===o&&b.finish()},[]);t.useEffect(()=>{ge.current=v},[v]);const D=t.useCallback(()=>{X.current&&(window.clearTimeout(X.current),X.current=null)},[]),de=t.useCallback((o=!1)=>{D();const b=o?Pt:on,S=o?nt:tt;V(o),R("outside"),X.current=window.setTimeout(()=>{j.current&&(R("entering"),X.current=window.setTimeout(()=>{j.current&&(R("visible"),V(!1),X.current=null)},S+St))},b)},[D]);t.useEffect(()=>{j.current=!0;const o=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{j.current&&T(!0)})});return()=>{j.current=!1,window.cancelAnimationFrame(o),X.current&&window.clearTimeout(X.current),ue.current&&window.clearTimeout(ue.current),J.current&&(window.clearTimeout(J.current.timeout),J.current.finish())}},[]),t.useEffect(()=>{let o=!0;return(async()=>{M(!0),f(null);try{const S=await sn();if(!o)return;h(S)}catch(S){o&&f(ht(S))}finally{o&&M(!1)}})(),()=>{o=!1}},[]);const Te=t.useCallback(async o=>{if(!ae.current){ae.current=!0,N(!0),f(null);try{const b=await ke(o.id);if(await $t(b),!j.current)return;const S=Re.current,G=S?.slug===o.slug?Math.min(S.pageIndex,Math.max(0,b.length-1)):0;Z.current=null;const oe=xe(o.id);if(Bt.flushSync(()=>{V(!1),R("outside"),p(o.id),_(b),ce(G)}),Me(o.slug,G),N(!1),await oe,!j.current)return;de()}catch(b){j.current&&(f(ht(b)),N(!1))}finally{ae.current=!1}}},[de,xe]),me=t.useCallback(async(o,b)=>{if(j.current){if($.current){q.current={book:o,updateRoute:b},k(!1);return}if(ge.current===o.id){k(!1);return}$.current=!0,ee(!0),N(!0),k(!1),f(null);try{const S=await ke(o.id);if(!j.current||(await $t(S),!j.current)||(D(),V(!0),R("leaving"),await le(Mt),!j.current))return;Z.current=null;const G=xe(o.id);if(Bt.flushSync(()=>{V(!0),R("outside"),p(o.id),ge.current=o.id,_(S),ce(0),N(!1)}),Re.current={slug:o.slug,pageIndex:0},Me(o.slug,0),b&&c?.(o.slug),await Lt(),await Lt(),await G,await le(Pt),!j.current)return;R("entering"),await le(Mt),j.current&&(R("visible"),V(!1))}catch(S){j.current&&(f(ht(S)),N(!1),V(!1),R("visible"))}finally{if($.current=!1,j.current){ee(!1);const S=q.current;q.current=null,S&&S.book.id!==ge.current&&window.setTimeout(()=>{Ee.current?.(S.book,S.updateRoute)},24)}}}},[D,c,xe]);t.useEffect(()=>{Ee.current=(o,b)=>{me(o,b)}},[me]),t.useEffect(()=>{if(B||u.length===0)return;const o=n?u.find(b=>b.slug===n):null;if(!v){const b=u.find(G=>G.is_featured),S=o??b??u[0];Te(S);return}o&&o.id!==v&&!$.current&&me(o,!1)},[u,n,Te,B,v,me]);const ve=t.useCallback(async()=>{!x||$.current||($.current=!0,ee(!0),Q("leaving"),await le(Ne),j.current&&(U(!1),Q("outside"),de(),await le(ys),$.current=!1,j.current&&ee(!1)))},[x,de]);t.useEffect(()=>{const o=b=>{if(b.key==="Escape"){if(x){ve();return}k(!1)}};return window.addEventListener("keydown",o),()=>{window.removeEventListener("keydown",o)}},[ve,x]);const ze=async()=>{if(!$.current){if(k(!1),x){await ve();return}$.current=!0,ee(!0),rn(),!(C&&(D(),R("leaving"),await le(Ne),!j.current))&&(U(!0),Q("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{j.current&&Q("entering")})}),await le(Ne),$.current=!1,j.current&&(Q("visible"),ee(!1)))}},ye=async()=>{if(x){await ve();return}$.current||($.current=!0,ee(!0),k(!1),T(!1),D(),R("leaving"),C&&Me(C.slug,L),window.sessionStorage.setItem(vt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.getItem("returnFromExample")!=="true"?window.sessionStorage.setItem(et,"true"):window.sessionStorage.removeItem(et),await le(Ne),j.current&&s())},re=async()=>{$.current||x||($.current=!0,ee(!0),te(!0),k(!1),T(!1),D(),R("leaving"),C&&Me(C.slug,L),await le(Ne),j.current&&l())},Fe=o=>{me(o,!0)},Oe=t.useCallback(o=>{ce(o),C&&(Re.current={slug:C.slug,pageIndex:o},Me(C.slug,o))},[C]),rt=`${w==="entering"?"is-entering":w==="visible"?"is-visible":w==="leaving"?"is-leaving":"is-outside"}${ie?" is-fast":""}`,_e=K==="entering"?"is-entering":K==="visible"?"is-visible":K==="leaving"?"is-leaving":"is-outside",we=d?"is-visible":I||at?"is-leaving":"is-outside";return e.jsxs("div",{className:"public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:he[0]?.color??"rgb(255 255 255)"},children:[e.jsx("style",{children:ks}),e.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:he.map((o,b)=>e.jsx("div",{className:`public-book-background-layer ${b===he.length-1?"is-current":"is-previous"}`,style:{backgroundColor:o.color}},o.id))}),g&&!x&&e.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-transparent",onClick:()=>k(!1)}),e.jsxs("div",{className:"public-book-nav fixed z-[170] flex items-center",children:[e.jsx("div",{className:`public-nav-item ${we}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:e.jsx("button",{type:"button",onClick:()=>void ye(),disabled:I,className:"public-book-nav-icon flex items-center justify-center rounded-full border border-black/35 bg-transparent transition-transform duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40","aria-label":x?"Back to book":"Back",title:x?"Back to book":"Back",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",className:"h-5 w-5","aria-hidden":"true",children:[e.jsx("path",{d:"M19 12H5"}),e.jsx("path",{d:"m11 18-6-6 6-6"})]})})}),e.jsx("div",{className:`public-nav-item ${we}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:e.jsx("button",{type:"button",onClick:()=>k(o=>!o),disabled:x,className:`public-book-nav-icon flex items-center justify-center rounded-full border bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${g?"border-black text-black":"border-black/35 text-black"}`,"aria-label":"Choose a book","aria-expanded":g,"aria-controls":"public-book-balloon",title:"Choose a book",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",className:"h-5 w-5","aria-hidden":"true",children:[e.jsx("path",{d:"M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"}),e.jsx("path",{d:"M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"})]})})}),e.jsx("div",{className:`public-nav-item ${we}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:e.jsx("button",{type:"button",onClick:()=>void ze(),disabled:I,className:`public-book-nav-text flex items-center justify-center rounded-full border bg-transparent text-[13px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${x?"border-black text-black":"border-black/35 text-black"}`,"aria-expanded":x,children:"LOGIN"})}),e.jsx("div",{className:`public-nav-item ${we}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:e.jsx("button",{type:"button",onClick:()=>void re(),disabled:I||x,className:"public-book-nav-text flex items-center justify-center rounded-full border border-black/35 bg-transparent text-[13px] text-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40",children:"3D"})})]}),e.jsxs("aside",{id:"public-book-balloon",className:`public-book-balloon fixed left-4 top-[76px] z-[150] flex max-h-[72vh] w-[min(88vw,390px)] origin-top-left flex-col rounded-[34px] border border-black/25 bg-white/95 p-5 shadow-[0_18px_65px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] sm:left-[74px] sm:top-[82px] ${g&&!x?"pointer-events-auto scale-100 opacity-100 blur-0":"pointer-events-none scale-0 opacity-0 blur-[10px]"}`,"aria-hidden":!g||x,children:[e.jsx("div",{className:"absolute -top-2 left-[46px] h-4 w-4 rotate-45 border-l border-t border-black/25 bg-white"}),e.jsxs("div",{className:"relative mb-4 flex items-start justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[12px] tracking-[0.18em] text-black/45",children:"LIBRARY"}),e.jsx("h1",{className:"mt-1 text-[22px] font-light",children:"CHOOSE A BOOK"})]}),e.jsx("button",{type:"button",onClick:()=>k(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95","aria-label":"Close book list",children:e.jsx("span",{"aria-hidden":"true",children:"×"})})]}),e.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto border-t border-black/15",children:B?e.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"LOADING..."}):u.length===0?e.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):u.map(o=>{const b=o.id===v;return e.jsxs("button",{type:"button",onClick:()=>Fe(o),className:`grid w-full grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-all duration-300 ${b?"translate-x-1 text-black":"text-black/60 hover:translate-x-1 hover:text-black"}`,children:[e.jsx("span",{className:"text-[12px] tracking-wide",children:js[o.category]}),e.jsxs("span",{className:"min-w-0",children:[e.jsx("span",{className:"block truncate text-[16px]",children:o.title}),o.description&&e.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/45",children:o.description})]}),e.jsx("span",{className:"flex min-w-[18px] justify-end text-[13px]",children:o.is_featured?"*":b?">":""})]},o.id)})}),e.jsx("p",{className:"relative mt-3 text-[11px] text-black/40",children:"* Featured"})]}),e.jsx("div",{className:"public-book-label-wrap pointer-events-none fixed inset-x-0 top-5 z-[100] flex justify-center px-[230px] sm:top-7",children:C&&e.jsx("p",{className:`public-book-label max-w-full truncate text-center text-[13px] tracking-[0.12em] text-black/55 ${we}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:C.is_featured?"FEATURED - ":""})}),e.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden px-2 sm:px-5",children:B||F&&!C?e.jsx("div",{className:`public-route-message ${d?"is-visible":"is-outside"}`,children:"LOADING..."}):y?e.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${d?"is-visible":"is-outside"}`,children:y}):u.length===0?e.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${d?"is-visible":"is-outside"}`,children:"No books are public yet."}):C?e.jsx("div",{className:"h-full w-full",children:e.jsx("div",{className:`flex h-full w-full items-center justify-center transition-[transform,opacity,filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${x?"scale-[0.94] opacity-25 blur-[9px]":"scale-100 opacity-100 blur-0"}`,children:e.jsx(xs,{book:C,pages:E,initialPage:L,bookMotionClassName:rt,onPageChange:Oe,onReady:Ie},C.id)})}):null}),x&&e.jsx("div",{className:`public-login-stage fixed inset-0 z-[130] overflow-hidden bg-white ${_e}`,"aria-hidden":K==="outside"||K==="leaving",children:e.jsx(t.Suspense,{fallback:null,children:e.jsx(vs,{embedded:!0,surfaceReady:K==="entering"||K==="visible",onBack:()=>void ve()})})})]})}const ln=t.createContext(void 0),_s=({children:n})=>{const[s,a]=t.useState(!1),l=()=>{a(!s)};return t.useEffect(()=>{s?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[s]),e.jsx(ln.Provider,{value:{isDark:s,toggleTheme:l},children:n})},fi=()=>{const n=t.useContext(ln);if(n===void 0)throw new Error("useTheme must be used within a ThemeProvider");return n},Dt="/assets/WolfyLight-Bs10J6iU.gif",Ns=100,Rs=500,Cs=14e3,xt=400,Is=({onComplete:n})=>{const[s,a]=t.useState(!1),[l,c]=t.useState(!1),[u,h]=t.useState(!1),[v,p]=t.useState(!1),[E,_]=t.useState({}),[B,M]=t.useState(0),[F,N]=t.useState(!0),y=t.useRef({}),f=t.useRef(null),g=t.useRef(!1),k=t.useRef(!1),{progress:x}=Bn();t.useEffect(()=>{let d;const T=()=>{M(w=>{const R=x-w,ie=Math.max(R*.1,R>0?.5:-.5),V=Math.abs(R)<.5?x:w+ie;return V>=100&&setTimeout(()=>N(!1),500),Math.min(100,Math.max(0,V))}),d=requestAnimationFrame(T)};return d=requestAnimationFrame(T),()=>cancelAnimationFrame(d)},[x]),t.useEffect(()=>{const d=window.matchMedia("(prefers-reduced-motion: reduce)");k.current=d.matches;const T=()=>k.current=d.matches;return d.addEventListener?.("change",T),()=>d.removeEventListener?.("change",T)},[]),t.useEffect(()=>{const d=new Image;d.src=Dt;const T=()=>_({w:d.naturalWidth||400,h:d.naturalHeight||400});d.decode?.().then(()=>{T(),a(!0)}).catch(()=>{d.onload=()=>{T(),a(!0)}})},[]);const U=t.useCallback(()=>{if(g.current)return;if(k.current){g.current=!0,n();return}p(!0);const d=f.current;let T=!1;const w=()=>{T||(T=!0,g.current=!0,n())};if(d){const R=()=>{d.removeEventListener("animationend",R),y.current.fallback&&clearTimeout(y.current.fallback),w()};d.addEventListener("animationend",R,{once:!0}),y.current.fallback=window.setTimeout(w,xt+120)}else y.current.fallback=window.setTimeout(w,xt+50)},[n]);t.useEffect(()=>{if(!s)return;const d=y.current;return k.current?(c(!0),h(!0),d.auto=window.setTimeout(()=>U(),800)):(d.entry=window.setTimeout(()=>c(!0),Ns),d.allowExit=window.setTimeout(()=>h(!0),Rs),d.auto=window.setTimeout(()=>U(),Cs)),()=>{Object.values(d).forEach(T=>T&&clearTimeout(T))}},[s,U]);const K=()=>{(u||k.current)&&U()},Q=l?v?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return e.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${g.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:K,children:[e.jsxs("div",{className:`relative ${Q}`,ref:f,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[e.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),e.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),e.jsx("img",{src:Dt,alt:"Loading wolf",width:E.w||800,height:E.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),F&&e.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${B>=100?"opacity-0":"opacity-100"}`,children:[Math.round(B),"%"]}),e.jsx("style",{children:`
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
        .animate-elastic-shrink { transform-origin: 50% 50%; animation: elastic-shrink ${xt}ms ease-in forwards; }
      `})]})},Y={};typeof window<"u"&&(window.addEventListener("keydown",n=>Y[n.key.toLowerCase()]=!0),window.addEventListener("keyup",n=>Y[n.key.toLowerCase()]=!1));const cn={current:null},Le={center:new W(0,0,-300),radius:60},wt=15,Os=38,Bs=95;function As(n,s,a){let l=s-n;for(;l<-Math.PI;)l+=Math.PI*2;for(;l>Math.PI;)l-=Math.PI*2;return n+l*a}function Ps(){const n=t.useRef(null),s=Mn(Fn,"/waternormals.jpeg");s.wrapS=s.wrapT=Un;const a=t.useMemo(()=>new Vn(1e4,1e4),[]),l=t.useMemo(()=>{const c=new W(500,150,-1e3).normalize();return new Ln(a,{textureWidth:512,textureHeight:512,waterNormals:s,sunDirection:c,sunColor:16773836,waterColor:666218,distortionScale:10.7,fog:!1})},[a,s]);return l.material.uniforms.waterColor.value.convertSRGBToLinear(),kt((c,u)=>{n.current&&(n.current.material.uniforms.time.value+=u)}),e.jsx("primitive",{object:l,ref:n,"rotation-x":-Math.PI/2})}function Ms(){const{scene:n}=it("/island.gltf");return e.jsx("primitive",{object:n,scale:100,position:[0,-5,-300]})}function Ls(){const n=t.useRef(null),{camera:s}=Jt(),{scene:a}=it("/wolfy.glb");t.useEffect(()=>{a.traverse(p=>{p instanceof Wn&&p.material instanceof Hn&&(p.material=p.material.clone(),p.material.roughness=.2,p.material.metalness=.1,p.material.envMapIntensity=1.2)})},[a]);const l=t.useRef(new W),c=t.useRef(new W),u=t.useRef(0),h=t.useRef(!0),v=t.useRef(new W(0,0,1));return t.useEffect(()=>{cn.current=n.current;const p=_=>{const{x:B,z:M}=_.detail;l.current.set(B,0,M)},E=()=>{h.current&&(h.current=!1,u.current=Os)};return window.addEventListener("explore-joystick",p),window.addEventListener("explore-jump",E),()=>{window.removeEventListener("explore-joystick",p),window.removeEventListener("explore-jump",E)}},[]),kt((p,E)=>{if(!n.current)return;const _=new W(l.current.x+(Y.arrowright||Y.d?1:0)-(Y.arrowleft||Y.a?1:0),0,l.current.z+(Y.arrowup||Y.w?1:0)-(Y.arrowdown||Y.s?1:0));_.lengthSq()<.01&&_.set(0,0,0);const B=new W;s.getWorldDirection(B),B.y=0,B.normalize();const M=new W().crossVectors(B,new W(0,1,0)).normalize(),F=new W().addScaledVector(B,_.z).addScaledVector(M,_.x);F.lengthSq()>1e-4&&F.normalize(),c.current.lerp(F.multiplyScalar(100),E*6);const y=n.current.position.clone().addScaledVector(c.current,E);u.current-=Bs*Math.min(E,.05),y.y+=u.current*Math.min(E,.05),y.y<=wt&&(y.y=wt,u.current=0,h.current=!0);const f=y.distanceTo(Le.center),g=2;if(f<Le.radius+g){const k=y.clone().sub(Le.center).normalize();y.copy(Le.center.clone().add(k.multiplyScalar(Le.radius+g))),c.current.multiplyScalar(.2)}if(n.current.position.copy(y),_.lengthSq()>.01){const k=F.clone();_.z<-.2&&k.copy(B),v.current.lerp(k,.15).normalize();const x=Math.atan2(v.current.x,v.current.z);n.current.rotation.y=As(n.current.rotation.y,x,.15)}n.current.userData.joyX=l.current.x}),e.jsx("primitive",{ref:n,object:a,scale:10,position:[0,15,0],rotation:[0,Math.PI,0]})}function $s(){const{camera:n}=Jt(),s=t.useRef(0),a=t.useRef(0),l=t.useRef(!1);return t.useEffect(()=>{const c=u=>{l.current=u.detail.enabled};return window.addEventListener("explore-mode",c),()=>window.removeEventListener("explore-mode",c)},[]),kt((c,u)=>{const h=cn.current;if(!h)return;const v=h.userData||{};a.current+=u*(l.current?1:-1),a.current=Kn.clamp(a.current,0,1);const p=a.current,E=p*p*(3-2*p),_=(Y.arrowright||Y.d?1:0)-(Y.arrowleft||Y.a?1:0),B=v.joyX??0,M=_+B;Math.abs(M)>.05&&(s.current-=M*u*2.5);const F=new W(0,22,70);F.applyAxisAngle(new W(0,1,0),s.current);const N=h.position.clone();N.y=wt;const y=N.add(F),f=new W(0,20,100),g=new W(Math.sin(p*Math.PI)*20,0,0),x=f.clone().add(g).lerp(y,E);n.position.lerp(x,.12);const U=new W(0,5,0),K=h.position.clone();K.y+=6;const Q=U.lerp(K,E);n.lookAt(Q)}),null}function Ds(){return e.jsxs(An,{camera:{position:[0,20,100],fov:55},gl:{antialias:!0,toneMapping:zn,toneMappingExposure:.8,outputColorSpace:Dn},children:[e.jsx("color",{attach:"background",args:["#0b1e3a"]}),e.jsx("directionalLight",{position:[500,200,-300],intensity:1,color:"#fff4d6"}),e.jsx("ambientLight",{intensity:.35}),e.jsxs(t.Suspense,{fallback:null,children:[e.jsx(Ps,{}),e.jsx(Ms,{}),e.jsx(Ls,{})]}),e.jsx($s,{}),e.jsx(Pn,{distance:1e3,sunPosition:[500,200,-300],turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})]})}it.preload("/wolfy.glb");it.preload("/island.gltf");const zs=`
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
.main-control-item.item-play { animation-delay: 180ms; }

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
`,P={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode"},Fs={objects:"OBJ",graphics:"GRPH",concepts:"CNCP"},Us=()=>{const n=st(),a=t.useRef(sessionStorage.getItem(vt)==="true"||sessionStorage.getItem(et)==="true"||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,c=t.useRef(a&&sessionStorage.getItem(P.returnFlag)==="true").current,[u]=t.useState(()=>jt()),[h,v]=t.useState(a),[p,E]=t.useState([]),[_,B]=t.useState(!0),[M,F]=t.useState(null),N=t.useCallback(async()=>{B(!0);try{const i=await sn();E(i),F(null)}catch(i){console.error("Unable to load published books",i),F(i instanceof Error?i.message:"Unable to load the published books.")}finally{B(!1)}},[]);t.useEffect(()=>{N();const i=()=>{N()},r=()=>{document.visibilityState==="visible"&&N()};return window.addEventListener("focus",i),document.addEventListener("visibilitychange",r),()=>{window.removeEventListener("focus",i),document.removeEventListener("visibilitychange",r)}},[N]);const y=t.useMemo(()=>p.find(i=>i.is_featured)??p[0]??null,[p]),f=t.useMemo(()=>{const i=r=>({id:r.id,category:Fs[r.category],name:r.title,link:`/book/${encodeURIComponent(r.slug)}`,isFeatured:r.is_featured});return{objects:p.filter(r=>r.category==="objects").map(i),graphics:p.filter(r=>r.category==="graphics").map(i),concepts:p.filter(r=>r.category==="concepts").map(i)}},[p]),g=t.useMemo(()=>Object.values(f).flat(),[f]);t.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const i="__GLOBAL_SKY_OCEAN_BG_ROOT__",r=window;if(r[i])return;const m=document.createElement("div");m.id="global-sky-ocean-bg",Object.assign(m.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(m);const A=Xt.createRoot(m);A.render(e.jsx(t.Suspense,{fallback:null,children:e.jsx(Ds,{})})),r[i]=A},[]);const k=sessionStorage.getItem(P.stage)||"intro",x=sessionStorage.getItem(P.activeButton)||null,U=sessionStorage.getItem(P.searchOpen)==="true",K=sessionStorage.getItem(P.searchQuery)||"",Q=sessionStorage.getItem(P.exploreMode)==="true",[d,T]=t.useState(k),[w,R]=t.useState(x),[ie,V]=t.useState(U),[L,ce]=t.useState(K),[I,ee]=t.useState(Q),at=k==="list"||!!x||U,[te,j]=t.useState(at),[$,ge]=t.useState(!1),[q,Ee]=t.useState(!1),[ae,Re]=t.useState(!1);t.useEffect(()=>{if(!ae||$)return;if(a){v(!0);return}v(!1);let i=0;const r=window.requestAnimationFrame(()=>{i=window.requestAnimationFrame(()=>{v(!0)})});return()=>{window.cancelAnimationFrame(r),window.cancelAnimationFrame(i)}},[ae,a,$]);const[X,be]=t.useState(!1),[O,ue]=t.useState(!1),[Z,J]=t.useState(!1),[he,Ce]=t.useState(!1),[C,xe]=t.useState(!c),Ie=t.useRef(null),[D,de]=t.useState(()=>{try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),Te=t.useRef(null),me=t.useRef(null);t.useEffect(()=>()=>{Ie.current&&window.clearTimeout(Ie.current)},[]),t.useEffect(()=>{if(!q||d!=="intro"||Z||O||!D)return;const i=window.setTimeout(()=>{Ce(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(i)}},[Z,q,O,D,d]),t.useEffect(()=>{if(d!=="main"&&d!=="list"||O||!D||C)return;const i=window.setTimeout(()=>{xe(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(i)}},[C,O,D,d]);const[ve,ze]=t.useState(!1),ye=t.useRef(null),re=t.useRef(null),[Fe,Oe]=t.useState(!1);t.useEffect(()=>{if(!a)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem(vt),sessionStorage.removeItem(et),sessionStorage.removeItem("revealDone"),de(!1),be(!1),document.documentElement.style.background="",document.body.style.background="";const i=document.getElementById("global-sky-ocean-bg");i&&(i.style.display="block")},[a]),t.useEffect(()=>{try{sessionStorage.setItem(P.exploreMode,String(I))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:I}}));const i=document.getElementById("global-sky-ocean-bg");i&&i.setAttribute("data-explore",I?"1":"0")},[I]),t.useEffect(()=>{sessionStorage.setItem(P.stage,d),sessionStorage.setItem(P.activeButton,w??""),sessionStorage.setItem(P.searchOpen,String(ie)),sessionStorage.setItem(P.searchQuery,L)},[d,w,ie,L]),t.useEffect(()=>{!sessionStorage.getItem(P.splash)&&d==="intro"?ge(!0):Ee(!0),Re(!0)},[d]);const Et=t.useCallback(()=>{sessionStorage.setItem(P.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const i=document.getElementById("global-sky-ocean-bg");i&&(i.style.display="none"),ge(!1),n(y?`/book/${encodeURIComponent(y.slug)}`:"/books")},[y,n]);t.useEffect(()=>{(q||a)&&!D&&!X&&!O&&be(!0)},[q,a,O,D,X]);const rt=t.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}Te.current?(Te.current.classList.add("fade-out"),setTimeout(()=>{be(!1),de(!0)},240)):(be(!1),de(!0))},[]),_e=t.useCallback(i=>{O||(me.current=i,be(!1),ue(!0))},[O]),we=t.useCallback(()=>{const i=me.current;if(!i)return;document.documentElement.style.background="white",document.body.style.background="white";const r=document.getElementById("global-sky-ocean-bg");r&&(r.style.display="none"),n(i)},[n]),o=t.useCallback(()=>{R(null),V(!1),ce(""),T("main")},[]),b=t.useCallback(()=>{j(!1)},[]),S=t.useCallback(()=>{te&&o(),j(i=>!i),window.dispatchEvent(new Event("mousemove"))},[te,o]),G=t.useMemo(()=>g.filter(i=>i.name.toLowerCase().includes(L.toLowerCase())),[g,L]),oe=t.useCallback(()=>{if(w&&w!=="search"&&!L){const i=f[w]||[],r=g.filter(m=>!i.some(A=>A.id===m.id));return[...i,...r]}if(w==="search"&&L){const i=G,r=g.filter(m=>!i.some(A=>A.id===m.id));return[...i,...r]}return g},[w,L,f,g,G]),Ue=oe(),Tt=t.useCallback((i,r)=>{if(i&&i!=="search"&&!r){const m=f[i]||[],A=g.filter(ne=>!m.some(pe=>pe.id===ne.id));return[...m,...A]}if(i==="search"&&r){const m=g.filter(ne=>ne.name.toLowerCase().includes(r.toLowerCase())),A=g.filter(ne=>!m.some(pe=>pe.id===ne.id));return[...m,...A]}return g},[f,g]),[Be,_t]=t.useState(null),[Nt,ot]=t.useState(!1),Ve=t.useCallback((i,r,m)=>{const A=oe(),ne=re.current?re.current.scrollTop:0,pe=Tt(i,r);_t({outgoing:A,incoming:pe,scrollTop:ne}),ot(!1),requestAnimationFrame(()=>{requestAnimationFrame(()=>{ot(!0)})}),m(),window.setTimeout(()=>{_t(null),ot(!1)},350)},[oe,Tt]),un=t.useCallback(i=>{w===i?o():Ve(i,"",()=>{R(i),T("list"),V(!1),ce("")})},[w,o,Ve]),We=t.useCallback(i=>{const r=re.current?re.current.scrollTop:0;sessionStorage.setItem(P.listScroll,String(r));const m={activeButton:w,searchOpen:ie,searchQuery:L,stage:d,introVisible:q,archiveOpen:te};try{sessionStorage.setItem(P.snapshot,JSON.stringify(m))}catch{}sessionStorage.setItem(P.returnFlag,"true"),_e(i)},[w,te,_e,q,ie,L,d]),Rt=t.useCallback(()=>{o(),b(),J(!1),Ce(!1),T("intro")},[b,o]),dn=t.useCallback(()=>{Z||O||(J(!0),xe(!1),b(),Ie.current=window.setTimeout(()=>{T("main"),J(!1)},1160))},[b,Z,O]),mn=t.useCallback(()=>{!u||O||_e(`/book/${encodeURIComponent(u.slug)}`)},[_e,u,O]),pn=t.useCallback(()=>{w==="search"?o():Ve("search",L,()=>{V(!0),T("list"),R("search")})},[w,o,Ve,L]),He=t.useCallback(()=>{ze(!1),ye.current&&clearTimeout(ye.current),ye.current=setTimeout(()=>{ze(!0)},5e3)},[]);t.useEffect(()=>{const i=["mousemove","mousedown","touchstart","touchmove","keydown"];return i.forEach(r=>{window.addEventListener(r,He)}),He(),()=>{i.forEach(r=>{window.removeEventListener(r,He)}),ye.current&&clearTimeout(ye.current)}},[He]),t.useEffect(()=>{if(!ae||!(sessionStorage.getItem(P.returnFlag)==="true"))return;let r=null;try{const m=sessionStorage.getItem(P.snapshot);r=m?JSON.parse(m):null}catch{}if(r){R(r.activeButton??null),V(!!r.searchOpen),ce(r.searchQuery??""),r.archiveOpen||r.stage==="list"?j(!0):j(!1),r.stage&&T(r.stage),Ee(!!r.introVisible),r.stage==="list"&&Oe(!0),sessionStorage.removeItem(P.returnFlag);return}Ee(!0),T("main"),j(!0),window.setTimeout(()=>{T("list"),Oe(!0),sessionStorage.removeItem(P.returnFlag)},700)},[ae]),t.useEffect(()=>{if(d!=="list"||!Fe)return;const i=Number(sessionStorage.getItem(P.listScroll)||"0"),r=window.setTimeout(()=>{re.current&&(re.current.scrollTop=Number.isNaN(i)?0:i),Oe(!1)},0);return()=>{window.clearTimeout(r)}},[d,Fe]);const fn=t.useRef(null),Ae=t.useRef(null),Ke=t.useRef(!1),lt=t.useRef(!1),Ge=t.useRef(!1),ct=t.useRef({x:0,y:0}),Pe=t.useRef({x:0,y:0}),Ye=60,qe=t.useCallback((i,r)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:i,z:r}}))},[]),Xe=t.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]);t.useEffect(()=>{if(!I)return;const i=m=>{m.code==="Space"&&(m.preventDefault(),m.stopPropagation(),m.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},r=m=>{m.code==="Space"&&(i(m),m.repeat||Xe())};return window.addEventListener("keydown",r,!0),window.addEventListener("keyup",i,!0),()=>{window.removeEventListener("keydown",r,!0),window.removeEventListener("keyup",i,!0)}},[I,Xe]);const gn=t.useCallback(i=>{if(!I)return;Ke.current=!0,i.currentTarget.setPointerCapture(i.pointerId);const r=i.currentTarget.getBoundingClientRect();Pe.current={x:r.left+r.width/2,y:r.top+r.height/2},ct.current={x:i.clientX,y:i.clientY},Ge.current=!1,lt.current=Math.hypot(i.clientX-Pe.current.x,i.clientY-Pe.current.y)<=34},[I]),bn=t.useCallback(i=>{if(!Ke.current||!Ae.current)return;const r=i.clientX-Pe.current.x,m=i.clientY-Pe.current.y;Math.hypot(i.clientX-ct.current.x,i.clientY-ct.current.y)>8&&(Ge.current=!0);const A=Math.hypot(r,m),ne=A>Ye?Ye:A,pe=r/(A||1)*ne,Ot=m/(A||1)*ne;Ae.current.style.transform=`translate(${pe}px, ${Ot}px)`;const hn=pe/Ye,xn=-Ot/Ye;qe(hn,xn)},[qe]),Ct=t.useCallback(i=>{Ke.current&&(Ke.current=!1,i.currentTarget.hasPointerCapture(i.pointerId)&&i.currentTarget.releasePointerCapture(i.pointerId),Ae.current&&(Ae.current.style.transform="translate(0px, 0px)"),qe(0,0),i.type!=="pointercancel"&&lt.current&&!Ge.current&&Xe(),lt.current=!1,Ge.current=!1)},[qe,Xe]),ut=t.useCallback(i=>!!(w&&w!=="search"&&f[w]?.some(r=>r.id===i.id)||w==="search"&&L&&G.some(r=>r.id===i.id)),[w,f,G,L]),dt=q&&d==="intro"?O||Z?"is-leaving":D?he?"is-visible":"is-entering":"is-outside":"is-outside",It=(d==="main"||d==="list")&&O?"is-leaving":D?C?"is-visible":"is-entering":"is-outside",mt=d==="main"||d==="list"?It:"is-outside",pt=d==="list"?"-15vh":te?"-42px":"0px",ft=i=>({animate:{y:d==="main"||d==="list"?pt:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:i*.025}}),Je=i=>{const r=i*.055,m=(5-i)*.035,A={scale:0,opacity:0,filter:"blur(8px)",y:pt};return{initial:A,animate:O?{...A,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:m},opacity:{duration:.16,delay:m},filter:{duration:.2,delay:m},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:m}}}:{scale:1,opacity:1,filter:"blur(0px)",y:pt},exit:{...A,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:m},opacity:{duration:.16,delay:m},filter:{duration:.2,delay:m},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:m}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:r},opacity:{duration:.2,delay:r},filter:{duration:.25,delay:r},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:i*.025}}}};return ae?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:zs}),$?e.jsx(Is,{onComplete:Et}):e.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${a?"is-returning-from-book":h?"is-entered":"is-entering"}`,children:[e.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:ve?0:1},children:[e.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${q&&d==="intro"?"":"pointer-events-none"} ${I?"opacity-0 pointer-events-none":"opacity-100"}`,children:[e.jsxs("p",{className:`intro-elastic-item ${dt} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:Rt,children:["Hello,",e.jsx("br",{}),"My name is Gabriel Dell'Aiuto",e.jsx("br",{})]}),e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("button",{onClick:dn,disabled:!he||Z,className:`intro-elastic-item item-start ${dt} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`,children:e.jsx("span",{className:"animate-bounce",children:"START"})}),u&&e.jsx("button",{type:"button",onClick:mn,disabled:!he||O,className:`intro-elastic-item item-back ${dt} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`,children:"BACK"})]})]}),e.jsxs("div",{className:"absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl",style:{top:"calc(50% - 24px)"},children:[e.jsxs("div",{className:"flex min-h-12 items-center justify-center gap-5 text-[16px] md:gap-10 md:text-[16px]",children:[e.jsx(fe.div,{...ft(0),children:e.jsx("div",{className:`main-control-item item-back ${mt}`,children:e.jsx("button",{onClick:Rt,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:"BACK"})})}),e.jsx(fe.div,{...ft(1),children:e.jsx("div",{className:`main-control-item item-archive ${mt}`,children:e.jsx("button",{type:"button",onClick:S,"aria-expanded":te,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${te?"underline underline-offset-4":""} ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:"ARCHIVE"})})}),e.jsx(fe.div,{...ft(2),children:e.jsx("div",{className:`main-control-item item-play ${mt}`,children:e.jsxs("button",{onClick:i=>{i.currentTarget.blur(),ee(r=>!r)},title:I?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${I?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${I?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),e.jsx("span",{className:`transition-all text-bold whitespace-nowrap ${I?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"PLAY"})]})})})]}),e.jsx(Gn,{initial:!1,children:te&&e.jsxs(fe.div,{initial:!1,className:`mx-auto mt-7 pb-0 text-center leading-[2] transition-opacity duration-500 ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:[e.jsx(fe.div,{...Je(0),className:"archive-elastic-item item-featured min-h-[32px] text-[14px] md:text-[16px]",children:y?e.jsxs("button",{type:"button",onClick:()=>We(`/book/${encodeURIComponent(y.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[e.jsx("span",{className:"shrink-0 text-black/50",children:"FEATURED BOOK"}),e.jsx("span",{className:"truncate",children:y.title})]}):_?e.jsx("span",{className:"text-black/50",children:"LOADING BOOKS..."}):M?e.jsx("button",{type:"button",onClick:()=>void N(),className:"text-black/60 underline underline-offset-4",children:"RETRY BOOK LIST"}):e.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-3 uppercase md:gap-10",children:[e.jsx(fe.div,{...Je(1),className:"archive-elastic-item item-search",children:e.jsx("button",{onClick:pn,className:`z-10 flex items-center text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${w==="search"?"underline":"bg-alpha"}`,children:"search"})}),["objects","graphics","concepts"].map((i,r)=>e.jsx(fe.div,{...Je(r+2),className:`archive-elastic-item item-${i}`,children:e.jsx("button",{onClick:()=>{un(i)},className:`text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${w===i?"underline":"bg-alpha"}`,children:i})},i))]}),e.jsx(fe.div,{...Je(5),className:"archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:e.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${ie?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:e.jsx("input",{type:"text",placeholder:"Search...",value:L,onChange:i=>{ce(i.target.value)},className:"w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls")})]}),e.jsx("div",{className:`absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] md:text-[16px] ease-in-out ${d==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${I?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:e.jsxs("div",{className:`index-elastic-item item-list ${It}`,children:[e.jsxs("div",{className:"grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] md:text-[16px] font-light",children:[e.jsx("div",{className:"py-[0.5px]",children:"FIELD"}),e.jsx("div",{className:"py-[0.5px]",children:"NAME"})]}),!_&&!M&&g.length===0?e.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):Be?e.jsxs("div",{className:"relative overflow-hidden no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)",height:"calc(30vh - 2rem)"},children:[e.jsx("div",{className:"absolute inset-0 text-[16px] md:text-[16px] overflow-y-auto no-scrollbar transition-transform duration-300 ease-out",style:{transform:Nt?"translateX(100%)":"translateX(0%)"},ref:i=>{i&&(i.scrollTop=Be.scrollTop)},children:Be.outgoing.map(i=>{const r=ut(i);return e.jsxs("div",{className:`grid grid-cols-2 text-[16px] md:text-[16px] cursor-pointer transition-colors duration-300 ${r?"text-black hover:scale-95 active:scale-95 transition-all":"text-gray-700 hover:scale-95 active:scale-95 transition-all"}`,onClick:()=>{We(i.link)},children:[e.jsx("div",{className:"py-[0.5px] tracking-normal",children:i.category}),e.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[i.name,i.isFeatured?" *":""]})]},`out-${i.id}`)})}),e.jsx("div",{className:"absolute inset-0 overflow-y-auto no-scrollbar transition-transform duration-300 ease-in",style:{transform:Nt?"translateX(0%)":"translateX(-100%)"},ref:i=>{i&&(i.scrollTop=Be.scrollTop)},children:Be.incoming.map(i=>{const r=ut(i);return e.jsxs("div",{className:`grid grid-cols-2 text-[16px] md:text-[16px] cursor-pointer transition-all duration-300 ${r?"text-black hover:scale-95 active:scale-95 transition-all":"text-gray-700 hover:scale-95 active:scale-95 transition-all"}`,onClick:()=>{We(i.link)},children:[e.jsx("div",{className:"py-[0.5px] tracking-normal",children:i.category}),e.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[i.name,i.isFeatured?" *":""]})]},`in-${i.id}`)})})]}):e.jsx("div",{ref:re,className:"overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:Ue.map(i=>{const r=ut(i);return e.jsxs("div",{className:`grid grid-cols-2 text-[16px] md:text-[16px] hover:scale-95 active:scale-95 backdrop-blur-[1px] cursor-pointer transition-all duration-300 ${r?"text-black transition-all":"text-gray-700 transition-all"}`,onClick:()=>{We(i.link)},children:[e.jsx("div",{className:"py-[0.5px] tracking-normal",children:i.category}),e.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[i.name,i.isFeatured?" *":""]})]},i.id)})})]})})]}),I&&e.jsx("div",{ref:fn,onPointerDown:gn,onPointerMove:bn,onPointerUp:Ct,onPointerCancel:Ct,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:e.jsx("div",{ref:Ae,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:e.jsx("span",{"aria-hidden":"true",children:"↑"})})}),(!D&&(X||a)||O)&&e.jsx("div",{ref:Te,className:"reveal-overlay","aria-hidden":"true",children:e.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[e.jsx("defs",{children:e.jsxs("mask",{id:"hole-mask",children:[e.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),e.jsx("circle",{className:`mask-circle ${O?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:O?we:rt})]})}),e.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},Vs=t.lazy(()=>je(()=>import("./AdminPortal-jXiHJKMW.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),Ws=t.lazy(()=>je(()=>import("./Archive-Y8yWVWj9.js"),__vite__mapDeps([8,9,1,2,6,4,5,7]))),Hs=t.lazy(()=>je(()=>import("./object01-D42CH4Ie.js"),__vite__mapDeps([10,9,1,2]))),Ks=t.lazy(()=>je(()=>import("./Message-CmH84buC.js"),__vite__mapDeps([11,1,2,7,4,5,6]))),Gs=t.lazy(()=>je(()=>import("./NotFound-C6WqXkKE.js"),__vite__mapDeps([12,1,2]))),Ys=t.lazy(()=>je(()=>import("./WatchStudio-_5srQ4Nq.js"),__vite__mapDeps([13,1,2,4,5,3,7,6]))),qs=new Nn,zt=()=>{const n=st();return e.jsx(Vs,{onBack:()=>n("/")})},Ft=()=>{const n=st(),{slug:s}=On();return e.jsx(Ts,{initialSlug:s??null,onBack:()=>n("/"),onLogin:()=>n("/login"),onThreeD:()=>n("/3d"),onBookChange:a=>{n(`/book/${encodeURIComponent(a)}`,{replace:!0})}})},Xs=()=>{const n=st();return e.jsx(Ys,{onBack:()=>{const s=jt();n(s?`/book/${encodeURIComponent(s.slug)}`:"/books")}})},Js=()=>e.jsx(Rn,{client:qs,children:e.jsx(_s,{children:e.jsx(as,{children:e.jsxs("div",{className:"min-h-screen overflow-scroll scrollbar-hide bg-white dark:bg-black",children:[e.jsx(ss,{}),e.jsx(is,{}),e.jsx(Cn,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:e.jsx(t.Suspense,{fallback:e.jsx("div",{className:"fixed inset-0 bg-white"}),children:e.jsxs(In,{children:[e.jsx(se,{path:"/",element:e.jsx(Us,{})}),e.jsx(se,{path:"/archive",element:e.jsx(Ws,{})}),e.jsx(se,{path:"/message",element:e.jsx(Ks,{})}),e.jsx(se,{path:"/object01",element:e.jsx(Hs,{})}),e.jsx(se,{path:"/login",element:e.jsx(zt,{})}),e.jsx(se,{path:"/admin",element:e.jsx(zt,{})}),e.jsx(se,{path:"/3d",element:e.jsx(Xs,{})}),e.jsx(se,{path:"/books",element:e.jsx(Ft,{})}),e.jsx(se,{path:"/book/:slug",element:e.jsx(Ft,{})}),e.jsx(se,{path:"*",element:e.jsx(Gs,{})})]})})})]})})})}),Ut=sessionStorage.getItem("redirect");Ut&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",Ut));Xt.createRoot(document.getElementById("root")).render(e.jsx(Js,{}));export{ii as M,ke as a,ci as b,oi as c,ui as d,di as e,pi as f,z as g,fi as h,Zn as i,ai as j,ri as l,mi as m,fs as s,li as u};
