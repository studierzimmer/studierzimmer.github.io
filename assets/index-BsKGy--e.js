const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-CjRRyJE3.js","assets/vendor-Dux1OOwi.js","assets/three-BAUrErQW.js","assets/AdminThreeDModelManager-wEXp8CET.js","assets/motion-BKLCL7uv.js","assets/react-three-D_U0l08b.js","assets/postprocessing-DY-RA8W9.js","assets/supabase-C4Th6Poz.js","assets/Archive-DI1iS8a1.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-D53PzqZ0.js","assets/Message-BBi6Tgy5.js","assets/NotFound-u8EXu9YF.js","assets/WatchStudio-Kaq5dKJ7.js"])))=>i.map(i=>d[i]);
import{r as t,ai as xs,aj as vs,j as e,ak as Vt,al as Wt,am as Ht,an as Kt,ao as ys,ap as Gt,aq as qt,ar as ws,as as ks,at as js,au as Ss,av as Yt,aw as Es,ax as Ts,ay as Bt,az as nt,ab as Jt,aA as _s,aB as Ns,aC as Rs,aD as Cs,aE as ne,aF as Is}from"./vendor-Dux1OOwi.js";import{_ as je,u as Os,a as rt,C as Bs,S as As,b as Ps,W as Ms,c as kt,d as Xt}from"./react-three-D_U0l08b.js";import{c as Ls}from"./supabase-C4Th6Poz.js";import{k as $s,b7 as Ds,ah as Fs,aq as zs,P as Us,V as W,M as Vs,av as Ws,aE as Hs}from"./three-BAUrErQW.js";import{m as pe,A as Ks}from"./motion-BKLCL7uv.js";import"./postprocessing-DY-RA8W9.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const u of c)if(u.type==="childList")for(const b of u.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&l(b)}).observe(document,{childList:!0,subtree:!0});function i(c){const u={};return c.integrity&&(u.integrity=c.integrity),c.referrerPolicy&&(u.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?u.credentials="include":c.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function l(c){if(c.ep)return;c.ep=!0;const u=i(c);fetch(c.href,u)}})();const Gs=1,qs=1e6;let gt=0;function Ys(){return gt=(gt+1)%Number.MAX_SAFE_INTEGER,gt.toString()}const ht=new Map,At=s=>{if(ht.has(s))return;const n=setTimeout(()=>{ht.delete(s),$e({type:"REMOVE_TOAST",toastId:s})},qs);ht.set(s,n)},Js=(s,n)=>{switch(n.type){case"ADD_TOAST":return{...s,toasts:[n.toast,...s.toasts].slice(0,Gs)};case"UPDATE_TOAST":return{...s,toasts:s.toasts.map(i=>i.id===n.toast.id?{...i,...n.toast}:i)};case"DISMISS_TOAST":{const{toastId:i}=n;return i?At(i):s.toasts.forEach(l=>{At(l.id)}),{...s,toasts:s.toasts.map(l=>l.id===i||i===void 0?{...l,open:!1}:l)}}case"REMOVE_TOAST":return n.toastId===void 0?{...s,toasts:[]}:{...s,toasts:s.toasts.filter(i=>i.id!==n.toastId)}}},Qe=[];let Ze={toasts:[]};function $e(s){Ze=Js(Ze,s),Qe.forEach(n=>{n(Ze)})}function Xs({...s}){const n=Ys(),i=c=>$e({type:"UPDATE_TOAST",toast:{...c,id:n}}),l=()=>$e({type:"DISMISS_TOAST",toastId:n});return $e({type:"ADD_TOAST",toast:{...s,id:n,open:!0,onOpenChange:c=>{c||l()}}}),{id:n,dismiss:l,update:i}}function Qs(){const[s,n]=t.useState(Ze);return t.useEffect(()=>(Qe.push(n),()=>{const i=Qe.indexOf(n);i>-1&&Qe.splice(i,1)}),[s]),{...s,toast:Xs,dismiss:i=>$e({type:"DISMISS_TOAST",toastId:i})}}function Se(...s){return xs(vs(s))}const Zs=ks,Qt=t.forwardRef(({className:s,...n},i)=>e.jsx(Vt,{ref:i,className:Se("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",s),...n}));Qt.displayName=Vt.displayName;const en=ws("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),Zt=t.forwardRef(({className:s,variant:n,...i},l)=>e.jsx(Wt,{ref:l,className:Se(en({variant:n}),s),...i}));Zt.displayName=Wt.displayName;const tn=t.forwardRef(({className:s,...n},i)=>e.jsx(Ht,{ref:i,className:Se("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",s),...n}));tn.displayName=Ht.displayName;const es=t.forwardRef(({className:s,...n},i)=>e.jsx(Kt,{ref:i,className:Se("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",s),"toast-close":"",...n,children:e.jsx(ys,{className:"h-4 w-4"})}));es.displayName=Kt.displayName;const ts=t.forwardRef(({className:s,...n},i)=>e.jsx(Gt,{ref:i,className:Se("text-sm font-semibold",s),...n}));ts.displayName=Gt.displayName;const ss=t.forwardRef(({className:s,...n},i)=>e.jsx(qt,{ref:i,className:Se("text-sm opacity-90",s),...n}));ss.displayName=qt.displayName;function sn(){const{toasts:s}=Qs();return e.jsxs(Zs,{children:[s.map(function({id:n,title:i,description:l,action:c,...u}){return e.jsxs(Zt,{...u,children:[e.jsxs("div",{className:"grid gap-1",children:[i&&e.jsx(ts,{children:i}),l&&e.jsx(ss,{children:l})]}),c,e.jsx(es,{})]},n)}),e.jsx(Qt,{})]})}const nn=({...s})=>{const{theme:n="system"}=js();return e.jsx(Ss,{theme:n,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...s})},rn=Es,an=t.forwardRef(({className:s,sideOffset:n=4,...i},l)=>e.jsx(Yt,{ref:l,sideOffset:n,className:Se("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",s),...i}));an.displayName=Yt.displayName;const on="https://pmpspnvfgkzprgntihtx.supabase.co",ln="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",De="book-pages",rr="models-3d",F=Ls(on,ln,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),cn=50*1024*1024;function H(s,n){return s instanceof Error?s:typeof s=="object"&&s&&"message"in s?new Error(String(s.message)):new Error(n)}function un(s){const{data:n}=F.storage.from(De).getPublicUrl(s);return n.publicUrl}function dn(s){return{...s,public_url:un(s.storage_path)}}function mn(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function fn(s){if(s.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const n of s){const i=n.name.toLowerCase(),l=i.endsWith(".jpg")||i.endsWith(".jpeg"),c=n.type==="image/jpeg"||n.type==="";if(!l||!c)throw new Error(`${n.name} is not a JPG/JPEG image.`);if(n.size>cn)throw new Error(`${n.name} is larger than 50 MB.`)}}function pn(s){return s.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function ir(){const{data:s,error:n}=await F.rpc("is_admin");if(n)throw H(n,"Unable to verify administrator access.");return s===!0}async function ns(){const{data:s,error:n}=await F.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(n)throw H(n,"Unable to load books.");return s??[]}async function ar(){const{data:s,error:n}=await F.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw H(n,"Unable to load the admin book list.");return s??[]}async function ke(s){const{data:n,error:i}=await F.from("book_pages").select("*").eq("book_id",s).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(i)throw H(i,"Unable to load the book pages.");return(n??[]).map(dn)}async function or(s){const n=pn(s.slug);if(!n)throw new Error("The book needs a valid slug.");const{data:i,error:l}=await F.from("books").insert({title:s.title.trim(),slug:n,storage_folder:n,category:s.category,description:s.description?.trim()??"",is_published:s.is_published??!1,is_featured:!1,sort_order:s.sort_order??0}).select("*").single();if(l)throw H(l,"Unable to create the book.");return i}async function lr(s,n){const{data:i,error:l}=await F.from("books").update(n).eq("id",s).select("*").single();if(l)throw H(l,"Unable to save the book.");return i}async function cr(s){const{error:n}=await F.rpc("set_featured_book",{p_book_id:s});if(n)throw H(n,"Unable to set the featured book.")}async function ur(s,n,i){const l=[...n].sort((v,f)=>v.name.localeCompare(f.name,void 0,{numeric:!0,sensitivity:"base"}));fn(l);let u=(await ke(s.id)).reduce((v,f)=>Math.max(v,f.page_number),0)+1,b=0;for(const v of l){const f=`${s.storage_folder}/${String(u).padStart(4,"0")}-${mn()}.jpg`,{error:E}=await F.storage.from(De).upload(f,v,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(E)throw H(E,`Unable to upload ${v.name}.`);const{error:_}=await F.from("book_pages").insert({book_id:s.id,storage_path:f,file_name:v.name,page_number:u});if(_)throw await F.storage.from(De).remove([f]),H(_,`Unable to register ${v.name}.`);u+=1,b+=1,i?.(b,l.length)}return ke(s.id)}async function gn(s){const i=(await ke(s)).map((u,b)=>({page:u,nextNumber:b+1})).filter(({page:u,nextNumber:b})=>u.page_number!==b).map(({page:u,nextNumber:b})=>F.from("book_pages").update({page_number:b}).eq("id",u.id)),c=(await Promise.all(i)).find(u=>u.error);if(c?.error)throw H(c.error,"Unable to renumber the pages.")}async function dr(s){const{error:n}=await F.storage.from(De).remove([s.storage_path]);if(n)throw H(n,"Unable to delete the image from Storage.");const{error:i}=await F.from("book_pages").delete().eq("id",s.id);if(i)throw H(i,"The image was removed, but its database row remains.");await gn(s.book_id)}async function mr(s,n,i){const l=n+i;if(n<0||l<0||l>=s.length)return s;const c=s[n],u=s[l],{error:b}=await F.rpc("swap_book_pages",{p_first_page_id:c.id,p_second_page_id:u.id});if(b)throw H(b,"Unable to reorder the pages.");return ke(c.book_id)}async function fr(s){const i=(await ke(s.id)).map(c=>c.storage_path);if(i.length>0){const{error:c}=await F.storage.from(De).remove(i);if(c)throw H(c,"Unable to delete this book's image folder.")}const{error:l}=await F.from("books").delete().eq("id",s.id);if(l)throw H(l,"Unable to delete the book record.")}const hn={a4_long_edge:{width:480,height:679,minWidth:240,maxWidth:600,minHeight:340,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:260,maxWidth:680,minHeight:184,maxHeight:481},square:{width:560,height:560,minWidth:240,maxWidth:620,minHeight:240,maxHeight:620}},bn=t.forwardRef(function({page:n,isCover:i},l){return e.jsx("div",{ref:l,"data-density":i?"hard":"soft",className:"h-full w-full overflow-hidden bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:e.jsx("img",{src:n.public_url,alt:`Page ${n.page_number}: ${n.file_name}`,draggable:!1,className:"h-full w-full select-none object-cover object-center"})})});function xn({book:s,pages:n,initialPage:i=0,bookMotionClassName:l="is-visible",onPageChange:c,onReady:u}){const b=t.useRef(null),v=t.useRef(null),f=s.page_format??"a4_long_edge",E=hn[f],_=Math.min(Math.max(0,Math.floor(i)),Math.max(0,n.length-1)),[B,M]=t.useState(_),[z,N]=t.useState(0),y=t.useCallback(p=>{window.requestAnimationFrame(()=>{const g=p??b.current?.pageFlip();if(!g)return;const k=g.getOrientation(),x=g.getCurrentPageIndex(),U=g.getBoundsRect();if(M(x),c?.(x),k!=="landscape"){N(0);return}if(x===0){N(-(U.pageWidth/2));return}if(x>=n.length-1){N(U.pageWidth/2);return}N(0)})},[c,n.length]);return t.useEffect(()=>{const p=v.current;if(!p)return;const g=()=>{y()},k=new ResizeObserver(g);return k.observe(p),window.addEventListener("resize",g),()=>{k.disconnect(),window.removeEventListener("resize",g)}},[y]),t.useEffect(()=>{M(_),N(0)},[s.id,_]),t.useEffect(()=>{n.length===0&&u?.(s.id)},[s.id,u,n.length]),n.length===0?e.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."}):e.jsxs("div",{className:"flex w-full flex-col items-center",children:[e.jsx("div",{className:`public-book-stage ${l}`,children:e.jsx("div",{ref:v,className:"flex h-[min(74vh,850px)] w-[min(96vw,1400px)] items-center justify-center overflow-visible px-2",children:e.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${z}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform"},children:e.jsx(Ts,{ref:b,className:"mx-auto",style:{margin:"0 auto"},width:E.width,height:E.height,minWidth:E.minWidth,maxWidth:E.maxWidth,minHeight:E.minHeight,maxHeight:E.maxHeight,size:"stretch",startPage:_,drawShadow:!0,flippingTime:850,usePortrait:!0,startZIndex:0,autoSize:!0,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!0,disableFlipByClick:!1,onInit:p=>{M(p.data.page),c?.(p.data.page),y(p.object),u?.(s.id)},onFlip:p=>{M(p.data),c?.(p.data),y(p.object)},onChangeOrientation:p=>{y(p.object)},children:n.map((p,g)=>e.jsx(bn,{page:p,isCover:g===0||g===n.length-1},p.id))},`${s.id}-${f}`)})})}),e.jsx("div",{className:`public-book-meta item-title mt-20 flex items-center gap-8 text-[18px] ${l}`,children:e.jsx("span",{className:"max-w-[60vw] truncate",children:s.title})}),s.description&&e.jsx("div",{className:`public-book-meta item-description mt-5 flex items-center gap-8 text-[18px] ${l}`,children:e.jsx("span",{className:"max-w-[60vw] truncate",children:s.description})})]})}const rs="publicBookSession",vt="publicBookReturningToIndex",et="publicBookReturningToIntro";function jt(){if(typeof window>"u")return null;try{const s=window.sessionStorage.getItem(rs);if(!s)return null;const n=JSON.parse(s);return typeof n.slug!="string"||n.slug.length===0||typeof n.pageIndex!="number"||!Number.isFinite(n.pageIndex)?null:{slug:n.slug,pageIndex:Math.max(0,Math.floor(n.pageIndex))}}catch{return null}}function Me(s,n){if(typeof window>"u")return;const i={slug:s,pageIndex:Math.max(0,Math.floor(n))};try{window.sessionStorage.setItem(rs,JSON.stringify(i))}catch{}}const is=()=>je(()=>import("./AdminPortal-CjRRyJE3.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),vn=t.lazy(is),tt=1120,as=180,St=140,Ne=tt+St,yn=as+Ne,st=920,Pt=120,Mt=st+St,yt=1180,wn=1800,kn=`
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
  animation-duration: ${st}ms;
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
  animation-duration: ${st}ms;
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
`,jn={objects:"OBJ",graphics:"GRPH",concepts:"CNCP"};function bt(s){return s instanceof Error?s.message:"Unable to load the books."}function le(s){return new Promise(n=>{window.setTimeout(n,s)})}function Lt(){return new Promise(s=>{window.requestAnimationFrame(()=>s())})}function Sn(s){const n=i=>Number.isFinite(i)?Math.min(255,Math.max(0,Math.round(i??255))):255;return`rgb(${n(s?.background_r)} ${n(s?.background_g)} ${n(s?.background_b)})`}function En(s){return new Promise(n=>{const i=new Image;let l=!1;const c=()=>{l||(l=!0,window.clearTimeout(u),n())},u=window.setTimeout(c,5e3);i.onload=()=>{if(typeof i.decode=="function"){i.decode().catch(()=>{}).finally(c);return}c()},i.onerror=c,i.src=s})}async function $t(s){await Promise.all(s.slice(0,2).map(n=>En(n.public_url)))}function Tn({initialSlug:s,onBack:n,onLogin:i,onThreeD:l,onBookChange:c}){const[u,b]=t.useState([]),[v,f]=t.useState(null),[E,_]=t.useState([]),[B,M]=t.useState(!0),[z,N]=t.useState(!1),[y,p]=t.useState(null),[g,k]=t.useState(!1),[x,U]=t.useState(!1),[K,Q]=t.useState("outside"),[d,T]=t.useState(!1),[w,R]=t.useState("outside"),[re,V]=t.useState(!1),[L,ce]=t.useState(0),[I,ee]=t.useState(!1),[it,te]=t.useState(!1),j=t.useRef(!0),$=t.useRef(!1),ge=t.useRef(null),Y=t.useRef(null),Ee=t.useRef(null),ie=t.useRef(!1),Re=t.useRef(jt()),J=t.useRef(null),he=t.useRef(0),O=t.useRef("rgb(255 255 255)"),ue=t.useRef(null),Z=t.useRef(null),X=t.useRef(null),[be,Ce]=t.useState([{id:0,color:O.current}]),C=t.useMemo(()=>u.find(o=>o.id===v)??null,[u,v]);t.useEffect(()=>{const o=Sn(C);if(o===O.current)return;O.current=o;const h={id:++he.current,color:o};Ce(S=>[S[S.length-1],h]),ue.current&&window.clearTimeout(ue.current),ue.current=window.setTimeout(()=>{Ce(S=>S.slice(-1)),ue.current=null},yt)},[C,C?.background_b,C?.background_g,C?.background_r]);const xe=t.useCallback(o=>{if(Z.current===o)return Promise.resolve();const h=X.current;return h&&h.finish(),new Promise(S=>{let G=!1;const oe=()=>{G||(G=!0,window.clearTimeout(Ue),X.current?.finish===oe&&(X.current=null),S())},Ue=window.setTimeout(oe,wn);X.current={bookId:o,finish:oe,timeout:Ue}})},[]),Ie=t.useCallback(o=>{Z.current=o;const h=X.current;h?.bookId===o&&h.finish()},[]);t.useEffect(()=>{ge.current=v},[v]);const D=t.useCallback(()=>{J.current&&(window.clearTimeout(J.current),J.current=null)},[]),de=t.useCallback((o=!1)=>{D();const h=o?Pt:as,S=o?st:tt;V(o),R("outside"),J.current=window.setTimeout(()=>{j.current&&(R("entering"),J.current=window.setTimeout(()=>{j.current&&(R("visible"),V(!1),J.current=null)},S+St))},h)},[D]);t.useEffect(()=>{j.current=!0;const o=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{j.current&&T(!0)})});return()=>{j.current=!1,window.cancelAnimationFrame(o),J.current&&window.clearTimeout(J.current),ue.current&&window.clearTimeout(ue.current),X.current&&(window.clearTimeout(X.current.timeout),X.current.finish())}},[]),t.useEffect(()=>{let o=!0;return(async()=>{M(!0),p(null);try{const S=await ns();if(!o)return;b(S)}catch(S){o&&p(bt(S))}finally{o&&M(!1)}})(),()=>{o=!1}},[]);const Te=t.useCallback(async o=>{if(!ie.current){ie.current=!0,N(!0),p(null);try{const h=await ke(o.id);if(await $t(h),!j.current)return;const S=Re.current,G=S?.slug===o.slug?Math.min(S.pageIndex,Math.max(0,h.length-1)):0;Z.current=null;const oe=xe(o.id);if(Bt.flushSync(()=>{V(!1),R("outside"),f(o.id),_(h),ce(G)}),Me(o.slug,G),N(!1),await oe,!j.current)return;de()}catch(h){j.current&&(p(bt(h)),N(!1))}finally{ie.current=!1}}},[de,xe]),me=t.useCallback(async(o,h)=>{if(j.current){if($.current){Y.current={book:o,updateRoute:h},k(!1);return}if(ge.current===o.id){k(!1);return}$.current=!0,ee(!0),N(!0),k(!1),p(null);try{const S=await ke(o.id);if(!j.current||(await $t(S),!j.current)||(D(),V(!0),R("leaving"),await le(Mt),!j.current))return;Z.current=null;const G=xe(o.id);if(Bt.flushSync(()=>{V(!0),R("outside"),f(o.id),ge.current=o.id,_(S),ce(0),N(!1)}),Re.current={slug:o.slug,pageIndex:0},Me(o.slug,0),h&&c?.(o.slug),await Lt(),await Lt(),await G,await le(Pt),!j.current)return;R("entering"),await le(Mt),j.current&&(R("visible"),V(!1))}catch(S){j.current&&(p(bt(S)),N(!1),V(!1),R("visible"))}finally{if($.current=!1,j.current){ee(!1);const S=Y.current;Y.current=null,S&&S.book.id!==ge.current&&window.setTimeout(()=>{Ee.current?.(S.book,S.updateRoute)},24)}}}},[D,c,xe]);t.useEffect(()=>{Ee.current=(o,h)=>{me(o,h)}},[me]),t.useEffect(()=>{if(B||u.length===0)return;const o=s?u.find(h=>h.slug===s):null;if(!v){const h=u.find(G=>G.is_featured),S=o??h??u[0];Te(S);return}o&&o.id!==v&&!$.current&&me(o,!1)},[u,s,Te,B,v,me]);const ve=t.useCallback(async()=>{!x||$.current||($.current=!0,ee(!0),Q("leaving"),await le(Ne),j.current&&(U(!1),Q("outside"),de(),await le(yn),$.current=!1,j.current&&ee(!1)))},[x,de]);t.useEffect(()=>{const o=h=>{if(h.key==="Escape"){if(x){ve();return}k(!1)}};return window.addEventListener("keydown",o),()=>{window.removeEventListener("keydown",o)}},[ve,x]);const Fe=async()=>{if(!$.current){if(k(!1),x){await ve();return}$.current=!0,ee(!0),is(),!(C&&(D(),R("leaving"),await le(Ne),!j.current))&&(U(!0),Q("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{j.current&&Q("entering")})}),await le(Ne),$.current=!1,j.current&&(Q("visible"),ee(!1)))}},ye=async()=>{if(x){await ve();return}$.current||($.current=!0,ee(!0),k(!1),T(!1),D(),R("leaving"),C&&Me(C.slug,L),window.sessionStorage.setItem(vt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.getItem("returnFromExample")!=="true"?window.sessionStorage.setItem(et,"true"):window.sessionStorage.removeItem(et),await le(Ne),j.current&&n())},ae=async()=>{$.current||x||($.current=!0,ee(!0),te(!0),k(!1),T(!1),D(),R("leaving"),C&&Me(C.slug,L),await le(Ne),j.current&&l())},ze=o=>{me(o,!0)},Oe=t.useCallback(o=>{ce(o),C&&(Re.current={slug:C.slug,pageIndex:o},Me(C.slug,o))},[C]),at=`${w==="entering"?"is-entering":w==="visible"?"is-visible":w==="leaving"?"is-leaving":"is-outside"}${re?" is-fast":""}`,_e=K==="entering"?"is-entering":K==="visible"?"is-visible":K==="leaving"?"is-leaving":"is-outside",we=d?"is-visible":I||it?"is-leaving":"is-outside";return e.jsxs("div",{className:"fixed inset-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:be[0]?.color??"rgb(255 255 255)"},children:[e.jsx("style",{children:kn}),e.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:be.map((o,h)=>e.jsx("div",{className:`public-book-background-layer ${h===be.length-1?"is-current":"is-previous"}`,style:{backgroundColor:o.color}},o.id))}),g&&!x&&e.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-transparent",onClick:()=>k(!1)}),e.jsxs("div",{className:"fixed left-4 top-4 z-[170] flex items-center gap-2 sm:left-6 sm:top-6",children:[e.jsx("div",{className:`public-nav-item ${we}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:e.jsx("button",{type:"button",onClick:()=>void ye(),disabled:I,className:"flex h-12 w-12 items-center justify-center rounded-full border border-black/35 bg-transparent transition-transform duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40","aria-label":x?"Back to book":"Back",title:x?"Back to book":"Back",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",className:"h-5 w-5","aria-hidden":"true",children:[e.jsx("path",{d:"M19 12H5"}),e.jsx("path",{d:"m11 18-6-6 6-6"})]})})}),e.jsx("div",{className:`public-nav-item ${we}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:e.jsx("button",{type:"button",onClick:()=>k(o=>!o),disabled:x,className:`flex h-12 w-12 items-center justify-center rounded-full border bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${g?"border-black text-black":"border-black/35 text-black"}`,"aria-label":"Choose a book","aria-expanded":g,"aria-controls":"public-book-balloon",title:"Choose a book",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",className:"h-5 w-5","aria-hidden":"true",children:[e.jsx("path",{d:"M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"}),e.jsx("path",{d:"M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"})]})})}),e.jsx("div",{className:`public-nav-item ${we}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:e.jsx("button",{type:"button",onClick:()=>void Fe(),disabled:I,className:`flex h-12 items-center justify-center rounded-full border bg-transparent px-4 text-[13px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${x?"border-black text-black":"border-black/35 text-black"}`,"aria-expanded":x,children:"LOGIN"})}),e.jsx("div",{className:`public-nav-item ${we}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:e.jsx("button",{type:"button",onClick:()=>void ae(),disabled:I||x,className:"flex h-12 items-center justify-center rounded-full border border-black/35 bg-transparent px-4 text-[13px] text-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40",children:"3D"})})]}),e.jsxs("aside",{id:"public-book-balloon",className:`fixed left-4 top-[76px] z-[150] flex max-h-[72vh] w-[min(88vw,390px)] origin-top-left flex-col rounded-[34px] border border-black/25 bg-white/95 p-5 shadow-[0_18px_65px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] sm:left-[74px] sm:top-[82px] ${g&&!x?"pointer-events-auto scale-100 opacity-100 blur-0":"pointer-events-none scale-0 opacity-0 blur-[10px]"}`,"aria-hidden":!g||x,children:[e.jsx("div",{className:"absolute -top-2 left-[46px] h-4 w-4 rotate-45 border-l border-t border-black/25 bg-white"}),e.jsxs("div",{className:"relative mb-4 flex items-start justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[12px] tracking-[0.18em] text-black/45",children:"LIBRARY"}),e.jsx("h1",{className:"mt-1 text-[22px] font-light",children:"CHOOSE A BOOK"})]}),e.jsx("button",{type:"button",onClick:()=>k(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95","aria-label":"Close book list",children:e.jsx("span",{"aria-hidden":"true",children:"×"})})]}),e.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto border-t border-black/15",children:B?e.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"LOADING..."}):u.length===0?e.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):u.map(o=>{const h=o.id===v;return e.jsxs("button",{type:"button",onClick:()=>ze(o),className:`grid w-full grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-all duration-300 ${h?"translate-x-1 text-black":"text-black/60 hover:translate-x-1 hover:text-black"}`,children:[e.jsx("span",{className:"text-[12px] tracking-wide",children:jn[o.category]}),e.jsxs("span",{className:"min-w-0",children:[e.jsx("span",{className:"block truncate text-[16px]",children:o.title}),o.description&&e.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/45",children:o.description})]}),e.jsx("span",{className:"flex min-w-[18px] justify-end text-[13px]",children:o.is_featured?"*":h?">":""})]},o.id)})}),e.jsx("p",{className:"relative mt-3 text-[11px] text-black/40",children:"* Featured"})]}),e.jsx("div",{className:"pointer-events-none fixed inset-x-0 top-5 z-[100] flex justify-center px-[230px] sm:top-7",children:C&&e.jsx("p",{className:`public-book-label max-w-full truncate text-center text-[13px] tracking-[0.12em] text-black/55 ${we}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:C.is_featured?"FEATURED - ":""})}),e.jsx("main",{className:"relative z-10 flex h-full w-full items-center justify-center overflow-hidden px-2 pb-4 pt-20 sm:px-5 sm:pb-6 sm:pt-24",children:B||z&&!C?e.jsx("div",{className:`public-route-message ${d?"is-visible":"is-outside"}`,children:"LOADING..."}):y?e.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${d?"is-visible":"is-outside"}`,children:y}):u.length===0?e.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${d?"is-visible":"is-outside"}`,children:"No books are public yet."}):C?e.jsx("div",{className:"h-full w-full",children:e.jsx("div",{className:`flex h-full w-full items-center justify-center transition-[transform,opacity,filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${x?"scale-[0.94] opacity-25 blur-[9px]":"scale-100 opacity-100 blur-0"}`,children:e.jsx(xn,{book:C,pages:E,initialPage:L,bookMotionClassName:at,onPageChange:Oe,onReady:Ie},C.id)})}):null}),x&&e.jsx("div",{className:`public-login-stage fixed inset-0 z-[130] overflow-hidden bg-white ${_e}`,"aria-hidden":K==="outside"||K==="leaving",children:e.jsx(t.Suspense,{fallback:null,children:e.jsx(vn,{embedded:!0,surfaceReady:K==="entering"||K==="visible",onBack:()=>void ve()})})})]})}const os=t.createContext(void 0),_n=({children:s})=>{const[n,i]=t.useState(!1),l=()=>{i(!n)};return t.useEffect(()=>{n?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[n]),e.jsx(os.Provider,{value:{isDark:n,toggleTheme:l},children:s})},pr=()=>{const s=t.useContext(os);if(s===void 0)throw new Error("useTheme must be used within a ThemeProvider");return s},Dt="/assets/WolfyLight-Bs10J6iU.gif",Nn=100,Rn=500,Cn=14e3,xt=400,In=({onComplete:s})=>{const[n,i]=t.useState(!1),[l,c]=t.useState(!1),[u,b]=t.useState(!1),[v,f]=t.useState(!1),[E,_]=t.useState({}),[B,M]=t.useState(0),[z,N]=t.useState(!0),y=t.useRef({}),p=t.useRef(null),g=t.useRef(!1),k=t.useRef(!1),{progress:x}=Os();t.useEffect(()=>{let d;const T=()=>{M(w=>{const R=x-w,re=Math.max(R*.1,R>0?.5:-.5),V=Math.abs(R)<.5?x:w+re;return V>=100&&setTimeout(()=>N(!1),500),Math.min(100,Math.max(0,V))}),d=requestAnimationFrame(T)};return d=requestAnimationFrame(T),()=>cancelAnimationFrame(d)},[x]),t.useEffect(()=>{const d=window.matchMedia("(prefers-reduced-motion: reduce)");k.current=d.matches;const T=()=>k.current=d.matches;return d.addEventListener?.("change",T),()=>d.removeEventListener?.("change",T)},[]),t.useEffect(()=>{const d=new Image;d.src=Dt;const T=()=>_({w:d.naturalWidth||400,h:d.naturalHeight||400});d.decode?.().then(()=>{T(),i(!0)}).catch(()=>{d.onload=()=>{T(),i(!0)}})},[]);const U=t.useCallback(()=>{if(g.current)return;if(k.current){g.current=!0,s();return}f(!0);const d=p.current;let T=!1;const w=()=>{T||(T=!0,g.current=!0,s())};if(d){const R=()=>{d.removeEventListener("animationend",R),y.current.fallback&&clearTimeout(y.current.fallback),w()};d.addEventListener("animationend",R,{once:!0}),y.current.fallback=window.setTimeout(w,xt+120)}else y.current.fallback=window.setTimeout(w,xt+50)},[s]);t.useEffect(()=>{if(!n)return;const d=y.current;return k.current?(c(!0),b(!0),d.auto=window.setTimeout(()=>U(),800)):(d.entry=window.setTimeout(()=>c(!0),Nn),d.allowExit=window.setTimeout(()=>b(!0),Rn),d.auto=window.setTimeout(()=>U(),Cn)),()=>{Object.values(d).forEach(T=>T&&clearTimeout(T))}},[n,U]);const K=()=>{(u||k.current)&&U()},Q=l?v?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return e.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${g.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:K,children:[e.jsxs("div",{className:`relative ${Q}`,ref:p,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[e.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),e.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),e.jsx("img",{src:Dt,alt:"Loading wolf",width:E.w||800,height:E.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),z&&e.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${B>=100?"opacity-0":"opacity-100"}`,children:[Math.round(B),"%"]}),e.jsx("style",{children:`
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
      `})]})},q={};typeof window<"u"&&(window.addEventListener("keydown",s=>q[s.key.toLowerCase()]=!0),window.addEventListener("keyup",s=>q[s.key.toLowerCase()]=!1));const ls={current:null},Le={center:new W(0,0,-300),radius:60},wt=15,On=38,Bn=95;function An(s,n,i){let l=n-s;for(;l<-Math.PI;)l+=Math.PI*2;for(;l>Math.PI;)l-=Math.PI*2;return s+l*i}function Pn(){const s=t.useRef(null),n=Ps(Fs,"/waternormals.jpeg");n.wrapS=n.wrapT=zs;const i=t.useMemo(()=>new Us(1e4,1e4),[]),l=t.useMemo(()=>{const c=new W(500,150,-1e3).normalize();return new Ms(i,{textureWidth:512,textureHeight:512,waterNormals:n,sunDirection:c,sunColor:16773836,waterColor:666218,distortionScale:10.7,fog:!1})},[i,n]);return l.material.uniforms.waterColor.value.convertSRGBToLinear(),kt((c,u)=>{s.current&&(s.current.material.uniforms.time.value+=u)}),e.jsx("primitive",{object:l,ref:s,"rotation-x":-Math.PI/2})}function Mn(){const{scene:s}=rt("/island.gltf");return e.jsx("primitive",{object:s,scale:100,position:[0,-5,-300]})}function Ln(){const s=t.useRef(null),{camera:n}=Xt(),{scene:i}=rt("/wolfy.glb");t.useEffect(()=>{i.traverse(f=>{f instanceof Vs&&f.material instanceof Ws&&(f.material=f.material.clone(),f.material.roughness=.2,f.material.metalness=.1,f.material.envMapIntensity=1.2)})},[i]);const l=t.useRef(new W),c=t.useRef(new W),u=t.useRef(0),b=t.useRef(!0),v=t.useRef(new W(0,0,1));return t.useEffect(()=>{ls.current=s.current;const f=_=>{const{x:B,z:M}=_.detail;l.current.set(B,0,M)},E=()=>{b.current&&(b.current=!1,u.current=On)};return window.addEventListener("explore-joystick",f),window.addEventListener("explore-jump",E),()=>{window.removeEventListener("explore-joystick",f),window.removeEventListener("explore-jump",E)}},[]),kt((f,E)=>{if(!s.current)return;const _=new W(l.current.x+(q.arrowright||q.d?1:0)-(q.arrowleft||q.a?1:0),0,l.current.z+(q.arrowup||q.w?1:0)-(q.arrowdown||q.s?1:0));_.lengthSq()<.01&&_.set(0,0,0);const B=new W;n.getWorldDirection(B),B.y=0,B.normalize();const M=new W().crossVectors(B,new W(0,1,0)).normalize(),z=new W().addScaledVector(B,_.z).addScaledVector(M,_.x);z.lengthSq()>1e-4&&z.normalize(),c.current.lerp(z.multiplyScalar(100),E*6);const y=s.current.position.clone().addScaledVector(c.current,E);u.current-=Bn*Math.min(E,.05),y.y+=u.current*Math.min(E,.05),y.y<=wt&&(y.y=wt,u.current=0,b.current=!0);const p=y.distanceTo(Le.center),g=2;if(p<Le.radius+g){const k=y.clone().sub(Le.center).normalize();y.copy(Le.center.clone().add(k.multiplyScalar(Le.radius+g))),c.current.multiplyScalar(.2)}if(s.current.position.copy(y),_.lengthSq()>.01){const k=z.clone();_.z<-.2&&k.copy(B),v.current.lerp(k,.15).normalize();const x=Math.atan2(v.current.x,v.current.z);s.current.rotation.y=An(s.current.rotation.y,x,.15)}s.current.userData.joyX=l.current.x}),e.jsx("primitive",{ref:s,object:i,scale:10,position:[0,15,0],rotation:[0,Math.PI,0]})}function $n(){const{camera:s}=Xt(),n=t.useRef(0),i=t.useRef(0),l=t.useRef(!1);return t.useEffect(()=>{const c=u=>{l.current=u.detail.enabled};return window.addEventListener("explore-mode",c),()=>window.removeEventListener("explore-mode",c)},[]),kt((c,u)=>{const b=ls.current;if(!b)return;const v=b.userData||{};i.current+=u*(l.current?1:-1),i.current=Hs.clamp(i.current,0,1);const f=i.current,E=f*f*(3-2*f),_=(q.arrowright||q.d?1:0)-(q.arrowleft||q.a?1:0),B=v.joyX??0,M=_+B;Math.abs(M)>.05&&(n.current-=M*u*2.5);const z=new W(0,22,70);z.applyAxisAngle(new W(0,1,0),n.current);const N=b.position.clone();N.y=wt;const y=N.add(z),p=new W(0,20,100),g=new W(Math.sin(f*Math.PI)*20,0,0),x=p.clone().add(g).lerp(y,E);s.position.lerp(x,.12);const U=new W(0,5,0),K=b.position.clone();K.y+=6;const Q=U.lerp(K,E);s.lookAt(Q)}),null}function Dn(){return e.jsxs(Bs,{camera:{position:[0,20,100],fov:55},gl:{antialias:!0,toneMapping:Ds,toneMappingExposure:.8,outputColorSpace:$s},children:[e.jsx("color",{attach:"background",args:["#0b1e3a"]}),e.jsx("directionalLight",{position:[500,200,-300],intensity:1,color:"#fff4d6"}),e.jsx("ambientLight",{intensity:.35}),e.jsxs(t.Suspense,{fallback:null,children:[e.jsx(Pn,{}),e.jsx(Mn,{}),e.jsx(Ln,{})]}),e.jsx($n,{}),e.jsx(As,{distance:1e3,sunPosition:[500,200,-300],turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})]})}rt.preload("/wolfy.glb");rt.preload("/island.gltf");const Fn=`
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
`,P={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode"},zn={objects:"OBJ",graphics:"GRPH",concepts:"CNCP"},Un=()=>{const s=nt(),i=t.useRef(sessionStorage.getItem(vt)==="true"||sessionStorage.getItem(et)==="true"||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,c=t.useRef(i&&sessionStorage.getItem(P.returnFlag)==="true").current,[u]=t.useState(()=>jt()),[b,v]=t.useState(i),[f,E]=t.useState([]),[_,B]=t.useState(!0),[M,z]=t.useState(null),N=t.useCallback(async()=>{B(!0);try{const r=await ns();E(r),z(null)}catch(r){console.error("Unable to load published books",r),z(r instanceof Error?r.message:"Unable to load the published books.")}finally{B(!1)}},[]);t.useEffect(()=>{N();const r=()=>{N()},a=()=>{document.visibilityState==="visible"&&N()};return window.addEventListener("focus",r),document.addEventListener("visibilitychange",a),()=>{window.removeEventListener("focus",r),document.removeEventListener("visibilitychange",a)}},[N]);const y=t.useMemo(()=>f.find(r=>r.is_featured)??f[0]??null,[f]),p=t.useMemo(()=>{const r=a=>({id:a.id,category:zn[a.category],name:a.title,link:`/book/${encodeURIComponent(a.slug)}`,isFeatured:a.is_featured});return{objects:f.filter(a=>a.category==="objects").map(r),graphics:f.filter(a=>a.category==="graphics").map(r),concepts:f.filter(a=>a.category==="concepts").map(r)}},[f]),g=t.useMemo(()=>Object.values(p).flat(),[p]);t.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const r="__GLOBAL_SKY_OCEAN_BG_ROOT__",a=window;if(a[r])return;const m=document.createElement("div");m.id="global-sky-ocean-bg",Object.assign(m.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(m);const A=Jt.createRoot(m);A.render(e.jsx(t.Suspense,{fallback:null,children:e.jsx(Dn,{})})),a[r]=A},[]);const k=sessionStorage.getItem(P.stage)||"intro",x=sessionStorage.getItem(P.activeButton)||null,U=sessionStorage.getItem(P.searchOpen)==="true",K=sessionStorage.getItem(P.searchQuery)||"",Q=sessionStorage.getItem(P.exploreMode)==="true",[d,T]=t.useState(k),[w,R]=t.useState(x),[re,V]=t.useState(U),[L,ce]=t.useState(K),[I,ee]=t.useState(Q),it=k==="list"||!!x||U,[te,j]=t.useState(it),[$,ge]=t.useState(!1),[Y,Ee]=t.useState(!1),[ie,Re]=t.useState(!1);t.useEffect(()=>{if(!ie||$)return;if(i){v(!0);return}v(!1);let r=0;const a=window.requestAnimationFrame(()=>{r=window.requestAnimationFrame(()=>{v(!0)})});return()=>{window.cancelAnimationFrame(a),window.cancelAnimationFrame(r)}},[ie,i,$]);const[J,he]=t.useState(!1),[O,ue]=t.useState(!1),[Z,X]=t.useState(!1),[be,Ce]=t.useState(!1),[C,xe]=t.useState(!c),Ie=t.useRef(null),[D,de]=t.useState(()=>{try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),Te=t.useRef(null),me=t.useRef(null);t.useEffect(()=>()=>{Ie.current&&window.clearTimeout(Ie.current)},[]),t.useEffect(()=>{if(!Y||d!=="intro"||Z||O||!D)return;const r=window.setTimeout(()=>{Ce(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(r)}},[Z,Y,O,D,d]),t.useEffect(()=>{if(d!=="main"&&d!=="list"||O||!D||C)return;const r=window.setTimeout(()=>{xe(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(r)}},[C,O,D,d]);const[ve,Fe]=t.useState(!1),ye=t.useRef(null),ae=t.useRef(null),[ze,Oe]=t.useState(!1);t.useEffect(()=>{if(!i)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem(vt),sessionStorage.removeItem(et),sessionStorage.removeItem("revealDone"),de(!1),he(!1),document.documentElement.style.background="",document.body.style.background="";const r=document.getElementById("global-sky-ocean-bg");r&&(r.style.display="block")},[i]),t.useEffect(()=>{try{sessionStorage.setItem(P.exploreMode,String(I))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:I}}));const r=document.getElementById("global-sky-ocean-bg");r&&r.setAttribute("data-explore",I?"1":"0")},[I]),t.useEffect(()=>{sessionStorage.setItem(P.stage,d),sessionStorage.setItem(P.activeButton,w??""),sessionStorage.setItem(P.searchOpen,String(re)),sessionStorage.setItem(P.searchQuery,L)},[d,w,re,L]),t.useEffect(()=>{!sessionStorage.getItem(P.splash)&&d==="intro"?ge(!0):Ee(!0),Re(!0)},[d]);const Et=t.useCallback(()=>{sessionStorage.setItem(P.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const r=document.getElementById("global-sky-ocean-bg");r&&(r.style.display="none"),ge(!1),s(y?`/book/${encodeURIComponent(y.slug)}`:"/books")},[y,s]);t.useEffect(()=>{(Y||i)&&!D&&!J&&!O&&he(!0)},[Y,i,O,D,J]);const at=t.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}Te.current?(Te.current.classList.add("fade-out"),setTimeout(()=>{he(!1),de(!0)},240)):(he(!1),de(!0))},[]),_e=t.useCallback(r=>{O||(me.current=r,he(!1),ue(!0))},[O]),we=t.useCallback(()=>{const r=me.current;if(!r)return;document.documentElement.style.background="white",document.body.style.background="white";const a=document.getElementById("global-sky-ocean-bg");a&&(a.style.display="none"),s(r)},[s]),o=t.useCallback(()=>{R(null),V(!1),ce(""),T("main")},[]),h=t.useCallback(()=>{j(!1)},[]),S=t.useCallback(()=>{te&&o(),j(r=>!r),window.dispatchEvent(new Event("mousemove"))},[te,o]),G=t.useMemo(()=>g.filter(r=>r.name.toLowerCase().includes(L.toLowerCase())),[g,L]),oe=t.useCallback(()=>{if(w&&w!=="search"&&!L){const r=p[w]||[],a=g.filter(m=>!r.some(A=>A.id===m.id));return[...r,...a]}if(w==="search"&&L){const r=G,a=g.filter(m=>!r.some(A=>A.id===m.id));return[...r,...a]}return g},[w,L,p,g,G]),Ue=oe(),Tt=t.useCallback((r,a)=>{if(r&&r!=="search"&&!a){const m=p[r]||[],A=g.filter(se=>!m.some(fe=>fe.id===se.id));return[...m,...A]}if(r==="search"&&a){const m=g.filter(se=>se.name.toLowerCase().includes(a.toLowerCase())),A=g.filter(se=>!m.some(fe=>fe.id===se.id));return[...m,...A]}return g},[p,g]),[Be,_t]=t.useState(null),[Nt,ot]=t.useState(!1),Ve=t.useCallback((r,a,m)=>{const A=oe(),se=ae.current?ae.current.scrollTop:0,fe=Tt(r,a);_t({outgoing:A,incoming:fe,scrollTop:se}),ot(!1),requestAnimationFrame(()=>{requestAnimationFrame(()=>{ot(!0)})}),m(),window.setTimeout(()=>{_t(null),ot(!1)},350)},[oe,Tt]),cs=t.useCallback(r=>{w===r?o():Ve(r,"",()=>{R(r),T("list"),V(!1),ce("")})},[w,o,Ve]),We=t.useCallback(r=>{const a=ae.current?ae.current.scrollTop:0;sessionStorage.setItem(P.listScroll,String(a));const m={activeButton:w,searchOpen:re,searchQuery:L,stage:d,introVisible:Y,archiveOpen:te};try{sessionStorage.setItem(P.snapshot,JSON.stringify(m))}catch{}sessionStorage.setItem(P.returnFlag,"true"),_e(r)},[w,te,_e,Y,re,L,d]),Rt=t.useCallback(()=>{o(),h(),X(!1),Ce(!1),T("intro")},[h,o]),us=t.useCallback(()=>{Z||O||(X(!0),xe(!1),h(),Ie.current=window.setTimeout(()=>{T("main"),X(!1)},1160))},[h,Z,O]),ds=t.useCallback(()=>{!u||O||_e(`/book/${encodeURIComponent(u.slug)}`)},[_e,u,O]),ms=t.useCallback(()=>{w==="search"?o():Ve("search",L,()=>{V(!0),T("list"),R("search")})},[w,o,Ve,L]),He=t.useCallback(()=>{Fe(!1),ye.current&&clearTimeout(ye.current),ye.current=setTimeout(()=>{Fe(!0)},5e3)},[]);t.useEffect(()=>{const r=["mousemove","mousedown","touchstart","touchmove","keydown"];return r.forEach(a=>{window.addEventListener(a,He)}),He(),()=>{r.forEach(a=>{window.removeEventListener(a,He)}),ye.current&&clearTimeout(ye.current)}},[He]),t.useEffect(()=>{if(!ie||!(sessionStorage.getItem(P.returnFlag)==="true"))return;let a=null;try{const m=sessionStorage.getItem(P.snapshot);a=m?JSON.parse(m):null}catch{}if(a){R(a.activeButton??null),V(!!a.searchOpen),ce(a.searchQuery??""),a.archiveOpen||a.stage==="list"?j(!0):j(!1),a.stage&&T(a.stage),Ee(!!a.introVisible),a.stage==="list"&&Oe(!0),sessionStorage.removeItem(P.returnFlag);return}Ee(!0),T("main"),j(!0),window.setTimeout(()=>{T("list"),Oe(!0),sessionStorage.removeItem(P.returnFlag)},700)},[ie]),t.useEffect(()=>{if(d!=="list"||!ze)return;const r=Number(sessionStorage.getItem(P.listScroll)||"0"),a=window.setTimeout(()=>{ae.current&&(ae.current.scrollTop=Number.isNaN(r)?0:r),Oe(!1)},0);return()=>{window.clearTimeout(a)}},[d,ze]);const fs=t.useRef(null),Ae=t.useRef(null),Ke=t.useRef(!1),lt=t.useRef(!1),Ge=t.useRef(!1),ct=t.useRef({x:0,y:0}),Pe=t.useRef({x:0,y:0}),qe=60,Ye=t.useCallback((r,a)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:r,z:a}}))},[]),Je=t.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]);t.useEffect(()=>{if(!I)return;const r=m=>{m.code==="Space"&&(m.preventDefault(),m.stopPropagation(),m.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},a=m=>{m.code==="Space"&&(r(m),m.repeat||Je())};return window.addEventListener("keydown",a,!0),window.addEventListener("keyup",r,!0),()=>{window.removeEventListener("keydown",a,!0),window.removeEventListener("keyup",r,!0)}},[I,Je]);const ps=t.useCallback(r=>{if(!I)return;Ke.current=!0,r.currentTarget.setPointerCapture(r.pointerId);const a=r.currentTarget.getBoundingClientRect();Pe.current={x:a.left+a.width/2,y:a.top+a.height/2},ct.current={x:r.clientX,y:r.clientY},Ge.current=!1,lt.current=Math.hypot(r.clientX-Pe.current.x,r.clientY-Pe.current.y)<=34},[I]),gs=t.useCallback(r=>{if(!Ke.current||!Ae.current)return;const a=r.clientX-Pe.current.x,m=r.clientY-Pe.current.y;Math.hypot(r.clientX-ct.current.x,r.clientY-ct.current.y)>8&&(Ge.current=!0);const A=Math.hypot(a,m),se=A>qe?qe:A,fe=a/(A||1)*se,Ot=m/(A||1)*se;Ae.current.style.transform=`translate(${fe}px, ${Ot}px)`;const hs=fe/qe,bs=-Ot/qe;Ye(hs,bs)},[Ye]),Ct=t.useCallback(r=>{Ke.current&&(Ke.current=!1,r.currentTarget.hasPointerCapture(r.pointerId)&&r.currentTarget.releasePointerCapture(r.pointerId),Ae.current&&(Ae.current.style.transform="translate(0px, 0px)"),Ye(0,0),r.type!=="pointercancel"&&lt.current&&!Ge.current&&Je(),lt.current=!1,Ge.current=!1)},[Ye,Je]),ut=t.useCallback(r=>!!(w&&w!=="search"&&p[w]?.some(a=>a.id===r.id)||w==="search"&&L&&G.some(a=>a.id===r.id)),[w,p,G,L]),dt=Y&&d==="intro"?O||Z?"is-leaving":D?be?"is-visible":"is-entering":"is-outside":"is-outside",It=(d==="main"||d==="list")&&O?"is-leaving":D?C?"is-visible":"is-entering":"is-outside",mt=d==="main"||d==="list"?It:"is-outside",ft=d==="list"?"-15vh":te?"-42px":"0px",pt=r=>({animate:{y:d==="main"||d==="list"?ft:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:r*.025}}),Xe=r=>{const a=r*.055,m=(5-r)*.035,A={scale:0,opacity:0,filter:"blur(8px)",y:ft};return{initial:A,animate:O?{...A,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:m},opacity:{duration:.16,delay:m},filter:{duration:.2,delay:m},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:m}}}:{scale:1,opacity:1,filter:"blur(0px)",y:ft},exit:{...A,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:m},opacity:{duration:.16,delay:m},filter:{duration:.2,delay:m},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:m}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:a},opacity:{duration:.2,delay:a},filter:{duration:.25,delay:a},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:r*.025}}}};return ie?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Fn}),$?e.jsx(In,{onComplete:Et}):e.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${i?"is-returning-from-book":b?"is-entered":"is-entering"}`,children:[e.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:ve?0:1},children:[e.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${Y&&d==="intro"?"":"pointer-events-none"} ${I?"opacity-0 pointer-events-none":"opacity-100"}`,children:[e.jsxs("p",{className:`intro-elastic-item ${dt} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:Rt,children:["Hello,",e.jsx("br",{}),"My name is Gabriel Dell'Aiuto",e.jsx("br",{})]}),e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("button",{onClick:us,disabled:!be||Z,className:`intro-elastic-item item-start ${dt} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`,children:e.jsx("span",{className:"animate-bounce",children:"START"})}),u&&e.jsx("button",{type:"button",onClick:ds,disabled:!be||O,className:`intro-elastic-item item-back ${dt} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`,children:"BACK"})]})]}),e.jsxs("div",{className:"absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl",style:{top:"calc(50% - 24px)"},children:[e.jsxs("div",{className:"flex min-h-12 items-center justify-center gap-5 text-[16px] md:gap-10 md:text-[16px]",children:[e.jsx(pe.div,{...pt(0),children:e.jsx("div",{className:`main-control-item item-back ${mt}`,children:e.jsx("button",{onClick:Rt,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:"BACK"})})}),e.jsx(pe.div,{...pt(1),children:e.jsx("div",{className:`main-control-item item-archive ${mt}`,children:e.jsx("button",{type:"button",onClick:S,"aria-expanded":te,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${te?"underline underline-offset-4":""} ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:"ARCHIVE"})})}),e.jsx(pe.div,{...pt(2),children:e.jsx("div",{className:`main-control-item item-play ${mt}`,children:e.jsxs("button",{onClick:r=>{r.currentTarget.blur(),ee(a=>!a)},title:I?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${I?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${I?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),e.jsx("span",{className:`transition-all text-bold whitespace-nowrap ${I?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"PLAY"})]})})})]}),e.jsx(Ks,{initial:!1,children:te&&e.jsxs(pe.div,{initial:!1,className:`mx-auto mt-7 pb-0 text-center leading-[2] transition-opacity duration-500 ${I?"pointer-events-none opacity-0":"opacity-100"}`,children:[e.jsx(pe.div,{...Xe(0),className:"archive-elastic-item item-featured min-h-[32px] text-[14px] md:text-[16px]",children:y?e.jsxs("button",{type:"button",onClick:()=>We(`/book/${encodeURIComponent(y.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[e.jsx("span",{className:"shrink-0 text-black/50",children:"FEATURED BOOK"}),e.jsx("span",{className:"truncate",children:y.title})]}):_?e.jsx("span",{className:"text-black/50",children:"LOADING BOOKS..."}):M?e.jsx("button",{type:"button",onClick:()=>void N(),className:"text-black/60 underline underline-offset-4",children:"RETRY BOOK LIST"}):e.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-3 uppercase md:gap-10",children:[e.jsx(pe.div,{...Xe(1),className:"archive-elastic-item item-search",children:e.jsx("button",{onClick:ms,className:`z-10 flex items-center text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${w==="search"?"underline":"bg-alpha"}`,children:"search"})}),["objects","graphics","concepts"].map((r,a)=>e.jsx(pe.div,{...Xe(a+2),className:`archive-elastic-item item-${r}`,children:e.jsx("button",{onClick:()=>{cs(r)},className:`text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${w===r?"underline":"bg-alpha"}`,children:r})},r))]}),e.jsx(pe.div,{...Xe(5),className:"archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:e.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${re?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:e.jsx("input",{type:"text",placeholder:"Search...",value:L,onChange:r=>{ce(r.target.value)},className:"w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls")})]}),e.jsx("div",{className:`absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] md:text-[16px] ease-in-out ${d==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${I?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:e.jsxs("div",{className:`index-elastic-item item-list ${It}`,children:[e.jsxs("div",{className:"grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] md:text-[16px] font-light",children:[e.jsx("div",{className:"py-[0.5px]",children:"FIELD"}),e.jsx("div",{className:"py-[0.5px]",children:"NAME"})]}),!_&&!M&&g.length===0?e.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):Be?e.jsxs("div",{className:"relative overflow-hidden no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)",height:"calc(30vh - 2rem)"},children:[e.jsx("div",{className:"absolute inset-0 text-[16px] md:text-[16px] overflow-y-auto no-scrollbar transition-transform duration-300 ease-out",style:{transform:Nt?"translateX(100%)":"translateX(0%)"},ref:r=>{r&&(r.scrollTop=Be.scrollTop)},children:Be.outgoing.map(r=>{const a=ut(r);return e.jsxs("div",{className:`grid grid-cols-2 text-[16px] md:text-[16px] cursor-pointer transition-colors duration-300 ${a?"text-black hover:scale-95 active:scale-95 transition-all":"text-gray-700 hover:scale-95 active:scale-95 transition-all"}`,onClick:()=>{We(r.link)},children:[e.jsx("div",{className:"py-[0.5px] tracking-normal",children:r.category}),e.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[r.name,r.isFeatured?" *":""]})]},`out-${r.id}`)})}),e.jsx("div",{className:"absolute inset-0 overflow-y-auto no-scrollbar transition-transform duration-300 ease-in",style:{transform:Nt?"translateX(0%)":"translateX(-100%)"},ref:r=>{r&&(r.scrollTop=Be.scrollTop)},children:Be.incoming.map(r=>{const a=ut(r);return e.jsxs("div",{className:`grid grid-cols-2 text-[16px] md:text-[16px] cursor-pointer transition-all duration-300 ${a?"text-black hover:scale-95 active:scale-95 transition-all":"text-gray-700 hover:scale-95 active:scale-95 transition-all"}`,onClick:()=>{We(r.link)},children:[e.jsx("div",{className:"py-[0.5px] tracking-normal",children:r.category}),e.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[r.name,r.isFeatured?" *":""]})]},`in-${r.id}`)})})]}):e.jsx("div",{ref:ae,className:"overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:Ue.map(r=>{const a=ut(r);return e.jsxs("div",{className:`grid grid-cols-2 text-[16px] md:text-[16px] hover:scale-95 active:scale-95 backdrop-blur-[1px] cursor-pointer transition-all duration-300 ${a?"text-black transition-all":"text-gray-700 transition-all"}`,onClick:()=>{We(r.link)},children:[e.jsx("div",{className:"py-[0.5px] tracking-normal",children:r.category}),e.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[r.name,r.isFeatured?" *":""]})]},r.id)})})]})})]}),I&&e.jsx("div",{ref:fs,onPointerDown:ps,onPointerMove:gs,onPointerUp:Ct,onPointerCancel:Ct,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:e.jsx("div",{ref:Ae,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:e.jsx("span",{"aria-hidden":"true",children:"↑"})})}),(!D&&(J||i)||O)&&e.jsx("div",{ref:Te,className:"reveal-overlay","aria-hidden":"true",children:e.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[e.jsx("defs",{children:e.jsxs("mask",{id:"hole-mask",children:[e.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),e.jsx("circle",{className:`mask-circle ${O?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:O?we:at})]})}),e.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},Vn=t.lazy(()=>je(()=>import("./AdminPortal-CjRRyJE3.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),Wn=t.lazy(()=>je(()=>import("./Archive-DI1iS8a1.js"),__vite__mapDeps([8,9,1,2,4,5,6,7]))),Hn=t.lazy(()=>je(()=>import("./object01-D53PzqZ0.js"),__vite__mapDeps([10,9,1,2]))),Kn=t.lazy(()=>je(()=>import("./Message-BBi6Tgy5.js"),__vite__mapDeps([11,1,2,7,5,6,4]))),Gn=t.lazy(()=>je(()=>import("./NotFound-u8EXu9YF.js"),__vite__mapDeps([12,1,2]))),qn=t.lazy(()=>je(()=>import("./WatchStudio-Kaq5dKJ7.js"),__vite__mapDeps([13,1,2,5,6,3,7,4]))),Yn=new _s,Ft=()=>{const s=nt();return e.jsx(Vn,{onBack:()=>s("/")})},zt=()=>{const s=nt(),{slug:n}=Is();return e.jsx(Tn,{initialSlug:n??null,onBack:()=>s("/"),onLogin:()=>s("/login"),onThreeD:()=>s("/3d"),onBookChange:i=>{s(`/book/${encodeURIComponent(i)}`,{replace:!0})}})},Jn=()=>{const s=nt();return e.jsx(qn,{onBack:()=>{const n=jt();s(n?`/book/${encodeURIComponent(n.slug)}`:"/books")}})},Xn=()=>e.jsx(Ns,{client:Yn,children:e.jsx(_n,{children:e.jsx(rn,{children:e.jsxs("div",{className:"min-h-screen overflow-scroll scrollbar-hide bg-white dark:bg-black",children:[e.jsx(sn,{}),e.jsx(nn,{}),e.jsx(Rs,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:e.jsx(t.Suspense,{fallback:e.jsx("div",{className:"fixed inset-0 bg-white"}),children:e.jsxs(Cs,{children:[e.jsx(ne,{path:"/",element:e.jsx(Un,{})}),e.jsx(ne,{path:"/archive",element:e.jsx(Wn,{})}),e.jsx(ne,{path:"/message",element:e.jsx(Kn,{})}),e.jsx(ne,{path:"/object01",element:e.jsx(Hn,{})}),e.jsx(ne,{path:"/login",element:e.jsx(Ft,{})}),e.jsx(ne,{path:"/admin",element:e.jsx(Ft,{})}),e.jsx(ne,{path:"/3d",element:e.jsx(Jn,{})}),e.jsx(ne,{path:"/books",element:e.jsx(zt,{})}),e.jsx(ne,{path:"/book/:slug",element:e.jsx(zt,{})}),e.jsx(ne,{path:"*",element:e.jsx(Gn,{})})]})})})]})})})}),Ut=sessionStorage.getItem("redirect");Ut&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",Ut));Jt.createRoot(document.getElementById("root")).render(e.jsx(Xn,{}));export{rr as M,ke as a,cr as b,or as c,ur as d,dr as e,fr as f,F as g,pr as h,Qs as i,ir as j,ar as l,mr as m,pn as s,lr as u};
