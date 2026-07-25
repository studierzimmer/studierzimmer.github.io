const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-WFByE82S.js","assets/vendor-FJugjbCd.js","assets/three-O18aLqgg.js","assets/AdminThreeDModelManager-1RTGXGsF.js","assets/react-three-Cf3ZNpbQ.js","assets/postprocessing-dT4kHdQ4.js","assets/motion-Cje7NOoT.js","assets/supabase-BUBRDUZV.js","assets/WatchStudio-BylKRp0w.js","assets/Archive-CJvDkjhx.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-BNZCARU0.js","assets/Message-BkGf9YOQ.js","assets/NotFound-DU0B5EKs.js"])))=>i.map(i=>d[i]);
var $r=Object.defineProperty;var Fr=(e,t,i)=>t in e?$r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var He=(e,t,i)=>Fr(e,typeof t!="symbol"?t+"":t,i);import{r as n,ay as Ur,az as Wr,j as r,aA as cr,aB as lr,aC as ur,aD as dr,aE as Yr,aF as mr,aG as pr,aH as Vr,aI as Xr,aJ as Hr,aK as qr,aL as fr,aM as Gr,aN as Kr,aO as bn,aP as nn,ar as hr,aQ as gr,aR as Zr,aS as Jr,aT as Qr,aU as ei,aV as Ge,aW as ti}from"./vendor-FJugjbCd.js";import{_ as ct,u as ni,a as rn,C as ri,b as pt,c as nt,S as ii,d as jn,W as ai,e as si}from"./react-three-Cf3ZNpbQ.js";import{c as oi}from"./supabase-BUBRDUZV.js";import{u as ln,a as yt,m as Le,A as Un}from"./motion-Cje7NOoT.js";import{V as ae,u as Pt,D as ci,R as li,g as ui,L as xn,C as di,b2 as Tn,Y as pe,k as mi,ba as pi,aG as Mn,y as fi,aH as hi,Z as un,c as br,aA as In,a8 as Pn,P as gi,Q as Mt,af as bi,M as At,aT as xi,m as vi,ab as yi,bb as wi,a7 as ki,aI as Si}from"./three-O18aLqgg.js";import"./postprocessing-dT4kHdQ4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}})();const Ei=1,Ci=1e6;let dn=0;function _i(){return dn=(dn+1)%Number.MAX_SAFE_INTEGER,dn.toString()}const mn=new Map,Wn=e=>{if(mn.has(e))return;const t=setTimeout(()=>{mn.delete(e),It({type:"REMOVE_TOAST",toastId:e})},Ci);mn.set(e,t)},Ri=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,Ei)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(i=>i.id===t.toast.id?{...i,...t.toast}:i)};case"DISMISS_TOAST":{const{toastId:i}=t;return i?Wn(i):e.toasts.forEach(a=>{Wn(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,open:!1}:a)}}case"REMOVE_TOAST":return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(i=>i.id!==t.toastId)}}},Xt=[];let Ht={toasts:[]};function It(e){Ht=Ri(Ht,e),Xt.forEach(t=>{t(Ht)})}function ji({...e}){const t=_i(),i=s=>It({type:"UPDATE_TOAST",toast:{...s,id:t}}),a=()=>It({type:"DISMISS_TOAST",toastId:t});return It({type:"ADD_TOAST",toast:{...e,id:t,open:!0,onOpenChange:s=>{s||a()}}}),{id:t,dismiss:a,update:i}}function Ti(){const[e,t]=n.useState(Ht);return n.useEffect(()=>(Xt.push(t),()=>{const i=Xt.indexOf(t);i>-1&&Xt.splice(i,1)}),[e]),{...e,toast:ji,dismiss:i=>It({type:"DISMISS_TOAST",toastId:i})}}function ft(...e){return Ur(Wr(e))}const Mi=Xr,xr=n.forwardRef(({className:e,...t},i)=>r.jsx(cr,{ref:i,className:ft("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...t}));xr.displayName=cr.displayName;const Ii=Vr("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),vr=n.forwardRef(({className:e,variant:t,...i},a)=>r.jsx(lr,{ref:a,className:ft(Ii({variant:t}),e),...i}));vr.displayName=lr.displayName;const Pi=n.forwardRef(({className:e,...t},i)=>r.jsx(ur,{ref:i,className:ft("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",e),...t}));Pi.displayName=ur.displayName;const yr=n.forwardRef(({className:e,...t},i)=>r.jsx(dr,{ref:i,className:ft("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...t,children:r.jsx(Yr,{className:"h-4 w-4"})}));yr.displayName=dr.displayName;const wr=n.forwardRef(({className:e,...t},i)=>r.jsx(mr,{ref:i,className:ft("text-sm font-semibold",e),...t}));wr.displayName=mr.displayName;const kr=n.forwardRef(({className:e,...t},i)=>r.jsx(pr,{ref:i,className:ft("text-sm opacity-90",e),...t}));kr.displayName=pr.displayName;function Ai(){const{toasts:e}=Ti();return r.jsxs(Mi,{children:[e.map(function({id:t,title:i,description:a,action:s,...o}){return r.jsxs(vr,{...o,children:[r.jsxs("div",{className:"grid gap-1",children:[i&&r.jsx(wr,{children:i}),a&&r.jsx(kr,{children:a})]}),s,r.jsx(yr,{})]},t)}),r.jsx(xr,{})]})}const Ni=({...e})=>{const{theme:t="system"}=Hr();return r.jsx(qr,{theme:t,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})},Oi=Gr,Li=n.forwardRef(({className:e,sideOffset:t=4,...i},a)=>r.jsx(fr,{ref:a,sideOffset:t,className:ft("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...i}));Li.displayName=fr.displayName;const zi="https://pmpspnvfgkzprgntihtx.supabase.co",Bi="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",Nt="book-pages",_s="models-3d",H=oi(zi,Bi,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),Di=50*1024*1024;function Me(e,t){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(t)}function $i(e){const{data:t}=H.storage.from(Nt).getPublicUrl(e);return t.publicUrl}function Fi(e){return{...e,public_url:$i(e.storage_path)}}function Ui(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function Wi(e){if(e.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const t of e){const i=t.name.toLowerCase(),a=i.endsWith(".jpg")||i.endsWith(".jpeg"),s=t.type==="image/jpeg"||t.type==="";if(!a||!s)throw new Error(`${t.name} is not a JPG/JPEG image.`);if(t.size>Di)throw new Error(`${t.name} is larger than 50 MB.`)}}function Yi(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function Vi(){const{data:e,error:t}=await H.rpc("is_admin");if(t)throw Me(t,"Unable to verify administrator access.");return e===!0}async function Sr(){const{data:e,error:t}=await H.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(t)throw Me(t,"Unable to load books.");return e??[]}async function Rs(){const{data:e,error:t}=await H.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(t)throw Me(t,"Unable to load the admin book list.");return e??[]}async function ot(e){const{data:t,error:i}=await H.from("book_pages").select("*").eq("book_id",e).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(i)throw Me(i,"Unable to load the book pages.");return(t??[]).map(Fi)}async function js(e){const t=Yi(e.slug);if(!t)throw new Error("The book needs a valid slug.");const{data:i,error:a}=await H.from("books").insert({title:e.title.trim(),slug:t,storage_folder:t,category:e.category,description:e.description?.trim()??"",is_published:e.is_published??!1,is_featured:!1,sort_order:e.sort_order??0}).select("*").single();if(a)throw Me(a,"Unable to create the book.");return i}async function Ts(e,t){const{data:i,error:a}=await H.from("books").update(t).eq("id",e).select("*").single();if(a)throw Me(a,"Unable to save the book.");return i}async function Ms(e){const{error:t}=await H.rpc("set_featured_book",{p_book_id:e});if(t)throw Me(t,"Unable to set the featured book.")}async function Is(e,t,i){const a=[...t].sort((u,m)=>u.name.localeCompare(m.name,void 0,{numeric:!0,sensitivity:"base"}));Wi(a);let o=(await ot(e.id)).reduce((u,m)=>Math.max(u,m.page_number),0)+1,d=0;for(const u of a){const m=`${e.storage_folder}/${String(o).padStart(4,"0")}-${Ui()}.jpg`,{error:f}=await H.storage.from(Nt).upload(m,u,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(f)throw Me(f,`Unable to upload ${u.name}.`);const{error:g}=await H.from("book_pages").insert({book_id:e.id,storage_path:m,file_name:u.name,page_number:o});if(g)throw await H.storage.from(Nt).remove([m]),Me(g,`Unable to register ${u.name}.`);o+=1,d+=1,i?.(d,a.length)}return ot(e.id)}async function Xi(e){const i=(await ot(e)).map((o,d)=>({page:o,nextNumber:d+1})).filter(({page:o,nextNumber:d})=>o.page_number!==d).map(({page:o,nextNumber:d})=>H.from("book_pages").update({page_number:d}).eq("id",o.id)),s=(await Promise.all(i)).find(o=>o.error);if(s?.error)throw Me(s.error,"Unable to renumber the pages.")}async function Ps(e){const{error:t}=await H.storage.from(Nt).remove([e.storage_path]);if(t)throw Me(t,"Unable to delete the image from Storage.");const{error:i}=await H.from("book_pages").delete().eq("id",e.id);if(i)throw Me(i,"The image was removed, but its database row remains.");await Xi(e.book_id)}async function As(e,t,i){const a=t+i;if(t<0||a<0||a>=e.length)return e;const s=e[t],o=e[a],{error:d}=await H.rpc("swap_book_pages",{p_first_page_id:s.id,p_second_page_id:o.id});if(d)throw Me(d,"Unable to reorder the pages.");return ot(s.book_id)}async function Ns(e){const i=(await ot(e.id)).map(s=>s.storage_path);if(i.length>0){const{error:s}=await H.storage.from(Nt).remove(i);if(s)throw Me(s,"Unable to delete this book's image folder.")}const{error:a}=await H.from("books").delete().eq("id",e.id);if(a)throw Me(a,"Unable to delete the book record.")}function An(e,t){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(t)}function Hi(e){const t=typeof e=="object"&&e&&"message"in e?String(e.message):String(e);return/book_comments|schema cache|does not exist|could not find/i.test(t)}async function Yn(e){const{data:t,error:i}=await H.from("book_comments").select("*").eq("book_id",e).eq("is_visible",!0).order("created_at",{ascending:!0});if(i){if(Hi(i))return console.info("Book comments are disabled until the book_comments SQL migration is run."),[];throw An(i,"Unable to load book comments.")}return t??[]}async function qi(e){const t=e.body.trim();if(!t)throw new Error("Write a comment first.");if(t.length>600)throw new Error("Comments can contain at most 600 characters.");const{data:i,error:a}=await H.auth.getUser();if(a||!i.user)throw new Error("Administrator login required.");const{data:s,error:o}=await H.from("book_comments").insert({book_id:e.bookId,book_page_id:e.bookPageId,body:t,anchor_x:Math.min(1,Math.max(0,e.anchorX)),anchor_y:Math.min(1,Math.max(0,e.anchorY)),created_by:i.user.id,is_visible:!0}).select("*").single();if(o)throw An(o,"Unable to create the comment. Run the book comments SQL migration first.");return s}async function Gi(e){const{error:t}=await H.from("book_comments").delete().eq("id",e);if(t)throw An(t,"Unable to delete the comment.")}const qt="studierzimmer_analytics_consent_v1",vn="studierzimmer_analytics_session_v1",Ki=4320*60*60*1e3,yn="studierzimmer:analytics-consent";let Gt=null,Kt=!1,wn=!1;function Jt(e){if(typeof window>"u")return null;try{return window[e]}catch{return null}}function Er(e,t){try{return e?.getItem(t)??null}catch{return null}}function Cr(e,t,i){try{e?.setItem(t,i)}catch{}}function kn(e,t){try{e?.removeItem(t)}catch{}}function Zi(e=window.location.pathname){const t=e.split("?")[0]?.split("#")[0]??"/";return t.startsWith("/")?t.slice(0,160):"/"}function Ji(){if(!document.referrer)return null;try{return new URL(document.referrer).host.slice(0,160)||null}catch{return null}}function Qi(){const e=window.innerWidth;return Number.isFinite(e)?e<600?"mobile":e<1024?"tablet":"desktop":"unknown"}function ea(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=Array.from(e,i=>i.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function ta(){const e=Jt("sessionStorage"),t=Er(e,vn);if(t)return t;if(Gt)return Gt;const i=ea();return Gt=i,Cr(e,vn,i),i}function na(e){typeof window>"u"||window.dispatchEvent(new CustomEvent(yn,{detail:e}))}function Sn(){const e=Jt("localStorage"),t=Er(e,qt);if(!t)return null;try{const i=JSON.parse(t),a=i.choice==="necessary"||i.choice==="analytics",s=Date.parse(String(i.expiresAt??""));return i.version!==1||!a||!Number.isFinite(s)||s<=Date.now()?(kn(e,qt),null):i.choice}catch{return kn(e,qt),null}}function ra(e){const t=new Date,i={version:1,choice:e,updatedAt:t.toISOString(),expiresAt:new Date(t.getTime()+Ki).toISOString()};Cr(Jt("localStorage"),qt,JSON.stringify(i)),e==="necessary"?(kn(Jt("sessionStorage"),vn),Gt=null,Kt=!1):wn=!1,na(e)}function ia(e){const t=typeof e=="object"&&e&&"message"in e?String(e.message):String(e);return/track_analytics_event|schema cache|does not exist|could not find/i.test(t)}async function Ot({eventName:e,path:t,targetType:i,targetId:a,valueInt:s}){if(typeof window>"u"||Sn()!=="analytics"||wn)return!1;const o=ta(),d=a?.trim().slice(0,120)||null,u=Number.isFinite(s)?Math.min(864e5,Math.max(0,Math.round(s??0))):null;!Kt&&e!=="session_start"?(Kt=!0,await Ot({eventName:"session_start",path:t})):e==="session_start"&&(Kt=!0);const{data:m,error:f}=await H.rpc("track_analytics_event",{p_session_id:o,p_event_name:e,p_path:Zi(t),p_target_type:i??null,p_target_id:d,p_referrer_host:e==="session_start"?Ji():null,p_device_type:Qi(),p_value_int:u});return f?(ia(f)&&(wn=!0,console.info("Analytics collection is disabled until the analytics SQL migration is run.")),!1):m===!0}const aa={a4_long_edge:{width:480,height:679,minWidth:90,maxWidth:600,minHeight:127,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:110,maxWidth:680,minHeight:78,maxHeight:481},square:{width:560,height:560,minWidth:96,maxWidth:620,minHeight:96,maxHeight:620}},Vn=8,sa=8,Xn=360,oa=42,ca=1,la=5,ua=["☺︎","♥","★","🌊"];function kt(e,t,i){return Math.min(i,Math.max(t,e))}function Hn(e,t,i){const a=Math.max(2,t-Vn*2),s=Math.max(1,i-Vn*2),o=e.width/e.height,d=a/2/o,u=Math.max(1,Math.min(s,d,e.maxHeight)),m=Math.max(1,Math.min(u*o,e.maxWidth));return{width:Math.floor(m),height:Math.floor(m/o)}}function qn(e){return"translate(-50%, -100%)"}const da=n.forwardRef(function({page:t,isCover:i,comments:a,commentsHidden:s,commentMode:o,canManageComments:d,activeDraft:u,draftBody:m,commentBusy:f,commentError:g,onImageReady:w,onPlaceComment:v,onDraftBodyChange:x,onSubmitDraft:k,onCancelDraft:S,onDeleteComment:R},D){const O=y=>{if(!o||!d||y.target instanceof Element&&y.target.closest("[data-book-comment-ui]"))return;y.preventDefault(),y.stopPropagation();const A=y.currentTarget.getBoundingClientRect();v(t.id,kt((y.clientX-A.left)/Math.max(1,A.width),0,1),kt((y.clientY-A.top)/Math.max(1,A.height),0,1))};return r.jsx("div",{ref:D,"data-density":i?"hard":"soft",className:"h-full w-full overflow-visible bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:r.jsxs("div",{"data-book-page-face":"true",onPointerDown:O,className:`relative h-full w-full overflow-visible ${o?"cursor-crosshair":""}`,children:[r.jsx("img",{src:t.public_url,alt:`Page ${t.page_number}: ${t.file_name}`,draggable:!1,decoding:"async",onLoad:w,onError:w,className:"pointer-events-none h-full w-full select-none object-cover object-center"}),r.jsxs("div",{className:`book-comment-layer absolute inset-0 z-20 ${s?"is-hidden":""}`,"aria-hidden":s,children:[a.map(y=>r.jsxs("div",{"data-book-comment-ui":"true",className:"book-comment-balloon absolute",style:{left:`${y.anchor_x*100}%`,top:`${y.anchor_y*100}%`,transform:qn(y.anchor_x)},children:[d&&r.jsx("button",{type:"button",className:"book-comment-delete","aria-label":"Delete comment",onPointerDown:A=>{A.preventDefault(),A.stopPropagation()},onClick:A=>{A.preventDefault(),A.stopPropagation(),R(y.id)},children:"×"}),r.jsx("p",{children:y.body})]},y.id)),u?.pageId===t.id&&r.jsxs("form",{"data-book-comment-ui":"true",className:"book-comment-balloon book-comment-editor absolute",style:{left:`${u.anchorX*100}%`,top:`${u.anchorY*100}%`,transform:qn(u.anchorX)},onPointerDown:y=>y.stopPropagation(),onClick:y=>y.stopPropagation(),onSubmit:y=>{y.preventDefault(),k()},children:[r.jsx("button",{type:"button",className:"book-comment-delete","aria-label":"Cancel comment",onClick:S,children:"×"}),r.jsx("textarea",{autoFocus:!0,value:m,maxLength:600,placeholder:"WRITE A COMMENT…",onChange:y=>x(y.target.value),onKeyDown:y=>{y.key==="Escape"&&S(),(y.metaKey||y.ctrlKey)&&y.key==="Enter"&&(y.preventDefault(),k())}}),r.jsxs("div",{className:"book-comment-editor-actions",children:[r.jsx("div",{className:"book-comment-emojis","aria-label":"Add emoji",children:ua.map(y=>r.jsx("button",{type:"button",onClick:()=>x(`${m}${y}`),children:y},y))}),r.jsx("button",{type:"submit",disabled:f||!m.trim(),children:f?"…":"SEND"})]}),g&&r.jsx("p",{className:"book-comment-editor-error",children:g})]})]})]})})});function ma({book:e,pages:t,comments:i=[],commentMode:a=!1,canManageComments:s=!1,initialPage:o=0,bookMotionClassName:d="is-visible",onPageChange:u,onReady:m,onCreateComment:f,onDeleteComment:g}){const w=n.useRef(null),v=n.useRef(null),x=n.useRef(e.id),k=n.useRef(0),S=n.useRef(!1),R=n.useRef(!1),D=n.useRef(!1),O=n.useRef(!1),y=n.useRef(null),A=n.useRef({time:0,x:0,y:0,pointerType:""}),ie=n.useRef(null),N=n.useRef(null),I=n.useRef([]),z=n.useRef({width:1,height:1}),W=n.useRef(new Map),P=e.page_format??"a4_long_edge",j=aa[P],Y=Math.min(Math.max(0,Math.floor(o)),Math.max(0,t.length-1)),ue=n.useRef(!1),se=n.useRef(!1),T=n.useRef(new Set),de=n.useRef(new Set([Y-1,Y,Y+1].filter(l=>l>=0&&l<t.length)));x.current!==e.id&&(x.current=e.id,k.current=Y);const[$,Ie]=n.useState(Y),[te,Q]=n.useState(0),[q,le]=n.useState(!1),[F,ne]=n.useState(!1),[ge,ye]=n.useState(!1),[Et,Ae]=n.useState(!1),[B,U]=n.useState(null),[_e,be]=n.useState(""),[Ne,xe]=n.useState(!1),[Je,J]=n.useState(null),[Ct,Qe]=n.useState(!1),[Pe,G]=n.useState(!1),[me,De]=n.useState(()=>Hn(j,640,480)),K=ln(1),re=ln(0),C=ln(0),qe=n.useMemo(()=>{const l=new Map;return i.forEach(h=>{const L=l.get(h.book_page_id)??[];L.push(h),l.set(h.book_page_id,L)}),l},[i]),lt=i.length>0,Re=n.useCallback(()=>{se.current||!ue.current||![...de.current].every(l=>T.current.has(l))||(se.current=!0,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>m?.(e.id))}))},[e.id,m]),we=n.useCallback(l=>{de.current.has(l)&&(T.current.add(l),Re())},[Re]),Ye=n.useCallback(()=>{const l=k.current,h=l===0||l>=t.length-1?[l]:[l,Math.min(l+1,t.length-1)];return Promise.all(h.map(L=>{const V=t[L];if(!V)return Promise.resolve();const Z=W.current.get(V.public_url);if(Z)return Z;const je=new Promise(he=>{const Ee=new Image;let Te=!1;const Ce=()=>{Te||(Te=!0,he())};Ee.onload=()=>{typeof Ee.decode=="function"?Ee.decode().catch(()=>{}).finally(Ce):Ce()},Ee.onerror=Ce,Ee.decoding="async",Ee.src=V.public_url,window.setTimeout(Ce,5e3)});return W.current.set(V.public_url,je),je})).then(()=>{})},[t]),Ve=n.useCallback((l,h,L)=>{!a||!s||(J(null),be(""),U({pageId:l,anchorX:h,anchorY:L}))},[s,a]),$e=n.useCallback(()=>{Ne||(U(null),be(""),J(null))},[Ne]),_t=n.useCallback(async()=>{if(!(!B||!_e.trim()||!f||Ne)){xe(!0),J(null);try{await f({bookPageId:B.pageId,body:_e,anchorX:B.anchorX,anchorY:B.anchorY}),U(null),be("")}catch(l){J(l instanceof Error?l.message:"Unable to save the comment.")}finally{xe(!1)}}},[Ne,B,_e,f]),ht=n.useCallback(async l=>{if(!(!g||Ne)){xe(!0),J(null);try{await g(l)}catch(h){J(h instanceof Error?h.message:"Unable to delete the comment.")}finally{xe(!1)}}},[Ne,g]),fe=n.useCallback(()=>{I.current.forEach(l=>l.stop()),I.current=[]},[]),Oe=n.useCallback(()=>{const l=k.current===0||k.current>=t.length-1;return{width:me.width*(l?1:2),height:me.height}},[me.height,me.width,t.length]),et=n.useCallback((l,h,L)=>{const V=z.current,Z=Oe(),je=Math.max(0,(Z.width*l-V.width)/2),he=Math.max(0,(Z.height*l-V.height)/2);return{x:kt(h,-je,je),y:kt(L,-he,he)}},[Oe]),Fe=n.useCallback((l,h,L,V=K.get(),Z=re.get(),je=C.get())=>{const he=z.current,Ee=kt(l,ca,la),Te=Ee/Math.max(1e-4,V),Ce=h-he.width/2,bt=L-he.height/2,at=et(Ee,Ce-(Ce-Z)*Te,bt-(bt-je)*Te);return K.set(Ee),re.set(at.x),C.set(at.y),{scale:Ee,...at}},[et,re,C,K]),gt=n.useCallback(()=>{const l=z.current,h=Oe(),L=Math.min((l.width-24)/Math.max(1,h.width),(l.height-24)/Math.max(1,h.height));return kt(L,1.25,3.6)},[Oe]),rt=n.useCallback((l,h,L)=>{fe(),N.current&&(window.clearTimeout(N.current),N.current=null);const V={width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)};z.current=V,S.current=!0,R.current=!1,ne(!1),Ae(!0),U(null),le(!0),K.set(1),re.set(0),C.set(0);const Z=Fe(gt(),l,h,1,0,0);return L&&(K.set(1),re.set(0),C.set(0),window.requestAnimationFrame(()=>{I.current=[yt(K,Z.scale,{type:"spring",stiffness:260,damping:24,mass:.74}),yt(re,Z.x,{type:"spring",stiffness:280,damping:27,mass:.72}),yt(C,Z.y,{type:"spring",stiffness:280,damping:27,mass:.72})]})),Z},[gt,re,C,fe,Fe,K]),it=n.useCallback(()=>{!S.current||R.current||(fe(),R.current=!0,ne(!0),I.current=[yt(K,1,{type:"spring",stiffness:330,damping:28,mass:.7}),yt(re,0,{type:"spring",stiffness:330,damping:28,mass:.7}),yt(C,0,{type:"spring",stiffness:330,damping:28,mass:.7})],N.current=window.setTimeout(()=>{S.current=!1,R.current=!1,le(!1),ne(!1),K.set(1),re.set(0),C.set(0),N.current=null,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>Ae(!1))})},430))},[re,C,fe,K]),tt=n.useCallback(l=>{window.requestAnimationFrame(()=>{const h=l??w.current?.pageFlip();if(!h)return;const L=h.getCurrentPageIndex(),V=h.getBoundsRect();k.current=L,Ie(L),u?.(L),h.getOrientation()!=="landscape"?Q(0):L===0?Q(-(V.pageWidth/2)):L>=t.length-1?Q(V.pageWidth/2):Q(0)})},[u,t.length]);n.useLayoutEffect(()=>{const l=v.current;if(!l)return;const h=()=>{const V=window.getComputedStyle(l),Z=Number.parseFloat(V.paddingLeft)+Number.parseFloat(V.paddingRight),je=Number.parseFloat(V.paddingTop)+Number.parseFloat(V.paddingBottom),he=Math.max(1,l.clientWidth-Z),Ee=Math.max(1,l.clientHeight-je);if(z.current={width:he,height:Ee},!S.current){const Te=Hn(j,he,Ee);De(Ce=>Ce.width===Te.width&&Ce.height===Te.height?Ce:Te),G(!0)}tt()};h();const L=new ResizeObserver(h);return L.observe(l),window.addEventListener("resize",h),()=>{L.disconnect(),window.removeEventListener("resize",h)}},[q,j,tt]),n.useEffect(()=>{k.current=Y,Ie(Y),Q(0),S.current=!1,R.current=!1,le(!1),ne(!1),ye(!1),Ae(!1),U(null),be(""),J(null),K.set(1),re.set(0),C.set(0),A.current.time=0,y.current=null,O.current=!1},[e.id,re,C,Y,K]),n.useEffect(()=>{U(null),be(""),J(null),Ye()},[$,Ye]),n.useEffect(()=>{a||(O.current=!1,U(null),be(""),J(null))},[a]),n.useEffect(()=>{if(!q)return;const l=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=l}},[q]);const oe=n.useCallback(()=>{ie.current&&(window.clearTimeout(ie.current),ie.current=null)},[]),Ue=n.useCallback(l=>{const h=l.target;if(h instanceof Element&&h.closest("[data-book-comment-ui]"))return;if(a&&h instanceof Element&&h.closest("[data-book-page-face]")){O.current=!0;return}if(R.current||!l.isPrimary||l.pointerType==="mouse"&&l.button!==0)return;Ye(),lt&&!a&&ye(!0);const L=window.performance.now(),V=A.current,Z=L-V.time>0&&L-V.time<Xn&&V.pointerType===l.pointerType&&Math.hypot(l.clientX-V.x,l.clientY-V.y)<oa,je=S.current,he=l.currentTarget.getBoundingClientRect();Z?(oe(),A.current.time=0,O.current=!0,fe()):O.current=je,y.current={pointerId:l.pointerId,pointerType:l.pointerType,mode:Z?"zoom-slider":je?"pan":"page",startedZoomed:je,startX:l.clientX,startY:l.clientY,startPanX:re.get(),startPanY:C.get(),startScale:K.get(),anchorX:l.clientX,anchorY:l.clientY,stageCenterX:he.left+he.width/2,moved:!1}},[oe,a,lt,re,C,Ye,fe,K]),p=n.useCallback((l,h)=>{oe(),ie.current=window.setTimeout(()=>{if(ie.current=null,S.current||D.current||y.current)return;const L=w.current?.pageFlip();l<h?L?.flipPrev():L?.flipNext()},Xn)},[oe]),_=n.useCallback(l=>{const h=y.current;if(!h||h.pointerId!==l.pointerId||(Math.hypot(l.clientX-h.startX,l.clientY-h.startY)>sa&&(h.moved=!0),h.mode==="page"))return;if(l.preventDefault(),h.mode==="pan"){if(!h.moved)return;const Z=et(K.get(),h.startPanX+l.clientX-h.startX,h.startPanY+l.clientY-h.startY);re.set(Z.x),C.set(Z.y);return}if(!h.moved)return;if(!S.current){const Z=rt(h.anchorX,h.anchorY,!1);h.startScale=Z.scale,h.startPanX=Z.x,h.startPanY=Z.y}const V=h.startScale*Math.exp((h.startY-l.clientY)*.006);Fe(V,h.anchorX,h.anchorY,h.startScale,h.startPanX,h.startPanY)},[et,rt,re,C,Fe,K]),E=n.useCallback(l=>{const h=y.current;if(!(!h||h.pointerId!==l.pointerId)){if(y.current=null,O.current=!1,ye(!1),l.type==="pointercancel"){A.current.time=0;return}if(h.mode==="zoom-slider"){h.moved?A.current.time=0:h.startedZoomed?it():rt(h.anchorX,h.anchorY,!0);return}if(h.moved){A.current.time=0,oe();return}A.current={time:window.performance.now(),x:l.clientX,y:l.clientY,pointerType:h.pointerType},h.mode==="page"&&p(l.clientX,h.stageCenterX)}},[oe,it,rt,p]);n.useEffect(()=>(window.addEventListener("pointermove",_,{passive:!1}),window.addEventListener("pointerup",E),window.addEventListener("pointercancel",E),()=>{window.removeEventListener("pointermove",_),window.removeEventListener("pointerup",E),window.removeEventListener("pointercancel",E)}),[E,_]),n.useEffect(()=>()=>{oe(),fe(),N.current&&window.clearTimeout(N.current)},[oe,fe]);const ke=n.useCallback(l=>{if(!S.current||R.current)return;l.preventDefault(),l.stopPropagation(),fe();const h=l.currentTarget.getBoundingClientRect(),L=Math.exp(-l.deltaY*.0015);Fe(K.get()*L,l.clientX-h.left,l.clientY-h.top)},[fe,Fe,K]);if(n.useEffect(()=>{t.length===0&&m?.(e.id)},[e.id,m,t.length]),t.length===0)return r.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."});const Se=r.jsx("div",{className:`public-book-stage ${d} ${q?"is-magnified":""} ${F?"is-zoom-closing":""}`,children:r.jsx("div",{ref:v,className:`public-book-viewport relative flex items-center justify-center overflow-hidden ${q?"is-magnified cursor-grab active:cursor-grabbing":"cursor-default"} ${Ct?"is-page-folding":""}`,"data-page":$,"data-zoomed":q?"true":"false",onPointerDownCapture:Ue,onMouseDownCapture:l=>{(O.current||S.current)&&(l.preventDefault(),l.stopPropagation())},onTouchStartCapture:l=>{(O.current||S.current)&&(l.preventDefault(),l.stopPropagation())},onWheel:ke,children:r.jsx(Le.div,{className:"flex h-full w-full items-center justify-center",style:{x:re,y:C,scale:K,transformOrigin:"50% 50%",willChange:"transform"},children:r.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${te}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform",pointerEvents:q?"none":"auto"},children:Pe&&r.jsx(Kr,{ref:w,className:"mx-auto",style:{margin:"0 auto"},width:me.width,height:me.height,minWidth:1,maxWidth:j.maxWidth,minHeight:1,maxHeight:j.maxHeight,size:"fixed",startPage:x.current===e.id?k.current:Y,drawShadow:!0,flippingTime:850,usePortrait:!1,startZIndex:0,autoSize:!1,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!1,disableFlipByClick:!0,onInit:l=>{k.current=l.data.page,Ie(l.data.page),u?.(l.data.page),tt(l.object),ue.current=!0,Re()},onFlip:l=>{k.current=l.data,Ie(l.data),u?.(l.data),tt(l.object)},onChangeState:l=>{const h=l.data==="user_fold"||l.data==="flipping";D.current=h,Qe(l.data!=="read"),h&&oe()},onChangeOrientation:l=>{tt(l.object)},children:t.map((l,h)=>r.jsx(da,{page:l,isCover:h===0||h===t.length-1,comments:qe.get(l.id)??[],commentsHidden:ge||Et||q,commentMode:a,canManageComments:s,activeDraft:B,draftBody:_e,commentBusy:Ne,commentError:Je,onImageReady:()=>we(h),onPlaceComment:Ve,onDraftBodyChange:be,onSubmitDraft:()=>void _t(),onCancelDraft:$e,onDeleteComment:L=>void ht(L)},l.id))},`${e.id}-${P}-${me.width}x${me.height}`)})})})});return r.jsx("div",{className:"flex h-full w-full items-center justify-center",children:q&&typeof document<"u"?bn.createPortal(Se,document.body):Se})}function pa(){const[e,t]=n.useState(!0),[i,a]=n.useState(null),[s,o]=n.useState(!1),[d,u]=n.useState(null),m=n.useCallback(async()=>{t(!0),u(null);const{data:f,error:g}=await H.auth.getUser();if(g){a(null),o(!1),u(g.message),t(!1);return}const w=f.user??null;if(a(w),!w){o(!1),t(!1);return}try{const v=await Vi();o(v)}catch(v){o(!1),u(v instanceof Error?v.message:"Unable to verify administrator access.")}finally{t(!1)}},[]);return n.useEffect(()=>{m();const{data:f}=H.auth.onAuthStateChange(()=>{window.setTimeout(()=>{m()},0)});return()=>{f.subscription.unsubscribe()}},[m]),{loading:e,user:i,isAdmin:s,error:d,refresh:m}}const Gn="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";function fa({text:e,speed:t=100,revealSpeed:i=55}){const a=n.useRef(null),s=n.useRef(null),o=n.useRef(0),d=n.useRef(!1),u=n.useCallback(()=>{s.current!==null&&(window.clearInterval(s.current),s.current=null)},[]),m=n.useCallback(()=>Gn[Math.floor(Math.random()*Gn.length)],[]),f=n.useCallback((v=0)=>e.split("").map((x,k)=>x===" "?" ":k<v?x:m()).join(""),[m,e]),g=n.useCallback(()=>{u(),d.current=!1,a.current&&(s.current=window.setInterval(()=>{!a.current||d.current||(a.current.textContent=f())},t))},[u,f,t]),w=n.useCallback(()=>{u(),d.current=!0,o.current=0,a.current&&(s.current=window.setInterval(()=>{o.current+=1,a.current&&(a.current.textContent=f(o.current)),o.current>=e.length&&(u(),a.current&&(a.current.textContent=e))},i))},[u,f,i,e]);return n.useEffect(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches?(a.current&&(a.current.textContent=e),u):(g(),u),[u,g,e]),r.jsx("span",{className:"public-login-scramble",onMouseEnter:w,onMouseLeave:g,"aria-label":e,children:r.jsx("span",{ref:a,"aria-hidden":"true",children:e})})}const _r="publicBookSession",Lt="publicBookReturningToIndex",zt="publicBookReturningToIntro";function an(){if(typeof window>"u")return null;try{const e=window.sessionStorage.getItem(_r);if(!e)return null;const t=JSON.parse(e);return typeof t.slug!="string"||t.slug.length===0||typeof t.pageIndex!="number"||!Number.isFinite(t.pageIndex)?null:{slug:t.slug,pageIndex:Math.max(0,Math.floor(t.pageIndex))}}catch{return null}}function wt(e,t){if(typeof window>"u")return;const i={slug:e,pageIndex:Math.max(0,Math.floor(t))};try{window.sessionStorage.setItem(_r,JSON.stringify(i))}catch{}}const Rr=()=>ct(()=>import("./AdminPortal-WFByE82S.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),ha=n.lazy(Rr),ga=()=>ct(()=>import("./WatchStudio-BylKRp0w.js"),__vite__mapDeps([8,1,2,4,5,3,7,6])),Yt=()=>ga().then(e=>e.preloadWatchStudioExperience()),Qt=1120,jr=180,Nn=140,dt=Qt+Nn,ba=jr+dt,en=920,Kn=120,Zn=en+Nn,En=1180,xa=6e3,va=`
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
  contain: layout paint;
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
  animation: public-book-background-mix-in ${En}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${En}ms cubic-bezier(0.4, 0, 0.2, 1) both;
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
  animation-duration: ${Qt}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-meta.is-fast.is-entering,
.public-book-meta.is-fast.is-leaving {
  animation-duration: ${en}ms;
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
  animation-duration: ${Qt}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-stage.is-fast.is-entering,
.public-book-stage.is-fast.is-leaving {
  animation-duration: ${en}ms;
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


`;function pn(e){return e instanceof Error?e.message:"Unable to load the books."}function Ke(e){return new Promise(t=>{window.setTimeout(t,e)})}function Jn(){return new Promise(e=>{window.requestAnimationFrame(()=>e())})}function ya(e){const t=i=>Number.isFinite(i)?Math.min(255,Math.max(0,Math.round(i??255))):255;return`rgb(${t(e?.background_r)} ${t(e?.background_g)} ${t(e?.background_b)})`}function wa(e){return new Promise(t=>{const i=new Image;let a=!1;const s=()=>{a||(a=!0,window.clearTimeout(o),t())},o=window.setTimeout(s,5e3);i.onload=()=>{if(typeof i.decode=="function"){i.decode().catch(()=>{}).finally(s);return}s()},i.onerror=s,i.decoding="async",i.src=e})}async function Qn(e,t=0){const i=Math.min(Math.max(0,Math.floor(t)),Math.max(0,e.length-1)),a=[i-1,i,i+1,i+2].filter(o=>o>=0&&o<e.length),s=[...new Set(a)].map(o=>e[o]);await Promise.all(s.map(o=>wa(o.public_url)))}function ka({initialSlug:e,onBack:t,onLogin:i,onThreeD:a,onBookChange:s}){const{isAdmin:o}=pa(),[d]=n.useState(()=>{const p=window.sessionStorage.getItem("gstudios:nav-continuity")==="models-to-library";return p&&window.sessionStorage.removeItem("gstudios:nav-continuity"),p}),[u,m]=n.useState([]),[f,g]=n.useState(null),[w,v]=n.useState([]),[x,k]=n.useState([]),[S,R]=n.useState(!1),[D,O]=n.useState({}),[y,A]=n.useState(!0),[ie,N]=n.useState(!1),[I,z]=n.useState(null),[W,P]=n.useState(!1),[j,Y]=n.useState(!1),[ue,se]=n.useState("outside"),[T,de]=n.useState(d),[$,Ie]=n.useState("library"),[te,Q]=n.useState("outside"),[q,le]=n.useState(!1),[F,ne]=n.useState(0),[ge,ye]=n.useState(!1),[Et,Ae]=n.useState(!1),B=n.useRef(!0),U=n.useRef(!1),_e=n.useRef(null),be=n.useRef(null),Ne=n.useRef(null),xe=n.useRef(!1),Je=n.useRef(an()),J=n.useRef(null),Ct=n.useRef(0),Qe=n.useRef("rgb(255 255 255)"),Pe=n.useRef(null),G=n.useRef(null),me=n.useRef(null),De=n.useRef(new Set),[K,re]=n.useState([{id:0,color:Qe.current}]),C=n.useMemo(()=>u.find(p=>p.id===f)??null,[u,f]);n.useEffect(()=>{o||R(!1)},[o]),n.useEffect(()=>{!C||w.length===0||O(p=>({...p,[C.id]:{cover:w[0]?.public_url??null,lastPage:w[w.length-1]?.public_url??null}}))},[w,C]),n.useEffect(()=>{if(!W||u.length===0)return;let p=!0;return u.forEach(_=>{D[_.id]||De.current.has(_.id)||(De.current.add(_.id),ot(_.id).then(E=>{p&&O(ke=>({...ke,[_.id]:{cover:E[0]?.public_url??null,lastPage:E[E.length-1]?.public_url??null}}))}).catch(()=>{}).finally(()=>{De.current.delete(_.id)}))}),()=>{p=!1}},[W,D,u]),n.useEffect(()=>{const p=ya(C);if(p===Qe.current)return;Qe.current=p;const _={id:++Ct.current,color:p};re(E=>[E[E.length-1],_]),Pe.current&&window.clearTimeout(Pe.current),Pe.current=window.setTimeout(()=>{re(E=>E.slice(-1)),Pe.current=null},En)},[C,C?.background_b,C?.background_g,C?.background_r]);const qe=n.useCallback(p=>{if(G.current===p)return Promise.resolve();const _=me.current;return _&&_.finish(),new Promise(E=>{let ke=!1;const Se=()=>{ke||(ke=!0,window.clearTimeout(l),me.current?.finish===Se&&(me.current=null),E())},l=window.setTimeout(Se,xa);me.current={bookId:p,finish:Se,timeout:l}})},[]),lt=n.useCallback(p=>{G.current=p;const _=me.current;_?.bookId===p&&_.finish()},[]);n.useEffect(()=>{_e.current=f},[f]),n.useEffect(()=>{C&&Ot({eventName:"book_open",targetType:"book",targetId:C.slug})},[C]);const Re=n.useCallback(()=>{J.current&&(window.clearTimeout(J.current),J.current=null)},[]),we=n.useCallback((p=!1)=>{Re();const _=p?Kn:jr,E=p?en:Qt;le(p),Q("outside"),J.current=window.setTimeout(()=>{B.current&&(Q("entering"),J.current=window.setTimeout(()=>{B.current&&(Q("visible"),le(!1),J.current=null)},E+Nn))},_)},[Re]);n.useEffect(()=>{B.current=!0;const p=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{B.current&&de(!0)})});return()=>{B.current=!1,window.cancelAnimationFrame(p),J.current&&window.clearTimeout(J.current),Pe.current&&window.clearTimeout(Pe.current),me.current&&(window.clearTimeout(me.current.timeout),me.current.finish())}},[]),n.useEffect(()=>{const p=navigator.connection;if(p?.saveData||p?.effectiveType==="slow-2g"||p?.effectiveType==="2g")return;const _=()=>{Yt()},E=window;if(E.requestIdleCallback){const Se=E.requestIdleCallback(_,{timeout:2500});return()=>E.cancelIdleCallback?.(Se)}const ke=window.setTimeout(_,1400);return()=>window.clearTimeout(ke)},[]),n.useEffect(()=>{let p=!0;return(async()=>{A(!0),z(null);try{const E=await Sr();if(!p)return;m(E)}catch(E){p&&z(pn(E))}finally{p&&A(!1)}})(),()=>{p=!1}},[]);const Ye=n.useCallback(async p=>{if(!xe.current){xe.current=!0,N(!0),z(null);try{const[_,E]=await Promise.all([ot(p.id),Yn(p.id)]),ke=Je.current,Se=ke?.slug===p.slug?Math.min(ke.pageIndex,Math.max(0,_.length-1)):0;if(await Qn(_,Se),!B.current)return;G.current=null;const l=qe(p.id);if(bn.flushSync(()=>{le(!1),Q("outside"),g(p.id),v(_),k(E),ne(Se)}),wt(p.slug,Se),N(!1),await l,!B.current)return;we()}catch(_){B.current&&(z(pn(_)),N(!1))}finally{xe.current=!1}}},[we,qe]),Ve=n.useCallback(async(p,_)=>{if(B.current){if(U.current){be.current={book:p,updateRoute:_},P(!1);return}if(_e.current===p.id){P(!1);return}U.current=!0,ye(!0),N(!0),P(!1),z(null);try{Re(),le(!0),Q("leaving");const E=ot(p.id).then(async L=>(await Qn(L),L)),ke=Yn(p.id),[Se,l]=await Promise.all([E,ke,Ke(Zn)]);if(!B.current)return;G.current=null;const h=qe(p.id);if(bn.flushSync(()=>{le(!0),Q("outside"),g(p.id),_e.current=p.id,v(Se),k(l),ne(0),N(!1)}),Je.current={slug:p.slug,pageIndex:0},wt(p.slug,0),_&&s?.(p.slug),await Jn(),await Jn(),await h,await Ke(Kn),!B.current)return;Q("entering"),await Ke(Zn),B.current&&(Q("visible"),le(!1))}catch(E){B.current&&(z(pn(E)),N(!1),le(!1),Q("visible"))}finally{if(U.current=!1,B.current){ye(!1);const E=be.current;be.current=null,E&&E.book.id!==_e.current&&window.setTimeout(()=>{Ne.current?.(E.book,E.updateRoute)},24)}}}},[Re,s,qe]);n.useEffect(()=>{Ne.current=(p,_)=>{Ve(p,_)}},[Ve]),n.useEffect(()=>{if(y||u.length===0)return;const p=e?u.find(_=>_.slug===e):null;if(!f){const _=u.find(ke=>ke.is_featured),E=p??_??u[0];Ye(E);return}p&&p.id!==f&&!U.current&&Ve(p,!1)},[u,e,Ye,y,f,Ve]);const $e=n.useCallback(async()=>{!j||U.current||(U.current=!0,ye(!0),se("leaving"),await Ke(dt),B.current&&(Y(!1),se("outside"),we(),await Ke(ba),U.current=!1,B.current&&ye(!1)))},[j,we]);n.useEffect(()=>{const p=_=>{if(_.key==="Escape"){if(j){$e();return}P(!1)}};return window.addEventListener("keydown",p),()=>{window.removeEventListener("keydown",p)}},[$e,j]);const _t=async()=>{if(!U.current){if(P(!1),j){await $e();return}U.current=!0,ye(!0),Rr(),!(C&&(Re(),Q("leaving"),await Ke(dt),!B.current))&&(Y(!0),se("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{B.current&&se("entering")})}),await Ke(dt),U.current=!1,B.current&&(se("visible"),ye(!1)))}},ht=async()=>{if(j){await $e();return}U.current||(U.current=!0,ye(!0),P(!1),de(!1),Re(),Q("leaving"),C&&wt(C.slug,F),window.sessionStorage.setItem(Lt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.setItem(zt,"true"),window.sessionStorage.removeItem("returnFromExample"),await Ke(dt),B.current&&t())},fe=async()=>{!j||U.current||(U.current=!0,ye(!0),P(!1),de(!1),se("leaving"),C&&wt(C.slug,F),window.sessionStorage.setItem(Lt,"true"),window.sessionStorage.setItem(zt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.removeItem("returnFromExample"),await Ke(dt),B.current&&t())},Oe=async()=>{if(U.current||j)return;Ie("models"),U.current=!0,ye(!0),P(!1),Re(),Q("leaving"),C&&wt(C.slug,F);const p=Yt().catch(()=>null);await Promise.all([Ke(dt),p]),B.current&&a()},et=p=>{Ve(p,!0)},Fe=n.useCallback(async p=>{if(!C||!o)throw new Error("Administrator login required.");const _=await qi({bookId:C.id,bookPageId:p.bookPageId,body:p.body,anchorX:p.anchorX,anchorY:p.anchorY});k(E=>[...E,_])},[o,C]),gt=n.useCallback(async p=>{if(!o)throw new Error("Administrator login required.");await Gi(p),k(_=>_.filter(E=>E.id!==p))},[o]),rt=n.useCallback(p=>{ne(p),C&&(Je.current={slug:C.slug,pageIndex:p},wt(C.slug,p),Ot({eventName:"book_page_view",targetType:"book_page",targetId:`${C.slug}:${p}`,valueInt:p}))},[C]),tt=`${te==="entering"?"is-entering":te==="visible"?"is-visible":te==="leaving"?"is-leaving":"is-outside"}${q?" is-fast":""}`,oe=ue==="entering"?"is-entering":ue==="visible"?"is-visible":ue==="leaving"?"is-leaving":"is-outside",Ue=T?d?"is-continuing":"is-visible":ge||Et?"is-leaving":"is-outside";return r.jsxs("div",{className:"public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:K[0]?.color??"rgb(255 255 255)"},children:[r.jsx("style",{children:va}),r.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:K.map((p,_)=>r.jsx("div",{className:`public-book-background-layer ${_===K.length-1?"is-current":"is-previous"}`,style:{backgroundColor:p.color}},p.id))}),W&&!j&&r.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-black/0",onClick:()=>P(!1)}),r.jsxs("div",{className:"public-book-nav fixed z-[170]",children:[r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:r.jsx("button",{type:"button",onClick:()=>void ht(),disabled:ge,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"navigate",className:"public-book-control-column disabled:pointer-events-none disabled:opacity-40","aria-label":j?"Back to book":"Navigate",title:j?"Back to book":"Navigate",children:r.jsx("span",{children:"NAVIGATE"})})}),r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:r.jsx("button",{type:"button",onClick:()=>{Ie("library"),P(p=>!p)},disabled:j,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"library",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${!j&&W&&$==="library"?"is-active":""}`,"aria-label":"Choose a book","aria-expanded":W,"aria-controls":"public-book-library",title:"Choose a book",children:r.jsx("span",{children:"LIBRARY"})})}),r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:r.jsx("button",{type:"button",onClick:()=>void _t(),disabled:ge,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"login",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${j?"is-active":""}`,"aria-expanded":j,"aria-label":"Login",children:r.jsx("span",{children:r.jsx(fa,{text:"LOGIN"})})})}),r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:r.jsx("button",{type:"button",onClick:()=>void Oe(),onPointerEnter:()=>void Yt(),onFocus:()=>void Yt(),disabled:ge||j,"data-analytics-event":"model_open","data-analytics-type":"model","data-analytics-id":"models",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${!j&&$==="models"?"is-active":""}`,children:r.jsx("span",{children:"MODELS"})})}),o&&r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:r.jsx("button",{type:"button",onClick:()=>R(p=>!p),disabled:ge||j,"data-analytics-event":"navigation_click","data-analytics-type":"interface","data-analytics-id":"comment-mode",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${S?"is-active":""}`,"aria-pressed":S,"aria-label":"Comment on book pages",children:r.jsx("span",{children:"COMMENT"})})})]}),r.jsxs("aside",{id:"public-book-library",className:`public-library-drawer fixed z-[150] flex flex-col ${W&&!j?"is-open pointer-events-auto":"pointer-events-none"}`,"aria-hidden":!W||j,children:[r.jsx("button",{type:"button",onClick:()=>P(!1),"data-analytics-event":"navigation_click","data-analytics-type":"interface","data-analytics-id":"library-close",className:"absolute right-5 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 active:scale-95 sm:right-8","aria-label":"Close book list",children:"×"}),r.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto",children:y?r.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"..."}):u.length===0?r.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):u.map(p=>{const _=p.id===f,E=D[p.id];return r.jsxs("button",{type:"button",onClick:()=>et(p),"data-analytics-event":"navigation_click","data-analytics-type":"book","data-analytics-id":p.slug,className:`public-library-book-row ${_?"is-selected":""}`,children:[r.jsxs("span",{className:"public-library-open-book","aria-hidden":"true",children:[r.jsx("span",{children:E?.lastPage&&r.jsx("img",{src:E.lastPage,alt:"",draggable:!1,loading:"lazy"})}),r.jsx("span",{children:E?.cover&&r.jsx("img",{src:E.cover,alt:"",draggable:!1,loading:"lazy"})})]}),r.jsxs("span",{className:"public-library-book-copy min-w-0",children:[r.jsx("h2",{children:p.title}),p.description&&r.jsx("p",{children:p.description})]})]},p.id)})})]}),r.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden",children:y||ie&&!C?r.jsx("div",{className:`public-route-message ${T?"is-visible":"is-outside"}`,children:"..."}):I?r.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${T?"is-visible":"is-outside"}`,children:I}):u.length===0?r.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${T?"is-visible":"is-outside"}`,children:"No books are public yet."}):C?r.jsx("div",{className:"h-full w-full",children:r.jsx("div",{className:`public-book-surface flex h-full w-full items-center justify-center ${j?"is-login-muted":""}`,children:r.jsx(ma,{book:C,pages:w,comments:x,commentMode:S,canManageComments:o,initialPage:F,bookMotionClassName:tt,onPageChange:rt,onReady:lt,onCreateComment:Fe,onDeleteComment:gt},C.id)})}):null}),j&&r.jsx("div",{className:`public-login-stage fixed inset-0 z-[180] overflow-hidden bg-white ${oe}`,"aria-hidden":ue==="outside"||ue==="leaving",children:r.jsx(n.Suspense,{fallback:null,children:r.jsx(ha,{embedded:!0,surfaceReady:ue==="entering"||ue==="visible",onBack:()=>void $e(),onNavigate:()=>void fe(),onLibrary:()=>void $e(),onModels:()=>{$e().then(()=>Oe())}})})})]})}const Tr=n.createContext(void 0),Sa=({children:e})=>{const[t,i]=n.useState(!1),a=()=>{i(!t)};return n.useEffect(()=>{t?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[t]),r.jsx(Tr.Provider,{value:{isDark:t,toggleTheme:a},children:e})},Os=()=>{const e=n.useContext(Tr);if(e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},er="/assets/WolfyLight-Bs10J6iU.gif",Ea=100,Ca=500,_a=14e3,fn=400,Ra=({onComplete:e})=>{const[t,i]=n.useState(!1),[a,s]=n.useState(!1),[o,d]=n.useState(!1),[u,m]=n.useState(!1),[f,g]=n.useState({}),[w,v]=n.useState(0),[x,k]=n.useState(!0),S=n.useRef({}),R=n.useRef(null),D=n.useRef(!1),O=n.useRef(!1),{progress:y}=ni();n.useEffect(()=>{let I;const z=()=>{v(W=>{const P=y-W,j=Math.max(P*.1,P>0?.5:-.5),Y=Math.abs(P)<.5?y:W+j;return Y>=100&&setTimeout(()=>k(!1),500),Math.min(100,Math.max(0,Y))}),I=requestAnimationFrame(z)};return I=requestAnimationFrame(z),()=>cancelAnimationFrame(I)},[y]),n.useEffect(()=>{const I=window.matchMedia("(prefers-reduced-motion: reduce)");O.current=I.matches;const z=()=>O.current=I.matches;return I.addEventListener?.("change",z),()=>I.removeEventListener?.("change",z)},[]),n.useEffect(()=>{const I=new Image;I.src=er;const z=()=>g({w:I.naturalWidth||400,h:I.naturalHeight||400});I.decode?.().then(()=>{z(),i(!0)}).catch(()=>{I.onload=()=>{z(),i(!0)}})},[]);const A=n.useCallback(()=>{if(D.current)return;if(O.current){D.current=!0,e();return}m(!0);const I=R.current;let z=!1;const W=()=>{z||(z=!0,D.current=!0,e())};if(I){const P=()=>{I.removeEventListener("animationend",P),S.current.fallback&&clearTimeout(S.current.fallback),W()};I.addEventListener("animationend",P,{once:!0}),S.current.fallback=window.setTimeout(W,fn+120)}else S.current.fallback=window.setTimeout(W,fn+50)},[e]);n.useEffect(()=>{if(!t)return;const I=S.current;return O.current?(s(!0),d(!0),I.auto=window.setTimeout(()=>A(),800)):(I.entry=window.setTimeout(()=>s(!0),Ea),I.allowExit=window.setTimeout(()=>d(!0),Ca),I.auto=window.setTimeout(()=>A(),_a)),()=>{Object.values(I).forEach(z=>z&&clearTimeout(z))}},[t,A]);const ie=()=>{(o||O.current)&&A()},N=a?u?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return r.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${D.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:ie,children:[r.jsxs("div",{className:`relative ${N}`,ref:R,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[r.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[r.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),r.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),r.jsx("img",{src:er,alt:"Loading wolf",width:f.w||800,height:f.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),x&&r.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${w>=100?"opacity-0":"opacity-100"}`,children:[Math.round(w),"%"]}),r.jsx("style",{children:`
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
        .animate-elastic-shrink { transform-origin: 50% 50%; animation: elastic-shrink ${fn}ms ease-in forwards; }
      `})]})},ve={};typeof window<"u"&&(window.addEventListener("keydown",e=>{ve[e.key.toLowerCase()]=!0}),window.addEventListener("keyup",e=>{ve[e.key.toLowerCase()]=!1}));const Zt={current:null},Tt=15,hn=10,ja=38,tr=95,We=0,St=-174,Cn=960,tn=12e4,Ta=48e3,Ma=9e4,X=128,Ze=900,ze=10,ut=12,Ia=4.5,Pa=16e3,Mr=[500,200,-300],Aa=new ae(500,150,-1e3).normalize(),Na="#fff4d6",Ir="#0b1e3a",Oa="#0a2a6a",Pr="gstudios:ocean-player-transform",Ar={value:0},mt=[];let nr=1;function _n(){return performance.now()/1e3}function Nr(e,t,i){const a=_n();for(mt.push({id:nr,x:e,z:t,startedAt:a,...i}),nr+=1;mt.length>ze;)mt.shift();for(let s=mt.length-1;s>=0;s-=1){const o=mt[s];a-o.startedAt>o.duration+.25&&mt.splice(s,1)}}function La(){const e={position:[0,Tt,0],rotationY:Math.PI};try{const t=window.sessionStorage.getItem(Pr);if(!t)return e;const i=JSON.parse(t);return!Array.isArray(i.position)||i.position.length!==3||!i.position.every(a=>typeof a=="number"&&Number.isFinite(a))||typeof i.rotationY!="number"||!Number.isFinite(i.rotationY)?e:{position:[Number(i.position[0]),pe.clamp(Number(i.position[1]),St+8,Cn),Number(i.position[2])],rotationY:Number(i.rotationY)}}catch{return e}}function gn(e){if(e)try{window.sessionStorage.setItem(Pr,JSON.stringify({position:e.position.toArray(),rotationY:e.rotation.y}))}catch{}}function On(){const e=jn(In,"/caustics.png");return n.useMemo(()=>{e.wrapS=e.wrapT=Pn,e.minFilter=ki,e.magFilter=xn,e.colorSpace=Tn,e.needsUpdate=!0},[e]),e}function Ln(e,t,i={}){if(e.userData.hasUnderwaterCaustics)return;const a=i.includeRipple??!0,s=i.baseLight??.045,o=i.causticsStrength??.86,d=i.lightTint??[.46,.82,1],u=e.onBeforeCompile.bind(e),m=e.customProgramCacheKey.bind(e);e.onBeforeCompile=(f,g)=>{u(f,g),f.uniforms.causticsMap={value:t},f.uniforms.causticsTime=Ar,f.uniforms.causticsRippleSampler={value:Be.texture},f.uniforms.causticsRippleCenter={value:Be.center},f.uniforms.causticsRippleWorldSize={value:Ze},f.uniforms.causticsRippleTexel={value:new Pt(1/X,1/X)},f.vertexShader=`varying vec3 vCausticsWorldPosition;
${f.vertexShader}`.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
        vCausticsWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),f.fragmentShader=`
      uniform sampler2D causticsMap;
      uniform float causticsTime;
      uniform sampler2D causticsRippleSampler;
      uniform vec2 causticsRippleCenter;
      uniform float causticsRippleWorldSize;
      uniform vec2 causticsRippleTexel;
      varying vec3 vCausticsWorldPosition;
      ${f.fragmentShader}`.replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
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
      ${a?`vec2 causticsRippleUv =
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
        ${d[0].toFixed(4)},
        ${d[1].toFixed(4)},
        ${d[2].toFixed(4)}
      );
      reflectedLight.indirectDiffuse += underwaterFill * submerged *
        (${s.toFixed(4)} + movingCaustics * ${o.toFixed(4)});`)},e.customProgramCacheKey=()=>`${m()}-underwater-caustics-v4-${a?"ripple":"fine"}-${s}-${o}`,e.userData.hasUnderwaterCaustics=!0,e.needsUpdate=!0}class za{constructor(){He(this,"cells",new Map);He(this,"ready",!1)}build(t){this.clear(),t.updateWorldMatrix(!0,!0);let i=0;t.traverse(o=>{if(!(o instanceof At))return;const d=o.geometry.getAttribute("position");d&&(i+=d.count)});const a=Math.max(1,Math.ceil(i/Pa)),s=new ae;t.traverse(o=>{if(!(o instanceof At))return;const d=o.geometry.getAttribute("position");if(d)for(let u=0;u<d.count;u+=a){s.fromBufferAttribute(d,u),o instanceof Si&&o.applyBoneTransform(u,s),s.applyMatrix4(o.matrixWorld);const m=this.keyFor(s.x,s.y,s.z),f=this.cells.get(m)??[];f.push(s.clone()),this.cells.set(m,f)}}),this.ready=this.cells.size>0}resolve(t,i){if(!this.ready)return!1;const a=i+Ia,s=Math.ceil(a/ut);let o=!1;for(let d=0;d<2;d+=1){const u=Math.floor(t.x/ut),m=Math.floor(t.y/ut),f=Math.floor(t.z/ut);for(let g=u-s;g<=u+s;g+=1)for(let w=m-s;w<=m+s;w+=1)for(let v=f-s;v<=f+s;v+=1){const x=this.cells.get(`${g}:${w}:${v}`);if(x)for(const k of x){const S=t.distanceToSquared(k);if(S>=a**2)continue;const R=Math.sqrt(S);R>1e-4?t.addScaledVector(t.clone().sub(k).divideScalar(R),a-R):t.y+=a,o=!0}}}return o}clear(){this.cells.clear(),this.ready=!1}keyFor(t,i,a){return`${Math.floor(t/ut)}:${Math.floor(i/ut)}:${Math.floor(a/ut)}`}}const Rn=new za;class Ba{constructor(){He(this,"center",new Pt);He(this,"texture");He(this,"height",new Float32Array(X**2));He(this,"velocity",new Float32Array(X**2));He(this,"nextHeight",new Float32Array(X**2));He(this,"nextVelocity",new Float32Array(X**2));He(this,"pixels",new Uint8Array(X**2*4));He(this,"accumulator",0);for(let t=0;t<this.pixels.length;t+=4)this.pixels[t]=128,this.pixels[t+1]=128,this.pixels[t+2]=128,this.pixels[t+3]=255;this.texture=new ci(this.pixels,X,X,li,ui),this.texture.minFilter=xn,this.texture.magFilter=xn,this.texture.wrapS=this.texture.wrapT=di,this.texture.colorSpace=Tn,this.texture.needsUpdate=!0}moveWindowTo(t,i){(this.center.x-t)**2+(this.center.y-i)**2<180**2||(this.center.set(t,i),this.height.fill(0),this.velocity.fill(0),this.nextHeight.fill(0),this.nextVelocity.fill(0),this.encodeTexture())}addRipple(t,i,a=.8,s=20){const o=(t-this.center.x)/Ze+.5,d=(i-this.center.y)/Ze+.5;if(o<=0||o>=1||d<=0||d>=1)return;const u=o*(X-1),m=d*(X-1),f=Math.max(2,s/Ze*X),g=Math.ceil(f*2.4),w=Math.max(1,Math.floor(u-g)),v=Math.min(X-2,Math.ceil(u+g)),x=Math.max(1,Math.floor(m-g)),k=Math.min(X-2,Math.ceil(m+g));for(let S=x;S<=k;S+=1)for(let R=w;R<=v;R+=1){const D=(R-u)**2+(S-m)**2,O=Math.exp(-D/(f*f*.72));this.velocity[S*X+R]+=a*O}}displaceSphere(t,i,a){if(a<=.001)return;const s=Math.min(t.x,i.x)-a,o=Math.max(t.x,i.x)+a,d=Math.min(t.z,i.z)-a,u=Math.max(t.z,i.z)+a,m=R=>((R-this.center.x)/Ze+.5)*(X-1),f=R=>((R-this.center.y)/Ze+.5)*(X-1),g=Math.max(1,Math.floor(m(s))),w=Math.min(X-2,Math.ceil(m(o))),v=Math.max(1,Math.floor(f(d))),x=Math.min(X-2,Math.ceil(f(u)));if(g>w||v>x)return;const k=a*a,S=(R,D,O)=>{const y=(R-O.x)**2+(D-O.z)**2;if(y>=k)return 0;const A=Math.sqrt(k-y),ie=O.y-A,N=O.y+A;return pe.clamp(We-ie,0,N-ie)};for(let R=v;R<=x;R+=1){const D=this.center.y+(R/(X-1)-.5)*Ze;for(let O=g;O<=w;O+=1){const y=this.center.x+(O/(X-1)-.5)*Ze,A=S(y,D,t),ie=S(y,D,i),N=(A-ie)/a;if(Math.abs(N)<1e-5)continue;const I=R*X+O;this.height[I]+=pe.clamp(N*.58,-.48,.48),this.velocity[I]+=pe.clamp(N*.1,-.08,.08)}}}step(t){this.accumulator+=Math.min(t,.05);const i=1/30;let a=!1;for(;this.accumulator>=i;){for(let s=1;s<X-1;s+=1)for(let o=1;o<X-1;o+=1){const d=s*X+o,u=this.height[d-1]+this.height[d+1]+this.height[d-X]+this.height[d+X]-this.height[d]*4,m=(this.velocity[d]+u*.22)*.986;this.nextVelocity[d]=m,this.nextHeight[d]=(this.height[d]+m*.78)*.998}[this.height,this.nextHeight]=[this.nextHeight,this.height],[this.velocity,this.nextVelocity]=[this.nextVelocity,this.velocity],this.nextHeight.fill(0),this.nextVelocity.fill(0),this.accumulator-=i,a=!0}a&&this.encodeTexture()}dispose(){this.texture.dispose()}encodeTexture(){for(let t=0;t<this.height.length;t+=1){const i=Math.round(pe.clamp(128+this.height[t]*42,0,255)),a=t*4;this.pixels[a]=i,this.pixels[a+1]=i,this.pixels[a+2]=i,this.pixels[a+3]=255}this.texture.needsUpdate=!0}}const Be=new Ba;function Da(e,t,i){let a=t-e;for(;a<-Math.PI;)a+=Math.PI*2;for(;a>Math.PI;)a-=Math.PI*2;return e+a*i}function $a(){const e=n.useRef(null),t=jn(In,"/waternormals.jpeg");t.wrapS=t.wrapT=Pn;const i=n.useMemo(()=>new gi(tn,tn),[]),a=n.useMemo(()=>{const s=new ai(i,{textureWidth:512,textureHeight:512,waterNormals:t,sunDirection:Aa.clone(),sunColor:new Mt("#fff2cc"),waterColor:new Mt(Oa),distortionScale:10.7,alpha:.955,fog:!1}),o=s.material;return o.transparent=!0,o.uniforms.rippleSampler={value:Be.texture},o.uniforms.rippleCenter={value:Be.center},o.uniforms.rippleWorldSize={value:Ze},o.uniforms.rippleTexel={value:new Pt(1/X,1/X)},o.uniforms.surfacePulseTime={value:_n()},o.uniforms.surfacePulseCenters={value:Array.from({length:ze},()=>new Pt)},o.uniforms.surfacePulseStarts={value:new Float32Array(ze).fill(-1e3)},o.uniforms.surfacePulseDurations={value:new Float32Array(ze).fill(1)},o.uniforms.surfacePulseRadii={value:new Float32Array(ze)},o.uniforms.surfacePulseStrengths={value:new Float32Array(ze)},o.fragmentShader=o.fragmentShader.replace("uniform vec3 waterColor;",`uniform vec3 waterColor;
          uniform sampler2D rippleSampler;
          uniform vec2 rippleCenter;
          uniform float rippleWorldSize;
          uniform vec2 rippleTexel;
          uniform float surfacePulseTime;
          uniform vec2 surfacePulseCenters[${ze}];
          uniform float surfacePulseStarts[${ze}];
          uniform float surfacePulseDurations[${ze}];
          uniform float surfacePulseRadii[${ze}];
          uniform float surfacePulseStrengths[${ze}];

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
          for (int pulseIndex = 0; pulseIndex < ${ze}; pulseIndex++) {
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
          );`),o.needsUpdate=!0,s.renderOrder=2,s},[i,t]);return a.material.uniforms.waterColor.value.convertSRGBToLinear(),n.useEffect(()=>()=>{i.dispose(),a.material.dispose()},[i,a]),nt((s,o)=>{if(Be.step(o),e.current){const d=e.current.material;d.uniforms.time.value+=o,d.uniforms.rippleCenter.value.copy(Be.center);const u=_n();d.uniforms.surfacePulseTime.value=u;const m=d.uniforms.surfacePulseCenters.value,f=d.uniforms.surfacePulseStarts.value,g=d.uniforms.surfacePulseDurations.value,w=d.uniforms.surfacePulseRadii.value,v=d.uniforms.surfacePulseStrengths.value;for(let x=0;x<ze;x+=1){const k=mt[x];if(!k){f[x]=-1e3,g[x]=1,w[x]=0,v[x]=0;continue}m[x].set(k.x,k.z),f[x]=k.startedAt,g[x]=k.duration,w[x]=k.radius,v[x]=k.strength}}}),r.jsx("primitive",{object:a,ref:e,"rotation-x":-Math.PI/2})}function Fa(){const e=On(),t=n.useMemo(()=>{const i=new Mn({color:"#315057",roughness:.96,metalness:0,side:fi});return Ln(i,e),i},[e]);return n.useEffect(()=>()=>t.dispose(),[t]),nt(i=>{Ar.value=i.clock.elapsedTime}),r.jsxs("mesh",{"rotation-x":-Math.PI/2,"position-y":St,renderOrder:0,receiveShadow:!0,children:[r.jsx("planeGeometry",{args:[tn,tn]}),r.jsx("primitive",{object:t,attach:"material"})]})}function Ua(){const e=n.useRef(0),t=n.useMemo(()=>Array.from({length:14},(s,o)=>{const d=o%2===0?2:3,u=o*2.399963229728653,m=95+o%7*135,f=Math.cos(u)*m,g=Math.sin(u)*m-260;return Array.from({length:d},(w,v)=>({baseX:f+Math.cos(u+v*1.7)*(2.4+v*1.8),baseZ:g+Math.sin(u+v*1.7)*(2.4+v*1.8),phase:(o/14+v*.027+o%3*.013)%1,duration:17+o%5*2.2+v*1.4,size:5.2+o%4*.9+v*.65,drift:2.4+o%3*1.1,driftPhase:u+v*2.1}))}).flat(),[]),i=n.useMemo(()=>{const s=new hi;return s.setAttribute("position",new un(new Float32Array(t.length*3),3)),s.setAttribute("aSize",new un(new Float32Array(t.length),1)),s.setAttribute("aAlpha",new un(new Float32Array(t.length),1)),s},[t.length]),a=n.useMemo(()=>new br({transparent:!0,depthWrite:!1,toneMapped:!1,uniforms:{visibility:{value:0}},vertexShader:`
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
        `}),[]);return n.useEffect(()=>()=>{i.dispose(),a.dispose()},[i,a]),nt(({camera:s,clock:o},d)=>{e.current=pe.damp(e.current,s.position.y<We-.45?1:0,5.2,d),a.uniforms.visibility.value=e.current;const u=i.getAttribute("position"),m=i.getAttribute("aSize"),f=i.getAttribute("aAlpha"),g=o.elapsedTime,w=We-St-7;t.forEach((v,x)=>{const k=(g/v.duration+v.phase)%1,S=Math.sin(g*.72+v.driftPhase+k*Math.PI*3)*v.drift,R=Math.cos(g*.51+v.driftPhase*1.4)*v.drift*.55,D=pe.smoothstep(k,0,.08),O=1-pe.smoothstep(k,.8,.985);u.setXYZ(x,v.baseX+S,St+4+k*w,v.baseZ+R),m.setX(x,v.size*(.82+k*.48)),f.setX(x,D*O*.86)}),u.needsUpdate=!0,m.needsUpdate=!0,f.needsUpdate=!0}),r.jsx("points",{geometry:i,material:a,frustumCulled:!1,renderOrder:5})}function Wa(){const e=n.useRef(null),{camera:t}=pt(),i=jn(In,"/waternormals.jpeg");n.useMemo(()=>{i.wrapS=i.wrapT=Pn,i.colorSpace=Tn,i.needsUpdate=!0},[i]);const a=n.useMemo(()=>new br({uniforms:{time:{value:0},normalSampler:{value:i},rippleSampler:{value:Be.texture},rippleCenter:{value:Be.center},rippleWorldSize:{value:Ze}},vertexShader:`
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
        `,side:bi,transparent:!0,depthWrite:!1}),[i]);return n.useEffect(()=>()=>a.dispose(),[a]),nt(s=>{a.uniforms.time.value=s.clock.elapsedTime,a.uniforms.rippleCenter.value.copy(Be.center),e.current&&(e.current.position.x=t.position.x,e.current.position.z=t.position.z,e.current.visible=t.position.y<We+1)}),r.jsxs("mesh",{ref:e,"rotation-x":-Math.PI/2,"position-y":We-.08,renderOrder:3,frustumCulled:!1,children:[r.jsx("planeGeometry",{args:[16e3,16e3,128,128]}),r.jsx("primitive",{object:a,attach:"material"})]})}function Ya(){const{camera:e}=pt();return n.useEffect(()=>{const t=new vi,i=new Pt,a=new yi(new ae(0,1,0),0),s=new ae,o=d=>{document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1"&&(!d.isPrimary||d.button>0||d.target instanceof Element&&d.target.closest("button, input, textarea, select, a, [role='button'], [data-ocean-control]")||(i.set(d.clientX/window.innerWidth*2-1,-(d.clientY/window.innerHeight)*2+1),t.setFromCamera(i,e),t.ray.intersectPlane(a,s)&&(Be.addRipple(s.x,s.z,-1.05,22),Nr(s.x,s.z,{duration:2.7,radius:82,strength:.72,kind:"click"}))))};return window.addEventListener("pointerdown",o,{passive:!0}),()=>window.removeEventListener("pointerdown",o)},[e]),null}function Va(){const{camera:e,scene:t}=pt(),i=n.useRef(0),a=n.useRef(null),s=n.useMemo(()=>new Mt(Ir),[]),o=n.useMemo(()=>new Mt("#04395a"),[]),d=n.useMemo(()=>new Mt,[]),u=n.useMemo(()=>new wi("#0a5273",0),[]);return nt((m,f)=>{const g=e.position.y<We-.45;i.current=pe.damp(i.current,g?1:0,4.8,f);const w=i.current;d.lerpColors(s,o,w),t.background=d,u.density=w*.0028,t.fog=w>.003?u:null,a.current===null?a.current=g:g!==a.current&&(a.current=g,window.dispatchEvent(new CustomEvent("ocean-surface-cross",{detail:{underwater:g}})))}),n.useEffect(()=>()=>{t.fog=null,t.background=s},[s,t]),null}function Xa(){const e=n.useRef(null),{camera:t}=pt();return nt((i,a)=>{e.current&&(e.current.intensity=pe.damp(e.current.intensity,t.position.y<We-.45?.24:0,4.2,a))}),r.jsx("hemisphereLight",{ref:e,color:"#65c9f1",groundColor:"#041b2b",intensity:0})}function Ha(){const e=n.useRef(null),t=n.useRef(1),{camera:i}=pt();return n.useEffect(()=>{const a=e.current?.material;a&&(a.transparent=!0,a.depthWrite=!1,a.needsUpdate=!0)},[]),nt((a,s)=>{const o=e.current?.material;o&&(t.current=pe.damp(t.current,i.position.y<We-.45?0:1,4.8,s),o.opacity=t.current,e.current.visible=t.current>.004)}),r.jsx(ii,{ref:e,distance:Ta,sunPosition:Mr,turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})}function qa(){const{scene:e}=rn("/island.gltf"),t=On(),i=n.useMemo(()=>{const a=e.clone(!0);return a.scale.setScalar(100),a.position.set(0,-5,-300),a.traverse(s=>{if(!(s instanceof At))return;const d=(Array.isArray(s.material)?s.material:[s.material]).map(u=>{const m=u.clone();return m instanceof Mn&&(m.roughness=Math.max(m.roughness,.82),m.metalness=Math.min(m.metalness,.02),m.envMapIntensity=.08,Ln(m,t)),m.needsUpdate=!0,m});s.material=Array.isArray(s.material)?d:d[0],s.castShadow=!0,s.receiveShadow=!0}),a},[t,e]);return n.useLayoutEffect(()=>(Rn.build(i),()=>Rn.clear()),[i]),n.useEffect(()=>()=>{i.traverse(a=>{if(!(a instanceof At))return;(Array.isArray(a.material)?a.material:[a.material]).forEach(o=>o.dispose())})},[i]),r.jsx("primitive",{object:i})}function Ga(){const e=n.useRef(null),{camera:t}=pt(),{scene:i}=rn("/wolfy.glb"),a=On(),s=n.useMemo(()=>si.clone(i),[i]),o=n.useMemo(()=>La(),[]),d=Math.abs(o.position[1]-Tt)<.1,u=n.useRef(new ae),m=n.useRef(0),f=n.useRef(0),g=n.useRef(0),w=n.useRef(0),v=n.useRef(new ae),x=n.useRef(0),k=n.useRef(o.position[1]),S=n.useRef(d),R=n.useRef(!d),D=n.useRef(!1),O=n.useRef(!1),y=n.useRef(new ae(0,0,1)),A=n.useRef(o.position[1]),ie=n.useRef(null),N=n.useRef(new ae),I=n.useRef(new ae),z=n.useRef(new ae(0,1,0)),W=n.useMemo(()=>{s.updateWorldMatrix(!0,!0);const P=new xi().setFromObject(s);if(P.isEmpty())return{localCenter:new ae(0,.65,0),radius:6.5};const j=P.getSize(new ae).multiplyScalar(hn),Y=P.getCenter(new ae).multiplyScalar(hn),ue=Math.max(j.x,j.z)*.5,se=j.y*.32;return{localCenter:Y,radius:pe.clamp(Math.max(ue,se),5,14)}},[s]);return n.useEffect(()=>{s.traverse(P=>{P instanceof At&&P.material instanceof Mn&&(P.material=P.material.clone(),P.material.roughness=.42,P.material.metalness=.05,P.material.envMapIntensity=.35,Ln(P.material,a,{includeRipple:!1,baseLight:0,causticsStrength:.78,lightTint:[1,.98,.9]}),P.castShadow=!0,P.receiveShadow=!0)})},[a,s]),n.useEffect(()=>{Zt.current=e.current;const P=se=>{const{x:T,z:de}=se.detail;u.current.set(T,0,de)},j=()=>{D.current||!S.current&&!R.current||(D.current=!0,R.current=!1,S.current=!1,k.current=e.current.position.y,x.current=ja)},Y=se=>{const{y:T}=se.detail;m.current=pe.clamp(T,-1,1),Math.abs(m.current)>.01&&(D.current=!1,R.current=!0,S.current=!1)},ue=se=>{if(O.current=se.detail.enabled,!O.current){u.current.set(0,0,0),m.current=0,D.current=!1;const T=Math.abs(e.current.position.y-Tt)<.1;S.current=T,R.current=!T,f.current=0,g.current=0,gn(e.current)}};return window.addEventListener("explore-joystick",P),window.addEventListener("explore-jump",j),window.addEventListener("explore-vertical",Y),window.addEventListener("explore-mode",ue),O.current=document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1",()=>{window.removeEventListener("explore-joystick",P),window.removeEventListener("explore-jump",j),window.removeEventListener("explore-vertical",Y),window.removeEventListener("explore-mode",ue),gn(e.current),Zt.current===e.current&&(Zt.current=null)}},[]),nt((P,j)=>{if(!e.current||!O.current)return;const Y=new ae(u.current.x+(ve.arrowright||ve.d?1:0)-(ve.arrowleft||ve.a?1:0),0,u.current.z+(ve.arrowup||ve.w?1:0)-(ve.arrowdown||ve.s?1:0));Y.lengthSq()<.01&&Y.set(0,0,0);const ue=u.current.lengthSq()>.01||Math.abs(m.current)>.01;f.current=ue?f.current+j:0;const se=!!ve.shift||f.current>.45;g.current=pe.damp(g.current,se?1:0,se?5.5:3.8,j);const T=new ae;t.getWorldDirection(T),T.y=0,T.normalize();const de=new ae().crossVectors(T,new ae(0,1,0)).normalize(),$=new ae().addScaledVector(T,Y.z).addScaledVector(de,Y.x);$.lengthSq()>1e-4&&$.normalize();const Ie=100*(1+g.current*1.65);v.current.lerp($.multiplyScalar(Ie),j*6);const te=e.current.position.clone().addScaledVector(v.current,j),Q=(ve.e?1:0)-(ve.q?1:0),q=pe.clamp(Q+m.current,-1,1);if(Math.abs(q)>.01&&(D.current=!1,R.current=!0,S.current=!1),D.current)x.current-=tr*Math.min(j,.05);else if(R.current){const ne=58*(1+g.current*1.2);x.current=pe.damp(x.current,q*ne,q===0?7.5:6,j)}else x.current-=tr*Math.min(j,.05);te.y+=x.current*Math.min(j,.05);const le=D.current?k.current:Tt;if(!R.current&&te.y<=le&&(te.y=le,x.current=0,S.current=!0,D.current=!1,R.current=Math.abs(le-Tt)>=.1),te.y=pe.clamp(te.y,St+8,Cn),(te.y===St+8||te.y===Cn)&&(x.current=0),Rn.resolve(te,5)&&(v.current.multiplyScalar(.2),x.current*=.2),e.current.position.copy(te),Be.moveWindowTo(te.x,te.z),I.current.copy(W.localCenter).applyAxisAngle(z.current,e.current.rotation.y),N.current.copy(te).add(I.current),ie.current?Be.displaceSphere(ie.current,N.current,W.radius):ie.current=N.current.clone(),A.current>We&&N.current.y<=We||A.current<We&&N.current.y>=We){const ne=N.current.y>A.current,ge=Math.max(34,W.radius*2.8);Be.addRipple(N.current.x,N.current.z,ne?.46:-2.05,ne?W.radius*1.6:ge),Nr(N.current.x,N.current.z,{duration:ne?2.2:3.5,radius:ne?ge*1.55:ge*3.3,strength:ne?.58:1.55,kind:ne?"rise":"dive"}),window.dispatchEvent(new CustomEvent("ocean-player-splash",{detail:{submerging:!ne,speed:Math.abs(x.current)}})),!ne&&!D.current&&(x.current=Math.min(x.current,-72))}if(A.current=N.current.y,ie.current.copy(N.current),Y.lengthSq()>.01){const ne=$.clone();Y.z<-.2&&ne.copy(T),y.current.lerp(ne,.15).normalize();const ge=Math.atan2(y.current.x,y.current.z);e.current.rotation.y=Da(e.current.rotation.y,ge,.15)}e.current.userData.joyX=u.current.x,w.current+=j,w.current>=.45&&(w.current=0,gn(e.current))}),r.jsx("primitive",{ref:e,object:s,scale:hn,position:o.position,rotation:[0,o.rotationY,0]})}function Ka(){const{camera:e}=pt(),t=n.useRef(0),i=n.useRef(0),a=n.useRef(!1);return n.useEffect(()=>{const s=o=>{a.current=o.detail.enabled};return window.addEventListener("explore-mode",s),()=>window.removeEventListener("explore-mode",s)},[]),nt((s,o)=>{const d=Zt.current;if(!d)return;i.current+=o*(a.current?1:-1),i.current=pe.clamp(i.current,0,1);const u=i.current*i.current*(3-2*i.current),f=(ve.arrowright||ve.d?1:0)-(ve.arrowleft||ve.a?1:0)+(d.userData?.joyX??0);Math.abs(f)>.05&&(t.current-=f*o*2.5);const g=new ae(0,22,70);g.applyAxisAngle(new ae(0,1,0),t.current);const w=d.position.clone().add(g),x=new ae(0,20,100).add(new ae(Math.sin(i.current*Math.PI)*20,0,0)).lerp(w,u);e.position.lerp(x,.12);const k=new ae(0,5,0),S=d.position.clone();S.y+=6,e.lookAt(k.lerp(S,u))}),null}function Za(){const e=n.useRef(null),t=n.useRef(!1);return n.useEffect(()=>{const i=new Audio("/Ocean.mp3");i.loop=!0,i.preload="auto",i.volume=0,e.current=i;const a=(m,f=2e3)=>{if(!e.current)return;const g=e.current,w=g.volume,v=performance.now(),x=k=>{const S=Math.min((k-v)/f,1);g.volume=w+(m-w)*S,S<1?requestAnimationFrame(x):m===0&&(g.pause(),g.currentTime=0)};requestAnimationFrame(x)},s=async()=>{t.current=!0;try{i.paused&&await i.play(),a(.14,2400)}catch{}},o=()=>{t.current=!1,a(0,1800)},d=m=>{m.detail.active?s():o()},u=()=>{t.current&&s()};return window.addEventListener("skyocean-audio",d),window.addEventListener("pointerdown",u,{passive:!0}),window.addEventListener("keydown",u),document.getElementById("global-sky-ocean-bg")?.getAttribute("data-audio-active")==="1"&&s(),()=>{window.removeEventListener("skyocean-audio",d),window.removeEventListener("pointerdown",u),window.removeEventListener("keydown",u),i.pause(),i.src=""}},[]),null}function Ja(){return n.useEffect(()=>{const e=new Audio("/bubble.mp3");e.preload="auto",e.volume=.24;let t=null;const i=s=>{const o=s.detail.underwater;e.pause(),e.currentTime=0,e.playbackRate=o?.9:1.08,e.play().catch(()=>{})},a=s=>{const{submerging:o,speed:d}=s.detail;if(!o)return;t??(t=new AudioContext),t.state==="suspended"&&t.resume();const u=t.currentTime,m=t.createOscillator(),f=t.createGain(),g=pe.clamp(d/70,.7,1.35);m.type="sine",m.frequency.setValueAtTime(168*g,u),m.frequency.exponentialRampToValueAtTime(54,u+.38),f.gain.setValueAtTime(1e-4,u),f.gain.exponentialRampToValueAtTime(.16*g,u+.012),f.gain.exponentialRampToValueAtTime(1e-4,u+.44),m.connect(f),f.connect(t.destination),m.start(u),m.stop(u+.46)};return window.addEventListener("ocean-surface-cross",i),window.addEventListener("ocean-player-splash",a),()=>{window.removeEventListener("ocean-surface-cross",i),window.removeEventListener("ocean-player-splash",a),e.pause(),e.src="",t&&t.close()}},[]),null}function Qa(){return r.jsxs(r.Fragment,{children:[r.jsx(Za,{}),r.jsx(Ja,{}),r.jsxs(ri,{shadows:!0,dpr:[1,1.5],camera:{position:[0,20,100],fov:55,near:.1,far:Ma},gl:{antialias:!0,toneMapping:pi,toneMappingExposure:.8,outputColorSpace:mi},children:[r.jsx("color",{attach:"background",args:[Ir]}),r.jsx("directionalLight",{position:Mr,intensity:1,color:Na,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-camera-near":10,"shadow-camera-far":1800,"shadow-camera-left":-500,"shadow-camera-right":500,"shadow-camera-top":500,"shadow-camera-bottom":-500}),r.jsx("ambientLight",{intensity:.35,color:"#ffffff"}),r.jsx(Xa,{}),r.jsx(Ha,{}),r.jsxs(n.Suspense,{fallback:null,children:[r.jsx(Fa,{}),r.jsx(Ua,{}),r.jsx($a,{}),r.jsx(Wa,{}),r.jsx(qa,{}),r.jsx(Ga,{})]}),r.jsx(Ka,{}),r.jsx(Ya,{}),r.jsx(Va,{})]})]})}rn.preload("/wolfy.glb");rn.preload("/island.gltf");function Bt(e,t){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(t)}function es(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function ts(){const{data:e,error:t}=await H.from("archive_sections").select("*").eq("is_visible",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(t)throw Bt(t,"Unable to load the archive sections.");return e??[]}async function Ls(){const{data:e,error:t}=await H.from("archive_sections").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(t)throw Bt(t,"Unable to load the archive section manager.");return e??[]}async function zs(e,t,i){const a=e.trim(),s=es(a),o=t.trim().toUpperCase().slice(0,8);if(!a||!s)throw new Error("Enter a section name.");if(!o)throw new Error("Enter a short section code.");const{data:d,error:u}=await H.from("archive_sections").insert({name:a,slug:s,code:o,sort_order:i,is_visible:!0}).select("*").single();if(u)throw Bt(u,"Unable to create the archive section.");return d}async function Bs(e,t){const i={...t,...t.name!==void 0?{name:t.name.trim()}:{},...t.code!==void 0?{code:t.code.trim().toUpperCase().slice(0,8)}:{}},{data:a,error:s}=await H.from("archive_sections").update(i).eq("id",e).select("*").single();if(s)throw Bt(s,"Unable to save the archive section.");return a}async function Ds(e){const{error:t}=await H.from("archive_sections").delete().eq("id",e.id);if(t)throw Bt(t,"Unable to delete this section. Move its books to another section first.")}const rr=[{id:"default-objects",slug:"objects",name:"Objects",code:"OBJ",sort_order:0,is_visible:!0,created_at:"",updated_at:""},{id:"default-graphics",slug:"graphics",name:"Graphics",code:"GRPH",sort_order:1,is_visible:!0,created_at:"",updated_at:""},{id:"default-concepts",slug:"concepts",name:"Concepts",code:"CNCP",sort_order:2,is_visible:!0,created_at:"",updated_at:""}],ns=`
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
`,ce={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode"},rs="Gabriel Dell'Aiuto. b. 1996. Studier Zimmer is a space for G and friends.",ir="global-spotify-player";function Vt(e,t=!1){let i=document.getElementById(ir);if(!(!i&&!e&&!t)){if(!i){i=document.createElement("div"),i.id=ir,Object.assign(i.style,{position:"fixed",bottom:"194px",left:"50%",width:"min(92vw, 430px)",zIndex:"210",overflow:"hidden",borderRadius:"12px",background:"#e6e6e6",boxShadow:"0 20px 60px rgb(0 0 0 / 0.22)",transformOrigin:"bottom",transition:"opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)"});const a=document.createElement("iframe");a.title="Spotify playlist",a.src="https://open.spotify.com/embed/playlist/5Z63kqzOn4CzWqazejJZEv?utm_source=generator&si=a41c800f68534cb7",a.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",a.allowFullscreen=!0,a.loading="lazy",a.frameBorder="0",Object.assign(a.style,{display:"block",width:"100%",height:"min(352px, calc(100dvh - 218px))",minHeight:"96px",border:"0"}),i.appendChild(a),document.body.appendChild(i)}i.style.pointerEvents=e?"auto":"none",i.style.opacity=e?"1":"0",i.style.transform=e?"translateX(-50%) translateY(0) scale(1)":"translateX(-50%) translateY(16px) scale(0.75)"}}const is=()=>{const e=nn(),i=n.useRef(sessionStorage.getItem(zt)==="true").current,s=n.useRef(sessionStorage.getItem(Lt)==="true"||i||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,d=n.useRef(s&&sessionStorage.getItem(ce.returnFlag)==="true").current,[u]=n.useState(()=>an()),[m,f]=n.useState(s),[g,w]=n.useState([]),[v,x]=n.useState(!0),[k,S]=n.useState(null),[R,D]=n.useState(rr),[O,y]=n.useState(!1),A=n.useCallback(async()=>{x(!0);try{const c=await Sr();w(c),S(null)}catch(c){console.error("Unable to load published books",c),S(c instanceof Error?c.message:"Unable to load the published books.")}finally{x(!1)}},[]),ie=n.useCallback(async()=>{try{const c=await ts();D(c),y(!0)}catch{D(rr),y(!1)}},[]);n.useEffect(()=>{A(),ie();const c=()=>{A(),ie()},b=()=>{document.visibilityState==="visible"&&A()};return window.addEventListener("focus",c),document.addEventListener("visibilitychange",b),()=>{window.removeEventListener("focus",c),document.removeEventListener("visibilitychange",b)}},[ie,A]);const N=n.useMemo(()=>g.find(c=>c.is_featured)??g[0]??null,[g]),I=n.useMemo(()=>{if(O)return R;const c=[...R];return g.forEach(b=>{c.some(M=>M.slug===b.category)||c.push({id:`fallback-${b.category}`,slug:b.category,name:b.category.replace(/-/g," "),code:b.category.slice(0,4).toUpperCase(),sort_order:c.length,is_visible:!0,created_at:"",updated_at:""})}),c},[R,O,g]),z=n.useMemo(()=>{const c=new Map(I.map(M=>[M.slug,M])),b=M=>({id:M.id,category:c.get(M.category)?.code??M.category.slice(0,4).toUpperCase(),name:M.title,link:`/book/${encodeURIComponent(M.slug)}`,isFeatured:M.is_featured});return I.reduce((M,ee)=>(M[ee.slug]=g.filter(Xe=>Xe.category===ee.slug).map(b),M),{})},[I,g]),W=n.useMemo(()=>Object.values(z).flat(),[z]);n.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const c="__GLOBAL_SKY_OCEAN_BG_ROOT__",b=window,M=document.getElementById("global-sky-ocean-bg");if(b[c]){M&&(M.style.display="block",M.style.zIndex="0");return}const ee=document.createElement("div");ee.id="global-sky-ocean-bg",Object.assign(ee.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(ee);const Xe=hr.createRoot(ee);Xe.render(r.jsx(n.Suspense,{fallback:null,children:r.jsx(Qa,{})})),b[c]=Xe},[]);const P=i?"intro":sessionStorage.getItem(ce.stage)||"intro",j=sessionStorage.getItem(ce.activeButton)||null,Y=sessionStorage.getItem(ce.searchOpen)==="true",ue=sessionStorage.getItem(ce.searchQuery)||"",se=sessionStorage.getItem(ce.exploreMode)==="true",[T,de]=n.useState(P),[$,Ie]=n.useState(j),[te,Q]=n.useState(Y),[q,le]=n.useState(ue),[F,ne]=n.useState(se),[ge,ye]=n.useState(!1),Et=P==="list"||!!j||Y,[Ae,B]=n.useState(Et),[U,_e]=n.useState(!1),[be,Ne]=n.useState(!1),[xe,Je]=n.useState(!1),[J,Ct]=n.useState(!1);n.useEffect(()=>{if(!J||be)return;if(s){f(!0);return}f(!1);let c=0;const b=window.requestAnimationFrame(()=>{c=window.requestAnimationFrame(()=>{f(!0)})});return()=>{window.cancelAnimationFrame(b),window.cancelAnimationFrame(c)}},[J,s,be]);const[Qe,Pe]=n.useState(!1),[G,me]=n.useState(!1),[De,K]=n.useState(!1),[re,C]=n.useState(!1),[qe,lt]=n.useState(!d),Re=n.useRef(null),[we,Ye]=n.useState(()=>{if(s)return!1;try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),Ve=n.useRef(null),$e=n.useRef(null);n.useEffect(()=>()=>{Re.current&&window.clearTimeout(Re.current)},[]),n.useEffect(()=>{if(!xe||T!=="intro"||De||G||!we)return;const c=window.setTimeout(()=>{C(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(c)}},[De,xe,G,we,T]),n.useEffect(()=>{if(T!=="main"&&T!=="list"||G||!we||qe)return;const c=window.setTimeout(()=>{lt(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(c)}},[qe,G,we,T]);const[_t,ht]=n.useState(!1),fe=n.useRef(null),Oe=n.useRef(null),[et,Fe]=n.useState(!1);n.useEffect(()=>{if(!s)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem(Lt),sessionStorage.removeItem(zt),sessionStorage.removeItem("revealDone"),Ye(!1),Pe(!1),document.documentElement.style.background="",document.body.style.background="";const c=document.getElementById("global-sky-ocean-bg");c&&(c.style.display="block",c.style.zIndex="0")},[s]),n.useEffect(()=>{try{sessionStorage.setItem(ce.exploreMode,String(F))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:F}}));const c=document.getElementById("global-sky-ocean-bg");c&&c.setAttribute("data-explore",F?"1":"0")},[F]),n.useEffect(()=>{F||(ye(!1),Vt(!1))},[F]),n.useEffect(()=>(Vt(!1,!0),()=>{Vt(!1)}),[]),n.useEffect(()=>{const c=J&&!be&&!G;document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active",c?"1":"0");const M=window.setTimeout(()=>{window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:c}}))},0);return()=>window.clearTimeout(M)},[J,G,be]),n.useEffect(()=>()=>{document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active","0"),window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:!1}}))},[]),n.useEffect(()=>{sessionStorage.setItem(ce.stage,T),sessionStorage.setItem(ce.activeButton,$??""),sessionStorage.setItem(ce.searchOpen,String(te)),sessionStorage.setItem(ce.searchQuery,q)},[T,$,te,q]),n.useEffect(()=>{!sessionStorage.getItem(ce.splash)&&T==="intro"&&!s?Ne(!0):Je(!0),Ct(!0)},[s,T]);const gt=n.useCallback(()=>{sessionStorage.setItem(ce.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const c=document.getElementById("global-sky-ocean-bg");c&&(c.style.display="none"),Ne(!1),e(N?`/book/${encodeURIComponent(N.slug)}`:"/books")},[N,e]);n.useEffect(()=>{(xe||s)&&!we&&!Qe&&!G&&Pe(!0)},[xe,s,G,we,Qe]);const rt=n.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}Ve.current?(Ve.current.classList.add("fade-out"),setTimeout(()=>{Pe(!1),Ye(!0)},240)):(Pe(!1),Ye(!0))},[]),it=n.useCallback(c=>{G||($e.current=c,Pe(!1),me(!0))},[G]),tt=n.useCallback(()=>{const c=$e.current;if(!c)return;document.documentElement.style.background="white",document.body.style.background="white";const b=document.getElementById("global-sky-ocean-bg");b&&(b.style.display="none"),e(c)},[e]),oe=n.useCallback(()=>{Ie(null),Q(!1),le(""),de("main")},[]),Ue=n.useCallback(()=>{B(!1)},[]),p=n.useCallback(()=>{_e(!1),Ae&&oe(),B(c=>!c),window.dispatchEvent(new Event("mousemove"))},[Ae,oe]),_=n.useCallback(()=>{if(U){_e(!1);return}oe(),B(!1),_e(!0),window.dispatchEvent(new Event("mousemove"))},[U,oe]),E=n.useMemo(()=>W.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())),[W,q]),Se=n.useCallback(()=>{if($&&$!=="search"&&!q){const c=z[$]||[],b=W.filter(M=>!c.some(ee=>ee.id===M.id));return[...c,...b]}if($==="search"&&q){const c=E,b=W.filter(M=>!c.some(ee=>ee.id===M.id));return[...c,...b]}return W},[$,q,z,W,E])(),l=n.useCallback(c=>{$===c?oe():(Ie(c),de("list"),Q(!1),le(""))},[$,oe]),h=n.useCallback(c=>{const b=Oe.current?Oe.current.scrollTop:0;sessionStorage.setItem(ce.listScroll,String(b));const M={activeButton:$,searchOpen:te,searchQuery:q,stage:T,introVisible:xe,archiveOpen:Ae};try{sessionStorage.setItem(ce.snapshot,JSON.stringify(M))}catch{}sessionStorage.setItem(ce.returnFlag,"true"),it(c)},[$,Ae,it,xe,te,q,T]),L=n.useCallback(()=>{oe(),Ue(),_e(!1),K(!1),C(!1),de("intro")},[Ue,oe]),V=n.useCallback(()=>{De||G||(K(!0),lt(!1),Ue(),_e(!1),Re.current=window.setTimeout(()=>{de("main"),K(!1)},1160))},[Ue,De,G]),Z=n.useCallback(()=>{!u||G||it(`/book/${encodeURIComponent(u.slug)}`)},[it,u,G]),je=n.useCallback(()=>{$==="search"?oe():(Q(!0),de("list"),Ie("search"))},[$,oe]),he=n.useCallback(()=>{ht(!1),fe.current&&clearTimeout(fe.current),fe.current=window.setTimeout(()=>{ht(!0)},5e3)},[]);n.useEffect(()=>{const c=["mousemove","mousedown","touchstart","touchmove","keydown"];return c.forEach(b=>{window.addEventListener(b,he)}),he(),()=>{c.forEach(b=>{window.removeEventListener(b,he)}),fe.current&&clearTimeout(fe.current)}},[he]),n.useEffect(()=>{if(!J||!(sessionStorage.getItem(ce.returnFlag)==="true"))return;let b=null;try{const M=sessionStorage.getItem(ce.snapshot);b=M?JSON.parse(M):null}catch{}if(b){Ie(b.activeButton??null),Q(!!b.searchOpen),le(b.searchQuery??""),b.archiveOpen||b.stage==="list"?B(!0):B(!1),b.stage&&de(b.stage),Je(!!b.introVisible),b.stage==="list"&&Fe(!0),sessionStorage.removeItem(ce.returnFlag);return}Je(!0),de("main"),B(!0),window.setTimeout(()=>{de("list"),Fe(!0),sessionStorage.removeItem(ce.returnFlag)},700)},[J]),n.useEffect(()=>{if(T!=="list"||!et)return;const c=Number(sessionStorage.getItem(ce.listScroll)||"0"),b=window.setTimeout(()=>{Oe.current&&(Oe.current.scrollTop=Number.isNaN(c)?0:c),Fe(!1)},0);return()=>{window.clearTimeout(b)}},[T,et]);const Ee=n.useRef(null),Te=n.useRef(null),Ce=n.useRef(!1),bt=n.useRef(!1),at=n.useRef(!1),sn=n.useRef({x:0,y:0}),Rt=n.useRef({x:0,y:0}),Dt=60,xt=n.useCallback((c,b)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:c,z:b}}))},[]),$t=n.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]),st=n.useCallback(c=>{window.dispatchEvent(new CustomEvent("explore-vertical",{detail:{y:c}}))},[]),zn=n.useCallback((c,b)=>{c.preventDefault(),c.stopPropagation(),c.currentTarget.setPointerCapture(c.pointerId),st(b)},[st]),Ft=n.useCallback(c=>{c.preventDefault(),c.stopPropagation(),c.currentTarget.hasPointerCapture(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId),st(0)},[st]);n.useEffect(()=>{F||(xt(0,0),st(0))},[F,xt,st]),n.useEffect(()=>{if(!F)return;const c=M=>{M.code==="Space"&&(M.preventDefault(),M.stopPropagation(),M.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},b=M=>{M.code==="Space"&&(c(M),M.repeat||$t())};return window.addEventListener("keydown",b,!0),window.addEventListener("keyup",c,!0),()=>{window.removeEventListener("keydown",b,!0),window.removeEventListener("keyup",c,!0)}},[F,$t]);const Or=n.useCallback(c=>{if(!F)return;Ce.current=!0,c.currentTarget.setPointerCapture(c.pointerId);const b=c.currentTarget.getBoundingClientRect();Rt.current={x:b.left+b.width/2,y:b.top+b.height/2},sn.current={x:c.clientX,y:c.clientY},at.current=!1,bt.current=Math.hypot(c.clientX-Rt.current.x,c.clientY-Rt.current.y)<=34},[F]),Lr=n.useCallback(c=>{if(!Ce.current||!Te.current)return;const b=c.clientX-Rt.current.x,M=c.clientY-Rt.current.y;Math.hypot(c.clientX-sn.current.x,c.clientY-sn.current.y)>8&&(at.current=!0);const ee=Math.hypot(b,M),Xe=ee>Dt?Dt:ee,$n=b/(ee||1)*Xe,Fn=M/(ee||1)*Xe;Te.current.style.transform=`translate(${$n}px, ${Fn}px)`;const Br=$n/Dt,Dr=-Fn/Dt;xt(Br,Dr)},[xt]),Bn=n.useCallback(c=>{Ce.current&&(Ce.current=!1,c.currentTarget.hasPointerCapture(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId),Te.current&&(Te.current.style.transform="translate(0px, 0px)"),xt(0,0),c.type!=="pointercancel"&&bt.current&&!at.current&&$t(),bt.current=!1,at.current=!1)},[xt,$t]),zr=n.useCallback(c=>!!($&&$!=="search"&&z[$]?.some(b=>b.id===c.id)||$==="search"&&q&&E.some(b=>b.id===c.id)),[$,z,E,q]),on=xe&&T==="intro"?G||De?"is-leaving":we?re?"is-visible":"is-entering":"is-outside":"is-outside",Dn=(T==="main"||T==="list")&&G?"is-leaving":we?qe?"is-visible":"is-entering":"is-outside",Ut=T==="main"||T==="list"?Dn:"is-outside",cn=T==="list"?"-15vh":Ae||U?"-42px":"0px",vt=I.length+3,Wt=c=>({animate:{y:T==="main"||T==="list"?cn:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:c*.025}}),jt=(c,b=vt)=>{const M=c*.055,ee=Math.max(0,b-1-c)*.035,Xe={scale:0,opacity:0,filter:"blur(8px)",y:cn};return{initial:Xe,animate:G?{...Xe,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:ee},opacity:{duration:.16,delay:ee},filter:{duration:.2,delay:ee},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:ee}}}:{scale:1,opacity:1,filter:"blur(0px)",y:cn},exit:{...Xe,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:ee},opacity:{duration:.16,delay:ee},filter:{duration:.2,delay:ee},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:ee}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:M},opacity:{duration:.2,delay:M},filter:{duration:.25,delay:M},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:c*.025}}}};return J?r.jsxs(r.Fragment,{children:[r.jsx("style",{children:ns}),be?r.jsx(Ra,{onComplete:gt}):r.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${s?"is-returning-from-book":m?"is-entered":"is-entering"}`,children:[r.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:_t?0:1},children:[r.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${xe&&T==="intro"?"":"pointer-events-none"} ${F?"opacity-0 pointer-events-none":"opacity-100"}`,children:[r.jsxs("p",{className:`index-intro-copy intro-elastic-item ${on} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:L,children:["Studierzimmer-Ozean",r.jsx("br",{}),"studierzimmer.ch",r.jsx("br",{})]}),r.jsxs("div",{className:"flex items-center justify-center gap-2",children:[r.jsx("button",{onClick:Z,disabled:!re||De,className:`index-intro-control intro-elastic-item item-start ${on} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:r.jsx("span",{className:"animate-bounce",children:"back"})}),u&&r.jsx("button",{type:"button",onClick:V,disabled:!re||G,className:`index-intro-control intro-elastic-item item-back ${on} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:"start"})]})]}),r.jsxs("div",{className:`absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl ${T==="intro"?"pointer-events-none":""}`,style:{top:"calc(50% - 24px)"},children:[r.jsxs("div",{className:"index-main-control-row flex min-h-12 items-center justify-center gap-5 text-[16px] font-normal md:gap-10 md:text-[16px]",children:[r.jsx(Le.div,{...Wt(0),children:r.jsx("div",{className:`main-control-item item-back ${Ut}`,children:r.jsx("button",{onClick:L,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${F?"pointer-events-none opacity-0":"opacity-100"}`,children:"back"})})}),r.jsx(Le.div,{...Wt(1),children:r.jsx("div",{className:`main-control-item item-archive ${Ut}`,children:r.jsx("button",{type:"button",onClick:p,"aria-expanded":Ae,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${Ae?"animate-bounce":""} ${F?"pointer-events-none opacity-0":"opacity-100"}`,children:"archive"})})}),r.jsx(Le.div,{...Wt(2),children:r.jsx("div",{className:`main-control-item item-about ${Ut}`,children:r.jsx("button",{type:"button",onClick:_,"aria-expanded":U,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${U?"animate-bounce":""} ${F?"pointer-events-none opacity-0":"opacity-100"}`,children:"about"})})}),r.jsx(Le.div,{...Wt(3),children:r.jsx("div",{className:`main-control-item item-play ${Ut}`,children:r.jsxs("button",{onClick:c=>{c.currentTarget.blur(),ne(b=>!b)},title:F?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${F?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[r.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${F?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),r.jsx("span",{className:`whitespace-nowrap font-normal transition-all ${F?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"play"})]})})})]}),r.jsx(Un,{initial:!1,mode:"wait",children:Ae?r.jsxs(Le.div,{initial:!1,className:`index-archive-panel mx-auto mt-10 pb-0 text-center font-normal leading-[2] transition-opacity duration-500 ${F?"pointer-events-none opacity-0":"opacity-100"}`,children:[r.jsx(Le.div,{...jt(0,vt),className:"index-archive-featured archive-elastic-item item-featured min-h-[32px] text-[16px] md:text-[16px]",children:N?r.jsxs("button",{type:"button",onClick:()=>h(`/book/${encodeURIComponent(N.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[r.jsx("span",{className:"shrink-0 text-black",children:"cover"})," ",r.jsx("br",{})," ",r.jsx("br",{}),r.jsx("br",{}),r.jsx("span",{className:"truncate",children:N.title})]}):v?r.jsx("span",{className:"text-black/50",children:"..."}):k?r.jsx("button",{type:"button",onClick:()=>void A(),className:"text-black/60 bounce",children:"RETRY BOOK LIST"}):r.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),r.jsxs("div",{className:"index-archive-category-row flex flex-wrap items-center justify-center gap-2 uppercase md:gap-3",children:[r.jsx(Le.div,{...jt(1,vt),className:"archive-elastic-item item-search",children:r.jsx("button",{onClick:je,className:`index-archive-category-button z-10 flex items-center text-[16px] font-normal select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${$==="search"?"animate-bounce":"bg-alpha"}`,children:"search"})}),I.map((c,b)=>r.jsx(Le.div,{...jt(b+2,vt),className:`archive-elastic-item item-${c.slug}`,children:r.jsx("button",{onClick:()=>{l(c.slug)},className:`index-archive-category-button text-[16px] font-normal uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${$===c.slug?"animate-bounce":"bg-alpha"}`,children:c.name})},c.id))]}),r.jsx(Le.div,{...jt(vt-1,vt),className:"index-archive-search-field archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:r.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${te?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:r.jsx("input",{type:"text",placeholder:"search...",value:q,onChange:c=>{le(c.target.value)},className:"index-archive-search-input w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls"):U?r.jsx(Le.div,{initial:!1,className:`mx-auto mt-10 max-w-xl pb-0 text-center leading-[1.55] ${F?"pointer-events-none opacity-0":"opacity-100"}`,children:r.jsx(Le.div,{...jt(0,2),className:"index-about-panel archive-elastic-item px-2 text-[16px] font-normal md:text-[16px]",children:r.jsx("p",{children:rs})})},"about-panel"):null})]}),r.jsx("div",{className:`index-list-panel ${T==="list"?"is-list-open":"is-list-closed"} absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] font-normal md:text-[16px] ease-in-out ${T==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${F?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:r.jsxs("div",{className:`index-elastic-item item-list ${Dn}`,children:[r.jsxs("div",{className:"index-list-header grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] font-normal md:text-[16px]",children:[r.jsx("div",{className:"py-[0.5px]",children:"TAG"}),r.jsx("div",{className:"py-[0.5px]",children:"TITLE"})]}),!v&&!k&&W.length===0?r.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):r.jsx("div",{ref:Oe,className:"index-list-scroll overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:r.jsx(Un,{initial:!1,mode:"popLayout",children:Se.map((c,b)=>{const M=zr(c);return r.jsxs(Le.div,{initial:{scale:0,opacity:0,filter:"blur(7px)"},animate:{scale:1,opacity:1,filter:"blur(0px)"},exit:{scale:0,opacity:0,filter:"blur(7px)"},whileHover:{scale:.97},whileTap:{scale:.95},transition:{scale:{type:"spring",stiffness:430,damping:23,mass:.68,delay:b*.022},opacity:{duration:.18,delay:b*.022},filter:{duration:.22,delay:b*.022}},className:`index-list-row grid origin-center grid-cols-2 text-[16px] md:text-[16px] backdrop-blur-[1px] cursor-pointer ${M?"text-black":"text-gray-700"}`,onClick:()=>{h(c.link)},children:[r.jsx("div",{className:"py-[0.5px] tracking-normal",children:c.category}),r.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[c.name,c.isFeatured?" *":""]})]},`${$??"all"}:${c.id}`)})})})]})})]}),F&&r.jsxs(r.Fragment,{children:[r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move down (Q)",onPointerDown:c=>zn(c,-1),onPointerUp:Ft,onPointerCancel:Ft,onLostPointerCapture:()=>st(0),className:"fixed bottom-[42px] flex h-14 w-14 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border-0 bg-white/5 text-[15px] font-normal text-white/55 shadow-sm backdrop-blur-sm",style:{left:"calc(50% - 92px)",zIndex:20},children:"Q ↓"}),r.jsx("div",{ref:Ee,"data-ocean-control":!0,onPointerDown:Or,onPointerMove:Lr,onPointerUp:Bn,onPointerCancel:Bn,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:r.jsx("div",{ref:Te,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:r.jsx("span",{"aria-hidden":"true",children:"↑"})})}),r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move up (E)",onPointerDown:c=>zn(c,1),onPointerUp:Ft,onPointerCancel:Ft,onLostPointerCapture:()=>st(0),className:"fixed bottom-[42px] flex h-14 w-14 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border-0 bg-white/5 text-[15px] font-normal text-white/55 shadow-sm backdrop-blur-sm",style:{left:"calc(50% + 92px)",zIndex:20},children:"E ↑"}),r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":ge?"Close music":"Open music","aria-expanded":ge,onClick:()=>{ye(c=>(Vt(!c),!c))},className:`fixed bottom-[107px] left-[calc(50%+61px)] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-0 bg-white/5 text-white/55 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-white/10 active:scale-95 ${ge?"scale-110":""}`,style:{zIndex:22},children:r.jsxs("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",className:"h-5 w-5",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round",children:[r.jsx("path",{d:"M9 18V5l10-2v13"}),r.jsx("circle",{cx:"6",cy:"18",r:"3"}),r.jsx("circle",{cx:"16",cy:"16",r:"3"})]})})]}),(!we&&(Qe||s)||G)&&r.jsx("div",{ref:Ve,className:"reveal-overlay","aria-hidden":"true",children:r.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[r.jsx("defs",{children:r.jsxs("mask",{id:"hole-mask",children:[r.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),r.jsx("circle",{className:`mask-circle ${G?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:G?tt:rt})]})}),r.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},as=`
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
`;function ss(e){return e==="navigation_click"||e==="book_open"||e==="book_page_view"||e==="model_open"||e==="model_interaction"||e==="archive_filter"||e==="outbound_click"}function os(e){return e==="navigation"||e==="book"||e==="book_page"||e==="model"||e==="archive"||e==="external"||e==="interface"}function cs(){const e=gr(),[t,i]=n.useState(()=>Sn()),[a,s]=n.useState(t===null),[o,d]=n.useState(!1),u=n.useCallback(m=>{ra(m),i(m),s(!1),d(!1)},[]);return n.useEffect(()=>{const m=f=>{const g=f.detail;i(g)};return window.addEventListener(yn,m),()=>window.removeEventListener(yn,m)},[]),n.useEffect(()=>{t==="analytics"&&Ot({eventName:"page_view",path:e.pathname})},[t,e.pathname]),n.useEffect(()=>{const m=f=>{if(Sn()!=="analytics")return;const g=f.target instanceof Element?f.target.closest("[data-analytics-event]"):null;if(!g)return;const w=g.dataset.analyticsEvent,v=g.dataset.analyticsType,x=g.dataset.analyticsId;!ss(w)||!os(v)||!x||Ot({eventName:w,targetType:v,targetId:x})};return document.addEventListener("click",m,!0),()=>document.removeEventListener("click",m,!0)},[]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:as}),a?r.jsxs("aside",{className:"privacy-consent-panel fixed z-[400] p-5",role:"dialog","aria-modal":"false","aria-labelledby":"privacy-consent-title",children:[r.jsxs("div",{className:"flex items-start justify-between gap-5",children:[r.jsxs("div",{children:[r.jsx("h2",{id:"privacy-consent-title",className:"text-[15px] tracking-[0.06em]",children:"PRIVACY SETTINGS"}),r.jsx("p",{className:"mt-3 max-w-[66ch] text-[12px] leading-relaxed text-black/62",children:"Optional first-party analytics help understand visits, page views and named interface clicks. The analytics table stores a random session ID, page path, device category and referring host—never email, full URLs, free text or a persistent visitor profile."})]}),t!==null&&r.jsx("button",{type:"button",className:"border-0 bg-transparent px-1 text-[16px]",onClick:()=>s(!1),"aria-label":"Close privacy settings",children:"×"})]}),r.jsx("button",{type:"button",className:"mt-3 border-0 bg-transparent p-0 text-[11px] underline underline-offset-4",onClick:()=>d(m=>!m),"aria-expanded":o,children:o?"HIDE DETAILS":"COOKIE & ANALYTICS DETAILS"}),o&&r.jsxs("div",{className:"mt-3 grid gap-3 text-[11px] leading-relaxed text-black/58 sm:grid-cols-2",children:[r.jsx("p",{children:"NECESSARY: remembers this privacy choice locally for 180 days. It does not collect usage statistics."}),r.jsx("p",{children:"ANALYTICS: creates a new random ID for this browser session and sends only the limited first-party events described above."})]}),r.jsxs("div",{className:"mt-5 grid gap-2 sm:grid-cols-2",children:[r.jsx("button",{type:"button",className:`privacy-consent-action ${t==="necessary"?"is-selected":""}`,onClick:()=>u("necessary"),children:"NECESSARY ONLY"}),r.jsx("button",{type:"button",className:`privacy-consent-action ${t==="analytics"?"is-selected":""}`,onClick:()=>u("analytics"),children:"ALLOW ANALYTICS"})]})]}):null]})}const ls=n.lazy(()=>ct(()=>import("./AdminPortal-WFByE82S.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),us=n.lazy(()=>ct(()=>import("./Archive-CJvDkjhx.js"),__vite__mapDeps([9,10,1,2,6,4,5,7]))),ds=n.lazy(()=>ct(()=>import("./object01-BNZCARU0.js"),__vite__mapDeps([11,10,1,2]))),ms=n.lazy(()=>ct(()=>import("./Message-BkGf9YOQ.js"),__vite__mapDeps([12,1,2,7,4,5,6]))),ps=n.lazy(()=>ct(()=>import("./NotFound-DU0B5EKs.js"),__vite__mapDeps([13,1,2]))),fs=n.lazy(()=>ct(()=>import("./WatchStudio-BylKRp0w.js"),__vite__mapDeps([8,1,2,4,5,3,7,6]))),hs=new Zr,ar=()=>{const e=nn(),t=()=>{window.sessionStorage.setItem(Lt,"true"),window.sessionStorage.setItem(zt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.removeItem("returnFromExample"),e("/")};return r.jsx(ls,{onBack:()=>e("/"),onNavigate:t,onLibrary:()=>{const i=an();e(i?`/book/${encodeURIComponent(i.slug)}`:"/books")},onModels:()=>e("/3d")})},sr=()=>{const e=nn(),{slug:t}=ti();return r.jsx(ka,{initialSlug:t??null,onBack:()=>e("/"),onLogin:()=>e("/login"),onThreeD:()=>e("/3d"),onBookChange:i=>{e(`/book/${encodeURIComponent(i)}`,{replace:!0})}})},gs=()=>{const e=nn();return r.jsx(fs,{onNavigate:()=>e("/"),onLogin:()=>e("/login"),onBack:()=>{const t=an();e(t?`/book/${encodeURIComponent(t.slug)}`:"/books")}})},bs=()=>{const{pathname:e}=gr(),t=e==="/";return r.jsxs("div",{className:`fixed inset-0 overflow-hidden ${t?"bg-transparent":"bg-white dark:bg-black"}`,children:[r.jsx(Ai,{}),r.jsx(Ni,{}),r.jsx(cs,{}),r.jsx(n.Suspense,{fallback:r.jsx("div",{className:"fixed inset-0 bg-white"}),children:r.jsxs(ei,{children:[r.jsx(Ge,{path:"/",element:r.jsx(is,{})}),r.jsx(Ge,{path:"/archive",element:r.jsx(us,{})}),r.jsx(Ge,{path:"/message",element:r.jsx(ms,{})}),r.jsx(Ge,{path:"/object01",element:r.jsx(ds,{})}),r.jsx(Ge,{path:"/login",element:r.jsx(ar,{})}),r.jsx(Ge,{path:"/admin",element:r.jsx(ar,{})}),r.jsx(Ge,{path:"/3d",element:r.jsx(gs,{})}),r.jsx(Ge,{path:"/books",element:r.jsx(sr,{})}),r.jsx(Ge,{path:"/book/:slug",element:r.jsx(sr,{})}),r.jsx(Ge,{path:"*",element:r.jsx(ps,{})})]})})]})},xs=()=>r.jsx(Jr,{client:hs,children:r.jsx(Sa,{children:r.jsx(Oi,{children:r.jsx(Qr,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:r.jsx(bs,{})})})})}),or=sessionStorage.getItem("redirect");or&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",or));hr.createRoot(document.getElementById("root")).render(r.jsx(xs,{}));export{rr as D,_s as M,fa as S,Rs as a,ot as b,zs as c,Ds as d,Yi as e,js as f,Ts as g,Ms as h,Is as i,Ps as j,Ns as k,Ls as l,As as m,pa as n,Os as o,Ti as p,H as s,Bs as u};
