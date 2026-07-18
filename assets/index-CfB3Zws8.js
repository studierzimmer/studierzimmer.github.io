const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-KWlcv_-1.js","assets/vendor-DYJyzUfl.js","assets/three-B81a7shT.js","assets/AdminThreeDModelManager-DdHCBrn5.js","assets/react-three-s54XUSep.js","assets/postprocessing-DQGK4Izs.js","assets/motion-BCTRx_rm.js","assets/supabase-Ceyhdef9.js","assets/WatchStudio-DFJmbzoZ.js","assets/Archive-TOYF_sLE.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-BxHKGjj0.js","assets/Message-i0ciG8lS.js","assets/NotFound-DBAr_sT_.js"])))=>i.map(i=>d[i]);
var lr=Object.defineProperty;var ur=(e,n,i)=>n in e?lr(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i;var Te=(e,n,i)=>ur(e,typeof n!="symbol"?n+"":n,i);import{r as t,ay as dr,az as pr,j as r,aA as jn,aB as Cn,aC as Rn,aD as Tn,aE as mr,aF as _n,aG as Mn,aH as fr,aI as hr,aJ as gr,aK as xr,aL as In,aM as br,aN as vr,aO as Dt,aP as Ct,ar as Nn,aQ as wr,aR as yr,aS as kr,aT as Sr,aU as Er,aV as Pe,aW as jr}from"./vendor-DYJyzUfl.js";import{_ as We,u as Cr,a as Rt,C as Rr,b as He,c as ze,S as Tr,d as Xt,W as _r,e as Mr,f as Le,g as Ir}from"./react-three-s54XUSep.js";import{c as Nr}from"./supabase-Ceyhdef9.js";import{u as Pt,a as Je,m as be,A as ln}from"./motion-BCTRx_rm.js";import{V as ce,u as Tt,D as Pr,R as Ar,g as Or,L as Ut,C as Lr,b4 as Ht,Y as _e,k as Br,bc as zr,aG as Gt,y as Dr,aA as qt,a8 as Kt,P as Ur,Q as Fe,c as $r,af as Fr,d as Wr,M as st,m as Vr,ab as Yr,bd as Xr,a7 as Hr,aI as Gr}from"./three-B81a7shT.js";import"./postprocessing-DQGK4Izs.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function i(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(s){if(s.ep)return;s.ep=!0;const c=i(s);fetch(s.href,c)}})();const qr=1,Kr=1e6;let At=0;function Jr(){return At=(At+1)%Number.MAX_SAFE_INTEGER,At.toString()}const Ot=new Map,un=e=>{if(Ot.has(e))return;const n=setTimeout(()=>{Ot.delete(e),it({type:"REMOVE_TOAST",toastId:e})},Kr);Ot.set(e,n)},Qr=(e,n)=>{switch(n.type){case"ADD_TOAST":return{...e,toasts:[n.toast,...e.toasts].slice(0,qr)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(i=>i.id===n.toast.id?{...i,...n.toast}:i)};case"DISMISS_TOAST":{const{toastId:i}=n;return i?un(i):e.toasts.forEach(a=>{un(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,open:!1}:a)}}case"REMOVE_TOAST":return n.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(i=>i.id!==n.toastId)}}},yt=[];let kt={toasts:[]};function it(e){kt=Qr(kt,e),yt.forEach(n=>{n(kt)})}function Zr({...e}){const n=Jr(),i=s=>it({type:"UPDATE_TOAST",toast:{...s,id:n}}),a=()=>it({type:"DISMISS_TOAST",toastId:n});return it({type:"ADD_TOAST",toast:{...e,id:n,open:!0,onOpenChange:s=>{s||a()}}}),{id:n,dismiss:a,update:i}}function ei(){const[e,n]=t.useState(kt);return t.useEffect(()=>(yt.push(n),()=>{const i=yt.indexOf(n);i>-1&&yt.splice(i,1)}),[e]),{...e,toast:Zr,dismiss:i=>it({type:"DISMISS_TOAST",toastId:i})}}function Ge(...e){return dr(pr(e))}const ti=hr,Pn=t.forwardRef(({className:e,...n},i)=>r.jsx(jn,{ref:i,className:Ge("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...n}));Pn.displayName=jn.displayName;const ni=fr("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),An=t.forwardRef(({className:e,variant:n,...i},a)=>r.jsx(Cn,{ref:a,className:Ge(ni({variant:n}),e),...i}));An.displayName=Cn.displayName;const ri=t.forwardRef(({className:e,...n},i)=>r.jsx(Rn,{ref:i,className:Ge("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",e),...n}));ri.displayName=Rn.displayName;const On=t.forwardRef(({className:e,...n},i)=>r.jsx(Tn,{ref:i,className:Ge("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...n,children:r.jsx(mr,{className:"h-4 w-4"})}));On.displayName=Tn.displayName;const Ln=t.forwardRef(({className:e,...n},i)=>r.jsx(_n,{ref:i,className:Ge("text-sm font-semibold",e),...n}));Ln.displayName=_n.displayName;const Bn=t.forwardRef(({className:e,...n},i)=>r.jsx(Mn,{ref:i,className:Ge("text-sm opacity-90",e),...n}));Bn.displayName=Mn.displayName;function ii(){const{toasts:e}=ei();return r.jsxs(ti,{children:[e.map(function({id:n,title:i,description:a,action:s,...c}){return r.jsxs(An,{...c,children:[r.jsxs("div",{className:"grid gap-1",children:[i&&r.jsx(Ln,{children:i}),a&&r.jsx(Bn,{children:a})]}),s,r.jsx(On,{})]},n)}),r.jsx(Pn,{})]})}const si=({...e})=>{const{theme:n="system"}=gr();return r.jsx(xr,{theme:n,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})},ai=br,oi=t.forwardRef(({className:e,sideOffset:n=4,...i},a)=>r.jsx(In,{ref:a,sideOffset:n,className:Ge("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...i}));oi.displayName=In.displayName;const ci="https://pmpspnvfgkzprgntihtx.supabase.co",li="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",at="book-pages",As="models-3d",Q=Nr(ci,li,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),ui=50*1024*1024;function ge(e,n){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(n)}function di(e){const{data:n}=Q.storage.from(at).getPublicUrl(e);return n.publicUrl}function pi(e){return{...e,public_url:di(e.storage_path)}}function mi(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function fi(e){if(e.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const n of e){const i=n.name.toLowerCase(),a=i.endsWith(".jpg")||i.endsWith(".jpeg"),s=n.type==="image/jpeg"||n.type==="";if(!a||!s)throw new Error(`${n.name} is not a JPG/JPEG image.`);if(n.size>ui)throw new Error(`${n.name} is larger than 50 MB.`)}}function hi(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function Os(){const{data:e,error:n}=await Q.rpc("is_admin");if(n)throw ge(n,"Unable to verify administrator access.");return e===!0}async function zn(){const{data:e,error:n}=await Q.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(n)throw ge(n,"Unable to load books.");return e??[]}async function Ls(){const{data:e,error:n}=await Q.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw ge(n,"Unable to load the admin book list.");return e??[]}async function Xe(e){const{data:n,error:i}=await Q.from("book_pages").select("*").eq("book_id",e).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(i)throw ge(i,"Unable to load the book pages.");return(n??[]).map(pi)}async function Bs(e){const n=hi(e.slug);if(!n)throw new Error("The book needs a valid slug.");const{data:i,error:a}=await Q.from("books").insert({title:e.title.trim(),slug:n,storage_folder:n,category:e.category,description:e.description?.trim()??"",is_published:e.is_published??!1,is_featured:!1,sort_order:e.sort_order??0}).select("*").single();if(a)throw ge(a,"Unable to create the book.");return i}async function zs(e,n){const{data:i,error:a}=await Q.from("books").update(n).eq("id",e).select("*").single();if(a)throw ge(a,"Unable to save the book.");return i}async function Ds(e){const{error:n}=await Q.rpc("set_featured_book",{p_book_id:e});if(n)throw ge(n,"Unable to set the featured book.")}async function Us(e,n,i){const a=[...n].sort((p,h)=>p.name.localeCompare(h.name,void 0,{numeric:!0,sensitivity:"base"}));fi(a);let c=(await Xe(e.id)).reduce((p,h)=>Math.max(p,h.page_number),0)+1,u=0;for(const p of a){const h=`${e.storage_folder}/${String(c).padStart(4,"0")}-${mi()}.jpg`,{error:x}=await Q.storage.from(at).upload(h,p,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(x)throw ge(x,`Unable to upload ${p.name}.`);const{error:g}=await Q.from("book_pages").insert({book_id:e.id,storage_path:h,file_name:p.name,page_number:c});if(g)throw await Q.storage.from(at).remove([h]),ge(g,`Unable to register ${p.name}.`);c+=1,u+=1,i?.(u,a.length)}return Xe(e.id)}async function gi(e){const i=(await Xe(e)).map((c,u)=>({page:c,nextNumber:u+1})).filter(({page:c,nextNumber:u})=>c.page_number!==u).map(({page:c,nextNumber:u})=>Q.from("book_pages").update({page_number:u}).eq("id",c.id)),s=(await Promise.all(i)).find(c=>c.error);if(s?.error)throw ge(s.error,"Unable to renumber the pages.")}async function $s(e){const{error:n}=await Q.storage.from(at).remove([e.storage_path]);if(n)throw ge(n,"Unable to delete the image from Storage.");const{error:i}=await Q.from("book_pages").delete().eq("id",e.id);if(i)throw ge(i,"The image was removed, but its database row remains.");await gi(e.book_id)}async function Fs(e,n,i){const a=n+i;if(n<0||a<0||a>=e.length)return e;const s=e[n],c=e[a],{error:u}=await Q.rpc("swap_book_pages",{p_first_page_id:s.id,p_second_page_id:c.id});if(u)throw ge(u,"Unable to reorder the pages.");return Xe(s.book_id)}async function Ws(e){const i=(await Xe(e.id)).map(s=>s.storage_path);if(i.length>0){const{error:s}=await Q.storage.from(at).remove(i);if(s)throw ge(s,"Unable to delete this book's image folder.")}const{error:a}=await Q.from("books").delete().eq("id",e.id);if(a)throw ge(a,"Unable to delete the book record.")}const xi={a4_long_edge:{width:480,height:679,minWidth:90,maxWidth:600,minHeight:127,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:110,maxWidth:680,minHeight:78,maxHeight:481},square:{width:560,height:560,minWidth:96,maxWidth:620,minHeight:96,maxHeight:620}},dn=8,bi=8,pn=360,vi=42,wi=1,yi=5;function vt(e,n,i){return Math.min(i,Math.max(n,e))}function mn(e,n,i){const a=Math.max(2,n-dn*2),s=Math.max(1,i-dn*2),c=e.width/e.height,u=a/2/c,p=Math.max(1,Math.min(s,u,e.maxHeight)),h=Math.max(1,Math.min(p*c,e.maxWidth));return{width:Math.floor(h),height:Math.floor(h/c)}}const ki=t.forwardRef(function({page:n,isCover:i,onImageReady:a},s){return r.jsx("div",{ref:s,"data-density":i?"hard":"soft",className:"h-full w-full overflow-hidden bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:r.jsx("img",{src:n.public_url,alt:`Page ${n.page_number}: ${n.file_name}`,draggable:!1,decoding:"async",onLoad:a,onError:a,className:"pointer-events-none h-full w-full select-none object-cover object-center"})})});function Si({book:e,pages:n,initialPage:i=0,bookMotionClassName:a="is-visible",onPageChange:s,onReady:c}){const u=t.useRef(null),p=t.useRef(null),h=t.useRef(e.id),x=t.useRef(0),g=t.useRef(!1),S=t.useRef(!1),U=t.useRef(!1),L=t.useRef(!1),P=t.useRef(null),b=t.useRef({time:0,x:0,y:0,pointerType:""}),T=t.useRef(null),I=t.useRef(null),_=t.useRef([]),E=t.useRef({width:1,height:1}),W=e.page_format??"a4_long_edge",j=xi[W],$=Math.min(Math.max(0,Math.floor(i)),Math.max(0,n.length-1)),k=t.useRef(!1),A=t.useRef(!1),H=t.useRef(new Set),D=t.useRef(new Set([$-1,$,$+1].filter(l=>l>=0&&l<n.length)));h.current!==e.id&&(h.current=e.id,x.current=$);const[ke,ie]=t.useState($),[Ve,Se]=t.useState(0),[C,Z]=t.useState(!1),[V,Ee]=t.useState(!1),[B,ee]=t.useState(!1),[F,Me]=t.useState(()=>mn(j,640,480)),w=Pt(1),G=Pt(0),q=Pt(0),te=t.useCallback(()=>{A.current||!k.current||![...D.current].every(l=>H.current.has(l))||(A.current=!0,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>c?.(e.id))}))},[e.id,c]),Ie=t.useCallback(l=>{D.current.has(l)&&(H.current.add(l),te())},[te]),ne=t.useCallback(()=>{_.current.forEach(l=>l.stop()),_.current=[]},[]),oe=t.useCallback(()=>{const l=x.current===0||x.current>=n.length-1;return{width:F.width*(l?1:2),height:F.height}},[F.height,F.width,n.length]),de=t.useCallback((l,m,N)=>{const Y=E.current,M=oe(),he=Math.max(0,(M.width*l-Y.width)/2),xe=Math.max(0,(M.height*l-Y.height)/2);return{x:vt(m,-he,he),y:vt(N,-xe,xe)}},[oe]),se=t.useCallback((l,m,N,Y=w.get(),M=G.get(),he=q.get())=>{const xe=E.current,le=vt(l,wi,yi),d=le/Math.max(1e-4,Y),y=m-xe.width/2,R=N-xe.height/2,K=de(le,y-(y-M)*d,R-(R-he)*d);return w.set(le),G.set(K.x),q.set(K.y),{scale:le,...K}},[de,G,q,w]),pe=t.useCallback(()=>{const l=E.current,m=oe(),N=Math.min((l.width-24)/Math.max(1,m.width),(l.height-24)/Math.max(1,m.height));return vt(N,1.25,3.6)},[oe]),je=t.useCallback((l,m,N)=>{ne(),I.current&&(window.clearTimeout(I.current),I.current=null);const Y={width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)};E.current=Y,g.current=!0,S.current=!1,Ee(!1),Z(!0),w.set(1),G.set(0),q.set(0);const M=se(pe(),l,m,1,0,0);return N&&(w.set(1),G.set(0),q.set(0),window.requestAnimationFrame(()=>{_.current=[Je(w,M.scale,{type:"spring",stiffness:260,damping:24,mass:.74}),Je(G,M.x,{type:"spring",stiffness:280,damping:27,mass:.72}),Je(q,M.y,{type:"spring",stiffness:280,damping:27,mass:.72})]})),M},[pe,G,q,ne,se,w]),O=t.useCallback(()=>{!g.current||S.current||(ne(),S.current=!0,Ee(!0),_.current=[Je(w,1,{type:"spring",stiffness:330,damping:28,mass:.7}),Je(G,0,{type:"spring",stiffness:330,damping:28,mass:.7}),Je(q,0,{type:"spring",stiffness:330,damping:28,mass:.7})],I.current=window.setTimeout(()=>{g.current=!1,S.current=!1,Z(!1),Ee(!1),w.set(1),G.set(0),q.set(0),I.current=null},430))},[G,q,ne,w]),ve=t.useCallback(l=>{window.requestAnimationFrame(()=>{const m=l??u.current?.pageFlip();if(!m)return;const N=m.getCurrentPageIndex(),Y=m.getBoundsRect();x.current=N,ie(N),s?.(N),m.getOrientation()!=="landscape"?Se(0):N===0?Se(-(Y.pageWidth/2)):N>=n.length-1?Se(Y.pageWidth/2):Se(0)})},[s,n.length]);t.useLayoutEffect(()=>{const l=p.current;if(!l)return;const m=()=>{const Y=window.getComputedStyle(l),M=Number.parseFloat(Y.paddingLeft)+Number.parseFloat(Y.paddingRight),he=Number.parseFloat(Y.paddingTop)+Number.parseFloat(Y.paddingBottom),xe=Math.max(1,l.clientWidth-M),le=Math.max(1,l.clientHeight-he);if(E.current={width:xe,height:le},!g.current){const d=mn(j,xe,le);Me(y=>y.width===d.width&&y.height===d.height?y:d),ee(!0)}ve()};m();const N=new ResizeObserver(m);return N.observe(l),window.addEventListener("resize",m),()=>{N.disconnect(),window.removeEventListener("resize",m)}},[C,j,ve]),t.useEffect(()=>{x.current=$,ie($),Se(0),g.current=!1,S.current=!1,Z(!1),Ee(!1),w.set(1),G.set(0),q.set(0),b.current.time=0,P.current=null,L.current=!1},[e.id,G,q,$,w]),t.useEffect(()=>{if(!C)return;const l=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=l}},[C]);const me=t.useCallback(()=>{T.current&&(window.clearTimeout(T.current),T.current=null)},[]),fe=t.useCallback(l=>{if(S.current||!l.isPrimary||l.pointerType==="mouse"&&l.button!==0)return;const m=window.performance.now(),N=b.current,Y=m-N.time>0&&m-N.time<pn&&N.pointerType===l.pointerType&&Math.hypot(l.clientX-N.x,l.clientY-N.y)<vi,M=g.current,he=l.currentTarget.getBoundingClientRect();Y?(me(),b.current.time=0,L.current=!0,ne()):L.current=M,P.current={pointerId:l.pointerId,pointerType:l.pointerType,mode:Y?"zoom-slider":M?"pan":"page",startedZoomed:M,startX:l.clientX,startY:l.clientY,startPanX:G.get(),startPanY:q.get(),startScale:w.get(),anchorX:l.clientX,anchorY:l.clientY,stageCenterX:he.left+he.width/2,moved:!1}},[me,G,q,ne,w]),z=t.useCallback((l,m)=>{me(),T.current=window.setTimeout(()=>{if(T.current=null,g.current||U.current||P.current)return;const N=u.current?.pageFlip();l<m?N?.flipPrev():N?.flipNext()},pn)},[me]),De=t.useCallback(l=>{const m=P.current;if(!m||m.pointerId!==l.pointerId||(Math.hypot(l.clientX-m.startX,l.clientY-m.startY)>bi&&(m.moved=!0),m.mode==="page"))return;if(l.preventDefault(),m.mode==="pan"){if(!m.moved)return;const M=de(w.get(),m.startPanX+l.clientX-m.startX,m.startPanY+l.clientY-m.startY);G.set(M.x),q.set(M.y);return}if(!m.moved)return;if(!g.current){const M=je(m.anchorX,m.anchorY,!1);m.startScale=M.scale,m.startPanX=M.x,m.startPanY=M.y}const Y=m.startScale*Math.exp((m.startY-l.clientY)*.006);se(Y,m.anchorX,m.anchorY,m.startScale,m.startPanX,m.startPanY)},[de,je,G,q,se,w]),ae=t.useCallback(l=>{const m=P.current;if(!(!m||m.pointerId!==l.pointerId)){if(P.current=null,L.current=!1,l.type==="pointercancel"){b.current.time=0;return}if(m.mode==="zoom-slider"){m.moved?b.current.time=0:m.startedZoomed?O():je(m.anchorX,m.anchorY,!0);return}if(m.moved){b.current.time=0,me();return}b.current={time:window.performance.now(),x:l.clientX,y:l.clientY,pointerType:m.pointerType},m.mode==="page"&&z(l.clientX,m.stageCenterX)}},[me,O,je,z]);t.useEffect(()=>(window.addEventListener("pointermove",De,{passive:!1}),window.addEventListener("pointerup",ae),window.addEventListener("pointercancel",ae),()=>{window.removeEventListener("pointermove",De),window.removeEventListener("pointerup",ae),window.removeEventListener("pointercancel",ae)}),[ae,De]),t.useEffect(()=>()=>{me(),ne(),I.current&&window.clearTimeout(I.current)},[me,ne]);const Ce=t.useCallback(l=>{if(!g.current||S.current)return;l.preventDefault(),l.stopPropagation(),ne();const m=l.currentTarget.getBoundingClientRect(),N=Math.exp(-l.deltaY*.0015);se(w.get()*N,l.clientX-m.left,l.clientY-m.top)},[ne,se,w]);if(t.useEffect(()=>{n.length===0&&c?.(e.id)},[e.id,c,n.length]),n.length===0)return r.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."});const Ue=r.jsx("div",{className:`public-book-stage ${a} ${C?"is-magnified":""} ${V?"is-zoom-closing":""}`,children:r.jsx("div",{ref:p,className:`public-book-viewport relative flex items-center justify-center overflow-hidden ${C?"is-magnified cursor-grab active:cursor-grabbing":"cursor-default"}`,"data-page":ke,"data-zoomed":C?"true":"false",onPointerDownCapture:fe,onMouseDownCapture:l=>{(L.current||g.current)&&(l.preventDefault(),l.stopPropagation())},onTouchStartCapture:l=>{(L.current||g.current)&&(l.preventDefault(),l.stopPropagation())},onWheel:Ce,children:r.jsx(be.div,{className:"flex h-full w-full items-center justify-center",style:{x:G,y:q,scale:w,transformOrigin:"50% 50%",willChange:"transform"},children:r.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${Ve}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform",pointerEvents:C?"none":"auto"},children:B&&r.jsx(vr,{ref:u,className:"mx-auto",style:{margin:"0 auto"},width:F.width,height:F.height,minWidth:1,maxWidth:j.maxWidth,minHeight:1,maxHeight:j.maxHeight,size:"fixed",startPage:h.current===e.id?x.current:$,drawShadow:!0,flippingTime:850,usePortrait:!1,startZIndex:0,autoSize:!1,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!1,disableFlipByClick:!0,onInit:l=>{x.current=l.data.page,ie(l.data.page),s?.(l.data.page),ve(l.object),k.current=!0,te()},onFlip:l=>{x.current=l.data,ie(l.data),s?.(l.data),ve(l.object)},onChangeState:l=>{const m=l.data==="user_fold"||l.data==="flipping";U.current=m,m&&me()},onChangeOrientation:l=>{ve(l.object)},children:n.map((l,m)=>r.jsx(ki,{page:l,isCover:m===0||m===n.length-1,onImageReady:()=>Ie(m)},l.id))},`${e.id}-${W}-${F.width}x${F.height}`)})})})});return r.jsxs("div",{className:"flex w-full flex-col items-center",children:[C&&typeof document<"u"?Dt.createPortal(Ue,document.body):Ue,r.jsx("div",{className:`public-book-meta public-book-title item-title flex items-center gap-8 text-[18px] ${a}`,children:r.jsx("span",{className:"max-w-[60vw] truncate",children:e.title})}),e.description&&r.jsx("div",{className:`public-book-meta public-book-description item-description flex items-center gap-8 text-[18px] ${a}`,children:r.jsx("span",{className:"max-w-[60vw] truncate",children:e.description})})]})}const Dn="publicBookSession",$t="publicBookReturningToIndex",Ft="publicBookReturningToIntro";function Jt(){if(typeof window>"u")return null;try{const e=window.sessionStorage.getItem(Dn);if(!e)return null;const n=JSON.parse(e);return typeof n.slug!="string"||n.slug.length===0||typeof n.pageIndex!="number"||!Number.isFinite(n.pageIndex)?null:{slug:n.slug,pageIndex:Math.max(0,Math.floor(n.pageIndex))}}catch{return null}}function rt(e,n){if(typeof window>"u")return;const i={slug:e,pageIndex:Math.max(0,Math.floor(n))};try{window.sessionStorage.setItem(Dn,JSON.stringify(i))}catch{}}const Un=()=>We(()=>import("./AdminPortal-KWlcv_-1.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),Ei=t.lazy(Un),ji=()=>We(()=>import("./WatchStudio-DFJmbzoZ.js"),__vite__mapDeps([8,1,2,4,5,3,7,6])),wt=()=>ji().then(e=>e.preloadWatchStudioExperience()),St=1120,$n=180,Qt=140,Qe=St+Qt,Ci=$n+Qe,Et=920,fn=120,hn=Et+Qt,Wt=1180,Ri=6e3,gn="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";function Ti({text:e,speed:n=100,revealSpeed:i=55}){const a=t.useRef(null),s=t.useRef(null),c=t.useRef(0),u=t.useRef(!1),p=t.useCallback(()=>{s.current!==null&&(window.clearInterval(s.current),s.current=null)},[]),h=t.useCallback(()=>gn[Math.floor(Math.random()*gn.length)],[]),x=t.useCallback((U=0)=>e.split("").map((L,P)=>L===" "?" ":P<U?L:h()).join(""),[h,e]),g=t.useCallback(()=>{p(),u.current=!1,a.current&&(s.current=window.setInterval(()=>{!a.current||u.current||(a.current.textContent=x())},n))},[p,x,n]),S=t.useCallback(()=>{p(),u.current=!0,c.current=0,a.current&&(s.current=window.setInterval(()=>{c.current+=1,a.current&&(a.current.textContent=x(c.current)),c.current>=e.length&&(p(),a.current&&(a.current.textContent=e))},i))},[p,x,i,e]);return t.useEffect(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches?(a.current&&(a.current.textContent=e),p):(g(),p),[p,g,e]),r.jsx("span",{className:"public-login-scramble",onMouseEnter:S,onMouseLeave:g,"aria-label":e,children:r.jsx("span",{ref:a,"aria-hidden":"true",children:e})})}const _i=`
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
  animation: public-book-background-mix-in ${Wt}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${Wt}ms cubic-bezier(0.4, 0, 0.2, 1) both;
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
  animation-duration: ${St}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-meta.is-fast.is-entering,
.public-book-meta.is-fast.is-leaving {
  animation-duration: ${Et}ms;
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
  animation-duration: ${St}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-stage.is-fast.is-entering,
.public-book-stage.is-fast.is-leaving {
  animation-duration: ${Et}ms;
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


`,Mi={objects:"OBJ",graphics:"GRPH",concepts:"CNCP"};function Lt(e){return e instanceof Error?e.message:"Unable to load the books."}function Be(e){return new Promise(n=>{window.setTimeout(n,e)})}function xn(){return new Promise(e=>{window.requestAnimationFrame(()=>e())})}function Ii(e){const n=i=>Number.isFinite(i)?Math.min(255,Math.max(0,Math.round(i??255))):255;return`rgb(${n(e?.background_r)} ${n(e?.background_g)} ${n(e?.background_b)})`}function Ni(e){return new Promise(n=>{const i=new Image;let a=!1;const s=()=>{a||(a=!0,window.clearTimeout(c),n())},c=window.setTimeout(s,5e3);i.onload=()=>{if(typeof i.decode=="function"){i.decode().catch(()=>{}).finally(s);return}s()},i.onerror=s,i.decoding="async",i.src=e})}async function bn(e,n=0){const i=Math.min(Math.max(0,Math.floor(n)),Math.max(0,e.length-1)),a=[i-1,i,i+1,i+2].filter(c=>c>=0&&c<e.length),s=[...new Set(a)].map(c=>e[c]);await Promise.all(s.map(c=>Ni(c.public_url)))}function Pi({initialSlug:e,onBack:n,onLogin:i,onThreeD:a,onBookChange:s}){const[c,u]=t.useState([]),[p,h]=t.useState(null),[x,g]=t.useState([]),[S,U]=t.useState(!0),[L,P]=t.useState(!1),[b,T]=t.useState(null),[I,_]=t.useState(!1),[E,W]=t.useState(!1),[j,$]=t.useState("outside"),[k,A]=t.useState(!1),[H,D]=t.useState("outside"),[ke,ie]=t.useState(!1),[Ve,Se]=t.useState(0),[C,Z]=t.useState(!1),[V,Ee]=t.useState(!1),B=t.useRef(!0),ee=t.useRef(!1),F=t.useRef(null),Me=t.useRef(null),w=t.useRef(null),G=t.useRef(!1),q=t.useRef(Jt()),te=t.useRef(null),Ie=t.useRef(0),ne=t.useRef("rgb(255 255 255)"),oe=t.useRef(null),de=t.useRef(null),se=t.useRef(null),[pe,je]=t.useState([{id:0,color:ne.current}]),O=t.useMemo(()=>c.find(d=>d.id===p)??null,[c,p]);t.useEffect(()=>{const d=Ii(O);if(d===ne.current)return;ne.current=d;const y={id:++Ie.current,color:d};je(R=>[R[R.length-1],y]),oe.current&&window.clearTimeout(oe.current),oe.current=window.setTimeout(()=>{je(R=>R.slice(-1)),oe.current=null},Wt)},[O,O?.background_b,O?.background_g,O?.background_r]);const ve=t.useCallback(d=>{if(de.current===d)return Promise.resolve();const y=se.current;return y&&y.finish(),new Promise(R=>{let K=!1;const we=()=>{K||(K=!0,window.clearTimeout(Oe),se.current?.finish===we&&(se.current=null),R())},Oe=window.setTimeout(we,Ri);se.current={bookId:d,finish:we,timeout:Oe}})},[]),me=t.useCallback(d=>{de.current=d;const y=se.current;y?.bookId===d&&y.finish()},[]);t.useEffect(()=>{F.current=p},[p]);const fe=t.useCallback(()=>{te.current&&(window.clearTimeout(te.current),te.current=null)},[]),z=t.useCallback((d=!1)=>{fe();const y=d?fn:$n,R=d?Et:St;ie(d),D("outside"),te.current=window.setTimeout(()=>{B.current&&(D("entering"),te.current=window.setTimeout(()=>{B.current&&(D("visible"),ie(!1),te.current=null)},R+Qt))},y)},[fe]);t.useEffect(()=>{B.current=!0;const d=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{B.current&&A(!0)})});return()=>{B.current=!1,window.cancelAnimationFrame(d),te.current&&window.clearTimeout(te.current),oe.current&&window.clearTimeout(oe.current),se.current&&(window.clearTimeout(se.current.timeout),se.current.finish())}},[]),t.useEffect(()=>{const d=navigator.connection;if(d?.saveData||d?.effectiveType==="slow-2g"||d?.effectiveType==="2g")return;const y=()=>{wt()},R=window;if(R.requestIdleCallback){const we=R.requestIdleCallback(y,{timeout:2500});return()=>R.cancelIdleCallback?.(we)}const K=window.setTimeout(y,1400);return()=>window.clearTimeout(K)},[]),t.useEffect(()=>{let d=!0;return(async()=>{U(!0),T(null);try{const R=await zn();if(!d)return;u(R)}catch(R){d&&T(Lt(R))}finally{d&&U(!1)}})(),()=>{d=!1}},[]);const De=t.useCallback(async d=>{if(!G.current){G.current=!0,P(!0),T(null);try{const y=await Xe(d.id),R=q.current,K=R?.slug===d.slug?Math.min(R.pageIndex,Math.max(0,y.length-1)):0;if(await bn(y,K),!B.current)return;de.current=null;const we=ve(d.id);if(Dt.flushSync(()=>{ie(!1),D("outside"),h(d.id),g(y),Se(K)}),rt(d.slug,K),P(!1),await we,!B.current)return;z()}catch(y){B.current&&(T(Lt(y)),P(!1))}finally{G.current=!1}}},[z,ve]),ae=t.useCallback(async(d,y)=>{if(B.current){if(ee.current){Me.current={book:d,updateRoute:y},_(!1);return}if(F.current===d.id){_(!1);return}ee.current=!0,Z(!0),P(!0),_(!1),T(null);try{fe(),ie(!0),D("leaving");const R=Xe(d.id).then(async Oe=>(await bn(Oe),Oe)),[K]=await Promise.all([R,Be(hn)]);if(!B.current)return;de.current=null;const we=ve(d.id);if(Dt.flushSync(()=>{ie(!0),D("outside"),h(d.id),F.current=d.id,g(K),Se(0),P(!1)}),q.current={slug:d.slug,pageIndex:0},rt(d.slug,0),y&&s?.(d.slug),await xn(),await xn(),await we,await Be(fn),!B.current)return;D("entering"),await Be(hn),B.current&&(D("visible"),ie(!1))}catch(R){B.current&&(T(Lt(R)),P(!1),ie(!1),D("visible"))}finally{if(ee.current=!1,B.current){Z(!1);const R=Me.current;Me.current=null,R&&R.book.id!==F.current&&window.setTimeout(()=>{w.current?.(R.book,R.updateRoute)},24)}}}},[fe,s,ve]);t.useEffect(()=>{w.current=(d,y)=>{ae(d,y)}},[ae]),t.useEffect(()=>{if(S||c.length===0)return;const d=e?c.find(y=>y.slug===e):null;if(!p){const y=c.find(K=>K.is_featured),R=d??y??c[0];De(R);return}d&&d.id!==p&&!ee.current&&ae(d,!1)},[c,e,De,S,p,ae]);const Ce=t.useCallback(async()=>{!E||ee.current||(ee.current=!0,Z(!0),$("leaving"),await Be(Qe),B.current&&(W(!1),$("outside"),z(),await Be(Ci),ee.current=!1,B.current&&Z(!1)))},[E,z]);t.useEffect(()=>{const d=y=>{if(y.key==="Escape"){if(E){Ce();return}_(!1)}};return window.addEventListener("keydown",d),()=>{window.removeEventListener("keydown",d)}},[Ce,E]);const Ue=async()=>{if(!ee.current){if(_(!1),E){await Ce();return}ee.current=!0,Z(!0),Un(),!(O&&(fe(),D("leaving"),await Be(Qe),!B.current))&&(W(!0),$("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{B.current&&$("entering")})}),await Be(Qe),ee.current=!1,B.current&&($("visible"),Z(!1)))}},l=async()=>{if(E){await Ce();return}ee.current||(ee.current=!0,Z(!0),_(!1),A(!1),fe(),D("leaving"),O&&rt(O.slug,Ve),window.sessionStorage.setItem($t,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.setItem(Ft,"true"),window.sessionStorage.removeItem("returnFromExample"),await Be(Qe),B.current&&n())},m=async()=>{if(ee.current||E)return;ee.current=!0,Z(!0),Ee(!0),_(!1),A(!1),fe(),D("leaving"),O&&rt(O.slug,Ve);const d=wt().catch(()=>null);await Promise.all([Be(Qe),d]),B.current&&a()},N=d=>{ae(d,!0)},Y=t.useCallback(d=>{Se(d),O&&(q.current={slug:O.slug,pageIndex:d},rt(O.slug,d))},[O]),he=`${H==="entering"?"is-entering":H==="visible"?"is-visible":H==="leaving"?"is-leaving":"is-outside"}${ke?" is-fast":""}`,xe=j==="entering"?"is-entering":j==="visible"?"is-visible":j==="leaving"?"is-leaving":"is-outside",le=k?"is-visible":C||V?"is-leaving":"is-outside";return r.jsxs("div",{className:"public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:pe[0]?.color??"rgb(255 255 255)"},children:[r.jsx("style",{children:_i}),r.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:pe.map((d,y)=>r.jsx("div",{className:`public-book-background-layer ${y===pe.length-1?"is-current":"is-previous"}`,style:{backgroundColor:d.color}},d.id))}),I&&!E&&r.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-transparent",onClick:()=>_(!1)}),r.jsxs("div",{className:"public-book-nav fixed z-[170] flex items-center",children:[r.jsx("div",{className:`public-nav-item ${le}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:r.jsx("button",{type:"button",onClick:()=>void l(),disabled:C,className:"public-book-nav-icon flex items-center justify-center rounded-full border border-black/35 bg-transparent transition-transform duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40","aria-label":E?"Back to book":"Back",title:E?"Back to book":"Back",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-globe-europe-africa",viewBox:"0 0 16 16","aria-hidden":"true",children:r.jsx("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.81.81 0 0 1 1.034-.275.81.81 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34q.118.04.243.054c.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.33.33 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501"})})})}),r.jsx("div",{className:`public-nav-item ${le}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:r.jsx("button",{type:"button",onClick:()=>_(d=>!d),disabled:E,className:`public-book-nav-icon flex items-center justify-center rounded-full border bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${I?"border-black text-black":"border-black/35 text-black"}`,"aria-label":"Choose a book","aria-expanded":I,"aria-controls":"public-book-balloon",title:"Choose a book",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-book",viewBox:"0 0 16 16",children:r.jsx("path",{d:"M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"})})})}),r.jsx("div",{className:`public-nav-item ${le}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:r.jsx("button",{type:"button",onClick:()=>void Ue(),disabled:C,className:`public-book-nav-text flex items-center justify-center rounded-full border bg-transparent text-[13px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${E?"border-black text-black":"border-black/35 text-black"}`,"aria-expanded":E,"aria-label":"Login",children:r.jsx(Ti,{text:"LOGIN"})})}),r.jsx("div",{className:`public-nav-item ${le}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:r.jsx("button",{type:"button",onClick:()=>void m(),onPointerEnter:()=>void wt(),onFocus:()=>void wt(),disabled:C||E,className:"public-book-nav-text flex items-center justify-center rounded-full border border-black/35 bg-transparent text-[13px] text-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40",children:"3D"})})]}),r.jsxs("aside",{id:"public-book-balloon",className:`public-book-balloon fixed left-4 top-[76px] z-[150] flex max-h-[72vh] w-[min(88vw,390px)] origin-top-left flex-col bg-white/95 p-5 shadow-[0_10px_65px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] sm:left-[74px] sm:top-[82px] ${I&&!E?"pointer-events-auto scale-100 opacity-100 blur-0":"pointer-events-none scale-0 opacity-0 blur-[10px]"}`,"aria-hidden":!I||E,children:[r.jsx("div",{className:"absolute -top-2 left-[46px] h-4 w-4 rotate-45 border-l border-t border-black/25 bg-white"}),r.jsxs("div",{className:"relative mb-4 flex items-start justify-between gap-5",children:[r.jsx("div",{children:r.jsx("h1",{className:"mt-1 text-[22px] font-normal",children:"ARCHIVE"})}),r.jsx("button",{type:"button",onClick:()=>_(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95","aria-label":"Close book list",children:r.jsx("span",{"aria-hidden":"true",children:"×"})})]}),r.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto border-t border-black/15",children:S?r.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"..."}):c.length===0?r.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):c.map(d=>{const y=d.id===p;return r.jsxs("button",{type:"button",onClick:()=>N(d),className:`grid w-full grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-all duration-300 ${y?"translate-x-1 text-black":"text-black/60 hover:translate-x-1 hover:text-black"}`,children:[r.jsx("span",{className:"text-[12px] tracking-wide",children:Mi[d.category]}),r.jsxs("span",{className:"min-w-0",children:[r.jsx("span",{className:"block truncate text-[16px]",children:d.title}),d.description&&r.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/45",children:d.description})]}),r.jsx("span",{className:"flex min-w-[18px] justify-end text-[13px]",children:d.is_featured?"*":y?">":""})]},d.id)})})]}),r.jsx("div",{className:"public-book-label-wrap pointer-events-none fixed inset-x-0 top-5 z-[100] flex justify-center px-[230px] sm:top-7",children:O&&r.jsx("p",{className:`public-book-label max-w-full truncate text-center text-[13px] tracking-[0.12em] text-black/55 ${le}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:O.is_featured?"FEATURED - ":""})}),r.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden px-2 sm:px-5",children:S||L&&!O?r.jsx("div",{className:`public-route-message ${k?"is-visible":"is-outside"}`,children:"..."}):b?r.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${k?"is-visible":"is-outside"}`,children:b}):c.length===0?r.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${k?"is-visible":"is-outside"}`,children:"No books are public yet."}):O?r.jsx("div",{className:"h-full w-full",children:r.jsx("div",{className:`public-book-surface flex h-full w-full items-center justify-center ${E?"is-login-muted":""}`,children:r.jsx(Si,{book:O,pages:x,initialPage:Ve,bookMotionClassName:he,onPageChange:Y,onReady:me},O.id)})}):null}),E&&r.jsx("div",{className:`public-login-stage fixed inset-0 z-[130] overflow-hidden bg-white ${xe}`,"aria-hidden":j==="outside"||j==="leaving",children:r.jsx(t.Suspense,{fallback:null,children:r.jsx(Ei,{embedded:!0,surfaceReady:j==="entering"||j==="visible",onBack:()=>void Ce()})})})]})}const Fn=t.createContext(void 0),Ai=({children:e})=>{const[n,i]=t.useState(!1),a=()=>{i(!n)};return t.useEffect(()=>{n?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[n]),r.jsx(Fn.Provider,{value:{isDark:n,toggleTheme:a},children:e})},Vs=()=>{const e=t.useContext(Fn);if(e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},vn="/assets/WolfyLight-Bs10J6iU.gif",Oi=100,Li=500,Bi=14e3,Bt=400,zi=({onComplete:e})=>{const[n,i]=t.useState(!1),[a,s]=t.useState(!1),[c,u]=t.useState(!1),[p,h]=t.useState(!1),[x,g]=t.useState({}),[S,U]=t.useState(0),[L,P]=t.useState(!0),b=t.useRef({}),T=t.useRef(null),I=t.useRef(!1),_=t.useRef(!1),{progress:E}=Cr();t.useEffect(()=>{let k;const A=()=>{U(H=>{const D=E-H,ke=Math.max(D*.1,D>0?.5:-.5),ie=Math.abs(D)<.5?E:H+ke;return ie>=100&&setTimeout(()=>P(!1),500),Math.min(100,Math.max(0,ie))}),k=requestAnimationFrame(A)};return k=requestAnimationFrame(A),()=>cancelAnimationFrame(k)},[E]),t.useEffect(()=>{const k=window.matchMedia("(prefers-reduced-motion: reduce)");_.current=k.matches;const A=()=>_.current=k.matches;return k.addEventListener?.("change",A),()=>k.removeEventListener?.("change",A)},[]),t.useEffect(()=>{const k=new Image;k.src=vn;const A=()=>g({w:k.naturalWidth||400,h:k.naturalHeight||400});k.decode?.().then(()=>{A(),i(!0)}).catch(()=>{k.onload=()=>{A(),i(!0)}})},[]);const W=t.useCallback(()=>{if(I.current)return;if(_.current){I.current=!0,e();return}h(!0);const k=T.current;let A=!1;const H=()=>{A||(A=!0,I.current=!0,e())};if(k){const D=()=>{k.removeEventListener("animationend",D),b.current.fallback&&clearTimeout(b.current.fallback),H()};k.addEventListener("animationend",D,{once:!0}),b.current.fallback=window.setTimeout(H,Bt+120)}else b.current.fallback=window.setTimeout(H,Bt+50)},[e]);t.useEffect(()=>{if(!n)return;const k=b.current;return _.current?(s(!0),u(!0),k.auto=window.setTimeout(()=>W(),800)):(k.entry=window.setTimeout(()=>s(!0),Oi),k.allowExit=window.setTimeout(()=>u(!0),Li),k.auto=window.setTimeout(()=>W(),Bi)),()=>{Object.values(k).forEach(A=>A&&clearTimeout(A))}},[n,W]);const j=()=>{(c||_.current)&&W()},$=a?p?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return r.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${I.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:j,children:[r.jsxs("div",{className:`relative ${$}`,ref:T,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[r.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[r.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),r.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),r.jsx("img",{src:vn,alt:"Loading wolf",width:x.w||800,height:x.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),L&&r.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${S>=100?"opacity-0":"opacity-100"}`,children:[Math.round(S),"%"]}),r.jsx("style",{children:`
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
        .animate-elastic-shrink { transform-origin: 50% 50%; animation: elastic-shrink ${Bt}ms ease-in forwards; }
      `})]})},ue={};typeof window<"u"&&(window.addEventListener("keydown",e=>{ue[e.key.toLowerCase()]=!0}),window.addEventListener("keyup",e=>{ue[e.key.toLowerCase()]=!1}));const Wn={current:null},zt=15,Di=38,Ui=95,Ae=0,Vt=-58,wn=320,jt=12e4,$i=48e3,Fi=9e4,J=128,Ze=900,Ye=12,Wi=4.5,Vi=16e3,Vn=[500,200,-300],Yi=new ce(500,150,-1e3).normalize(),Xi="#fff4d6",Yn="#0b1e3a",Hi="#0a2a6a",Xn={value:0};function Zt(){const e=Xt(qt,"/caustics.png");return t.useMemo(()=>{e.wrapS=e.wrapT=Kt,e.minFilter=Hr,e.magFilter=Ut,e.colorSpace=Ht,e.needsUpdate=!0},[e]),e}function en(e,n){if(e.userData.hasUnderwaterCaustics)return;const i=e.onBeforeCompile.bind(e),a=e.customProgramCacheKey.bind(e);e.onBeforeCompile=(s,c)=>{i(s,c),s.uniforms.causticsMap={value:n},s.uniforms.causticsTime=Xn,s.uniforms.causticsRippleSampler={value:ye.texture},s.uniforms.causticsRippleCenter={value:ye.center},s.uniforms.causticsRippleWorldSize={value:Ze},s.uniforms.causticsRippleTexel={value:new Tt(1/J,1/J)},s.vertexShader=`varying vec3 vCausticsWorldPosition;
${s.vertexShader}`.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
        vCausticsWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),s.fragmentShader=`
      uniform sampler2D causticsMap;
      uniform float causticsTime;
      uniform sampler2D causticsRippleSampler;
      uniform vec2 causticsRippleCenter;
      uniform float causticsRippleWorldSize;
      uniform vec2 causticsRippleTexel;
      varying vec3 vCausticsWorldPosition;
      ${s.fragmentShader}`.replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
      float submerged = 1.0 - smoothstep(-0.35, 1.5, vCausticsWorldPosition.y);
      vec2 causticsWarp = vec2(
        sin(vCausticsWorldPosition.x * 0.021 + causticsTime * 0.52) +
          sin(vCausticsWorldPosition.z * 0.013 - causticsTime * 0.31),
        cos(vCausticsWorldPosition.z * 0.019 - causticsTime * 0.46) +
          cos(vCausticsWorldPosition.x * 0.011 + causticsTime * 0.27)
      ) * 0.018;
      vec2 causticsUvA = vCausticsWorldPosition.xz * 0.0065 + causticsWarp +
        vec2(causticsTime * 0.018, -causticsTime * 0.012);
      mat2 causticsRotation = mat2(0.819, -0.574, 0.574, 0.819);
      vec2 causticsUvB = causticsRotation *
          (vCausticsWorldPosition.xz * 0.00475 - causticsWarp * 0.74) +
        vec2(-causticsTime * 0.011, causticsTime * 0.016);
      float causticsA = texture2D(causticsMap, causticsUvA).r;
      float causticsB = texture2D(causticsMap, causticsUvB).r;
      float movingCaustics = pow(
        clamp(causticsA * 0.76 + causticsB * 0.4 - 0.035, 0.0, 1.0),
        1.18
      );
      vec2 causticsRippleUv =
        (vCausticsWorldPosition.xz - causticsRippleCenter) /
          causticsRippleWorldSize + 0.5;
      vec2 causticsRippleEdge =
        smoothstep(vec2(0.0), vec2(0.1), causticsRippleUv) *
        smoothstep(vec2(0.0), vec2(0.1), vec2(1.0) - causticsRippleUv);
      float causticsRippleMask = causticsRippleEdge.x * causticsRippleEdge.y;
      float causticsRippleX =
        texture2D(causticsRippleSampler, causticsRippleUv +
          vec2(causticsRippleTexel.x, 0.0)).r -
        texture2D(causticsRippleSampler, causticsRippleUv -
          vec2(causticsRippleTexel.x, 0.0)).r;
      float causticsRippleY =
        texture2D(causticsRippleSampler, causticsRippleUv +
          vec2(0.0, causticsRippleTexel.y)).r -
        texture2D(causticsRippleSampler, causticsRippleUv -
          vec2(0.0, causticsRippleTexel.y)).r;
      float rippleCaustics = smoothstep(0.012, 0.12,
        length(vec2(causticsRippleX, causticsRippleY))) * causticsRippleMask;
      movingCaustics = clamp(movingCaustics + rippleCaustics * 0.75, 0.0, 1.0);
      vec3 underwaterFill = diffuseColor.rgb * vec3(0.72, 0.9, 1.0);
      reflectedLight.indirectDiffuse += underwaterFill * submerged *
        (0.14 + movingCaustics * 0.72);`)},e.customProgramCacheKey=()=>`${a()}-underwater-caustics-v2`,e.userData.hasUnderwaterCaustics=!0,e.needsUpdate=!0}class Gi{constructor(){Te(this,"cells",new Map);Te(this,"ready",!1)}build(n){this.clear(),n.updateWorldMatrix(!0,!0);let i=0;n.traverse(c=>{if(!(c instanceof st))return;const u=c.geometry.getAttribute("position");u&&(i+=u.count)});const a=Math.max(1,Math.ceil(i/Vi)),s=new ce;n.traverse(c=>{if(!(c instanceof st))return;const u=c.geometry.getAttribute("position");if(u)for(let p=0;p<u.count;p+=a){s.fromBufferAttribute(u,p),c instanceof Gr&&c.applyBoneTransform(p,s),s.applyMatrix4(c.matrixWorld);const h=this.keyFor(s.x,s.y,s.z),x=this.cells.get(h)??[];x.push(s.clone()),this.cells.set(h,x)}}),this.ready=this.cells.size>0}resolve(n,i){if(!this.ready)return!1;const a=i+Wi,s=Math.ceil(a/Ye);let c=!1;for(let u=0;u<2;u+=1){const p=Math.floor(n.x/Ye),h=Math.floor(n.y/Ye),x=Math.floor(n.z/Ye);for(let g=p-s;g<=p+s;g+=1)for(let S=h-s;S<=h+s;S+=1)for(let U=x-s;U<=x+s;U+=1){const L=this.cells.get(`${g}:${S}:${U}`);if(L)for(const P of L){const b=n.distanceToSquared(P);if(b>=a**2)continue;const T=Math.sqrt(b);T>1e-4?n.addScaledVector(n.clone().sub(P).divideScalar(T),a-T):n.y+=a,c=!0}}}return c}clear(){this.cells.clear(),this.ready=!1}keyFor(n,i,a){return`${Math.floor(n/Ye)}:${Math.floor(i/Ye)}:${Math.floor(a/Ye)}`}}const Yt=new Gi;class qi{constructor(){Te(this,"center",new Tt);Te(this,"texture");Te(this,"height",new Float32Array(J**2));Te(this,"velocity",new Float32Array(J**2));Te(this,"nextHeight",new Float32Array(J**2));Te(this,"nextVelocity",new Float32Array(J**2));Te(this,"pixels",new Uint8Array(J**2*4));Te(this,"accumulator",0);for(let n=0;n<this.pixels.length;n+=4)this.pixels[n]=128,this.pixels[n+1]=128,this.pixels[n+2]=128,this.pixels[n+3]=255;this.texture=new Pr(this.pixels,J,J,Ar,Or),this.texture.minFilter=Ut,this.texture.magFilter=Ut,this.texture.wrapS=this.texture.wrapT=Lr,this.texture.colorSpace=Ht,this.texture.needsUpdate=!0}moveWindowTo(n,i){(this.center.x-n)**2+(this.center.y-i)**2<180**2||(this.center.set(n,i),this.height.fill(0),this.velocity.fill(0),this.nextHeight.fill(0),this.nextVelocity.fill(0),this.encodeTexture())}addRipple(n,i,a=.8,s=20){const c=(n-this.center.x)/Ze+.5,u=(i-this.center.y)/Ze+.5;if(c<=0||c>=1||u<=0||u>=1)return;const p=c*(J-1),h=u*(J-1),x=Math.max(2,s/Ze*J),g=Math.ceil(x*2.4),S=Math.max(1,Math.floor(p-g)),U=Math.min(J-2,Math.ceil(p+g)),L=Math.max(1,Math.floor(h-g)),P=Math.min(J-2,Math.ceil(h+g));for(let b=L;b<=P;b+=1)for(let T=S;T<=U;T+=1){const I=(T-p)**2+(b-h)**2,_=Math.exp(-I/(x*x*.72));this.velocity[b*J+T]+=a*_}}step(n){this.accumulator+=Math.min(n,.05);const i=1/30;let a=!1;for(;this.accumulator>=i;){for(let s=1;s<J-1;s+=1)for(let c=1;c<J-1;c+=1){const u=s*J+c,p=this.height[u-1]+this.height[u+1]+this.height[u-J]+this.height[u+J]-this.height[u]*4,h=(this.velocity[u]+p*.22)*.986;this.nextVelocity[u]=h,this.nextHeight[u]=(this.height[u]+h*.78)*.998}[this.height,this.nextHeight]=[this.nextHeight,this.height],[this.velocity,this.nextVelocity]=[this.nextVelocity,this.velocity],this.nextHeight.fill(0),this.nextVelocity.fill(0),this.accumulator-=i,a=!0}a&&this.encodeTexture()}dispose(){this.texture.dispose()}encodeTexture(){for(let n=0;n<this.height.length;n+=1){const i=Math.round(_e.clamp(128+this.height[n]*42,0,255)),a=n*4;this.pixels[a]=i,this.pixels[a+1]=i,this.pixels[a+2]=i,this.pixels[a+3]=255}this.texture.needsUpdate=!0}}const ye=new qi;function Ki(e,n,i){let a=n-e;for(;a<-Math.PI;)a+=Math.PI*2;for(;a>Math.PI;)a-=Math.PI*2;return e+a*i}function Ji(){const e=t.useRef(null),n=Xt(qt,"/waternormals.jpeg");n.wrapS=n.wrapT=Kt;const i=t.useMemo(()=>new Ur(jt,jt),[]),a=t.useMemo(()=>{const s=new _r(i,{textureWidth:512,textureHeight:512,waterNormals:n,sunDirection:Yi.clone(),sunColor:new Fe("#fff2cc"),waterColor:new Fe(Hi),distortionScale:10.7,alpha:.955,fog:!1}),c=s.material;return c.transparent=!0,c.uniforms.rippleSampler={value:ye.texture},c.uniforms.rippleCenter={value:ye.center},c.uniforms.rippleWorldSize={value:Ze},c.uniforms.rippleTexel={value:new Tt(1/J,1/J)},c.fragmentShader=c.fragmentShader.replace("uniform vec3 waterColor;",`uniform vec3 waterColor;
          uniform sampler2D rippleSampler;
          uniform vec2 rippleCenter;
          uniform float rippleWorldSize;
          uniform vec2 rippleTexel;

          float rippleHeight(vec2 uv) {
            return texture2D(rippleSampler, uv).r * 2.0 - 1.0;
          }`).replace("vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );",`vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );
          vec2 rippleUv = (worldPosition.xz - rippleCenter) / rippleWorldSize + 0.5;
          vec2 rippleEdge = smoothstep(vec2(0.0), vec2(0.08), rippleUv) *
            smoothstep(vec2(0.0), vec2(0.08), vec2(1.0) - rippleUv);
          float rippleMask = rippleEdge.x * rippleEdge.y;
          float rippleLeft = rippleHeight(rippleUv - vec2(rippleTexel.x, 0.0));
          float rippleRight = rippleHeight(rippleUv + vec2(rippleTexel.x, 0.0));
          float rippleDown = rippleHeight(rippleUv - vec2(0.0, rippleTexel.y));
          float rippleUp = rippleHeight(rippleUv + vec2(0.0, rippleTexel.y));
          vec2 rippleSlope = vec2(rippleLeft - rippleRight, rippleDown - rippleUp);
          surfaceNormal = normalize(surfaceNormal + vec3(rippleSlope.x, 0.0, rippleSlope.y) * rippleMask * 2.6);`),c.needsUpdate=!0,s.renderOrder=2,s},[i,n]);return a.material.uniforms.waterColor.value.convertSRGBToLinear(),t.useEffect(()=>()=>{i.dispose(),a.material.dispose()},[i,a]),ze((s,c)=>{if(ye.step(c),e.current){const u=e.current.material;u.uniforms.time.value+=c,u.uniforms.rippleCenter.value.copy(ye.center)}}),r.jsx("primitive",{object:a,ref:e,"rotation-x":-Math.PI/2})}function Qi(){const e=Zt(),n=t.useMemo(()=>{const i=new Gt({color:"#315057",roughness:.96,metalness:0,side:Dr});return en(i,e),i},[e]);return t.useEffect(()=>()=>n.dispose(),[n]),ze(i=>{Xn.value=i.clock.elapsedTime}),r.jsxs("mesh",{"rotation-x":-Math.PI/2,"position-y":Vt,renderOrder:0,receiveShadow:!0,children:[r.jsx("planeGeometry",{args:[jt,jt]}),r.jsx("primitive",{object:n,attach:"material"})]})}function Zi(){const e=t.useRef(null),{camera:n}=He(),i=Xt(qt,"/waternormals.jpeg");t.useMemo(()=>{i.wrapS=i.wrapT=Kt,i.colorSpace=Ht,i.needsUpdate=!0},[i]);const a=t.useMemo(()=>new $r({uniforms:{time:{value:0},normalSampler:{value:i},rippleSampler:{value:ye.texture},rippleCenter:{value:ye.center},rippleWorldSize:{value:Ze}},vertexShader:`
          uniform float time;
          varying vec3 vWorldPosition;
          varying float vWaveHeight;
          void main() {
            vec4 baseWorld = modelMatrix * vec4(position, 1.0);
            vec2 wavePosition = baseWorld.xz;
            float waveHeight =
              sin(wavePosition.x * 0.031 + time * 0.72) * 0.52 +
              sin(wavePosition.y * 0.023 - time * 0.51) * 0.36 +
              sin((wavePosition.x + wavePosition.y) * 0.016 + time * 0.39) * 0.24;
            vec3 displaced = position;
            displaced.z += waveHeight;
            vec4 world = modelMatrix * vec4(displaced, 1.0);
            vWorldPosition = world.xyz;
            vWaveHeight = waveHeight;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,fragmentShader:`
          uniform float time;
          uniform sampler2D normalSampler;
          uniform sampler2D rippleSampler;
          uniform vec2 rippleCenter;
          uniform float rippleWorldSize;
          varying vec3 vWorldPosition;
          varying float vWaveHeight;

          vec4 getWaterNoise(vec2 position) {
            vec2 uv0 = position / 103.0 + vec2(time / 17.0, time / 29.0);
            vec2 uv1 = position / 107.0 - vec2(time / -19.0, time / 31.0);
            vec2 uv2 = position / vec2(8907.0, 9803.0) +
              vec2(time / 101.0, time / 97.0);
            vec2 uv3 = position / vec2(1091.0, 1027.0) -
              vec2(time / 109.0, time / -113.0);
            return (texture2D(normalSampler, uv0) +
              texture2D(normalSampler, uv1) +
              texture2D(normalSampler, uv2) +
              texture2D(normalSampler, uv3)) * 0.5 - 1.0;
          }

          void main() {
            vec2 uv = (vWorldPosition.xz - rippleCenter) / rippleWorldSize + 0.5;
            float ripple = texture2D(rippleSampler, uv).r * 2.0 - 1.0;
            vec4 noise = getWaterNoise(vWorldPosition.xz);
            vec3 surfaceNormal = normalize(noise.xzy * vec3(1.5, 1.0, 1.5));
            surfaceNormal = normalize(surfaceNormal + vec3(ripple, 0.0, ripple) * 0.42);
            vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
            float fresnel = pow(1.0 - abs(dot(viewDirection, surfaceNormal)), 2.4);
            float movingLight = clamp(surfaceNormal.y * 0.48 + 0.52, 0.0, 1.0);
            vec3 color = mix(
              vec3(0.025, 0.17, 0.28),
              vec3(0.19, 0.53, 0.66),
              movingLight * 0.68 + vWaveHeight * 0.06
            );
            gl_FragColor = vec4(color, 0.4 + fresnel * 0.3);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,side:Fr,transparent:!0,depthWrite:!1}),[i]);return t.useEffect(()=>()=>a.dispose(),[a]),ze(s=>{a.uniforms.time.value=s.clock.elapsedTime,a.uniforms.rippleCenter.value.copy(ye.center),e.current&&(e.current.position.x=n.position.x,e.current.position.z=n.position.z,e.current.visible=n.position.y<Ae+1)}),r.jsxs("mesh",{ref:e,"rotation-x":-Math.PI/2,"position-y":Ae-.08,renderOrder:3,frustumCulled:!1,children:[r.jsx("planeGeometry",{args:[6e3,6e3,128,128]}),r.jsx("primitive",{object:a,attach:"material"})]})}function es(){const{camera:e}=He();return t.useEffect(()=>{const n=new Vr,i=new Tt,a=new Yr(new ce(0,1,0),0),s=new ce,c=u=>{document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1"&&(!u.isPrimary||u.button>0||u.target instanceof Element&&u.target.closest("button, input, textarea, select, a, [role='button'], [data-ocean-control]")||(i.set(u.clientX/window.innerWidth*2-1,-(u.clientY/window.innerHeight)*2+1),n.setFromCamera(i,e),n.ray.intersectPlane(a,s)&&ye.addRipple(s.x,s.z,-.95,24)))};return window.addEventListener("pointerdown",c,{passive:!0}),()=>window.removeEventListener("pointerdown",c)},[e]),null}function ts(){const e=t.useRef(null),n=t.useRef(null),i=t.useRef(null),a=t.useMemo(()=>new Fe("#ffd992"),[]),s=t.useMemo(()=>new Fe("#8bc9ff"),[]),c=t.useMemo(()=>new Fe,[]);return t.useEffect(()=>{e.current?.traverse(u=>{u.castShadow=!1,u.receiveShadow=!1})},[]),ze(({camera:u,clock:p},h)=>{e.current&&(e.current.position.x=_e.damp(e.current.position.x,u.position.x+Math.sin(p.elapsedTime*.025)*70,.35,h),e.current.position.z=_e.damp(e.current.position.z,u.position.z+Math.cos(p.elapsedTime*.02)*55,.35,h));const x=.5+Math.sin(p.elapsedTime*.42)*.5;c.lerpColors(a,s,x),n.current&&(n.current.color.copy(c),n.current.intensity=1.4+Math.sin(p.elapsedTime*.8)*.28),i.current&&(i.current.color.copy(c).lerp(s,.3),i.current.intensity=1.05+Math.cos(p.elapsedTime*.65)*.22)}),r.jsxs("group",{ref:e,children:[r.jsxs(Mr,{texture:"/cloud-white.png",material:Wr,limit:96,frustumCulled:!1,children:[r.jsx(Le,{seed:2,segments:14,bounds:[105,18,38],position:[-330,230,-720],volume:108,opacity:.93,growth:5,speed:.06,fade:1500,color:"#ffffff"}),r.jsx(Le,{seed:7,segments:13,bounds:[94,16,34],position:[330,210,-820],volume:98,opacity:.9,growth:4.6,speed:.05,fade:1500,color:"#ffffff"}),r.jsx(Le,{seed:11,segments:10,bounds:[78,14,29],position:[620,260,-650],volume:86,opacity:.86,growth:3.8,speed:.045,fade:1500,color:"#ffffff"}),r.jsx(Le,{seed:17,segments:9,bounds:[72,13,27],position:[-650,275,-600],volume:82,opacity:.84,growth:3.5,speed:.04,fade:1500,color:"#ffffff"}),r.jsx(Le,{seed:23,segments:9,bounds:[80,14,30],position:[50,300,-1050],volume:90,opacity:.84,growth:3.6,speed:.045,fade:1600,color:"#ffffff"}),r.jsx(Le,{seed:29,segments:8,bounds:[76,13,28],position:[-420,235,620],volume:88,opacity:.86,growth:3.5,speed:.042,fade:1600,color:"#ffffff"}),r.jsx(Le,{seed:31,segments:8,bounds:[80,14,29],position:[440,220,720],volume:92,opacity:.86,growth:3.6,speed:.044,fade:1600,color:"#ffffff"}),r.jsx(Le,{seed:37,segments:8,bounds:[72,12,26],position:[820,255,100],volume:84,opacity:.84,growth:3.3,speed:.04,fade:1600,color:"#ffffff"}),r.jsx(Le,{seed:41,segments:8,bounds:[74,13,27],position:[-850,270,60],volume:86,opacity:.84,growth:3.4,speed:.041,fade:1600,color:"#ffffff"})]}),r.jsx("pointLight",{ref:n,position:[-330,228,-720],distance:310,decay:2,castShadow:!1}),r.jsx("pointLight",{ref:i,position:[330,208,-820],distance:290,decay:2,castShadow:!1})]})}function ns(){const{camera:e,scene:n}=He(),i=t.useRef(0),a=t.useRef(null),s=t.useMemo(()=>new Fe(Yn),[]),c=t.useMemo(()=>new Fe("#06283f"),[]),u=t.useMemo(()=>new Fe,[]),p=t.useMemo(()=>new Xr("#0a3854",0),[]);return ze((h,x)=>{const g=e.position.y<Ae-.45;i.current=_e.damp(i.current,g?1:0,4.8,x);const S=i.current;u.lerpColors(s,c,S),n.background=u,p.density=S*.0042,n.fog=S>.003?p:null,a.current===null?a.current=g:g!==a.current&&(a.current=g,window.dispatchEvent(new CustomEvent("ocean-surface-cross",{detail:{underwater:g}})))}),t.useEffect(()=>()=>{n.fog=null,n.background=s},[s,n]),null}function rs(){const e=t.useRef(null),{camera:n}=He();return ze((i,a)=>{e.current&&(e.current.intensity=_e.damp(e.current.intensity,n.position.y<Ae-.45?.62:0,4.2,a))}),r.jsx("hemisphereLight",{ref:e,color:"#d9f7ff",groundColor:"#12364a",intensity:0})}function is(){const e=t.useRef(null),n=t.useRef(1),{camera:i}=He();return t.useEffect(()=>{const a=e.current?.material;a&&(a.transparent=!0,a.depthWrite=!1,a.needsUpdate=!0)},[]),ze((a,s)=>{const c=e.current?.material;c&&(n.current=_e.damp(n.current,i.position.y<Ae-.45?0:1,4.8,s),c.opacity=n.current,e.current.visible=n.current>.004)}),r.jsx(Tr,{ref:e,distance:$i,sunPosition:Vn,turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})}function ss(){const{scene:e}=Rt("/island.gltf"),n=Zt(),i=t.useMemo(()=>{const a=e.clone(!0);return a.scale.setScalar(100),a.position.set(0,-5,-300),a.traverse(s=>{if(!(s instanceof st))return;const u=(Array.isArray(s.material)?s.material:[s.material]).map(p=>{const h=p.clone();return h instanceof Gt&&(h.roughness=Math.max(h.roughness,.82),h.metalness=Math.min(h.metalness,.02),h.envMapIntensity=.08,en(h,n)),h.needsUpdate=!0,h});s.material=Array.isArray(s.material)?u:u[0],s.castShadow=!0,s.receiveShadow=!0}),a},[n,e]);return t.useLayoutEffect(()=>(Yt.build(i),()=>Yt.clear()),[i]),t.useEffect(()=>()=>{i.traverse(a=>{if(!(a instanceof st))return;(Array.isArray(a.material)?a.material:[a.material]).forEach(c=>c.dispose())})},[i]),r.jsx("primitive",{object:i})}function as(){const e=t.useRef(null),{camera:n}=He(),{scene:i}=Rt("/wolfy.glb"),a=Zt(),s=t.useMemo(()=>Ir.clone(i),[i]),c=t.useRef(new ce),u=t.useRef(0),p=t.useRef(new ce),h=t.useRef(0),x=t.useRef(!0),g=t.useRef(!1),S=t.useRef(!1),U=t.useRef(new ce(0,0,1)),L=t.useRef(zt),P=t.useRef(0);return t.useEffect(()=>{s.traverse(b=>{b instanceof st&&b.material instanceof Gt&&(b.material=b.material.clone(),b.material.roughness=.42,b.material.metalness=.05,b.material.envMapIntensity=.35,en(b.material,a),b.castShadow=!0,b.receiveShadow=!0)})},[a,s]),t.useEffect(()=>{Wn.current=e.current;const b=E=>{const{x:W,z:j}=E.detail;c.current.set(W,0,j)},T=()=>{!x.current&&!g.current||(x.current=!1,h.current=Di)},I=E=>{const{y:W}=E.detail;u.current=_e.clamp(W,-1,1),Math.abs(u.current)>.01&&(g.current=!0,x.current=!1)},_=E=>{S.current=E.detail.enabled,S.current||(c.current.set(0,0,0),u.current=0)};return window.addEventListener("explore-joystick",b),window.addEventListener("explore-jump",T),window.addEventListener("explore-vertical",I),window.addEventListener("explore-mode",_),S.current=document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1",()=>{window.removeEventListener("explore-joystick",b),window.removeEventListener("explore-jump",T),window.removeEventListener("explore-vertical",I),window.removeEventListener("explore-mode",_)}},[]),ze((b,T)=>{if(!e.current||!S.current)return;const I=new ce(c.current.x+(ue.arrowright||ue.d?1:0)-(ue.arrowleft||ue.a?1:0),0,c.current.z+(ue.arrowup||ue.w?1:0)-(ue.arrowdown||ue.s?1:0));I.lengthSq()<.01&&I.set(0,0,0);const _=new ce;n.getWorldDirection(_),_.y=0,_.normalize();const E=new ce().crossVectors(_,new ce(0,1,0)).normalize(),W=new ce().addScaledVector(_,I.z).addScaledVector(E,I.x);W.lengthSq()>1e-4&&W.normalize(),p.current.lerp(W.multiplyScalar(100),T*6);const j=e.current.position.clone().addScaledVector(p.current,T),$=(ue.e?1:0)-(ue.q?1:0),k=_e.clamp($+u.current,-1,1);Math.abs(k)>.01&&(g.current=!0,x.current=!1),g.current?h.current=_e.damp(h.current,k*58,k===0?7.5:6,T):h.current-=Ui*Math.min(T,.05),j.y+=h.current*Math.min(T,.05),!g.current&&j.y<=zt&&(j.y=zt,h.current=0,x.current=!0),j.y=_e.clamp(j.y,Vt+8,wn),(j.y===Vt+8||j.y===wn)&&(h.current=0),Yt.resolve(j,5)&&(p.current.multiplyScalar(.2),h.current*=.2),e.current.position.copy(j),ye.moveWindowTo(j.x,j.z);const A=L.current>Ae&&j.y<=Ae||L.current<Ae&&j.y>=Ae,H=Math.abs(j.y-Ae)<11,D=p.current.lengthSq()>20||Math.abs(h.current)>4;if((A||H&&D&&b.clock.elapsedTime-P.current>.13)&&(ye.addRipple(j.x,j.z,A?-1.25:-.34,A?30:18),P.current=b.clock.elapsedTime),L.current=j.y,I.lengthSq()>.01){const ke=W.clone();I.z<-.2&&ke.copy(_),U.current.lerp(ke,.15).normalize();const ie=Math.atan2(U.current.x,U.current.z);e.current.rotation.y=Ki(e.current.rotation.y,ie,.15)}e.current.userData.joyX=c.current.x}),r.jsx("primitive",{ref:e,object:s,scale:10,position:[0,15,0],rotation:[0,Math.PI,0]})}function os(){const{camera:e}=He(),n=t.useRef(0),i=t.useRef(0),a=t.useRef(!1);return t.useEffect(()=>{const s=c=>{a.current=c.detail.enabled};return window.addEventListener("explore-mode",s),()=>window.removeEventListener("explore-mode",s)},[]),ze((s,c)=>{const u=Wn.current;if(!u)return;i.current+=c*(a.current?1:-1),i.current=_e.clamp(i.current,0,1);const p=i.current*i.current*(3-2*i.current),x=(ue.arrowright||ue.d?1:0)-(ue.arrowleft||ue.a?1:0)+(u.userData?.joyX??0);Math.abs(x)>.05&&(n.current-=x*c*2.5);const g=new ce(0,22,70);g.applyAxisAngle(new ce(0,1,0),n.current);const S=u.position.clone().add(g),L=new ce(0,20,100).add(new ce(Math.sin(i.current*Math.PI)*20,0,0)).lerp(S,p);e.position.lerp(L,.12);const P=new ce(0,5,0),b=u.position.clone();b.y+=6,e.lookAt(P.lerp(b,p))}),null}function cs(){const e=t.useRef(null),n=t.useRef(!1);return t.useEffect(()=>{const i=new Audio("/Ocean.mp3");i.loop=!0,i.preload="auto",i.volume=0,e.current=i;const a=(h,x=2e3)=>{if(!e.current)return;const g=e.current,S=g.volume,U=performance.now(),L=P=>{const b=Math.min((P-U)/x,1);g.volume=S+(h-S)*b,b<1?requestAnimationFrame(L):h===0&&(g.pause(),g.currentTime=0)};requestAnimationFrame(L)},s=async()=>{n.current=!0;try{i.paused&&await i.play(),a(.14,2400)}catch{}},c=()=>{n.current=!1,a(0,1800)},u=h=>{h.detail.active?s():c()},p=()=>{n.current&&s()};return window.addEventListener("skyocean-audio",u),window.addEventListener("pointerdown",p,{passive:!0}),window.addEventListener("keydown",p),document.getElementById("global-sky-ocean-bg")?.getAttribute("data-audio-active")==="1"&&s(),()=>{window.removeEventListener("skyocean-audio",u),window.removeEventListener("pointerdown",p),window.removeEventListener("keydown",p),i.pause(),i.src=""}},[]),null}function ls(){return t.useEffect(()=>{const e=new Audio("/bubble.mp3");e.preload="auto",e.volume=.24;const n=i=>{const a=i.detail.underwater;e.pause(),e.currentTime=0,e.playbackRate=a?.9:1.08,e.play().catch(()=>{})};return window.addEventListener("ocean-surface-cross",n),()=>{window.removeEventListener("ocean-surface-cross",n),e.pause(),e.src=""}},[]),null}function us(){return r.jsxs(r.Fragment,{children:[r.jsx(cs,{}),r.jsx(ls,{}),r.jsxs(Rr,{shadows:!0,dpr:[1,1.5],camera:{position:[0,20,100],fov:55,near:.1,far:Fi},gl:{antialias:!0,toneMapping:zr,toneMappingExposure:.8,outputColorSpace:Br},children:[r.jsx("color",{attach:"background",args:[Yn]}),r.jsx("directionalLight",{position:Vn,intensity:1,color:Xi,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-camera-near":10,"shadow-camera-far":1800,"shadow-camera-left":-500,"shadow-camera-right":500,"shadow-camera-top":500,"shadow-camera-bottom":-500}),r.jsx("ambientLight",{intensity:.35,color:"#ffffff"}),r.jsx(rs,{}),r.jsx(is,{}),r.jsxs(t.Suspense,{fallback:null,children:[r.jsx(Qi,{}),r.jsx(Ji,{}),r.jsx(Zi,{}),r.jsx(ts,{}),r.jsx(ss,{}),r.jsx(as,{})]}),r.jsx(os,{}),r.jsx(es,{}),r.jsx(ns,{})]})]})}Rt.preload("/wolfy.glb");Rt.preload("/island.gltf");function ot(e,n){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(n)}function ds(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function ps(){const{data:e,error:n}=await Q.from("archive_sections").select("*").eq("is_visible",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw ot(n,"Unable to load the archive sections.");return e??[]}async function Ys(){const{data:e,error:n}=await Q.from("archive_sections").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw ot(n,"Unable to load the archive section manager.");return e??[]}async function Xs(e,n,i){const a=e.trim(),s=ds(a),c=n.trim().toUpperCase().slice(0,8);if(!a||!s)throw new Error("Enter a section name.");if(!c)throw new Error("Enter a short section code.");const{data:u,error:p}=await Q.from("archive_sections").insert({name:a,slug:s,code:c,sort_order:i,is_visible:!0}).select("*").single();if(p)throw ot(p,"Unable to create the archive section.");return u}async function Hs(e,n){const i={...n,...n.name!==void 0?{name:n.name.trim()}:{},...n.code!==void 0?{code:n.code.trim().toUpperCase().slice(0,8)}:{}},{data:a,error:s}=await Q.from("archive_sections").update(i).eq("id",e).select("*").single();if(s)throw ot(s,"Unable to save the archive section.");return a}async function Gs(e){const{error:n}=await Q.from("archive_sections").delete().eq("id",e.id);if(n)throw ot(n,"Unable to delete this section. Move its books to another section first.")}const yn=[{id:"default-objects",slug:"objects",name:"Objects",code:"OBJ",sort_order:0,is_visible:!0,created_at:"",updated_at:""},{id:"default-graphics",slug:"graphics",name:"Graphics",code:"GRPH",sort_order:1,is_visible:!0,created_at:"",updated_at:""},{id:"default-concepts",slug:"concepts",name:"Concepts",code:"CNCP",sort_order:2,is_visible:!0,created_at:"",updated_at:""}],ms=`
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

@media (max-height: 599px) {
  .index-main-control-row {
    min-height: 36px;
    font-size: 12px;
  }

  .index-main-control-row button {
    font-size: 12px;
  }

  .index-intro-copy,
  .index-intro-control {
    font-size: 12px;
  }

  .index-intro-copy,
  .index-intro-control,
  .index-main-control-row,
  .index-main-control-row button,
  .index-archive-panel,
  .index-archive-panel button,
  .index-archive-search-input,
  .index-list-panel {
    font-weight: 400;
  }

  .index-archive-panel {
    margin-top: 12px;
    line-height: 1.35;
  }

  .index-archive-featured,
  .index-archive-category-button,
  .index-archive-search-input,
  .index-about-panel {
    font-size: 12px;
  }

  .index-archive-featured {
    min-height: 22px;
  }

  .index-archive-search-field {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .index-list-panel {
    top: calc(50% + clamp(64px, 12dvh, 72px));
    bottom: max(6px, env(safe-area-inset-bottom));
    height: auto !important;
    padding-top: 4px !important;
    padding-bottom: 0 !important;
    overflow: hidden;
  }

  .index-list-panel.is-list-open {
    transform: translateY(0) !important;
  }

  .index-list-panel.is-list-closed {
    transform: translateY(calc(100dvh + 100%)) !important;
  }

  .index-list-header,
  .index-list-row {
    font-size: 12px;
  }

  .index-list-scroll {
    max-height: none !important;
    height: calc(100% - 22px);
    overscroll-behavior: contain;
  }
}

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
`,re={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode"},fs="Gabriel Dell'Aiuto. b. 1996. TEXT 2",hs=()=>{const e=Ct(),i=t.useRef(sessionStorage.getItem(Ft)==="true").current,s=t.useRef(sessionStorage.getItem($t)==="true"||i||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,u=t.useRef(s&&sessionStorage.getItem(re.returnFlag)==="true").current,[p]=t.useState(()=>Jt()),[h,x]=t.useState(s),[g,S]=t.useState([]),[U,L]=t.useState(!0),[P,b]=t.useState(null),[T,I]=t.useState(yn),[_,E]=t.useState(!1),W=t.useCallback(async()=>{L(!0);try{const o=await zn();S(o),b(null)}catch(o){console.error("Unable to load published books",o),b(o instanceof Error?o.message:"Unable to load the published books.")}finally{L(!1)}},[]),j=t.useCallback(async()=>{try{const o=await ps();I(o),E(!0)}catch{I(yn),E(!1)}},[]);t.useEffect(()=>{W(),j();const o=()=>{W(),j()},f=()=>{document.visibilityState==="visible"&&W()};return window.addEventListener("focus",o),document.addEventListener("visibilitychange",f),()=>{window.removeEventListener("focus",o),document.removeEventListener("visibilitychange",f)}},[j,W]);const $=t.useMemo(()=>g.find(o=>o.is_featured)??g[0]??null,[g]),k=t.useMemo(()=>{if(_)return T;const o=[...T];return g.forEach(f=>{o.some(v=>v.slug===f.category)||o.push({id:`fallback-${f.category}`,slug:f.category,name:f.category.replace(/-/g," "),code:f.category.slice(0,4).toUpperCase(),sort_order:o.length,is_visible:!0,created_at:"",updated_at:""})}),o},[T,_,g]),A=t.useMemo(()=>{const o=new Map(k.map(v=>[v.slug,v])),f=v=>({id:v.id,category:o.get(v.category)?.code??v.category.slice(0,4).toUpperCase(),name:v.title,link:`/book/${encodeURIComponent(v.slug)}`,isFeatured:v.is_featured});return k.reduce((v,X)=>(v[X.slug]=g.filter(Re=>Re.category===X.slug).map(f),v),{})},[k,g]),H=t.useMemo(()=>Object.values(A).flat(),[A]);t.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const o="__GLOBAL_SKY_OCEAN_BG_ROOT__",f=window,v=document.getElementById("global-sky-ocean-bg");if(f[o]){v&&(v.style.display="block",v.style.zIndex="0");return}const X=document.createElement("div");X.id="global-sky-ocean-bg",Object.assign(X.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(X);const Re=Nn.createRoot(X);Re.render(r.jsx(t.Suspense,{fallback:null,children:r.jsx(us,{})})),f[o]=Re},[]);const D=i?"intro":sessionStorage.getItem(re.stage)||"intro",ke=sessionStorage.getItem(re.activeButton)||null,ie=sessionStorage.getItem(re.searchOpen)==="true",Ve=sessionStorage.getItem(re.searchQuery)||"",Se=sessionStorage.getItem(re.exploreMode)==="true",[C,Z]=t.useState(D),[V,Ee]=t.useState(ke),[B,ee]=t.useState(ie),[F,Me]=t.useState(Ve),[w,G]=t.useState(Se),q=D==="list"||!!ke||ie,[te,Ie]=t.useState(q),[ne,oe]=t.useState(!1),[de,se]=t.useState(!1),[pe,je]=t.useState(!1),[O,ve]=t.useState(!1);t.useEffect(()=>{if(!O||de)return;if(s){x(!0);return}x(!1);let o=0;const f=window.requestAnimationFrame(()=>{o=window.requestAnimationFrame(()=>{x(!0)})});return()=>{window.cancelAnimationFrame(f),window.cancelAnimationFrame(o)}},[O,s,de]);const[me,fe]=t.useState(!1),[z,De]=t.useState(!1),[ae,Ce]=t.useState(!1),[Ue,l]=t.useState(!1),[m,N]=t.useState(!u),Y=t.useRef(null),[M,he]=t.useState(()=>{if(s)return!1;try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),xe=t.useRef(null),le=t.useRef(null);t.useEffect(()=>()=>{Y.current&&window.clearTimeout(Y.current)},[]),t.useEffect(()=>{if(!pe||C!=="intro"||ae||z||!M)return;const o=window.setTimeout(()=>{l(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(o)}},[ae,pe,z,M,C]),t.useEffect(()=>{if(C!=="main"&&C!=="list"||z||!M||m)return;const o=window.setTimeout(()=>{N(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(o)}},[m,z,M,C]);const[d,y]=t.useState(!1),R=t.useRef(null),K=t.useRef(null),[we,Oe]=t.useState(!1);t.useEffect(()=>{if(!s)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem($t),sessionStorage.removeItem(Ft),sessionStorage.removeItem("revealDone"),he(!1),fe(!1),document.documentElement.style.background="",document.body.style.background="";const o=document.getElementById("global-sky-ocean-bg");o&&(o.style.display="block",o.style.zIndex="0")},[s]),t.useEffect(()=>{try{sessionStorage.setItem(re.exploreMode,String(w))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:w}}));const o=document.getElementById("global-sky-ocean-bg");o&&o.setAttribute("data-explore",w?"1":"0")},[w]),t.useEffect(()=>{const o=O&&!de&&!z;document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active",o?"1":"0");const v=window.setTimeout(()=>{window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:o}}))},0);return()=>window.clearTimeout(v)},[O,z,de]),t.useEffect(()=>()=>{document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active","0"),window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:!1}}))},[]),t.useEffect(()=>{sessionStorage.setItem(re.stage,C),sessionStorage.setItem(re.activeButton,V??""),sessionStorage.setItem(re.searchOpen,String(B)),sessionStorage.setItem(re.searchQuery,F)},[C,V,B,F]),t.useEffect(()=>{!sessionStorage.getItem(re.splash)&&C==="intro"&&!s?se(!0):je(!0),ve(!0)},[s,C]);const Hn=t.useCallback(()=>{sessionStorage.setItem(re.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const o=document.getElementById("global-sky-ocean-bg");o&&(o.style.display="none"),se(!1),e($?`/book/${encodeURIComponent($.slug)}`:"/books")},[$,e]);t.useEffect(()=>{(pe||s)&&!M&&!me&&!z&&fe(!0)},[pe,s,z,M,me]);const Gn=t.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}xe.current?(xe.current.classList.add("fade-out"),setTimeout(()=>{fe(!1),he(!0)},240)):(fe(!1),he(!0))},[]),ct=t.useCallback(o=>{z||(le.current=o,fe(!1),De(!0))},[z]),qn=t.useCallback(()=>{const o=le.current;if(!o)return;document.documentElement.style.background="white",document.body.style.background="white";const f=document.getElementById("global-sky-ocean-bg");f&&(f.style.display="none"),e(o)},[e]),Ne=t.useCallback(()=>{Ee(null),ee(!1),Me(""),Z("main")},[]),lt=t.useCallback(()=>{Ie(!1)},[]),Kn=t.useCallback(()=>{oe(!1),te&&Ne(),Ie(o=>!o),window.dispatchEvent(new Event("mousemove"))},[te,Ne]),Jn=t.useCallback(()=>{if(ne){oe(!1);return}Ne(),Ie(!1),oe(!0),window.dispatchEvent(new Event("mousemove"))},[ne,Ne]),ut=t.useMemo(()=>H.filter(o=>o.name.toLowerCase().includes(F.toLowerCase())),[H,F]),Qn=t.useCallback(()=>{if(V&&V!=="search"&&!F){const o=A[V]||[],f=H.filter(v=>!o.some(X=>X.id===v.id));return[...o,...f]}if(V==="search"&&F){const o=ut,f=H.filter(v=>!o.some(X=>X.id===v.id));return[...o,...f]}return H},[V,F,A,H,ut])(),Zn=t.useCallback(o=>{V===o?Ne():(Ee(o),Z("list"),ee(!1),Me(""))},[V,Ne]),tn=t.useCallback(o=>{const f=K.current?K.current.scrollTop:0;sessionStorage.setItem(re.listScroll,String(f));const v={activeButton:V,searchOpen:B,searchQuery:F,stage:C,introVisible:pe,archiveOpen:te};try{sessionStorage.setItem(re.snapshot,JSON.stringify(v))}catch{}sessionStorage.setItem(re.returnFlag,"true"),ct(o)},[V,te,ct,pe,B,F,C]),nn=t.useCallback(()=>{Ne(),lt(),oe(!1),Ce(!1),l(!1),Z("intro")},[lt,Ne]),er=t.useCallback(()=>{ae||z||(Ce(!0),N(!1),lt(),oe(!1),Y.current=window.setTimeout(()=>{Z("main"),Ce(!1)},1160))},[lt,ae,z]),tr=t.useCallback(()=>{!p||z||ct(`/book/${encodeURIComponent(p.slug)}`)},[ct,p,z]),nr=t.useCallback(()=>{V==="search"?Ne():(ee(!0),Z("list"),Ee("search"))},[V,Ne]),dt=t.useCallback(()=>{y(!1),R.current&&clearTimeout(R.current),R.current=window.setTimeout(()=>{y(!0)},5e3)},[]);t.useEffect(()=>{const o=["mousemove","mousedown","touchstart","touchmove","keydown"];return o.forEach(f=>{window.addEventListener(f,dt)}),dt(),()=>{o.forEach(f=>{window.removeEventListener(f,dt)}),R.current&&clearTimeout(R.current)}},[dt]),t.useEffect(()=>{if(!O||!(sessionStorage.getItem(re.returnFlag)==="true"))return;let f=null;try{const v=sessionStorage.getItem(re.snapshot);f=v?JSON.parse(v):null}catch{}if(f){Ee(f.activeButton??null),ee(!!f.searchOpen),Me(f.searchQuery??""),f.archiveOpen||f.stage==="list"?Ie(!0):Ie(!1),f.stage&&Z(f.stage),je(!!f.introVisible),f.stage==="list"&&Oe(!0),sessionStorage.removeItem(re.returnFlag);return}je(!0),Z("main"),Ie(!0),window.setTimeout(()=>{Z("list"),Oe(!0),sessionStorage.removeItem(re.returnFlag)},700)},[O]),t.useEffect(()=>{if(C!=="list"||!we)return;const o=Number(sessionStorage.getItem(re.listScroll)||"0"),f=window.setTimeout(()=>{K.current&&(K.current.scrollTop=Number.isNaN(o)?0:o),Oe(!1)},0);return()=>{window.clearTimeout(f)}},[C,we]);const rr=t.useRef(null),et=t.useRef(null),pt=t.useRef(!1),_t=t.useRef(!1),mt=t.useRef(!1),Mt=t.useRef({x:0,y:0}),tt=t.useRef({x:0,y:0}),ft=60,qe=t.useCallback((o,f)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:o,z:f}}))},[]),ht=t.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]),$e=t.useCallback(o=>{window.dispatchEvent(new CustomEvent("explore-vertical",{detail:{y:o}}))},[]),rn=t.useCallback((o,f)=>{o.preventDefault(),o.stopPropagation(),o.currentTarget.setPointerCapture(o.pointerId),$e(f)},[$e]),gt=t.useCallback(o=>{o.preventDefault(),o.stopPropagation(),o.currentTarget.hasPointerCapture(o.pointerId)&&o.currentTarget.releasePointerCapture(o.pointerId),$e(0)},[$e]);t.useEffect(()=>{w||(qe(0,0),$e(0))},[w,qe,$e]),t.useEffect(()=>{if(!w)return;const o=v=>{v.code==="Space"&&(v.preventDefault(),v.stopPropagation(),v.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},f=v=>{v.code==="Space"&&(o(v),v.repeat||ht())};return window.addEventListener("keydown",f,!0),window.addEventListener("keyup",o,!0),()=>{window.removeEventListener("keydown",f,!0),window.removeEventListener("keyup",o,!0)}},[w,ht]);const ir=t.useCallback(o=>{if(!w)return;pt.current=!0,o.currentTarget.setPointerCapture(o.pointerId);const f=o.currentTarget.getBoundingClientRect();tt.current={x:f.left+f.width/2,y:f.top+f.height/2},Mt.current={x:o.clientX,y:o.clientY},mt.current=!1,_t.current=Math.hypot(o.clientX-tt.current.x,o.clientY-tt.current.y)<=34},[w]),sr=t.useCallback(o=>{if(!pt.current||!et.current)return;const f=o.clientX-tt.current.x,v=o.clientY-tt.current.y;Math.hypot(o.clientX-Mt.current.x,o.clientY-Mt.current.y)>8&&(mt.current=!0);const X=Math.hypot(f,v),Re=X>ft?ft:X,on=f/(X||1)*Re,cn=v/(X||1)*Re;et.current.style.transform=`translate(${on}px, ${cn}px)`;const or=on/ft,cr=-cn/ft;qe(or,cr)},[qe]),sn=t.useCallback(o=>{pt.current&&(pt.current=!1,o.currentTarget.hasPointerCapture(o.pointerId)&&o.currentTarget.releasePointerCapture(o.pointerId),et.current&&(et.current.style.transform="translate(0px, 0px)"),qe(0,0),o.type!=="pointercancel"&&_t.current&&!mt.current&&ht(),_t.current=!1,mt.current=!1)},[qe,ht]),ar=t.useCallback(o=>!!(V&&V!=="search"&&A[V]?.some(f=>f.id===o.id)||V==="search"&&F&&ut.some(f=>f.id===o.id)),[V,A,ut,F]),It=pe&&C==="intro"?z||ae?"is-leaving":M?Ue?"is-visible":"is-entering":"is-outside":"is-outside",an=(C==="main"||C==="list")&&z?"is-leaving":M?m?"is-visible":"is-entering":"is-outside",xt=C==="main"||C==="list"?an:"is-outside",Nt=C==="list"?"-15vh":te||ne?"-42px":"0px",Ke=k.length+3,bt=o=>({animate:{y:C==="main"||C==="list"?Nt:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:o*.025}}),nt=(o,f=Ke)=>{const v=o*.055,X=Math.max(0,f-1-o)*.035,Re={scale:0,opacity:0,filter:"blur(8px)",y:Nt};return{initial:Re,animate:z?{...Re,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:X},opacity:{duration:.16,delay:X},filter:{duration:.2,delay:X},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:X}}}:{scale:1,opacity:1,filter:"blur(0px)",y:Nt},exit:{...Re,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:X},opacity:{duration:.16,delay:X},filter:{duration:.2,delay:X},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:X}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:v},opacity:{duration:.2,delay:v},filter:{duration:.25,delay:v},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:o*.025}}}};return O?r.jsxs(r.Fragment,{children:[r.jsx("style",{children:ms}),de?r.jsx(zi,{onComplete:Hn}):r.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${s?"is-returning-from-book":h?"is-entered":"is-entering"}`,children:[r.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:d?0:1},children:[r.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${pe&&C==="intro"?"":"pointer-events-none"} ${w?"opacity-0 pointer-events-none":"opacity-100"}`,children:[r.jsxs("p",{className:`index-intro-copy intro-elastic-item ${It} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:nn,children:["TEXT 1",r.jsx("br",{})]}),r.jsxs("div",{className:"flex items-center justify-center gap-2",children:[r.jsx("button",{onClick:tr,disabled:!Ue||ae,className:`index-intro-control intro-elastic-item item-start ${It} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:r.jsx("span",{className:"animate-bounce",children:"BACK"})}),p&&r.jsx("button",{type:"button",onClick:er,disabled:!Ue||z,className:`index-intro-control intro-elastic-item item-back ${It} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:"START"})]})]}),r.jsxs("div",{className:`absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl ${C==="intro"?"pointer-events-none":""}`,style:{top:"calc(50% - 24px)"},children:[r.jsxs("div",{className:"index-main-control-row flex min-h-12 items-center justify-center gap-5 text-[16px] font-normal md:gap-10 md:text-[16px]",children:[r.jsx(be.div,{...bt(0),children:r.jsx("div",{className:`main-control-item item-back ${xt}`,children:r.jsx("button",{onClick:nn,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${w?"pointer-events-none opacity-0":"opacity-100"}`,children:"BACK"})})}),r.jsx(be.div,{...bt(1),children:r.jsx("div",{className:`main-control-item item-archive ${xt}`,children:r.jsx("button",{type:"button",onClick:Kn,"aria-expanded":te,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${te?"animate-bounce":""} ${w?"pointer-events-none opacity-0":"opacity-100"}`,children:"ARCHIVE"})})}),r.jsx(be.div,{...bt(2),children:r.jsx("div",{className:`main-control-item item-about ${xt}`,children:r.jsx("button",{type:"button",onClick:Jn,"aria-expanded":ne,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${ne?"animate-bounce":""} ${w?"pointer-events-none opacity-0":"opacity-100"}`,children:"BIO"})})}),r.jsx(be.div,{...bt(3),children:r.jsx("div",{className:`main-control-item item-play ${xt}`,children:r.jsxs("button",{onClick:o=>{o.currentTarget.blur(),G(f=>!f)},title:w?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${w?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[r.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${w?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),r.jsx("span",{className:`whitespace-nowrap font-normal transition-all ${w?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"PLAY"})]})})})]}),r.jsx(ln,{initial:!1,mode:"wait",children:te?r.jsxs(be.div,{initial:!1,className:`index-archive-panel mx-auto mt-10 pb-0 text-center font-normal leading-[2] transition-opacity duration-500 ${w?"pointer-events-none opacity-0":"opacity-100"}`,children:[r.jsx(be.div,{...nt(0,Ke),className:"index-archive-featured archive-elastic-item item-featured min-h-[32px] text-[16px] md:text-[16px]",children:$?r.jsxs("button",{type:"button",onClick:()=>tn(`/book/${encodeURIComponent($.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[r.jsx("span",{className:"shrink-0 text-black",children:"COVER"})," ",r.jsx("br",{})," ",r.jsx("br",{}),r.jsx("span",{className:"truncate",children:$.title})]}):U?r.jsx("span",{className:"text-black/50",children:"..."}):P?r.jsx("button",{type:"button",onClick:()=>void W(),className:"text-black/60 bounce",children:"RETRY BOOK LIST"}):r.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),r.jsxs("div",{className:"index-archive-category-row flex flex-wrap items-center justify-center gap-2 uppercase md:gap-3",children:[r.jsx(be.div,{...nt(1,Ke),className:"archive-elastic-item item-search",children:r.jsx("button",{onClick:nr,className:`index-archive-category-button z-10 flex items-center text-[16px] font-normal uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${V==="search"?"animate-bounce":"bg-alpha"}`,children:"search"})}),k.map((o,f)=>r.jsx(be.div,{...nt(f+2,Ke),className:`archive-elastic-item item-${o.slug}`,children:r.jsx("button",{onClick:()=>{Zn(o.slug)},className:`index-archive-category-button text-[16px] font-normal uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${V===o.slug?"animate-bounce":"bg-alpha"}`,children:o.name})},o.id))]}),r.jsx(be.div,{...nt(Ke-1,Ke),className:"index-archive-search-field archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:r.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${B?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:r.jsx("input",{type:"text",placeholder:"Search...",value:F,onChange:o=>{Me(o.target.value)},className:"index-archive-search-input w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls"):ne?r.jsx(be.div,{initial:!1,className:`mx-auto mt-10 max-w-xl pb-0 text-center leading-[1.55] ${w?"pointer-events-none opacity-0":"opacity-100"}`,children:r.jsx(be.div,{...nt(0,2),className:"index-about-panel archive-elastic-item px-2 text-[16px] font-normal md:text-[16px]",children:r.jsx("p",{children:fs})})},"about-panel"):null})]}),r.jsx("div",{className:`index-list-panel ${C==="list"?"is-list-open":"is-list-closed"} absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] font-normal md:text-[16px] ease-in-out ${C==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${w?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:r.jsxs("div",{className:`index-elastic-item item-list ${an}`,children:[r.jsxs("div",{className:"index-list-header grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] font-normal md:text-[16px]",children:[r.jsx("div",{className:"py-[0.5px]",children:"TAG"}),r.jsx("div",{className:"py-[0.5px]",children:"TITLE"})]}),!U&&!P&&H.length===0?r.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):r.jsx("div",{ref:K,className:"index-list-scroll overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:r.jsx(ln,{initial:!1,mode:"popLayout",children:Qn.map((o,f)=>{const v=ar(o);return r.jsxs(be.div,{initial:{scale:0,opacity:0,filter:"blur(7px)"},animate:{scale:1,opacity:1,filter:"blur(0px)"},exit:{scale:0,opacity:0,filter:"blur(7px)"},whileHover:{scale:.97},whileTap:{scale:.95},transition:{scale:{type:"spring",stiffness:430,damping:23,mass:.68,delay:f*.022},opacity:{duration:.18,delay:f*.022},filter:{duration:.22,delay:f*.022}},className:`index-list-row grid origin-center grid-cols-2 text-[16px] md:text-[16px] backdrop-blur-[1px] cursor-pointer ${v?"text-black":"text-gray-700"}`,onClick:()=>{tn(o.link)},children:[r.jsx("div",{className:"py-[0.5px] tracking-normal",children:o.category}),r.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[o.name,o.isFeatured?" *":""]})]},`${V??"all"}:${o.id}`)})})})]})})]}),w&&r.jsxs(r.Fragment,{children:[r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move down (Q)",onPointerDown:o=>rn(o,-1),onPointerUp:gt,onPointerCancel:gt,onLostPointerCapture:()=>$e(0),className:"fixed bottom-[48px] flex h-11 w-11 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border border-white/25 bg-transparent text-[12px] font-normal text-white/65 backdrop-blur-sm",style:{left:"calc(50% - 82px)",zIndex:20},children:"Q ↓"}),r.jsx("div",{ref:rr,"data-ocean-control":!0,onPointerDown:ir,onPointerMove:sr,onPointerUp:sn,onPointerCancel:sn,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:r.jsx("div",{ref:et,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:r.jsx("span",{"aria-hidden":"true",children:"↑"})})}),r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move up (E)",onPointerDown:o=>rn(o,1),onPointerUp:gt,onPointerCancel:gt,onLostPointerCapture:()=>$e(0),className:"fixed bottom-[48px] flex h-11 w-11 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border border-white/25 bg-transparent text-[12px] font-normal text-white/65 backdrop-blur-sm",style:{left:"calc(50% + 82px)",zIndex:20},children:"E ↑"})]}),(!M&&(me||s)||z)&&r.jsx("div",{ref:xe,className:"reveal-overlay","aria-hidden":"true",children:r.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[r.jsx("defs",{children:r.jsxs("mask",{id:"hole-mask",children:[r.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),r.jsx("circle",{className:`mask-circle ${z?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:z?qn:Gn})]})}),r.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},gs=t.lazy(()=>We(()=>import("./AdminPortal-KWlcv_-1.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),xs=t.lazy(()=>We(()=>import("./Archive-TOYF_sLE.js"),__vite__mapDeps([9,10,1,2,6,4,5,7]))),bs=t.lazy(()=>We(()=>import("./object01-BxHKGjj0.js"),__vite__mapDeps([11,10,1,2]))),vs=t.lazy(()=>We(()=>import("./Message-i0ciG8lS.js"),__vite__mapDeps([12,1,2,7,4,5,6]))),ws=t.lazy(()=>We(()=>import("./NotFound-DBAr_sT_.js"),__vite__mapDeps([13,1,2]))),ys=t.lazy(()=>We(()=>import("./WatchStudio-DFJmbzoZ.js"),__vite__mapDeps([8,1,2,4,5,3,7,6]))),ks=new wr,kn=()=>{const e=Ct();return r.jsx(gs,{onBack:()=>e("/")})},Sn=()=>{const e=Ct(),{slug:n}=jr();return r.jsx(Pi,{initialSlug:n??null,onBack:()=>e("/"),onLogin:()=>e("/login"),onThreeD:()=>e("/3d"),onBookChange:i=>{e(`/book/${encodeURIComponent(i)}`,{replace:!0})}})},Ss=()=>{const e=Ct();return r.jsx(ys,{onBack:()=>{const n=Jt();e(n?`/book/${encodeURIComponent(n.slug)}`:"/books")}})},Es=()=>{const{pathname:e}=Sr(),n=e==="/";return r.jsxs("div",{className:`fixed inset-0 overflow-hidden ${n?"bg-transparent":"bg-white dark:bg-black"}`,children:[r.jsx(ii,{}),r.jsx(si,{}),r.jsx(t.Suspense,{fallback:r.jsx("div",{className:"fixed inset-0 bg-white"}),children:r.jsxs(Er,{children:[r.jsx(Pe,{path:"/",element:r.jsx(hs,{})}),r.jsx(Pe,{path:"/archive",element:r.jsx(xs,{})}),r.jsx(Pe,{path:"/message",element:r.jsx(vs,{})}),r.jsx(Pe,{path:"/object01",element:r.jsx(bs,{})}),r.jsx(Pe,{path:"/login",element:r.jsx(kn,{})}),r.jsx(Pe,{path:"/admin",element:r.jsx(kn,{})}),r.jsx(Pe,{path:"/3d",element:r.jsx(Ss,{})}),r.jsx(Pe,{path:"/books",element:r.jsx(Sn,{})}),r.jsx(Pe,{path:"/book/:slug",element:r.jsx(Sn,{})}),r.jsx(Pe,{path:"*",element:r.jsx(ws,{})})]})})]})},js=()=>r.jsx(yr,{client:ks,children:r.jsx(Ai,{children:r.jsx(ai,{children:r.jsx(kr,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:r.jsx(Es,{})})})})}),En=sessionStorage.getItem("redirect");En&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",En));Nn.createRoot(document.getElementById("root")).render(r.jsx(js,{}));export{yn as D,As as M,Ls as a,Xe as b,Xs as c,Gs as d,Bs as e,zs as f,Ds as g,Us as h,$s as i,Ws as j,Q as k,Ys as l,Fs as m,Vs as n,ei as o,Os as p,hi as s,Hs as u};
