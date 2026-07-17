const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-DFe2xpob.js","assets/vendor-Dso59N_O.js","assets/three-CQO4KQ3J.js","assets/AdminThreeDModelManager-BWfzwcic.js","assets/react-three-DP099Jq1.js","assets/postprocessing-C5EpOQZm.js","assets/motion-C5B2NUSC.js","assets/supabase-BNwldGNI.js","assets/WatchStudio-KIQcbGUF.js","assets/Archive-894Hwue-.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-C8I6djSc.js","assets/Message-D0EBdcqC.js","assets/NotFound-6WqWxgYD.js"])))=>i.map(i=>d[i]);
import{r as e,ay as zn,az as Dn,j as n,aA as tn,aB as nn,aC as rn,aD as an,aE as Fn,aF as sn,aG as on,aH as Un,aI as Vn,aJ as Xn,aK as Yn,aL as cn,aM as Wn,aN as Gn,aO as St,aP as mt,ar as ln,aQ as Hn,aR as Kn,aS as qn,aT as Jn,aU as Qn,aV as je,aW as Zn}from"./vendor-Dso59N_O.js";import{_ as Me,u as er,a as ft,C as tr,S as nr,b as rr,W as ar,c as Nt,d as un,e as sr}from"./react-three-DP099Jq1.js";import{c as ir}from"./supabase-BNwldGNI.js";import{u as xt,a as $e,m as ge,A as vt}from"./motion-C5B2NUSC.js";import{V as ie,k as or,ba as cr,aA as lr,a8 as ur,P as dr,Q as zt,M as jt,aG as dn,Y as mr}from"./three-CQO4KQ3J.js";import"./postprocessing-C5EpOQZm.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function a(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerPolicy&&(d.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?d.credentials="include":l.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(l){if(l.ep)return;l.ep=!0;const d=a(l);fetch(l.href,d)}})();const fr=1,pr=1e6;let wt=0;function gr(){return wt=(wt+1)%Number.MAX_SAFE_INTEGER,wt.toString()}const yt=new Map,Dt=t=>{if(yt.has(t))return;const r=setTimeout(()=>{yt.delete(t),We({type:"REMOVE_TOAST",toastId:t})},pr);yt.set(t,r)},hr=(t,r)=>{switch(r.type){case"ADD_TOAST":return{...t,toasts:[r.toast,...t.toasts].slice(0,fr)};case"UPDATE_TOAST":return{...t,toasts:t.toasts.map(a=>a.id===r.toast.id?{...a,...r.toast}:a)};case"DISMISS_TOAST":{const{toastId:a}=r;return a?Dt(a):t.toasts.forEach(i=>{Dt(i.id)}),{...t,toasts:t.toasts.map(i=>i.id===a||a===void 0?{...i,open:!1}:i)}}case"REMOVE_TOAST":return r.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(a=>a.id!==r.toastId)}}},ct=[];let lt={toasts:[]};function We(t){lt=hr(lt,t),ct.forEach(r=>{r(lt)})}function br({...t}){const r=gr(),a=l=>We({type:"UPDATE_TOAST",toast:{...l,id:r}}),i=()=>We({type:"DISMISS_TOAST",toastId:r});return We({type:"ADD_TOAST",toast:{...t,id:r,open:!0,onOpenChange:l=>{l||i()}}}),{id:r,dismiss:i,update:a}}function xr(){const[t,r]=e.useState(lt);return e.useEffect(()=>(ct.push(r),()=>{const a=ct.indexOf(r);a>-1&&ct.splice(a,1)}),[t]),{...t,toast:br,dismiss:a=>We({type:"DISMISS_TOAST",toastId:a})}}function Be(...t){return zn(Dn(t))}const vr=Vn,mn=e.forwardRef(({className:t,...r},a)=>n.jsx(tn,{ref:a,className:Be("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",t),...r}));mn.displayName=tn.displayName;const wr=Un("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),fn=e.forwardRef(({className:t,variant:r,...a},i)=>n.jsx(nn,{ref:i,className:Be(wr({variant:r}),t),...a}));fn.displayName=nn.displayName;const yr=e.forwardRef(({className:t,...r},a)=>n.jsx(rn,{ref:a,className:Be("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",t),...r}));yr.displayName=rn.displayName;const pn=e.forwardRef(({className:t,...r},a)=>n.jsx(an,{ref:a,className:Be("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",t),"toast-close":"",...r,children:n.jsx(Fn,{className:"h-4 w-4"})}));pn.displayName=an.displayName;const gn=e.forwardRef(({className:t,...r},a)=>n.jsx(sn,{ref:a,className:Be("text-sm font-semibold",t),...r}));gn.displayName=sn.displayName;const hn=e.forwardRef(({className:t,...r},a)=>n.jsx(on,{ref:a,className:Be("text-sm opacity-90",t),...r}));hn.displayName=on.displayName;function kr(){const{toasts:t}=xr();return n.jsxs(vr,{children:[t.map(function({id:r,title:a,description:i,action:l,...d}){return n.jsxs(fn,{...d,children:[n.jsxs("div",{className:"grid gap-1",children:[a&&n.jsx(gn,{children:a}),i&&n.jsx(hn,{children:i})]}),l,n.jsx(pn,{})]},r)}),n.jsx(mn,{})]})}const Er=({...t})=>{const{theme:r="system"}=Xn();return n.jsx(Yn,{theme:r,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})},Sr=Wn,jr=e.forwardRef(({className:t,sideOffset:r=4,...a},i)=>n.jsx(cn,{ref:i,sideOffset:r,className:Be("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...a}));jr.displayName=cn.displayName;const Tr="https://pmpspnvfgkzprgntihtx.supabase.co",_r="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",Ge="book-pages",$a="models-3d",X=ir(Tr,_r,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),Cr=50*1024*1024;function oe(t,r){return t instanceof Error?t:typeof t=="object"&&t&&"message"in t?new Error(String(t.message)):new Error(r)}function Rr(t){const{data:r}=X.storage.from(Ge).getPublicUrl(t);return r.publicUrl}function Nr(t){return{...t,public_url:Rr(t.storage_path)}}function Ir(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function Ar(t){if(t.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const r of t){const a=r.name.toLowerCase(),i=a.endsWith(".jpg")||a.endsWith(".jpeg"),l=r.type==="image/jpeg"||r.type==="";if(!i||!l)throw new Error(`${r.name} is not a JPG/JPEG image.`);if(r.size>Cr)throw new Error(`${r.name} is larger than 50 MB.`)}}function Mr(t){return t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function za(){const{data:t,error:r}=await X.rpc("is_admin");if(r)throw oe(r,"Unable to verify administrator access.");return t===!0}async function bn(){const{data:t,error:r}=await X.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(r)throw oe(r,"Unable to load books.");return t??[]}async function Da(){const{data:t,error:r}=await X.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(r)throw oe(r,"Unable to load the admin book list.");return t??[]}async function Pe(t){const{data:r,error:a}=await X.from("book_pages").select("*").eq("book_id",t).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(a)throw oe(a,"Unable to load the book pages.");return(r??[]).map(Nr)}async function Fa(t){const r=Mr(t.slug);if(!r)throw new Error("The book needs a valid slug.");const{data:a,error:i}=await X.from("books").insert({title:t.title.trim(),slug:r,storage_folder:r,category:t.category,description:t.description?.trim()??"",is_published:t.is_published??!1,is_featured:!1,sort_order:t.sort_order??0}).select("*").single();if(i)throw oe(i,"Unable to create the book.");return a}async function Ua(t,r){const{data:a,error:i}=await X.from("books").update(r).eq("id",t).select("*").single();if(i)throw oe(i,"Unable to save the book.");return a}async function Va(t){const{error:r}=await X.rpc("set_featured_book",{p_book_id:t});if(r)throw oe(r,"Unable to set the featured book.")}async function Xa(t,r,a){const i=[...r].sort((f,S)=>f.name.localeCompare(S.name,void 0,{numeric:!0,sensitivity:"base"}));Ar(i);let d=(await Pe(t.id)).reduce((f,S)=>Math.max(f,S.page_number),0)+1,p=0;for(const f of i){const S=`${t.storage_folder}/${String(d).padStart(4,"0")}-${Ir()}.jpg`,{error:x}=await X.storage.from(Ge).upload(S,f,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(x)throw oe(x,`Unable to upload ${f.name}.`);const{error:g}=await X.from("book_pages").insert({book_id:t.id,storage_path:S,file_name:f.name,page_number:d});if(g)throw await X.storage.from(Ge).remove([S]),oe(g,`Unable to register ${f.name}.`);d+=1,p+=1,a?.(p,i.length)}return Pe(t.id)}async function Or(t){const a=(await Pe(t)).map((d,p)=>({page:d,nextNumber:p+1})).filter(({page:d,nextNumber:p})=>d.page_number!==p).map(({page:d,nextNumber:p})=>X.from("book_pages").update({page_number:p}).eq("id",d.id)),l=(await Promise.all(a)).find(d=>d.error);if(l?.error)throw oe(l.error,"Unable to renumber the pages.")}async function Ya(t){const{error:r}=await X.storage.from(Ge).remove([t.storage_path]);if(r)throw oe(r,"Unable to delete the image from Storage.");const{error:a}=await X.from("book_pages").delete().eq("id",t.id);if(a)throw oe(a,"The image was removed, but its database row remains.");await Or(t.book_id)}async function Wa(t,r,a){const i=r+a;if(r<0||i<0||i>=t.length)return t;const l=t[r],d=t[i],{error:p}=await X.rpc("swap_book_pages",{p_first_page_id:l.id,p_second_page_id:d.id});if(p)throw oe(p,"Unable to reorder the pages.");return Pe(l.book_id)}async function Ga(t){const a=(await Pe(t.id)).map(l=>l.storage_path);if(a.length>0){const{error:l}=await X.storage.from(Ge).remove(a);if(l)throw oe(l,"Unable to delete this book's image folder.")}const{error:i}=await X.from("books").delete().eq("id",t.id);if(i)throw oe(i,"Unable to delete the book record.")}const Pr={a4_long_edge:{width:480,height:679,minWidth:90,maxWidth:600,minHeight:127,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:110,maxWidth:680,minHeight:78,maxHeight:481},square:{width:560,height:560,minWidth:96,maxWidth:620,minHeight:96,maxHeight:620}},Ft=8,Br=8,Ut=360,Lr=42,$r=1,zr=5;function it(t,r,a){return Math.min(a,Math.max(r,t))}function Vt(t,r,a){const i=Math.max(2,r-Ft*2),l=Math.max(1,a-Ft*2),d=t.width/t.height,p=i/2/d,f=Math.max(1,Math.min(l,p,t.maxHeight)),S=Math.max(1,Math.min(f*d,t.maxWidth));return{width:Math.floor(S),height:Math.floor(S/d)}}const Dr=e.forwardRef(function({page:r,isCover:a},i){return n.jsx("div",{ref:i,"data-density":a?"hard":"soft",className:"h-full w-full overflow-hidden bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:n.jsx("img",{src:r.public_url,alt:`Page ${r.page_number}: ${r.file_name}`,draggable:!1,className:"pointer-events-none h-full w-full select-none object-cover object-center"})})});function Fr({book:t,pages:r,initialPage:a=0,bookMotionClassName:i="is-visible",onPageChange:l,onReady:d}){const p=e.useRef(null),f=e.useRef(null),S=e.useRef(t.id),x=e.useRef(0),g=e.useRef(!1),j=e.useRef(!1),$=e.useRef(!1),U=e.useRef(!1),P=e.useRef(null),R=e.useRef({time:0,x:0,y:0,pointerType:""}),V=e.useRef(null),z=e.useRef(null),D=e.useRef([]),A=e.useRef({width:1,height:1}),ne=t.page_format??"a4_long_edge",q=Pr[ne],Y=Math.min(Math.max(0,Math.floor(a)),Math.max(0,r.length-1));S.current!==t.id&&(S.current=t.id,x.current=Y);const[w,O]=e.useState(Y),[G,B]=e.useState(0),[re,ee]=e.useState(!1),[Oe,ye]=e.useState(!1),[M,J]=e.useState(!1),[N,Re]=e.useState(()=>Vt(q,640,480)),h=xt(1),y=xt(0),E=xt(0),Q=e.useCallback(()=>{D.current.forEach(o=>o.stop()),D.current=[]},[]),L=e.useCallback(()=>{const o=x.current===0||x.current>=r.length-1;return{width:N.width*(o?1:2),height:N.height}},[N.height,N.width,r.length]),ke=e.useCallback((o,c,_)=>{const I=A.current,C=L(),se=Math.max(0,(C.width*o-I.width)/2),me=Math.max(0,(C.height*o-I.height)/2);return{x:it(c,-se,se),y:it(_,-me,me)}},[L]),he=e.useCallback((o,c,_,I=h.get(),C=y.get(),se=E.get())=>{const me=A.current,fe=it(o,$r,zr),ve=fe/Math.max(1e-4,I),be=c-me.width/2,pe=_-me.height/2,Te=ke(fe,be-(be-C)*ve,pe-(pe-se)*ve);return h.set(fe),y.set(Te.x),E.set(Te.y),{scale:fe,...Te}},[ke,y,E,h]),H=e.useCallback(()=>{const o=A.current,c=L(),_=Math.min((o.width-24)/Math.max(1,c.width),(o.height-24)/Math.max(1,c.height));return it(_,1.25,3.6)},[L]),le=e.useCallback((o,c,_)=>{Q(),z.current&&(window.clearTimeout(z.current),z.current=null);const I={width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)};A.current=I,g.current=!0,j.current=!1,ye(!1),ee(!0),h.set(1),y.set(0),E.set(0);const C=he(H(),o,c,1,0,0);return _&&(h.set(1),y.set(0),E.set(0),window.requestAnimationFrame(()=>{D.current=[$e(h,C.scale,{type:"spring",stiffness:260,damping:24,mass:.74}),$e(y,C.x,{type:"spring",stiffness:280,damping:27,mass:.72}),$e(E,C.y,{type:"spring",stiffness:280,damping:27,mass:.72})]})),C},[H,y,E,Q,he,h]),ue=e.useCallback(()=>{!g.current||j.current||(Q(),j.current=!0,ye(!0),D.current=[$e(h,1,{type:"spring",stiffness:330,damping:28,mass:.7}),$e(y,0,{type:"spring",stiffness:330,damping:28,mass:.7}),$e(E,0,{type:"spring",stiffness:330,damping:28,mass:.7})],z.current=window.setTimeout(()=>{g.current=!1,j.current=!1,ee(!1),ye(!1),h.set(1),y.set(0),E.set(0),z.current=null},430))},[y,E,Q,h]),Z=e.useCallback(o=>{window.requestAnimationFrame(()=>{const c=o??p.current?.pageFlip();if(!c)return;const _=c.getCurrentPageIndex(),I=c.getBoundsRect();x.current=_,O(_),l?.(_),c.getOrientation()!=="landscape"?B(0):_===0?B(-(I.pageWidth/2)):_>=r.length-1?B(I.pageWidth/2):B(0)})},[l,r.length]);e.useLayoutEffect(()=>{const o=f.current;if(!o)return;const c=()=>{const I=window.getComputedStyle(o),C=Number.parseFloat(I.paddingLeft)+Number.parseFloat(I.paddingRight),se=Number.parseFloat(I.paddingTop)+Number.parseFloat(I.paddingBottom),me=Math.max(1,o.clientWidth-C),fe=Math.max(1,o.clientHeight-se);if(A.current={width:me,height:fe},!g.current){const ve=Vt(q,me,fe);Re(be=>be.width===ve.width&&be.height===ve.height?be:ve),J(!0)}Z()};c();const _=new ResizeObserver(c);return _.observe(o),window.addEventListener("resize",c),()=>{_.disconnect(),window.removeEventListener("resize",c)}},[re,q,Z]),e.useEffect(()=>{x.current=Y,O(Y),B(0),g.current=!1,j.current=!1,ee(!1),ye(!1),h.set(1),y.set(0),E.set(0),R.current.time=0,P.current=null,U.current=!1},[t.id,y,E,Y,h]),e.useEffect(()=>{if(!re)return;const o=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=o}},[re]);const K=e.useCallback(()=>{V.current&&(window.clearTimeout(V.current),V.current=null)},[]),de=e.useCallback(o=>{if(j.current||!o.isPrimary||o.pointerType==="mouse"&&o.button!==0)return;const c=window.performance.now(),_=R.current,I=c-_.time>0&&c-_.time<Ut&&_.pointerType===o.pointerType&&Math.hypot(o.clientX-_.x,o.clientY-_.y)<Lr,C=g.current,se=o.currentTarget.getBoundingClientRect();I?(K(),R.current.time=0,U.current=!0,Q()):U.current=C,P.current={pointerId:o.pointerId,pointerType:o.pointerType,mode:I?"zoom-slider":C?"pan":"page",startedZoomed:C,startX:o.clientX,startY:o.clientY,startPanX:y.get(),startPanY:E.get(),startScale:h.get(),anchorX:o.clientX,anchorY:o.clientY,stageCenterX:se.left+se.width/2,moved:!1}},[K,y,E,Q,h]),ae=e.useCallback((o,c)=>{K(),V.current=window.setTimeout(()=>{if(V.current=null,g.current||$.current||P.current)return;const _=p.current?.pageFlip();o<c?_?.flipPrev():_?.flipNext()},Ut)},[K]),Ee=e.useCallback(o=>{const c=P.current;if(!c||c.pointerId!==o.pointerId||(Math.hypot(o.clientX-c.startX,o.clientY-c.startY)>Br&&(c.moved=!0),c.mode==="page"))return;if(o.preventDefault(),c.mode==="pan"){if(!c.moved)return;const C=ke(h.get(),c.startPanX+o.clientX-c.startX,c.startPanY+o.clientY-c.startY);y.set(C.x),E.set(C.y);return}if(!c.moved)return;if(!g.current){const C=le(c.anchorX,c.anchorY,!1);c.startScale=C.scale,c.startPanX=C.x,c.startPanY=C.y}const I=c.startScale*Math.exp((c.startY-o.clientY)*.006);he(I,c.anchorX,c.anchorY,c.startScale,c.startPanX,c.startPanY)},[ke,le,y,E,he,h]),T=e.useCallback(o=>{const c=P.current;if(!(!c||c.pointerId!==o.pointerId)){if(P.current=null,U.current=!1,o.type==="pointercancel"){R.current.time=0;return}if(c.mode==="zoom-slider"){c.moved?R.current.time=0:c.startedZoomed?ue():le(c.anchorX,c.anchorY,!0);return}if(c.moved){R.current.time=0,K();return}R.current={time:window.performance.now(),x:o.clientX,y:o.clientY,pointerType:c.pointerType},c.mode==="page"&&ae(o.clientX,c.stageCenterX)}},[K,ue,le,ae]);e.useEffect(()=>(window.addEventListener("pointermove",Ee,{passive:!1}),window.addEventListener("pointerup",T),window.addEventListener("pointercancel",T),()=>{window.removeEventListener("pointermove",Ee),window.removeEventListener("pointerup",T),window.removeEventListener("pointercancel",T)}),[T,Ee]),e.useEffect(()=>()=>{K(),Q(),z.current&&window.clearTimeout(z.current)},[K,Q]);const Ne=e.useCallback(o=>{if(!g.current||j.current)return;o.preventDefault(),o.stopPropagation(),Q();const c=o.currentTarget.getBoundingClientRect(),_=Math.exp(-o.deltaY*.0015);he(h.get()*_,o.clientX-c.left,o.clientY-c.top)},[Q,he,h]);if(e.useEffect(()=>{r.length===0&&d?.(t.id)},[t.id,d,r.length]),r.length===0)return n.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."});const Ie=n.jsx("div",{className:`public-book-stage ${i} ${re?"is-magnified":""} ${Oe?"is-zoom-closing":""}`,children:n.jsx("div",{ref:f,className:`public-book-viewport relative flex items-center justify-center overflow-hidden ${re?"is-magnified cursor-grab active:cursor-grabbing":"cursor-default"}`,"data-page":w,"data-zoomed":re?"true":"false",onPointerDownCapture:de,onMouseDownCapture:o=>{(U.current||g.current)&&(o.preventDefault(),o.stopPropagation())},onTouchStartCapture:o=>{(U.current||g.current)&&(o.preventDefault(),o.stopPropagation())},onWheel:Ne,children:n.jsx(ge.div,{className:"flex h-full w-full items-center justify-center",style:{x:y,y:E,scale:h,transformOrigin:"50% 50%",willChange:"transform"},children:n.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${G}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform",pointerEvents:re?"none":"auto"},children:M&&n.jsx(Gn,{ref:p,className:"mx-auto",style:{margin:"0 auto"},width:N.width,height:N.height,minWidth:1,maxWidth:q.maxWidth,minHeight:1,maxHeight:q.maxHeight,size:"fixed",startPage:S.current===t.id?x.current:Y,drawShadow:!0,flippingTime:850,usePortrait:!1,startZIndex:0,autoSize:!1,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!1,disableFlipByClick:!0,onInit:o=>{x.current=o.data.page,O(o.data.page),l?.(o.data.page),Z(o.object),d?.(t.id)},onFlip:o=>{x.current=o.data,O(o.data),l?.(o.data),Z(o.object)},onChangeState:o=>{const c=o.data==="user_fold"||o.data==="flipping";$.current=c,c&&K()},onChangeOrientation:o=>{Z(o.object)},children:r.map((o,c)=>n.jsx(Dr,{page:o,isCover:c===0||c===r.length-1},o.id))},`${t.id}-${ne}-${N.width}x${N.height}`)})})})});return n.jsxs("div",{className:"flex w-full flex-col items-center",children:[re&&typeof document<"u"?St.createPortal(Ie,document.body):Ie,n.jsx("div",{className:`public-book-meta public-book-title item-title flex items-center gap-8 text-[18px] ${i}`,children:n.jsx("span",{className:"max-w-[60vw] truncate",children:t.title})}),t.description&&n.jsx("div",{className:`public-book-meta public-book-description item-description flex items-center gap-8 text-[18px] ${i}`,children:n.jsx("span",{className:"max-w-[60vw] truncate",children:t.description})})]})}const xn="publicBookSession",Tt="publicBookReturningToIndex",_t="publicBookReturningToIntro";function It(){if(typeof window>"u")return null;try{const t=window.sessionStorage.getItem(xn);if(!t)return null;const r=JSON.parse(t);return typeof r.slug!="string"||r.slug.length===0||typeof r.pageIndex!="number"||!Number.isFinite(r.pageIndex)?null:{slug:r.slug,pageIndex:Math.max(0,Math.floor(r.pageIndex))}}catch{return null}}function Xe(t,r){if(typeof window>"u")return;const a={slug:t,pageIndex:Math.max(0,Math.floor(r))};try{window.sessionStorage.setItem(xn,JSON.stringify(a))}catch{}}const vn=()=>Me(()=>import("./AdminPortal-DFe2xpob.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),Ur=e.lazy(vn),Vr=()=>Me(()=>import("./WatchStudio-KIQcbGUF.js"),__vite__mapDeps([8,1,2,4,5,3,7,6])),ot=()=>Vr().then(t=>t.preloadWatchStudioExperience()),ut=1120,wn=180,At=140,ze=ut+At,Xr=wn+ze,dt=920,Xt=120,Yt=dt+At,Ct=1180,Yr=1800,Wt="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";function Wr({text:t,speed:r=100,revealSpeed:a=55}){const i=e.useRef(null),l=e.useRef(null),d=e.useRef(0),p=e.useRef(!1),f=e.useCallback(()=>{l.current!==null&&(window.clearInterval(l.current),l.current=null)},[]),S=e.useCallback(()=>Wt[Math.floor(Math.random()*Wt.length)],[]),x=e.useCallback(($=0)=>t.split("").map((U,P)=>U===" "?" ":P<$?U:S()).join(""),[S,t]),g=e.useCallback(()=>{f(),p.current=!1,i.current&&(l.current=window.setInterval(()=>{!i.current||p.current||(i.current.textContent=x())},r))},[f,x,r]),j=e.useCallback(()=>{f(),p.current=!0,d.current=0,i.current&&(l.current=window.setInterval(()=>{d.current+=1,i.current&&(i.current.textContent=x(d.current)),d.current>=t.length&&(f(),i.current&&(i.current.textContent=t))},a))},[f,x,a,t]);return e.useEffect(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches?(i.current&&(i.current.textContent=t),f):(g(),f),[f,g,t]),n.jsx("span",{className:"public-login-scramble",onMouseEnter:j,onMouseLeave:g,"aria-label":t,children:n.jsx("span",{ref:i,"aria-hidden":"true",children:t})})}const Gr=`
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

.public-book-stage.is-magnified {
  position: fixed;
  inset: 0;
  z-index: 220;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  transform: none !important;
  animation: none !important;
  opacity: 1 !important;
  background: rgb(255 255 255 / 0.98);
  overscroll-behavior: none;
}

.public-book-stage.is-magnified .public-book-viewport {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  padding: 0;
  contain: none;
  touch-action: none;
  overscroll-behavior: none;
}

.public-book-stage.is-zoom-closing {
  pointer-events: none;
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
  animation: public-book-background-mix-in ${Ct}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${Ct}ms cubic-bezier(0.4, 0, 0.2, 1) both;
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
  animation-duration: ${ut}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-meta.is-fast.is-entering,
.public-book-meta.is-fast.is-leaving {
  animation-duration: ${dt}ms;
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
  animation-duration: ${ut}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-stage.is-fast.is-entering,
.public-book-stage.is-fast.is-leaving {
  animation-duration: ${dt}ms;
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

.public-login-scramble {
  display: inline-flex;
  width: 5ch;
  justify-content: center;
  white-space: pre;
  letter-spacing: 0;
}

@media (prefers-reduced-motion: reduce) {
  .public-book-background-layer.is-current,
  .public-book-background-layer.is-previous {
    animation-duration: 1ms;
  }
}


`,Hr={objects:"OBJ",graphics:"GRPH",concepts:"CNCP"};function kt(t){return t instanceof Error?t.message:"Unable to load the books."}function Ce(t){return new Promise(r=>{window.setTimeout(r,t)})}function Gt(){return new Promise(t=>{window.requestAnimationFrame(()=>t())})}function Kr(t){const r=a=>Number.isFinite(a)?Math.min(255,Math.max(0,Math.round(a??255))):255;return`rgb(${r(t?.background_r)} ${r(t?.background_g)} ${r(t?.background_b)})`}function qr(t){return new Promise(r=>{const a=new Image;let i=!1;const l=()=>{i||(i=!0,window.clearTimeout(d),r())},d=window.setTimeout(l,5e3);a.onload=()=>{if(typeof a.decode=="function"){a.decode().catch(()=>{}).finally(l);return}l()},a.onerror=l,a.src=t})}async function Ht(t){await Promise.all(t.slice(0,2).map(r=>qr(r.public_url)))}function Jr({initialSlug:t,onBack:r,onLogin:a,onThreeD:i,onBookChange:l}){const[d,p]=e.useState([]),[f,S]=e.useState(null),[x,g]=e.useState([]),[j,$]=e.useState(!0),[U,P]=e.useState(!1),[R,V]=e.useState(null),[z,D]=e.useState(!1),[A,ne]=e.useState(!1),[q,Y]=e.useState("outside"),[w,O]=e.useState(!1),[G,B]=e.useState("outside"),[re,ee]=e.useState(!1),[Oe,ye]=e.useState(0),[M,J]=e.useState(!1),[N,Re]=e.useState(!1),h=e.useRef(!0),y=e.useRef(!1),E=e.useRef(null),Q=e.useRef(null),L=e.useRef(null),ke=e.useRef(!1),he=e.useRef(It()),H=e.useRef(null),le=e.useRef(0),ue=e.useRef("rgb(255 255 255)"),Z=e.useRef(null),K=e.useRef(null),de=e.useRef(null),[ae,Ee]=e.useState([{id:0,color:ue.current}]),T=e.useMemo(()=>d.find(u=>u.id===f)??null,[d,f]);e.useEffect(()=>{const u=Kr(T);if(u===ue.current)return;ue.current=u;const v={id:++le.current,color:u};Ee(k=>[k[k.length-1],v]),Z.current&&window.clearTimeout(Z.current),Z.current=window.setTimeout(()=>{Ee(k=>k.slice(-1)),Z.current=null},Ct)},[T,T?.background_b,T?.background_g,T?.background_r]);const Ne=e.useCallback(u=>{if(K.current===u)return Promise.resolve();const v=de.current;return v&&v.finish(),new Promise(k=>{let te=!1;const xe=()=>{te||(te=!0,window.clearTimeout(_e),de.current?.finish===xe&&(de.current=null),k())},_e=window.setTimeout(xe,Yr);de.current={bookId:u,finish:xe,timeout:_e}})},[]),Ie=e.useCallback(u=>{K.current=u;const v=de.current;v?.bookId===u&&v.finish()},[]);e.useEffect(()=>{E.current=f},[f]);const o=e.useCallback(()=>{H.current&&(window.clearTimeout(H.current),H.current=null)},[]),c=e.useCallback((u=!1)=>{o();const v=u?Xt:wn,k=u?dt:ut;ee(u),B("outside"),H.current=window.setTimeout(()=>{h.current&&(B("entering"),H.current=window.setTimeout(()=>{h.current&&(B("visible"),ee(!1),H.current=null)},k+At))},v)},[o]);e.useEffect(()=>{h.current=!0;const u=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{h.current&&O(!0)})});return()=>{h.current=!1,window.cancelAnimationFrame(u),H.current&&window.clearTimeout(H.current),Z.current&&window.clearTimeout(Z.current),de.current&&(window.clearTimeout(de.current.timeout),de.current.finish())}},[]),e.useEffect(()=>{const u=navigator.connection;if(u?.saveData||u?.effectiveType==="slow-2g"||u?.effectiveType==="2g")return;const v=()=>{ot()},k=window;if(k.requestIdleCallback){const xe=k.requestIdleCallback(v,{timeout:2500});return()=>k.cancelIdleCallback?.(xe)}const te=window.setTimeout(v,1400);return()=>window.clearTimeout(te)},[]),e.useEffect(()=>{let u=!0;return(async()=>{$(!0),V(null);try{const k=await bn();if(!u)return;p(k)}catch(k){u&&V(kt(k))}finally{u&&$(!1)}})(),()=>{u=!1}},[]);const _=e.useCallback(async u=>{if(!ke.current){ke.current=!0,P(!0),V(null);try{const v=await Pe(u.id);if(await Ht(v),!h.current)return;const k=he.current,te=k?.slug===u.slug?Math.min(k.pageIndex,Math.max(0,v.length-1)):0;K.current=null;const xe=Ne(u.id);if(St.flushSync(()=>{ee(!1),B("outside"),S(u.id),g(v),ye(te)}),Xe(u.slug,te),P(!1),await xe,!h.current)return;c()}catch(v){h.current&&(V(kt(v)),P(!1))}finally{ke.current=!1}}},[c,Ne]),I=e.useCallback(async(u,v)=>{if(h.current){if(y.current){Q.current={book:u,updateRoute:v},D(!1);return}if(E.current===u.id){D(!1);return}y.current=!0,J(!0),P(!0),D(!1),V(null);try{o(),ee(!0),B("leaving");const k=Pe(u.id).then(async _e=>(await Ht(_e),_e)),[te]=await Promise.all([k,Ce(Yt)]);if(!h.current)return;K.current=null;const xe=Ne(u.id);if(St.flushSync(()=>{ee(!0),B("outside"),S(u.id),E.current=u.id,g(te),ye(0),P(!1)}),he.current={slug:u.slug,pageIndex:0},Xe(u.slug,0),v&&l?.(u.slug),await Gt(),await Gt(),await xe,await Ce(Xt),!h.current)return;B("entering"),await Ce(Yt),h.current&&(B("visible"),ee(!1))}catch(k){h.current&&(V(kt(k)),P(!1),ee(!1),B("visible"))}finally{if(y.current=!1,h.current){J(!1);const k=Q.current;Q.current=null,k&&k.book.id!==E.current&&window.setTimeout(()=>{L.current?.(k.book,k.updateRoute)},24)}}}},[o,l,Ne]);e.useEffect(()=>{L.current=(u,v)=>{I(u,v)}},[I]),e.useEffect(()=>{if(j||d.length===0)return;const u=t?d.find(v=>v.slug===t):null;if(!f){const v=d.find(te=>te.is_featured),k=u??v??d[0];_(k);return}u&&u.id!==f&&!y.current&&I(u,!1)},[d,t,_,j,f,I]);const C=e.useCallback(async()=>{!A||y.current||(y.current=!0,J(!0),Y("leaving"),await Ce(ze),h.current&&(ne(!1),Y("outside"),c(),await Ce(Xr),y.current=!1,h.current&&J(!1)))},[A,c]);e.useEffect(()=>{const u=v=>{if(v.key==="Escape"){if(A){C();return}D(!1)}};return window.addEventListener("keydown",u),()=>{window.removeEventListener("keydown",u)}},[C,A]);const se=async()=>{if(!y.current){if(D(!1),A){await C();return}y.current=!0,J(!0),vn(),!(T&&(o(),B("leaving"),await Ce(ze),!h.current))&&(ne(!0),Y("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{h.current&&Y("entering")})}),await Ce(ze),y.current=!1,h.current&&(Y("visible"),J(!1)))}},me=async()=>{if(A){await C();return}y.current||(y.current=!0,J(!0),D(!1),O(!1),o(),B("leaving"),T&&Xe(T.slug,Oe),window.sessionStorage.setItem(Tt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.setItem(_t,"true"),window.sessionStorage.removeItem("returnFromExample"),await Ce(ze),h.current&&r())},fe=async()=>{if(y.current||A)return;y.current=!0,J(!0),Re(!0),D(!1),O(!1),o(),B("leaving"),T&&Xe(T.slug,Oe);const u=ot().catch(()=>null);await Promise.all([Ce(ze),u]),h.current&&i()},ve=u=>{I(u,!0)},be=e.useCallback(u=>{ye(u),T&&(he.current={slug:T.slug,pageIndex:u},Xe(T.slug,u))},[T]),Te=`${G==="entering"?"is-entering":G==="visible"?"is-visible":G==="leaving"?"is-leaving":"is-outside"}${re?" is-fast":""}`,De=q==="entering"?"is-entering":q==="visible"?"is-visible":q==="leaving"?"is-leaving":"is-outside",Ae=w?"is-visible":M||N?"is-leaving":"is-outside";return n.jsxs("div",{className:"public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:ae[0]?.color??"rgb(255 255 255)"},children:[n.jsx("style",{children:Gr}),n.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:ae.map((u,v)=>n.jsx("div",{className:`public-book-background-layer ${v===ae.length-1?"is-current":"is-previous"}`,style:{backgroundColor:u.color}},u.id))}),z&&!A&&n.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-transparent",onClick:()=>D(!1)}),n.jsxs("div",{className:"public-book-nav fixed z-[170] flex items-center",children:[n.jsx("div",{className:`public-nav-item ${Ae}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:n.jsx("button",{type:"button",onClick:()=>void me(),disabled:M,className:"public-book-nav-icon flex items-center justify-center rounded-full border border-black/35 bg-transparent transition-transform duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40","aria-label":A?"Back to book":"Back",title:A?"Back to book":"Back",children:n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-globe-europe-africa",viewBox:"0 0 16 16","aria-hidden":"true",children:n.jsx("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.81.81 0 0 1 1.034-.275.81.81 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34q.118.04.243.054c.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.33.33 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501"})})})}),n.jsx("div",{className:`public-nav-item ${Ae}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:n.jsx("button",{type:"button",onClick:()=>D(u=>!u),disabled:A,className:`public-book-nav-icon flex items-center justify-center rounded-full border bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${z?"border-black text-black":"border-black/35 text-black"}`,"aria-label":"Choose a book","aria-expanded":z,"aria-controls":"public-book-balloon",title:"Choose a book",children:n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-book",viewBox:"0 0 16 16",children:n.jsx("path",{d:"M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"})})})}),n.jsx("div",{className:`public-nav-item ${Ae}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:n.jsx("button",{type:"button",onClick:()=>void se(),disabled:M,className:`public-book-nav-text flex items-center justify-center rounded-full border bg-transparent text-[13px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${A?"border-black text-black":"border-black/35 text-black"}`,"aria-expanded":A,"aria-label":"Login",children:n.jsx(Wr,{text:"LOGIN"})})}),n.jsx("div",{className:`public-nav-item ${Ae}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:n.jsx("button",{type:"button",onClick:()=>void fe(),onPointerEnter:()=>void ot(),onFocus:()=>void ot(),disabled:M||A,className:"public-book-nav-text flex items-center justify-center rounded-full border border-black/35 bg-transparent text-[13px] text-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40",children:"3D"})})]}),n.jsxs("aside",{id:"public-book-balloon",className:`public-book-balloon fixed left-4 top-[76px] z-[150] flex max-h-[72vh] w-[min(88vw,390px)] origin-top-left flex-col bg-white/95 p-5 shadow-[0_10px_65px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] sm:left-[74px] sm:top-[82px] ${z&&!A?"pointer-events-auto scale-100 opacity-100 blur-0":"pointer-events-none scale-0 opacity-0 blur-[10px]"}`,"aria-hidden":!z||A,children:[n.jsx("div",{className:"absolute -top-2 left-[46px] h-4 w-4 rotate-45 border-l border-t border-black/25 bg-white"}),n.jsxs("div",{className:"relative mb-4 flex items-start justify-between gap-5",children:[n.jsx("div",{children:n.jsx("h1",{className:"mt-1 text-[22px] font-light",children:"ARCHIVE"})}),n.jsx("button",{type:"button",onClick:()=>D(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95","aria-label":"Close book list",children:n.jsx("span",{"aria-hidden":"true",children:"×"})})]}),n.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto border-t border-black/15",children:j?n.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"..."}):d.length===0?n.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):d.map(u=>{const v=u.id===f;return n.jsxs("button",{type:"button",onClick:()=>ve(u),className:`grid w-full grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-all duration-300 ${v?"translate-x-1 text-black":"text-black/60 hover:translate-x-1 hover:text-black"}`,children:[n.jsx("span",{className:"text-[12px] tracking-wide",children:Hr[u.category]}),n.jsxs("span",{className:"min-w-0",children:[n.jsx("span",{className:"block truncate text-[16px]",children:u.title}),u.description&&n.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/45",children:u.description})]}),n.jsx("span",{className:"flex min-w-[18px] justify-end text-[13px]",children:u.is_featured?"*":v?">":""})]},u.id)})})]}),n.jsx("div",{className:"public-book-label-wrap pointer-events-none fixed inset-x-0 top-5 z-[100] flex justify-center px-[230px] sm:top-7",children:T&&n.jsx("p",{className:`public-book-label max-w-full truncate text-center text-[13px] tracking-[0.12em] text-black/55 ${Ae}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:T.is_featured?"FEATURED - ":""})}),n.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden px-2 sm:px-5",children:j||U&&!T?n.jsx("div",{className:`public-route-message ${w?"is-visible":"is-outside"}`,children:"..."}):R?n.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${w?"is-visible":"is-outside"}`,children:R}):d.length===0?n.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${w?"is-visible":"is-outside"}`,children:"No books are public yet."}):T?n.jsx("div",{className:"h-full w-full",children:n.jsx("div",{className:`public-book-surface flex h-full w-full items-center justify-center ${A?"is-login-muted":""}`,children:n.jsx(Fr,{book:T,pages:x,initialPage:Oe,bookMotionClassName:Te,onPageChange:be,onReady:Ie},T.id)})}):null}),A&&n.jsx("div",{className:`public-login-stage fixed inset-0 z-[130] overflow-hidden bg-white ${De}`,"aria-hidden":q==="outside"||q==="leaving",children:n.jsx(e.Suspense,{fallback:null,children:n.jsx(Ur,{embedded:!0,surfaceReady:q==="entering"||q==="visible",onBack:()=>void C()})})})]})}const yn=e.createContext(void 0),Qr=({children:t})=>{const[r,a]=e.useState(!1),i=()=>{a(!r)};return e.useEffect(()=>{r?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[r]),n.jsx(yn.Provider,{value:{isDark:r,toggleTheme:i},children:t})},Ha=()=>{const t=e.useContext(yn);if(t===void 0)throw new Error("useTheme must be used within a ThemeProvider");return t},Kt="/assets/WolfyLight-Bs10J6iU.gif",Zr=100,ea=500,ta=14e3,Et=400,na=({onComplete:t})=>{const[r,a]=e.useState(!1),[i,l]=e.useState(!1),[d,p]=e.useState(!1),[f,S]=e.useState(!1),[x,g]=e.useState({}),[j,$]=e.useState(0),[U,P]=e.useState(!0),R=e.useRef({}),V=e.useRef(null),z=e.useRef(!1),D=e.useRef(!1),{progress:A}=er();e.useEffect(()=>{let w;const O=()=>{$(G=>{const B=A-G,re=Math.max(B*.1,B>0?.5:-.5),ee=Math.abs(B)<.5?A:G+re;return ee>=100&&setTimeout(()=>P(!1),500),Math.min(100,Math.max(0,ee))}),w=requestAnimationFrame(O)};return w=requestAnimationFrame(O),()=>cancelAnimationFrame(w)},[A]),e.useEffect(()=>{const w=window.matchMedia("(prefers-reduced-motion: reduce)");D.current=w.matches;const O=()=>D.current=w.matches;return w.addEventListener?.("change",O),()=>w.removeEventListener?.("change",O)},[]),e.useEffect(()=>{const w=new Image;w.src=Kt;const O=()=>g({w:w.naturalWidth||400,h:w.naturalHeight||400});w.decode?.().then(()=>{O(),a(!0)}).catch(()=>{w.onload=()=>{O(),a(!0)}})},[]);const ne=e.useCallback(()=>{if(z.current)return;if(D.current){z.current=!0,t();return}S(!0);const w=V.current;let O=!1;const G=()=>{O||(O=!0,z.current=!0,t())};if(w){const B=()=>{w.removeEventListener("animationend",B),R.current.fallback&&clearTimeout(R.current.fallback),G()};w.addEventListener("animationend",B,{once:!0}),R.current.fallback=window.setTimeout(G,Et+120)}else R.current.fallback=window.setTimeout(G,Et+50)},[t]);e.useEffect(()=>{if(!r)return;const w=R.current;return D.current?(l(!0),p(!0),w.auto=window.setTimeout(()=>ne(),800)):(w.entry=window.setTimeout(()=>l(!0),Zr),w.allowExit=window.setTimeout(()=>p(!0),ea),w.auto=window.setTimeout(()=>ne(),ta)),()=>{Object.values(w).forEach(O=>O&&clearTimeout(O))}},[r,ne]);const q=()=>{(d||D.current)&&ne()},Y=i?f?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return n.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${z.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:q,children:[n.jsxs("div",{className:`relative ${Y}`,ref:V,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[n.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[n.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),n.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),n.jsx("img",{src:Kt,alt:"Loading wolf",width:x.w||800,height:x.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),U&&n.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${j>=100?"opacity-0":"opacity-100"}`,children:[Math.round(j),"%"]}),n.jsx("style",{children:`
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
        .animate-elastic-shrink { transform-origin: 50% 50%; animation: elastic-shrink ${Et}ms ease-in forwards; }
      `})]})},ce={};typeof window<"u"&&(window.addEventListener("keydown",t=>{ce[t.key.toLowerCase()]=!0}),window.addEventListener("keyup",t=>{ce[t.key.toLowerCase()]=!1}));const kn={current:null},Ye={center:new ie(0,0,-300),radius:60},Rt=15,ra=38,aa=95,qt=[500,200,-300],sa=new ie(500,150,-1e3).normalize(),ia="#fff4d6",oa="#0b1e3a",ca="#0a2a6a";function la(t,r,a){let i=r-t;for(;i<-Math.PI;)i+=Math.PI*2;for(;i>Math.PI;)i-=Math.PI*2;return t+i*a}function ua(){const t=e.useRef(null),r=rr(lr,"/waternormals.jpeg");r.wrapS=r.wrapT=ur;const a=e.useMemo(()=>new dr(1e4,1e4),[]),i=e.useMemo(()=>new ar(a,{textureWidth:512,textureHeight:512,waterNormals:r,sunDirection:sa.clone(),sunColor:new zt("#fff2cc"),waterColor:new zt(ca),distortionScale:10.7,fog:!1}),[a,r]);return i.material.uniforms.waterColor.value.convertSRGBToLinear(),e.useEffect(()=>()=>{a.dispose(),i.material.dispose()},[a,i]),Nt((l,d)=>{t.current&&(t.current.material.uniforms.time.value+=d)}),n.jsx("primitive",{object:i,ref:t,"rotation-x":-Math.PI/2})}function da(){const{scene:t}=ft("/island.gltf"),r=e.useMemo(()=>{const a=t.clone(!0);return a.traverse(i=>{if(!(i instanceof jt))return;const d=(Array.isArray(i.material)?i.material:[i.material]).map(p=>{const f=p.clone();return f instanceof dn&&(f.roughness=Math.max(f.roughness,.82),f.metalness=Math.min(f.metalness,.02),f.envMapIntensity=.08),f.needsUpdate=!0,f});i.material=Array.isArray(i.material)?d:d[0],i.castShadow=!0,i.receiveShadow=!0}),a},[t]);return e.useEffect(()=>()=>{r.traverse(a=>{if(!(a instanceof jt))return;(Array.isArray(a.material)?a.material:[a.material]).forEach(l=>l.dispose())})},[r]),n.jsx("primitive",{object:r,scale:100,position:[0,-5,-300]})}function ma(){const t=e.useRef(null),{camera:r}=un(),{scene:a}=ft("/wolfy.glb"),i=e.useMemo(()=>sr.clone(a),[a]),l=e.useRef(new ie),d=e.useRef(new ie),p=e.useRef(0),f=e.useRef(!0),S=e.useRef(new ie(0,0,1));return e.useEffect(()=>{i.traverse(x=>{x instanceof jt&&x.material instanceof dn&&(x.material=x.material.clone(),x.material.roughness=.42,x.material.metalness=.05,x.material.envMapIntensity=.35,x.castShadow=!0,x.receiveShadow=!0)})},[i]),e.useEffect(()=>{kn.current=t.current;const x=j=>{const{x:$,z:U}=j.detail;l.current.set($,0,U)},g=()=>{f.current&&(f.current=!1,p.current=ra)};return window.addEventListener("explore-joystick",x),window.addEventListener("explore-jump",g),()=>{window.removeEventListener("explore-joystick",x),window.removeEventListener("explore-jump",g)}},[]),Nt((x,g)=>{if(!t.current)return;const j=new ie(l.current.x+(ce.arrowright||ce.d?1:0)-(ce.arrowleft||ce.a?1:0),0,l.current.z+(ce.arrowup||ce.w?1:0)-(ce.arrowdown||ce.s?1:0));j.lengthSq()<.01&&j.set(0,0,0);const $=new ie;r.getWorldDirection($),$.y=0,$.normalize();const U=new ie().crossVectors($,new ie(0,1,0)).normalize(),P=new ie().addScaledVector($,j.z).addScaledVector(U,j.x);P.lengthSq()>1e-4&&P.normalize(),d.current.lerp(P.multiplyScalar(100),g*6);const R=t.current.position.clone().addScaledVector(d.current,g);if(p.current-=aa*Math.min(g,.05),R.y+=p.current*Math.min(g,.05),R.y<=Rt&&(R.y=Rt,p.current=0,f.current=!0),R.distanceTo(Ye.center)<Ye.radius+2){const z=R.clone().sub(Ye.center).normalize();R.copy(Ye.center.clone().add(z.multiplyScalar(Ye.radius+2))),d.current.multiplyScalar(.2)}if(t.current.position.copy(R),j.lengthSq()>.01){const z=P.clone();j.z<-.2&&z.copy($),S.current.lerp(z,.15).normalize();const D=Math.atan2(S.current.x,S.current.z);t.current.rotation.y=la(t.current.rotation.y,D,.15)}t.current.userData.joyX=l.current.x}),n.jsx("primitive",{ref:t,object:i,scale:10,position:[0,15,0],rotation:[0,Math.PI,0]})}function fa(){const{camera:t}=un(),r=e.useRef(0),a=e.useRef(0),i=e.useRef(!1);return e.useEffect(()=>{const l=d=>{i.current=d.detail.enabled};return window.addEventListener("explore-mode",l),()=>window.removeEventListener("explore-mode",l)},[]),Nt((l,d)=>{const p=kn.current;if(!p)return;a.current+=d*(i.current?1:-1),a.current=mr.clamp(a.current,0,1);const f=a.current*a.current*(3-2*a.current),x=(ce.arrowright||ce.d?1:0)-(ce.arrowleft||ce.a?1:0)+(p.userData?.joyX??0);Math.abs(x)>.05&&(r.current-=x*d*2.5);const g=new ie(0,22,70);g.applyAxisAngle(new ie(0,1,0),r.current);const j=p.position.clone();j.y=Rt;const $=j.add(g),P=new ie(0,20,100).add(new ie(Math.sin(a.current*Math.PI)*20,0,0)).lerp($,f);t.position.lerp(P,.12);const R=new ie(0,5,0),V=p.position.clone();V.y+=6,t.lookAt(R.lerp(V,f))}),null}function pa(){const t=e.useRef(null),r=e.useRef(!1);return e.useEffect(()=>{const a=new Audio("/Ocean.mp3");a.loop=!0,a.preload="auto",a.volume=0,t.current=a;const i=(S,x=2e3)=>{if(!t.current)return;const g=t.current,j=g.volume,$=performance.now(),U=P=>{const R=Math.min((P-$)/x,1);g.volume=j+(S-j)*R,R<1?requestAnimationFrame(U):S===0&&(g.pause(),g.currentTime=0)};requestAnimationFrame(U)},l=async()=>{r.current=!0;try{a.paused&&await a.play(),i(.14,2400)}catch{}},d=()=>{r.current=!1,i(0,1800)},p=S=>{S.detail.active?l():d()},f=()=>{r.current&&l()};return window.addEventListener("skyocean-audio",p),window.addEventListener("pointerdown",f,{passive:!0}),window.addEventListener("keydown",f),document.getElementById("global-sky-ocean-bg")?.getAttribute("data-audio-active")==="1"&&l(),()=>{window.removeEventListener("skyocean-audio",p),window.removeEventListener("pointerdown",f),window.removeEventListener("keydown",f),a.pause(),a.src=""}},[]),null}function ga(){return n.jsxs(n.Fragment,{children:[n.jsx(pa,{}),n.jsxs(tr,{shadows:!0,camera:{position:[0,20,100],fov:55},gl:{antialias:!0,toneMapping:cr,toneMappingExposure:.8,outputColorSpace:or},children:[n.jsx("color",{attach:"background",args:[oa]}),n.jsx("directionalLight",{position:qt,intensity:1,color:ia,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-camera-near":10,"shadow-camera-far":1800,"shadow-camera-left":-500,"shadow-camera-right":500,"shadow-camera-top":500,"shadow-camera-bottom":-500}),n.jsx("ambientLight",{intensity:.35,color:"#ffffff"}),n.jsxs(e.Suspense,{fallback:null,children:[n.jsx(ua,{}),n.jsx(da,{}),n.jsx(ma,{})]}),n.jsx(fa,{}),n.jsx(nr,{distance:1e3,sunPosition:qt,turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})]})]})}ft.preload("/wolfy.glb");ft.preload("/island.gltf");function He(t,r){return t instanceof Error?t:typeof t=="object"&&t&&"message"in t?new Error(String(t.message)):new Error(r)}function ha(t){return t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function ba(){const{data:t,error:r}=await X.from("archive_sections").select("*").eq("is_visible",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(r)throw He(r,"Unable to load the archive sections.");return t??[]}async function Ka(){const{data:t,error:r}=await X.from("archive_sections").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(r)throw He(r,"Unable to load the archive section manager.");return t??[]}async function qa(t,r,a){const i=t.trim(),l=ha(i),d=r.trim().toUpperCase().slice(0,8);if(!i||!l)throw new Error("Enter a section name.");if(!d)throw new Error("Enter a short section code.");const{data:p,error:f}=await X.from("archive_sections").insert({name:i,slug:l,code:d,sort_order:a,is_visible:!0}).select("*").single();if(f)throw He(f,"Unable to create the archive section.");return p}async function Ja(t,r){const a={...r,...r.name!==void 0?{name:r.name.trim()}:{},...r.code!==void 0?{code:r.code.trim().toUpperCase().slice(0,8)}:{}},{data:i,error:l}=await X.from("archive_sections").update(a).eq("id",t).select("*").single();if(l)throw He(l,"Unable to save the archive section.");return i}async function Qa(t){const{error:r}=await X.from("archive_sections").delete().eq("id",t.id);if(r)throw He(r,"Unable to delete this section. Move its books to another section first.")}const Jt=[{id:"default-objects",slug:"objects",name:"Objects",code:"OBJ",sort_order:0,is_visible:!0,created_at:"",updated_at:""},{id:"default-graphics",slug:"graphics",name:"Graphics",code:"GRPH",sort_order:1,is_visible:!0,created_at:"",updated_at:""},{id:"default-concepts",slug:"concepts",name:"Concepts",code:"CNCP",sort_order:2,is_visible:!0,created_at:"",updated_at:""}],xa=`
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
  animation: reveal-elastic-out 5s 2s reverse both;
}

@keyframes reveal-elastic {
  0% { transform: scale(0); }
  50% { transform: scale(1.7); }
  72% { transform: scale(0.92); }
  88% { transform: scale(9); }
  100% { transform: scale(9); }
}

@keyframes reveal-elastic-out {
  0% { transform: scale(0); }
  50% { transform: scale(0); }
  72% { transform: scale(1.7); }
  88% { transform: scale(0.72); }
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
  animation: index-route-balloon-out 400ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
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
`,W={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode"},va="Gabriel Dell'Aiuto. b. 1996. TEXT 2",wa=()=>{const t=mt(),a=e.useRef(sessionStorage.getItem(_t)==="true").current,l=e.useRef(sessionStorage.getItem(Tt)==="true"||a||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,p=e.useRef(l&&sessionStorage.getItem(W.returnFlag)==="true").current,[f]=e.useState(()=>It()),[S,x]=e.useState(l),[g,j]=e.useState([]),[$,U]=e.useState(!0),[P,R]=e.useState(null),[V,z]=e.useState(Jt),[D,A]=e.useState(!1),ne=e.useCallback(async()=>{U(!0);try{const s=await bn();j(s),R(null)}catch(s){console.error("Unable to load published books",s),R(s instanceof Error?s.message:"Unable to load the published books.")}finally{U(!1)}},[]),q=e.useCallback(async()=>{try{const s=await ba();z(s),A(!0)}catch{z(Jt),A(!1)}},[]);e.useEffect(()=>{ne(),q();const s=()=>{ne(),q()},m=()=>{document.visibilityState==="visible"&&ne()};return window.addEventListener("focus",s),document.addEventListener("visibilitychange",m),()=>{window.removeEventListener("focus",s),document.removeEventListener("visibilitychange",m)}},[q,ne]);const Y=e.useMemo(()=>g.find(s=>s.is_featured)??g[0]??null,[g]),w=e.useMemo(()=>{if(D)return V;const s=[...V];return g.forEach(m=>{s.some(b=>b.slug===m.category)||s.push({id:`fallback-${m.category}`,slug:m.category,name:m.category.replace(/-/g," "),code:m.category.slice(0,4).toUpperCase(),sort_order:s.length,is_visible:!0,created_at:"",updated_at:""})}),s},[V,D,g]),O=e.useMemo(()=>{const s=new Map(w.map(b=>[b.slug,b])),m=b=>({id:b.id,category:s.get(b.category)?.code??b.category.slice(0,4).toUpperCase(),name:b.title,link:`/book/${encodeURIComponent(b.slug)}`,isFeatured:b.is_featured});return w.reduce((b,F)=>(b[F.slug]=g.filter(we=>we.category===F.slug).map(m),b),{})},[w,g]),G=e.useMemo(()=>Object.values(O).flat(),[O]);e.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const s="__GLOBAL_SKY_OCEAN_BG_ROOT__",m=window,b=document.getElementById("global-sky-ocean-bg");if(m[s]){b&&(b.style.display="block",b.style.zIndex="0");return}const F=document.createElement("div");F.id="global-sky-ocean-bg",Object.assign(F.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(F);const we=ln.createRoot(F);we.render(n.jsx(e.Suspense,{fallback:null,children:n.jsx(ga,{})})),m[s]=we},[]);const B=a?"intro":sessionStorage.getItem(W.stage)||"intro",re=sessionStorage.getItem(W.activeButton)||null,ee=sessionStorage.getItem(W.searchOpen)==="true",Oe=sessionStorage.getItem(W.searchQuery)||"",ye=sessionStorage.getItem(W.exploreMode)==="true",[M,J]=e.useState(B),[N,Re]=e.useState(re),[h,y]=e.useState(ee),[E,Q]=e.useState(Oe),[L,ke]=e.useState(ye),he=B==="list"||!!re||ee,[H,le]=e.useState(he),[ue,Z]=e.useState(!1),[K,de]=e.useState(!1),[ae,Ee]=e.useState(!1),[T,Ne]=e.useState(!1);e.useEffect(()=>{if(!T||K)return;if(l){x(!0);return}x(!1);let s=0;const m=window.requestAnimationFrame(()=>{s=window.requestAnimationFrame(()=>{x(!0)})});return()=>{window.cancelAnimationFrame(m),window.cancelAnimationFrame(s)}},[T,l,K]);const[Ie,o]=e.useState(!1),[c,_]=e.useState(!1),[I,C]=e.useState(!1),[se,me]=e.useState(!1),[fe,ve]=e.useState(!p),be=e.useRef(null),[pe,Te]=e.useState(()=>{if(l)return!1;try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),De=e.useRef(null),Ae=e.useRef(null);e.useEffect(()=>()=>{be.current&&window.clearTimeout(be.current)},[]),e.useEffect(()=>{if(!ae||M!=="intro"||I||c||!pe)return;const s=window.setTimeout(()=>{me(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(s)}},[I,ae,c,pe,M]),e.useEffect(()=>{if(M!=="main"&&M!=="list"||c||!pe||fe)return;const s=window.setTimeout(()=>{ve(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(s)}},[fe,c,pe,M]);const[u,v]=e.useState(!1),k=e.useRef(null),te=e.useRef(null),[xe,_e]=e.useState(!1);e.useEffect(()=>{if(!l)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem(Tt),sessionStorage.removeItem(_t),sessionStorage.removeItem("revealDone"),Te(!1),o(!1),document.documentElement.style.background="",document.body.style.background="";const s=document.getElementById("global-sky-ocean-bg");s&&(s.style.display="block",s.style.zIndex="0")},[l]),e.useEffect(()=>{try{sessionStorage.setItem(W.exploreMode,String(L))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:L}}));const s=document.getElementById("global-sky-ocean-bg");s&&s.setAttribute("data-explore",L?"1":"0")},[L]),e.useEffect(()=>{const s=T&&!K&&!c;document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active",s?"1":"0");const b=window.setTimeout(()=>{window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:s}}))},0);return()=>window.clearTimeout(b)},[T,c,K]),e.useEffect(()=>()=>{document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active","0"),window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:!1}}))},[]),e.useEffect(()=>{sessionStorage.setItem(W.stage,M),sessionStorage.setItem(W.activeButton,N??""),sessionStorage.setItem(W.searchOpen,String(h)),sessionStorage.setItem(W.searchQuery,E)},[M,N,h,E]),e.useEffect(()=>{!sessionStorage.getItem(W.splash)&&M==="intro"&&!l?de(!0):Ee(!0),Ne(!0)},[l,M]);const En=e.useCallback(()=>{sessionStorage.setItem(W.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const s=document.getElementById("global-sky-ocean-bg");s&&(s.style.display="none"),de(!1),t(Y?`/book/${encodeURIComponent(Y.slug)}`:"/books")},[Y,t]);e.useEffect(()=>{(ae||l)&&!pe&&!Ie&&!c&&o(!0)},[ae,l,c,pe,Ie]);const Sn=e.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}De.current?(De.current.classList.add("fade-out"),setTimeout(()=>{o(!1),Te(!0)},240)):(o(!1),Te(!0))},[]),Ke=e.useCallback(s=>{c||(Ae.current=s,o(!1),_(!0))},[c]),jn=e.useCallback(()=>{const s=Ae.current;if(!s)return;document.documentElement.style.background="white",document.body.style.background="white";const m=document.getElementById("global-sky-ocean-bg");m&&(m.style.display="none"),t(s)},[t]),Se=e.useCallback(()=>{Re(null),y(!1),Q(""),J("main")},[]),qe=e.useCallback(()=>{le(!1)},[]),Tn=e.useCallback(()=>{Z(!1),H&&Se(),le(s=>!s),window.dispatchEvent(new Event("mousemove"))},[H,Se]),_n=e.useCallback(()=>{if(ue){Z(!1);return}Se(),le(!1),Z(!0),window.dispatchEvent(new Event("mousemove"))},[ue,Se]),Je=e.useMemo(()=>G.filter(s=>s.name.toLowerCase().includes(E.toLowerCase())),[G,E]),Cn=e.useCallback(()=>{if(N&&N!=="search"&&!E){const s=O[N]||[],m=G.filter(b=>!s.some(F=>F.id===b.id));return[...s,...m]}if(N==="search"&&E){const s=Je,m=G.filter(b=>!s.some(F=>F.id===b.id));return[...s,...m]}return G},[N,E,O,G,Je])(),Rn=e.useCallback(s=>{N===s?Se():(Re(s),J("list"),y(!1),Q(""))},[N,Se]),Mt=e.useCallback(s=>{const m=te.current?te.current.scrollTop:0;sessionStorage.setItem(W.listScroll,String(m));const b={activeButton:N,searchOpen:h,searchQuery:E,stage:M,introVisible:ae,archiveOpen:H};try{sessionStorage.setItem(W.snapshot,JSON.stringify(b))}catch{}sessionStorage.setItem(W.returnFlag,"true"),Ke(s)},[N,H,Ke,ae,h,E,M]),Ot=e.useCallback(()=>{Se(),qe(),Z(!1),C(!1),me(!1),J("intro")},[qe,Se]),Nn=e.useCallback(()=>{I||c||(C(!0),ve(!1),qe(),Z(!1),be.current=window.setTimeout(()=>{J("main"),C(!1)},1160))},[qe,I,c]),In=e.useCallback(()=>{!f||c||Ke(`/book/${encodeURIComponent(f.slug)}`)},[Ke,f,c]),An=e.useCallback(()=>{N==="search"?Se():(y(!0),J("list"),Re("search"))},[N,Se]),Qe=e.useCallback(()=>{v(!1),k.current&&clearTimeout(k.current),k.current=window.setTimeout(()=>{v(!0)},5e3)},[]);e.useEffect(()=>{const s=["mousemove","mousedown","touchstart","touchmove","keydown"];return s.forEach(m=>{window.addEventListener(m,Qe)}),Qe(),()=>{s.forEach(m=>{window.removeEventListener(m,Qe)}),k.current&&clearTimeout(k.current)}},[Qe]),e.useEffect(()=>{if(!T||!(sessionStorage.getItem(W.returnFlag)==="true"))return;let m=null;try{const b=sessionStorage.getItem(W.snapshot);m=b?JSON.parse(b):null}catch{}if(m){Re(m.activeButton??null),y(!!m.searchOpen),Q(m.searchQuery??""),m.archiveOpen||m.stage==="list"?le(!0):le(!1),m.stage&&J(m.stage),Ee(!!m.introVisible),m.stage==="list"&&_e(!0),sessionStorage.removeItem(W.returnFlag);return}Ee(!0),J("main"),le(!0),window.setTimeout(()=>{J("list"),_e(!0),sessionStorage.removeItem(W.returnFlag)},700)},[T]),e.useEffect(()=>{if(M!=="list"||!xe)return;const s=Number(sessionStorage.getItem(W.listScroll)||"0"),m=window.setTimeout(()=>{te.current&&(te.current.scrollTop=Number.isNaN(s)?0:s),_e(!1)},0);return()=>{window.clearTimeout(m)}},[M,xe]);const Mn=e.useRef(null),Fe=e.useRef(null),Ze=e.useRef(!1),pt=e.useRef(!1),et=e.useRef(!1),gt=e.useRef({x:0,y:0}),Ue=e.useRef({x:0,y:0}),tt=60,nt=e.useCallback((s,m)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:s,z:m}}))},[]),rt=e.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]);e.useEffect(()=>{if(!L)return;const s=b=>{b.code==="Space"&&(b.preventDefault(),b.stopPropagation(),b.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},m=b=>{b.code==="Space"&&(s(b),b.repeat||rt())};return window.addEventListener("keydown",m,!0),window.addEventListener("keyup",s,!0),()=>{window.removeEventListener("keydown",m,!0),window.removeEventListener("keyup",s,!0)}},[L,rt]);const On=e.useCallback(s=>{if(!L)return;Ze.current=!0,s.currentTarget.setPointerCapture(s.pointerId);const m=s.currentTarget.getBoundingClientRect();Ue.current={x:m.left+m.width/2,y:m.top+m.height/2},gt.current={x:s.clientX,y:s.clientY},et.current=!1,pt.current=Math.hypot(s.clientX-Ue.current.x,s.clientY-Ue.current.y)<=34},[L]),Pn=e.useCallback(s=>{if(!Ze.current||!Fe.current)return;const m=s.clientX-Ue.current.x,b=s.clientY-Ue.current.y;Math.hypot(s.clientX-gt.current.x,s.clientY-gt.current.y)>8&&(et.current=!0);const F=Math.hypot(m,b),we=F>tt?tt:F,Lt=m/(F||1)*we,$t=b/(F||1)*we;Fe.current.style.transform=`translate(${Lt}px, ${$t}px)`;const Ln=Lt/tt,$n=-$t/tt;nt(Ln,$n)},[nt]),Pt=e.useCallback(s=>{Ze.current&&(Ze.current=!1,s.currentTarget.hasPointerCapture(s.pointerId)&&s.currentTarget.releasePointerCapture(s.pointerId),Fe.current&&(Fe.current.style.transform="translate(0px, 0px)"),nt(0,0),s.type!=="pointercancel"&&pt.current&&!et.current&&rt(),pt.current=!1,et.current=!1)},[nt,rt]),Bn=e.useCallback(s=>!!(N&&N!=="search"&&O[N]?.some(m=>m.id===s.id)||N==="search"&&E&&Je.some(m=>m.id===s.id)),[N,O,Je,E]),ht=ae&&M==="intro"?c||I?"is-leaving":pe?se?"is-visible":"is-entering":"is-outside":"is-outside",Bt=(M==="main"||M==="list")&&c?"is-leaving":pe?fe?"is-visible":"is-entering":"is-outside",at=M==="main"||M==="list"?Bt:"is-outside",bt=M==="list"?"-15vh":H||ue?"-42px":"0px",Le=w.length+3,st=s=>({animate:{y:M==="main"||M==="list"?bt:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:s*.025}}),Ve=(s,m=Le)=>{const b=s*.055,F=Math.max(0,m-1-s)*.035,we={scale:0,opacity:0,filter:"blur(8px)",y:bt};return{initial:we,animate:c?{...we,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:F},opacity:{duration:.16,delay:F},filter:{duration:.2,delay:F},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:F}}}:{scale:1,opacity:1,filter:"blur(0px)",y:bt},exit:{...we,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:F},opacity:{duration:.16,delay:F},filter:{duration:.2,delay:F},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:F}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:b},opacity:{duration:.2,delay:b},filter:{duration:.25,delay:b},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:s*.025}}}};return T?n.jsxs(n.Fragment,{children:[n.jsx("style",{children:xa}),K?n.jsx(na,{onComplete:En}):n.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${l?"is-returning-from-book":S?"is-entered":"is-entering"}`,children:[n.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:u?0:1},children:[n.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${ae&&M==="intro"?"":"pointer-events-none"} ${L?"opacity-0 pointer-events-none":"opacity-100"}`,children:[n.jsxs("p",{className:`intro-elastic-item ${ht} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:Ot,children:["TEXT 1",n.jsx("br",{})]}),n.jsxs("div",{className:"flex items-center justify-center gap-2",children:[n.jsx("button",{onClick:In,disabled:!se||I,className:`intro-elastic-item item-start ${ht} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`,children:n.jsx("span",{className:"animate-bounce",children:"BACK"})}),f&&n.jsx("button",{type:"button",onClick:Nn,disabled:!se||c,className:`intro-elastic-item item-back ${ht} px-6 py-4 text-[16px] md:text-[16px] font-light hover:scale-110 active:scale-110 transition-all`,children:"START"})]})]}),n.jsxs("div",{className:`absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl ${M==="intro"?"pointer-events-none":""}`,style:{top:"calc(50% - 24px)"},children:[n.jsxs("div",{className:"flex min-h-12 items-center justify-center gap-5 text-[16px] md:gap-10 md:text-[16px]",children:[n.jsx(ge.div,{...st(0),children:n.jsx("div",{className:`main-control-item item-back ${at}`,children:n.jsx("button",{onClick:Ot,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${L?"pointer-events-none opacity-0":"opacity-100"}`,children:"BACK"})})}),n.jsx(ge.div,{...st(1),children:n.jsx("div",{className:`main-control-item item-archive ${at}`,children:n.jsx("button",{type:"button",onClick:Tn,"aria-expanded":H,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${H?"animate-bounce":""} ${L?"pointer-events-none opacity-0":"opacity-100"}`,children:"ARCHIVE"})})}),n.jsx(ge.div,{...st(2),children:n.jsx("div",{className:`main-control-item item-about ${at}`,children:n.jsx("button",{type:"button",onClick:_n,"aria-expanded":ue,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${ue?"animate-bounce":""} ${L?"pointer-events-none opacity-0":"opacity-100"}`,children:"BIO"})})}),n.jsx(ge.div,{...st(3),children:n.jsx("div",{className:`main-control-item item-play ${at}`,children:n.jsxs("button",{onClick:s=>{s.currentTarget.blur(),ke(m=>!m)},title:L?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${L?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[n.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${L?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[n.jsx("circle",{cx:"12",cy:"12",r:"9"}),n.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),n.jsx("span",{className:`transition-all text-bold whitespace-nowrap ${L?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"PLAY"})]})})})]}),n.jsx(vt,{initial:!1,children:H&&n.jsxs(ge.div,{initial:!1,className:`mx-auto mt-10 pb-0 text-center leading-[2] transition-opacity duration-500 ${L?"pointer-events-none opacity-0":"opacity-100"}`,children:[n.jsx(ge.div,{...Ve(0,Le),className:"archive-elastic-item item-featured min-h-[32px] text-[14px] md:text-[16px]",children:Y?n.jsxs("button",{type:"button",onClick:()=>Mt(`/book/${encodeURIComponent(Y.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[n.jsx("span",{className:"shrink-0 text-black",children:"COVER"})," ",n.jsx("br",{})," ",n.jsx("br",{}),n.jsx("span",{className:"truncate",children:Y.title})]}):$?n.jsx("span",{className:"text-black/50",children:"..."}):P?n.jsx("button",{type:"button",onClick:()=>void ne(),className:"text-black/60 bounce",children:"RETRY BOOK LIST"}):n.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),n.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-3 uppercase md:gap-10",children:[n.jsx(ge.div,{...Ve(1,Le),className:"archive-elastic-item item-search",children:n.jsx("button",{onClick:An,className:`z-10 flex items-center text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${N==="search"?"animate-bounce":"bg-alpha"}`,children:"search"})}),w.map((s,m)=>n.jsx(ge.div,{...Ve(m+2,Le),className:`archive-elastic-item item-${s.slug}`,children:n.jsx("button",{onClick:()=>{Rn(s.slug)},className:`text-[16px] font-light uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${N===s.slug?"animate-bounce":"bg-alpha"}`,children:s.name})},s.id))]}),n.jsx(ge.div,{...Ve(Le-1,Le),className:"archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:n.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${h?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:n.jsx("input",{type:"text",placeholder:"Search...",value:E,onChange:s=>{Q(s.target.value)},className:"w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls")}),n.jsx(vt,{initial:!1,children:ue&&n.jsx(ge.div,{initial:!1,className:`mx-auto mt-7 max-w-xl pb-0 text-center leading-[1.55] ${L?"pointer-events-none opacity-0":"opacity-100"}`,children:n.jsx(ge.div,{...Ve(0,2),className:"archive-elastic-item px-2 text-[14px] md:text-[16px]",children:n.jsx("p",{children:va})})},"about-panel")})]}),n.jsx("div",{className:`absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] md:text-[16px] ease-in-out ${M==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${L?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:n.jsxs("div",{className:`index-elastic-item item-list ${Bt}`,children:[n.jsxs("div",{className:"grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] md:text-[16px] font-light",children:[n.jsx("div",{className:"py-[0.5px]",children:"TAG"}),n.jsx("div",{className:"py-[0.5px]",children:"TITLE"})]}),!$&&!P&&G.length===0?n.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):n.jsx("div",{ref:te,className:"overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:n.jsx(vt,{initial:!1,mode:"popLayout",children:Cn.map((s,m)=>{const b=Bn(s);return n.jsxs(ge.div,{initial:{scale:0,opacity:0,filter:"blur(7px)"},animate:{scale:1,opacity:1,filter:"blur(0px)"},exit:{scale:0,opacity:0,filter:"blur(7px)"},whileHover:{scale:.97},whileTap:{scale:.95},transition:{scale:{type:"spring",stiffness:430,damping:23,mass:.68,delay:m*.022},opacity:{duration:.18,delay:m*.022},filter:{duration:.22,delay:m*.022}},className:`grid origin-center grid-cols-2 text-[16px] md:text-[16px] backdrop-blur-[1px] cursor-pointer ${b?"text-black":"text-gray-700"}`,onClick:()=>{Mt(s.link)},children:[n.jsx("div",{className:"py-[0.5px] tracking-normal",children:s.category}),n.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[s.name,s.isFeatured?" *":""]})]},`${N??"all"}:${s.id}`)})})})]})})]}),L&&n.jsx("div",{ref:Mn,onPointerDown:On,onPointerMove:Pn,onPointerUp:Pt,onPointerCancel:Pt,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:n.jsx("div",{ref:Fe,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:n.jsx("span",{"aria-hidden":"true",children:"↑"})})}),(!pe&&(Ie||l)||c)&&n.jsx("div",{ref:De,className:"reveal-overlay","aria-hidden":"true",children:n.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[n.jsx("defs",{children:n.jsxs("mask",{id:"hole-mask",children:[n.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),n.jsx("circle",{className:`mask-circle ${c?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:c?jn:Sn})]})}),n.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},ya=e.lazy(()=>Me(()=>import("./AdminPortal-DFe2xpob.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),ka=e.lazy(()=>Me(()=>import("./Archive-894Hwue-.js"),__vite__mapDeps([9,10,1,2,6,4,5,7]))),Ea=e.lazy(()=>Me(()=>import("./object01-C8I6djSc.js"),__vite__mapDeps([11,10,1,2]))),Sa=e.lazy(()=>Me(()=>import("./Message-D0EBdcqC.js"),__vite__mapDeps([12,1,2,7,4,5,6]))),ja=e.lazy(()=>Me(()=>import("./NotFound-6WqWxgYD.js"),__vite__mapDeps([13,1,2]))),Ta=e.lazy(()=>Me(()=>import("./WatchStudio-KIQcbGUF.js"),__vite__mapDeps([8,1,2,4,5,3,7,6]))),_a=new Hn,Qt=()=>{const t=mt();return n.jsx(ya,{onBack:()=>t("/")})},Zt=()=>{const t=mt(),{slug:r}=Zn();return n.jsx(Jr,{initialSlug:r??null,onBack:()=>t("/"),onLogin:()=>t("/login"),onThreeD:()=>t("/3d"),onBookChange:a=>{t(`/book/${encodeURIComponent(a)}`,{replace:!0})}})},Ca=()=>{const t=mt();return n.jsx(Ta,{onBack:()=>{const r=It();t(r?`/book/${encodeURIComponent(r.slug)}`:"/books")}})},Ra=()=>{const{pathname:t}=Jn(),r=t==="/";return n.jsxs("div",{className:`fixed inset-0 overflow-hidden ${r?"bg-transparent":"bg-white dark:bg-black"}`,children:[n.jsx(kr,{}),n.jsx(Er,{}),n.jsx(e.Suspense,{fallback:n.jsx("div",{className:"fixed inset-0 bg-white"}),children:n.jsxs(Qn,{children:[n.jsx(je,{path:"/",element:n.jsx(wa,{})}),n.jsx(je,{path:"/archive",element:n.jsx(ka,{})}),n.jsx(je,{path:"/message",element:n.jsx(Sa,{})}),n.jsx(je,{path:"/object01",element:n.jsx(Ea,{})}),n.jsx(je,{path:"/login",element:n.jsx(Qt,{})}),n.jsx(je,{path:"/admin",element:n.jsx(Qt,{})}),n.jsx(je,{path:"/3d",element:n.jsx(Ca,{})}),n.jsx(je,{path:"/books",element:n.jsx(Zt,{})}),n.jsx(je,{path:"/book/:slug",element:n.jsx(Zt,{})}),n.jsx(je,{path:"*",element:n.jsx(ja,{})})]})})]})},Na=()=>n.jsx(Kn,{client:_a,children:n.jsx(Qr,{children:n.jsx(Sr,{children:n.jsx(qn,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:n.jsx(Ra,{})})})})}),en=sessionStorage.getItem("redirect");en&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",en));ln.createRoot(document.getElementById("root")).render(n.jsx(Na,{}));export{Jt as D,$a as M,Da as a,Pe as b,qa as c,Qa as d,Fa as e,Ua as f,Va as g,Xa as h,Ya as i,Ga as j,X as k,Ka as l,Wa as m,Ha as n,xr as o,za as p,Mr as s,Ja as u};
