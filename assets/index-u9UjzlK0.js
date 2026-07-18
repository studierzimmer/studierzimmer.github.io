const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-Dk5ivv_x.js","assets/vendor-Dso59N_O.js","assets/three-CQO4KQ3J.js","assets/AdminThreeDModelManager-BZ4Fm6bk.js","assets/react-three-DP099Jq1.js","assets/postprocessing-C5EpOQZm.js","assets/motion-C5B2NUSC.js","assets/supabase-BNwldGNI.js","assets/WatchStudio-CwfyoW7y.js","assets/Archive-Bw8eJq_U.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-C8I6djSc.js","assets/Message-D1hJolhb.js","assets/NotFound-6WqWxgYD.js"])))=>i.map(i=>d[i]);
import{r as e,ay as $n,az as Dn,j as n,aA as tn,aB as nn,aC as an,aD as rn,aE as Fn,aF as sn,aG as on,aH as Un,aI as Vn,aJ as Yn,aK as Xn,aL as cn,aM as Wn,aN as Gn,aO as Et,aP as mt,ar as ln,aQ as Hn,aR as Kn,aS as qn,aT as Jn,aU as Qn,aV as Re,aW as Zn}from"./vendor-Dso59N_O.js";import{_ as Oe,u as ea,a as ft,C as ta,S as na,b as aa,W as ra,c as Ct,d as un,e as ia}from"./react-three-DP099Jq1.js";import{c as sa}from"./supabase-BNwldGNI.js";import{u as xt,a as $e,m as be,A as zt}from"./motion-C5B2NUSC.js";import{V as fe,k as oa,ba as ca,aA as la,a8 as ua,P as da,Q as $t,M as St,aG as dn,Y as ma}from"./three-CQO4KQ3J.js";import"./postprocessing-C5EpOQZm.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const p of l.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function r(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=r(o);fetch(o.href,l)}})();const fa=1,pa=1e6;let vt=0;function ha(){return vt=(vt+1)%Number.MAX_SAFE_INTEGER,vt.toString()}const wt=new Map,Dt=t=>{if(wt.has(t))return;const a=setTimeout(()=>{wt.delete(t),We({type:"REMOVE_TOAST",toastId:t})},pa);wt.set(t,a)},ga=(t,a)=>{switch(a.type){case"ADD_TOAST":return{...t,toasts:[a.toast,...t.toasts].slice(0,fa)};case"UPDATE_TOAST":return{...t,toasts:t.toasts.map(r=>r.id===a.toast.id?{...r,...a.toast}:r)};case"DISMISS_TOAST":{const{toastId:r}=a;return r?Dt(r):t.toasts.forEach(s=>{Dt(s.id)}),{...t,toasts:t.toasts.map(s=>s.id===r||r===void 0?{...s,open:!1}:s)}}case"REMOVE_TOAST":return a.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(r=>r.id!==a.toastId)}}},ct=[];let lt={toasts:[]};function We(t){lt=ga(lt,t),ct.forEach(a=>{a(lt)})}function ba({...t}){const a=ha(),r=o=>We({type:"UPDATE_TOAST",toast:{...o,id:a}}),s=()=>We({type:"DISMISS_TOAST",toastId:a});return We({type:"ADD_TOAST",toast:{...t,id:a,open:!0,onOpenChange:o=>{o||s()}}}),{id:a,dismiss:s,update:r}}function xa(){const[t,a]=e.useState(lt);return e.useEffect(()=>(ct.push(a),()=>{const r=ct.indexOf(a);r>-1&&ct.splice(r,1)}),[t]),{...t,toast:ba,dismiss:r=>We({type:"DISMISS_TOAST",toastId:r})}}function Le(...t){return $n(Dn(t))}const va=Vn,mn=e.forwardRef(({className:t,...a},r)=>n.jsx(tn,{ref:r,className:Le("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",t),...a}));mn.displayName=tn.displayName;const wa=Un("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),fn=e.forwardRef(({className:t,variant:a,...r},s)=>n.jsx(nn,{ref:s,className:Le(wa({variant:a}),t),...r}));fn.displayName=nn.displayName;const ya=e.forwardRef(({className:t,...a},r)=>n.jsx(an,{ref:r,className:Le("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",t),...a}));ya.displayName=an.displayName;const pn=e.forwardRef(({className:t,...a},r)=>n.jsx(rn,{ref:r,className:Le("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",t),"toast-close":"",...a,children:n.jsx(Fn,{className:"h-4 w-4"})}));pn.displayName=rn.displayName;const hn=e.forwardRef(({className:t,...a},r)=>n.jsx(sn,{ref:r,className:Le("text-sm font-semibold",t),...a}));hn.displayName=sn.displayName;const gn=e.forwardRef(({className:t,...a},r)=>n.jsx(on,{ref:r,className:Le("text-sm opacity-90",t),...a}));gn.displayName=on.displayName;function ka(){const{toasts:t}=xa();return n.jsxs(va,{children:[t.map(function({id:a,title:r,description:s,action:o,...l}){return n.jsxs(fn,{...l,children:[n.jsxs("div",{className:"grid gap-1",children:[r&&n.jsx(hn,{children:r}),s&&n.jsx(gn,{children:s})]}),o,n.jsx(pn,{})]},a)}),n.jsx(mn,{})]})}const Ea=({...t})=>{const{theme:a="system"}=Yn();return n.jsx(Xn,{theme:a,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})},Sa=Wn,ja=e.forwardRef(({className:t,sideOffset:a=4,...r},s)=>n.jsx(cn,{ref:s,sideOffset:a,className:Le("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...r}));ja.displayName=cn.displayName;const Ta="https://pmpspnvfgkzprgntihtx.supabase.co",_a="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",Ge="book-pages",zr="models-3d",H=sa(Ta,_a,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),Ra=50*1024*1024;function pe(t,a){return t instanceof Error?t:typeof t=="object"&&t&&"message"in t?new Error(String(t.message)):new Error(a)}function Ca(t){const{data:a}=H.storage.from(Ge).getPublicUrl(t);return a.publicUrl}function Na(t){return{...t,public_url:Ca(t.storage_path)}}function Ia(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function Ma(t){if(t.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const a of t){const r=a.name.toLowerCase(),s=r.endsWith(".jpg")||r.endsWith(".jpeg"),o=a.type==="image/jpeg"||a.type==="";if(!s||!o)throw new Error(`${a.name} is not a JPG/JPEG image.`);if(a.size>Ra)throw new Error(`${a.name} is larger than 50 MB.`)}}function Aa(t){return t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function $r(){const{data:t,error:a}=await H.rpc("is_admin");if(a)throw pe(a,"Unable to verify administrator access.");return t===!0}async function bn(){const{data:t,error:a}=await H.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(a)throw pe(a,"Unable to load books.");return t??[]}async function Dr(){const{data:t,error:a}=await H.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(a)throw pe(a,"Unable to load the admin book list.");return t??[]}async function Be(t){const{data:a,error:r}=await H.from("book_pages").select("*").eq("book_id",t).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(r)throw pe(r,"Unable to load the book pages.");return(a??[]).map(Na)}async function Fr(t){const a=Aa(t.slug);if(!a)throw new Error("The book needs a valid slug.");const{data:r,error:s}=await H.from("books").insert({title:t.title.trim(),slug:a,storage_folder:a,category:t.category,description:t.description?.trim()??"",is_published:t.is_published??!1,is_featured:!1,sort_order:t.sort_order??0}).select("*").single();if(s)throw pe(s,"Unable to create the book.");return r}async function Ur(t,a){const{data:r,error:s}=await H.from("books").update(a).eq("id",t).select("*").single();if(s)throw pe(s,"Unable to save the book.");return r}async function Vr(t){const{error:a}=await H.rpc("set_featured_book",{p_book_id:t});if(a)throw pe(a,"Unable to set the featured book.")}async function Yr(t,a,r){const s=[...a].sort((f,E)=>f.name.localeCompare(E.name,void 0,{numeric:!0,sensitivity:"base"}));Ma(s);let l=(await Be(t.id)).reduce((f,E)=>Math.max(f,E.page_number),0)+1,p=0;for(const f of s){const E=`${t.storage_folder}/${String(l).padStart(4,"0")}-${Ia()}.jpg`,{error:b}=await H.storage.from(Ge).upload(E,f,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(b)throw pe(b,`Unable to upload ${f.name}.`);const{error:h}=await H.from("book_pages").insert({book_id:t.id,storage_path:E,file_name:f.name,page_number:l});if(h)throw await H.storage.from(Ge).remove([E]),pe(h,`Unable to register ${f.name}.`);l+=1,p+=1,r?.(p,s.length)}return Be(t.id)}async function Oa(t){const r=(await Be(t)).map((l,p)=>({page:l,nextNumber:p+1})).filter(({page:l,nextNumber:p})=>l.page_number!==p).map(({page:l,nextNumber:p})=>H.from("book_pages").update({page_number:p}).eq("id",l.id)),o=(await Promise.all(r)).find(l=>l.error);if(o?.error)throw pe(o.error,"Unable to renumber the pages.")}async function Xr(t){const{error:a}=await H.storage.from(Ge).remove([t.storage_path]);if(a)throw pe(a,"Unable to delete the image from Storage.");const{error:r}=await H.from("book_pages").delete().eq("id",t.id);if(r)throw pe(r,"The image was removed, but its database row remains.");await Oa(t.book_id)}async function Wr(t,a,r){const s=a+r;if(a<0||s<0||s>=t.length)return t;const o=t[a],l=t[s],{error:p}=await H.rpc("swap_book_pages",{p_first_page_id:o.id,p_second_page_id:l.id});if(p)throw pe(p,"Unable to reorder the pages.");return Be(o.book_id)}async function Gr(t){const r=(await Be(t.id)).map(o=>o.storage_path);if(r.length>0){const{error:o}=await H.storage.from(Ge).remove(r);if(o)throw pe(o,"Unable to delete this book's image folder.")}const{error:s}=await H.from("books").delete().eq("id",t.id);if(s)throw pe(s,"Unable to delete the book record.")}const Pa={a4_long_edge:{width:480,height:679,minWidth:90,maxWidth:600,minHeight:127,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:110,maxWidth:680,minHeight:78,maxHeight:481},square:{width:560,height:560,minWidth:96,maxWidth:620,minHeight:96,maxHeight:620}},Ft=8,Ba=8,Ut=360,La=42,za=1,$a=5;function st(t,a,r){return Math.min(r,Math.max(a,t))}function Vt(t,a,r){const s=Math.max(2,a-Ft*2),o=Math.max(1,r-Ft*2),l=t.width/t.height,p=s/2/l,f=Math.max(1,Math.min(o,p,t.maxHeight)),E=Math.max(1,Math.min(f*l,t.maxWidth));return{width:Math.floor(E),height:Math.floor(E/l)}}const Da=e.forwardRef(function({page:a,isCover:r,onImageReady:s},o){return n.jsx("div",{ref:o,"data-density":r?"hard":"soft",className:"h-full w-full overflow-hidden bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:n.jsx("img",{src:a.public_url,alt:`Page ${a.page_number}: ${a.file_name}`,draggable:!1,decoding:"async",onLoad:s,onError:s,className:"pointer-events-none h-full w-full select-none object-cover object-center"})})});function Fa({book:t,pages:a,initialPage:r=0,bookMotionClassName:s="is-visible",onPageChange:o,onReady:l}){const p=e.useRef(null),f=e.useRef(null),E=e.useRef(t.id),b=e.useRef(0),h=e.useRef(!1),S=e.useRef(!1),O=e.useRef(!1),U=e.useRef(!1),N=e.useRef(null),_=e.useRef({time:0,x:0,y:0,pointerType:""}),Y=e.useRef(null),P=e.useRef(null),B=e.useRef([]),R=e.useRef({width:1,height:1}),se=t.page_format??"a4_long_edge",te=Pa[se],V=Math.min(Math.max(0,Math.floor(r)),Math.max(0,a.length-1)),k=e.useRef(!1),A=e.useRef(!1),K=e.useRef(new Set),z=e.useRef(new Set([V-1,V,V+1].filter(c=>c>=0&&c<a.length)));E.current!==t.id&&(E.current=t.id,b.current=V);const[Ie,ne]=e.useState(V),[Pe,we]=e.useState(0),[w,q]=e.useState(!1),[$,ye]=e.useState(!1),[I,J]=e.useState(!1),[L,je]=e.useState(()=>Vt(te,640,480)),v=xt(1),X=xt(0),W=xt(0),Q=e.useCallback(()=>{A.current||!k.current||![...z.current].every(c=>K.current.has(c))||(A.current=!0,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>l?.(t.id))}))},[t.id,l]),Te=e.useCallback(c=>{z.current.has(c)&&(K.current.add(c),Q())},[Q]),Z=e.useCallback(()=>{B.current.forEach(c=>c.stop()),B.current=[]},[]),ie=e.useCallback(()=>{const c=b.current===0||b.current>=a.length-1;return{width:L.width*(c?1:2),height:L.height}},[L.height,L.width,a.length]),ce=e.useCallback((c,d,T)=>{const D=R.current,j=ie(),me=Math.max(0,(j.width*c-D.width)/2),he=Math.max(0,(j.height*c-D.height)/2);return{x:st(d,-me,me),y:st(T,-he,he)}},[ie]),ae=e.useCallback((c,d,T,D=v.get(),j=X.get(),me=W.get())=>{const he=R.current,oe=st(c,za,$a),u=oe/Math.max(1e-4,D),x=d-he.width/2,y=T-he.height/2,G=ce(oe,x-(x-j)*u,y-(y-me)*u);return v.set(oe),X.set(G.x),W.set(G.y),{scale:oe,...G}},[ce,X,W,v]),le=e.useCallback(()=>{const c=R.current,d=ie(),T=Math.min((c.width-24)/Math.max(1,d.width),(c.height-24)/Math.max(1,d.height));return st(T,1.25,3.6)},[ie]),ke=e.useCallback((c,d,T)=>{Z(),P.current&&(window.clearTimeout(P.current),P.current=null);const D={width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)};R.current=D,h.current=!0,S.current=!1,ye(!1),q(!0),v.set(1),X.set(0),W.set(0);const j=ae(le(),c,d,1,0,0);return T&&(v.set(1),X.set(0),W.set(0),window.requestAnimationFrame(()=>{B.current=[$e(v,j.scale,{type:"spring",stiffness:260,damping:24,mass:.74}),$e(X,j.x,{type:"spring",stiffness:280,damping:27,mass:.72}),$e(W,j.y,{type:"spring",stiffness:280,damping:27,mass:.72})]})),j},[le,X,W,Z,ae,v]),C=e.useCallback(()=>{!h.current||S.current||(Z(),S.current=!0,ye(!0),B.current=[$e(v,1,{type:"spring",stiffness:330,damping:28,mass:.7}),$e(X,0,{type:"spring",stiffness:330,damping:28,mass:.7}),$e(W,0,{type:"spring",stiffness:330,damping:28,mass:.7})],P.current=window.setTimeout(()=>{h.current=!1,S.current=!1,q(!1),ye(!1),v.set(1),X.set(0),W.set(0),P.current=null},430))},[X,W,Z,v]),xe=e.useCallback(c=>{window.requestAnimationFrame(()=>{const d=c??p.current?.pageFlip();if(!d)return;const T=d.getCurrentPageIndex(),D=d.getBoundsRect();b.current=T,ne(T),o?.(T),d.getOrientation()!=="landscape"?we(0):T===0?we(-(D.pageWidth/2)):T>=a.length-1?we(D.pageWidth/2):we(0)})},[o,a.length]);e.useLayoutEffect(()=>{const c=f.current;if(!c)return;const d=()=>{const D=window.getComputedStyle(c),j=Number.parseFloat(D.paddingLeft)+Number.parseFloat(D.paddingRight),me=Number.parseFloat(D.paddingTop)+Number.parseFloat(D.paddingBottom),he=Math.max(1,c.clientWidth-j),oe=Math.max(1,c.clientHeight-me);if(R.current={width:he,height:oe},!h.current){const u=Vt(te,he,oe);je(x=>x.width===u.width&&x.height===u.height?x:u),J(!0)}xe()};d();const T=new ResizeObserver(d);return T.observe(c),window.addEventListener("resize",d),()=>{T.disconnect(),window.removeEventListener("resize",d)}},[w,te,xe]),e.useEffect(()=>{b.current=V,ne(V),we(0),h.current=!1,S.current=!1,q(!1),ye(!1),v.set(1),X.set(0),W.set(0),_.current.time=0,N.current=null,U.current=!1},[t.id,X,W,V,v]),e.useEffect(()=>{if(!w)return;const c=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=c}},[w]);const ue=e.useCallback(()=>{Y.current&&(window.clearTimeout(Y.current),Y.current=null)},[]),de=e.useCallback(c=>{if(S.current||!c.isPrimary||c.pointerType==="mouse"&&c.button!==0)return;const d=window.performance.now(),T=_.current,D=d-T.time>0&&d-T.time<Ut&&T.pointerType===c.pointerType&&Math.hypot(c.clientX-T.x,c.clientY-T.y)<La,j=h.current,me=c.currentTarget.getBoundingClientRect();D?(ue(),_.current.time=0,U.current=!0,Z()):U.current=j,N.current={pointerId:c.pointerId,pointerType:c.pointerType,mode:D?"zoom-slider":j?"pan":"page",startedZoomed:j,startX:c.clientX,startY:c.clientY,startPanX:X.get(),startPanY:W.get(),startScale:v.get(),anchorX:c.clientX,anchorY:c.clientY,stageCenterX:me.left+me.width/2,moved:!1}},[ue,X,W,Z,v]),M=e.useCallback((c,d)=>{ue(),Y.current=window.setTimeout(()=>{if(Y.current=null,h.current||O.current||N.current)return;const T=p.current?.pageFlip();c<d?T?.flipPrev():T?.flipNext()},Ut)},[ue]),Me=e.useCallback(c=>{const d=N.current;if(!d||d.pointerId!==c.pointerId||(Math.hypot(c.clientX-d.startX,c.clientY-d.startY)>Ba&&(d.moved=!0),d.mode==="page"))return;if(c.preventDefault(),d.mode==="pan"){if(!d.moved)return;const j=ce(v.get(),d.startPanX+c.clientX-d.startX,d.startPanY+c.clientY-d.startY);X.set(j.x),W.set(j.y);return}if(!d.moved)return;if(!h.current){const j=ke(d.anchorX,d.anchorY,!1);d.startScale=j.scale,d.startPanX=j.x,d.startPanY=j.y}const D=d.startScale*Math.exp((d.startY-c.clientY)*.006);ae(D,d.anchorX,d.anchorY,d.startScale,d.startPanX,d.startPanY)},[ce,ke,X,W,ae,v]),re=e.useCallback(c=>{const d=N.current;if(!(!d||d.pointerId!==c.pointerId)){if(N.current=null,U.current=!1,c.type==="pointercancel"){_.current.time=0;return}if(d.mode==="zoom-slider"){d.moved?_.current.time=0:d.startedZoomed?C():ke(d.anchorX,d.anchorY,!0);return}if(d.moved){_.current.time=0,ue();return}_.current={time:window.performance.now(),x:c.clientX,y:c.clientY,pointerType:d.pointerType},d.mode==="page"&&M(c.clientX,d.stageCenterX)}},[ue,C,ke,M]);e.useEffect(()=>(window.addEventListener("pointermove",Me,{passive:!1}),window.addEventListener("pointerup",re),window.addEventListener("pointercancel",re),()=>{window.removeEventListener("pointermove",Me),window.removeEventListener("pointerup",re),window.removeEventListener("pointercancel",re)}),[re,Me]),e.useEffect(()=>()=>{ue(),Z(),P.current&&window.clearTimeout(P.current)},[ue,Z]);const Ee=e.useCallback(c=>{if(!h.current||S.current)return;c.preventDefault(),c.stopPropagation(),Z();const d=c.currentTarget.getBoundingClientRect(),T=Math.exp(-c.deltaY*.0015);ae(v.get()*T,c.clientX-d.left,c.clientY-d.top)},[Z,ae,v]);if(e.useEffect(()=>{a.length===0&&l?.(t.id)},[t.id,l,a.length]),a.length===0)return n.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."});const Ae=n.jsx("div",{className:`public-book-stage ${s} ${w?"is-magnified":""} ${$?"is-zoom-closing":""}`,children:n.jsx("div",{ref:f,className:`public-book-viewport relative flex items-center justify-center overflow-hidden ${w?"is-magnified cursor-grab active:cursor-grabbing":"cursor-default"}`,"data-page":Ie,"data-zoomed":w?"true":"false",onPointerDownCapture:de,onMouseDownCapture:c=>{(U.current||h.current)&&(c.preventDefault(),c.stopPropagation())},onTouchStartCapture:c=>{(U.current||h.current)&&(c.preventDefault(),c.stopPropagation())},onWheel:Ee,children:n.jsx(be.div,{className:"flex h-full w-full items-center justify-center",style:{x:X,y:W,scale:v,transformOrigin:"50% 50%",willChange:"transform"},children:n.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${Pe}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform",pointerEvents:w?"none":"auto"},children:I&&n.jsx(Gn,{ref:p,className:"mx-auto",style:{margin:"0 auto"},width:L.width,height:L.height,minWidth:1,maxWidth:te.maxWidth,minHeight:1,maxHeight:te.maxHeight,size:"fixed",startPage:E.current===t.id?b.current:V,drawShadow:!0,flippingTime:850,usePortrait:!1,startZIndex:0,autoSize:!1,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!1,disableFlipByClick:!0,onInit:c=>{b.current=c.data.page,ne(c.data.page),o?.(c.data.page),xe(c.object),k.current=!0,Q()},onFlip:c=>{b.current=c.data,ne(c.data),o?.(c.data),xe(c.object)},onChangeState:c=>{const d=c.data==="user_fold"||c.data==="flipping";O.current=d,d&&ue()},onChangeOrientation:c=>{xe(c.object)},children:a.map((c,d)=>n.jsx(Da,{page:c,isCover:d===0||d===a.length-1,onImageReady:()=>Te(d)},c.id))},`${t.id}-${se}-${L.width}x${L.height}`)})})})});return n.jsxs("div",{className:"flex w-full flex-col items-center",children:[w&&typeof document<"u"?Et.createPortal(Ae,document.body):Ae,n.jsx("div",{className:`public-book-meta public-book-title item-title flex items-center gap-8 text-[18px] ${s}`,children:n.jsx("span",{className:"max-w-[60vw] truncate",children:t.title})}),t.description&&n.jsx("div",{className:`public-book-meta public-book-description item-description flex items-center gap-8 text-[18px] ${s}`,children:n.jsx("span",{className:"max-w-[60vw] truncate",children:t.description})})]})}const xn="publicBookSession",jt="publicBookReturningToIndex",Tt="publicBookReturningToIntro";function Nt(){if(typeof window>"u")return null;try{const t=window.sessionStorage.getItem(xn);if(!t)return null;const a=JSON.parse(t);return typeof a.slug!="string"||a.slug.length===0||typeof a.pageIndex!="number"||!Number.isFinite(a.pageIndex)?null:{slug:a.slug,pageIndex:Math.max(0,Math.floor(a.pageIndex))}}catch{return null}}function Ye(t,a){if(typeof window>"u")return;const r={slug:t,pageIndex:Math.max(0,Math.floor(a))};try{window.sessionStorage.setItem(xn,JSON.stringify(r))}catch{}}const vn=()=>Oe(()=>import("./AdminPortal-Dk5ivv_x.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),Ua=e.lazy(vn),Va=()=>Oe(()=>import("./WatchStudio-CwfyoW7y.js"),__vite__mapDeps([8,1,2,4,5,3,7,6])),ot=()=>Va().then(t=>t.preloadWatchStudioExperience()),ut=1120,wn=180,It=140,De=ut+It,Ya=wn+De,dt=920,Yt=120,Xt=dt+It,_t=1180,Xa=6e3,Wt="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";function Wa({text:t,speed:a=100,revealSpeed:r=55}){const s=e.useRef(null),o=e.useRef(null),l=e.useRef(0),p=e.useRef(!1),f=e.useCallback(()=>{o.current!==null&&(window.clearInterval(o.current),o.current=null)},[]),E=e.useCallback(()=>Wt[Math.floor(Math.random()*Wt.length)],[]),b=e.useCallback((O=0)=>t.split("").map((U,N)=>U===" "?" ":N<O?U:E()).join(""),[E,t]),h=e.useCallback(()=>{f(),p.current=!1,s.current&&(o.current=window.setInterval(()=>{!s.current||p.current||(s.current.textContent=b())},a))},[f,b,a]),S=e.useCallback(()=>{f(),p.current=!0,l.current=0,s.current&&(o.current=window.setInterval(()=>{l.current+=1,s.current&&(s.current.textContent=b(l.current)),l.current>=t.length&&(f(),s.current&&(s.current.textContent=t))},r))},[f,b,r,t]);return e.useEffect(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches?(s.current&&(s.current.textContent=t),f):(h(),f),[f,h,t]),n.jsx("span",{className:"public-login-scramble",onMouseEnter:S,onMouseLeave:h,"aria-label":t,children:n.jsx("span",{ref:s,"aria-hidden":"true",children:t})})}const Ga=`
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
  animation: public-book-background-mix-in ${_t}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${_t}ms cubic-bezier(0.4, 0, 0.2, 1) both;
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


`,Ha={objects:"OBJ",graphics:"GRPH",concepts:"CNCP"};function yt(t){return t instanceof Error?t.message:"Unable to load the books."}function Ne(t){return new Promise(a=>{window.setTimeout(a,t)})}function Gt(){return new Promise(t=>{window.requestAnimationFrame(()=>t())})}function Ka(t){const a=r=>Number.isFinite(r)?Math.min(255,Math.max(0,Math.round(r??255))):255;return`rgb(${a(t?.background_r)} ${a(t?.background_g)} ${a(t?.background_b)})`}function qa(t){return new Promise(a=>{const r=new Image;let s=!1;const o=()=>{s||(s=!0,window.clearTimeout(l),a())},l=window.setTimeout(o,5e3);r.onload=()=>{if(typeof r.decode=="function"){r.decode().catch(()=>{}).finally(o);return}o()},r.onerror=o,r.decoding="async",r.src=t})}async function Ht(t,a=0){const r=Math.min(Math.max(0,Math.floor(a)),Math.max(0,t.length-1)),s=[r-1,r,r+1,r+2].filter(l=>l>=0&&l<t.length),o=[...new Set(s)].map(l=>t[l]);await Promise.all(o.map(l=>qa(l.public_url)))}function Ja({initialSlug:t,onBack:a,onLogin:r,onThreeD:s,onBookChange:o}){const[l,p]=e.useState([]),[f,E]=e.useState(null),[b,h]=e.useState([]),[S,O]=e.useState(!0),[U,N]=e.useState(!1),[_,Y]=e.useState(null),[P,B]=e.useState(!1),[R,se]=e.useState(!1),[te,V]=e.useState("outside"),[k,A]=e.useState(!1),[K,z]=e.useState("outside"),[Ie,ne]=e.useState(!1),[Pe,we]=e.useState(0),[w,q]=e.useState(!1),[$,ye]=e.useState(!1),I=e.useRef(!0),J=e.useRef(!1),L=e.useRef(null),je=e.useRef(null),v=e.useRef(null),X=e.useRef(!1),W=e.useRef(Nt()),Q=e.useRef(null),Te=e.useRef(0),Z=e.useRef("rgb(255 255 255)"),ie=e.useRef(null),ce=e.useRef(null),ae=e.useRef(null),[le,ke]=e.useState([{id:0,color:Z.current}]),C=e.useMemo(()=>l.find(u=>u.id===f)??null,[l,f]);e.useEffect(()=>{const u=Ka(C);if(u===Z.current)return;Z.current=u;const x={id:++Te.current,color:u};ke(y=>[y[y.length-1],x]),ie.current&&window.clearTimeout(ie.current),ie.current=window.setTimeout(()=>{ke(y=>y.slice(-1)),ie.current=null},_t)},[C,C?.background_b,C?.background_g,C?.background_r]);const xe=e.useCallback(u=>{if(ce.current===u)return Promise.resolve();const x=ae.current;return x&&x.finish(),new Promise(y=>{let G=!1;const ve=()=>{G||(G=!0,window.clearTimeout(Ce),ae.current?.finish===ve&&(ae.current=null),y())},Ce=window.setTimeout(ve,Xa);ae.current={bookId:u,finish:ve,timeout:Ce}})},[]),ue=e.useCallback(u=>{ce.current=u;const x=ae.current;x?.bookId===u&&x.finish()},[]);e.useEffect(()=>{L.current=f},[f]);const de=e.useCallback(()=>{Q.current&&(window.clearTimeout(Q.current),Q.current=null)},[]),M=e.useCallback((u=!1)=>{de();const x=u?Yt:wn,y=u?dt:ut;ne(u),z("outside"),Q.current=window.setTimeout(()=>{I.current&&(z("entering"),Q.current=window.setTimeout(()=>{I.current&&(z("visible"),ne(!1),Q.current=null)},y+It))},x)},[de]);e.useEffect(()=>{I.current=!0;const u=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{I.current&&A(!0)})});return()=>{I.current=!1,window.cancelAnimationFrame(u),Q.current&&window.clearTimeout(Q.current),ie.current&&window.clearTimeout(ie.current),ae.current&&(window.clearTimeout(ae.current.timeout),ae.current.finish())}},[]),e.useEffect(()=>{const u=navigator.connection;if(u?.saveData||u?.effectiveType==="slow-2g"||u?.effectiveType==="2g")return;const x=()=>{ot()},y=window;if(y.requestIdleCallback){const ve=y.requestIdleCallback(x,{timeout:2500});return()=>y.cancelIdleCallback?.(ve)}const G=window.setTimeout(x,1400);return()=>window.clearTimeout(G)},[]),e.useEffect(()=>{let u=!0;return(async()=>{O(!0),Y(null);try{const y=await bn();if(!u)return;p(y)}catch(y){u&&Y(yt(y))}finally{u&&O(!1)}})(),()=>{u=!1}},[]);const Me=e.useCallback(async u=>{if(!X.current){X.current=!0,N(!0),Y(null);try{const x=await Be(u.id),y=W.current,G=y?.slug===u.slug?Math.min(y.pageIndex,Math.max(0,x.length-1)):0;if(await Ht(x,G),!I.current)return;ce.current=null;const ve=xe(u.id);if(Et.flushSync(()=>{ne(!1),z("outside"),E(u.id),h(x),we(G)}),Ye(u.slug,G),N(!1),await ve,!I.current)return;M()}catch(x){I.current&&(Y(yt(x)),N(!1))}finally{X.current=!1}}},[M,xe]),re=e.useCallback(async(u,x)=>{if(I.current){if(J.current){je.current={book:u,updateRoute:x},B(!1);return}if(L.current===u.id){B(!1);return}J.current=!0,q(!0),N(!0),B(!1),Y(null);try{de(),ne(!0),z("leaving");const y=Be(u.id).then(async Ce=>(await Ht(Ce),Ce)),[G]=await Promise.all([y,Ne(Xt)]);if(!I.current)return;ce.current=null;const ve=xe(u.id);if(Et.flushSync(()=>{ne(!0),z("outside"),E(u.id),L.current=u.id,h(G),we(0),N(!1)}),W.current={slug:u.slug,pageIndex:0},Ye(u.slug,0),x&&o?.(u.slug),await Gt(),await Gt(),await ve,await Ne(Yt),!I.current)return;z("entering"),await Ne(Xt),I.current&&(z("visible"),ne(!1))}catch(y){I.current&&(Y(yt(y)),N(!1),ne(!1),z("visible"))}finally{if(J.current=!1,I.current){q(!1);const y=je.current;je.current=null,y&&y.book.id!==L.current&&window.setTimeout(()=>{v.current?.(y.book,y.updateRoute)},24)}}}},[de,o,xe]);e.useEffect(()=>{v.current=(u,x)=>{re(u,x)}},[re]),e.useEffect(()=>{if(S||l.length===0)return;const u=t?l.find(x=>x.slug===t):null;if(!f){const x=l.find(G=>G.is_featured),y=u??x??l[0];Me(y);return}u&&u.id!==f&&!J.current&&re(u,!1)},[l,t,Me,S,f,re]);const Ee=e.useCallback(async()=>{!R||J.current||(J.current=!0,q(!0),V("leaving"),await Ne(De),I.current&&(se(!1),V("outside"),M(),await Ne(Ya),J.current=!1,I.current&&q(!1)))},[R,M]);e.useEffect(()=>{const u=x=>{if(x.key==="Escape"){if(R){Ee();return}B(!1)}};return window.addEventListener("keydown",u),()=>{window.removeEventListener("keydown",u)}},[Ee,R]);const Ae=async()=>{if(!J.current){if(B(!1),R){await Ee();return}J.current=!0,q(!0),vn(),!(C&&(de(),z("leaving"),await Ne(De),!I.current))&&(se(!0),V("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{I.current&&V("entering")})}),await Ne(De),J.current=!1,I.current&&(V("visible"),q(!1)))}},c=async()=>{if(R){await Ee();return}J.current||(J.current=!0,q(!0),B(!1),A(!1),de(),z("leaving"),C&&Ye(C.slug,Pe),window.sessionStorage.setItem(jt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.setItem(Tt,"true"),window.sessionStorage.removeItem("returnFromExample"),await Ne(De),I.current&&a())},d=async()=>{if(J.current||R)return;J.current=!0,q(!0),ye(!0),B(!1),A(!1),de(),z("leaving"),C&&Ye(C.slug,Pe);const u=ot().catch(()=>null);await Promise.all([Ne(De),u]),I.current&&s()},T=u=>{re(u,!0)},D=e.useCallback(u=>{we(u),C&&(W.current={slug:C.slug,pageIndex:u},Ye(C.slug,u))},[C]),me=`${K==="entering"?"is-entering":K==="visible"?"is-visible":K==="leaving"?"is-leaving":"is-outside"}${Ie?" is-fast":""}`,he=te==="entering"?"is-entering":te==="visible"?"is-visible":te==="leaving"?"is-leaving":"is-outside",oe=k?"is-visible":w||$?"is-leaving":"is-outside";return n.jsxs("div",{className:"public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:le[0]?.color??"rgb(255 255 255)"},children:[n.jsx("style",{children:Ga}),n.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:le.map((u,x)=>n.jsx("div",{className:`public-book-background-layer ${x===le.length-1?"is-current":"is-previous"}`,style:{backgroundColor:u.color}},u.id))}),P&&!R&&n.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-transparent",onClick:()=>B(!1)}),n.jsxs("div",{className:"public-book-nav fixed z-[170] flex items-center",children:[n.jsx("div",{className:`public-nav-item ${oe}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:n.jsx("button",{type:"button",onClick:()=>void c(),disabled:w,className:"public-book-nav-icon flex items-center justify-center rounded-full border border-black/35 bg-transparent transition-transform duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40","aria-label":R?"Back to book":"Back",title:R?"Back to book":"Back",children:n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-globe-europe-africa",viewBox:"0 0 16 16","aria-hidden":"true",children:n.jsx("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.81.81 0 0 1 1.034-.275.81.81 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34q.118.04.243.054c.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.33.33 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501"})})})}),n.jsx("div",{className:`public-nav-item ${oe}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:n.jsx("button",{type:"button",onClick:()=>B(u=>!u),disabled:R,className:`public-book-nav-icon flex items-center justify-center rounded-full border bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${P?"border-black text-black":"border-black/35 text-black"}`,"aria-label":"Choose a book","aria-expanded":P,"aria-controls":"public-book-balloon",title:"Choose a book",children:n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-book",viewBox:"0 0 16 16",children:n.jsx("path",{d:"M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"})})})}),n.jsx("div",{className:`public-nav-item ${oe}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:n.jsx("button",{type:"button",onClick:()=>void Ae(),disabled:w,className:`public-book-nav-text flex items-center justify-center rounded-full border bg-transparent text-[13px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${R?"border-black text-black":"border-black/35 text-black"}`,"aria-expanded":R,"aria-label":"Login",children:n.jsx(Wa,{text:"LOGIN"})})}),n.jsx("div",{className:`public-nav-item ${oe}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:n.jsx("button",{type:"button",onClick:()=>void d(),onPointerEnter:()=>void ot(),onFocus:()=>void ot(),disabled:w||R,className:"public-book-nav-text flex items-center justify-center rounded-full border border-black/35 bg-transparent text-[13px] text-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40",children:"3D"})})]}),n.jsxs("aside",{id:"public-book-balloon",className:`public-book-balloon fixed left-4 top-[76px] z-[150] flex max-h-[72vh] w-[min(88vw,390px)] origin-top-left flex-col bg-white/95 p-5 shadow-[0_10px_65px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] sm:left-[74px] sm:top-[82px] ${P&&!R?"pointer-events-auto scale-100 opacity-100 blur-0":"pointer-events-none scale-0 opacity-0 blur-[10px]"}`,"aria-hidden":!P||R,children:[n.jsx("div",{className:"absolute -top-2 left-[46px] h-4 w-4 rotate-45 border-l border-t border-black/25 bg-white"}),n.jsxs("div",{className:"relative mb-4 flex items-start justify-between gap-5",children:[n.jsx("div",{children:n.jsx("h1",{className:"mt-1 text-[22px] font-normal",children:"ARCHIVE"})}),n.jsx("button",{type:"button",onClick:()=>B(!1),className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/20 transition-transform hover:scale-110 active:scale-95","aria-label":"Close book list",children:n.jsx("span",{"aria-hidden":"true",children:"×"})})]}),n.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto border-t border-black/15",children:S?n.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"..."}):l.length===0?n.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):l.map(u=>{const x=u.id===f;return n.jsxs("button",{type:"button",onClick:()=>T(u),className:`grid w-full grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-all duration-300 ${x?"translate-x-1 text-black":"text-black/60 hover:translate-x-1 hover:text-black"}`,children:[n.jsx("span",{className:"text-[12px] tracking-wide",children:Ha[u.category]}),n.jsxs("span",{className:"min-w-0",children:[n.jsx("span",{className:"block truncate text-[16px]",children:u.title}),u.description&&n.jsx("span",{className:"mt-1 block truncate text-[12px] text-black/45",children:u.description})]}),n.jsx("span",{className:"flex min-w-[18px] justify-end text-[13px]",children:u.is_featured?"*":x?">":""})]},u.id)})})]}),n.jsx("div",{className:"public-book-label-wrap pointer-events-none fixed inset-x-0 top-5 z-[100] flex justify-center px-[230px] sm:top-7",children:C&&n.jsx("p",{className:`public-book-label max-w-full truncate text-center text-[13px] tracking-[0.12em] text-black/55 ${oe}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:C.is_featured?"FEATURED - ":""})}),n.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden px-2 sm:px-5",children:S||U&&!C?n.jsx("div",{className:`public-route-message ${k?"is-visible":"is-outside"}`,children:"..."}):_?n.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${k?"is-visible":"is-outside"}`,children:_}):l.length===0?n.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${k?"is-visible":"is-outside"}`,children:"No books are public yet."}):C?n.jsx("div",{className:"h-full w-full",children:n.jsx("div",{className:`public-book-surface flex h-full w-full items-center justify-center ${R?"is-login-muted":""}`,children:n.jsx(Fa,{book:C,pages:b,initialPage:Pe,bookMotionClassName:me,onPageChange:D,onReady:ue},C.id)})}):null}),R&&n.jsx("div",{className:`public-login-stage fixed inset-0 z-[130] overflow-hidden bg-white ${he}`,"aria-hidden":te==="outside"||te==="leaving",children:n.jsx(e.Suspense,{fallback:null,children:n.jsx(Ua,{embedded:!0,surfaceReady:te==="entering"||te==="visible",onBack:()=>void Ee()})})})]})}const yn=e.createContext(void 0),Qa=({children:t})=>{const[a,r]=e.useState(!1),s=()=>{r(!a)};return e.useEffect(()=>{a?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[a]),n.jsx(yn.Provider,{value:{isDark:a,toggleTheme:s},children:t})},Hr=()=>{const t=e.useContext(yn);if(t===void 0)throw new Error("useTheme must be used within a ThemeProvider");return t},Kt="/assets/WolfyLight-Bs10J6iU.gif",Za=100,er=500,tr=14e3,kt=400,nr=({onComplete:t})=>{const[a,r]=e.useState(!1),[s,o]=e.useState(!1),[l,p]=e.useState(!1),[f,E]=e.useState(!1),[b,h]=e.useState({}),[S,O]=e.useState(0),[U,N]=e.useState(!0),_=e.useRef({}),Y=e.useRef(null),P=e.useRef(!1),B=e.useRef(!1),{progress:R}=ea();e.useEffect(()=>{let k;const A=()=>{O(K=>{const z=R-K,Ie=Math.max(z*.1,z>0?.5:-.5),ne=Math.abs(z)<.5?R:K+Ie;return ne>=100&&setTimeout(()=>N(!1),500),Math.min(100,Math.max(0,ne))}),k=requestAnimationFrame(A)};return k=requestAnimationFrame(A),()=>cancelAnimationFrame(k)},[R]),e.useEffect(()=>{const k=window.matchMedia("(prefers-reduced-motion: reduce)");B.current=k.matches;const A=()=>B.current=k.matches;return k.addEventListener?.("change",A),()=>k.removeEventListener?.("change",A)},[]),e.useEffect(()=>{const k=new Image;k.src=Kt;const A=()=>h({w:k.naturalWidth||400,h:k.naturalHeight||400});k.decode?.().then(()=>{A(),r(!0)}).catch(()=>{k.onload=()=>{A(),r(!0)}})},[]);const se=e.useCallback(()=>{if(P.current)return;if(B.current){P.current=!0,t();return}E(!0);const k=Y.current;let A=!1;const K=()=>{A||(A=!0,P.current=!0,t())};if(k){const z=()=>{k.removeEventListener("animationend",z),_.current.fallback&&clearTimeout(_.current.fallback),K()};k.addEventListener("animationend",z,{once:!0}),_.current.fallback=window.setTimeout(K,kt+120)}else _.current.fallback=window.setTimeout(K,kt+50)},[t]);e.useEffect(()=>{if(!a)return;const k=_.current;return B.current?(o(!0),p(!0),k.auto=window.setTimeout(()=>se(),800)):(k.entry=window.setTimeout(()=>o(!0),Za),k.allowExit=window.setTimeout(()=>p(!0),er),k.auto=window.setTimeout(()=>se(),tr)),()=>{Object.values(k).forEach(A=>A&&clearTimeout(A))}},[a,se]);const te=()=>{(l||B.current)&&se()},V=s?f?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return n.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${P.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:te,children:[n.jsxs("div",{className:`relative ${V}`,ref:Y,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[n.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[n.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),n.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),n.jsx("img",{src:Kt,alt:"Loading wolf",width:b.w||800,height:b.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),U&&n.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${S>=100?"opacity-0":"opacity-100"}`,children:[Math.round(S),"%"]}),n.jsx("style",{children:`
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
        .animate-elastic-shrink { transform-origin: 50% 50%; animation: elastic-shrink ${kt}ms ease-in forwards; }
      `})]})},ge={};typeof window<"u"&&(window.addEventListener("keydown",t=>{ge[t.key.toLowerCase()]=!0}),window.addEventListener("keyup",t=>{ge[t.key.toLowerCase()]=!1}));const kn={current:null},Xe={center:new fe(0,0,-300),radius:60},Rt=15,ar=38,rr=95,qt=[500,200,-300],ir=new fe(500,150,-1e3).normalize(),sr="#fff4d6",or="#0b1e3a",cr="#0a2a6a";function lr(t,a,r){let s=a-t;for(;s<-Math.PI;)s+=Math.PI*2;for(;s>Math.PI;)s-=Math.PI*2;return t+s*r}function ur(){const t=e.useRef(null),a=aa(la,"/waternormals.jpeg");a.wrapS=a.wrapT=ua;const r=e.useMemo(()=>new da(1e4,1e4),[]),s=e.useMemo(()=>new ra(r,{textureWidth:512,textureHeight:512,waterNormals:a,sunDirection:ir.clone(),sunColor:new $t("#fff2cc"),waterColor:new $t(cr),distortionScale:10.7,fog:!1}),[r,a]);return s.material.uniforms.waterColor.value.convertSRGBToLinear(),e.useEffect(()=>()=>{r.dispose(),s.material.dispose()},[r,s]),Ct((o,l)=>{t.current&&(t.current.material.uniforms.time.value+=l)}),n.jsx("primitive",{object:s,ref:t,"rotation-x":-Math.PI/2})}function dr(){const{scene:t}=ft("/island.gltf"),a=e.useMemo(()=>{const r=t.clone(!0);return r.traverse(s=>{if(!(s instanceof St))return;const l=(Array.isArray(s.material)?s.material:[s.material]).map(p=>{const f=p.clone();return f instanceof dn&&(f.roughness=Math.max(f.roughness,.82),f.metalness=Math.min(f.metalness,.02),f.envMapIntensity=.08),f.needsUpdate=!0,f});s.material=Array.isArray(s.material)?l:l[0],s.castShadow=!0,s.receiveShadow=!0}),r},[t]);return e.useEffect(()=>()=>{a.traverse(r=>{if(!(r instanceof St))return;(Array.isArray(r.material)?r.material:[r.material]).forEach(o=>o.dispose())})},[a]),n.jsx("primitive",{object:a,scale:100,position:[0,-5,-300]})}function mr(){const t=e.useRef(null),{camera:a}=un(),{scene:r}=ft("/wolfy.glb"),s=e.useMemo(()=>ia.clone(r),[r]),o=e.useRef(new fe),l=e.useRef(new fe),p=e.useRef(0),f=e.useRef(!0),E=e.useRef(new fe(0,0,1));return e.useEffect(()=>{s.traverse(b=>{b instanceof St&&b.material instanceof dn&&(b.material=b.material.clone(),b.material.roughness=.42,b.material.metalness=.05,b.material.envMapIntensity=.35,b.castShadow=!0,b.receiveShadow=!0)})},[s]),e.useEffect(()=>{kn.current=t.current;const b=S=>{const{x:O,z:U}=S.detail;o.current.set(O,0,U)},h=()=>{f.current&&(f.current=!1,p.current=ar)};return window.addEventListener("explore-joystick",b),window.addEventListener("explore-jump",h),()=>{window.removeEventListener("explore-joystick",b),window.removeEventListener("explore-jump",h)}},[]),Ct((b,h)=>{if(!t.current)return;const S=new fe(o.current.x+(ge.arrowright||ge.d?1:0)-(ge.arrowleft||ge.a?1:0),0,o.current.z+(ge.arrowup||ge.w?1:0)-(ge.arrowdown||ge.s?1:0));S.lengthSq()<.01&&S.set(0,0,0);const O=new fe;a.getWorldDirection(O),O.y=0,O.normalize();const U=new fe().crossVectors(O,new fe(0,1,0)).normalize(),N=new fe().addScaledVector(O,S.z).addScaledVector(U,S.x);N.lengthSq()>1e-4&&N.normalize(),l.current.lerp(N.multiplyScalar(100),h*6);const _=t.current.position.clone().addScaledVector(l.current,h);if(p.current-=rr*Math.min(h,.05),_.y+=p.current*Math.min(h,.05),_.y<=Rt&&(_.y=Rt,p.current=0,f.current=!0),_.distanceTo(Xe.center)<Xe.radius+2){const P=_.clone().sub(Xe.center).normalize();_.copy(Xe.center.clone().add(P.multiplyScalar(Xe.radius+2))),l.current.multiplyScalar(.2)}if(t.current.position.copy(_),S.lengthSq()>.01){const P=N.clone();S.z<-.2&&P.copy(O),E.current.lerp(P,.15).normalize();const B=Math.atan2(E.current.x,E.current.z);t.current.rotation.y=lr(t.current.rotation.y,B,.15)}t.current.userData.joyX=o.current.x}),n.jsx("primitive",{ref:t,object:s,scale:10,position:[0,15,0],rotation:[0,Math.PI,0]})}function fr(){const{camera:t}=un(),a=e.useRef(0),r=e.useRef(0),s=e.useRef(!1);return e.useEffect(()=>{const o=l=>{s.current=l.detail.enabled};return window.addEventListener("explore-mode",o),()=>window.removeEventListener("explore-mode",o)},[]),Ct((o,l)=>{const p=kn.current;if(!p)return;r.current+=l*(s.current?1:-1),r.current=ma.clamp(r.current,0,1);const f=r.current*r.current*(3-2*r.current),b=(ge.arrowright||ge.d?1:0)-(ge.arrowleft||ge.a?1:0)+(p.userData?.joyX??0);Math.abs(b)>.05&&(a.current-=b*l*2.5);const h=new fe(0,22,70);h.applyAxisAngle(new fe(0,1,0),a.current);const S=p.position.clone();S.y=Rt;const O=S.add(h),N=new fe(0,20,100).add(new fe(Math.sin(r.current*Math.PI)*20,0,0)).lerp(O,f);t.position.lerp(N,.12);const _=new fe(0,5,0),Y=p.position.clone();Y.y+=6,t.lookAt(_.lerp(Y,f))}),null}function pr(){const t=e.useRef(null),a=e.useRef(!1);return e.useEffect(()=>{const r=new Audio("/Ocean.mp3");r.loop=!0,r.preload="auto",r.volume=0,t.current=r;const s=(E,b=2e3)=>{if(!t.current)return;const h=t.current,S=h.volume,O=performance.now(),U=N=>{const _=Math.min((N-O)/b,1);h.volume=S+(E-S)*_,_<1?requestAnimationFrame(U):E===0&&(h.pause(),h.currentTime=0)};requestAnimationFrame(U)},o=async()=>{a.current=!0;try{r.paused&&await r.play(),s(.14,2400)}catch{}},l=()=>{a.current=!1,s(0,1800)},p=E=>{E.detail.active?o():l()},f=()=>{a.current&&o()};return window.addEventListener("skyocean-audio",p),window.addEventListener("pointerdown",f,{passive:!0}),window.addEventListener("keydown",f),document.getElementById("global-sky-ocean-bg")?.getAttribute("data-audio-active")==="1"&&o(),()=>{window.removeEventListener("skyocean-audio",p),window.removeEventListener("pointerdown",f),window.removeEventListener("keydown",f),r.pause(),r.src=""}},[]),null}function hr(){return n.jsxs(n.Fragment,{children:[n.jsx(pr,{}),n.jsxs(ta,{shadows:!0,camera:{position:[0,20,100],fov:55},gl:{antialias:!0,toneMapping:ca,toneMappingExposure:.8,outputColorSpace:oa},children:[n.jsx("color",{attach:"background",args:[or]}),n.jsx("directionalLight",{position:qt,intensity:1,color:sr,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-camera-near":10,"shadow-camera-far":1800,"shadow-camera-left":-500,"shadow-camera-right":500,"shadow-camera-top":500,"shadow-camera-bottom":-500}),n.jsx("ambientLight",{intensity:.35,color:"#ffffff"}),n.jsxs(e.Suspense,{fallback:null,children:[n.jsx(ur,{}),n.jsx(dr,{}),n.jsx(mr,{})]}),n.jsx(fr,{}),n.jsx(na,{distance:1e3,sunPosition:qt,turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})]})]})}ft.preload("/wolfy.glb");ft.preload("/island.gltf");function He(t,a){return t instanceof Error?t:typeof t=="object"&&t&&"message"in t?new Error(String(t.message)):new Error(a)}function gr(t){return t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function br(){const{data:t,error:a}=await H.from("archive_sections").select("*").eq("is_visible",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(a)throw He(a,"Unable to load the archive sections.");return t??[]}async function Kr(){const{data:t,error:a}=await H.from("archive_sections").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(a)throw He(a,"Unable to load the archive section manager.");return t??[]}async function qr(t,a,r){const s=t.trim(),o=gr(s),l=a.trim().toUpperCase().slice(0,8);if(!s||!o)throw new Error("Enter a section name.");if(!l)throw new Error("Enter a short section code.");const{data:p,error:f}=await H.from("archive_sections").insert({name:s,slug:o,code:l,sort_order:r,is_visible:!0}).select("*").single();if(f)throw He(f,"Unable to create the archive section.");return p}async function Jr(t,a){const r={...a,...a.name!==void 0?{name:a.name.trim()}:{},...a.code!==void 0?{code:a.code.trim().toUpperCase().slice(0,8)}:{}},{data:s,error:o}=await H.from("archive_sections").update(r).eq("id",t).select("*").single();if(o)throw He(o,"Unable to save the archive section.");return s}async function Qr(t){const{error:a}=await H.from("archive_sections").delete().eq("id",t.id);if(a)throw He(a,"Unable to delete this section. Move its books to another section first.")}const Jt=[{id:"default-objects",slug:"objects",name:"Objects",code:"OBJ",sort_order:0,is_visible:!0,created_at:"",updated_at:""},{id:"default-graphics",slug:"graphics",name:"Graphics",code:"GRPH",sort_order:1,is_visible:!0,created_at:"",updated_at:""},{id:"default-concepts",slug:"concepts",name:"Concepts",code:"CNCP",sort_order:2,is_visible:!0,created_at:"",updated_at:""}],xr=`
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
`,ee={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode"},vr="Gabriel Dell'Aiuto. b. 1996. TEXT 2",wr=()=>{const t=mt(),r=e.useRef(sessionStorage.getItem(Tt)==="true").current,o=e.useRef(sessionStorage.getItem(jt)==="true"||r||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,p=e.useRef(o&&sessionStorage.getItem(ee.returnFlag)==="true").current,[f]=e.useState(()=>Nt()),[E,b]=e.useState(o),[h,S]=e.useState([]),[O,U]=e.useState(!0),[N,_]=e.useState(null),[Y,P]=e.useState(Jt),[B,R]=e.useState(!1),se=e.useCallback(async()=>{U(!0);try{const i=await bn();S(i),_(null)}catch(i){console.error("Unable to load published books",i),_(i instanceof Error?i.message:"Unable to load the published books.")}finally{U(!1)}},[]),te=e.useCallback(async()=>{try{const i=await br();P(i),R(!0)}catch{P(Jt),R(!1)}},[]);e.useEffect(()=>{se(),te();const i=()=>{se(),te()},m=()=>{document.visibilityState==="visible"&&se()};return window.addEventListener("focus",i),document.addEventListener("visibilitychange",m),()=>{window.removeEventListener("focus",i),document.removeEventListener("visibilitychange",m)}},[te,se]);const V=e.useMemo(()=>h.find(i=>i.is_featured)??h[0]??null,[h]),k=e.useMemo(()=>{if(B)return Y;const i=[...Y];return h.forEach(m=>{i.some(g=>g.slug===m.category)||i.push({id:`fallback-${m.category}`,slug:m.category,name:m.category.replace(/-/g," "),code:m.category.slice(0,4).toUpperCase(),sort_order:i.length,is_visible:!0,created_at:"",updated_at:""})}),i},[Y,B,h]),A=e.useMemo(()=>{const i=new Map(k.map(g=>[g.slug,g])),m=g=>({id:g.id,category:i.get(g.category)?.code??g.category.slice(0,4).toUpperCase(),name:g.title,link:`/book/${encodeURIComponent(g.slug)}`,isFeatured:g.is_featured});return k.reduce((g,F)=>(g[F.slug]=h.filter(Se=>Se.category===F.slug).map(m),g),{})},[k,h]),K=e.useMemo(()=>Object.values(A).flat(),[A]);e.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const i="__GLOBAL_SKY_OCEAN_BG_ROOT__",m=window,g=document.getElementById("global-sky-ocean-bg");if(m[i]){g&&(g.style.display="block",g.style.zIndex="0");return}const F=document.createElement("div");F.id="global-sky-ocean-bg",Object.assign(F.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(F);const Se=ln.createRoot(F);Se.render(n.jsx(e.Suspense,{fallback:null,children:n.jsx(hr,{})})),m[i]=Se},[]);const z=r?"intro":sessionStorage.getItem(ee.stage)||"intro",Ie=sessionStorage.getItem(ee.activeButton)||null,ne=sessionStorage.getItem(ee.searchOpen)==="true",Pe=sessionStorage.getItem(ee.searchQuery)||"",we=sessionStorage.getItem(ee.exploreMode)==="true",[w,q]=e.useState(z),[$,ye]=e.useState(Ie),[I,J]=e.useState(ne),[L,je]=e.useState(Pe),[v,X]=e.useState(we),W=z==="list"||!!Ie||ne,[Q,Te]=e.useState(W),[Z,ie]=e.useState(!1),[ce,ae]=e.useState(!1),[le,ke]=e.useState(!1),[C,xe]=e.useState(!1);e.useEffect(()=>{if(!C||ce)return;if(o){b(!0);return}b(!1);let i=0;const m=window.requestAnimationFrame(()=>{i=window.requestAnimationFrame(()=>{b(!0)})});return()=>{window.cancelAnimationFrame(m),window.cancelAnimationFrame(i)}},[C,o,ce]);const[ue,de]=e.useState(!1),[M,Me]=e.useState(!1),[re,Ee]=e.useState(!1),[Ae,c]=e.useState(!1),[d,T]=e.useState(!p),D=e.useRef(null),[j,me]=e.useState(()=>{if(o)return!1;try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),he=e.useRef(null),oe=e.useRef(null);e.useEffect(()=>()=>{D.current&&window.clearTimeout(D.current)},[]),e.useEffect(()=>{if(!le||w!=="intro"||re||M||!j)return;const i=window.setTimeout(()=>{c(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(i)}},[re,le,M,j,w]),e.useEffect(()=>{if(w!=="main"&&w!=="list"||M||!j||d)return;const i=window.setTimeout(()=>{T(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(i)}},[d,M,j,w]);const[u,x]=e.useState(!1),y=e.useRef(null),G=e.useRef(null),[ve,Ce]=e.useState(!1);e.useEffect(()=>{if(!o)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem(jt),sessionStorage.removeItem(Tt),sessionStorage.removeItem("revealDone"),me(!1),de(!1),document.documentElement.style.background="",document.body.style.background="";const i=document.getElementById("global-sky-ocean-bg");i&&(i.style.display="block",i.style.zIndex="0")},[o]),e.useEffect(()=>{try{sessionStorage.setItem(ee.exploreMode,String(v))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:v}}));const i=document.getElementById("global-sky-ocean-bg");i&&i.setAttribute("data-explore",v?"1":"0")},[v]),e.useEffect(()=>{const i=C&&!ce&&!M;document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active",i?"1":"0");const g=window.setTimeout(()=>{window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:i}}))},0);return()=>window.clearTimeout(g)},[C,M,ce]),e.useEffect(()=>()=>{document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active","0"),window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:!1}}))},[]),e.useEffect(()=>{sessionStorage.setItem(ee.stage,w),sessionStorage.setItem(ee.activeButton,$??""),sessionStorage.setItem(ee.searchOpen,String(I)),sessionStorage.setItem(ee.searchQuery,L)},[w,$,I,L]),e.useEffect(()=>{!sessionStorage.getItem(ee.splash)&&w==="intro"&&!o?ae(!0):ke(!0),xe(!0)},[o,w]);const En=e.useCallback(()=>{sessionStorage.setItem(ee.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const i=document.getElementById("global-sky-ocean-bg");i&&(i.style.display="none"),ae(!1),t(V?`/book/${encodeURIComponent(V.slug)}`:"/books")},[V,t]);e.useEffect(()=>{(le||o)&&!j&&!ue&&!M&&de(!0)},[le,o,M,j,ue]);const Sn=e.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}he.current?(he.current.classList.add("fade-out"),setTimeout(()=>{de(!1),me(!0)},240)):(de(!1),me(!0))},[]),Ke=e.useCallback(i=>{M||(oe.current=i,de(!1),Me(!0))},[M]),jn=e.useCallback(()=>{const i=oe.current;if(!i)return;document.documentElement.style.background="white",document.body.style.background="white";const m=document.getElementById("global-sky-ocean-bg");m&&(m.style.display="none"),t(i)},[t]),_e=e.useCallback(()=>{ye(null),J(!1),je(""),q("main")},[]),qe=e.useCallback(()=>{Te(!1)},[]),Tn=e.useCallback(()=>{ie(!1),Q&&_e(),Te(i=>!i),window.dispatchEvent(new Event("mousemove"))},[Q,_e]),_n=e.useCallback(()=>{if(Z){ie(!1);return}_e(),Te(!1),ie(!0),window.dispatchEvent(new Event("mousemove"))},[Z,_e]),Je=e.useMemo(()=>K.filter(i=>i.name.toLowerCase().includes(L.toLowerCase())),[K,L]),Rn=e.useCallback(()=>{if($&&$!=="search"&&!L){const i=A[$]||[],m=K.filter(g=>!i.some(F=>F.id===g.id));return[...i,...m]}if($==="search"&&L){const i=Je,m=K.filter(g=>!i.some(F=>F.id===g.id));return[...i,...m]}return K},[$,L,A,K,Je])(),Cn=e.useCallback(i=>{$===i?_e():(ye(i),q("list"),J(!1),je(""))},[$,_e]),Mt=e.useCallback(i=>{const m=G.current?G.current.scrollTop:0;sessionStorage.setItem(ee.listScroll,String(m));const g={activeButton:$,searchOpen:I,searchQuery:L,stage:w,introVisible:le,archiveOpen:Q};try{sessionStorage.setItem(ee.snapshot,JSON.stringify(g))}catch{}sessionStorage.setItem(ee.returnFlag,"true"),Ke(i)},[$,Q,Ke,le,I,L,w]),At=e.useCallback(()=>{_e(),qe(),ie(!1),Ee(!1),c(!1),q("intro")},[qe,_e]),Nn=e.useCallback(()=>{re||M||(Ee(!0),T(!1),qe(),ie(!1),D.current=window.setTimeout(()=>{q("main"),Ee(!1)},1160))},[qe,re,M]),In=e.useCallback(()=>{!f||M||Ke(`/book/${encodeURIComponent(f.slug)}`)},[Ke,f,M]),Mn=e.useCallback(()=>{$==="search"?_e():(J(!0),q("list"),ye("search"))},[$,_e]),Qe=e.useCallback(()=>{x(!1),y.current&&clearTimeout(y.current),y.current=window.setTimeout(()=>{x(!0)},5e3)},[]);e.useEffect(()=>{const i=["mousemove","mousedown","touchstart","touchmove","keydown"];return i.forEach(m=>{window.addEventListener(m,Qe)}),Qe(),()=>{i.forEach(m=>{window.removeEventListener(m,Qe)}),y.current&&clearTimeout(y.current)}},[Qe]),e.useEffect(()=>{if(!C||!(sessionStorage.getItem(ee.returnFlag)==="true"))return;let m=null;try{const g=sessionStorage.getItem(ee.snapshot);m=g?JSON.parse(g):null}catch{}if(m){ye(m.activeButton??null),J(!!m.searchOpen),je(m.searchQuery??""),m.archiveOpen||m.stage==="list"?Te(!0):Te(!1),m.stage&&q(m.stage),ke(!!m.introVisible),m.stage==="list"&&Ce(!0),sessionStorage.removeItem(ee.returnFlag);return}ke(!0),q("main"),Te(!0),window.setTimeout(()=>{q("list"),Ce(!0),sessionStorage.removeItem(ee.returnFlag)},700)},[C]),e.useEffect(()=>{if(w!=="list"||!ve)return;const i=Number(sessionStorage.getItem(ee.listScroll)||"0"),m=window.setTimeout(()=>{G.current&&(G.current.scrollTop=Number.isNaN(i)?0:i),Ce(!1)},0);return()=>{window.clearTimeout(m)}},[w,ve]);const An=e.useRef(null),Fe=e.useRef(null),Ze=e.useRef(!1),pt=e.useRef(!1),et=e.useRef(!1),ht=e.useRef({x:0,y:0}),Ue=e.useRef({x:0,y:0}),tt=60,nt=e.useCallback((i,m)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:i,z:m}}))},[]),at=e.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]);e.useEffect(()=>{if(!v)return;const i=g=>{g.code==="Space"&&(g.preventDefault(),g.stopPropagation(),g.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},m=g=>{g.code==="Space"&&(i(g),g.repeat||at())};return window.addEventListener("keydown",m,!0),window.addEventListener("keyup",i,!0),()=>{window.removeEventListener("keydown",m,!0),window.removeEventListener("keyup",i,!0)}},[v,at]);const On=e.useCallback(i=>{if(!v)return;Ze.current=!0,i.currentTarget.setPointerCapture(i.pointerId);const m=i.currentTarget.getBoundingClientRect();Ue.current={x:m.left+m.width/2,y:m.top+m.height/2},ht.current={x:i.clientX,y:i.clientY},et.current=!1,pt.current=Math.hypot(i.clientX-Ue.current.x,i.clientY-Ue.current.y)<=34},[v]),Pn=e.useCallback(i=>{if(!Ze.current||!Fe.current)return;const m=i.clientX-Ue.current.x,g=i.clientY-Ue.current.y;Math.hypot(i.clientX-ht.current.x,i.clientY-ht.current.y)>8&&(et.current=!0);const F=Math.hypot(m,g),Se=F>tt?tt:F,Bt=m/(F||1)*Se,Lt=g/(F||1)*Se;Fe.current.style.transform=`translate(${Bt}px, ${Lt}px)`;const Ln=Bt/tt,zn=-Lt/tt;nt(Ln,zn)},[nt]),Ot=e.useCallback(i=>{Ze.current&&(Ze.current=!1,i.currentTarget.hasPointerCapture(i.pointerId)&&i.currentTarget.releasePointerCapture(i.pointerId),Fe.current&&(Fe.current.style.transform="translate(0px, 0px)"),nt(0,0),i.type!=="pointercancel"&&pt.current&&!et.current&&at(),pt.current=!1,et.current=!1)},[nt,at]),Bn=e.useCallback(i=>!!($&&$!=="search"&&A[$]?.some(m=>m.id===i.id)||$==="search"&&L&&Je.some(m=>m.id===i.id)),[$,A,Je,L]),gt=le&&w==="intro"?M||re?"is-leaving":j?Ae?"is-visible":"is-entering":"is-outside":"is-outside",Pt=(w==="main"||w==="list")&&M?"is-leaving":j?d?"is-visible":"is-entering":"is-outside",rt=w==="main"||w==="list"?Pt:"is-outside",bt=w==="list"?"-15vh":Q||Z?"-42px":"0px",ze=k.length+3,it=i=>({animate:{y:w==="main"||w==="list"?bt:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:i*.025}}),Ve=(i,m=ze)=>{const g=i*.055,F=Math.max(0,m-1-i)*.035,Se={scale:0,opacity:0,filter:"blur(8px)",y:bt};return{initial:Se,animate:M?{...Se,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:F},opacity:{duration:.16,delay:F},filter:{duration:.2,delay:F},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:F}}}:{scale:1,opacity:1,filter:"blur(0px)",y:bt},exit:{...Se,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:F},opacity:{duration:.16,delay:F},filter:{duration:.2,delay:F},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:F}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:g},opacity:{duration:.2,delay:g},filter:{duration:.25,delay:g},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:i*.025}}}};return C?n.jsxs(n.Fragment,{children:[n.jsx("style",{children:xr}),ce?n.jsx(nr,{onComplete:En}):n.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${o?"is-returning-from-book":E?"is-entered":"is-entering"}`,children:[n.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:u?0:1},children:[n.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${le&&w==="intro"?"":"pointer-events-none"} ${v?"opacity-0 pointer-events-none":"opacity-100"}`,children:[n.jsxs("p",{className:`index-intro-copy intro-elastic-item ${gt} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:At,children:["TEXT 1",n.jsx("br",{})]}),n.jsxs("div",{className:"flex items-center justify-center gap-2",children:[n.jsx("button",{onClick:In,disabled:!Ae||re,className:`index-intro-control intro-elastic-item item-start ${gt} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:n.jsx("span",{className:"animate-bounce",children:"BACK"})}),f&&n.jsx("button",{type:"button",onClick:Nn,disabled:!Ae||M,className:`index-intro-control intro-elastic-item item-back ${gt} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:"START"})]})]}),n.jsxs("div",{className:`absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl ${w==="intro"?"pointer-events-none":""}`,style:{top:"calc(50% - 24px)"},children:[n.jsxs("div",{className:"index-main-control-row flex min-h-12 items-center justify-center gap-5 text-[16px] font-normal md:gap-10 md:text-[16px]",children:[n.jsx(be.div,{...it(0),children:n.jsx("div",{className:`main-control-item item-back ${rt}`,children:n.jsx("button",{onClick:At,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${v?"pointer-events-none opacity-0":"opacity-100"}`,children:"BACK"})})}),n.jsx(be.div,{...it(1),children:n.jsx("div",{className:`main-control-item item-archive ${rt}`,children:n.jsx("button",{type:"button",onClick:Tn,"aria-expanded":Q,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${Q?"animate-bounce":""} ${v?"pointer-events-none opacity-0":"opacity-100"}`,children:"ARCHIVE"})})}),n.jsx(be.div,{...it(2),children:n.jsx("div",{className:`main-control-item item-about ${rt}`,children:n.jsx("button",{type:"button",onClick:_n,"aria-expanded":Z,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${Z?"animate-bounce":""} ${v?"pointer-events-none opacity-0":"opacity-100"}`,children:"BIO"})})}),n.jsx(be.div,{...it(3),children:n.jsx("div",{className:`main-control-item item-play ${rt}`,children:n.jsxs("button",{onClick:i=>{i.currentTarget.blur(),X(m=>!m)},title:v?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${v?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[n.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${v?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[n.jsx("circle",{cx:"12",cy:"12",r:"9"}),n.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),n.jsx("span",{className:`whitespace-nowrap font-normal transition-all ${v?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"PLAY"})]})})})]}),n.jsx(zt,{initial:!1,mode:"wait",children:Q?n.jsxs(be.div,{initial:!1,className:`index-archive-panel mx-auto mt-10 pb-0 text-center font-normal leading-[2] transition-opacity duration-500 ${v?"pointer-events-none opacity-0":"opacity-100"}`,children:[n.jsx(be.div,{...Ve(0,ze),className:"index-archive-featured archive-elastic-item item-featured min-h-[32px] text-[16px] md:text-[16px]",children:V?n.jsxs("button",{type:"button",onClick:()=>Mt(`/book/${encodeURIComponent(V.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[n.jsx("span",{className:"shrink-0 text-black",children:"COVER"})," ",n.jsx("br",{})," ",n.jsx("br",{}),n.jsx("span",{className:"truncate",children:V.title})]}):O?n.jsx("span",{className:"text-black/50",children:"..."}):N?n.jsx("button",{type:"button",onClick:()=>void se(),className:"text-black/60 bounce",children:"RETRY BOOK LIST"}):n.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),n.jsxs("div",{className:"index-archive-category-row flex flex-wrap items-center justify-center gap-2 uppercase md:gap-3",children:[n.jsx(be.div,{...Ve(1,ze),className:"archive-elastic-item item-search",children:n.jsx("button",{onClick:Mn,className:`index-archive-category-button z-10 flex items-center text-[16px] font-normal uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${$==="search"?"animate-bounce":"bg-alpha"}`,children:"search"})}),k.map((i,m)=>n.jsx(be.div,{...Ve(m+2,ze),className:`archive-elastic-item item-${i.slug}`,children:n.jsx("button",{onClick:()=>{Cn(i.slug)},className:`index-archive-category-button text-[16px] font-normal uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${$===i.slug?"animate-bounce":"bg-alpha"}`,children:i.name})},i.id))]}),n.jsx(be.div,{...Ve(ze-1,ze),className:"index-archive-search-field archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:n.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${I?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:n.jsx("input",{type:"text",placeholder:"Search...",value:L,onChange:i=>{je(i.target.value)},className:"index-archive-search-input w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls"):Z?n.jsx(be.div,{initial:!1,className:`mx-auto mt-10 max-w-xl pb-0 text-center leading-[1.55] ${v?"pointer-events-none opacity-0":"opacity-100"}`,children:n.jsx(be.div,{...Ve(0,2),className:"index-about-panel archive-elastic-item px-2 text-[16px] font-normal md:text-[16px]",children:n.jsx("p",{children:vr})})},"about-panel"):null})]}),n.jsx("div",{className:`index-list-panel ${w==="list"?"is-list-open":"is-list-closed"} absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] font-normal md:text-[16px] ease-in-out ${w==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${v?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:n.jsxs("div",{className:`index-elastic-item item-list ${Pt}`,children:[n.jsxs("div",{className:"index-list-header grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] font-normal md:text-[16px]",children:[n.jsx("div",{className:"py-[0.5px]",children:"TAG"}),n.jsx("div",{className:"py-[0.5px]",children:"TITLE"})]}),!O&&!N&&K.length===0?n.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):n.jsx("div",{ref:G,className:"index-list-scroll overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:n.jsx(zt,{initial:!1,mode:"popLayout",children:Rn.map((i,m)=>{const g=Bn(i);return n.jsxs(be.div,{initial:{scale:0,opacity:0,filter:"blur(7px)"},animate:{scale:1,opacity:1,filter:"blur(0px)"},exit:{scale:0,opacity:0,filter:"blur(7px)"},whileHover:{scale:.97},whileTap:{scale:.95},transition:{scale:{type:"spring",stiffness:430,damping:23,mass:.68,delay:m*.022},opacity:{duration:.18,delay:m*.022},filter:{duration:.22,delay:m*.022}},className:`index-list-row grid origin-center grid-cols-2 text-[16px] md:text-[16px] backdrop-blur-[1px] cursor-pointer ${g?"text-black":"text-gray-700"}`,onClick:()=>{Mt(i.link)},children:[n.jsx("div",{className:"py-[0.5px] tracking-normal",children:i.category}),n.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[i.name,i.isFeatured?" *":""]})]},`${$??"all"}:${i.id}`)})})})]})})]}),v&&n.jsx("div",{ref:An,onPointerDown:On,onPointerMove:Pn,onPointerUp:Ot,onPointerCancel:Ot,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:n.jsx("div",{ref:Fe,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:n.jsx("span",{"aria-hidden":"true",children:"↑"})})}),(!j&&(ue||o)||M)&&n.jsx("div",{ref:he,className:"reveal-overlay","aria-hidden":"true",children:n.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[n.jsx("defs",{children:n.jsxs("mask",{id:"hole-mask",children:[n.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),n.jsx("circle",{className:`mask-circle ${M?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:M?jn:Sn})]})}),n.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},yr=e.lazy(()=>Oe(()=>import("./AdminPortal-Dk5ivv_x.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),kr=e.lazy(()=>Oe(()=>import("./Archive-Bw8eJq_U.js"),__vite__mapDeps([9,10,1,2,6,4,5,7]))),Er=e.lazy(()=>Oe(()=>import("./object01-C8I6djSc.js"),__vite__mapDeps([11,10,1,2]))),Sr=e.lazy(()=>Oe(()=>import("./Message-D1hJolhb.js"),__vite__mapDeps([12,1,2,7,4,5,6]))),jr=e.lazy(()=>Oe(()=>import("./NotFound-6WqWxgYD.js"),__vite__mapDeps([13,1,2]))),Tr=e.lazy(()=>Oe(()=>import("./WatchStudio-CwfyoW7y.js"),__vite__mapDeps([8,1,2,4,5,3,7,6]))),_r=new Hn,Qt=()=>{const t=mt();return n.jsx(yr,{onBack:()=>t("/")})},Zt=()=>{const t=mt(),{slug:a}=Zn();return n.jsx(Ja,{initialSlug:a??null,onBack:()=>t("/"),onLogin:()=>t("/login"),onThreeD:()=>t("/3d"),onBookChange:r=>{t(`/book/${encodeURIComponent(r)}`,{replace:!0})}})},Rr=()=>{const t=mt();return n.jsx(Tr,{onBack:()=>{const a=Nt();t(a?`/book/${encodeURIComponent(a.slug)}`:"/books")}})},Cr=()=>{const{pathname:t}=Jn(),a=t==="/";return n.jsxs("div",{className:`fixed inset-0 overflow-hidden ${a?"bg-transparent":"bg-white dark:bg-black"}`,children:[n.jsx(ka,{}),n.jsx(Ea,{}),n.jsx(e.Suspense,{fallback:n.jsx("div",{className:"fixed inset-0 bg-white"}),children:n.jsxs(Qn,{children:[n.jsx(Re,{path:"/",element:n.jsx(wr,{})}),n.jsx(Re,{path:"/archive",element:n.jsx(kr,{})}),n.jsx(Re,{path:"/message",element:n.jsx(Sr,{})}),n.jsx(Re,{path:"/object01",element:n.jsx(Er,{})}),n.jsx(Re,{path:"/login",element:n.jsx(Qt,{})}),n.jsx(Re,{path:"/admin",element:n.jsx(Qt,{})}),n.jsx(Re,{path:"/3d",element:n.jsx(Rr,{})}),n.jsx(Re,{path:"/books",element:n.jsx(Zt,{})}),n.jsx(Re,{path:"/book/:slug",element:n.jsx(Zt,{})}),n.jsx(Re,{path:"*",element:n.jsx(jr,{})})]})})]})},Nr=()=>n.jsx(Kn,{client:_r,children:n.jsx(Qa,{children:n.jsx(Sa,{children:n.jsx(qn,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:n.jsx(Cr,{})})})})}),en=sessionStorage.getItem("redirect");en&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",en));ln.createRoot(document.getElementById("root")).render(n.jsx(Nr,{}));export{Jt as D,zr as M,Dr as a,Be as b,qr as c,Qr as d,Fr as e,Ur as f,Vr as g,Yr as h,Xr as i,Gr as j,H as k,Kr as l,Wr as m,Hr as n,xa as o,$r as p,Aa as s,Jr as u};
