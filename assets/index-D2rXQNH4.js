const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-C-X2jsgS.js","assets/vendor-BsrOnjkE.js","assets/three-DX7GoU75.js","assets/AdminThreeDModelManager-BaSTGA4X.js","assets/react-three-CFel4_v1.js","assets/postprocessing-Y4pHl3pz.js","assets/motion-PEBqIvyR.js","assets/supabase-antlwfka.js","assets/WatchStudio-Cq8grT_r.js","assets/Archive-CIp_Av55.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-CiIFJmqO.js","assets/Message-GYpf6CsC.js","assets/NotFound-DEt-LyGM.js"])))=>i.map(i=>d[i]);
var ya=Object.defineProperty;var ka=(e,t,r)=>t in e?ya(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var nt=(e,t,r)=>ka(e,typeof t!="symbol"?t+"":t,r);import{r as n,ay as Sa,az as Ea,j as a,aA as Ar,aB as jr,aC as Pr,aD as Nr,aE as _a,aF as Lr,aG as zr,aH as Ca,aI as Ra,aJ as Ta,aK as Ia,aL as Or,aM as Ma,aN as Aa,aO as jn,aP as bn,ar as Dr,aQ as Br,aR as ja,aS as Pa,aT as Na,aU as La,aV as ot,aW as za}from"./vendor-BsrOnjkE.js";import{_ as ft,u as Oa,a as xn,C as Da,b as wt,c as ct,S as Ba,d as Wn,W as $a,e as Ua}from"./react-three-CFel4_v1.js";import{c as Fa}from"./supabase-antlwfka.js";import{u as En,a as _t,m as ze,A as _n}from"./motion-PEBqIvyR.js";import{V as oe,u as $t,D as Wa,R as Ya,g as Va,L as Pn,C as Xa,b2 as Yn,Y as V,k as Ha,ba as qa,aG as Vn,y as Ga,aH as $r,Z as It,c as Xn,aA as Hn,a8 as qn,P as Za,Q as Dt,af as Ka,M as vt,ai as Ja,bb as Qa,m as ei,ab as ti,bc as ni,a7 as ri,aI as ai,aT as ii,bd as oi}from"./three-DX7GoU75.js";import"./postprocessing-Y4pHl3pz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const si=1,ci=1e6;let Cn=0;function li(){return Cn=(Cn+1)%Number.MAX_SAFE_INTEGER,Cn.toString()}const Rn=new Map,ur=e=>{if(Rn.has(e))return;const t=setTimeout(()=>{Rn.delete(e),Bt({type:"REMOVE_TOAST",toastId:e})},ci);Rn.set(e,t)},ui=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,si)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case"DISMISS_TOAST":{const{toastId:r}=t;return r?ur(r):e.toasts.forEach(i=>{ur(i.id)}),{...e,toasts:e.toasts.map(i=>i.id===r||r===void 0?{...i,open:!1}:i)}}case"REMOVE_TOAST":return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)}}},on=[];let sn={toasts:[]};function Bt(e){sn=ui(sn,e),on.forEach(t=>{t(sn)})}function di({...e}){const t=li(),r=o=>Bt({type:"UPDATE_TOAST",toast:{...o,id:t}}),i=()=>Bt({type:"DISMISS_TOAST",toastId:t});return Bt({type:"ADD_TOAST",toast:{...e,id:t,open:!0,onOpenChange:o=>{o||i()}}}),{id:t,dismiss:i,update:r}}function pi(){const[e,t]=n.useState(sn);return n.useEffect(()=>(on.push(t),()=>{const r=on.indexOf(t);r>-1&&on.splice(r,1)}),[e]),{...e,toast:di,dismiss:r=>Bt({type:"DISMISS_TOAST",toastId:r})}}function yt(...e){return Sa(Ea(e))}const mi=Ra,Ur=n.forwardRef(({className:e,...t},r)=>a.jsx(Ar,{ref:r,className:yt("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...t}));Ur.displayName=Ar.displayName;const fi=Ca("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),Fr=n.forwardRef(({className:e,variant:t,...r},i)=>a.jsx(jr,{ref:i,className:yt(fi({variant:t}),e),...r}));Fr.displayName=jr.displayName;const hi=n.forwardRef(({className:e,...t},r)=>a.jsx(Pr,{ref:r,className:yt("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",e),...t}));hi.displayName=Pr.displayName;const Wr=n.forwardRef(({className:e,...t},r)=>a.jsx(Nr,{ref:r,className:yt("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...t,children:a.jsx(_a,{className:"h-4 w-4"})}));Wr.displayName=Nr.displayName;const Yr=n.forwardRef(({className:e,...t},r)=>a.jsx(Lr,{ref:r,className:yt("text-sm font-semibold",e),...t}));Yr.displayName=Lr.displayName;const Vr=n.forwardRef(({className:e,...t},r)=>a.jsx(zr,{ref:r,className:yt("text-sm opacity-90",e),...t}));Vr.displayName=zr.displayName;function gi(){const{toasts:e}=pi();return a.jsxs(mi,{children:[e.map(function({id:t,title:r,description:i,action:o,...s}){return a.jsxs(Fr,{...s,children:[a.jsxs("div",{className:"grid gap-1",children:[r&&a.jsx(Yr,{children:r}),i&&a.jsx(Vr,{children:i})]}),o,a.jsx(Wr,{})]},t)}),a.jsx(Ur,{})]})}const bi=({...e})=>{const{theme:t="system"}=Ta();return a.jsx(Ia,{theme:t,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})},xi=Ma,vi=n.forwardRef(({className:e,sideOffset:t=4,...r},i)=>a.jsx(Or,{ref:i,sideOffset:t,className:yt("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...r}));vi.displayName=Or.displayName;const wi="https://pmpspnvfgkzprgntihtx.supabase.co",yi="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",At="book-pages",ys="models-3d",Gn="characters-3d",$=Fa(wi,yi,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),ki=50*1024*1024;function We(e,t){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(t)}function Si(e){const{data:t}=$.storage.from(At).getPublicUrl(e);return t.publicUrl}function dr(e){const{data:t}=$.storage.from(At).getPublicUrl(e,{transform:{width:720,height:720,resize:"contain",quality:72}});return t.publicUrl}function Ei(e){return{...e,public_url:Si(e.storage_path)}}function _i(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function Ci(e){if(e.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const t of e){const r=t.name.toLowerCase(),i=r.endsWith(".jpg")||r.endsWith(".jpeg"),o=t.type==="image/jpeg"||t.type==="";if(!i||!o)throw new Error(`${t.name} is not a JPG/JPEG image.`);if(t.size>ki)throw new Error(`${t.name} is larger than 50 MB.`)}}function Ri(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function Ti(){const{data:e,error:t}=await $.rpc("is_admin");if(t)throw We(t,"Unable to verify administrator access.");return e===!0}async function Xr(){const{data:e,error:t}=await $.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(t)throw We(t,"Unable to load books.");return e??[]}async function ks(){const{data:e,error:t}=await $.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(t)throw We(t,"Unable to load the admin book list.");return e??[]}async function mt(e){const{data:t,error:r}=await $.from("book_pages").select("*").eq("book_id",e).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(r)throw We(r,"Unable to load the book pages.");return(t??[]).map(Ei)}async function Ss(e){const t=Ri(e.slug);if(!t)throw new Error("The book needs a valid slug.");const{data:r,error:i}=await $.from("books").insert({title:e.title.trim(),slug:t,storage_folder:t,category:e.category,description:e.description?.trim()??"",is_published:e.is_published??!1,is_featured:!1,sort_order:e.sort_order??0}).select("*").single();if(i)throw We(i,"Unable to create the book.");return r}async function Es(e,t){const{data:r,error:i}=await $.from("books").update(t).eq("id",e).select("*").single();if(i)throw We(i,"Unable to save the book.");return r}async function _s(e){const{error:t}=await $.rpc("set_featured_book",{p_book_id:e});if(t)throw We(t,"Unable to set the featured book.")}async function Cs(e,t,r){const i=[...t].sort((l,d)=>l.name.localeCompare(d.name,void 0,{numeric:!0,sensitivity:"base"}));Ci(i);let s=(await mt(e.id)).reduce((l,d)=>Math.max(l,d.page_number),0)+1,u=0;for(const l of i){const d=`${e.storage_folder}/${String(s).padStart(4,"0")}-${_i()}.jpg`,{error:m}=await $.storage.from(At).upload(d,l,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(m)throw We(m,`Unable to upload ${l.name}.`);const{error:h}=await $.from("book_pages").insert({book_id:e.id,storage_path:d,file_name:l.name,page_number:s});if(h)throw await $.storage.from(At).remove([d]),We(h,`Unable to register ${l.name}.`);s+=1,u+=1,r?.(u,i.length)}return mt(e.id)}async function Ii(e){const r=(await mt(e)).map((s,u)=>({page:s,nextNumber:u+1})).filter(({page:s,nextNumber:u})=>s.page_number!==u).map(({page:s,nextNumber:u})=>$.from("book_pages").update({page_number:u}).eq("id",s.id)),o=(await Promise.all(r)).find(s=>s.error);if(o?.error)throw We(o.error,"Unable to renumber the pages.")}async function Rs(e){const{error:t}=await $.storage.from(At).remove([e.storage_path]);if(t)throw We(t,"Unable to delete the image from Storage.");const{error:r}=await $.from("book_pages").delete().eq("id",e.id);if(r)throw We(r,"The image was removed, but its database row remains.");await Ii(e.book_id)}async function Ts(e,t,r){const i=t+r;if(t<0||i<0||i>=e.length)return e;const o=e[t],s=e[i],{error:u}=await $.rpc("swap_book_pages",{p_first_page_id:o.id,p_second_page_id:s.id});if(u)throw We(u,"Unable to reorder the pages.");return mt(o.book_id)}async function Is(e){const r=(await mt(e.id)).map(o=>o.storage_path);if(r.length>0){const{error:o}=await $.storage.from(At).remove(r);if(o)throw We(o,"Unable to delete this book's image folder.")}const{error:i}=await $.from("books").delete().eq("id",e.id);if(i)throw We(i,"Unable to delete the book record.")}function Zn(e,t){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(t)}function Mi(e){const t=typeof e=="object"&&e&&"message"in e?String(e.message):String(e);return/book_comments|schema cache|does not exist|could not find/i.test(t)}async function pr(e){const{data:t,error:r}=await $.from("book_comments").select("*").eq("book_id",e).eq("is_visible",!0).order("created_at",{ascending:!0});if(r){if(Mi(r))return console.info("Book comments are disabled until the book_comments SQL migration is run."),[];throw Zn(r,"Unable to load book comments.")}return t??[]}async function Ai(e){const t=e.body.trim();if(!t)throw new Error("Write a comment first.");if(t.length>600)throw new Error("Comments can contain at most 600 characters.");const{data:r,error:i}=await $.auth.getUser();if(i||!r.user)throw new Error("Administrator login required.");const{data:o,error:s}=await $.from("book_comments").insert({book_id:e.bookId,book_page_id:e.bookPageId,body:t,anchor_x:Math.min(1,Math.max(0,e.anchorX)),anchor_y:Math.min(1,Math.max(0,e.anchorY)),created_by:r.user.id,is_visible:!0}).select("*").single();if(s)throw Zn(s,"Unable to create the comment. Run the book comments SQL migration first.");return o}async function ji(e){const{error:t}=await $.from("book_comments").delete().eq("id",e);if(t)throw Zn(t,"Unable to delete the comment.")}const cn="studierzimmer_analytics_consent_v1",Nn="studierzimmer_analytics_session_v1",Pi=4320*60*60*1e3,Ln="studierzimmer:analytics-consent";let ln=null,un=!1,zn=!1;function pn(e){if(typeof window>"u")return null;try{return window[e]}catch{return null}}function Hr(e,t){try{return e?.getItem(t)??null}catch{return null}}function qr(e,t,r){try{e?.setItem(t,r)}catch{}}function On(e,t){try{e?.removeItem(t)}catch{}}function Ni(e=window.location.pathname){const t=e.split("?")[0]?.split("#")[0]??"/";return t.startsWith("/")?t.slice(0,160):"/"}function Li(){if(!document.referrer)return null;try{return new URL(document.referrer).host.slice(0,160)||null}catch{return null}}function zi(){const e=window.innerWidth;return Number.isFinite(e)?e<600?"mobile":e<1024?"tablet":"desktop":"unknown"}function Oi(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=Array.from(e,r=>r.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Di(){const e=pn("sessionStorage"),t=Hr(e,Nn);if(t)return t;if(ln)return ln;const r=Oi();return ln=r,qr(e,Nn,r),r}function Bi(e){typeof window>"u"||window.dispatchEvent(new CustomEvent(Ln,{detail:e}))}function Dn(){const e=pn("localStorage"),t=Hr(e,cn);if(!t)return null;try{const r=JSON.parse(t),i=r.choice==="necessary"||r.choice==="analytics",o=Date.parse(String(r.expiresAt??""));return r.version!==1||!i||!Number.isFinite(o)||o<=Date.now()?(On(e,cn),null):r.choice}catch{return On(e,cn),null}}function $i(e){const t=new Date,r={version:1,choice:e,updatedAt:t.toISOString(),expiresAt:new Date(t.getTime()+Pi).toISOString()};qr(pn("localStorage"),cn,JSON.stringify(r)),e==="necessary"?(On(pn("sessionStorage"),Nn),ln=null,un=!1):zn=!1,Bi(e)}function Ui(e){const t=typeof e=="object"&&e&&"message"in e?String(e.message):String(e);return/track_analytics_event|schema cache|does not exist|could not find/i.test(t)}async function Ut({eventName:e,path:t,targetType:r,targetId:i,valueInt:o}){if(typeof window>"u"||Dn()!=="analytics"||zn)return!1;const s=Di(),u=i?.trim().slice(0,120)||null,l=Number.isFinite(o)?Math.min(864e5,Math.max(0,Math.round(o??0))):null;!un&&e!=="session_start"?(un=!0,await Ut({eventName:"session_start",path:t})):e==="session_start"&&(un=!0);const{data:d,error:m}=await $.rpc("track_analytics_event",{p_session_id:s,p_event_name:e,p_path:Ni(t),p_target_type:r??null,p_target_id:u,p_referrer_host:e==="session_start"?Li():null,p_device_type:zi(),p_value_int:l});return m?(Ui(m)&&(zn=!0,console.info("Analytics collection is disabled until the analytics SQL migration is run.")),!1):d===!0}const Fi={a4_long_edge:{width:480,height:679,minWidth:90,maxWidth:600,minHeight:127,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:110,maxWidth:680,minHeight:78,maxHeight:481},square:{width:560,height:560,minWidth:96,maxWidth:620,minHeight:96,maxHeight:620}},mr=8,Wi=8,fr=360,Yi=42,Vi=1,Xi=5,Hi=["☺︎","♥","★","🌊"];function Tt(e,t,r){return Math.min(r,Math.max(t,e))}function hr(e,t,r){const i=Math.max(2,t-mr*2),o=Math.max(1,r-mr*2),s=e.width/e.height,u=i/2/s,l=Math.max(1,Math.min(o,u,e.maxHeight)),d=Math.max(1,Math.min(l*s,e.maxWidth));return{width:Math.floor(d),height:Math.floor(d/s)}}function gr(e){return"translate(-50%, -100%)"}const qi=n.forwardRef(function({page:t,isCover:r,comments:i,commentsHidden:o,commentMode:s,canManageComments:u,activeDraft:l,draftBody:d,commentBusy:m,commentError:h,onImageReady:v,onPlaceComment:k,onDraftBodyChange:x,onSubmitDraft:y,onCancelDraft:R,onDeleteComment:S},U){const j=w=>{if(!s||!u||w.target instanceof Element&&w.target.closest("[data-book-comment-ui]"))return;w.preventDefault(),w.stopPropagation();const M=w.currentTarget.getBoundingClientRect();k(t.id,Tt((w.clientX-M.left)/Math.max(1,M.width),0,1),Tt((w.clientY-M.top)/Math.max(1,M.height),0,1))};return a.jsx("div",{ref:U,"data-density":r?"hard":"soft",className:"h-full w-full overflow-visible bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:a.jsxs("div",{"data-book-page-face":"true",onPointerDown:j,className:`relative h-full w-full overflow-visible ${s?"cursor-crosshair":""}`,style:{backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"translateZ(0.01px)",WebkitTransform:"translateZ(0.01px)"},children:[a.jsx("img",{src:t.public_url,alt:`Page ${t.page_number}: ${t.file_name}`,draggable:!1,decoding:"sync",onLoad:v,onError:v,className:"pointer-events-none h-full w-full select-none object-cover object-center",style:{backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"translateZ(0)",WebkitTransform:"translateZ(0)"}}),a.jsxs("div",{className:`book-comment-layer absolute inset-0 z-20 ${o?"is-hidden":""}`,"aria-hidden":o,children:[i.map(w=>a.jsxs("div",{"data-book-comment-ui":"true",className:"book-comment-balloon absolute",style:{left:`${w.anchor_x*100}%`,top:`${w.anchor_y*100}%`,transform:gr(w.anchor_x)},children:[u&&a.jsx("button",{type:"button",className:"book-comment-delete","aria-label":"Delete comment",onPointerDown:M=>{M.preventDefault(),M.stopPropagation()},onClick:M=>{M.preventDefault(),M.stopPropagation(),S(w.id)},children:"×"}),a.jsx("p",{children:w.body})]},w.id)),l?.pageId===t.id&&a.jsxs("form",{"data-book-comment-ui":"true",className:"book-comment-balloon book-comment-editor absolute",style:{left:`${l.anchorX*100}%`,top:`${l.anchorY*100}%`,transform:gr(l.anchorX)},onPointerDown:w=>w.stopPropagation(),onClick:w=>w.stopPropagation(),onSubmit:w=>{w.preventDefault(),y()},children:[a.jsx("button",{type:"button",className:"book-comment-delete","aria-label":"Cancel comment",onClick:R,children:"×"}),a.jsx("textarea",{autoFocus:!0,value:d,maxLength:600,placeholder:"WRITE A COMMENT…",onChange:w=>x(w.target.value),onKeyDown:w=>{w.key==="Escape"&&R(),(w.metaKey||w.ctrlKey)&&w.key==="Enter"&&(w.preventDefault(),y())}}),a.jsxs("div",{className:"book-comment-editor-actions",children:[a.jsx("div",{className:"book-comment-emojis","aria-label":"Add emoji",children:Hi.map(w=>a.jsx("button",{type:"button",onClick:()=>x(`${d}${w}`),children:w},w))}),a.jsx("button",{type:"submit",disabled:m||!d.trim(),children:m?"…":"SEND"})]}),h&&a.jsx("p",{className:"book-comment-editor-error",children:h})]})]})]})})});function Gi({book:e,pages:t,comments:r=[],commentMode:i=!1,canManageComments:o=!1,initialPage:s=0,bookMotionClassName:u="is-visible",onPageChange:l,onReady:d,onCreateComment:m,onDeleteComment:h}){const v=n.useRef(null),k=n.useRef(null),x=n.useRef(e.id),y=n.useRef(0),R=n.useRef(!1),S=n.useRef(!1),U=n.useRef(!1),j=n.useRef(!1),w=n.useRef(null),M=n.useRef({time:0,x:0,y:0,pointerType:""}),X=n.useRef(null),T=n.useRef(null),A=n.useRef([]),P=n.useRef({width:1,height:1}),Z=n.useRef(new Map),q=e.page_format??"a4_long_edge",L=Fi[q],fe=Math.min(Math.max(0,Math.floor(s)),Math.max(0,t.length-1)),Ce=n.useRef(!1),se=n.useRef(!1),F=n.useRef(new Set),he=n.useRef(new Set([fe-1,fe,fe+1].filter(p=>p>=0&&p<t.length)));x.current!==e.id&&(x.current=e.id,y.current=fe);const[D,be]=n.useState(fe),[Me,ae]=n.useState(0),[te,ue]=n.useState(!1),[O,de]=n.useState(!1),[De,ye]=n.useState(!1),[xe,z]=n.useState(!1),[E,W]=n.useState(null),[pe,ke]=n.useState(""),[Se,K]=n.useState(!1),[Ae,Y]=n.useState(null),[me,Ze]=n.useState(!1),[Re,Ke]=n.useState(!1),[Ee,ce]=n.useState(()=>hr(L,640,480)),J=En(1),ne=En(0),I=En(0),Pe=n.useMemo(()=>{const p=new Map;return r.forEach(g=>{const B=p.get(g.book_page_id)??[];B.push(g),p.set(g.book_page_id,B)}),p},[r]),lt=r.length>0,ve=n.useCallback(()=>{se.current||!Ce.current||![...he.current].every(p=>F.current.has(p))||(se.current=!0,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>d?.(e.id))}))},[e.id,d]),Je=n.useCallback(p=>{he.current.has(p)&&(F.current.add(p),ve())},[ve]),Ne=n.useCallback(()=>{const p=y.current,g=p===0||p>=t.length-1?[p]:[p,Math.min(p+1,t.length-1)];return Promise.all(g.map(B=>{const re=t[B];if(!re)return Promise.resolve();const ie=Z.current.get(re.public_url);if(ie)return ie;const $e=new Promise(Ue=>{const Le=new Image;let Ve=!1;const Xe=()=>{Ve||(Ve=!0,Ue())};Le.onload=()=>{typeof Le.decode=="function"?Le.decode().catch(()=>{}).finally(Xe):Xe()},Le.onerror=Xe,Le.decoding="async",Le.src=re.public_url,window.setTimeout(Xe,5e3)});return Z.current.set(re.public_url,$e),$e})).then(()=>{})},[t]),Q=n.useCallback((p,g,B)=>{!i||!o||(Y(null),ke(""),W({pageId:p,anchorX:g,anchorY:B}))},[o,i]),Ie=n.useCallback(()=>{Se||(W(null),ke(""),Y(null))},[Se]),ut=n.useCallback(async()=>{if(!(!E||!pe.trim()||!m||Se)){K(!0),Y(null);try{await m({bookPageId:E.pageId,body:pe,anchorX:E.anchorX,anchorY:E.anchorY}),W(null),ke("")}catch(p){Y(p instanceof Error?p.message:"Unable to save the comment.")}finally{K(!1)}}},[Se,E,pe,m]),ge=n.useCallback(async p=>{if(!(!h||Se)){K(!0),Y(null);try{await h(p)}catch(g){Y(g instanceof Error?g.message:"Unable to delete the comment.")}finally{K(!1)}}},[Se,h]),Be=n.useCallback(()=>{A.current.forEach(p=>p.stop()),A.current=[]},[]),Ye=n.useCallback(()=>{const p=y.current===0||y.current>=t.length-1;return{width:Ee.width*(p?1:2),height:Ee.height}},[Ee.height,Ee.width,t.length]),at=n.useCallback((p,g,B)=>{const re=P.current,ie=Ye(),$e=Math.max(0,(ie.width*p-re.width)/2),Ue=Math.max(0,(ie.height*p-re.height)/2);return{x:Tt(g,-$e,$e),y:Tt(B,-Ue,Ue)}},[Ye]),Qe=n.useCallback((p,g,B,re=J.get(),ie=ne.get(),$e=I.get())=>{const Ue=P.current,Le=Tt(p,Vi,Xi),Ve=Le/Math.max(1e-4,re),Xe=g-Ue.width/2,He=B-Ue.height/2,dt=at(Le,Xe-(Xe-ie)*Ve,He-(He-$e)*Ve);return J.set(Le),ne.set(dt.x),I.set(dt.y),{scale:Le,...dt}},[at,ne,I,J]),ht=n.useCallback(()=>{const p=P.current,g=Ye(),B=Math.min((p.width-24)/Math.max(1,g.width),(p.height-24)/Math.max(1,g.height));return Tt(B,1.25,3.6)},[Ye]),it=n.useCallback((p,g,B)=>{Be(),T.current&&(window.clearTimeout(T.current),T.current=null);const re={width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)};P.current=re,R.current=!0,S.current=!1,de(!1),z(!0),W(null),ue(!0),J.set(1),ne.set(0),I.set(0);const ie=Qe(ht(),p,g,1,0,0);return B&&(J.set(1),ne.set(0),I.set(0),window.requestAnimationFrame(()=>{A.current=[_t(J,ie.scale,{type:"spring",stiffness:260,damping:24,mass:.74}),_t(ne,ie.x,{type:"spring",stiffness:280,damping:27,mass:.72}),_t(I,ie.y,{type:"spring",stiffness:280,damping:27,mass:.72})]})),ie},[ht,ne,I,Be,Qe,J]),kt=n.useCallback(()=>{!R.current||S.current||(Be(),S.current=!0,de(!0),A.current=[_t(J,1,{type:"spring",stiffness:330,damping:28,mass:.7}),_t(ne,0,{type:"spring",stiffness:330,damping:28,mass:.7}),_t(I,0,{type:"spring",stiffness:330,damping:28,mass:.7})],T.current=window.setTimeout(()=>{R.current=!1,S.current=!1,ue(!1),de(!1),J.set(1),ne.set(0),I.set(0),T.current=null,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>z(!1))})},430))},[ne,I,Be,J]),et=n.useCallback(p=>{window.requestAnimationFrame(()=>{const g=p??v.current?.pageFlip();if(!g)return;const B=g.getCurrentPageIndex(),re=g.getBoundsRect();y.current=B,be(B),l?.(B),g.getOrientation()!=="landscape"?ae(0):B===0?ae(-(re.pageWidth/2)):B>=t.length-1?ae(re.pageWidth/2):ae(0)})},[l,t.length]);n.useLayoutEffect(()=>{const p=k.current;if(!p)return;const g=()=>{const re=window.getComputedStyle(p),ie=Number.parseFloat(re.paddingLeft)+Number.parseFloat(re.paddingRight),$e=Number.parseFloat(re.paddingTop)+Number.parseFloat(re.paddingBottom),Ue=Math.max(1,p.clientWidth-ie),Le=Math.max(1,p.clientHeight-$e);if(P.current={width:Ue,height:Le},!R.current){const Ve=hr(L,Ue,Le);ce(Xe=>Xe.width===Ve.width&&Xe.height===Ve.height?Xe:Ve),Ke(!0)}et()};g();const B=new ResizeObserver(g);return B.observe(p),window.addEventListener("resize",g),()=>{B.disconnect(),window.removeEventListener("resize",g)}},[te,L,et]),n.useEffect(()=>{y.current=fe,be(fe),ae(0),R.current=!1,S.current=!1,ue(!1),de(!1),ye(!1),z(!1),W(null),ke(""),Y(null),J.set(1),ne.set(0),I.set(0),M.current.time=0,w.current=null,j.current=!1},[e.id,ne,I,fe,J]),n.useEffect(()=>{W(null),ke(""),Y(null),Ne()},[D,Ne]),n.useEffect(()=>{i||(j.current=!1,W(null),ke(""),Y(null))},[i]),n.useEffect(()=>{if(!te)return;const p=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=p}},[te]);const _e=n.useCallback(()=>{X.current&&(window.clearTimeout(X.current),X.current=null)},[]),tt=n.useCallback(p=>{const g=p.target;if(g instanceof Element&&g.closest("[data-book-comment-ui]"))return;if(i&&g instanceof Element&&g.closest("[data-book-page-face]")){j.current=!0;return}if(S.current||!p.isPrimary||p.pointerType==="mouse"&&p.button!==0)return;Ne(),lt&&!i&&ye(!0);const B=window.performance.now(),re=M.current,ie=B-re.time>0&&B-re.time<fr&&re.pointerType===p.pointerType&&Math.hypot(p.clientX-re.x,p.clientY-re.y)<Yi,$e=R.current,Ue=p.currentTarget.getBoundingClientRect();ie?(_e(),M.current.time=0,j.current=!0,Be()):j.current=$e,w.current={pointerId:p.pointerId,pointerType:p.pointerType,mode:ie?"zoom-slider":$e?"pan":"page",startedZoomed:$e,startX:p.clientX,startY:p.clientY,startPanX:ne.get(),startPanY:I.get(),startScale:J.get(),anchorX:p.clientX,anchorY:p.clientY,stageCenterX:Ue.left+Ue.width/2,moved:!1}},[_e,i,lt,ne,I,Ne,Be,J]),f=n.useCallback((p,g)=>{_e(),X.current=window.setTimeout(()=>{if(X.current=null,R.current||U.current||w.current)return;const B=v.current?.pageFlip();p<g?B?.flipPrev():B?.flipNext()},fr)},[_e]),N=n.useCallback(p=>{const g=w.current;if(!g||g.pointerId!==p.pointerId||(Math.hypot(p.clientX-g.startX,p.clientY-g.startY)>Wi&&(g.moved=!0),g.mode==="page"))return;if(p.preventDefault(),g.mode==="pan"){if(!g.moved)return;const ie=at(J.get(),g.startPanX+p.clientX-g.startX,g.startPanY+p.clientY-g.startY);ne.set(ie.x),I.set(ie.y);return}if(!g.moved)return;if(!R.current){const ie=it(g.anchorX,g.anchorY,!1);g.startScale=ie.scale,g.startPanX=ie.x,g.startPanY=ie.y}const re=g.startScale*Math.exp((g.startY-p.clientY)*.006);Qe(re,g.anchorX,g.anchorY,g.startScale,g.startPanX,g.startPanY)},[at,it,ne,I,Qe,J]),C=n.useCallback(p=>{const g=w.current;if(!(!g||g.pointerId!==p.pointerId)){if(w.current=null,j.current=!1,ye(!1),p.type==="pointercancel"){M.current.time=0;return}if(g.mode==="zoom-slider"){g.moved?M.current.time=0:g.startedZoomed?kt():it(g.anchorX,g.anchorY,!0);return}if(g.moved){M.current.time=0,_e();return}M.current={time:window.performance.now(),x:p.clientX,y:p.clientY,pointerType:g.pointerType},g.mode==="page"&&f(p.clientX,g.stageCenterX)}},[_e,kt,it,f]);n.useEffect(()=>(window.addEventListener("pointermove",N,{passive:!1}),window.addEventListener("pointerup",C),window.addEventListener("pointercancel",C),()=>{window.removeEventListener("pointermove",N),window.removeEventListener("pointerup",C),window.removeEventListener("pointercancel",C)}),[C,N]),n.useEffect(()=>()=>{_e(),Be(),T.current&&window.clearTimeout(T.current)},[_e,Be]);const ee=n.useCallback(p=>{if(!R.current||S.current)return;p.preventDefault(),p.stopPropagation(),Be();const g=p.currentTarget.getBoundingClientRect(),B=Math.exp(-p.deltaY*.0015);Qe(J.get()*B,p.clientX-g.left,p.clientY-g.top)},[Be,Qe,J]);if(n.useEffect(()=>{t.length===0&&d?.(e.id)},[e.id,d,t.length]),t.length===0)return a.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."});const le=a.jsx("div",{className:`public-book-stage ${u} ${te?"is-magnified":""} ${O?"is-zoom-closing":""}`,children:a.jsx("div",{ref:k,className:`public-book-viewport relative flex items-center justify-center overflow-hidden ${te?"is-magnified cursor-grab active:cursor-grabbing":"cursor-default"} ${me?"is-page-folding":""}`,"data-page":D,"data-zoomed":te?"true":"false",onPointerDownCapture:tt,onMouseDownCapture:p=>{(j.current||R.current)&&(p.preventDefault(),p.stopPropagation())},onTouchStartCapture:p=>{(j.current||R.current)&&(p.preventDefault(),p.stopPropagation())},onWheel:ee,children:a.jsx(ze.div,{className:"flex h-full w-full items-center justify-center",style:{x:ne,y:I,scale:J,transformOrigin:"50% 50%",willChange:"transform"},children:a.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${Me}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform",pointerEvents:te?"none":"auto"},children:Re&&a.jsx(Aa,{ref:v,className:"mx-auto",style:{margin:"0 auto"},width:Ee.width,height:Ee.height,minWidth:1,maxWidth:L.maxWidth,minHeight:1,maxHeight:L.maxHeight,size:"fixed",startPage:x.current===e.id?y.current:fe,drawShadow:!0,flippingTime:850,usePortrait:!1,startZIndex:0,autoSize:!1,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!1,disableFlipByClick:!0,onInit:p=>{y.current=p.data.page,be(p.data.page),l?.(p.data.page),et(p.object),Ce.current=!0,ve()},onFlip:p=>{y.current=p.data,be(p.data),l?.(p.data),et(p.object)},onChangeState:p=>{const g=p.data==="user_fold"||p.data==="flipping";U.current=g,Ze(p.data!=="read"),g&&_e()},onChangeOrientation:p=>{et(p.object)},children:t.map((p,g)=>a.jsx(qi,{page:p,isCover:g===0||g===t.length-1,comments:Pe.get(p.id)??[],commentsHidden:De||xe||te,commentMode:i,canManageComments:o,activeDraft:E,draftBody:pe,commentBusy:Se,commentError:Ae,onImageReady:()=>Je(g),onPlaceComment:Q,onDraftBodyChange:ke,onSubmitDraft:()=>void ut(),onCancelDraft:Ie,onDeleteComment:B=>void ge(B)},p.id))},`${e.id}-${q}-${Ee.width}x${Ee.height}`)})})})});return a.jsx("div",{className:"flex h-full w-full items-center justify-center",children:te&&typeof document<"u"?jn.createPortal(le,document.body):le})}function Zi(){const[e,t]=n.useState(!0),[r,i]=n.useState(null),[o,s]=n.useState(!1),[u,l]=n.useState(null),d=n.useCallback(async()=>{t(!0),l(null);const{data:m,error:h}=await $.auth.getUser();if(h){i(null),s(!1),l(h.message),t(!1);return}const v=m.user??null;if(i(v),!v){s(!1),t(!1);return}try{const k=await Ti();s(k)}catch(k){s(!1),l(k instanceof Error?k.message:"Unable to verify administrator access.")}finally{t(!1)}},[]);return n.useEffect(()=>{d();const{data:m}=$.auth.onAuthStateChange(()=>{window.setTimeout(()=>{d()},0)});return()=>{m.subscription.unsubscribe()}},[d]),{loading:e,user:r,isAdmin:o,error:u,refresh:d}}const br="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";function Ki({text:e,speed:t=100,revealSpeed:r=55}){const i=n.useRef(null),o=n.useRef(null),s=n.useRef(0),u=n.useRef(!1),l=n.useCallback(()=>{o.current!==null&&(window.clearInterval(o.current),o.current=null)},[]),d=n.useCallback(()=>br[Math.floor(Math.random()*br.length)],[]),m=n.useCallback((k=0)=>e.split("").map((x,y)=>x===" "?" ":y<k?x:d()).join(""),[d,e]),h=n.useCallback(()=>{l(),u.current=!1,i.current&&(o.current=window.setInterval(()=>{!i.current||u.current||(i.current.textContent=m())},t))},[l,m,t]),v=n.useCallback(()=>{l(),u.current=!0,s.current=0,i.current&&(o.current=window.setInterval(()=>{s.current+=1,i.current&&(i.current.textContent=m(s.current)),s.current>=e.length&&(l(),i.current&&(i.current.textContent=e))},r))},[l,m,r,e]);return n.useEffect(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches?(i.current&&(i.current.textContent=e),l):(h(),l),[l,h,e]),a.jsx("span",{className:"public-login-scramble",onMouseEnter:v,onMouseLeave:h,"aria-label":e,children:a.jsx("span",{ref:i,"aria-hidden":"true",children:e})})}const Gr="publicBookSession",Ft="publicBookReturningToIndex",Wt="publicBookReturningToIntro";function vn(){if(typeof window>"u")return null;try{const e=window.sessionStorage.getItem(Gr);if(!e)return null;const t=JSON.parse(e);return typeof t.slug!="string"||t.slug.length===0||typeof t.pageIndex!="number"||!Number.isFinite(t.pageIndex)?null:{slug:t.slug,pageIndex:Math.max(0,Math.floor(t.pageIndex))}}catch{return null}}function Ct(e,t){if(typeof window>"u")return;const r={slug:e,pageIndex:Math.max(0,Math.floor(t))};try{window.sessionStorage.setItem(Gr,JSON.stringify(r))}catch{}}const Zr=()=>ft(()=>import("./AdminPortal-C-X2jsgS.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),Ji=n.lazy(Zr),Qi=()=>ft(()=>import("./WatchStudio-Cq8grT_r.js"),__vite__mapDeps([8,1,2,4,5,3,7,6])),nn=()=>Qi().then(e=>e.preloadWatchStudioExperience()),mn=1120,Kr=180,Kn=140,bt=mn+Kn,eo=Kr+bt,fn=920,xr=120,vr=fn+Kn,Bn=1180,to=6e3,no=`
.public-book-shell {
  height: 100vh;
  height: 100dvh;
}

.public-book-nav {
  left: max(12px, env(safe-area-inset-left));
  top: max(12px, env(safe-area-inset-top));
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(34px, 5vw, 48px);
  align-items: start;
  gap: clamp(1px, 0.6vw, 7px);
  max-width: calc(100vw - 24px - env(safe-area-inset-left));
}

.public-book-control-column {
  position: relative;
  width: 100%;
  height: clamp(96px, 16dvh, 138px);
  border: 0;
  outline: none;
  padding: 0;
  background: transparent;
  color: black;
  overflow: visible;
}

.public-book-control-column > span {
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
  font-size: clamp(11px, 1.5vw, 13px);
  font-weight: 400;
  letter-spacing: 0.08em;
  color: rgb(0 0 0 / 0.42);
  transition:
    color 480ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.public-book-control-column:hover > span,
.public-book-control-column:focus-visible > span {
  color: rgb(0 0 0 / 0.72);
  transform: rotate(-90deg) scale(1.08);
}

.public-book-control-column:focus-visible > span {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.public-book-control-column.is-active > span {
  color: black;
  text-decoration: none;
}

.public-book-library-plus {
  position: absolute;
  left: 50%;
  top: clamp(68px, 9dvh, 76px);
  display: block;
  pointer-events: none;
  color: rgb(0 0 0 / 0.52);
  font-size: clamp(13px, 1.7vw, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}

.public-book-library-plus.is-hidden {
  animation: public-book-library-plus-arrive 520ms
    cubic-bezier(0.4, 0, 0.2, 1) reverse both;
}

.public-book-library-plus.is-visible {
  animation: public-book-library-plus-arrive 680ms
    cubic-bezier(0.22, 0.88, 0.3, 1) 360ms both;
}

@keyframes public-book-library-plus-arrive {
  0% {
    opacity: 0;
    transform: translate3d(-50%, -5px, 0) scale(0);
  }
  64% {
    opacity: 1;
    transform: translate3d(-50%, 1px, 0) scale(1.16);
  }
  82% {
    transform: translate3d(-50%, 0, 0) scale(0.94);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, 0, 0) scale(1);
  }
}

.public-book-main {
  padding:
    calc(env(safe-area-inset-top) + clamp(14px, 2.5dvh, 32px))
    max(12px, env(safe-area-inset-right))
    calc(env(safe-area-inset-bottom) + clamp(14px, 2.5dvh, 32px))
    max(12px, env(safe-area-inset-left));
}

.public-book-viewport {
  box-sizing: border-box;
  width: min(
    calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right) - clamp(28px, 5vw, 82px)),
    1800px
  );
  height: min(
    calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - clamp(40px, 8dvh, 92px)),
    1100px
  );
  min-height: 0;
  padding: clamp(8px, 1.6vw, 24px);
  contain: layout;
  isolation: isolate;
}

.public-book-viewport .stf__parent {
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}

.public-book-viewport .stf__wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: inherit;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}

.public-book-viewport .stf__hardShadow,
.public-book-viewport .stf__hardInnerShadow {
  pointer-events: none;
  opacity: 0;
  filter: blur(clamp(4px, 0.65vw, 8px));
  transition: opacity 150ms cubic-bezier(0.22, 0.8, 0.28, 1);
  will-change: opacity, filter;
}

.public-book-viewport.is-page-folding .stf__hardShadow,
.public-book-viewport.is-page-folding .stf__hardInnerShadow {
  opacity: 0.84;
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

@media (max-width: 380px), (max-height: 700px) {
  .public-book-nav {
    top: max(8px, env(safe-area-inset-top));
    left: max(7px, env(safe-area-inset-left));
    grid-auto-columns: 31px;
    gap: 0;
    max-width: calc(100vw - 14px);
  }

  .public-book-control-column {
    height: clamp(76px, 20dvh, 104px);
  }

  .public-book-main {
    padding:
      calc(env(safe-area-inset-top) + 9px)
      max(8px, env(safe-area-inset-right))
      calc(env(safe-area-inset-bottom) + 9px)
      max(8px, env(safe-area-inset-left));
  }

  .public-book-viewport {
    width: calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right) - 20px);
    height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 20px);
    min-height: 0;
    padding: 5px;
  }
}

@media (max-height: 520px) {
  .public-book-viewport {
    height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 16px);
  }

  .public-book-control-column {
    height: min(82px, calc(100dvh - 18px));
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

.public-library-drawer {
  left: 0;
  right: 0;
  bottom: 0;
  height: min(72dvh, 720px);
  transform: translate3d(0, 104%, 0);
  opacity: 0;
  background: rgb(207 207 207);
  transition:
    transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 360ms ease;
  will-change: transform, opacity;
}

.public-library-drawer.is-open {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

.public-library-book-row {
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2.2vw, 24px);
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: clamp(270px, 44dvh, 440px);
  padding: clamp(26px, 4vw, 54px) clamp(18px, 5vw, 76px);
  border: 0;
  background: transparent;
  text-align: center;
  transform-origin: 50% 50%;
  transition:
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.public-library-book-row:hover .public-library-open-book,
.public-library-book-row.is-selected .public-library-open-book {
  transform: scale(1.025);
}

.public-library-book-row:active {
  transform: scale(0.99);
}

.public-library-open-book {
  display: flex;
  align-items: stretch;
  width: min(500px, 72vw);
  aspect-ratio: 1.52 / 1;
  perspective: 700px;
  filter: drop-shadow(0 9px 12px rgb(0 0 0 / 0.13));
  transform-origin: 50% 50%;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.public-library-open-book > span {
  position: relative;
  width: 50%;
  overflow: hidden;
  background: rgb(238 238 238);
}

.public-library-open-book > span:first-child {
  transform: rotateY(3deg);
  transform-origin: right center;
}

.public-library-open-book > span:last-child {
  transform: rotateY(-3deg);
  transform-origin: left center;
}

.public-library-open-book img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.public-library-book-copy h2 {
  font-size: clamp(18px, 2.8vw, 32px);
  line-height: 1.05;
  font-weight: 400;
}

.public-library-book-copy {
  width: min(680px, 88vw);
}

.public-library-book-copy p {
  margin: 0.65rem auto 0;
  max-width: 58ch;
  font-size: clamp(12px, 1.5vw, 16px);
  line-height: 1.45;
  color: rgb(0 0 0 / 0.58);
}

.book-comment-layer {
  pointer-events: none;
  opacity: 1;
  transition: opacity 320ms ease, filter 320ms ease;
}

.book-comment-layer.is-hidden {
  opacity: 0;
  filter: blur(5px);
}

.book-comment-balloon {
  pointer-events: none;
  min-width: 82px;
  max-width: min(220px, 78%);
  padding: 10px 13px 11px;
  border-radius: 15px;
  background: rgb(188 188 188 / 0.94);
  color: black;
  font-size: clamp(10px, 1.25vw, 13px);
  line-height: 1.3;
  overflow-wrap: anywhere;
  filter: drop-shadow(0 6px 12px rgb(0 0 0 / 0.12));
}

.book-comment-balloon::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -7px;
  width: 14px;
  height: 14px;
  background: inherit;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  transform: translateX(-50%) rotate(-45deg);
}

.book-comment-delete {
  pointer-events: auto;
  position: absolute;
  top: 2px;
  right: 4px;
  z-index: 2;
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  font-size: 15px;
  line-height: 1;
}

.book-comment-balloon:has(.book-comment-delete) > p {
  padding-right: 10px;
}

.book-comment-editor {
  pointer-events: auto;
  z-index: 5;
  width: min(238px, 88%);
  max-width: 88%;
  padding: 16px 12px 10px;
}

.book-comment-editor textarea {
  display: block;
  width: 100%;
  min-height: 72px;
  resize: vertical;
  border: 0;
  border-bottom: 1px solid rgb(0 0 0 / 0.28);
  border-radius: 0;
  outline: none;
  background: transparent;
  font: inherit;
}

.book-comment-editor-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
}

.book-comment-emojis {
  display: flex;
  gap: 5px;
}

.book-comment-emojis button,
.book-comment-editor-actions > button {
  border: 0;
  padding: 2px;
  background: transparent;
  font-size: 11px;
}

.book-comment-editor-actions > button {
  padding: 3px 5px;
  font-weight: 400;
}

.book-comment-editor-actions button:disabled {
  opacity: 0.35;
}

.book-comment-editor-error {
  margin-top: 6px;
  color: rgb(132 0 0);
  font-size: 10px;
}

@media (max-width: 560px) {
  .public-library-drawer {
    height: min(78dvh, 680px);
  }

  .public-library-book-row {
    gap: 13px;
    min-height: 250px;
    padding: 24px 12px 28px;
  }

  .public-library-open-book {
    width: min(360px, 82vw);
  }

  .public-library-book-copy h2 {
    font-size: 17px;
  }

  .public-library-book-copy p {
    display: -webkit-box;
    margin-top: 5px;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    font-size: 11px;
  }

  .book-comment-balloon {
    max-width: 88%;
    padding: 8px 10px 9px;
    border-radius: 12px;
    font-size: 9px;
  }
}

.public-book-background-layer {
  position: absolute;
  inset: -4%;
  transform-origin: 50% 50%;
  will-change: opacity, transform, filter, clip-path;
}

.public-book-background-layer.is-current {
  animation: public-book-background-mix-in ${Bn}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${Bn}ms cubic-bezier(0.4, 0, 0.2, 1) both;
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
  animation-duration: ${mn}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-meta.is-fast.is-entering,
.public-book-meta.is-fast.is-leaving {
  animation-duration: ${fn}ms;
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
  animation-duration: ${mn}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-stage.is-fast.is-entering,
.public-book-stage.is-fast.is-leaving {
  animation-duration: ${fn}ms;
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

.public-nav-item.is-continuing {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  filter: blur(0);
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


`;function Tn(e){return e instanceof Error?e.message:"Unable to load the books."}function st(e){return new Promise(t=>{window.setTimeout(t,e)})}function wr(){return new Promise(e=>{window.requestAnimationFrame(()=>e())})}function ro(e){const t=r=>Number.isFinite(r)?Math.min(255,Math.max(0,Math.round(r??255))):255;return`rgb(${t(e?.background_r)} ${t(e?.background_g)} ${t(e?.background_b)})`}function ao(e){return new Promise(t=>{const r=new Image;let i=!1;const o=()=>{i||(i=!0,window.clearTimeout(s),t())},s=window.setTimeout(o,5e3);r.onload=()=>{if(typeof r.decode=="function"){r.decode().catch(()=>{}).finally(o);return}o()},r.onerror=o,r.decoding="async",r.src=e})}async function yr(e,t=0){const r=Math.min(Math.max(0,Math.floor(t)),Math.max(0,e.length-1)),i=[r-1,r,r+1,r+2].filter(s=>s>=0&&s<e.length),o=[...new Set(i)].map(s=>e[s]);await Promise.all(o.map(s=>ao(s.public_url)))}function io({initialSlug:e,onBack:t,onLogin:r,onThreeD:i,onBookChange:o}){const{isAdmin:s}=Zi(),[u]=n.useState(()=>{const f=window.sessionStorage.getItem("gstudios:nav-continuity")==="models-to-library";return f&&window.sessionStorage.removeItem("gstudios:nav-continuity"),f}),[l,d]=n.useState([]),[m,h]=n.useState(null),[v,k]=n.useState([]),[x,y]=n.useState([]),[R,S]=n.useState(!1),[U,j]=n.useState({}),[w,M]=n.useState(!0),[X,T]=n.useState(!1),[A,P]=n.useState(null),[Z,q]=n.useState(!1),[L,fe]=n.useState(!1),[Ce,se]=n.useState("outside"),[F,he]=n.useState(u),[D,be]=n.useState("library"),[Me,ae]=n.useState("outside"),[te,ue]=n.useState(!1),[O,de]=n.useState(0),[De,ye]=n.useState(!1),[xe,z]=n.useState(!1),E=n.useRef(!0),W=n.useRef(!1),pe=n.useRef(null),ke=n.useRef(null),Se=n.useRef(null),K=n.useRef(!1),Ae=n.useRef(vn()),Y=n.useRef(null),me=n.useRef(0),Ze=n.useRef("rgb(255 255 255)"),Re=n.useRef(null),Ke=n.useRef(null),Ee=n.useRef(null),ce=n.useRef(new Set),[J,ne]=n.useState([{id:0,color:Ze.current}]),I=n.useMemo(()=>l.find(f=>f.id===m)??null,[l,m]);n.useEffect(()=>{s||S(!1)},[s]),n.useEffect(()=>{!I||v.length===0||j(f=>({...f,[I.id]:{cover:v[0]?{src:v[0].public_url,fallback:v[0].public_url}:null,lastPage:v[v.length-1]?{src:v[v.length-1].public_url,fallback:v[v.length-1].public_url}:null}}))},[v,I]),n.useEffect(()=>{if(l.length===0)return;let f=!0;const N=C=>{if(!C)return;const ee=new Image;ee.decoding="async",ee.onerror=()=>{if(C.fallback===C.src)return;const le=new Image;le.decoding="async",le.src=C.fallback},ee.src=C.src};return l.forEach(C=>{U[C.id]||ce.current.has(C.id)||(ce.current.add(C.id),mt(C.id).then(ee=>{if(!f)return;const le=ee[0],p=ee[ee.length-1],g={cover:le?{src:dr(le.storage_path),fallback:le.public_url}:null,lastPage:p?{src:dr(p.storage_path),fallback:p.public_url}:null};N(g.cover),N(g.lastPage),j(B=>({...B,[C.id]:g}))}).catch(()=>{}).finally(()=>{ce.current.delete(C.id)}))}),()=>{f=!1}},[U,l]),n.useEffect(()=>{const f=ro(I);if(f===Ze.current)return;Ze.current=f;const N={id:++me.current,color:f};ne(C=>[C[C.length-1],N]),Re.current&&window.clearTimeout(Re.current),Re.current=window.setTimeout(()=>{ne(C=>C.slice(-1)),Re.current=null},Bn)},[I,I?.background_b,I?.background_g,I?.background_r]);const Pe=n.useCallback(f=>{if(Ke.current===f)return Promise.resolve();const N=Ee.current;return N&&N.finish(),new Promise(C=>{let ee=!1;const le=()=>{ee||(ee=!0,window.clearTimeout(p),Ee.current?.finish===le&&(Ee.current=null),C())},p=window.setTimeout(le,to);Ee.current={bookId:f,finish:le,timeout:p}})},[]),lt=n.useCallback(f=>{Ke.current=f;const N=Ee.current;N?.bookId===f&&N.finish()},[]);n.useEffect(()=>{pe.current=m},[m]),n.useEffect(()=>{I&&Ut({eventName:"book_open",targetType:"book",targetId:I.slug})},[I]);const ve=n.useCallback(()=>{Y.current&&(window.clearTimeout(Y.current),Y.current=null)},[]),Je=n.useCallback((f=!1)=>{ve();const N=f?xr:Kr,C=f?fn:mn;ue(f),ae("outside"),Y.current=window.setTimeout(()=>{E.current&&(ae("entering"),Y.current=window.setTimeout(()=>{E.current&&(ae("visible"),ue(!1),Y.current=null)},C+Kn))},N)},[ve]);n.useEffect(()=>{E.current=!0;const f=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{E.current&&he(!0)})});return()=>{E.current=!1,window.cancelAnimationFrame(f),Y.current&&window.clearTimeout(Y.current),Re.current&&window.clearTimeout(Re.current),Ee.current&&(window.clearTimeout(Ee.current.timeout),Ee.current.finish())}},[]),n.useEffect(()=>{const f=navigator.connection;if(f?.saveData||f?.effectiveType==="slow-2g"||f?.effectiveType==="2g")return;const N=()=>{nn()},C=window;if(C.requestIdleCallback){const le=C.requestIdleCallback(N,{timeout:2500});return()=>C.cancelIdleCallback?.(le)}const ee=window.setTimeout(N,1400);return()=>window.clearTimeout(ee)},[]),n.useEffect(()=>{let f=!0;return(async()=>{M(!0),P(null);try{const C=await Xr();if(!f)return;d(C)}catch(C){f&&P(Tn(C))}finally{f&&M(!1)}})(),()=>{f=!1}},[]);const Ne=n.useCallback(async f=>{if(!K.current){K.current=!0,T(!0),P(null);try{const[N,C]=await Promise.all([mt(f.id),pr(f.id)]),ee=Ae.current,le=ee?.slug===f.slug?Math.min(ee.pageIndex,Math.max(0,N.length-1)):0;if(await yr(N,le),!E.current)return;Ke.current=null;const p=Pe(f.id);if(jn.flushSync(()=>{ue(!1),ae("outside"),h(f.id),k(N),y(C),de(le)}),Ct(f.slug,le),T(!1),await p,!E.current)return;Je()}catch(N){E.current&&(P(Tn(N)),T(!1))}finally{K.current=!1}}},[Je,Pe]),Q=n.useCallback(async(f,N)=>{if(E.current){if(W.current){ke.current={book:f,updateRoute:N},q(!1);return}if(pe.current===f.id){q(!1);return}W.current=!0,ye(!0),T(!0),q(!1),P(null);try{ve(),ue(!0),ae("leaving");const C=mt(f.id).then(async B=>(await yr(B),B)),ee=pr(f.id),[le,p]=await Promise.all([C,ee,st(vr)]);if(!E.current)return;Ke.current=null;const g=Pe(f.id);if(jn.flushSync(()=>{ue(!0),ae("outside"),h(f.id),pe.current=f.id,k(le),y(p),de(0),T(!1)}),Ae.current={slug:f.slug,pageIndex:0},Ct(f.slug,0),N&&o?.(f.slug),await wr(),await wr(),await g,await st(xr),!E.current)return;ae("entering"),await st(vr),E.current&&(ae("visible"),ue(!1))}catch(C){E.current&&(P(Tn(C)),T(!1),ue(!1),ae("visible"))}finally{if(W.current=!1,E.current){ye(!1);const C=ke.current;ke.current=null,C&&C.book.id!==pe.current&&window.setTimeout(()=>{Se.current?.(C.book,C.updateRoute)},24)}}}},[ve,o,Pe]);n.useEffect(()=>{Se.current=(f,N)=>{Q(f,N)}},[Q]),n.useEffect(()=>{if(w||l.length===0)return;const f=e?l.find(N=>N.slug===e):null;if(!m){const N=l.find(ee=>ee.is_featured),C=f??N??l[0];Ne(C);return}f&&f.id!==m&&!W.current&&Q(f,!1)},[l,e,Ne,w,m,Q]);const Ie=n.useCallback(async()=>{!L||W.current||(W.current=!0,ye(!0),se("leaving"),await st(bt),E.current&&(fe(!1),se("outside"),Je(),await st(eo),W.current=!1,E.current&&ye(!1)))},[L,Je]);n.useEffect(()=>{const f=N=>{if(N.key==="Escape"){if(L){Ie();return}q(!1)}};return window.addEventListener("keydown",f),()=>{window.removeEventListener("keydown",f)}},[Ie,L]);const ut=async()=>{if(!W.current){if(q(!1),L){await Ie();return}W.current=!0,ye(!0),Zr(),!(I&&(ve(),ae("leaving"),await st(bt),!E.current))&&(fe(!0),se("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{E.current&&se("entering")})}),await st(bt),W.current=!1,E.current&&(se("visible"),ye(!1)))}},ge=async()=>{if(L){await Ie();return}W.current||(W.current=!0,ye(!0),q(!1),he(!1),ve(),ae("leaving"),I&&Ct(I.slug,O),window.sessionStorage.setItem(Ft,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.setItem(Wt,"true"),window.sessionStorage.removeItem("returnFromExample"),await st(bt),E.current&&t())},Be=async()=>{!L||W.current||(W.current=!0,ye(!0),q(!1),he(!1),se("leaving"),I&&Ct(I.slug,O),window.sessionStorage.setItem(Ft,"true"),window.sessionStorage.setItem(Wt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.removeItem("returnFromExample"),await st(bt),E.current&&t())},Ye=async()=>{if(W.current)return;be("models"),W.current=!0,ye(!0),q(!1),L?se("leaving"):(ve(),ae("leaving")),I&&Ct(I.slug,O);const f=nn().catch(()=>null);await Promise.all([st(bt),f]),E.current&&i()},at=f=>{Q(f,!0)},Qe=n.useCallback(async f=>{if(!I||!s)throw new Error("Administrator login required.");const N=await Ai({bookId:I.id,bookPageId:f.bookPageId,body:f.body,anchorX:f.anchorX,anchorY:f.anchorY});y(C=>[...C,N])},[s,I]),ht=n.useCallback(async f=>{if(!s)throw new Error("Administrator login required.");await ji(f),y(N=>N.filter(C=>C.id!==f))},[s]),it=n.useCallback(f=>{de(f),I&&(Ae.current={slug:I.slug,pageIndex:f},Ct(I.slug,f),Ut({eventName:"book_page_view",targetType:"book_page",targetId:`${I.slug}:${f}`,valueInt:f}))},[I]),et=`${Me==="entering"?"is-entering":Me==="visible"?"is-visible":Me==="leaving"?"is-leaving":"is-outside"}${te?" is-fast":""}`,_e=Ce==="entering"?"is-entering":Ce==="visible"?"is-visible":Ce==="leaving"?"is-leaving":"is-outside",tt=F?u?"is-continuing":"is-visible":De||xe?"is-leaving":"is-outside";return a.jsxs("div",{className:"public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:J[0]?.color??"rgb(255 255 255)"},children:[a.jsx("style",{children:no}),a.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:J.map((f,N)=>a.jsx("div",{className:`public-book-background-layer ${N===J.length-1?"is-current":"is-previous"}`,style:{backgroundColor:f.color}},f.id))}),Z&&!L&&a.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-black/0",onClick:()=>q(!1)}),a.jsxs("div",{className:`public-book-nav fixed ${L?"z-[190]":"z-[170]"}`,children:[a.jsx("div",{className:`public-nav-item ${tt}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:a.jsx("button",{type:"button",onClick:()=>void(L?Be():ge()),disabled:De,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"navigate",className:"public-book-control-column disabled:pointer-events-none disabled:opacity-40","aria-label":"Navigate",title:"Navigate",children:a.jsx("span",{children:"NAVIGATE"})})}),a.jsx("div",{className:`public-nav-item ${tt}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:a.jsxs("button",{type:"button",onClick:()=>{if(be("library"),L){Ie();return}q(f=>!f)},disabled:De,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"library",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${!L&&Z&&D==="library"?"is-active":""}`,"aria-label":"Choose a book","aria-expanded":Z,"aria-controls":"public-book-library",title:"Choose a book",children:[a.jsx("span",{children:"LIBRARY"}),a.jsx("i",{"aria-hidden":"true",className:`public-book-library-plus ${F&&!L&&D==="library"?"is-visible":"is-hidden"}`,children:"+"})]})}),a.jsx("div",{className:`public-nav-item ${tt}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:a.jsx("button",{type:"button",onClick:()=>void ut(),disabled:De,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"login",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${L?"is-active":""}`,"aria-expanded":L,"aria-label":"Login",children:a.jsx("span",{children:a.jsx(Ki,{text:"LOGIN"})})})}),a.jsx("div",{className:`public-nav-item ${tt}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:a.jsx("button",{type:"button",onClick:()=>void Ye(),onPointerEnter:()=>void nn(),onFocus:()=>void nn(),disabled:De,"data-analytics-event":"model_open","data-analytics-type":"model","data-analytics-id":"models",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${!L&&D==="models"?"is-active":""}`,children:a.jsx("span",{children:"MODELS"})})}),s&&!L&&a.jsx("div",{className:`public-nav-item ${tt}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:a.jsx("button",{type:"button",onClick:()=>S(f=>!f),disabled:De||L,"data-analytics-event":"navigation_click","data-analytics-type":"interface","data-analytics-id":"comment-mode",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${R?"is-active":""}`,"aria-pressed":R,"aria-label":"Comment on book pages",children:a.jsx("span",{children:"COMMENT"})})})]}),a.jsxs("aside",{id:"public-book-library",className:`public-library-drawer fixed z-[150] flex flex-col ${Z&&!L?"is-open pointer-events-auto":"pointer-events-none"}`,"aria-hidden":!Z||L,children:[a.jsx("button",{type:"button",onClick:()=>q(!1),"data-analytics-event":"navigation_click","data-analytics-type":"interface","data-analytics-id":"library-close",className:"absolute right-5 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 active:scale-95 sm:right-8","aria-label":"Close book list",children:"×"}),a.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto",children:w?a.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"..."}):l.length===0?a.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):l.map(f=>{const N=f.id===m,C=U[f.id];return a.jsxs("button",{type:"button",onClick:()=>at(f),"data-analytics-event":"navigation_click","data-analytics-type":"book","data-analytics-id":f.slug,className:`public-library-book-row ${N?"is-selected":""}`,children:[a.jsxs("span",{className:"public-library-open-book","aria-hidden":"true",children:[a.jsx("span",{children:C?.lastPage&&a.jsx("img",{src:C.lastPage.src,alt:"",draggable:!1,loading:"eager",decoding:"async",onError:ee=>{ee.currentTarget.dataset.fallbackApplied||(ee.currentTarget.dataset.fallbackApplied="true",ee.currentTarget.src=C.lastPage?.fallback??"")}})}),a.jsx("span",{children:C?.cover&&a.jsx("img",{src:C.cover.src,alt:"",draggable:!1,loading:"eager",decoding:"async",onError:ee=>{ee.currentTarget.dataset.fallbackApplied||(ee.currentTarget.dataset.fallbackApplied="true",ee.currentTarget.src=C.cover?.fallback??"")}})})]}),a.jsxs("span",{className:"public-library-book-copy min-w-0",children:[a.jsx("h2",{children:f.title}),f.description&&a.jsx("p",{children:f.description})]})]},f.id)})})]}),a.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden",children:w||X&&!I?a.jsx("div",{className:`public-route-message ${F?"is-visible":"is-outside"}`,children:"..."}):A?a.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${F?"is-visible":"is-outside"}`,children:A}):l.length===0?a.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${F?"is-visible":"is-outside"}`,children:"No books are public yet."}):I?a.jsx("div",{className:"h-full w-full",children:a.jsx("div",{className:`public-book-surface flex h-full w-full items-center justify-center ${L?"is-login-muted":""}`,children:a.jsx(Gi,{book:I,pages:v,comments:x,commentMode:R,canManageComments:s,initialPage:O,bookMotionClassName:et,onPageChange:it,onReady:lt,onCreateComment:Qe,onDeleteComment:ht},I.id)})}):null}),L&&a.jsx("div",{className:`public-login-stage fixed inset-0 z-[180] overflow-hidden bg-white ${_e}`,"aria-hidden":Ce==="outside"||Ce==="leaving",children:a.jsx(n.Suspense,{fallback:null,children:a.jsx(Ji,{embedded:!0,surfaceReady:Ce==="entering"||Ce==="visible",onBack:()=>void Ie(),onNavigate:()=>void Be(),onLibrary:()=>void Ie(),onModels:()=>void Ye()})})})]})}const Jr=n.createContext(void 0),oo=({children:e})=>{const[t,r]=n.useState(!1),i=()=>{r(!t)};return n.useEffect(()=>{t?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[t]),a.jsx(Jr.Provider,{value:{isDark:t,toggleTheme:i},children:e})},Ms=()=>{const e=n.useContext(Jr);if(e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},kr="/assets/WolfyLight-Bs10J6iU.gif",so=100,co=500,lo=14e3,In=400,uo=({onComplete:e})=>{const[t,r]=n.useState(!1),[i,o]=n.useState(!1),[s,u]=n.useState(!1),[l,d]=n.useState(!1),[m,h]=n.useState({}),[v,k]=n.useState(0),[x,y]=n.useState(!0),R=n.useRef({}),S=n.useRef(null),U=n.useRef(!1),j=n.useRef(!1),{progress:w}=Oa();n.useEffect(()=>{let A;const P=()=>{k(Z=>{const q=w-Z,L=Math.max(q*.1,q>0?.5:-.5),fe=Math.abs(q)<.5?w:Z+L;return fe>=100&&setTimeout(()=>y(!1),500),Math.min(100,Math.max(0,fe))}),A=requestAnimationFrame(P)};return A=requestAnimationFrame(P),()=>cancelAnimationFrame(A)},[w]),n.useEffect(()=>{const A=window.matchMedia("(prefers-reduced-motion: reduce)");j.current=A.matches;const P=()=>j.current=A.matches;return A.addEventListener?.("change",P),()=>A.removeEventListener?.("change",P)},[]),n.useEffect(()=>{const A=new Image;A.src=kr;const P=()=>h({w:A.naturalWidth||400,h:A.naturalHeight||400});A.decode?.().then(()=>{P(),r(!0)}).catch(()=>{A.onload=()=>{P(),r(!0)}})},[]);const M=n.useCallback(()=>{if(U.current)return;if(j.current){U.current=!0,e();return}d(!0);const A=S.current;let P=!1;const Z=()=>{P||(P=!0,U.current=!0,e())};if(A){const q=()=>{A.removeEventListener("animationend",q),R.current.fallback&&clearTimeout(R.current.fallback),Z()};A.addEventListener("animationend",q,{once:!0}),R.current.fallback=window.setTimeout(Z,In+120)}else R.current.fallback=window.setTimeout(Z,In+50)},[e]);n.useEffect(()=>{if(!t)return;const A=R.current;return j.current?(o(!0),u(!0),A.auto=window.setTimeout(()=>M(),800)):(A.entry=window.setTimeout(()=>o(!0),so),A.allowExit=window.setTimeout(()=>u(!0),co),A.auto=window.setTimeout(()=>M(),lo)),()=>{Object.values(A).forEach(P=>P&&clearTimeout(P))}},[t,M]);const X=()=>{(s||j.current)&&M()},T=i?l?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return a.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${U.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:X,children:[a.jsxs("div",{className:`relative ${T}`,ref:S,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[a.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[a.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),a.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),a.jsx("img",{src:kr,alt:"Loading wolf",width:m.w||800,height:m.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),x&&a.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${v>=100?"opacity-0":"opacity-100"}`,children:[Math.round(v),"%"]}),a.jsx("style",{children:`
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
        .animate-elastic-shrink { transform-origin: 50% 50%; animation: elastic-shrink ${In}ms ease-in forwards; }
      `})]})},je={};typeof window<"u"&&(window.addEventListener("keydown",e=>{je[e.key.toLowerCase()]=!0}),window.addEventListener("keyup",e=>{je[e.key.toLowerCase()]=!1}));const Mt={current:null},Ot=15,Qr=10,po=38,Sr=95,Oe=0,jt=-174,$n=960,hn=12e4,mo=48e3,fo=9e4,H=128,rt=900,qe=10,gt=12,ho=4.5,go=16e3,ea=[500,200,-300],bo=new oe(500,150,-1e3).normalize(),xo="#fff4d6",ta="#0b1e3a",vo="#0a2a6a",na="gstudios:ocean-player-transform",ra={value:0},Mn=new Map,xt=[];let Er=1;function Un(){return performance.now()/1e3}function aa(e,t,r){const i=Un();for(xt.push({id:Er,x:e,z:t,startedAt:i,...r}),Er+=1;xt.length>qe;)xt.shift();for(let o=xt.length-1;o>=0;o-=1){const s=xt[o];i-s.startedAt>s.duration+.25&&xt.splice(o,1)}}function wo(){const e={position:[0,Ot,0],rotationY:Math.PI,rotationZ:0};try{const t=window.sessionStorage.getItem(na);if(!t)return e;const r=JSON.parse(t);return!Array.isArray(r.position)||r.position.length!==3||!r.position.every(i=>typeof i=="number"&&Number.isFinite(i))||typeof r.rotationY!="number"||!Number.isFinite(r.rotationY)?e:{position:[Number(r.position[0]),V.clamp(Number(r.position[1]),jt+8,$n),Number(r.position[2])],rotationY:Number(r.rotationY),rotationZ:typeof r.rotationZ=="number"&&Number.isFinite(r.rotationZ)?Number(r.rotationZ):0}}catch{return e}}function An(e){if(e)try{window.sessionStorage.setItem(na,JSON.stringify({position:e.position.toArray(),rotationY:e.rotation.y,rotationZ:e.rotation.z}))}catch{}}function Jn(){const e=Wn(Hn,"/caustics.png");return n.useMemo(()=>{e.wrapS=e.wrapT=qn,e.minFilter=ri,e.magFilter=Pn,e.colorSpace=Yn,e.needsUpdate=!0},[e]),e}function Qn(e,t,r={}){if(e.userData.hasUnderwaterCaustics)return;const i=r.includeRipple??!0,o=r.baseLight??.045,s=r.causticsStrength??.86,u=r.lightTint??[.46,.82,1],l=e.onBeforeCompile.bind(e),d=e.customProgramCacheKey.bind(e);e.onBeforeCompile=(m,h)=>{l(m,h),m.uniforms.causticsMap={value:t},m.uniforms.causticsTime=ra,m.uniforms.causticsRippleSampler={value:Fe.texture},m.uniforms.causticsRippleCenter={value:Fe.center},m.uniforms.causticsRippleWorldSize={value:rt},m.uniforms.causticsRippleTexel={value:new $t(1/H,1/H)},m.vertexShader=`varying vec3 vCausticsWorldPosition;
${m.vertexShader}`.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
        vCausticsWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),m.fragmentShader=`
      uniform sampler2D causticsMap;
      uniform float causticsTime;
      uniform sampler2D causticsRippleSampler;
      uniform vec2 causticsRippleCenter;
      uniform float causticsRippleWorldSize;
      uniform vec2 causticsRippleTexel;
      varying vec3 vCausticsWorldPosition;
      ${m.fragmentShader}`.replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
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
      ${i?`vec2 causticsRippleUv =
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
        length(vec2(causticsRippleX, causticsRippleY))) * causticsRippleMask;`:"float rippleCaustics = 0.0;"}
      movingCaustics = clamp(movingCaustics + rippleCaustics * 0.75, 0.0, 1.0);
      vec3 underwaterFill = diffuseColor.rgb * vec3(
        ${u[0].toFixed(4)},
        ${u[1].toFixed(4)},
        ${u[2].toFixed(4)}
      );
      reflectedLight.indirectDiffuse += underwaterFill * submerged *
        (${o.toFixed(4)} + movingCaustics * ${s.toFixed(4)});`)},e.customProgramCacheKey=()=>`${d()}-underwater-caustics-v4-${i?"ripple":"fine"}-${o}-${s}`,e.userData.hasUnderwaterCaustics=!0,e.needsUpdate=!0}class yo{constructor(){nt(this,"cells",new Map);nt(this,"ready",!1)}build(t){this.clear(),t.updateWorldMatrix(!0,!0);let r=0;t.traverse(s=>{if(!(s instanceof vt))return;const u=s.geometry.getAttribute("position");u&&(r+=u.count)});const i=Math.max(1,Math.ceil(r/go)),o=new oe;t.traverse(s=>{if(!(s instanceof vt))return;const u=s.geometry.getAttribute("position");if(u)for(let l=0;l<u.count;l+=i){o.fromBufferAttribute(u,l),s instanceof ai&&s.applyBoneTransform(l,o),o.applyMatrix4(s.matrixWorld);const d=this.keyFor(o.x,o.y,o.z),m=this.cells.get(d)??[];m.push(o.clone()),this.cells.set(d,m)}}),this.ready=this.cells.size>0}resolve(t,r){if(!this.ready)return!1;const i=r+ho,o=Math.ceil(i/gt);let s=!1;for(let u=0;u<2;u+=1){const l=Math.floor(t.x/gt),d=Math.floor(t.y/gt),m=Math.floor(t.z/gt);for(let h=l-o;h<=l+o;h+=1)for(let v=d-o;v<=d+o;v+=1)for(let k=m-o;k<=m+o;k+=1){const x=this.cells.get(`${h}:${v}:${k}`);if(x)for(const y of x){const R=t.distanceToSquared(y);if(R>=i**2)continue;const S=Math.sqrt(R);S>1e-4?t.addScaledVector(t.clone().sub(y).divideScalar(S),i-S):t.y+=i,s=!0}}}return s}clear(){this.cells.clear(),this.ready=!1}keyFor(t,r,i){return`${Math.floor(t/gt)}:${Math.floor(r/gt)}:${Math.floor(i/gt)}`}}const Fn=new yo;class ko{constructor(){nt(this,"center",new $t);nt(this,"texture");nt(this,"height",new Float32Array(H**2));nt(this,"velocity",new Float32Array(H**2));nt(this,"nextHeight",new Float32Array(H**2));nt(this,"nextVelocity",new Float32Array(H**2));nt(this,"pixels",new Uint8Array(H**2*4));nt(this,"accumulator",0);for(let t=0;t<this.pixels.length;t+=4)this.pixels[t]=128,this.pixels[t+1]=128,this.pixels[t+2]=128,this.pixels[t+3]=255;this.texture=new Wa(this.pixels,H,H,Ya,Va),this.texture.minFilter=Pn,this.texture.magFilter=Pn,this.texture.wrapS=this.texture.wrapT=Xa,this.texture.colorSpace=Yn,this.texture.needsUpdate=!0}moveWindowTo(t,r){if((this.center.x-t)**2+(this.center.y-r)**2<180**2)return;const i=rt/(H-1),o=Math.round((t-this.center.x)/i),s=Math.round((r-this.center.y)/i);this.nextHeight.fill(0),this.nextVelocity.fill(0);for(let u=0;u<H;u+=1){const l=u+s;if(!(l<0||l>=H))for(let d=0;d<H;d+=1){const m=d+o;if(m<0||m>=H)continue;const h=u*H+d,v=l*H+m;this.nextHeight[h]=this.height[v],this.nextVelocity[h]=this.velocity[v]}}this.height.set(this.nextHeight),this.velocity.set(this.nextVelocity),this.nextHeight.fill(0),this.nextVelocity.fill(0),this.center.x+=o*i,this.center.y+=s*i,this.encodeTexture()}addRipple(t,r,i=.8,o=20){const s=(t-this.center.x)/rt+.5,u=(r-this.center.y)/rt+.5;if(s<=0||s>=1||u<=0||u>=1)return;const l=s*(H-1),d=u*(H-1),m=Math.max(2,o/rt*H),h=Math.ceil(m*2.4),v=Math.max(1,Math.floor(l-h)),k=Math.min(H-2,Math.ceil(l+h)),x=Math.max(1,Math.floor(d-h)),y=Math.min(H-2,Math.ceil(d+h));for(let R=x;R<=y;R+=1)for(let S=v;S<=k;S+=1){const U=(S-l)**2+(R-d)**2,j=Math.exp(-U/(m*m*.72));this.velocity[R*H+S]+=i*j}}displaceSphere(t,r,i){if(i<=.001)return;const o=Math.min(t.x,r.x)-i,s=Math.max(t.x,r.x)+i,u=Math.min(t.z,r.z)-i,l=Math.max(t.z,r.z)+i,d=S=>((S-this.center.x)/rt+.5)*(H-1),m=S=>((S-this.center.y)/rt+.5)*(H-1),h=Math.max(1,Math.floor(d(o))),v=Math.min(H-2,Math.ceil(d(s))),k=Math.max(1,Math.floor(m(u))),x=Math.min(H-2,Math.ceil(m(l)));if(h>v||k>x)return;const y=i*i,R=(S,U,j)=>{const w=(S-j.x)**2+(U-j.z)**2;if(w>=y)return 0;const M=Math.sqrt(y-w),X=j.y-M,T=j.y+M;return V.clamp(Oe-X,0,T-X)};for(let S=k;S<=x;S+=1){const U=this.center.y+(S/(H-1)-.5)*rt;for(let j=h;j<=v;j+=1){const w=this.center.x+(j/(H-1)-.5)*rt,M=R(w,U,t),X=R(w,U,r),T=(M-X)/i;if(Math.abs(T)<1e-5)continue;const A=S*H+j;this.height[A]+=V.clamp(T*.58,-.48,.48),this.velocity[A]+=V.clamp(T*.1,-.08,.08)}}}step(t){this.accumulator+=Math.min(t,.05);const r=1/30;let i=!1;for(;this.accumulator>=r;){for(let o=1;o<H-1;o+=1)for(let s=1;s<H-1;s+=1){const u=o*H+s,l=this.height[u-1]+this.height[u+1]+this.height[u-H]+this.height[u+H]-this.height[u]*4,d=(this.velocity[u]+l*.22)*.986;this.nextVelocity[u]=d,this.nextHeight[u]=(this.height[u]+d*.78)*.998}[this.height,this.nextHeight]=[this.nextHeight,this.height],[this.velocity,this.nextVelocity]=[this.nextVelocity,this.velocity],this.nextHeight.fill(0),this.nextVelocity.fill(0),this.accumulator-=r,i=!0}i&&this.encodeTexture()}dispose(){this.texture.dispose()}encodeTexture(){for(let t=0;t<this.height.length;t+=1){const r=Math.round(V.clamp(128+this.height[t]*42,0,255)),i=t*4;this.pixels[i]=r,this.pixels[i+1]=r,this.pixels[i+2]=r,this.pixels[i+3]=255}this.texture.needsUpdate=!0}}const Fe=new ko;function So(e,t,r){let i=t-e;for(;i<-Math.PI;)i+=Math.PI*2;for(;i>Math.PI;)i-=Math.PI*2;return e+i*r}function Eo(){const e=n.useRef(null),t=Wn(Hn,"/waternormals.jpeg");t.wrapS=t.wrapT=qn;const r=n.useMemo(()=>new Za(hn,hn),[]),i=n.useMemo(()=>{const o=new $a(r,{textureWidth:512,textureHeight:512,clipBias:.003,waterNormals:t,sunDirection:bo.clone(),sunColor:new Dt("#fff2cc"),waterColor:new Dt(vo),distortionScale:10.7,alpha:.955,fog:!1}),s=o.material;return s.transparent=!0,s.depthTest=!0,s.depthWrite=!1,s.uniforms.rippleSampler={value:Fe.texture},s.uniforms.rippleCenter={value:Fe.center},s.uniforms.rippleWorldSize={value:rt},s.uniforms.rippleTexel={value:new $t(1/H,1/H)},s.uniforms.surfacePulseTime={value:Un()},s.uniforms.surfacePulseCenters={value:Array.from({length:qe},()=>new $t)},s.uniforms.surfacePulseStarts={value:new Float32Array(qe).fill(-1e3)},s.uniforms.surfacePulseDurations={value:new Float32Array(qe).fill(1)},s.uniforms.surfacePulseRadii={value:new Float32Array(qe)},s.uniforms.surfacePulseStrengths={value:new Float32Array(qe)},s.fragmentShader=s.fragmentShader.replace("uniform vec3 waterColor;",`uniform vec3 waterColor;
          uniform sampler2D rippleSampler;
          uniform vec2 rippleCenter;
          uniform float rippleWorldSize;
          uniform vec2 rippleTexel;
          uniform float surfacePulseTime;
          uniform vec2 surfacePulseCenters[${qe}];
          uniform float surfacePulseStarts[${qe}];
          uniform float surfacePulseDurations[${qe}];
          uniform float surfacePulseRadii[${qe}];
          uniform float surfacePulseStrengths[${qe}];

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
          surfaceNormal = normalize(surfaceNormal + vec3(rippleSlope.x, 0.0, rippleSlope.y) * rippleMask * 2.6);

          vec2 independentPulseSlope = vec2(0.0);
          for (int pulseIndex = 0; pulseIndex < ${qe}; pulseIndex++) {
            float pulseAge = surfacePulseTime - surfacePulseStarts[pulseIndex];
            float pulseDuration = max(surfacePulseDurations[pulseIndex], 0.001);
            float pulseProgress = clamp(pulseAge / pulseDuration, 0.0, 1.0);
            float pulseActive =
              step(0.0, pulseAge) * (1.0 - step(pulseDuration, pulseAge));
            vec2 fromPulse = worldPosition.xz - surfacePulseCenters[pulseIndex];
            float pulseDistance = max(length(fromPulse), 0.001);
            float pulseRadius = surfacePulseRadii[pulseIndex] *
              (0.08 + pulseProgress * 0.92);
            float pulseWidth = mix(
              max(3.2, surfacePulseRadii[pulseIndex] * 0.11),
              max(5.5, surfacePulseRadii[pulseIndex] * 0.19),
              pulseProgress
            );
            float pulseBand = exp(
              -pow((pulseDistance - pulseRadius) / pulseWidth, 2.0)
            );
            float pulseFade = pow(1.0 - pulseProgress, 1.55);
            independentPulseSlope += normalize(fromPulse) * pulseBand *
              pulseFade * surfacePulseStrengths[pulseIndex] * pulseActive;
          }
          surfaceNormal = normalize(
            surfaceNormal +
            vec3(independentPulseSlope.x, 0.0, independentPulseSlope.y) * 0.72
          );`),s.needsUpdate=!0,o.renderOrder=2,o},[r,t]);return i.material.uniforms.waterColor.value.convertSRGBToLinear(),n.useEffect(()=>()=>{r.dispose(),i.material.dispose()},[r,i]),ct((o,s)=>{if(Fe.step(s),e.current){const u=e.current.material;u.uniforms.time.value+=s,u.uniforms.rippleCenter.value.copy(Fe.center);const l=Un();u.uniforms.surfacePulseTime.value=l;const d=u.uniforms.surfacePulseCenters.value,m=u.uniforms.surfacePulseStarts.value,h=u.uniforms.surfacePulseDurations.value,v=u.uniforms.surfacePulseRadii.value,k=u.uniforms.surfacePulseStrengths.value;for(let x=0;x<qe;x+=1){const y=xt[x];if(!y){m[x]=-1e3,h[x]=1,v[x]=0,k[x]=0;continue}d[x].set(y.x,y.z),m[x]=y.startedAt,h[x]=y.duration,v[x]=y.radius,k[x]=y.strength}}}),a.jsx("primitive",{object:i,ref:e,"rotation-x":-Math.PI/2})}const rn=120;function _o(){const e=n.useRef(0),t=n.useRef(0),r=n.useRef(0),i=n.useRef(Array.from({length:rn},()=>({position:new oe,velocity:new oe,life:0,totalLife:1,size:1}))),o=n.useMemo(()=>{const u=new $r;return u.setAttribute("position",new It(new Float32Array(rn*3),3)),u.setAttribute("aSize",new It(new Float32Array(rn),1)),u.setAttribute("aAlpha",new It(new Float32Array(rn),1)),u},[]),s=n.useMemo(()=>new Xn({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,uniforms:{},vertexShader:`
          attribute float aSize;
          attribute float aAlpha;
          varying float vAlpha;
          void main() {
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = clamp(
              aSize * (220.0 / max(1.0, -viewPosition.z)),
              1.5,
              20.0
            );
            vAlpha = aAlpha;
          }
        `,fragmentShader:`
          varying float vAlpha;
          void main() {
            vec2 point = gl_PointCoord - 0.5;
            float distanceToCenter = length(point);
            float foam = 1.0 - smoothstep(0.28, 0.5, distanceToCenter);
            float rim = smoothstep(0.06, 0.34, distanceToCenter) *
              (1.0 - smoothstep(0.34, 0.5, distanceToCenter));
            float alpha = (foam * 0.72 + rim * 0.42) * vAlpha;
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(
              mix(vec3(0.68, 0.88, 0.96), vec3(1.0), foam),
              alpha
            );
          }
        `}),[]);return n.useEffect(()=>()=>{o.dispose(),s.dispose()},[o,s]),ct((u,l)=>{const d=Mt.current,m=o.getAttribute("position"),h=o.getAttribute("aSize"),v=o.getAttribute("aAlpha");for(let k=0;k<i.current.length;k+=1){const x=i.current[k];if(x.life>0){x.life-=l,x.position.addScaledVector(x.velocity,l),x.velocity.y-=l*7.5;const y=V.clamp(x.life/x.totalLife,0,1);m.setXYZ(k,x.position.x,x.position.y,x.position.z),h.setX(k,x.size*(1.18-y*.18)),v.setX(k,Math.sin(y*Math.PI)*.82)}else v.setX(k,0)}if(d){const k=d.position.y+Number(d.userData.renderedMinY??0),x=d.position.y+Number(d.userData.renderedMaxY??0),y=Number(d.userData.speed)||0,R=k<Oe+4&&x>Oe-4,S=String(d.userData.characterId??"").includes("pirate-sailing-ship"),U=new oe(Number(d.userData.headingX)||0,0,Number(d.userData.headingZ)||1).normalize(),j=new oe(U.z,0,-U.x),w=V.clamp(Number(d.userData.renderedWidth)*(S?.34:.18),2.5,S?18:8),M=V.clamp(Number(d.userData.renderedLength)*(S?.38:.18),3,S?42:10);if(R&&y>1.2){e.current+=l*Math.min(y/26,2.4);const X=S?.022:.055;for(;e.current>=X;){e.current-=X;const T=i.current[r.current%i.current.length];r.current+=1;const A=Math.random()<.5?-1:1,P=S&&Math.random()<.68,Z=P?M*(.32+Math.random()*.12):-M*(.2+Math.random()*.22),q=A*w*(P?.42+Math.random()*.28:Math.random()*.72);T.position.copy(d.position).addScaledVector(U,Z).addScaledVector(j,q),T.position.y=Oe+.3+Math.random()*.55,T.velocity.copy(j).multiplyScalar(A*(2.5+Math.random()*(S?8:4))).addScaledVector(U,P?-4:-7).add(new oe((Math.random()-.5)*2,3.5+Math.random()*(S?7.5:4),(Math.random()-.5)*2)),T.totalLife=S?.55+Math.random()*.55:.4+Math.random()*.35,T.life=T.totalLife,T.size=S?4.5+Math.random()*6:3+Math.random()*4}if(t.current+=l,t.current>=(S?.09:.16)){t.current=0;const T=d.position.clone().addScaledVector(U,-M*.34);if(Fe.addRipple(T.x,T.z,S?.2:.1,S?Math.max(9,w*.8):6),S)for(const A of[-1,1]){const P=T.clone().addScaledVector(j,A*w*.48).addScaledVector(U,-M*.12);Fe.addRipple(P.x,P.z,.14,Math.max(7,w*.46))}}}else e.current=0,t.current=0}m.needsUpdate=!0,h.needsUpdate=!0,v.needsUpdate=!0}),a.jsx("points",{geometry:o,material:s,frustumCulled:!1,renderOrder:4})}function Co(){const e=Jn(),t=n.useMemo(()=>{const r=new Vn({color:"#315057",roughness:.96,metalness:0,side:Ga});return Qn(r,e),r},[e]);return n.useEffect(()=>()=>t.dispose(),[t]),ct(r=>{ra.value=r.clock.elapsedTime}),a.jsxs("mesh",{"rotation-x":-Math.PI/2,"position-y":jt,renderOrder:0,receiveShadow:!0,children:[a.jsx("planeGeometry",{args:[hn,hn]}),a.jsx("primitive",{object:t,attach:"material"})]})}function Ro(){const e=n.useRef(0),t=260,r=4,i=t*(r+.55),o=n.useMemo(()=>Array.from({length:(r*2+1)**2*3},(l,d)=>{const m=Math.floor(d/3);return{relativeCellX:m%(r*2+1)-r,relativeCellZ:Math.floor(m/(r*2+1))-r,memberIndex:d%3}}),[]),s=n.useMemo(()=>{const l=new $r;return l.setAttribute("position",new It(new Float32Array(o.length*3),3)),l.setAttribute("aSize",new It(new Float32Array(o.length),1)),l.setAttribute("aAlpha",new It(new Float32Array(o.length),1)),l},[o.length]),u=n.useMemo(()=>new Xn({transparent:!0,depthWrite:!1,toneMapped:!1,uniforms:{visibility:{value:0}},vertexShader:`
          attribute float aSize;
          attribute float aAlpha;
          varying float vAlpha;

          void main() {
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = clamp(
              aSize * (250.0 / max(1.0, -viewPosition.z)),
              2.0,
              34.0
            );
            vAlpha = aAlpha;
          }
        `,fragmentShader:`
          uniform float visibility;
          varying float vAlpha;

          void main() {
            vec2 point = gl_PointCoord - 0.5;
            float distanceToCenter = length(point);
            float outer = 1.0 - smoothstep(0.42, 0.5, distanceToCenter);
            float inner = 1.0 - smoothstep(0.29, 0.39, distanceToCenter);
            float ring = max(0.0, outer - inner * 0.88);
            float glint = 1.0 - smoothstep(
              0.035,
              0.12,
              distance(point, vec2(-0.18, 0.18))
            );
            float alpha = (ring * 0.78 + glint * 0.42) * vAlpha * visibility;
            if (alpha < 0.008) discard;
            gl_FragColor = vec4(vec3(0.76, 0.94, 1.0), alpha);
          }
        `}),[]);return n.useEffect(()=>()=>{s.dispose(),u.dispose()},[s,u]),ct(({camera:l,clock:d},m)=>{e.current=V.damp(e.current,l.position.y<Oe-.45?1:0,5.2,m),u.uniforms.visibility.value=e.current;const h=s.getAttribute("position"),v=s.getAttribute("aSize"),k=s.getAttribute("aAlpha"),x=d.elapsedTime,y=Oe-jt-7,R=Mt.current?.position??l.position,S=Math.floor(R.x/t),U=Math.floor(R.z/t),j=(w,M,X)=>{const T=Math.sin(w*127.1+M*311.7+X*74.7)*43758.5453;return T-Math.floor(T)};o.forEach((w,M)=>{const X=S+w.relativeCellX,T=U+w.relativeCellZ,A=j(X,T,1)>.48?3:2;if(w.memberIndex>=A){k.setX(M,0);return}const P=(X+.14+j(X,T,2)*.72)*t,Z=(T+.14+j(X,T,3)*.72)*t,q=j(X,T,4)*Math.PI*2+w.memberIndex*2.1,L=P+Math.cos(q)*(3+w.memberIndex*2),fe=Z+Math.sin(q)*(3+w.memberIndex*2),Ce=(j(X,T,5+w.memberIndex)+w.memberIndex*.07)%1,se=16+j(X,T,9+w.memberIndex)*10,F=4.8+j(X,T,13+w.memberIndex)*3.2,he=2.2+j(X,T,17+w.memberIndex)*2.4,D=(x/se+Ce)%1,be=Math.sin(x*.72+q+D*Math.PI*3)*he,Me=Math.cos(x*.51+q*1.4)*he*.55,ae=V.smoothstep(D,0,.08),te=1-V.smoothstep(D,.8,.985),ue=Math.hypot(L-R.x,fe-R.z),O=1-V.smoothstep(ue,i*.72,i);h.setXYZ(M,L+be,jt+4+D*y,fe+Me),v.setX(M,F*(.82+D*.48)),k.setX(M,ae*te*O*.82)}),h.needsUpdate=!0,v.needsUpdate=!0,k.needsUpdate=!0}),a.jsx("points",{geometry:s,material:u,frustumCulled:!1,renderOrder:5})}function To(){const e=n.useRef(null),{camera:t}=wt(),r=Wn(Hn,"/waternormals.jpeg");n.useMemo(()=>{r.wrapS=r.wrapT=qn,r.colorSpace=Yn,r.needsUpdate=!0},[r]);const i=n.useMemo(()=>new Xn({uniforms:{time:{value:0},normalSampler:{value:r},rippleSampler:{value:Fe.texture},rippleCenter:{value:Fe.center},rippleWorldSize:{value:rt}},vertexShader:`
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
        `,side:Ka,transparent:!0,depthWrite:!1,depthTest:!0}),[r]);return n.useEffect(()=>()=>i.dispose(),[i]),ct(o=>{i.uniforms.time.value=o.clock.elapsedTime,i.uniforms.rippleCenter.value.copy(Fe.center),e.current&&(e.current.position.x=t.position.x,e.current.position.z=t.position.z,e.current.visible=t.position.y<Oe-.35)}),a.jsxs("mesh",{ref:e,"rotation-x":-Math.PI/2,"position-y":Oe-.22,renderOrder:3,frustumCulled:!1,children:[a.jsx("planeGeometry",{args:[16e3,16e3,128,128]}),a.jsx("primitive",{object:i,attach:"material"})]})}function Io(){const{camera:e}=wt();return n.useEffect(()=>{const t=new ei,r=new $t,i=new ti(new oe(0,1,0),0),o=new oe,s=u=>{document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1"&&(!u.isPrimary||u.button>0||u.target instanceof Element&&u.target.closest("button, input, textarea, select, a, [role='button'], [data-ocean-control]")||(r.set(u.clientX/window.innerWidth*2-1,-(u.clientY/window.innerHeight)*2+1),t.setFromCamera(r,e),t.ray.intersectPlane(i,o)&&(Fe.addRipple(o.x,o.z,-1.05,22),aa(o.x,o.z,{duration:2.7,radius:82,strength:.72,kind:"click"}))))};return window.addEventListener("pointerdown",s,{passive:!0}),()=>window.removeEventListener("pointerdown",s)},[e]),null}function Mo(){const{camera:e,scene:t}=wt(),r=n.useRef(0),i=n.useRef(null),o=n.useMemo(()=>new Dt(ta),[]),s=n.useMemo(()=>new Dt("#04395a"),[]),u=n.useMemo(()=>new Dt,[]),l=n.useMemo(()=>new ni("#0a5273",0),[]);return ct((d,m)=>{const h=e.position.y<Oe-.45;r.current=V.damp(r.current,h?1:0,4.8,m);const v=r.current;u.lerpColors(o,s,v),t.background=u,l.density=v*.0028,t.fog=v>.003?l:null,i.current===null?i.current=h:h!==i.current&&(i.current=h,window.dispatchEvent(new CustomEvent("ocean-surface-cross",{detail:{underwater:h}})))}),n.useEffect(()=>()=>{t.fog=null,t.background=o},[o,t]),null}function Ao(){const e=n.useRef(null),{camera:t}=wt();return ct((r,i)=>{e.current&&(e.current.intensity=V.damp(e.current.intensity,t.position.y<Oe-.45?.24:0,4.2,i))}),a.jsx("hemisphereLight",{ref:e,color:"#65c9f1",groundColor:"#041b2b",intensity:0})}function jo(){const e=n.useRef(null),t=n.useRef(1),{camera:r}=wt();return n.useEffect(()=>{const i=e.current?.material;i&&(i.transparent=!0,i.depthWrite=!1,i.needsUpdate=!0)},[]),ct((i,o)=>{const s=e.current?.material;s&&(t.current=V.damp(t.current,r.position.y<Oe-.45?0:1,4.8,o),s.opacity=t.current,e.current.visible=t.current>.004)}),a.jsx(Ba,{ref:e,distance:mo,sunPosition:ea,turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})}function Po(){const{scene:e}=xn("/island.gltf"),t=Jn(),r=n.useMemo(()=>{const i=e.clone(!0);return i.scale.setScalar(100),i.position.set(0,-5,-300),i.traverse(o=>{if(!(o instanceof vt))return;const u=(Array.isArray(o.material)?o.material:[o.material]).map(l=>{const d=l.clone();return d instanceof Vn&&(d.roughness=Math.max(d.roughness,.82),d.metalness=Math.min(d.metalness,.02),d.envMapIntensity=.08,Qn(d,t)),d.needsUpdate=!0,d});o.material=Array.isArray(o.material)?u:u[0],o.castShadow=!0,o.receiveShadow=!0}),i},[t,e]);return n.useLayoutEffect(()=>(Fn.build(r),()=>Fn.clear()),[r]),n.useEffect(()=>()=>{r.traverse(i=>{if(!(i instanceof vt))return;(Array.isArray(i.material)?i.material:[i.material]).forEach(s=>s.dispose())})},[r]),a.jsx("primitive",{object:r})}function _r(e,t,r,i){const o=Ua.clone(t);o.traverse(v=>{if(!(v instanceof vt))return;const x=(Array.isArray(v.material)?v.material:[v.material]).map(y=>{const R=y.clone();return R instanceof Vn&&Qn(R,i,{includeRipple:!1,baseLight:0,causticsStrength:.78,lightTint:[1,.98,.9]}),R.needsUpdate=!0,R});v.material=Array.isArray(v.material)?x:x[0],v.castShadow=!0,v.receiveShadow=!0,v.frustumCulled=!0}),o.updateWorldMatrix(!0,!0);const s=new ii().setFromObject(o),u=V.clamp(Number(e.model_scale)||Qr,.05,100),l=V.clamp(Number(e.camera_distance)||70,10,500),d=s.isEmpty()?new oe(1,1.3,1):s.getSize(new oe),m=s.isEmpty()?new oe(0,.65,0):s.getCenter(new oe),h=d.multiplyScalar(u);return{id:e.id,scene:o,animations:r,modelScale:u,cameraDistance:l,localCenter:m.multiplyScalar(u),collisionRadius:V.clamp(Math.max(h.x,h.z)*.42,4,25),renderedHeight:Math.max(1,h.y),renderedMinY:s.isEmpty()?0:s.min.y*u,renderedMaxY:s.isEmpty()?u:s.max.y*u,renderedWidth:Math.max(1,h.x),renderedLength:Math.max(1,h.z)}}function Rt(e,t,r={}){window.dispatchEvent(new CustomEvent("ocean-character-loading",{detail:{id:e,percent:Math.round(V.clamp(t,0,100)),ready:r.ready??!1,error:r.error}}))}function No(){const e=n.useRef(null),{camera:t}=wt(),r="/wolfy.glb",{scene:i,animations:o}=xn(r),s=Jn(),u=n.useMemo(()=>_r({id:"bundled:wolfy",model_scale:Qr,camera_distance:70},i,o,s),[o,s,i]),[l,d]=n.useState(u),m=n.useRef(l),h=n.useRef(0),v=n.useRef(null),k=n.useRef(null),x=n.useRef(.42),y=n.useRef([]),R=n.useRef(.14),S=n.useRef([]),U=n.useRef(.18),j=n.useRef(0),w=n.useRef(0),M=n.useMemo(()=>wo(),[]),X=Math.round(M.rotationZ/(Math.PI/2))*(Math.PI/2),T=Math.abs(M.position[1]-Ot)<.1,A=n.useRef(new oe),P=n.useRef(0),Z=n.useRef(X),q=n.useRef(!1),L=n.useRef(0),fe=n.useRef(0),Ce=n.useRef(new oe),se=n.useRef(0),F=n.useRef(M.position[1]),he=n.useRef(T),D=n.useRef(!T),be=n.useRef(!1),Me=n.useRef(!1),ae=n.useRef(new oe(0,0,1)),te=n.useRef(M.position[1]),ue=n.useRef(null),O=n.useRef(0),de=n.useRef(new oe),De=n.useRef(new oe),ye=n.useMemo(()=>({localCenter:l.localCenter,radius:l.collisionRadius}),[l]);return n.useEffect(()=>{m.current=l,ue.current=null,window.dispatchEvent(new CustomEvent("ocean-active-character-change",{detail:{id:l.id}})),e.current&&(e.current.userData.cameraDistance=l.cameraDistance,e.current.userData.cameraHeight=V.clamp(l.renderedHeight*.55,6,l.cameraDistance*.68),e.current.userData.lookHeight=V.clamp(l.renderedHeight*.32,4,l.cameraDistance*.42),e.current.userData.collisionRadius=l.collisionRadius,e.current.userData.characterId=l.id,e.current.userData.renderedMinY=l.renderedMinY,e.current.userData.renderedMaxY=l.renderedMaxY,e.current.userData.renderedWidth=l.renderedWidth,e.current.userData.renderedLength=l.renderedLength);const xe=new Ja(l.scene);return y.current=[],S.current=[],l.scene.traverse(z=>{z instanceof vt&&/sail/i.test(z.name)&&z.morphTargetInfluences?.length&&(z.morphTargetInfluences[0]=R.current,y.current.push(z)),z instanceof vt&&/pirate_flag/i.test(z.name)&&z.morphTargetInfluences?.length&&(z.morphTargetInfluences[0]=U.current,z.morphTargetInfluences.length>1&&(z.morphTargetInfluences[1]=.2),S.current.push(z))}),l.animations.forEach(z=>{const E=xe.clipAction(z);E.setLoop(Qa,1/0),E.clampWhenFinished=!1,E.enabled=!0,E.play(),/propeller/i.test(z.name)&&(E.timeScale=x.current,k.current=E)}),v.current=xe,()=>{xe.stopAllAction(),xe.uncacheRoot(l.scene),v.current===xe&&(v.current=null),k.current?.getMixer()===xe&&(k.current=null),y.current=[],S.current=[]}},[l]),n.useEffect(()=>{Mn.set(r,{scene:i,animations:o});const xe=z=>{const E=z.detail?.character;if(!E?.public_url)return;const W=h.current+1;h.current=W,Rt(E.id,0);const pe=K=>{if(h.current!==W)return;const Ae=_r(E,K.scene,K.animations,s);window.requestAnimationFrame(()=>{h.current===W&&(d(Ae),window.requestAnimationFrame(()=>{h.current===W&&Rt(E.id,100,{ready:!0})}))})},ke=Mn.get(E.public_url);if(ke){Rt(E.id,94),pe(ke);return}new oi().load(E.public_url,K=>{Mn.set(E.public_url,K),Rt(E.id,94),pe(K)},K=>{if(h.current!==W)return;const Ae=K.total>0?K.loaded/K.total*92:Math.min(88,12+Math.log10(K.loaded+1)*12);Rt(E.id,Ae)},K=>{h.current===W&&Rt(E.id,0,{error:K instanceof Error?K.message:"Unable to load this character."})})};return window.addEventListener("ocean-character-select",xe),window.dispatchEvent(new CustomEvent("ocean-character-player-ready")),()=>{window.removeEventListener("ocean-character-select",xe),h.current+=1}},[o,s,i,r]),n.useEffect(()=>{const xe=e.current;Mt.current=xe;const z=Y=>{const{x:me,z:Ze}=Y.detail;A.current.set(me,0,Ze)},E=()=>{be.current||!he.current&&!D.current||(be.current=!0,D.current=!1,he.current=!1,F.current=e.current.position.y,se.current=po)},W=Y=>{const{y:me}=Y.detail;P.current=V.clamp(me,-1,1),Math.abs(P.current)>.01&&(be.current=!1,D.current=!0,he.current=!1)},pe=Y=>{const me=Math.round(Z.current/(Math.PI/2));Z.current=(me+Math.sign(Y))*(Math.PI/2)},ke=Y=>{pe(Y.detail.direction)},Se=Y=>{if(Y.repeat)return;const me=Y.key.toLowerCase();me!=="z"&&me!=="x"||(Y.preventDefault(),pe(me==="z"?-1:1))},K=Y=>{q.current=Y.detail.active},Ae=Y=>{if(Me.current=Y.detail.enabled,!Me.current){A.current.set(0,0,0),P.current=0,be.current=!1;const me=Math.abs(e.current.position.y-Ot)<.1;he.current=me,D.current=!me,q.current=!1,L.current=0,An(e.current)}};return window.addEventListener("explore-joystick",z),window.addEventListener("explore-jump",E),window.addEventListener("explore-vertical",W),window.addEventListener("explore-roll-step",ke),window.addEventListener("keydown",Se),window.addEventListener("explore-sprint",K),window.addEventListener("explore-mode",Ae),Me.current=document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1",()=>{window.removeEventListener("explore-joystick",z),window.removeEventListener("explore-jump",E),window.removeEventListener("explore-vertical",W),window.removeEventListener("explore-roll-step",ke),window.removeEventListener("keydown",Se),window.removeEventListener("explore-sprint",K),window.removeEventListener("explore-mode",Ae),An(xe),Mt.current===xe&&(Mt.current=null)}},[]),ct((xe,z)=>{if(v.current?.update(Math.min(z,.05)),!e.current||!Me.current)return;const E=new oe(A.current.x+(je.arrowright||je.d?1:0)-(je.arrowleft||je.a?1:0),0,A.current.z+(je.arrowup||je.w?1:0)-(je.arrowdown||je.s?1:0));E.lengthSq()<.01&&E.set(0,0,0);const W=!!je.shift||q.current;L.current=V.damp(L.current,W?1:0,W?5.5:3.8,z);const pe=new oe;t.getWorldDirection(pe),pe.y=0,pe.normalize();const ke=new oe().crossVectors(pe,new oe(0,1,0)).normalize(),Se=new oe().addScaledVector(pe,E.z).addScaledVector(ke,E.x);Se.lengthSq()>1e-4&&Se.normalize();const K=m.current.id.includes("cessna-aircraft"),Ae=K?906.25:265,Y=K?125*(1+L.current*6.25):100*(1+L.current*1.65);Ce.current.lerp(Se.multiplyScalar(Y),z*6);const me=V.clamp(Ce.current.length()/Ae,0,1),Ze=.42+me*1.75;x.current=V.damp(x.current,Ze,Ze>x.current?3.2:2.1,z),k.current&&(k.current.timeScale=x.current);const Re=.14+me*.86;R.current=V.damp(R.current,Re,Re>R.current?2.25:1.35,z),y.current.forEach(Q=>{Q.morphTargetInfluences&&(Q.morphTargetInfluences[0]=R.current)});const Ke=.18+me*.82;U.current=V.damp(U.current,Ke,Ke>U.current?3.1:1.9,z),j.current+=z*(2.4+me*11.5);const Ee=V.clamp(.2+me*.34+Math.sin(j.current)*(.08+me*.2),.06,.82);S.current.forEach(Q=>{Q.morphTargetInfluences&&(Q.morphTargetInfluences[0]=U.current,Q.morphTargetInfluences.length>1&&(Q.morphTargetInfluences[1]=Ee))}),w.current+=z,w.current>=.08&&(w.current=0,window.dispatchEvent(new CustomEvent("ocean-aircraft-throttle",{detail:{throttle:me}})));const ce=e.current.position.clone().addScaledVector(Ce.current,z),J=(je.e?1:0)-(je.q?1:0),ne=V.clamp(J+P.current,-1,1),I=Z.current-e.current.rotation.z;if(Math.abs(I)>1e-4?e.current.rotation.z+=I*(1-Math.exp(-z*9.5)):e.current.rotation.z=Z.current,Math.abs(ne)>.01&&(be.current=!1,D.current=!0,he.current=!1),be.current)se.current-=Sr*Math.min(z,.05);else if(D.current){const Q=K?72*(1+L.current*4.4):58*(1+L.current*1.2);se.current=V.damp(se.current,ne*Q,ne===0?7.5:6,z)}else se.current-=Sr*Math.min(z,.05);ce.y+=se.current*Math.min(z,.05);const Pe=be.current?F.current:Ot;!D.current&&ce.y<=Pe&&(ce.y=Pe,se.current=0,he.current=!0,be.current=!1,D.current=Math.abs(Pe-Ot)>=.1);const lt=Number(e.current.userData.renderedMinY)||0,ve=Math.max(jt+8,jt+1.4-Math.min(0,lt));ce.y=V.clamp(ce.y,ve,$n),(ce.y===ve||ce.y===$n)&&(se.current=0),Fn.resolve(ce,e.current.userData.collisionRadius??5)&&(Ce.current.multiplyScalar(.2),se.current*=.2),e.current.position.copy(ce),Fe.moveWindowTo(ce.x,ce.z),De.current.copy(ye.localCenter).applyQuaternion(e.current.quaternion),de.current.copy(ce).add(De.current),O.current+=z;const Je=Math.abs(de.current.y-Oe)<ye.radius*1.18;if(ue.current?Je?O.current>=1/30&&(ue.current.distanceTo(de.current)>.035&&Fe.displaceSphere(ue.current,de.current,Math.min(ye.radius,11)),ue.current.copy(de.current),O.current=0):(ue.current.copy(de.current),O.current=0):ue.current=de.current.clone(),te.current>Oe&&de.current.y<=Oe||te.current<Oe&&de.current.y>=Oe){const Q=de.current.y>te.current,Ie=Math.max(34,ye.radius*2.8);Fe.addRipple(de.current.x,de.current.z,Q?.46:-2.05,Q?ye.radius*1.6:Ie),aa(de.current.x,de.current.z,{duration:Q?2.2:3.5,radius:Q?Ie*1.55:Ie*3.3,strength:Q?.58:1.55,kind:Q?"rise":"dive"}),window.dispatchEvent(new CustomEvent("ocean-player-splash",{detail:{submerging:!Q,speed:Math.abs(se.current)}})),!Q&&!be.current&&(se.current=Math.min(se.current,-72))}if(te.current=de.current.y,E.lengthSq()>.01){const Q=Se.clone();E.z<-.2&&Q.copy(pe),ae.current.lerp(Q,.15).normalize();const Ie=Math.atan2(ae.current.x,ae.current.z);e.current.rotation.y=So(e.current.rotation.y,Ie,.15)}e.current.userData.joyX=A.current.x,e.current.userData.speed=Ce.current.length(),e.current.userData.headingX=Math.sin(e.current.rotation.y),e.current.userData.headingZ=Math.cos(e.current.rotation.y),fe.current+=z,fe.current>=.45&&(fe.current=0,An(e.current))}),a.jsx("group",{ref:e,position:M.position,rotation:[0,M.rotationY,X],children:a.jsx("primitive",{object:l.scene,scale:l.modelScale},l.id)})}function Lo(){const{camera:e}=wt(),t=n.useRef(0),r=n.useRef(0),i=n.useRef(!1),o=n.useRef(70),s=n.useRef(22),u=n.useRef(6);return n.useEffect(()=>{const l=d=>{i.current=d.detail.enabled};return window.addEventListener("explore-mode",l),()=>window.removeEventListener("explore-mode",l)},[]),ct((l,d)=>{const m=Mt.current;if(!m)return;r.current+=d*(i.current?1:-1),r.current=V.clamp(r.current,0,1);const h=r.current*r.current*(3-2*r.current),k=(je.arrowright||je.d?1:0)-(je.arrowleft||je.a?1:0)+(m.userData?.joyX??0);Math.abs(k)>.05&&(t.current-=k*d*2.5),o.current=V.damp(o.current,Number(m.userData?.cameraDistance)||70,3.5,d),s.current=V.damp(s.current,Number(m.userData?.cameraHeight)||22,3.5,d),u.current=V.damp(u.current,Number(m.userData?.lookHeight)||6,3.5,d);const x=new oe(0,s.current,o.current);x.applyAxisAngle(new oe(0,1,0),t.current);const y=m.position.clone().add(x),S=new oe(0,20,100).add(new oe(Math.sin(r.current*Math.PI)*20,0,0)).lerp(y,h);e.position.lerp(S,.12);const U=new oe(0,5,0),j=m.position.clone();j.y+=u.current,e.lookAt(U.lerp(j,h))}),null}function zo(){const e=n.useRef(null),t=n.useRef(!1);return n.useEffect(()=>{const r=new Audio("/Ocean.mp3");r.loop=!0,r.preload="auto",r.volume=0,e.current=r;let i=0;const o=(m,h=2e3)=>{if(!e.current)return;window.cancelAnimationFrame(i);const v=e.current,k=v.volume,x=performance.now(),y=R=>{const S=V.clamp((R-x)/h,0,1);v.volume=V.clamp(k+(m-k)*S,0,1),S<1?i=window.requestAnimationFrame(y):m===0&&(v.pause(),v.currentTime=0)};i=window.requestAnimationFrame(y)},s=async()=>{t.current=!0;try{r.paused&&await r.play(),o(.14,2400)}catch{}},u=()=>{t.current=!1,o(0,1800)},l=m=>{m.detail.active?s():u()},d=()=>{t.current&&s()};return window.addEventListener("skyocean-audio",l),window.addEventListener("pointerdown",d,{passive:!0}),window.addEventListener("keydown",d),document.getElementById("global-sky-ocean-bg")?.getAttribute("data-audio-active")==="1"&&s(),()=>{window.removeEventListener("skyocean-audio",l),window.removeEventListener("pointerdown",d),window.removeEventListener("keydown",d),window.cancelAnimationFrame(i),r.pause(),r.src=""}},[]),null}function Oo(){return n.useEffect(()=>{const e=new AudioContext,t=e.createGain();t.gain.value=0,t.connect(e.destination);const r=fetch("/cessna-engine.wav").then(x=>x.arrayBuffer()).then(x=>e.decodeAudioData(x));let i=null,o="",s=0,u=document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1";const l=async()=>{if(i)return;const x=await r;e.state!=="closed"&&(i=e.createBufferSource(),i.buffer=x,i.loop=!0,i.playbackRate.value=.82,i.connect(t),i.start())},d=async()=>{const x=u&&o.includes("cessna-aircraft"),y=e.currentTime;t.gain.cancelScheduledValues(y),t.gain.setValueAtTime(t.gain.value,y),x?(e.state==="suspended"&&await e.resume(),await l(),t.gain.linearRampToValueAtTime(.2+s*.07,y+.7)):t.gain.linearRampToValueAtTime(0,y+.55)},m=x=>{o=x.detail.id,d()},h=x=>{u=x.detail.enabled,d()},v=x=>{if(s=V.clamp(x.detail.throttle,0,1),!i)return;const y=e.currentTime;i.playbackRate.cancelScheduledValues(y),i.playbackRate.setTargetAtTime(.82+s*.52,y,s>.45?.16:.28),u&&o.includes("cessna-aircraft")&&(t.gain.cancelScheduledValues(y),t.gain.setTargetAtTime(.2+s*.07,y,.22))},k=()=>{d()};return window.addEventListener("ocean-active-character-change",m),window.addEventListener("explore-mode",h),window.addEventListener("ocean-aircraft-throttle",v),window.addEventListener("pointerdown",k,{passive:!0}),window.addEventListener("keydown",k),()=>{window.removeEventListener("ocean-active-character-change",m),window.removeEventListener("explore-mode",h),window.removeEventListener("ocean-aircraft-throttle",v),window.removeEventListener("pointerdown",k),window.removeEventListener("keydown",k),i?.stop(),i?.disconnect(),t.disconnect(),e.close()}},[]),null}function Do(){return n.useEffect(()=>{const e=new Audio("/bubble.mp3");e.preload="auto",e.volume=.24;let t=null;const r=o=>{const s=o.detail.underwater;e.pause(),e.currentTime=0,e.playbackRate=s?.9:1.08,e.play().catch(()=>{})},i=o=>{const{submerging:s,speed:u}=o.detail;if(!s)return;t??(t=new AudioContext),t.state==="suspended"&&t.resume();const l=t.currentTime,d=t.createOscillator(),m=t.createGain(),h=V.clamp(u/70,.7,1.35);d.type="sine",d.frequency.setValueAtTime(168*h,l),d.frequency.exponentialRampToValueAtTime(54,l+.38),m.gain.setValueAtTime(1e-4,l),m.gain.exponentialRampToValueAtTime(.16*h,l+.012),m.gain.exponentialRampToValueAtTime(1e-4,l+.44),d.connect(m),m.connect(t.destination),d.start(l),d.stop(l+.46)};return window.addEventListener("ocean-surface-cross",r),window.addEventListener("ocean-player-splash",i),()=>{window.removeEventListener("ocean-surface-cross",r),window.removeEventListener("ocean-player-splash",i),e.pause(),e.src="",t&&t.close()}},[]),null}function Bo(){return a.jsxs(a.Fragment,{children:[a.jsx(zo,{}),a.jsx(Oo,{}),a.jsx(Do,{}),a.jsxs(Da,{shadows:!0,dpr:[1,1.5],camera:{position:[0,20,100],fov:55,near:.1,far:fo},gl:{antialias:!0,toneMapping:qa,toneMappingExposure:.8,outputColorSpace:Ha},children:[a.jsx("color",{attach:"background",args:[ta]}),a.jsx("directionalLight",{position:ea,intensity:1,color:xo,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-camera-near":10,"shadow-camera-far":1800,"shadow-camera-left":-500,"shadow-camera-right":500,"shadow-camera-top":500,"shadow-camera-bottom":-500}),a.jsx("ambientLight",{intensity:.35,color:"#ffffff"}),a.jsx(Ao,{}),a.jsx(jo,{}),a.jsxs(n.Suspense,{fallback:null,children:[a.jsx(Co,{}),a.jsx(Ro,{}),a.jsx(Eo,{}),a.jsx(_o,{}),a.jsx(To,{}),a.jsx(Po,{}),a.jsx(No,{})]}),a.jsx(Lo,{}),a.jsx(Io,{}),a.jsx(Mo,{})]})]})}xn.preload("/wolfy.glb");xn.preload("/island.gltf");function Yt(e,t){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(t)}function $o(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function Uo(){const{data:e,error:t}=await $.from("archive_sections").select("*").eq("is_visible",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(t)throw Yt(t,"Unable to load the archive sections.");return e??[]}async function As(){const{data:e,error:t}=await $.from("archive_sections").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(t)throw Yt(t,"Unable to load the archive section manager.");return e??[]}async function js(e,t,r){const i=e.trim(),o=$o(i),s=t.trim().toUpperCase().slice(0,8);if(!i||!o)throw new Error("Enter a section name.");if(!s)throw new Error("Enter a short section code.");const{data:u,error:l}=await $.from("archive_sections").insert({name:i,slug:o,code:s,sort_order:r,is_visible:!0}).select("*").single();if(l)throw Yt(l,"Unable to create the archive section.");return u}async function Ps(e,t){const r={...t,...t.name!==void 0?{name:t.name.trim()}:{},...t.code!==void 0?{code:t.code.trim().toUpperCase().slice(0,8)}:{}},{data:i,error:o}=await $.from("archive_sections").update(r).eq("id",e).select("*").single();if(o)throw Yt(o,"Unable to save the archive section.");return i}async function Ns(e){const{error:t}=await $.from("archive_sections").delete().eq("id",e.id);if(t)throw Yt(t,"Unable to delete this section. Move its books to another section first.")}const Fo=100*1024*1024,Wo=900,Yo="20260726-15",Vo="20260726-5",er=[{id:"bundled:wolfy",name:"Wolfy",description:"The original Studierzimmer ocean character.",file_name:"wolfy.glb",asset_source:"bundled",storage_path:null,bundled_path:"wolfy.glb",model_scale:10,camera_distance:70,is_published:!0,is_featured:!0,sort_order:0,created_at:"2026-07-26T00:00:00.000Z",updated_at:"2026-07-26T00:00:00.000Z",public_url:dn("wolfy.glb"),is_virtual:!0},{id:"bundled:pirate-sailing-ship",name:"Pirate sailing ship",description:"A wooden sailing ship with full white sails and a small pirate flag.",file_name:"pirate-sailing-ship.glb",asset_source:"bundled",storage_path:null,bundled_path:"pirate-sailing-ship.glb",model_scale:3.4,camera_distance:105,is_published:!0,is_featured:!1,sort_order:1,created_at:"2026-07-26T00:00:00.000Z",updated_at:"2026-07-26T00:00:00.000Z",public_url:dn("pirate-sailing-ship.glb"),is_virtual:!0},{id:"bundled:cessna-aircraft",name:"Cessna aircraft",description:"A polished light aircraft with a looping animated propeller.",file_name:"cessna-aircraft.glb",asset_source:"bundled",storage_path:null,bundled_path:"cessna-aircraft.glb",model_scale:3.6,camera_distance:100,is_published:!0,is_featured:!1,sort_order:2,created_at:"2026-07-26T00:00:00.000Z",updated_at:"2026-07-26T00:00:00.000Z",public_url:dn("cessna-aircraft.glb"),is_virtual:!0}];function Ge(e,t){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(t)}function dn(e){const t=e.replace(/^\/+/,""),r=t==="pirate-sailing-ship.glb"?`?v=${Yo}`:t==="cessna-aircraft.glb"?`?v=${Vo}`:"";return`/${t}${r}`}async function Vt(e){if(e.asset_source==="bundled"&&e.bundled_path)return{...e,public_url:dn(e.bundled_path)};if(!e.storage_path)throw new Error(`${e.name} has no character file.`);const{data:t,error:r}=await $.storage.from(Gn).createSignedUrl(e.storage_path,Wo);if(r)throw Ge(r,`Unable to authorize ${e.name}.`);return{...e,public_url:t.signedUrl}}function ia(e){const t=new Set(e.filter(r=>r.asset_source==="bundled").map(r=>r.bundled_path));return[...e,...er.filter(r=>!t.has(r.bundled_path))].sort((r,i)=>Number(i.is_featured)-Number(r.is_featured)||r.sort_order-i.sort_order||r.name.localeCompare(i.name))}function Xo(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"character"}function Ho(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function oa(e){const t=e.name.toLowerCase().match(/\.(glb|gltf)$/)?.[1];if(t!=="glb"&&t!=="gltf")throw new Error("Choose a .glb or self-contained .gltf character file.");if(e.size>Fo)throw new Error("The character file is larger than 100 MB.");return t}async function qo(e){if(oa(e)!=="gltf")return;let t;try{t=JSON.parse(await e.text())}catch{throw new Error("The .gltf file is not valid JSON.")}if([...t.buffers??[],...t.images??[]].find(i=>i.uri&&!i.uri.startsWith("data:")&&!i.uri.startsWith("blob:")))throw new Error("This .gltf references external files. Export it as one .glb, or embed every buffer and texture.")}async function sa(e,t,r){const i=oa(t);await qo(t);const o=`${Xo(e)}/${Date.now()}-${Ho()}.${i}`;r?.({percent:12,label:"UPLOADING CHARACTER"});const{error:s}=await $.storage.from(Gn).upload(o,t,{cacheControl:"3600",contentType:i==="glb"?"model/gltf-binary":"model/gltf+json",upsert:!1});if(s)throw Ge(s,`Unable to upload ${t.name}.`);return r?.({percent:82,label:"REGISTERING CHARACTER"}),o}async function gn(e){if(!e)return;const{error:t}=await $.storage.from(Gn).remove([e]);if(t)throw Ge(t,"Unable to remove the previous character file.")}async function Go(){const{data:e,error:t}=await $.from("characters_3d").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(t){if(/characters_3d|schema cache|does not exist/i.test(t.message??""))return er;throw Ge(t,"Unable to load the character list.")}const r=await Promise.all((e??[]).map(Vt));return ia(r)}async function Ls(){const{data:e,error:t}=await $.from("characters_3d").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(t)throw Ge(t,"Unable to load the admin character list.");const r=await Promise.all((e??[]).map(Vt));return ia(r)}async function zs(){const{data:e,error:t}=await $.from("characters_3d").select("bundled_path").eq("asset_source","bundled");if(t)throw Ge(t,"Unable to inspect bundled characters.");const r=new Set((e??[]).map(s=>s.bundled_path)),i=er.filter(s=>!r.has(s.bundled_path)).map(s=>({name:s.name,description:s.description,file_name:s.file_name,asset_source:"bundled",storage_path:null,bundled_path:s.bundled_path,model_scale:s.model_scale,camera_distance:s.camera_distance,is_published:s.is_published,is_featured:s.is_featured&&r.size===0,sort_order:s.sort_order}));if(i.length===0)return;const{error:o}=await $.from("characters_3d").insert(i);if(o)throw Ge(o,"Unable to register bundled characters.")}async function Os(e,t,r,i){const o=e.trim()||t.name.replace(/\.(?:glb|gltf)$/i,""),s=await sa(o,t,i),{data:u,error:l}=await $.from("characters_3d").insert({name:o,description:"",file_name:t.name,asset_source:"storage",storage_path:s,bundled_path:null,model_scale:10,camera_distance:70,is_published:!1,is_featured:!1,sort_order:r}).select("*").single();if(l)throw await gn(s).catch(()=>{}),Ge(l,"Unable to register the character.");return i?.({percent:100,label:"CHARACTER READY"}),Vt(u)}async function Ds(e,t){const{data:r,error:i}=await $.from("characters_3d").update(t).eq("id",e).select("*").single();if(i)throw Ge(i,"Unable to save the character settings.");return Vt(r)}async function Bs(e){const{error:t}=await $.from("characters_3d").update({is_featured:!1}).eq("is_featured",!0);if(t)throw Ge(t,"Unable to clear the featured character.");const{error:r}=await $.from("characters_3d").update({is_featured:!0,is_published:!0}).eq("id",e);if(r)throw Ge(r,"Unable to feature this character.")}async function $s(e,t,r){const i=await sa(e.name,t,r),{data:o,error:s}=await $.from("characters_3d").update({file_name:t.name,asset_source:"storage",storage_path:i,bundled_path:null}).eq("id",e.id).select("*").single();if(s)throw await gn(i).catch(()=>{}),Ge(s,"Unable to replace the character file.");return e.asset_source==="storage"&&await gn(e.storage_path),r?.({percent:100,label:"CHARACTER READY"}),Vt(o)}async function Us(e){if(e.is_virtual||e.asset_source==="bundled")throw new Error("Bundled characters can be replaced, but not deleted.");const{error:t}=await $.from("characters_3d").delete().eq("id",e.id);if(t)throw Ge(t,"Unable to delete the character.");await gn(e.storage_path)}const Cr=[{id:"default-objects",slug:"objects",name:"Objects",code:"OBJ",sort_order:0,is_visible:!0,created_at:"",updated_at:""},{id:"default-graphics",slug:"graphics",name:"Graphics",code:"GRPH",sort_order:1,is_visible:!0,created_at:"",updated_at:""},{id:"default-concepts",slug:"concepts",name:"Concepts",code:"CNCP",sort_order:2,is_visible:!0,created_at:"",updated_at:""}],Zo=`
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
`,we={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode",selectedCharacter:"selectedOceanCharacter"},Ko="Gabriel Dell'Aiuto. b. 1996. Studier Zimmer is a space for G and friends.",Rr="global-spotify-player";function an(e,t=!1){let r=document.getElementById(Rr);if(!(!r&&!e&&!t)){if(!r){r=document.createElement("div"),r.id=Rr,Object.assign(r.style,{position:"fixed",bottom:"194px",left:"50%",width:"min(92vw, 430px)",zIndex:"210",overflow:"hidden",borderRadius:"12px",background:"#e6e6e6",boxShadow:"0 20px 60px rgb(0 0 0 / 0.22)",transformOrigin:"bottom",transition:"opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)"});const i=document.createElement("iframe");i.title="Spotify playlist",i.src="https://open.spotify.com/embed/playlist/5Z63kqzOn4CzWqazejJZEv?utm_source=generator&si=a41c800f68534cb7",i.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",i.allowFullscreen=!0,i.loading="lazy",i.frameBorder="0",Object.assign(i.style,{display:"block",width:"100%",height:"min(352px, calc(100dvh - 218px))",minHeight:"96px",border:"0"}),r.appendChild(i),document.body.appendChild(r)}r.style.pointerEvents=e?"auto":"none",r.style.opacity=e?"1":"0",r.style.transform=e?"translateX(-50%) translateY(0) scale(1)":"translateX(-50%) translateY(16px) scale(0.75)"}}const Jo=()=>{const e=bn(),r=n.useRef(sessionStorage.getItem(Wt)==="true").current,o=n.useRef(sessionStorage.getItem(Ft)==="true"||r||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,u=n.useRef(o&&sessionStorage.getItem(we.returnFlag)==="true").current,[l]=n.useState(()=>vn()),[d,m]=n.useState(o),[h,v]=n.useState([]),[k,x]=n.useState(!0),[y,R]=n.useState(null),[S,U]=n.useState(Cr),[j,w]=n.useState(!1),M=n.useCallback(async()=>{x(!0);try{const c=await Xr();v(c),R(null)}catch(c){console.error("Unable to load published books",c),R(c instanceof Error?c.message:"Unable to load the published books.")}finally{x(!1)}},[]),X=n.useCallback(async()=>{try{const c=await Uo();U(c),w(!0)}catch{U(Cr),w(!1)}},[]);n.useEffect(()=>{M(),X();const c=()=>{M(),X()},b=()=>{document.visibilityState==="visible"&&M()};return window.addEventListener("focus",c),document.addEventListener("visibilitychange",b),()=>{window.removeEventListener("focus",c),document.removeEventListener("visibilitychange",b)}},[X,M]);const T=n.useMemo(()=>h.find(c=>c.is_featured)??h[0]??null,[h]),A=n.useMemo(()=>{if(j)return S;const c=[...S];return h.forEach(b=>{c.some(_=>_.slug===b.category)||c.push({id:`fallback-${b.category}`,slug:b.category,name:b.category.replace(/-/g," "),code:b.category.slice(0,4).toUpperCase(),sort_order:c.length,is_visible:!0,created_at:"",updated_at:""})}),c},[S,j,h]),P=n.useMemo(()=>{const c=new Map(A.map(_=>[_.slug,_])),b=_=>({id:_.id,category:c.get(_.category)?.code??_.category.slice(0,4).toUpperCase(),name:_.title,link:`/book/${encodeURIComponent(_.slug)}`,isFeatured:_.is_featured});return A.reduce((_,G)=>(_[G.slug]=h.filter(Te=>Te.category===G.slug).map(b),_),{})},[A,h]),Z=n.useMemo(()=>Object.values(P).flat(),[P]);n.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const c="__GLOBAL_SKY_OCEAN_BG_ROOT__",b=window,_=document.getElementById("global-sky-ocean-bg");if(b[c]){_&&(_.style.display="block",_.style.zIndex="0");return}const G=document.createElement("div");G.id="global-sky-ocean-bg",Object.assign(G.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(G);const Te=Dr.createRoot(G);Te.render(a.jsx(n.Suspense,{fallback:null,children:a.jsx(Bo,{})})),b[c]=Te},[]);const q=r?"intro":sessionStorage.getItem(we.stage)||"intro",L=sessionStorage.getItem(we.activeButton)||null,fe=sessionStorage.getItem(we.searchOpen)==="true",Ce=sessionStorage.getItem(we.searchQuery)||"",se=sessionStorage.getItem(we.exploreMode)==="true",[F,he]=n.useState(q),[D,be]=n.useState(L),[Me,ae]=n.useState(fe),[te,ue]=n.useState(Ce),[O,de]=n.useState(se),[De,ye]=n.useState(!1),[xe,z]=n.useState(!1),[E,W]=n.useState([]),[pe,ke]=n.useState(!1),[Se,K]=n.useState(null),[Ae,Y]=n.useState(()=>sessionStorage.getItem(we.selectedCharacter)??""),[me,Ze]=n.useState(0),[Re,Ke]=n.useState(null),Ee=q==="list"||!!L||fe,[ce,J]=n.useState(Ee),[ne,I]=n.useState(!1),[Pe,lt]=n.useState(!1),[ve,Je]=n.useState(!1),[Ne,Q]=n.useState(!1);n.useEffect(()=>{if(!Ne||Pe)return;if(o){m(!0);return}m(!1);let c=0;const b=window.requestAnimationFrame(()=>{c=window.requestAnimationFrame(()=>{m(!0)})});return()=>{window.cancelAnimationFrame(b),window.cancelAnimationFrame(c)}},[Ne,o,Pe]);const[Ie,ut]=n.useState(!1),[ge,Be]=n.useState(!1),[Ye,at]=n.useState(!1),[Qe,ht]=n.useState(!1),[it,kt]=n.useState(!u),et=n.useRef(null),[_e,tt]=n.useState(()=>{if(o)return!1;try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),f=n.useRef(null),N=n.useRef(null);n.useEffect(()=>()=>{et.current&&window.clearTimeout(et.current)},[]),n.useEffect(()=>{if(!ve||F!=="intro"||Ye||ge||!_e)return;const c=window.setTimeout(()=>{ht(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(c)}},[Ye,ve,ge,_e,F]),n.useEffect(()=>{if(F!=="main"&&F!=="list"||ge||!_e||it)return;const c=window.setTimeout(()=>{kt(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(c)}},[it,ge,_e,F]);const[C,ee]=n.useState(!1),le=n.useRef(null),p=n.useRef(null),[g,B]=n.useState(!1);n.useEffect(()=>{if(!o)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem(Ft),sessionStorage.removeItem(Wt),sessionStorage.removeItem("revealDone"),tt(!1),ut(!1),document.documentElement.style.background="",document.body.style.background="";const c=document.getElementById("global-sky-ocean-bg");c&&(c.style.display="block",c.style.zIndex="0")},[o]),n.useEffect(()=>{try{sessionStorage.setItem(we.exploreMode,String(O))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:O}}));const c=document.getElementById("global-sky-ocean-bg");c&&c.setAttribute("data-explore",O?"1":"0")},[O]),n.useEffect(()=>{O||(ye(!1),an(!1),z(!1))},[O]);const re=n.useCallback(async()=>{ke(!0),K(null);try{const c=await Go();W(c),Y(b=>b&&c.some(_=>_.id===b)?b:c.find(_=>_.is_featured)?.id??c[0]?.id??"")}catch(c){K(c instanceof Error?c.message:"Unable to load characters.")}finally{ke(!1)}},[]);n.useEffect(()=>{!O||E.length>0||pe||re()},[E.length,pe,O,re]);const ie=n.useMemo(()=>E.find(c=>c.id===Ae)??null,[E,Ae]);n.useEffect(()=>{if(!O||!ie)return;const c=()=>{window.dispatchEvent(new CustomEvent("ocean-character-select",{detail:{character:ie}}))};return c(),window.addEventListener("ocean-character-player-ready",c),()=>{window.removeEventListener("ocean-character-player-ready",c)}},[me,O,ie]),n.useEffect(()=>{const c=b=>{const _=b.detail;_?.id&&Ke(_)};return window.addEventListener("ocean-character-loading",c),()=>{window.removeEventListener("ocean-character-loading",c)}},[]);const $e=n.useCallback(c=>{Y(c.id),Ze(b=>b+1),Ke({id:c.id,percent:0,ready:!1}),sessionStorage.setItem(we.selectedCharacter,c.id)},[]);n.useEffect(()=>(an(!1,!0),()=>{an(!1)}),[]),n.useEffect(()=>{const c=Ne&&!Pe&&!ge;document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active",c?"1":"0");const _=window.setTimeout(()=>{window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:c}}))},0);return()=>window.clearTimeout(_)},[Ne,ge,Pe]),n.useEffect(()=>()=>{document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active","0"),window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:!1}}))},[]),n.useEffect(()=>{sessionStorage.setItem(we.stage,F),sessionStorage.setItem(we.activeButton,D??""),sessionStorage.setItem(we.searchOpen,String(Me)),sessionStorage.setItem(we.searchQuery,te)},[F,D,Me,te]),n.useEffect(()=>{!sessionStorage.getItem(we.splash)&&F==="intro"&&!o?lt(!0):Je(!0),Q(!0)},[o,F]);const Ue=n.useCallback(()=>{sessionStorage.setItem(we.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const c=document.getElementById("global-sky-ocean-bg");c&&(c.style.display="none"),lt(!1),e(T?`/book/${encodeURIComponent(T.slug)}`:"/books")},[T,e]);n.useEffect(()=>{(ve||o)&&!_e&&!Ie&&!ge&&ut(!0)},[ve,o,ge,_e,Ie]);const Le=n.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}f.current?(f.current.classList.add("fade-out"),setTimeout(()=>{ut(!1),tt(!0)},240)):(ut(!1),tt(!0))},[]),Ve=n.useCallback(c=>{ge||(N.current=c,ut(!1),Be(!0))},[ge]),Xe=n.useCallback(()=>{const c=N.current;if(!c)return;document.documentElement.style.background="white",document.body.style.background="white";const b=document.getElementById("global-sky-ocean-bg");b&&(b.style.display="none"),e(c)},[e]),He=n.useCallback(()=>{be(null),ae(!1),ue(""),he("main")},[]),dt=n.useCallback(()=>{J(!1)},[]),ca=n.useCallback(()=>{I(!1),ce&&He(),J(c=>!c),window.dispatchEvent(new Event("mousemove"))},[ce,He]),la=n.useCallback(()=>{if(ne){I(!1);return}He(),J(!1),I(!0),window.dispatchEvent(new Event("mousemove"))},[ne,He]),Xt=n.useMemo(()=>Z.filter(c=>c.name.toLowerCase().includes(te.toLowerCase())),[Z,te]),ua=n.useCallback(()=>{if(D&&D!=="search"&&!te){const c=P[D]||[],b=Z.filter(_=>!c.some(G=>G.id===_.id));return[...c,...b]}if(D==="search"&&te){const c=Xt,b=Z.filter(_=>!c.some(G=>G.id===_.id));return[...c,...b]}return Z},[D,te,P,Z,Xt])(),da=n.useCallback(c=>{D===c?He():(be(c),he("list"),ae(!1),ue(""))},[D,He]),tr=n.useCallback(c=>{const b=p.current?p.current.scrollTop:0;sessionStorage.setItem(we.listScroll,String(b));const _={activeButton:D,searchOpen:Me,searchQuery:te,stage:F,introVisible:ve,archiveOpen:ce};try{sessionStorage.setItem(we.snapshot,JSON.stringify(_))}catch{}sessionStorage.setItem(we.returnFlag,"true"),Ve(c)},[D,ce,Ve,ve,Me,te,F]),nr=n.useCallback(()=>{He(),dt(),I(!1),at(!1),ht(!1),he("intro")},[dt,He]),pa=n.useCallback(()=>{Ye||ge||(at(!0),kt(!1),dt(),I(!1),et.current=window.setTimeout(()=>{he("main"),at(!1)},1160))},[dt,Ye,ge]),ma=n.useCallback(()=>{!l||ge||Ve(`/book/${encodeURIComponent(l.slug)}`)},[Ve,l,ge]),fa=n.useCallback(()=>{D==="search"?He():(ae(!0),he("list"),be("search"))},[D,He]),Ht=n.useCallback(()=>{ee(!1),le.current&&clearTimeout(le.current),le.current=window.setTimeout(()=>{ee(!0)},5e3)},[]);n.useEffect(()=>{const c=["mousemove","mousedown","touchstart","touchmove","keydown"];return c.forEach(b=>{window.addEventListener(b,Ht)}),Ht(),()=>{c.forEach(b=>{window.removeEventListener(b,Ht)}),le.current&&clearTimeout(le.current)}},[Ht]),n.useEffect(()=>{if(!Ne||!(sessionStorage.getItem(we.returnFlag)==="true"))return;let b=null;try{const _=sessionStorage.getItem(we.snapshot);b=_?JSON.parse(_):null}catch{}if(b){be(b.activeButton??null),ae(!!b.searchOpen),ue(b.searchQuery??""),b.archiveOpen||b.stage==="list"?J(!0):J(!1),b.stage&&he(b.stage),Je(!!b.introVisible),b.stage==="list"&&B(!0),sessionStorage.removeItem(we.returnFlag);return}Je(!0),he("main"),J(!0),window.setTimeout(()=>{he("list"),B(!0),sessionStorage.removeItem(we.returnFlag)},700)},[Ne]),n.useEffect(()=>{if(F!=="list"||!g)return;const c=Number(sessionStorage.getItem(we.listScroll)||"0"),b=window.setTimeout(()=>{p.current&&(p.current.scrollTop=Number.isNaN(c)?0:c),B(!1)},0);return()=>{window.clearTimeout(b)}},[F,g]);const ha=n.useRef(null),Pt=n.useRef(null),qt=n.useRef(!1),wn=n.useRef(!1),Gt=n.useRef(!1),Nt=n.useRef(null),yn=n.useRef({x:0,y:0}),Lt=n.useRef({x:0,y:0}),Zt=60,St=n.useCallback((c,b)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:c,z:b}}))},[]),Kt=n.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]),pt=n.useCallback(c=>{window.dispatchEvent(new CustomEvent("explore-vertical",{detail:{y:c}}))},[]),rr=n.useCallback(c=>{window.dispatchEvent(new CustomEvent("explore-roll-step",{detail:{direction:c}}))},[]),ar=n.useCallback((c,b)=>{c.preventDefault(),c.stopPropagation(),c.currentTarget.setPointerCapture(c.pointerId),pt(b)},[pt]),Jt=n.useCallback(c=>{c.preventDefault(),c.stopPropagation(),c.currentTarget.hasPointerCapture(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId),pt(0)},[pt]),ir=n.useCallback((c,b)=>{c.preventDefault(),c.stopPropagation(),c.currentTarget.setPointerCapture(c.pointerId),rr(b)},[rr]),Qt=n.useCallback(c=>{c.preventDefault(),c.stopPropagation(),c.currentTarget.hasPointerCapture(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId)},[]);n.useEffect(()=>{O||(St(0,0),pt(0))},[O,St,pt]),n.useEffect(()=>{if(!O)return;const c=new Set,b=()=>{window.dispatchEvent(new CustomEvent("explore-sprint",{detail:{active:c.size>=2}}))},_=Te=>{Te.pointerType==="touch"&&(c.add(Te.pointerId),b())},G=Te=>{Te.pointerType==="touch"&&(c.delete(Te.pointerId),b())};return window.addEventListener("pointerdown",_,!0),window.addEventListener("pointerup",G,!0),window.addEventListener("pointercancel",G,!0),()=>{window.removeEventListener("pointerdown",_,!0),window.removeEventListener("pointerup",G,!0),window.removeEventListener("pointercancel",G,!0),window.dispatchEvent(new CustomEvent("explore-sprint",{detail:{active:!1}}))}},[O]),n.useEffect(()=>{if(!O)return;const c=_=>{_.code==="Space"&&(_.preventDefault(),_.stopPropagation(),_.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},b=_=>{_.code==="Space"&&(c(_),_.repeat||Kt())};return window.addEventListener("keydown",b,!0),window.addEventListener("keyup",c,!0),()=>{window.removeEventListener("keydown",b,!0),window.removeEventListener("keyup",c,!0)}},[O,Kt]);const ga=n.useCallback(c=>{if(!O||Nt.current!==null)return;Nt.current=c.pointerId,qt.current=!0,c.currentTarget.setPointerCapture(c.pointerId);const b=c.currentTarget.getBoundingClientRect();Lt.current={x:b.left+b.width/2,y:b.top+b.height/2},yn.current={x:c.clientX,y:c.clientY},Gt.current=!1,wn.current=Math.hypot(c.clientX-Lt.current.x,c.clientY-Lt.current.y)<=34},[O]),ba=n.useCallback(c=>{if(!qt.current||Nt.current!==c.pointerId||!Pt.current)return;const b=c.clientX-Lt.current.x,_=c.clientY-Lt.current.y;Math.hypot(c.clientX-yn.current.x,c.clientY-yn.current.y)>8&&(Gt.current=!0);const G=Math.hypot(b,_),Te=G>Zt?Zt:G,cr=b/(G||1)*Te,lr=_/(G||1)*Te;Pt.current.style.transform=`translate(${cr}px, ${lr}px)`;const va=cr/Zt,wa=-lr/Zt;St(va,wa)},[St]),or=n.useCallback(c=>{!qt.current||Nt.current!==c.pointerId||(qt.current=!1,Nt.current=null,c.currentTarget.hasPointerCapture(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId),Pt.current&&(Pt.current.style.transform="translate(0px, 0px)"),St(0,0),c.type!=="pointercancel"&&wn.current&&!Gt.current&&Kt(),wn.current=!1,Gt.current=!1)},[St,Kt]),xa=n.useCallback(c=>!!(D&&D!=="search"&&P[D]?.some(b=>b.id===c.id)||D==="search"&&te&&Xt.some(b=>b.id===c.id)),[D,P,Xt,te]),kn=ve&&F==="intro"?ge||Ye?"is-leaving":_e?Qe?"is-visible":"is-entering":"is-outside":"is-outside",sr=(F==="main"||F==="list")&&ge?"is-leaving":_e?it?"is-visible":"is-entering":"is-outside",en=F==="main"||F==="list"?sr:"is-outside",Sn=F==="list"?"-15vh":ce||ne?"-42px":"0px",Et=A.length+3,tn=c=>({animate:{y:F==="main"||F==="list"?Sn:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:c*.025}}),zt=(c,b=Et)=>{const _=c*.055,G=Math.max(0,b-1-c)*.035,Te={scale:0,opacity:0,filter:"blur(8px)",y:Sn};return{initial:Te,animate:ge?{...Te,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:G},opacity:{duration:.16,delay:G},filter:{duration:.2,delay:G},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:G}}}:{scale:1,opacity:1,filter:"blur(0px)",y:Sn},exit:{...Te,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:G},opacity:{duration:.16,delay:G},filter:{duration:.2,delay:G},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:G}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:_},opacity:{duration:.2,delay:_},filter:{duration:.25,delay:_},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:c*.025}}}};return Ne?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:Zo}),Pe?a.jsx(uo,{onComplete:Ue}):a.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${o?"is-returning-from-book":d?"is-entered":"is-entering"}`,children:[a.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:C?0:1},children:[a.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${ve&&F==="intro"?"":"pointer-events-none"} ${O?"opacity-0 pointer-events-none":"opacity-100"}`,children:[a.jsxs("p",{className:`index-intro-copy intro-elastic-item ${kn} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:nr,children:["Studierzimmer-Ozean",a.jsx("br",{}),"studierzimmer.ch",a.jsx("br",{})]}),a.jsxs("div",{className:"flex items-center justify-center gap-2",children:[a.jsx("button",{onClick:ma,disabled:!Qe||Ye,className:`index-intro-control intro-elastic-item item-start ${kn} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:a.jsx("span",{className:"animate-bounce",children:"back"})}),l&&a.jsx("button",{type:"button",onClick:pa,disabled:!Qe||ge,className:`index-intro-control intro-elastic-item item-back ${kn} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:"start"})]})]}),a.jsxs("div",{className:`absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl ${F==="intro"?"pointer-events-none":""}`,style:{top:"calc(50% - 24px)"},children:[a.jsxs("div",{className:"index-main-control-row flex min-h-12 items-center justify-center gap-5 text-[16px] font-normal md:gap-10 md:text-[16px]",children:[a.jsx(ze.div,{...tn(0),children:a.jsx("div",{className:`main-control-item item-back ${en}`,children:a.jsx("button",{onClick:nr,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${O?"pointer-events-none opacity-0":"opacity-100"}`,children:"back"})})}),a.jsx(ze.div,{...tn(1),children:a.jsx("div",{className:`main-control-item item-archive ${en}`,children:a.jsx("button",{type:"button",onClick:ca,"aria-expanded":ce,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${ce?"animate-bounce":""} ${O?"pointer-events-none opacity-0":"opacity-100"}`,children:"archive"})})}),a.jsx(ze.div,{...tn(2),children:a.jsx("div",{className:`main-control-item item-about ${en}`,children:a.jsx("button",{type:"button",onClick:la,"aria-expanded":ne,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${ne?"animate-bounce":""} ${O?"pointer-events-none opacity-0":"opacity-100"}`,children:"about"})})}),a.jsx(ze.div,{...tn(3),children:a.jsx("div",{className:`main-control-item item-play ${en}`,children:a.jsxs("button",{onClick:c=>{c.currentTarget.blur(),de(b=>!b)},title:O?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${O?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[a.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${O?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[a.jsx("circle",{cx:"12",cy:"12",r:"9"}),a.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),a.jsx("span",{className:`whitespace-nowrap font-normal transition-all ${O?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"play"})]})})})]}),a.jsx(_n,{initial:!1,mode:"wait",children:ce?a.jsxs(ze.div,{initial:!1,className:`index-archive-panel mx-auto mt-10 pb-0 text-center font-normal leading-[2] transition-opacity duration-500 ${O?"pointer-events-none opacity-0":"opacity-100"}`,children:[a.jsx(ze.div,{...zt(0,Et),className:"index-archive-featured archive-elastic-item item-featured min-h-[32px] text-[16px] md:text-[16px]",children:T?a.jsxs("button",{type:"button",onClick:()=>tr(`/book/${encodeURIComponent(T.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[a.jsx("span",{className:"shrink-0 text-black",children:"cover"})," ",a.jsx("br",{})," ",a.jsx("br",{}),a.jsx("br",{}),a.jsx("span",{className:"truncate",children:T.title})]}):k?a.jsx("span",{className:"text-black/50",children:"..."}):y?a.jsx("button",{type:"button",onClick:()=>void M(),className:"text-black/60 bounce",children:"RETRY BOOK LIST"}):a.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),a.jsxs("div",{className:"index-archive-category-row flex flex-wrap items-center justify-center gap-2 uppercase md:gap-3",children:[a.jsx(ze.div,{...zt(1,Et),className:"archive-elastic-item item-search",children:a.jsx("button",{onClick:fa,className:`index-archive-category-button z-10 flex items-center text-[16px] font-normal select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${D==="search"?"animate-bounce":"bg-alpha"}`,children:"search"})}),A.map((c,b)=>a.jsx(ze.div,{...zt(b+2,Et),className:`archive-elastic-item item-${c.slug}`,children:a.jsx("button",{onClick:()=>{da(c.slug)},className:`index-archive-category-button text-[16px] font-normal uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${D===c.slug?"animate-bounce":"bg-alpha"}`,children:c.name})},c.id))]}),a.jsx(ze.div,{...zt(Et-1,Et),className:"index-archive-search-field archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:a.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${Me?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:a.jsx("input",{type:"text",placeholder:"search...",value:te,onChange:c=>{ue(c.target.value)},className:"index-archive-search-input w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls"):ne?a.jsx(ze.div,{initial:!1,className:`mx-auto mt-10 max-w-xl pb-0 text-center leading-[1.55] ${O?"pointer-events-none opacity-0":"opacity-100"}`,children:a.jsx(ze.div,{...zt(0,2),className:"index-about-panel archive-elastic-item px-2 text-[16px] font-normal md:text-[16px]",children:a.jsx("p",{children:Ko})})},"about-panel"):null})]}),a.jsx("div",{className:`index-list-panel ${F==="list"?"is-list-open":"is-list-closed"} absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] font-normal md:text-[16px] ease-in-out ${F==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${O?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:a.jsxs("div",{className:`index-elastic-item item-list ${sr}`,children:[a.jsxs("div",{className:"index-list-header grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] font-normal md:text-[16px]",children:[a.jsx("div",{className:"py-[0.5px]",children:"TAG"}),a.jsx("div",{className:"py-[0.5px]",children:"TITLE"})]}),!k&&!y&&Z.length===0?a.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):a.jsx("div",{ref:p,className:"index-list-scroll overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:a.jsx(_n,{initial:!1,mode:"popLayout",children:ua.map((c,b)=>{const _=xa(c);return a.jsxs(ze.div,{initial:{scale:0,opacity:0,filter:"blur(7px)"},animate:{scale:1,opacity:1,filter:"blur(0px)"},exit:{scale:0,opacity:0,filter:"blur(7px)"},whileHover:{scale:.97},whileTap:{scale:.95},transition:{scale:{type:"spring",stiffness:430,damping:23,mass:.68,delay:b*.022},opacity:{duration:.18,delay:b*.022},filter:{duration:.22,delay:b*.022}},className:`index-list-row grid origin-center grid-cols-2 text-[16px] md:text-[16px] backdrop-blur-[1px] cursor-pointer ${_?"text-black":"text-gray-700"}`,onClick:()=>{tr(c.link)},children:[a.jsx("div",{className:"py-[0.5px] tracking-normal",children:c.category}),a.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[c.name,c.isFeatured?" *":""]})]},`${D??"all"}:${c.id}`)})})})]})})]}),O&&a.jsxs(a.Fragment,{children:[a.jsx(_n,{children:xe&&a.jsx(ze.section,{"data-ocean-control":!0,"aria-label":"Choose a character",initial:{opacity:0,scale:.45,y:24,filter:"blur(8px)"},animate:{opacity:1,scale:1,y:0,filter:"blur(0px)"},exit:{opacity:0,scale:.45,y:24,filter:"blur(8px)"},transition:{scale:{type:"spring",stiffness:410,damping:24,mass:.74},opacity:{duration:.2},filter:{duration:.22}},className:"fixed bottom-[178px] left-1/2 max-h-[min(48dvh,390px)] w-[min(88vw,430px)] -translate-x-1/2 overflow-y-auto rounded-[28px] bg-[#d7d7d7]/90 px-5 py-4 text-black shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl no-scrollbar",style:{zIndex:24},children:pe?a.jsx("p",{className:"py-5 text-center text-[15px]",children:"..."}):Se?a.jsxs("button",{type:"button",onClick:()=>void re(),className:"w-full py-5 text-center text-[13px] text-black/65",children:[Se," — RETRY"]}):a.jsx("div",{className:"flex flex-col",children:E.map((c,b)=>{const _=c.id===Ae,G=Re?.id===c.id&&!Re.ready&&!Re.error,Te=G?Re.percent:_?100:0;return a.jsxs(ze.button,{type:"button",onClick:()=>$e(c),initial:{opacity:0,scale:.7},animate:{opacity:1,scale:1},transition:{type:"spring",stiffness:420,damping:25,delay:b*.045},className:`origin-center rounded-[18px] px-4 py-3 text-left transition-colors ${_?"bg-black text-white":"bg-transparent text-black/58 hover:text-black"}`,children:[a.jsx("span",{className:"block text-[15px] font-normal uppercase",children:c.name}),c.description&&a.jsx("span",{className:`mt-1 block text-[12px] leading-[1.35] ${_?"text-white/68":"text-black/48"}`,children:c.description}),(G||Re?.error)&&Re?.id===c.id&&a.jsxs("span",{className:"mt-3 block",children:[a.jsx("span",{className:`mb-1 block text-[11px] ${_?"text-white/70":"text-black/50"}`,children:Re.error??`${Math.round(Te)}%`}),!Re.error&&a.jsx("span",{className:`block h-[3px] overflow-hidden rounded-full ${_?"bg-white/20":"bg-black/10"}`,children:a.jsx(ze.span,{className:`block h-full origin-left rounded-full ${_?"bg-white":"bg-black"}`,animate:{scaleX:Te/100},transition:{type:"spring",stiffness:180,damping:25}})})]})]},c.id)})})},"ocean-character-selector")}),a.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move down (Q)",onPointerDown:c=>ar(c,-1),onPointerUp:Jt,onPointerCancel:Jt,onLostPointerCapture:()=>pt(0),className:"fixed bottom-[57px] flex h-14 w-14 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border-0 bg-white/5 text-[15px] font-normal text-white/55 shadow-sm backdrop-blur-sm",style:{left:"calc(50% - 92px)",zIndex:20},children:"Q ↓"}),a.jsx("div",{ref:ha,"data-ocean-control":!0,onPointerDown:ga,onPointerMove:ba,onPointerUp:or,onPointerCancel:or,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[35px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:a.jsx("div",{ref:Pt,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:a.jsx("span",{"aria-hidden":"true",children:"↑"})})}),a.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move up (E)",onPointerDown:c=>ar(c,1),onPointerUp:Jt,onPointerCancel:Jt,onLostPointerCapture:()=>pt(0),className:"fixed bottom-[57px] flex h-14 w-14 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border-0 bg-white/5 text-[15px] font-normal text-white/55 shadow-sm backdrop-blur-sm",style:{left:"calc(50% + 92px)",zIndex:20},children:"E ↑"}),a.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":xe?"Close character selector":"Choose character","aria-expanded":xe,onClick:()=>z(c=>!c),className:`fixed bottom-[122px] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-0 bg-white/5 text-[15px] font-normal text-white/55 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-white/10 active:scale-95 ${xe?"scale-110":""}`,style:{left:"calc(50% - 61px)",zIndex:22},children:"P"}),a.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":De?"Close music":"Open music","aria-expanded":De,onClick:()=>{ye(c=>(an(!c),!c))},className:`fixed bottom-[122px] left-[calc(50%+61px)] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-0 bg-white/5 text-white/55 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-white/10 active:scale-95 ${De?"scale-110":""}`,style:{zIndex:22},children:a.jsxs("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",className:"h-5 w-5",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M9 18V5l10-2v13"}),a.jsx("circle",{cx:"6",cy:"18",r:"3"}),a.jsx("circle",{cx:"16",cy:"16",r:"3"})]})}),a.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Roll counter-clockwise (Z)",onPointerDown:c=>ir(c,-1),onPointerUp:Qt,onPointerCancel:Qt,className:"fixed bottom-0 flex h-12 w-12 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border-0 bg-white/5 text-[15px] font-normal text-white/55 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-white/10 active:scale-95",style:{left:"calc(50% - 61px)",zIndex:22},children:"Z"}),a.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Roll clockwise (X)",onPointerDown:c=>ir(c,1),onPointerUp:Qt,onPointerCancel:Qt,className:"fixed bottom-0 flex h-12 w-12 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border-0 bg-white/5 text-[15px] font-normal text-white/55 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-white/10 active:scale-95",style:{left:"calc(50% + 61px)",zIndex:22},children:"X"})]}),(!_e&&(Ie||o)||ge)&&a.jsx("div",{ref:f,className:"reveal-overlay","aria-hidden":"true",children:a.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[a.jsx("defs",{children:a.jsxs("mask",{id:"hole-mask",children:[a.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),a.jsx("circle",{className:`mask-circle ${ge?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:ge?Xe:Le})]})}),a.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},Qo=`
.privacy-consent-panel,
.privacy-consent-control {
  font-weight: 400;
}

.privacy-consent-panel {
  left: max(12px, env(safe-area-inset-left));
  right: max(12px, env(safe-area-inset-right));
  bottom: max(12px, env(safe-area-inset-bottom));
  max-width: 760px;
  margin-inline: auto;
  border: 1px solid rgb(0 0 0 / 0.2);
  background: rgb(230 230 230 / 0.98);
  box-shadow: 0 18px 55px rgb(0 0 0 / 0.14);
  opacity: 0;
  transform: translate3d(0, 24px, 0) scale(0.97);
  animation: privacy-consent-enter 620ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both;
}

.privacy-consent-action {
  min-height: 38px;
  border: 1px solid rgb(0 0 0 / 0.38);
  padding: 8px 13px;
  background: transparent;
  color: black;
  font-size: 11px;
  letter-spacing: 0.06em;
  transition:
    color 220ms ease,
    background-color 220ms ease,
    transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.privacy-consent-action:hover,
.privacy-consent-action:focus-visible,
.privacy-consent-action.is-selected {
  background: black;
  color: white;
}

.privacy-consent-action:active {
  transform: scale(0.98);
}

.privacy-consent-control {
  right: max(12px, env(safe-area-inset-right));
  bottom: max(10px, env(safe-area-inset-bottom));
  border: 0;
  outline: none;
  background: transparent;
  color: rgb(0 0 0 / 0.58);
  font-size: 10px;
  letter-spacing: 0.08em;
}

.privacy-consent-control:hover,
.privacy-consent-control:focus-visible {
  color: black;
  text-decoration: underline;
  text-underline-offset: 4px;
}

@keyframes privacy-consent-enter {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@media (max-width: 560px) {
  .privacy-consent-panel {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .privacy-consent-panel {
    animation-duration: 1ms;
    animation-delay: 0ms;
  }
}
`;function es(e){return e==="navigation_click"||e==="book_open"||e==="book_page_view"||e==="model_open"||e==="model_interaction"||e==="archive_filter"||e==="outbound_click"}function ts(e){return e==="navigation"||e==="book"||e==="book_page"||e==="model"||e==="archive"||e==="external"||e==="interface"}function ns(){const e=Br(),[t,r]=n.useState(()=>Dn()),[i,o]=n.useState(t===null),[s,u]=n.useState(!1),l=n.useCallback(d=>{$i(d),r(d),o(!1),u(!1)},[]);return n.useEffect(()=>{const d=m=>{const h=m.detail;r(h)};return window.addEventListener(Ln,d),()=>window.removeEventListener(Ln,d)},[]),n.useEffect(()=>{t==="analytics"&&Ut({eventName:"page_view",path:e.pathname})},[t,e.pathname]),n.useEffect(()=>{const d=m=>{if(Dn()!=="analytics")return;const h=m.target instanceof Element?m.target.closest("[data-analytics-event]"):null;if(!h)return;const v=h.dataset.analyticsEvent,k=h.dataset.analyticsType,x=h.dataset.analyticsId;!es(v)||!ts(k)||!x||Ut({eventName:v,targetType:k,targetId:x})};return document.addEventListener("click",d,!0),()=>document.removeEventListener("click",d,!0)},[]),a.jsxs(a.Fragment,{children:[a.jsx("style",{children:Qo}),i?a.jsxs("aside",{className:"privacy-consent-panel fixed z-[400] p-5",role:"dialog","aria-modal":"false","aria-labelledby":"privacy-consent-title",children:[a.jsxs("div",{className:"flex items-start justify-between gap-5",children:[a.jsxs("div",{children:[a.jsx("h2",{id:"privacy-consent-title",className:"text-[15px] tracking-[0.06em]",children:"PRIVACY SETTINGS"}),a.jsx("p",{className:"mt-3 max-w-[66ch] text-[12px] leading-relaxed text-black/62",children:"Optional first-party analytics help understand visits, page views and named interface clicks. The analytics table stores a random session ID, page path, device category and referring host—never email, full URLs, free text or a persistent visitor profile."})]}),t!==null&&a.jsx("button",{type:"button",className:"border-0 bg-transparent px-1 text-[16px]",onClick:()=>o(!1),"aria-label":"Close privacy settings",children:"×"})]}),a.jsx("button",{type:"button",className:"mt-3 border-0 bg-transparent p-0 text-[11px] underline underline-offset-4",onClick:()=>u(d=>!d),"aria-expanded":s,children:s?"HIDE DETAILS":"COOKIE & ANALYTICS DETAILS"}),s&&a.jsxs("div",{className:"mt-3 grid gap-3 text-[11px] leading-relaxed text-black/58 sm:grid-cols-2",children:[a.jsx("p",{children:"NECESSARY: remembers this privacy choice locally for 180 days. It does not collect usage statistics."}),a.jsx("p",{children:"ANALYTICS: creates a new random ID for this browser session and sends only the limited first-party events described above."})]}),a.jsxs("div",{className:"mt-5 grid gap-2 sm:grid-cols-2",children:[a.jsx("button",{type:"button",className:`privacy-consent-action ${t==="necessary"?"is-selected":""}`,onClick:()=>l("necessary"),children:"NECESSARY ONLY"}),a.jsx("button",{type:"button",className:`privacy-consent-action ${t==="analytics"?"is-selected":""}`,onClick:()=>l("analytics"),children:"ALLOW ANALYTICS"})]})]}):null]})}const rs=n.lazy(()=>ft(()=>import("./AdminPortal-C-X2jsgS.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),as=n.lazy(()=>ft(()=>import("./Archive-CIp_Av55.js"),__vite__mapDeps([9,10,1,2,6,4,5,7]))),is=n.lazy(()=>ft(()=>import("./object01-CiIFJmqO.js"),__vite__mapDeps([11,10,1,2]))),os=n.lazy(()=>ft(()=>import("./Message-GYpf6CsC.js"),__vite__mapDeps([12,1,2,7,4,5,6]))),ss=n.lazy(()=>ft(()=>import("./NotFound-DEt-LyGM.js"),__vite__mapDeps([13,1,2]))),cs=n.lazy(()=>ft(()=>import("./WatchStudio-Cq8grT_r.js"),__vite__mapDeps([8,1,2,4,5,3,7,6]))),ls=new ja,Tr=()=>{const e=bn(),t=()=>{window.sessionStorage.setItem(Ft,"true"),window.sessionStorage.setItem(Wt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.removeItem("returnFromExample"),e("/")};return a.jsx(rs,{onBack:()=>e("/"),onNavigate:t,onLibrary:()=>{const r=vn();e(r?`/book/${encodeURIComponent(r.slug)}`:"/books")},onModels:()=>e("/3d")})},Ir=()=>{const e=bn(),{slug:t}=za();return a.jsx(io,{initialSlug:t??null,onBack:()=>e("/"),onLogin:()=>e("/login"),onThreeD:()=>e("/3d"),onBookChange:r=>{e(`/book/${encodeURIComponent(r)}`,{replace:!0})}})},us=()=>{const e=bn();return a.jsx(cs,{onNavigate:()=>e("/"),onLogin:()=>e("/login"),onBack:()=>{const t=vn();e(t?`/book/${encodeURIComponent(t.slug)}`:"/books")}})},ds=()=>{const{pathname:e}=Br(),t=e==="/";return a.jsxs("div",{className:`fixed inset-0 overflow-hidden ${t?"bg-transparent":"bg-white dark:bg-black"}`,children:[a.jsx(gi,{}),a.jsx(bi,{}),a.jsx(ns,{}),a.jsx(n.Suspense,{fallback:a.jsx("div",{className:"fixed inset-0 bg-white"}),children:a.jsxs(La,{children:[a.jsx(ot,{path:"/",element:a.jsx(Jo,{})}),a.jsx(ot,{path:"/archive",element:a.jsx(as,{})}),a.jsx(ot,{path:"/message",element:a.jsx(os,{})}),a.jsx(ot,{path:"/object01",element:a.jsx(is,{})}),a.jsx(ot,{path:"/login",element:a.jsx(Tr,{})}),a.jsx(ot,{path:"/admin",element:a.jsx(Tr,{})}),a.jsx(ot,{path:"/3d",element:a.jsx(us,{})}),a.jsx(ot,{path:"/books",element:a.jsx(Ir,{})}),a.jsx(ot,{path:"/book/:slug",element:a.jsx(Ir,{})}),a.jsx(ot,{path:"*",element:a.jsx(ss,{})})]})})]})},ps=()=>a.jsx(Pa,{client:ls,children:a.jsx(oo,{children:a.jsx(xi,{children:a.jsx(Na,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:a.jsx(ds,{})})})})}),Mr=sessionStorage.getItem("redirect");Mr&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",Mr));Dr.createRoot(document.getElementById("root")).render(a.jsx(ps,{}));export{Cr as D,ys as M,Ki as S,As as a,js as b,Os as c,Us as d,zs as e,Ps as f,Ns as g,$ as h,ks as i,mt as j,Ri as k,Ls as l,Ss as m,Es as n,_s as o,Cs as p,Rs as q,$s as r,Bs as s,Ts as t,Ds as u,Is as v,Zi as w,Ms as x,pi as y};
