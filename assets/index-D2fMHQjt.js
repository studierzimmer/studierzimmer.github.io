const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-VXgpY42B.js","assets/vendor-DYJyzUfl.js","assets/three-B81a7shT.js","assets/AdminThreeDModelManager-CP7iRp3h.js","assets/react-three-s54XUSep.js","assets/postprocessing-DQGK4Izs.js","assets/motion-BCTRx_rm.js","assets/supabase-Ceyhdef9.js","assets/WatchStudio-X4_bY7vf.js","assets/Archive-brCwI5wp.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-BxHKGjj0.js","assets/Message-x80eM2Kv.js","assets/NotFound-DBAr_sT_.js"])))=>i.map(i=>d[i]);
var ur=Object.defineProperty;var dr=(e,n,i)=>n in e?ur(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i;var Me=(e,n,i)=>dr(e,typeof n!="symbol"?n+"":n,i);import{r as t,ay as mr,az as pr,j as r,aA as Rn,aB as Cn,aC as Tn,aD as _n,aE as fr,aF as Mn,aG as In,aH as hr,aI as gr,aJ as xr,aK as br,aL as Nn,aM as vr,aN as wr,aO as Ut,aP as Rt,ar as Pn,aQ as yr,aR as kr,aS as Sr,aT as Er,aU as jr,aV as Ae,aW as Rr}from"./vendor-DYJyzUfl.js";import{_ as Xe,u as Cr,a as Ct,C as Tr,b as qe,c as Ue,S as _r,d as Ht,W as Mr,e as Ir,f as ze,g as Nr}from"./react-three-s54XUSep.js";import{c as Pr}from"./supabase-Ceyhdef9.js";import{u as Pt,a as Ze,m as ye,A as un}from"./motion-BCTRx_rm.js";import{V as J,u as Tt,D as Ar,R as Or,g as Lr,L as $t,C as Br,b4 as qt,Y as ge,k as zr,bc as Dr,aG as Gt,y as Ur,aA as Kt,a8 as Jt,P as $r,Q as Ve,c as Fr,af as Wr,d as Vr,M as st,aT as Xr,m as Yr,ab as Hr,bd as qr,a7 as Gr,aI as Kr}from"./three-B81a7shT.js";import"./postprocessing-DQGK4Izs.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function i(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(s){if(s.ep)return;s.ep=!0;const c=i(s);fetch(s.href,c)}})();const Jr=1,Zr=1e6;let At=0;function Qr(){return At=(At+1)%Number.MAX_SAFE_INTEGER,At.toString()}const Ot=new Map,dn=e=>{if(Ot.has(e))return;const n=setTimeout(()=>{Ot.delete(e),it({type:"REMOVE_TOAST",toastId:e})},Zr);Ot.set(e,n)},ei=(e,n)=>{switch(n.type){case"ADD_TOAST":return{...e,toasts:[n.toast,...e.toasts].slice(0,Jr)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(i=>i.id===n.toast.id?{...i,...n.toast}:i)};case"DISMISS_TOAST":{const{toastId:i}=n;return i?dn(i):e.toasts.forEach(a=>{dn(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,open:!1}:a)}}case"REMOVE_TOAST":return n.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(i=>i.id!==n.toastId)}}},yt=[];let kt={toasts:[]};function it(e){kt=ei(kt,e),yt.forEach(n=>{n(kt)})}function ti({...e}){const n=Qr(),i=s=>it({type:"UPDATE_TOAST",toast:{...s,id:n}}),a=()=>it({type:"DISMISS_TOAST",toastId:n});return it({type:"ADD_TOAST",toast:{...e,id:n,open:!0,onOpenChange:s=>{s||a()}}}),{id:n,dismiss:a,update:i}}function ni(){const[e,n]=t.useState(kt);return t.useEffect(()=>(yt.push(n),()=>{const i=yt.indexOf(n);i>-1&&yt.splice(i,1)}),[e]),{...e,toast:ti,dismiss:i=>it({type:"DISMISS_TOAST",toastId:i})}}function Ge(...e){return mr(pr(e))}const ri=gr,An=t.forwardRef(({className:e,...n},i)=>r.jsx(Rn,{ref:i,className:Ge("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...n}));An.displayName=Rn.displayName;const ii=hr("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),On=t.forwardRef(({className:e,variant:n,...i},a)=>r.jsx(Cn,{ref:a,className:Ge(ii({variant:n}),e),...i}));On.displayName=Cn.displayName;const si=t.forwardRef(({className:e,...n},i)=>r.jsx(Tn,{ref:i,className:Ge("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",e),...n}));si.displayName=Tn.displayName;const Ln=t.forwardRef(({className:e,...n},i)=>r.jsx(_n,{ref:i,className:Ge("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...n,children:r.jsx(fr,{className:"h-4 w-4"})}));Ln.displayName=_n.displayName;const Bn=t.forwardRef(({className:e,...n},i)=>r.jsx(Mn,{ref:i,className:Ge("text-sm font-semibold",e),...n}));Bn.displayName=Mn.displayName;const zn=t.forwardRef(({className:e,...n},i)=>r.jsx(In,{ref:i,className:Ge("text-sm opacity-90",e),...n}));zn.displayName=In.displayName;function ai(){const{toasts:e}=ni();return r.jsxs(ri,{children:[e.map(function({id:n,title:i,description:a,action:s,...c}){return r.jsxs(On,{...c,children:[r.jsxs("div",{className:"grid gap-1",children:[i&&r.jsx(Bn,{children:i}),a&&r.jsx(zn,{children:a})]}),s,r.jsx(Ln,{})]},n)}),r.jsx(An,{})]})}const oi=({...e})=>{const{theme:n="system"}=xr();return r.jsx(br,{theme:n,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})},ci=vr,li=t.forwardRef(({className:e,sideOffset:n=4,...i},a)=>r.jsx(Nn,{ref:a,sideOffset:n,className:Ge("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...i}));li.displayName=Nn.displayName;const ui="https://pmpspnvfgkzprgntihtx.supabase.co",di="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",at="book-pages",Ls="models-3d",Q=Pr(ui,di,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),mi=50*1024*1024;function xe(e,n){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(n)}function pi(e){const{data:n}=Q.storage.from(at).getPublicUrl(e);return n.publicUrl}function fi(e){return{...e,public_url:pi(e.storage_path)}}function hi(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function gi(e){if(e.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const n of e){const i=n.name.toLowerCase(),a=i.endsWith(".jpg")||i.endsWith(".jpeg"),s=n.type==="image/jpeg"||n.type==="";if(!a||!s)throw new Error(`${n.name} is not a JPG/JPEG image.`);if(n.size>mi)throw new Error(`${n.name} is larger than 50 MB.`)}}function xi(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function Bs(){const{data:e,error:n}=await Q.rpc("is_admin");if(n)throw xe(n,"Unable to verify administrator access.");return e===!0}async function Dn(){const{data:e,error:n}=await Q.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(n)throw xe(n,"Unable to load books.");return e??[]}async function zs(){const{data:e,error:n}=await Q.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw xe(n,"Unable to load the admin book list.");return e??[]}async function He(e){const{data:n,error:i}=await Q.from("book_pages").select("*").eq("book_id",e).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(i)throw xe(i,"Unable to load the book pages.");return(n??[]).map(fi)}async function Ds(e){const n=xi(e.slug);if(!n)throw new Error("The book needs a valid slug.");const{data:i,error:a}=await Q.from("books").insert({title:e.title.trim(),slug:n,storage_folder:n,category:e.category,description:e.description?.trim()??"",is_published:e.is_published??!1,is_featured:!1,sort_order:e.sort_order??0}).select("*").single();if(a)throw xe(a,"Unable to create the book.");return i}async function Us(e,n){const{data:i,error:a}=await Q.from("books").update(n).eq("id",e).select("*").single();if(a)throw xe(a,"Unable to save the book.");return i}async function $s(e){const{error:n}=await Q.rpc("set_featured_book",{p_book_id:e});if(n)throw xe(n,"Unable to set the featured book.")}async function Fs(e,n,i){const a=[...n].sort((m,h)=>m.name.localeCompare(h.name,void 0,{numeric:!0,sensitivity:"base"}));gi(a);let c=(await He(e.id)).reduce((m,h)=>Math.max(m,h.page_number),0)+1,u=0;for(const m of a){const h=`${e.storage_folder}/${String(c).padStart(4,"0")}-${hi()}.jpg`,{error:b}=await Q.storage.from(at).upload(h,m,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(b)throw xe(b,`Unable to upload ${m.name}.`);const{error:g}=await Q.from("book_pages").insert({book_id:e.id,storage_path:h,file_name:m.name,page_number:c});if(g)throw await Q.storage.from(at).remove([h]),xe(g,`Unable to register ${m.name}.`);c+=1,u+=1,i?.(u,a.length)}return He(e.id)}async function bi(e){const i=(await He(e)).map((c,u)=>({page:c,nextNumber:u+1})).filter(({page:c,nextNumber:u})=>c.page_number!==u).map(({page:c,nextNumber:u})=>Q.from("book_pages").update({page_number:u}).eq("id",c.id)),s=(await Promise.all(i)).find(c=>c.error);if(s?.error)throw xe(s.error,"Unable to renumber the pages.")}async function Ws(e){const{error:n}=await Q.storage.from(at).remove([e.storage_path]);if(n)throw xe(n,"Unable to delete the image from Storage.");const{error:i}=await Q.from("book_pages").delete().eq("id",e.id);if(i)throw xe(i,"The image was removed, but its database row remains.");await bi(e.book_id)}async function Vs(e,n,i){const a=n+i;if(n<0||a<0||a>=e.length)return e;const s=e[n],c=e[a],{error:u}=await Q.rpc("swap_book_pages",{p_first_page_id:s.id,p_second_page_id:c.id});if(u)throw xe(u,"Unable to reorder the pages.");return He(s.book_id)}async function Xs(e){const i=(await He(e.id)).map(s=>s.storage_path);if(i.length>0){const{error:s}=await Q.storage.from(at).remove(i);if(s)throw xe(s,"Unable to delete this book's image folder.")}const{error:a}=await Q.from("books").delete().eq("id",e.id);if(a)throw xe(a,"Unable to delete the book record.")}const vi={a4_long_edge:{width:480,height:679,minWidth:90,maxWidth:600,minHeight:127,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:110,maxWidth:680,minHeight:78,maxHeight:481},square:{width:560,height:560,minWidth:96,maxWidth:620,minHeight:96,maxHeight:620}},mn=8,wi=8,pn=360,yi=42,ki=1,Si=5;function vt(e,n,i){return Math.min(i,Math.max(n,e))}function fn(e,n,i){const a=Math.max(2,n-mn*2),s=Math.max(1,i-mn*2),c=e.width/e.height,u=a/2/c,m=Math.max(1,Math.min(s,u,e.maxHeight)),h=Math.max(1,Math.min(m*c,e.maxWidth));return{width:Math.floor(h),height:Math.floor(h/c)}}const Ei=t.forwardRef(function({page:n,isCover:i,onImageReady:a},s){return r.jsx("div",{ref:s,"data-density":i?"hard":"soft",className:"h-full w-full overflow-hidden bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:r.jsx("img",{src:n.public_url,alt:`Page ${n.page_number}: ${n.file_name}`,draggable:!1,decoding:"async",onLoad:a,onError:a,className:"pointer-events-none h-full w-full select-none object-cover object-center"})})});function ji({book:e,pages:n,initialPage:i=0,bookMotionClassName:a="is-visible",onPageChange:s,onReady:c}){const u=t.useRef(null),m=t.useRef(null),h=t.useRef(e.id),b=t.useRef(0),g=t.useRef(!1),E=t.useRef(!1),U=t.useRef(!1),A=t.useRef(!1),M=t.useRef(null),w=t.useRef({time:0,x:0,y:0,pointerType:""}),j=t.useRef(null),D=t.useRef(null),C=t.useRef([]),x=t.useRef({width:1,height:1}),O=e.page_format??"a4_long_edge",N=vi[O],R=Math.min(Math.max(0,Math.floor(i)),Math.max(0,n.length-1)),v=t.useRef(!1),I=t.useRef(!1),P=t.useRef(new Set),V=t.useRef(new Set([R-1,R,R+1].filter(l=>l>=0&&l<n.length)));h.current!==e.id&&(h.current=e.id,b.current=R);const[Se,se]=t.useState(R),[ve,we]=t.useState(0),[T,ee]=t.useState(!1),[Y,Re]=t.useState(!1),[$,te]=t.useState(!1),[X,Ie]=t.useState(()=>fn(N,640,480)),k=Pt(1),G=Pt(0),K=Pt(0),ne=t.useCallback(()=>{I.current||!v.current||![...V.current].every(l=>P.current.has(l))||(I.current=!0,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>c?.(e.id))}))},[e.id,c]),Ne=t.useCallback(l=>{V.current.has(l)&&(P.current.add(l),ne())},[ne]),re=t.useCallback(()=>{C.current.forEach(l=>l.stop()),C.current=[]},[]),ce=t.useCallback(()=>{const l=b.current===0||b.current>=n.length-1;return{width:X.width*(l?1:2),height:X.height}},[X.height,X.width,n.length]),de=t.useCallback((l,p,B)=>{const H=x.current,L=ce(),he=Math.max(0,(L.width*l-H.width)/2),be=Math.max(0,(L.height*l-H.height)/2);return{x:vt(p,-he,he),y:vt(B,-be,be)}},[ce]),ae=t.useCallback((l,p,B,H=k.get(),L=G.get(),he=K.get())=>{const be=x.current,le=vt(l,ki,Si),d=le/Math.max(1e-4,H),S=p-be.width/2,_=B-be.height/2,Z=de(le,S-(S-L)*d,_-(_-he)*d);return k.set(le),G.set(Z.x),K.set(Z.y),{scale:le,...Z}},[de,G,K,k]),me=t.useCallback(()=>{const l=x.current,p=ce(),B=Math.min((l.width-24)/Math.max(1,p.width),(l.height-24)/Math.max(1,p.height));return vt(B,1.25,3.6)},[ce]),Ce=t.useCallback((l,p,B)=>{re(),D.current&&(window.clearTimeout(D.current),D.current=null);const H={width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)};x.current=H,g.current=!0,E.current=!1,Re(!1),ee(!0),k.set(1),G.set(0),K.set(0);const L=ae(me(),l,p,1,0,0);return B&&(k.set(1),G.set(0),K.set(0),window.requestAnimationFrame(()=>{C.current=[Ze(k,L.scale,{type:"spring",stiffness:260,damping:24,mass:.74}),Ze(G,L.x,{type:"spring",stiffness:280,damping:27,mass:.72}),Ze(K,L.y,{type:"spring",stiffness:280,damping:27,mass:.72})]})),L},[me,G,K,re,ae,k]),z=t.useCallback(()=>{!g.current||E.current||(re(),E.current=!0,Re(!0),C.current=[Ze(k,1,{type:"spring",stiffness:330,damping:28,mass:.7}),Ze(G,0,{type:"spring",stiffness:330,damping:28,mass:.7}),Ze(K,0,{type:"spring",stiffness:330,damping:28,mass:.7})],D.current=window.setTimeout(()=>{g.current=!1,E.current=!1,ee(!1),Re(!1),k.set(1),G.set(0),K.set(0),D.current=null},430))},[G,K,re,k]),Ee=t.useCallback(l=>{window.requestAnimationFrame(()=>{const p=l??u.current?.pageFlip();if(!p)return;const B=p.getCurrentPageIndex(),H=p.getBoundsRect();b.current=B,se(B),s?.(B),p.getOrientation()!=="landscape"?we(0):B===0?we(-(H.pageWidth/2)):B>=n.length-1?we(H.pageWidth/2):we(0)})},[s,n.length]);t.useLayoutEffect(()=>{const l=m.current;if(!l)return;const p=()=>{const H=window.getComputedStyle(l),L=Number.parseFloat(H.paddingLeft)+Number.parseFloat(H.paddingRight),he=Number.parseFloat(H.paddingTop)+Number.parseFloat(H.paddingBottom),be=Math.max(1,l.clientWidth-L),le=Math.max(1,l.clientHeight-he);if(x.current={width:be,height:le},!g.current){const d=fn(N,be,le);Ie(S=>S.width===d.width&&S.height===d.height?S:d),te(!0)}Ee()};p();const B=new ResizeObserver(p);return B.observe(l),window.addEventListener("resize",p),()=>{B.disconnect(),window.removeEventListener("resize",p)}},[T,N,Ee]),t.useEffect(()=>{b.current=R,se(R),we(0),g.current=!1,E.current=!1,ee(!1),Re(!1),k.set(1),G.set(0),K.set(0),w.current.time=0,M.current=null,A.current=!1},[e.id,G,K,R,k]),t.useEffect(()=>{if(!T)return;const l=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=l}},[T]);const pe=t.useCallback(()=>{j.current&&(window.clearTimeout(j.current),j.current=null)},[]),fe=t.useCallback(l=>{if(E.current||!l.isPrimary||l.pointerType==="mouse"&&l.button!==0)return;const p=window.performance.now(),B=w.current,H=p-B.time>0&&p-B.time<pn&&B.pointerType===l.pointerType&&Math.hypot(l.clientX-B.x,l.clientY-B.y)<yi,L=g.current,he=l.currentTarget.getBoundingClientRect();H?(pe(),w.current.time=0,A.current=!0,re()):A.current=L,M.current={pointerId:l.pointerId,pointerType:l.pointerType,mode:H?"zoom-slider":L?"pan":"page",startedZoomed:L,startX:l.clientX,startY:l.clientY,startPanX:G.get(),startPanY:K.get(),startScale:k.get(),anchorX:l.clientX,anchorY:l.clientY,stageCenterX:he.left+he.width/2,moved:!1}},[pe,G,K,re,k]),F=t.useCallback((l,p)=>{pe(),j.current=window.setTimeout(()=>{if(j.current=null,g.current||U.current||M.current)return;const B=u.current?.pageFlip();l<p?B?.flipPrev():B?.flipNext()},pn)},[pe]),$e=t.useCallback(l=>{const p=M.current;if(!p||p.pointerId!==l.pointerId||(Math.hypot(l.clientX-p.startX,l.clientY-p.startY)>wi&&(p.moved=!0),p.mode==="page"))return;if(l.preventDefault(),p.mode==="pan"){if(!p.moved)return;const L=de(k.get(),p.startPanX+l.clientX-p.startX,p.startPanY+l.clientY-p.startY);G.set(L.x),K.set(L.y);return}if(!p.moved)return;if(!g.current){const L=Ce(p.anchorX,p.anchorY,!1);p.startScale=L.scale,p.startPanX=L.x,p.startPanY=L.y}const H=p.startScale*Math.exp((p.startY-l.clientY)*.006);ae(H,p.anchorX,p.anchorY,p.startScale,p.startPanX,p.startPanY)},[de,Ce,G,K,ae,k]),oe=t.useCallback(l=>{const p=M.current;if(!(!p||p.pointerId!==l.pointerId)){if(M.current=null,A.current=!1,l.type==="pointercancel"){w.current.time=0;return}if(p.mode==="zoom-slider"){p.moved?w.current.time=0:p.startedZoomed?z():Ce(p.anchorX,p.anchorY,!0);return}if(p.moved){w.current.time=0,pe();return}w.current={time:window.performance.now(),x:l.clientX,y:l.clientY,pointerType:p.pointerType},p.mode==="page"&&F(l.clientX,p.stageCenterX)}},[pe,z,Ce,F]);t.useEffect(()=>(window.addEventListener("pointermove",$e,{passive:!1}),window.addEventListener("pointerup",oe),window.addEventListener("pointercancel",oe),()=>{window.removeEventListener("pointermove",$e),window.removeEventListener("pointerup",oe),window.removeEventListener("pointercancel",oe)}),[oe,$e]),t.useEffect(()=>()=>{pe(),re(),D.current&&window.clearTimeout(D.current)},[pe,re]);const Te=t.useCallback(l=>{if(!g.current||E.current)return;l.preventDefault(),l.stopPropagation(),re();const p=l.currentTarget.getBoundingClientRect(),B=Math.exp(-l.deltaY*.0015);ae(k.get()*B,l.clientX-p.left,l.clientY-p.top)},[re,ae,k]);if(t.useEffect(()=>{n.length===0&&c?.(e.id)},[e.id,c,n.length]),n.length===0)return r.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."});const Fe=r.jsx("div",{className:`public-book-stage ${a} ${T?"is-magnified":""} ${Y?"is-zoom-closing":""}`,children:r.jsx("div",{ref:m,className:`public-book-viewport relative flex items-center justify-center overflow-hidden ${T?"is-magnified cursor-grab active:cursor-grabbing":"cursor-default"}`,"data-page":Se,"data-zoomed":T?"true":"false",onPointerDownCapture:fe,onMouseDownCapture:l=>{(A.current||g.current)&&(l.preventDefault(),l.stopPropagation())},onTouchStartCapture:l=>{(A.current||g.current)&&(l.preventDefault(),l.stopPropagation())},onWheel:Te,children:r.jsx(ye.div,{className:"flex h-full w-full items-center justify-center",style:{x:G,y:K,scale:k,transformOrigin:"50% 50%",willChange:"transform"},children:r.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${ve}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform",pointerEvents:T?"none":"auto"},children:$&&r.jsx(wr,{ref:u,className:"mx-auto",style:{margin:"0 auto"},width:X.width,height:X.height,minWidth:1,maxWidth:N.maxWidth,minHeight:1,maxHeight:N.maxHeight,size:"fixed",startPage:h.current===e.id?b.current:R,drawShadow:!0,flippingTime:850,usePortrait:!1,startZIndex:0,autoSize:!1,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!1,disableFlipByClick:!0,onInit:l=>{b.current=l.data.page,se(l.data.page),s?.(l.data.page),Ee(l.object),v.current=!0,ne()},onFlip:l=>{b.current=l.data,se(l.data),s?.(l.data),Ee(l.object)},onChangeState:l=>{const p=l.data==="user_fold"||l.data==="flipping";U.current=p,p&&pe()},onChangeOrientation:l=>{Ee(l.object)},children:n.map((l,p)=>r.jsx(Ei,{page:l,isCover:p===0||p===n.length-1,onImageReady:()=>Ne(p)},l.id))},`${e.id}-${O}-${X.width}x${X.height}`)})})})});return r.jsxs("div",{className:"flex w-full flex-col items-center",children:[T&&typeof document<"u"?Ut.createPortal(Fe,document.body):Fe,r.jsx("div",{className:`public-book-meta public-book-title item-title flex items-center gap-8 text-[18px] ${a}`,children:r.jsx("span",{className:"max-w-[60vw] truncate",children:e.title})}),e.description&&r.jsx("div",{className:`public-book-meta public-book-description item-description flex items-center gap-8 text-[18px] ${a}`,children:r.jsx("span",{className:"max-w-[60vw] truncate",children:e.description})})]})}const Un="publicBookSession",Ft="publicBookReturningToIndex",Wt="publicBookReturningToIntro";function Zt(){if(typeof window>"u")return null;try{const e=window.sessionStorage.getItem(Un);if(!e)return null;const n=JSON.parse(e);return typeof n.slug!="string"||n.slug.length===0||typeof n.pageIndex!="number"||!Number.isFinite(n.pageIndex)?null:{slug:n.slug,pageIndex:Math.max(0,Math.floor(n.pageIndex))}}catch{return null}}function rt(e,n){if(typeof window>"u")return;const i={slug:e,pageIndex:Math.max(0,Math.floor(n))};try{window.sessionStorage.setItem(Un,JSON.stringify(i))}catch{}}const $n=()=>Xe(()=>import("./AdminPortal-VXgpY42B.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),Ri=t.lazy($n),Ci=()=>Xe(()=>import("./WatchStudio-X4_bY7vf.js"),__vite__mapDeps([8,1,2,4,5,3,7,6])),wt=()=>Ci().then(e=>e.preloadWatchStudioExperience()),St=1120,Fn=180,Qt=140,Qe=St+Qt,Ti=Fn+Qe,Et=920,hn=120,gn=Et+Qt,Vt=1180,_i=6e3,xn="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";function Mi({text:e,speed:n=100,revealSpeed:i=55}){const a=t.useRef(null),s=t.useRef(null),c=t.useRef(0),u=t.useRef(!1),m=t.useCallback(()=>{s.current!==null&&(window.clearInterval(s.current),s.current=null)},[]),h=t.useCallback(()=>xn[Math.floor(Math.random()*xn.length)],[]),b=t.useCallback((U=0)=>e.split("").map((A,M)=>A===" "?" ":M<U?A:h()).join(""),[h,e]),g=t.useCallback(()=>{m(),u.current=!1,a.current&&(s.current=window.setInterval(()=>{!a.current||u.current||(a.current.textContent=b())},n))},[m,b,n]),E=t.useCallback(()=>{m(),u.current=!0,c.current=0,a.current&&(s.current=window.setInterval(()=>{c.current+=1,a.current&&(a.current.textContent=b(c.current)),c.current>=e.length&&(m(),a.current&&(a.current.textContent=e))},i))},[m,b,i,e]);return t.useEffect(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches?(a.current&&(a.current.textContent=e),m):(g(),m),[m,g,e]),r.jsx("span",{className:"public-login-scramble",onMouseEnter:E,onMouseLeave:g,"aria-label":e,children:r.jsx("span",{ref:a,"aria-hidden":"true",children:e})})}const Ii=`
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
  animation: public-book-background-mix-in ${Vt}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${Vt}ms cubic-bezier(0.4, 0, 0.2, 1) both;
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


`,Ni={objects:"OBJ",graphics:"GRPH",concepts:"CNCP"};function Lt(e){return e instanceof Error?e.message:"Unable to load the books."}function De(e){return new Promise(n=>{window.setTimeout(n,e)})}function bn(){return new Promise(e=>{window.requestAnimationFrame(()=>e())})}function Pi(e){const n=i=>Number.isFinite(i)?Math.min(255,Math.max(0,Math.round(i??255))):255;return`rgb(${n(e?.background_r)} ${n(e?.background_g)} ${n(e?.background_b)})`}function Ai(e){return new Promise(n=>{const i=new Image;let a=!1;const s=()=>{a||(a=!0,window.clearTimeout(c),n())},c=window.setTimeout(s,5e3);i.onload=()=>{if(typeof i.decode=="function"){i.decode().catch(()=>{}).finally(s);return}s()},i.onerror=s,i.decoding="async",i.src=e})}async function vn(e,n=0){const i=Math.min(Math.max(0,Math.floor(n)),Math.max(0,e.length-1)),a=[i-1,i,i+1,i+2].filter(c=>c>=0&&c<e.length),s=[...new Set(a)].map(c=>e[c]);await Promise.all(s.map(c=>Ai(c.public_url)))}function Oi({initialSlug:e,onBack:n,onLogin:i,onThreeD:a,onBookChange:s}){const[c,u]=t.useState([]),[m,h]=t.useState(null),[b,g]=t.useState([]),[E,U]=t.useState(!0),[A,M]=t.useState(!1),[w,j]=t.useState(null),[D,C]=t.useState(!1),[x,O]=t.useState(!1),[N,R]=t.useState("outside"),[v,I]=t.useState(!1),[P,V]=t.useState("outside"),[Se,se]=t.useState(!1),[ve,we]=t.useState(0),[T,ee]=t.useState(!1),[Y,Re]=t.useState(!1),$=t.useRef(!0),te=t.useRef(!1),X=t.useRef(null),Ie=t.useRef(null),k=t.useRef(null),G=t.useRef(!1),K=t.useRef(Zt()),ne=t.useRef(null),Ne=t.useRef(0),re=t.useRef("rgb(255 255 255)"),ce=t.useRef(null),de=t.useRef(null),ae=t.useRef(null),[me,Ce]=t.useState([{id:0,color:re.current}]),z=t.useMemo(()=>c.find(d=>d.id===m)??null,[c,m]);t.useEffect(()=>{const d=Pi(z);if(d===re.current)return;re.current=d;const S={id:++Ne.current,color:d};Ce(_=>[_[_.length-1],S]),ce.current&&window.clearTimeout(ce.current),ce.current=window.setTimeout(()=>{Ce(_=>_.slice(-1)),ce.current=null},Vt)},[z,z?.background_b,z?.background_g,z?.background_r]);const Ee=t.useCallback(d=>{if(de.current===d)return Promise.resolve();const S=ae.current;return S&&S.finish(),new Promise(_=>{let Z=!1;const je=()=>{Z||(Z=!0,window.clearTimeout(Be),ae.current?.finish===je&&(ae.current=null),_())},Be=window.setTimeout(je,_i);ae.current={bookId:d,finish:je,timeout:Be}})},[]),pe=t.useCallback(d=>{de.current=d;const S=ae.current;S?.bookId===d&&S.finish()},[]);t.useEffect(()=>{X.current=m},[m]);const fe=t.useCallback(()=>{ne.current&&(window.clearTimeout(ne.current),ne.current=null)},[]),F=t.useCallback((d=!1)=>{fe();const S=d?hn:Fn,_=d?Et:St;se(d),V("outside"),ne.current=window.setTimeout(()=>{$.current&&(V("entering"),ne.current=window.setTimeout(()=>{$.current&&(V("visible"),se(!1),ne.current=null)},_+Qt))},S)},[fe]);t.useEffect(()=>{$.current=!0;const d=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{$.current&&I(!0)})});return()=>{$.current=!1,window.cancelAnimationFrame(d),ne.current&&window.clearTimeout(ne.current),ce.current&&window.clearTimeout(ce.current),ae.current&&(window.clearTimeout(ae.current.timeout),ae.current.finish())}},[]),t.useEffect(()=>{const d=navigator.connection;if(d?.saveData||d?.effectiveType==="slow-2g"||d?.effectiveType==="2g")return;const S=()=>{wt()},_=window;if(_.requestIdleCallback){const je=_.requestIdleCallback(S,{timeout:2500});return()=>_.cancelIdleCallback?.(je)}const Z=window.setTimeout(S,1400);return()=>window.clearTimeout(Z)},[]),t.useEffect(()=>{let d=!0;return(async()=>{U(!0),j(null);try{const _=await Dn();if(!d)return;u(_)}catch(_){d&&j(Lt(_))}finally{d&&U(!1)}})(),()=>{d=!1}},[]);const $e=t.useCallback(async d=>{if(!G.current){G.current=!0,M(!0),j(null);try{const S=await He(d.id),_=K.current,Z=_?.slug===d.slug?Math.min(_.pageIndex,Math.max(0,S.length-1)):0;if(await vn(S,Z),!$.current)return;de.current=null;const je=Ee(d.id);if(Ut.flushSync(()=>{se(!1),V("outside"),h(d.id),g(S),we(Z)}),rt(d.slug,Z),M(!1),await je,!$.current)return;F()}catch(S){$.current&&(j(Lt(S)),M(!1))}finally{G.current=!1}}},[F,Ee]),oe=t.useCallback(async(d,S)=>{if($.current){if(te.current){Ie.current={book:d,updateRoute:S},C(!1);return}if(X.current===d.id){C(!1);return}te.current=!0,ee(!0),M(!0),C(!1),j(null);try{fe(),se(!0),V("leaving");const _=He(d.id).then(async Be=>(await vn(Be),Be)),[Z]=await Promise.all([_,De(gn)]);if(!$.current)return;de.current=null;const je=Ee(d.id);if(Ut.flushSync(()=>{se(!0),V("outside"),h(d.id),X.current=d.id,g(Z),we(0),M(!1)}),K.current={slug:d.slug,pageIndex:0},rt(d.slug,0),S&&s?.(d.slug),await bn(),await bn(),await je,await De(hn),!$.current)return;V("entering"),await De(gn),$.current&&(V("visible"),se(!1))}catch(_){$.current&&(j(Lt(_)),M(!1),se(!1),V("visible"))}finally{if(te.current=!1,$.current){ee(!1);const _=Ie.current;Ie.current=null,_&&_.book.id!==X.current&&window.setTimeout(()=>{k.current?.(_.book,_.updateRoute)},24)}}}},[fe,s,Ee]);t.useEffect(()=>{k.current=(d,S)=>{oe(d,S)}},[oe]),t.useEffect(()=>{if(E||c.length===0)return;const d=e?c.find(S=>S.slug===e):null;if(!m){const S=c.find(Z=>Z.is_featured),_=d??S??c[0];$e(_);return}d&&d.id!==m&&!te.current&&oe(d,!1)},[c,e,$e,E,m,oe]);const Te=t.useCallback(async()=>{!x||te.current||(te.current=!0,ee(!0),R("leaving"),await De(Qe),$.current&&(O(!1),R("outside"),F(),await De(Ti),te.current=!1,$.current&&ee(!1)))},[x,F]);t.useEffect(()=>{const d=S=>{if(S.key==="Escape"){if(x){Te();return}C(!1)}};return window.addEventListener("keydown",d),()=>{window.removeEventListener("keydown",d)}},[Te,x]);const Fe=async()=>{if(!te.current){if(C(!1),x){await Te();return}te.current=!0,ee(!0),$n(),!(z&&(fe(),V("leaving"),await De(Qe),!$.current))&&(O(!0),R("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{$.current&&R("entering")})}),await De(Qe),te.current=!1,$.current&&(R("visible"),ee(!1)))}},l=async()=>{if(x){await Te();return}te.current||(te.current=!0,ee(!0),C(!1),I(!1),fe(),V("leaving"),z&&rt(z.slug,ve),window.sessionStorage.setItem(Ft,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.setItem(Wt,"true"),window.sessionStorage.removeItem("returnFromExample"),await De(Qe),$.current&&n())},p=async()=>{if(te.current||x)return;te.current=!0,ee(!0),Re(!0),C(!1),I(!1),fe(),V("leaving"),z&&rt(z.slug,ve);const d=wt().catch(()=>null);await Promise.all([De(Qe),d]),$.current&&a()},B=d=>{oe(d,!0)},H=t.useCallback(d=>{we(d),z&&(K.current={slug:z.slug,pageIndex:d},rt(z.slug,d))},[z]),he=`${P==="entering"?"is-entering":P==="visible"?"is-visible":P==="leaving"?"is-leaving":"is-outside"}${Se?" is-fast":""}`,be=N==="entering"?"is-entering":N==="visible"?"is-visible":N==="leaving"?"is-leaving":"is-outside",le=v?"is-visible":T||Y?"is-leaving":"is-outside";return r.jsxs("div",{className:"public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:me[0]?.color??"rgb(255 255 255)"},children:[r.jsx("style",{children:Ii}),r.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:me.map((d,S)=>r.jsx("div",{className:`public-book-background-layer ${S===me.length-1?"is-current":"is-previous"}`,style:{backgroundColor:d.color}},d.id))}),D&&!x&&r.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-transparent",onClick:()=>C(!1)}),r.jsxs("div",{className:"public-book-nav fixed z-[170] flex items-center",children:[r.jsx("div",{className:`public-nav-item ${le}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:r.jsx("button",{type:"button",onClick:()=>void l(),disabled:T,className:"public-book-nav-icon flex items-center justify-center rounded-full border border-black/35 bg-transparent transition-transform duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40","aria-label":x?"Back to book":"Back",title:x?"Back to book":"Back",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-globe-europe-africa",viewBox:"0 0 16 16","aria-hidden":"true",children:r.jsx("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.81.81 0 0 1 1.034-.275.81.81 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34q.118.04.243.054c.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.33.33 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501"})})})}),r.jsx("div",{className:`public-nav-item ${le}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:r.jsx("button",{type:"button",onClick:()=>C(d=>!d),disabled:x,className:`public-book-nav-icon flex items-center justify-center rounded-full border bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${D?"border-black text-black":"border-black/35 text-black"}`,"aria-label":"Choose a book","aria-expanded":D,"aria-controls":"public-book-balloon",title:"Choose a book",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-book",viewBox:"0 0 16 16",children:r.jsx("path",{d:"M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"})})})}),r.jsx("div",{className:`public-nav-item ${le}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:r.jsx("button",{type:"button",onClick:()=>void Fe(),disabled:T,className:`public-book-nav-text flex items-center justify-center rounded-full border bg-transparent text-[13px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${x?"border-black text-black":"border-black/35 text-black"}`,"aria-expanded":x,"aria-label":"Login",children:r.jsx(Mi,{text:"LOGIN"})})}),r.jsx("div",{className:`public-nav-item ${le}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:r.jsx("button",{type:"button",onClick:()=>void p(),onPointerEnter:()=>void wt(),onFocus:()=>void wt(),disabled:T||x,className:"public-book-nav-text flex items-center justify-center rounded-full border border-black/35 bg-transparent text-[13px] text-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40",children:"3D"})})]}),r.jsxs("aside",{id:"public-book-balloon",className:`public-book-balloon fixed left-4 top-[76px] z-[150] flex max-h-[72vh] w-[min(88vw,390px)] origin-top-left flex-col bg-white/95 p-5 shadow-[0_10px_65px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] sm:left-[74px] sm:top-[82px] ${D&&!x?"pointer-events-auto scale-100 opacity-100 blur-0":"pointer-events-none scale-0 opacity-0 blur-[10px]"}`,"aria-hidden":!D||x,children:[r.jsx("div",{className:"absolute -top-2 left-[46px] h-4 w-4 rotate-45 border-l border-t border-black/25 bg-white"}),r.jsxs("div",{className:"relative mb-4 flex items-start justify-between gap-5",children:[r.jsx("div",{children:r.jsx("h1",{className:"mt-1 text-[22px] font-normal",children:"ARCHIVE"})}),r.jsx("button",{type:"button",onClick:()=>C(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95","aria-label":"Close book list",children:r.jsx("span",{"aria-hidden":"true",children:"×"})})]}),r.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto border-t border-black/15",children:E?r.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"..."}):c.length===0?r.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):c.map(d=>{const S=d.id===m;return r.jsxs("button",{type:"button",onClick:()=>B(d),className:`grid w-full grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-all duration-300 ${S?"translate-x-1 text-black":"text-black/60 hover:translate-x-1 hover:text-black"}`,children:[r.jsx("span",{className:"text-[12px] tracking-wide",children:Ni[d.category]}),r.jsxs("span",{className:"min-w-0",children:[r.jsx("span",{className:"block truncate text-[16px]",children:d.title}),d.description&&r.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/45",children:d.description})]}),r.jsx("span",{className:"flex min-w-[18px] justify-end text-[13px]",children:d.is_featured?"*":S?">":""})]},d.id)})})]}),r.jsx("div",{className:"public-book-label-wrap pointer-events-none fixed inset-x-0 top-5 z-[100] flex justify-center px-[230px] sm:top-7",children:z&&r.jsx("p",{className:`public-book-label max-w-full truncate text-center text-[13px] tracking-[0.12em] text-black/55 ${le}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:z.is_featured?"FEATURED - ":""})}),r.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden px-2 sm:px-5",children:E||A&&!z?r.jsx("div",{className:`public-route-message ${v?"is-visible":"is-outside"}`,children:"..."}):w?r.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${v?"is-visible":"is-outside"}`,children:w}):c.length===0?r.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${v?"is-visible":"is-outside"}`,children:"No books are public yet."}):z?r.jsx("div",{className:"h-full w-full",children:r.jsx("div",{className:`public-book-surface flex h-full w-full items-center justify-center ${x?"is-login-muted":""}`,children:r.jsx(ji,{book:z,pages:b,initialPage:ve,bookMotionClassName:he,onPageChange:H,onReady:pe},z.id)})}):null}),x&&r.jsx("div",{className:`public-login-stage fixed inset-0 z-[130] overflow-hidden bg-white ${be}`,"aria-hidden":N==="outside"||N==="leaving",children:r.jsx(t.Suspense,{fallback:null,children:r.jsx(Ri,{embedded:!0,surfaceReady:N==="entering"||N==="visible",onBack:()=>void Te()})})})]})}const Wn=t.createContext(void 0),Li=({children:e})=>{const[n,i]=t.useState(!1),a=()=>{i(!n)};return t.useEffect(()=>{n?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[n]),r.jsx(Wn.Provider,{value:{isDark:n,toggleTheme:a},children:e})},Ys=()=>{const e=t.useContext(Wn);if(e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},wn="/assets/WolfyLight-Bs10J6iU.gif",Bi=100,zi=500,Di=14e3,Bt=400,Ui=({onComplete:e})=>{const[n,i]=t.useState(!1),[a,s]=t.useState(!1),[c,u]=t.useState(!1),[m,h]=t.useState(!1),[b,g]=t.useState({}),[E,U]=t.useState(0),[A,M]=t.useState(!0),w=t.useRef({}),j=t.useRef(null),D=t.useRef(!1),C=t.useRef(!1),{progress:x}=Cr();t.useEffect(()=>{let v;const I=()=>{U(P=>{const V=x-P,Se=Math.max(V*.1,V>0?.5:-.5),se=Math.abs(V)<.5?x:P+Se;return se>=100&&setTimeout(()=>M(!1),500),Math.min(100,Math.max(0,se))}),v=requestAnimationFrame(I)};return v=requestAnimationFrame(I),()=>cancelAnimationFrame(v)},[x]),t.useEffect(()=>{const v=window.matchMedia("(prefers-reduced-motion: reduce)");C.current=v.matches;const I=()=>C.current=v.matches;return v.addEventListener?.("change",I),()=>v.removeEventListener?.("change",I)},[]),t.useEffect(()=>{const v=new Image;v.src=wn;const I=()=>g({w:v.naturalWidth||400,h:v.naturalHeight||400});v.decode?.().then(()=>{I(),i(!0)}).catch(()=>{v.onload=()=>{I(),i(!0)}})},[]);const O=t.useCallback(()=>{if(D.current)return;if(C.current){D.current=!0,e();return}h(!0);const v=j.current;let I=!1;const P=()=>{I||(I=!0,D.current=!0,e())};if(v){const V=()=>{v.removeEventListener("animationend",V),w.current.fallback&&clearTimeout(w.current.fallback),P()};v.addEventListener("animationend",V,{once:!0}),w.current.fallback=window.setTimeout(P,Bt+120)}else w.current.fallback=window.setTimeout(P,Bt+50)},[e]);t.useEffect(()=>{if(!n)return;const v=w.current;return C.current?(s(!0),u(!0),v.auto=window.setTimeout(()=>O(),800)):(v.entry=window.setTimeout(()=>s(!0),Bi),v.allowExit=window.setTimeout(()=>u(!0),zi),v.auto=window.setTimeout(()=>O(),Di)),()=>{Object.values(v).forEach(I=>I&&clearTimeout(I))}},[n,O]);const N=()=>{(c||C.current)&&O()},R=a?m?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return r.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${D.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:N,children:[r.jsxs("div",{className:`relative ${R}`,ref:j,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[r.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[r.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),r.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),r.jsx("img",{src:wn,alt:"Loading wolf",width:b.w||800,height:b.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),A&&r.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${E>=100?"opacity-0":"opacity-100"}`,children:[Math.round(E),"%"]}),r.jsx("style",{children:`
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
      `})]})},ue={};typeof window<"u"&&(window.addEventListener("keydown",e=>{ue[e.key.toLowerCase()]=!0}),window.addEventListener("keyup",e=>{ue[e.key.toLowerCase()]=!1}));const Vn={current:null},zt=15,Dt=10,$i=38,Fi=95,Le=0,Xt=-174,yn=320,jt=12e4,Wi=48e3,Vi=9e4,W=128,Oe=900,Ye=12,Xi=4.5,Yi=16e3,Xn=[500,200,-300],Hi=new J(500,150,-1e3).normalize(),qi="#fff4d6",Yn="#0b1e3a",Gi="#0a2a6a",Hn={value:0};function en(){const e=Ht(Kt,"/caustics.png");return t.useMemo(()=>{e.wrapS=e.wrapT=Jt,e.minFilter=Gr,e.magFilter=$t,e.colorSpace=qt,e.needsUpdate=!0},[e]),e}function tn(e,n){if(e.userData.hasUnderwaterCaustics)return;const i=e.onBeforeCompile.bind(e),a=e.customProgramCacheKey.bind(e);e.onBeforeCompile=(s,c)=>{i(s,c),s.uniforms.causticsMap={value:n},s.uniforms.causticsTime=Hn,s.uniforms.causticsRippleSampler={value:ke.texture},s.uniforms.causticsRippleCenter={value:ke.center},s.uniforms.causticsRippleWorldSize={value:Oe},s.uniforms.causticsRippleTexel={value:new Tt(1/W,1/W)},s.vertexShader=`varying vec3 vCausticsWorldPosition;
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
        (0.14 + movingCaustics * 0.72);`)},e.customProgramCacheKey=()=>`${a()}-underwater-caustics-v2`,e.userData.hasUnderwaterCaustics=!0,e.needsUpdate=!0}class Ki{constructor(){Me(this,"cells",new Map);Me(this,"ready",!1)}build(n){this.clear(),n.updateWorldMatrix(!0,!0);let i=0;n.traverse(c=>{if(!(c instanceof st))return;const u=c.geometry.getAttribute("position");u&&(i+=u.count)});const a=Math.max(1,Math.ceil(i/Yi)),s=new J;n.traverse(c=>{if(!(c instanceof st))return;const u=c.geometry.getAttribute("position");if(u)for(let m=0;m<u.count;m+=a){s.fromBufferAttribute(u,m),c instanceof Kr&&c.applyBoneTransform(m,s),s.applyMatrix4(c.matrixWorld);const h=this.keyFor(s.x,s.y,s.z),b=this.cells.get(h)??[];b.push(s.clone()),this.cells.set(h,b)}}),this.ready=this.cells.size>0}resolve(n,i){if(!this.ready)return!1;const a=i+Xi,s=Math.ceil(a/Ye);let c=!1;for(let u=0;u<2;u+=1){const m=Math.floor(n.x/Ye),h=Math.floor(n.y/Ye),b=Math.floor(n.z/Ye);for(let g=m-s;g<=m+s;g+=1)for(let E=h-s;E<=h+s;E+=1)for(let U=b-s;U<=b+s;U+=1){const A=this.cells.get(`${g}:${E}:${U}`);if(A)for(const M of A){const w=n.distanceToSquared(M);if(w>=a**2)continue;const j=Math.sqrt(w);j>1e-4?n.addScaledVector(n.clone().sub(M).divideScalar(j),a-j):n.y+=a,c=!0}}}return c}clear(){this.cells.clear(),this.ready=!1}keyFor(n,i,a){return`${Math.floor(n/Ye)}:${Math.floor(i/Ye)}:${Math.floor(a/Ye)}`}}const Yt=new Ki;class Ji{constructor(){Me(this,"center",new Tt);Me(this,"texture");Me(this,"height",new Float32Array(W**2));Me(this,"velocity",new Float32Array(W**2));Me(this,"nextHeight",new Float32Array(W**2));Me(this,"nextVelocity",new Float32Array(W**2));Me(this,"pixels",new Uint8Array(W**2*4));Me(this,"accumulator",0);for(let n=0;n<this.pixels.length;n+=4)this.pixels[n]=128,this.pixels[n+1]=128,this.pixels[n+2]=128,this.pixels[n+3]=255;this.texture=new Ar(this.pixels,W,W,Or,Lr),this.texture.minFilter=$t,this.texture.magFilter=$t,this.texture.wrapS=this.texture.wrapT=Br,this.texture.colorSpace=qt,this.texture.needsUpdate=!0}moveWindowTo(n,i){(this.center.x-n)**2+(this.center.y-i)**2<180**2||(this.center.set(n,i),this.height.fill(0),this.velocity.fill(0),this.nextHeight.fill(0),this.nextVelocity.fill(0),this.encodeTexture())}addRipple(n,i,a=.8,s=20){const c=(n-this.center.x)/Oe+.5,u=(i-this.center.y)/Oe+.5;if(c<=0||c>=1||u<=0||u>=1)return;const m=c*(W-1),h=u*(W-1),b=Math.max(2,s/Oe*W),g=Math.ceil(b*2.4),E=Math.max(1,Math.floor(m-g)),U=Math.min(W-2,Math.ceil(m+g)),A=Math.max(1,Math.floor(h-g)),M=Math.min(W-2,Math.ceil(h+g));for(let w=A;w<=M;w+=1)for(let j=E;j<=U;j+=1){const D=(j-m)**2+(w-h)**2,C=Math.exp(-D/(b*b*.72));this.velocity[w*W+j]+=a*C}}displaceSphere(n,i,a){if(a<=.001)return;const s=Math.min(n.x,i.x)-a,c=Math.max(n.x,i.x)+a,u=Math.min(n.z,i.z)-a,m=Math.max(n.z,i.z)+a,h=j=>((j-this.center.x)/Oe+.5)*(W-1),b=j=>((j-this.center.y)/Oe+.5)*(W-1),g=Math.max(1,Math.floor(h(s))),E=Math.min(W-2,Math.ceil(h(c))),U=Math.max(1,Math.floor(b(u))),A=Math.min(W-2,Math.ceil(b(m)));if(g>E||U>A)return;const M=a*a,w=(j,D,C)=>{const x=(j-C.x)**2+(D-C.z)**2;if(x>=M)return 0;const O=Math.sqrt(M-x),N=C.y-O,R=C.y+O;return ge.clamp(Le-N,0,R-N)};for(let j=U;j<=A;j+=1){const D=this.center.y+(j/(W-1)-.5)*Oe;for(let C=g;C<=E;C+=1){const x=this.center.x+(C/(W-1)-.5)*Oe,O=w(x,D,n),N=w(x,D,i),R=(O-N)/a;if(Math.abs(R)<1e-5)continue;const v=j*W+C;this.height[v]+=ge.clamp(R*.58,-.48,.48),this.velocity[v]+=ge.clamp(R*.1,-.08,.08)}}}step(n){this.accumulator+=Math.min(n,.05);const i=1/30;let a=!1;for(;this.accumulator>=i;){for(let s=1;s<W-1;s+=1)for(let c=1;c<W-1;c+=1){const u=s*W+c,m=this.height[u-1]+this.height[u+1]+this.height[u-W]+this.height[u+W]-this.height[u]*4,h=(this.velocity[u]+m*.22)*.986;this.nextVelocity[u]=h,this.nextHeight[u]=(this.height[u]+h*.78)*.998}[this.height,this.nextHeight]=[this.nextHeight,this.height],[this.velocity,this.nextVelocity]=[this.nextVelocity,this.velocity],this.nextHeight.fill(0),this.nextVelocity.fill(0),this.accumulator-=i,a=!0}a&&this.encodeTexture()}dispose(){this.texture.dispose()}encodeTexture(){for(let n=0;n<this.height.length;n+=1){const i=Math.round(ge.clamp(128+this.height[n]*42,0,255)),a=n*4;this.pixels[a]=i,this.pixels[a+1]=i,this.pixels[a+2]=i,this.pixels[a+3]=255}this.texture.needsUpdate=!0}}const ke=new Ji;function Zi(e,n,i){let a=n-e;for(;a<-Math.PI;)a+=Math.PI*2;for(;a>Math.PI;)a-=Math.PI*2;return e+a*i}function Qi(){const e=t.useRef(null),n=Ht(Kt,"/waternormals.jpeg");n.wrapS=n.wrapT=Jt;const i=t.useMemo(()=>new $r(jt,jt),[]),a=t.useMemo(()=>{const s=new Mr(i,{textureWidth:512,textureHeight:512,waterNormals:n,sunDirection:Hi.clone(),sunColor:new Ve("#fff2cc"),waterColor:new Ve(Gi),distortionScale:10.7,alpha:.955,fog:!1}),c=s.material;return c.transparent=!0,c.uniforms.rippleSampler={value:ke.texture},c.uniforms.rippleCenter={value:ke.center},c.uniforms.rippleWorldSize={value:Oe},c.uniforms.rippleTexel={value:new Tt(1/W,1/W)},c.fragmentShader=c.fragmentShader.replace("uniform vec3 waterColor;",`uniform vec3 waterColor;
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
          surfaceNormal = normalize(surfaceNormal + vec3(rippleSlope.x, 0.0, rippleSlope.y) * rippleMask * 2.6);`),c.needsUpdate=!0,s.renderOrder=2,s},[i,n]);return a.material.uniforms.waterColor.value.convertSRGBToLinear(),t.useEffect(()=>()=>{i.dispose(),a.material.dispose()},[i,a]),Ue((s,c)=>{if(ke.step(c),e.current){const u=e.current.material;u.uniforms.time.value+=c,u.uniforms.rippleCenter.value.copy(ke.center)}}),r.jsx("primitive",{object:a,ref:e,"rotation-x":-Math.PI/2})}function es(){const e=en(),n=t.useMemo(()=>{const i=new Gt({color:"#315057",roughness:.96,metalness:0,side:Ur});return tn(i,e),i},[e]);return t.useEffect(()=>()=>n.dispose(),[n]),Ue(i=>{Hn.value=i.clock.elapsedTime}),r.jsxs("mesh",{"rotation-x":-Math.PI/2,"position-y":Xt,renderOrder:0,receiveShadow:!0,children:[r.jsx("planeGeometry",{args:[jt,jt]}),r.jsx("primitive",{object:n,attach:"material"})]})}function ts(){const e=t.useRef(null),{camera:n}=qe(),i=Ht(Kt,"/waternormals.jpeg");t.useMemo(()=>{i.wrapS=i.wrapT=Jt,i.colorSpace=qt,i.needsUpdate=!0},[i]);const a=t.useMemo(()=>new Fr({uniforms:{time:{value:0},normalSampler:{value:i},rippleSampler:{value:ke.texture},rippleCenter:{value:ke.center},rippleWorldSize:{value:Oe}},vertexShader:`
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
        `,side:Wr,transparent:!0,depthWrite:!1}),[i]);return t.useEffect(()=>()=>a.dispose(),[a]),Ue(s=>{a.uniforms.time.value=s.clock.elapsedTime,a.uniforms.rippleCenter.value.copy(ke.center),e.current&&(e.current.position.x=n.position.x,e.current.position.z=n.position.z,e.current.visible=n.position.y<Le+1)}),r.jsxs("mesh",{ref:e,"rotation-x":-Math.PI/2,"position-y":Le-.08,renderOrder:3,frustumCulled:!1,children:[r.jsx("planeGeometry",{args:[6e3,6e3,128,128]}),r.jsx("primitive",{object:a,attach:"material"})]})}function ns(){const{camera:e}=qe();return t.useEffect(()=>{const n=new Yr,i=new Tt,a=new Hr(new J(0,1,0),0),s=new J,c=u=>{document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1"&&(!u.isPrimary||u.button>0||u.target instanceof Element&&u.target.closest("button, input, textarea, select, a, [role='button'], [data-ocean-control]")||(i.set(u.clientX/window.innerWidth*2-1,-(u.clientY/window.innerHeight)*2+1),n.setFromCamera(i,e),n.ray.intersectPlane(a,s)&&ke.addRipple(s.x,s.z,-.95,24)))};return window.addEventListener("pointerdown",c,{passive:!0}),()=>window.removeEventListener("pointerdown",c)},[e]),null}function rs(){const e=t.useRef(null),n=t.useRef(null),i=t.useRef(null),a=t.useMemo(()=>new Ve("#ffd992"),[]),s=t.useMemo(()=>new Ve("#8bc9ff"),[]),c=t.useMemo(()=>new Ve,[]);return t.useEffect(()=>{e.current?.traverse(u=>{u.castShadow=!1,u.receiveShadow=!1})},[]),Ue(({camera:u,clock:m},h)=>{e.current&&(e.current.position.x=ge.damp(e.current.position.x,u.position.x+Math.sin(m.elapsedTime*.025)*70,.35,h),e.current.position.z=ge.damp(e.current.position.z,u.position.z+Math.cos(m.elapsedTime*.02)*55,.35,h));const b=.5+Math.sin(m.elapsedTime*.42)*.5;c.lerpColors(a,s,b),n.current&&(n.current.color.copy(c),n.current.intensity=1.4+Math.sin(m.elapsedTime*.8)*.28),i.current&&(i.current.color.copy(c).lerp(s,.3),i.current.intensity=1.05+Math.cos(m.elapsedTime*.65)*.22)}),r.jsxs("group",{ref:e,children:[r.jsxs(Ir,{texture:"/cloud-white.png",material:Vr,limit:96,frustumCulled:!1,children:[r.jsx(ze,{seed:2,segments:14,bounds:[105,18,38],position:[-330,230,-720],volume:108,opacity:.93,growth:5,speed:.06,fade:1500,color:"#ffffff"}),r.jsx(ze,{seed:7,segments:13,bounds:[94,16,34],position:[330,210,-820],volume:98,opacity:.9,growth:4.6,speed:.05,fade:1500,color:"#ffffff"}),r.jsx(ze,{seed:11,segments:10,bounds:[78,14,29],position:[620,260,-650],volume:86,opacity:.86,growth:3.8,speed:.045,fade:1500,color:"#ffffff"}),r.jsx(ze,{seed:17,segments:9,bounds:[72,13,27],position:[-650,275,-600],volume:82,opacity:.84,growth:3.5,speed:.04,fade:1500,color:"#ffffff"}),r.jsx(ze,{seed:23,segments:9,bounds:[80,14,30],position:[50,300,-1050],volume:90,opacity:.84,growth:3.6,speed:.045,fade:1600,color:"#ffffff"}),r.jsx(ze,{seed:29,segments:8,bounds:[76,13,28],position:[-420,235,620],volume:88,opacity:.86,growth:3.5,speed:.042,fade:1600,color:"#ffffff"}),r.jsx(ze,{seed:31,segments:8,bounds:[80,14,29],position:[440,220,720],volume:92,opacity:.86,growth:3.6,speed:.044,fade:1600,color:"#ffffff"}),r.jsx(ze,{seed:37,segments:8,bounds:[72,12,26],position:[820,255,100],volume:84,opacity:.84,growth:3.3,speed:.04,fade:1600,color:"#ffffff"}),r.jsx(ze,{seed:41,segments:8,bounds:[74,13,27],position:[-850,270,60],volume:86,opacity:.84,growth:3.4,speed:.041,fade:1600,color:"#ffffff"})]}),r.jsx("pointLight",{ref:n,position:[-330,228,-720],distance:310,decay:2,castShadow:!1}),r.jsx("pointLight",{ref:i,position:[330,208,-820],distance:290,decay:2,castShadow:!1})]})}function is(){const{camera:e,scene:n}=qe(),i=t.useRef(0),a=t.useRef(null),s=t.useMemo(()=>new Ve(Yn),[]),c=t.useMemo(()=>new Ve("#06283f"),[]),u=t.useMemo(()=>new Ve,[]),m=t.useMemo(()=>new qr("#0a3854",0),[]);return Ue((h,b)=>{const g=e.position.y<Le-.45;i.current=ge.damp(i.current,g?1:0,4.8,b);const E=i.current;u.lerpColors(s,c,E),n.background=u,m.density=E*.0042,n.fog=E>.003?m:null,a.current===null?a.current=g:g!==a.current&&(a.current=g,window.dispatchEvent(new CustomEvent("ocean-surface-cross",{detail:{underwater:g}})))}),t.useEffect(()=>()=>{n.fog=null,n.background=s},[s,n]),null}function ss(){const e=t.useRef(null),{camera:n}=qe();return Ue((i,a)=>{e.current&&(e.current.intensity=ge.damp(e.current.intensity,n.position.y<Le-.45?.62:0,4.2,a))}),r.jsx("hemisphereLight",{ref:e,color:"#d9f7ff",groundColor:"#12364a",intensity:0})}function as(){const e=t.useRef(null),n=t.useRef(1),{camera:i}=qe();return t.useEffect(()=>{const a=e.current?.material;a&&(a.transparent=!0,a.depthWrite=!1,a.needsUpdate=!0)},[]),Ue((a,s)=>{const c=e.current?.material;c&&(n.current=ge.damp(n.current,i.position.y<Le-.45?0:1,4.8,s),c.opacity=n.current,e.current.visible=n.current>.004)}),r.jsx(_r,{ref:e,distance:Wi,sunPosition:Xn,turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})}function os(){const{scene:e}=Ct("/island.gltf"),n=en(),i=t.useMemo(()=>{const a=e.clone(!0);return a.scale.setScalar(100),a.position.set(0,-5,-300),a.traverse(s=>{if(!(s instanceof st))return;const u=(Array.isArray(s.material)?s.material:[s.material]).map(m=>{const h=m.clone();return h instanceof Gt&&(h.roughness=Math.max(h.roughness,.82),h.metalness=Math.min(h.metalness,.02),h.envMapIntensity=.08,tn(h,n)),h.needsUpdate=!0,h});s.material=Array.isArray(s.material)?u:u[0],s.castShadow=!0,s.receiveShadow=!0}),a},[n,e]);return t.useLayoutEffect(()=>(Yt.build(i),()=>Yt.clear()),[i]),t.useEffect(()=>()=>{i.traverse(a=>{if(!(a instanceof st))return;(Array.isArray(a.material)?a.material:[a.material]).forEach(c=>c.dispose())})},[i]),r.jsx("primitive",{object:i})}function cs(){const e=t.useRef(null),{camera:n}=qe(),{scene:i}=Ct("/wolfy.glb"),a=en(),s=t.useMemo(()=>Nr.clone(i),[i]),c=t.useRef(new J),u=t.useRef(0),m=t.useRef(new J),h=t.useRef(0),b=t.useRef(!0),g=t.useRef(!1),E=t.useRef(!1),U=t.useRef(new J(0,0,1)),A=t.useRef(zt),M=t.useRef(null),w=t.useRef(new J),j=t.useRef(new J),D=t.useRef(new J(0,1,0)),C=t.useMemo(()=>{s.updateWorldMatrix(!0,!0);const x=new Xr().setFromObject(s);if(x.isEmpty())return{localCenter:new J(0,.65,0),radius:6.5};const O=x.getSize(new J).multiplyScalar(Dt),N=x.getCenter(new J).multiplyScalar(Dt),R=Math.max(O.x,O.z)*.5,v=O.y*.32;return{localCenter:N,radius:ge.clamp(Math.max(R,v),5,14)}},[s]);return t.useEffect(()=>{s.traverse(x=>{x instanceof st&&x.material instanceof Gt&&(x.material=x.material.clone(),x.material.roughness=.42,x.material.metalness=.05,x.material.envMapIntensity=.35,tn(x.material,a),x.castShadow=!0,x.receiveShadow=!0)})},[a,s]),t.useEffect(()=>{Vn.current=e.current;const x=v=>{const{x:I,z:P}=v.detail;c.current.set(I,0,P)},O=()=>{!b.current&&!g.current||(b.current=!1,h.current=$i)},N=v=>{const{y:I}=v.detail;u.current=ge.clamp(I,-1,1),Math.abs(u.current)>.01&&(g.current=!0,b.current=!1)},R=v=>{E.current=v.detail.enabled,E.current||(c.current.set(0,0,0),u.current=0)};return window.addEventListener("explore-joystick",x),window.addEventListener("explore-jump",O),window.addEventListener("explore-vertical",N),window.addEventListener("explore-mode",R),E.current=document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1",()=>{window.removeEventListener("explore-joystick",x),window.removeEventListener("explore-jump",O),window.removeEventListener("explore-vertical",N),window.removeEventListener("explore-mode",R)}},[]),Ue((x,O)=>{if(!e.current||!E.current)return;const N=new J(c.current.x+(ue.arrowright||ue.d?1:0)-(ue.arrowleft||ue.a?1:0),0,c.current.z+(ue.arrowup||ue.w?1:0)-(ue.arrowdown||ue.s?1:0));N.lengthSq()<.01&&N.set(0,0,0);const R=new J;n.getWorldDirection(R),R.y=0,R.normalize();const v=new J().crossVectors(R,new J(0,1,0)).normalize(),I=new J().addScaledVector(R,N.z).addScaledVector(v,N.x);I.lengthSq()>1e-4&&I.normalize(),m.current.lerp(I.multiplyScalar(100),O*6);const P=e.current.position.clone().addScaledVector(m.current,O),V=(ue.e?1:0)-(ue.q?1:0),Se=ge.clamp(V+u.current,-1,1);if(Math.abs(Se)>.01&&(g.current=!0,b.current=!1),g.current?h.current=ge.damp(h.current,Se*58,Se===0?7.5:6,O):h.current-=Fi*Math.min(O,.05),P.y+=h.current*Math.min(O,.05),!g.current&&P.y<=zt&&(P.y=zt,h.current=0,b.current=!0),P.y=ge.clamp(P.y,Xt+8,yn),(P.y===Xt+8||P.y===yn)&&(h.current=0),Yt.resolve(P,5)&&(m.current.multiplyScalar(.2),h.current*=.2),e.current.position.copy(P),ke.moveWindowTo(P.x,P.z),j.current.copy(C.localCenter).applyAxisAngle(D.current,e.current.rotation.y),w.current.copy(P).add(j.current),M.current?ke.displaceSphere(M.current,w.current,C.radius):M.current=w.current.clone(),A.current>Le&&w.current.y<=Le||A.current<Le&&w.current.y>=Le){const ve=w.current.y>A.current;ke.addRipple(w.current.x,w.current.z,ve?.38:-1.25,ve?C.radius*1.45:Math.max(30,C.radius*2.4))}if(A.current=w.current.y,M.current.copy(w.current),N.lengthSq()>.01){const ve=I.clone();N.z<-.2&&ve.copy(R),U.current.lerp(ve,.15).normalize();const we=Math.atan2(U.current.x,U.current.z);e.current.rotation.y=Zi(e.current.rotation.y,we,.15)}e.current.userData.joyX=c.current.x}),r.jsx("primitive",{ref:e,object:s,scale:Dt,position:[0,15,0],rotation:[0,Math.PI,0]})}function ls(){const{camera:e}=qe(),n=t.useRef(0),i=t.useRef(0),a=t.useRef(!1);return t.useEffect(()=>{const s=c=>{a.current=c.detail.enabled};return window.addEventListener("explore-mode",s),()=>window.removeEventListener("explore-mode",s)},[]),Ue((s,c)=>{const u=Vn.current;if(!u)return;i.current+=c*(a.current?1:-1),i.current=ge.clamp(i.current,0,1);const m=i.current*i.current*(3-2*i.current),b=(ue.arrowright||ue.d?1:0)-(ue.arrowleft||ue.a?1:0)+(u.userData?.joyX??0);Math.abs(b)>.05&&(n.current-=b*c*2.5);const g=new J(0,22,70);g.applyAxisAngle(new J(0,1,0),n.current);const E=u.position.clone().add(g),A=new J(0,20,100).add(new J(Math.sin(i.current*Math.PI)*20,0,0)).lerp(E,m);e.position.lerp(A,.12);const M=new J(0,5,0),w=u.position.clone();w.y+=6,e.lookAt(M.lerp(w,m))}),null}function us(){const e=t.useRef(null),n=t.useRef(!1);return t.useEffect(()=>{const i=new Audio("/Ocean.mp3");i.loop=!0,i.preload="auto",i.volume=0,e.current=i;const a=(h,b=2e3)=>{if(!e.current)return;const g=e.current,E=g.volume,U=performance.now(),A=M=>{const w=Math.min((M-U)/b,1);g.volume=E+(h-E)*w,w<1?requestAnimationFrame(A):h===0&&(g.pause(),g.currentTime=0)};requestAnimationFrame(A)},s=async()=>{n.current=!0;try{i.paused&&await i.play(),a(.14,2400)}catch{}},c=()=>{n.current=!1,a(0,1800)},u=h=>{h.detail.active?s():c()},m=()=>{n.current&&s()};return window.addEventListener("skyocean-audio",u),window.addEventListener("pointerdown",m,{passive:!0}),window.addEventListener("keydown",m),document.getElementById("global-sky-ocean-bg")?.getAttribute("data-audio-active")==="1"&&s(),()=>{window.removeEventListener("skyocean-audio",u),window.removeEventListener("pointerdown",m),window.removeEventListener("keydown",m),i.pause(),i.src=""}},[]),null}function ds(){return t.useEffect(()=>{const e=new Audio("/bubble.mp3");e.preload="auto",e.volume=.24;const n=i=>{const a=i.detail.underwater;e.pause(),e.currentTime=0,e.playbackRate=a?.9:1.08,e.play().catch(()=>{})};return window.addEventListener("ocean-surface-cross",n),()=>{window.removeEventListener("ocean-surface-cross",n),e.pause(),e.src=""}},[]),null}function ms(){return r.jsxs(r.Fragment,{children:[r.jsx(us,{}),r.jsx(ds,{}),r.jsxs(Tr,{shadows:!0,dpr:[1,1.5],camera:{position:[0,20,100],fov:55,near:.1,far:Vi},gl:{antialias:!0,toneMapping:Dr,toneMappingExposure:.8,outputColorSpace:zr},children:[r.jsx("color",{attach:"background",args:[Yn]}),r.jsx("directionalLight",{position:Xn,intensity:1,color:qi,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-camera-near":10,"shadow-camera-far":1800,"shadow-camera-left":-500,"shadow-camera-right":500,"shadow-camera-top":500,"shadow-camera-bottom":-500}),r.jsx("ambientLight",{intensity:.35,color:"#ffffff"}),r.jsx(ss,{}),r.jsx(as,{}),r.jsxs(t.Suspense,{fallback:null,children:[r.jsx(es,{}),r.jsx(Qi,{}),r.jsx(ts,{}),r.jsx(rs,{}),r.jsx(os,{}),r.jsx(cs,{})]}),r.jsx(ls,{}),r.jsx(ns,{}),r.jsx(is,{})]})]})}Ct.preload("/wolfy.glb");Ct.preload("/island.gltf");function ot(e,n){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(n)}function ps(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function fs(){const{data:e,error:n}=await Q.from("archive_sections").select("*").eq("is_visible",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw ot(n,"Unable to load the archive sections.");return e??[]}async function Hs(){const{data:e,error:n}=await Q.from("archive_sections").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw ot(n,"Unable to load the archive section manager.");return e??[]}async function qs(e,n,i){const a=e.trim(),s=ps(a),c=n.trim().toUpperCase().slice(0,8);if(!a||!s)throw new Error("Enter a section name.");if(!c)throw new Error("Enter a short section code.");const{data:u,error:m}=await Q.from("archive_sections").insert({name:a,slug:s,code:c,sort_order:i,is_visible:!0}).select("*").single();if(m)throw ot(m,"Unable to create the archive section.");return u}async function Gs(e,n){const i={...n,...n.name!==void 0?{name:n.name.trim()}:{},...n.code!==void 0?{code:n.code.trim().toUpperCase().slice(0,8)}:{}},{data:a,error:s}=await Q.from("archive_sections").update(i).eq("id",e).select("*").single();if(s)throw ot(s,"Unable to save the archive section.");return a}async function Ks(e){const{error:n}=await Q.from("archive_sections").delete().eq("id",e.id);if(n)throw ot(n,"Unable to delete this section. Move its books to another section first.")}const kn=[{id:"default-objects",slug:"objects",name:"Objects",code:"OBJ",sort_order:0,is_visible:!0,created_at:"",updated_at:""},{id:"default-graphics",slug:"graphics",name:"Graphics",code:"GRPH",sort_order:1,is_visible:!0,created_at:"",updated_at:""},{id:"default-concepts",slug:"concepts",name:"Concepts",code:"CNCP",sort_order:2,is_visible:!0,created_at:"",updated_at:""}],hs=`
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
`,ie={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode"},gs="Gabriel Dell'Aiuto. b. 1996. TEXT 2",xs=()=>{const e=Rt(),i=t.useRef(sessionStorage.getItem(Wt)==="true").current,s=t.useRef(sessionStorage.getItem(Ft)==="true"||i||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,u=t.useRef(s&&sessionStorage.getItem(ie.returnFlag)==="true").current,[m]=t.useState(()=>Zt()),[h,b]=t.useState(s),[g,E]=t.useState([]),[U,A]=t.useState(!0),[M,w]=t.useState(null),[j,D]=t.useState(kn),[C,x]=t.useState(!1),O=t.useCallback(async()=>{A(!0);try{const o=await Dn();E(o),w(null)}catch(o){console.error("Unable to load published books",o),w(o instanceof Error?o.message:"Unable to load the published books.")}finally{A(!1)}},[]),N=t.useCallback(async()=>{try{const o=await fs();D(o),x(!0)}catch{D(kn),x(!1)}},[]);t.useEffect(()=>{O(),N();const o=()=>{O(),N()},f=()=>{document.visibilityState==="visible"&&O()};return window.addEventListener("focus",o),document.addEventListener("visibilitychange",f),()=>{window.removeEventListener("focus",o),document.removeEventListener("visibilitychange",f)}},[N,O]);const R=t.useMemo(()=>g.find(o=>o.is_featured)??g[0]??null,[g]),v=t.useMemo(()=>{if(C)return j;const o=[...j];return g.forEach(f=>{o.some(y=>y.slug===f.category)||o.push({id:`fallback-${f.category}`,slug:f.category,name:f.category.replace(/-/g," "),code:f.category.slice(0,4).toUpperCase(),sort_order:o.length,is_visible:!0,created_at:"",updated_at:""})}),o},[j,C,g]),I=t.useMemo(()=>{const o=new Map(v.map(y=>[y.slug,y])),f=y=>({id:y.id,category:o.get(y.category)?.code??y.category.slice(0,4).toUpperCase(),name:y.title,link:`/book/${encodeURIComponent(y.slug)}`,isFeatured:y.is_featured});return v.reduce((y,q)=>(y[q.slug]=g.filter(_e=>_e.category===q.slug).map(f),y),{})},[v,g]),P=t.useMemo(()=>Object.values(I).flat(),[I]);t.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const o="__GLOBAL_SKY_OCEAN_BG_ROOT__",f=window,y=document.getElementById("global-sky-ocean-bg");if(f[o]){y&&(y.style.display="block",y.style.zIndex="0");return}const q=document.createElement("div");q.id="global-sky-ocean-bg",Object.assign(q.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(q);const _e=Pn.createRoot(q);_e.render(r.jsx(t.Suspense,{fallback:null,children:r.jsx(ms,{})})),f[o]=_e},[]);const V=i?"intro":sessionStorage.getItem(ie.stage)||"intro",Se=sessionStorage.getItem(ie.activeButton)||null,se=sessionStorage.getItem(ie.searchOpen)==="true",ve=sessionStorage.getItem(ie.searchQuery)||"",we=sessionStorage.getItem(ie.exploreMode)==="true",[T,ee]=t.useState(V),[Y,Re]=t.useState(Se),[$,te]=t.useState(se),[X,Ie]=t.useState(ve),[k,G]=t.useState(we),K=V==="list"||!!Se||se,[ne,Ne]=t.useState(K),[re,ce]=t.useState(!1),[de,ae]=t.useState(!1),[me,Ce]=t.useState(!1),[z,Ee]=t.useState(!1);t.useEffect(()=>{if(!z||de)return;if(s){b(!0);return}b(!1);let o=0;const f=window.requestAnimationFrame(()=>{o=window.requestAnimationFrame(()=>{b(!0)})});return()=>{window.cancelAnimationFrame(f),window.cancelAnimationFrame(o)}},[z,s,de]);const[pe,fe]=t.useState(!1),[F,$e]=t.useState(!1),[oe,Te]=t.useState(!1),[Fe,l]=t.useState(!1),[p,B]=t.useState(!u),H=t.useRef(null),[L,he]=t.useState(()=>{if(s)return!1;try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),be=t.useRef(null),le=t.useRef(null);t.useEffect(()=>()=>{H.current&&window.clearTimeout(H.current)},[]),t.useEffect(()=>{if(!me||T!=="intro"||oe||F||!L)return;const o=window.setTimeout(()=>{l(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(o)}},[oe,me,F,L,T]),t.useEffect(()=>{if(T!=="main"&&T!=="list"||F||!L||p)return;const o=window.setTimeout(()=>{B(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(o)}},[p,F,L,T]);const[d,S]=t.useState(!1),_=t.useRef(null),Z=t.useRef(null),[je,Be]=t.useState(!1);t.useEffect(()=>{if(!s)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem(Ft),sessionStorage.removeItem(Wt),sessionStorage.removeItem("revealDone"),he(!1),fe(!1),document.documentElement.style.background="",document.body.style.background="";const o=document.getElementById("global-sky-ocean-bg");o&&(o.style.display="block",o.style.zIndex="0")},[s]),t.useEffect(()=>{try{sessionStorage.setItem(ie.exploreMode,String(k))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:k}}));const o=document.getElementById("global-sky-ocean-bg");o&&o.setAttribute("data-explore",k?"1":"0")},[k]),t.useEffect(()=>{const o=z&&!de&&!F;document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active",o?"1":"0");const y=window.setTimeout(()=>{window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:o}}))},0);return()=>window.clearTimeout(y)},[z,F,de]),t.useEffect(()=>()=>{document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active","0"),window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:!1}}))},[]),t.useEffect(()=>{sessionStorage.setItem(ie.stage,T),sessionStorage.setItem(ie.activeButton,Y??""),sessionStorage.setItem(ie.searchOpen,String($)),sessionStorage.setItem(ie.searchQuery,X)},[T,Y,$,X]),t.useEffect(()=>{!sessionStorage.getItem(ie.splash)&&T==="intro"&&!s?ae(!0):Ce(!0),Ee(!0)},[s,T]);const qn=t.useCallback(()=>{sessionStorage.setItem(ie.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const o=document.getElementById("global-sky-ocean-bg");o&&(o.style.display="none"),ae(!1),e(R?`/book/${encodeURIComponent(R.slug)}`:"/books")},[R,e]);t.useEffect(()=>{(me||s)&&!L&&!pe&&!F&&fe(!0)},[me,s,F,L,pe]);const Gn=t.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}be.current?(be.current.classList.add("fade-out"),setTimeout(()=>{fe(!1),he(!0)},240)):(fe(!1),he(!0))},[]),ct=t.useCallback(o=>{F||(le.current=o,fe(!1),$e(!0))},[F]),Kn=t.useCallback(()=>{const o=le.current;if(!o)return;document.documentElement.style.background="white",document.body.style.background="white";const f=document.getElementById("global-sky-ocean-bg");f&&(f.style.display="none"),e(o)},[e]),Pe=t.useCallback(()=>{Re(null),te(!1),Ie(""),ee("main")},[]),lt=t.useCallback(()=>{Ne(!1)},[]),Jn=t.useCallback(()=>{ce(!1),ne&&Pe(),Ne(o=>!o),window.dispatchEvent(new Event("mousemove"))},[ne,Pe]),Zn=t.useCallback(()=>{if(re){ce(!1);return}Pe(),Ne(!1),ce(!0),window.dispatchEvent(new Event("mousemove"))},[re,Pe]),ut=t.useMemo(()=>P.filter(o=>o.name.toLowerCase().includes(X.toLowerCase())),[P,X]),Qn=t.useCallback(()=>{if(Y&&Y!=="search"&&!X){const o=I[Y]||[],f=P.filter(y=>!o.some(q=>q.id===y.id));return[...o,...f]}if(Y==="search"&&X){const o=ut,f=P.filter(y=>!o.some(q=>q.id===y.id));return[...o,...f]}return P},[Y,X,I,P,ut])(),er=t.useCallback(o=>{Y===o?Pe():(Re(o),ee("list"),te(!1),Ie(""))},[Y,Pe]),nn=t.useCallback(o=>{const f=Z.current?Z.current.scrollTop:0;sessionStorage.setItem(ie.listScroll,String(f));const y={activeButton:Y,searchOpen:$,searchQuery:X,stage:T,introVisible:me,archiveOpen:ne};try{sessionStorage.setItem(ie.snapshot,JSON.stringify(y))}catch{}sessionStorage.setItem(ie.returnFlag,"true"),ct(o)},[Y,ne,ct,me,$,X,T]),rn=t.useCallback(()=>{Pe(),lt(),ce(!1),Te(!1),l(!1),ee("intro")},[lt,Pe]),tr=t.useCallback(()=>{oe||F||(Te(!0),B(!1),lt(),ce(!1),H.current=window.setTimeout(()=>{ee("main"),Te(!1)},1160))},[lt,oe,F]),nr=t.useCallback(()=>{!m||F||ct(`/book/${encodeURIComponent(m.slug)}`)},[ct,m,F]),rr=t.useCallback(()=>{Y==="search"?Pe():(te(!0),ee("list"),Re("search"))},[Y,Pe]),dt=t.useCallback(()=>{S(!1),_.current&&clearTimeout(_.current),_.current=window.setTimeout(()=>{S(!0)},5e3)},[]);t.useEffect(()=>{const o=["mousemove","mousedown","touchstart","touchmove","keydown"];return o.forEach(f=>{window.addEventListener(f,dt)}),dt(),()=>{o.forEach(f=>{window.removeEventListener(f,dt)}),_.current&&clearTimeout(_.current)}},[dt]),t.useEffect(()=>{if(!z||!(sessionStorage.getItem(ie.returnFlag)==="true"))return;let f=null;try{const y=sessionStorage.getItem(ie.snapshot);f=y?JSON.parse(y):null}catch{}if(f){Re(f.activeButton??null),te(!!f.searchOpen),Ie(f.searchQuery??""),f.archiveOpen||f.stage==="list"?Ne(!0):Ne(!1),f.stage&&ee(f.stage),Ce(!!f.introVisible),f.stage==="list"&&Be(!0),sessionStorage.removeItem(ie.returnFlag);return}Ce(!0),ee("main"),Ne(!0),window.setTimeout(()=>{ee("list"),Be(!0),sessionStorage.removeItem(ie.returnFlag)},700)},[z]),t.useEffect(()=>{if(T!=="list"||!je)return;const o=Number(sessionStorage.getItem(ie.listScroll)||"0"),f=window.setTimeout(()=>{Z.current&&(Z.current.scrollTop=Number.isNaN(o)?0:o),Be(!1)},0);return()=>{window.clearTimeout(f)}},[T,je]);const ir=t.useRef(null),et=t.useRef(null),mt=t.useRef(!1),_t=t.useRef(!1),pt=t.useRef(!1),Mt=t.useRef({x:0,y:0}),tt=t.useRef({x:0,y:0}),ft=60,Ke=t.useCallback((o,f)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:o,z:f}}))},[]),ht=t.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]),We=t.useCallback(o=>{window.dispatchEvent(new CustomEvent("explore-vertical",{detail:{y:o}}))},[]),sn=t.useCallback((o,f)=>{o.preventDefault(),o.stopPropagation(),o.currentTarget.setPointerCapture(o.pointerId),We(f)},[We]),gt=t.useCallback(o=>{o.preventDefault(),o.stopPropagation(),o.currentTarget.hasPointerCapture(o.pointerId)&&o.currentTarget.releasePointerCapture(o.pointerId),We(0)},[We]);t.useEffect(()=>{k||(Ke(0,0),We(0))},[k,Ke,We]),t.useEffect(()=>{if(!k)return;const o=y=>{y.code==="Space"&&(y.preventDefault(),y.stopPropagation(),y.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},f=y=>{y.code==="Space"&&(o(y),y.repeat||ht())};return window.addEventListener("keydown",f,!0),window.addEventListener("keyup",o,!0),()=>{window.removeEventListener("keydown",f,!0),window.removeEventListener("keyup",o,!0)}},[k,ht]);const sr=t.useCallback(o=>{if(!k)return;mt.current=!0,o.currentTarget.setPointerCapture(o.pointerId);const f=o.currentTarget.getBoundingClientRect();tt.current={x:f.left+f.width/2,y:f.top+f.height/2},Mt.current={x:o.clientX,y:o.clientY},pt.current=!1,_t.current=Math.hypot(o.clientX-tt.current.x,o.clientY-tt.current.y)<=34},[k]),ar=t.useCallback(o=>{if(!mt.current||!et.current)return;const f=o.clientX-tt.current.x,y=o.clientY-tt.current.y;Math.hypot(o.clientX-Mt.current.x,o.clientY-Mt.current.y)>8&&(pt.current=!0);const q=Math.hypot(f,y),_e=q>ft?ft:q,cn=f/(q||1)*_e,ln=y/(q||1)*_e;et.current.style.transform=`translate(${cn}px, ${ln}px)`;const cr=cn/ft,lr=-ln/ft;Ke(cr,lr)},[Ke]),an=t.useCallback(o=>{mt.current&&(mt.current=!1,o.currentTarget.hasPointerCapture(o.pointerId)&&o.currentTarget.releasePointerCapture(o.pointerId),et.current&&(et.current.style.transform="translate(0px, 0px)"),Ke(0,0),o.type!=="pointercancel"&&_t.current&&!pt.current&&ht(),_t.current=!1,pt.current=!1)},[Ke,ht]),or=t.useCallback(o=>!!(Y&&Y!=="search"&&I[Y]?.some(f=>f.id===o.id)||Y==="search"&&X&&ut.some(f=>f.id===o.id)),[Y,I,ut,X]),It=me&&T==="intro"?F||oe?"is-leaving":L?Fe?"is-visible":"is-entering":"is-outside":"is-outside",on=(T==="main"||T==="list")&&F?"is-leaving":L?p?"is-visible":"is-entering":"is-outside",xt=T==="main"||T==="list"?on:"is-outside",Nt=T==="list"?"-15vh":ne||re?"-42px":"0px",Je=v.length+3,bt=o=>({animate:{y:T==="main"||T==="list"?Nt:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:o*.025}}),nt=(o,f=Je)=>{const y=o*.055,q=Math.max(0,f-1-o)*.035,_e={scale:0,opacity:0,filter:"blur(8px)",y:Nt};return{initial:_e,animate:F?{..._e,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:q},opacity:{duration:.16,delay:q},filter:{duration:.2,delay:q},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:q}}}:{scale:1,opacity:1,filter:"blur(0px)",y:Nt},exit:{..._e,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:q},opacity:{duration:.16,delay:q},filter:{duration:.2,delay:q},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:q}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:y},opacity:{duration:.2,delay:y},filter:{duration:.25,delay:y},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:o*.025}}}};return z?r.jsxs(r.Fragment,{children:[r.jsx("style",{children:hs}),de?r.jsx(Ui,{onComplete:qn}):r.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${s?"is-returning-from-book":h?"is-entered":"is-entering"}`,children:[r.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:d?0:1},children:[r.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${me&&T==="intro"?"":"pointer-events-none"} ${k?"opacity-0 pointer-events-none":"opacity-100"}`,children:[r.jsxs("p",{className:`index-intro-copy intro-elastic-item ${It} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:rn,children:["TEXT 1",r.jsx("br",{})]}),r.jsxs("div",{className:"flex items-center justify-center gap-2",children:[r.jsx("button",{onClick:nr,disabled:!Fe||oe,className:`index-intro-control intro-elastic-item item-start ${It} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:r.jsx("span",{className:"animate-bounce",children:"BACK"})}),m&&r.jsx("button",{type:"button",onClick:tr,disabled:!Fe||F,className:`index-intro-control intro-elastic-item item-back ${It} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:"START"})]})]}),r.jsxs("div",{className:`absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl ${T==="intro"?"pointer-events-none":""}`,style:{top:"calc(50% - 24px)"},children:[r.jsxs("div",{className:"index-main-control-row flex min-h-12 items-center justify-center gap-5 text-[16px] font-normal md:gap-10 md:text-[16px]",children:[r.jsx(ye.div,{...bt(0),children:r.jsx("div",{className:`main-control-item item-back ${xt}`,children:r.jsx("button",{onClick:rn,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${k?"pointer-events-none opacity-0":"opacity-100"}`,children:"BACK"})})}),r.jsx(ye.div,{...bt(1),children:r.jsx("div",{className:`main-control-item item-archive ${xt}`,children:r.jsx("button",{type:"button",onClick:Jn,"aria-expanded":ne,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${ne?"animate-bounce":""} ${k?"pointer-events-none opacity-0":"opacity-100"}`,children:"ARCHIVE"})})}),r.jsx(ye.div,{...bt(2),children:r.jsx("div",{className:`main-control-item item-about ${xt}`,children:r.jsx("button",{type:"button",onClick:Zn,"aria-expanded":re,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${re?"animate-bounce":""} ${k?"pointer-events-none opacity-0":"opacity-100"}`,children:"BIO"})})}),r.jsx(ye.div,{...bt(3),children:r.jsx("div",{className:`main-control-item item-play ${xt}`,children:r.jsxs("button",{onClick:o=>{o.currentTarget.blur(),G(f=>!f)},title:k?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${k?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[r.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${k?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),r.jsx("span",{className:`whitespace-nowrap font-normal transition-all ${k?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"PLAY"})]})})})]}),r.jsx(un,{initial:!1,mode:"wait",children:ne?r.jsxs(ye.div,{initial:!1,className:`index-archive-panel mx-auto mt-10 pb-0 text-center font-normal leading-[2] transition-opacity duration-500 ${k?"pointer-events-none opacity-0":"opacity-100"}`,children:[r.jsx(ye.div,{...nt(0,Je),className:"index-archive-featured archive-elastic-item item-featured min-h-[32px] text-[16px] md:text-[16px]",children:R?r.jsxs("button",{type:"button",onClick:()=>nn(`/book/${encodeURIComponent(R.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[r.jsx("span",{className:"shrink-0 text-black",children:"COVER"})," ",r.jsx("br",{})," ",r.jsx("br",{}),r.jsx("span",{className:"truncate",children:R.title})]}):U?r.jsx("span",{className:"text-black/50",children:"..."}):M?r.jsx("button",{type:"button",onClick:()=>void O(),className:"text-black/60 bounce",children:"RETRY BOOK LIST"}):r.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),r.jsxs("div",{className:"index-archive-category-row flex flex-wrap items-center justify-center gap-2 uppercase md:gap-3",children:[r.jsx(ye.div,{...nt(1,Je),className:"archive-elastic-item item-search",children:r.jsx("button",{onClick:rr,className:`index-archive-category-button z-10 flex items-center text-[16px] font-normal uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${Y==="search"?"animate-bounce":"bg-alpha"}`,children:"search"})}),v.map((o,f)=>r.jsx(ye.div,{...nt(f+2,Je),className:`archive-elastic-item item-${o.slug}`,children:r.jsx("button",{onClick:()=>{er(o.slug)},className:`index-archive-category-button text-[16px] font-normal uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${Y===o.slug?"animate-bounce":"bg-alpha"}`,children:o.name})},o.id))]}),r.jsx(ye.div,{...nt(Je-1,Je),className:"index-archive-search-field archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:r.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${$?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:r.jsx("input",{type:"text",placeholder:"Search...",value:X,onChange:o=>{Ie(o.target.value)},className:"index-archive-search-input w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls"):re?r.jsx(ye.div,{initial:!1,className:`mx-auto mt-10 max-w-xl pb-0 text-center leading-[1.55] ${k?"pointer-events-none opacity-0":"opacity-100"}`,children:r.jsx(ye.div,{...nt(0,2),className:"index-about-panel archive-elastic-item px-2 text-[16px] font-normal md:text-[16px]",children:r.jsx("p",{children:gs})})},"about-panel"):null})]}),r.jsx("div",{className:`index-list-panel ${T==="list"?"is-list-open":"is-list-closed"} absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] font-normal md:text-[16px] ease-in-out ${T==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${k?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:r.jsxs("div",{className:`index-elastic-item item-list ${on}`,children:[r.jsxs("div",{className:"index-list-header grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] font-normal md:text-[16px]",children:[r.jsx("div",{className:"py-[0.5px]",children:"TAG"}),r.jsx("div",{className:"py-[0.5px]",children:"TITLE"})]}),!U&&!M&&P.length===0?r.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):r.jsx("div",{ref:Z,className:"index-list-scroll overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:r.jsx(un,{initial:!1,mode:"popLayout",children:Qn.map((o,f)=>{const y=or(o);return r.jsxs(ye.div,{initial:{scale:0,opacity:0,filter:"blur(7px)"},animate:{scale:1,opacity:1,filter:"blur(0px)"},exit:{scale:0,opacity:0,filter:"blur(7px)"},whileHover:{scale:.97},whileTap:{scale:.95},transition:{scale:{type:"spring",stiffness:430,damping:23,mass:.68,delay:f*.022},opacity:{duration:.18,delay:f*.022},filter:{duration:.22,delay:f*.022}},className:`index-list-row grid origin-center grid-cols-2 text-[16px] md:text-[16px] backdrop-blur-[1px] cursor-pointer ${y?"text-black":"text-gray-700"}`,onClick:()=>{nn(o.link)},children:[r.jsx("div",{className:"py-[0.5px] tracking-normal",children:o.category}),r.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[o.name,o.isFeatured?" *":""]})]},`${Y??"all"}:${o.id}`)})})})]})})]}),k&&r.jsxs(r.Fragment,{children:[r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move down (Q)",onPointerDown:o=>sn(o,-1),onPointerUp:gt,onPointerCancel:gt,onLostPointerCapture:()=>We(0),className:"fixed bottom-[48px] flex h-11 w-11 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border border-white/25 bg-transparent text-[12px] font-normal text-white/65 backdrop-blur-sm",style:{left:"calc(50% - 82px)",zIndex:20},children:"Q ↓"}),r.jsx("div",{ref:ir,"data-ocean-control":!0,onPointerDown:sr,onPointerMove:ar,onPointerUp:an,onPointerCancel:an,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:r.jsx("div",{ref:et,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:r.jsx("span",{"aria-hidden":"true",children:"↑"})})}),r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move up (E)",onPointerDown:o=>sn(o,1),onPointerUp:gt,onPointerCancel:gt,onLostPointerCapture:()=>We(0),className:"fixed bottom-[48px] flex h-11 w-11 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border border-white/25 bg-transparent text-[12px] font-normal text-white/65 backdrop-blur-sm",style:{left:"calc(50% + 82px)",zIndex:20},children:"E ↑"})]}),(!L&&(pe||s)||F)&&r.jsx("div",{ref:be,className:"reveal-overlay","aria-hidden":"true",children:r.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[r.jsx("defs",{children:r.jsxs("mask",{id:"hole-mask",children:[r.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),r.jsx("circle",{className:`mask-circle ${F?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:F?Kn:Gn})]})}),r.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},bs=t.lazy(()=>Xe(()=>import("./AdminPortal-VXgpY42B.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),vs=t.lazy(()=>Xe(()=>import("./Archive-brCwI5wp.js"),__vite__mapDeps([9,10,1,2,6,4,5,7]))),ws=t.lazy(()=>Xe(()=>import("./object01-BxHKGjj0.js"),__vite__mapDeps([11,10,1,2]))),ys=t.lazy(()=>Xe(()=>import("./Message-x80eM2Kv.js"),__vite__mapDeps([12,1,2,7,4,5,6]))),ks=t.lazy(()=>Xe(()=>import("./NotFound-DBAr_sT_.js"),__vite__mapDeps([13,1,2]))),Ss=t.lazy(()=>Xe(()=>import("./WatchStudio-X4_bY7vf.js"),__vite__mapDeps([8,1,2,4,5,3,7,6]))),Es=new yr,Sn=()=>{const e=Rt();return r.jsx(bs,{onBack:()=>e("/")})},En=()=>{const e=Rt(),{slug:n}=Rr();return r.jsx(Oi,{initialSlug:n??null,onBack:()=>e("/"),onLogin:()=>e("/login"),onThreeD:()=>e("/3d"),onBookChange:i=>{e(`/book/${encodeURIComponent(i)}`,{replace:!0})}})},js=()=>{const e=Rt();return r.jsx(Ss,{onBack:()=>{const n=Zt();e(n?`/book/${encodeURIComponent(n.slug)}`:"/books")}})},Rs=()=>{const{pathname:e}=Er(),n=e==="/";return r.jsxs("div",{className:`fixed inset-0 overflow-hidden ${n?"bg-transparent":"bg-white dark:bg-black"}`,children:[r.jsx(ai,{}),r.jsx(oi,{}),r.jsx(t.Suspense,{fallback:r.jsx("div",{className:"fixed inset-0 bg-white"}),children:r.jsxs(jr,{children:[r.jsx(Ae,{path:"/",element:r.jsx(xs,{})}),r.jsx(Ae,{path:"/archive",element:r.jsx(vs,{})}),r.jsx(Ae,{path:"/message",element:r.jsx(ys,{})}),r.jsx(Ae,{path:"/object01",element:r.jsx(ws,{})}),r.jsx(Ae,{path:"/login",element:r.jsx(Sn,{})}),r.jsx(Ae,{path:"/admin",element:r.jsx(Sn,{})}),r.jsx(Ae,{path:"/3d",element:r.jsx(js,{})}),r.jsx(Ae,{path:"/books",element:r.jsx(En,{})}),r.jsx(Ae,{path:"/book/:slug",element:r.jsx(En,{})}),r.jsx(Ae,{path:"*",element:r.jsx(ks,{})})]})})]})},Cs=()=>r.jsx(kr,{client:Es,children:r.jsx(Li,{children:r.jsx(ci,{children:r.jsx(Sr,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:r.jsx(Rs,{})})})})}),jn=sessionStorage.getItem("redirect");jn&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",jn));Pn.createRoot(document.getElementById("root")).render(r.jsx(Cs,{}));export{kn as D,Ls as M,zs as a,He as b,qs as c,Ks as d,Ds as e,Us as f,$s as g,Fs as h,Ws as i,Xs as j,Q as k,Hs as l,Vs as m,Ys as n,ni as o,Bs as p,xi as s,Gs as u};
