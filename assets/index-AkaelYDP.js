const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-uSHI7Y8g.js","assets/vendor-FJugjbCd.js","assets/three-O18aLqgg.js","assets/AdminThreeDModelManager-CwI4RRkK.js","assets/react-three-Cf3ZNpbQ.js","assets/postprocessing-dT4kHdQ4.js","assets/motion-Cje7NOoT.js","assets/supabase-BUBRDUZV.js","assets/WatchStudio-B0a1tl8K.js","assets/Archive-DSEDniaA.js","assets/00048thenotebook-DqkhchPx.js","assets/object01-BNZCARU0.js","assets/Message-5V-v1WVu.js","assets/NotFound-DU0B5EKs.js"])))=>i.map(i=>d[i]);
var Fr=Object.defineProperty;var Ur=(e,n,i)=>n in e?Fr(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i;var He=(e,n,i)=>Ur(e,typeof n!="symbol"?n+"":n,i);import{r as t,ay as Wr,az as Yr,j as r,aA as lr,aB as ur,aC as dr,aD as mr,aE as Vr,aF as pr,aG as fr,aH as Xr,aI as Hr,aJ as qr,aK as Gr,aL as hr,aM as Kr,aN as Zr,aO as xn,aP as rn,ar as gr,aQ as br,aR as Jr,aS as Qr,aT as ei,aU as ti,aV as Ke,aW as ni}from"./vendor-FJugjbCd.js";import{_ as ct,u as ri,a as sn,C as ii,b as pt,c as nt,S as si,d as jn,W as oi,e as ai}from"./react-three-Cf3ZNpbQ.js";import{c as ci}from"./supabase-BUBRDUZV.js";import{u as un,a as yt,m as Le,A as Wn}from"./motion-Cje7NOoT.js";import{V as oe,u as Nt,D as li,R as ui,g as di,L as vn,C as mi,b2 as In,Y as ue,k as pi,ba as fi,aG as Mn,y as hi,aH as gi,Z as dn,c as xr,aA as Pn,a8 as An,P as bi,Q as Mt,af as xi,M as Ot,aT as vi,m as yi,ab as wi,bb as ki,a7 as Si,aI as Ei}from"./three-O18aLqgg.js";import"./postprocessing-dT4kHdQ4.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();const Ci=1,_i=1e6;let mn=0;function Ri(){return mn=(mn+1)%Number.MAX_SAFE_INTEGER,mn.toString()}const pn=new Map,Yn=e=>{if(pn.has(e))return;const n=setTimeout(()=>{pn.delete(e),Pt({type:"REMOVE_TOAST",toastId:e})},_i);pn.set(e,n)},Ti=(e,n)=>{switch(n.type){case"ADD_TOAST":return{...e,toasts:[n.toast,...e.toasts].slice(0,Ci)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(i=>i.id===n.toast.id?{...i,...n.toast}:i)};case"DISMISS_TOAST":{const{toastId:i}=n;return i?Yn(i):e.toasts.forEach(s=>{Yn(s.id)}),{...e,toasts:e.toasts.map(s=>s.id===i||i===void 0?{...s,open:!1}:s)}}case"REMOVE_TOAST":return n.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(i=>i.id!==n.toastId)}}},qt=[];let Gt={toasts:[]};function Pt(e){Gt=Ti(Gt,e),qt.forEach(n=>{n(Gt)})}function ji({...e}){const n=Ri(),i=o=>Pt({type:"UPDATE_TOAST",toast:{...o,id:n}}),s=()=>Pt({type:"DISMISS_TOAST",toastId:n});return Pt({type:"ADD_TOAST",toast:{...e,id:n,open:!0,onOpenChange:o=>{o||s()}}}),{id:n,dismiss:s,update:i}}function Ii(){const[e,n]=t.useState(Gt);return t.useEffect(()=>(qt.push(n),()=>{const i=qt.indexOf(n);i>-1&&qt.splice(i,1)}),[e]),{...e,toast:ji,dismiss:i=>Pt({type:"DISMISS_TOAST",toastId:i})}}function ft(...e){return Wr(Yr(e))}const Mi=Hr,vr=t.forwardRef(({className:e,...n},i)=>r.jsx(lr,{ref:i,className:ft("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...n}));vr.displayName=lr.displayName;const Pi=Xr("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),yr=t.forwardRef(({className:e,variant:n,...i},s)=>r.jsx(ur,{ref:s,className:ft(Pi({variant:n}),e),...i}));yr.displayName=ur.displayName;const Ai=t.forwardRef(({className:e,...n},i)=>r.jsx(dr,{ref:i,className:ft("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",e),...n}));Ai.displayName=dr.displayName;const wr=t.forwardRef(({className:e,...n},i)=>r.jsx(mr,{ref:i,className:ft("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...n,children:r.jsx(Vr,{className:"h-4 w-4"})}));wr.displayName=mr.displayName;const kr=t.forwardRef(({className:e,...n},i)=>r.jsx(pr,{ref:i,className:ft("text-sm font-semibold",e),...n}));kr.displayName=pr.displayName;const Sr=t.forwardRef(({className:e,...n},i)=>r.jsx(fr,{ref:i,className:ft("text-sm opacity-90",e),...n}));Sr.displayName=fr.displayName;function Ni(){const{toasts:e}=Ii();return r.jsxs(Mi,{children:[e.map(function({id:n,title:i,description:s,action:o,...a}){return r.jsxs(yr,{...a,children:[r.jsxs("div",{className:"grid gap-1",children:[i&&r.jsx(kr,{children:i}),s&&r.jsx(Sr,{children:s})]}),o,r.jsx(wr,{})]},n)}),r.jsx(vr,{})]})}const Oi=({...e})=>{const{theme:n="system"}=qr();return r.jsx(Gr,{theme:n,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})},Li=Kr,zi=t.forwardRef(({className:e,sideOffset:n=4,...i},s)=>r.jsx(hr,{ref:s,sideOffset:n,className:ft("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...i}));zi.displayName=hr.displayName;const Bi="https://pmpspnvfgkzprgntihtx.supabase.co",Di="sb_publishable_bGNJPGhAWjjAsgNbUTszFg_N-j4CVuc",Lt="book-pages",To="models-3d",J=ci(Bi,Di,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),$i=50*1024*1024;function Me(e,n){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(n)}function Fi(e){const{data:n}=J.storage.from(Lt).getPublicUrl(e);return n.publicUrl}function Ui(e){return{...e,public_url:Fi(e.storage_path)}}function Wi(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function Yi(e){if(e.length===0)throw new Error("Choose at least one JPG or JPEG file.");for(const n of e){const i=n.name.toLowerCase(),s=i.endsWith(".jpg")||i.endsWith(".jpeg"),o=n.type==="image/jpeg"||n.type==="";if(!s||!o)throw new Error(`${n.name} is not a JPG/JPEG image.`);if(n.size>$i)throw new Error(`${n.name} is larger than 50 MB.`)}}function Vi(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function Xi(){const{data:e,error:n}=await J.rpc("is_admin");if(n)throw Me(n,"Unable to verify administrator access.");return e===!0}async function Er(){const{data:e,error:n}=await J.from("books").select("*").eq("is_published",!0).order("is_featured",{ascending:!1}).order("sort_order",{ascending:!0}).order("title",{ascending:!0});if(n)throw Me(n,"Unable to load books.");return e??[]}async function jo(){const{data:e,error:n}=await J.from("books").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw Me(n,"Unable to load the admin book list.");return e??[]}async function at(e){const{data:n,error:i}=await J.from("book_pages").select("*").eq("book_id",e).order("page_number",{ascending:!0}).order("created_at",{ascending:!0});if(i)throw Me(i,"Unable to load the book pages.");return(n??[]).map(Ui)}async function Io(e){const n=Vi(e.slug);if(!n)throw new Error("The book needs a valid slug.");const{data:i,error:s}=await J.from("books").insert({title:e.title.trim(),slug:n,storage_folder:n,category:e.category,description:e.description?.trim()??"",is_published:e.is_published??!1,is_featured:!1,sort_order:e.sort_order??0}).select("*").single();if(s)throw Me(s,"Unable to create the book.");return i}async function Mo(e,n){const{data:i,error:s}=await J.from("books").update(n).eq("id",e).select("*").single();if(s)throw Me(s,"Unable to save the book.");return i}async function Po(e){const{error:n}=await J.rpc("set_featured_book",{p_book_id:e});if(n)throw Me(n,"Unable to set the featured book.")}async function Ao(e,n,i){const s=[...n].sort((l,m)=>l.name.localeCompare(m.name,void 0,{numeric:!0,sensitivity:"base"}));Yi(s);let a=(await at(e.id)).reduce((l,m)=>Math.max(l,m.page_number),0)+1,d=0;for(const l of s){const m=`${e.storage_folder}/${String(a).padStart(4,"0")}-${Wi()}.jpg`,{error:f}=await J.storage.from(Lt).upload(m,l,{cacheControl:"3600",contentType:"image/jpeg",upsert:!1});if(f)throw Me(f,`Unable to upload ${l.name}.`);const{error:g}=await J.from("book_pages").insert({book_id:e.id,storage_path:m,file_name:l.name,page_number:a});if(g)throw await J.storage.from(Lt).remove([m]),Me(g,`Unable to register ${l.name}.`);a+=1,d+=1,i?.(d,s.length)}return at(e.id)}async function Hi(e){const i=(await at(e)).map((a,d)=>({page:a,nextNumber:d+1})).filter(({page:a,nextNumber:d})=>a.page_number!==d).map(({page:a,nextNumber:d})=>J.from("book_pages").update({page_number:d}).eq("id",a.id)),o=(await Promise.all(i)).find(a=>a.error);if(o?.error)throw Me(o.error,"Unable to renumber the pages.")}async function No(e){const{error:n}=await J.storage.from(Lt).remove([e.storage_path]);if(n)throw Me(n,"Unable to delete the image from Storage.");const{error:i}=await J.from("book_pages").delete().eq("id",e.id);if(i)throw Me(i,"The image was removed, but its database row remains.");await Hi(e.book_id)}async function Oo(e,n,i){const s=n+i;if(n<0||s<0||s>=e.length)return e;const o=e[n],a=e[s],{error:d}=await J.rpc("swap_book_pages",{p_first_page_id:o.id,p_second_page_id:a.id});if(d)throw Me(d,"Unable to reorder the pages.");return at(o.book_id)}async function Lo(e){const i=(await at(e.id)).map(o=>o.storage_path);if(i.length>0){const{error:o}=await J.storage.from(Lt).remove(i);if(o)throw Me(o,"Unable to delete this book's image folder.")}const{error:s}=await J.from("books").delete().eq("id",e.id);if(s)throw Me(s,"Unable to delete the book record.")}function Nn(e,n){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(n)}function qi(e){const n=typeof e=="object"&&e&&"message"in e?String(e.message):String(e);return/book_comments|schema cache|does not exist|could not find/i.test(n)}async function Vn(e){const{data:n,error:i}=await J.from("book_comments").select("*").eq("book_id",e).eq("is_visible",!0).order("created_at",{ascending:!0});if(i){if(qi(i))return console.info("Book comments are disabled until the book_comments SQL migration is run."),[];throw Nn(i,"Unable to load book comments.")}return n??[]}async function Gi(e){const n=e.body.trim();if(!n)throw new Error("Write a comment first.");if(n.length>600)throw new Error("Comments can contain at most 600 characters.");const{data:i,error:s}=await J.auth.getUser();if(s||!i.user)throw new Error("Administrator login required.");const{data:o,error:a}=await J.from("book_comments").insert({book_id:e.bookId,book_page_id:e.bookPageId,body:n,anchor_x:Math.min(1,Math.max(0,e.anchorX)),anchor_y:Math.min(1,Math.max(0,e.anchorY)),created_by:i.user.id,is_visible:!0}).select("*").single();if(a)throw Nn(a,"Unable to create the comment. Run the book comments SQL migration first.");return o}async function Ki(e){const{error:n}=await J.from("book_comments").delete().eq("id",e);if(n)throw Nn(n,"Unable to delete the comment.")}const Kt="studierzimmer_analytics_consent_v1",yn="studierzimmer_analytics_session_v1",Zi=4320*60*60*1e3,wn="studierzimmer:analytics-consent";let Zt=null,Jt=!1,kn=!1;function Qt(e){if(typeof window>"u")return null;try{return window[e]}catch{return null}}function Cr(e,n){try{return e?.getItem(n)??null}catch{return null}}function _r(e,n,i){try{e?.setItem(n,i)}catch{}}function Sn(e,n){try{e?.removeItem(n)}catch{}}function Ji(e=window.location.pathname){const n=e.split("?")[0]?.split("#")[0]??"/";return n.startsWith("/")?n.slice(0,160):"/"}function Qi(){if(!document.referrer)return null;try{return new URL(document.referrer).host.slice(0,160)||null}catch{return null}}function es(){const e=window.innerWidth;return Number.isFinite(e)?e<600?"mobile":e<1024?"tablet":"desktop":"unknown"}function ts(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const n=Array.from(e,i=>i.toString(16).padStart(2,"0")).join("");return`${n.slice(0,8)}-${n.slice(8,12)}-${n.slice(12,16)}-${n.slice(16,20)}-${n.slice(20)}`}function ns(){const e=Qt("sessionStorage"),n=Cr(e,yn);if(n)return n;if(Zt)return Zt;const i=ts();return Zt=i,_r(e,yn,i),i}function rs(e){typeof window>"u"||window.dispatchEvent(new CustomEvent(wn,{detail:e}))}function En(){const e=Qt("localStorage"),n=Cr(e,Kt);if(!n)return null;try{const i=JSON.parse(n),s=i.choice==="necessary"||i.choice==="analytics",o=Date.parse(String(i.expiresAt??""));return i.version!==1||!s||!Number.isFinite(o)||o<=Date.now()?(Sn(e,Kt),null):i.choice}catch{return Sn(e,Kt),null}}function is(e){const n=new Date,i={version:1,choice:e,updatedAt:n.toISOString(),expiresAt:new Date(n.getTime()+Zi).toISOString()};_r(Qt("localStorage"),Kt,JSON.stringify(i)),e==="necessary"?(Sn(Qt("sessionStorage"),yn),Zt=null,Jt=!1):kn=!1,rs(e)}function ss(e){const n=typeof e=="object"&&e&&"message"in e?String(e.message):String(e);return/track_analytics_event|schema cache|does not exist|could not find/i.test(n)}async function zt({eventName:e,path:n,targetType:i,targetId:s,valueInt:o}){if(typeof window>"u"||En()!=="analytics"||kn)return!1;const a=ns(),d=s?.trim().slice(0,120)||null,l=Number.isFinite(o)?Math.min(864e5,Math.max(0,Math.round(o??0))):null;!Jt&&e!=="session_start"?(Jt=!0,await zt({eventName:"session_start",path:n})):e==="session_start"&&(Jt=!0);const{data:m,error:f}=await J.rpc("track_analytics_event",{p_session_id:a,p_event_name:e,p_path:Ji(n),p_target_type:i??null,p_target_id:d,p_referrer_host:e==="session_start"?Qi():null,p_device_type:es(),p_value_int:l});return f?(ss(f)&&(kn=!0,console.info("Analytics collection is disabled until the analytics SQL migration is run.")),!1):m===!0}const os={a4_long_edge:{width:480,height:679,minWidth:90,maxWidth:600,minHeight:127,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:110,maxWidth:680,minHeight:78,maxHeight:481},square:{width:560,height:560,minWidth:96,maxWidth:620,minHeight:96,maxHeight:620}},Xn=8,as=8,Hn=360,cs=42,ls=1,us=5,ds=["☺︎","♥","★","🌊"];function kt(e,n,i){return Math.min(i,Math.max(n,e))}function qn(e,n,i){const s=Math.max(2,n-Xn*2),o=Math.max(1,i-Xn*2),a=e.width/e.height,d=s/2/a,l=Math.max(1,Math.min(o,d,e.maxHeight)),m=Math.max(1,Math.min(l*a,e.maxWidth));return{width:Math.floor(m),height:Math.floor(m/a)}}function Gn(e){return"translate(-50%, -100%)"}const ms=t.forwardRef(function({page:n,isCover:i,comments:s,commentsHidden:o,commentMode:a,canManageComments:d,activeDraft:l,draftBody:m,commentBusy:f,commentError:g,onImageReady:y,onPlaceComment:N,onDraftBodyChange:v,onSubmitDraft:j,onCancelDraft:w,onDeleteComment:R},U){const P=b=>{if(!a||!d||b.target instanceof Element&&b.target.closest("[data-book-comment-ui]"))return;b.preventDefault(),b.stopPropagation();const I=b.currentTarget.getBoundingClientRect();N(n.id,kt((b.clientX-I.left)/Math.max(1,I.width),0,1),kt((b.clientY-I.top)/Math.max(1,I.height),0,1))};return r.jsx("div",{ref:U,"data-density":i?"hard":"soft",className:"h-full w-full overflow-visible bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:r.jsxs("div",{"data-book-page-face":"true",onPointerDown:P,className:`relative h-full w-full overflow-visible ${a?"cursor-crosshair":""}`,style:{backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"translateZ(0.01px)",WebkitTransform:"translateZ(0.01px)"},children:[r.jsx("img",{src:n.public_url,alt:`Page ${n.page_number}: ${n.file_name}`,draggable:!1,decoding:"sync",onLoad:y,onError:y,className:"pointer-events-none h-full w-full select-none object-cover object-center",style:{backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"translateZ(0)",WebkitTransform:"translateZ(0)"}}),r.jsxs("div",{className:`book-comment-layer absolute inset-0 z-20 ${o?"is-hidden":""}`,"aria-hidden":o,children:[s.map(b=>r.jsxs("div",{"data-book-comment-ui":"true",className:"book-comment-balloon absolute",style:{left:`${b.anchor_x*100}%`,top:`${b.anchor_y*100}%`,transform:Gn(b.anchor_x)},children:[d&&r.jsx("button",{type:"button",className:"book-comment-delete","aria-label":"Delete comment",onPointerDown:I=>{I.preventDefault(),I.stopPropagation()},onClick:I=>{I.preventDefault(),I.stopPropagation(),R(b.id)},children:"×"}),r.jsx("p",{children:b.body})]},b.id)),l?.pageId===n.id&&r.jsxs("form",{"data-book-comment-ui":"true",className:"book-comment-balloon book-comment-editor absolute",style:{left:`${l.anchorX*100}%`,top:`${l.anchorY*100}%`,transform:Gn(l.anchorX)},onPointerDown:b=>b.stopPropagation(),onClick:b=>b.stopPropagation(),onSubmit:b=>{b.preventDefault(),j()},children:[r.jsx("button",{type:"button",className:"book-comment-delete","aria-label":"Cancel comment",onClick:w,children:"×"}),r.jsx("textarea",{autoFocus:!0,value:m,maxLength:600,placeholder:"WRITE A COMMENT…",onChange:b=>v(b.target.value),onKeyDown:b=>{b.key==="Escape"&&w(),(b.metaKey||b.ctrlKey)&&b.key==="Enter"&&(b.preventDefault(),j())}}),r.jsxs("div",{className:"book-comment-editor-actions",children:[r.jsx("div",{className:"book-comment-emojis","aria-label":"Add emoji",children:ds.map(b=>r.jsx("button",{type:"button",onClick:()=>v(`${m}${b}`),children:b},b))}),r.jsx("button",{type:"submit",disabled:f||!m.trim(),children:f?"…":"SEND"})]}),g&&r.jsx("p",{className:"book-comment-editor-error",children:g})]})]})]})})});function ps({book:e,pages:n,comments:i=[],commentMode:s=!1,canManageComments:o=!1,initialPage:a=0,bookMotionClassName:d="is-visible",onPageChange:l,onReady:m,onCreateComment:f,onDeleteComment:g}){const y=t.useRef(null),N=t.useRef(null),v=t.useRef(e.id),j=t.useRef(0),w=t.useRef(!1),R=t.useRef(!1),U=t.useRef(!1),P=t.useRef(!1),b=t.useRef(null),I=t.useRef({time:0,x:0,y:0,pointerType:""}),W=t.useRef(null),k=t.useRef(null),O=t.useRef([]),B=t.useRef({width:1,height:1}),V=t.useRef(new Map),A=e.page_format??"a4_long_edge",E=os[A],Y=Math.min(Math.max(0,Math.floor(a)),Math.max(0,n.length-1)),ae=t.useRef(!1),ie=t.useRef(!1),L=t.useRef(new Set),H=t.useRef(new Set([Y-1,Y,Y+1].filter(u=>u>=0&&u<n.length)));v.current!==e.id&&(v.current=e.id,j.current=Y);const[D,ee]=t.useState(Y),[_e,K]=t.useState(0),[q,de]=t.useState(!1),[M,ve]=t.useState(!1),[Ye,ye]=t.useState(!1),[Et,Ae]=t.useState(!1),[$,X]=t.useState(null),[Re,he]=t.useState(""),[Ne,ge]=t.useState(!1),[Je,re]=t.useState(null),[Ct,Qe]=t.useState(!1),[Pe,Q]=t.useState(!1),[me,De]=t.useState(()=>qn(E,640,480)),te=un(1),se=un(0),C=un(0),Ge=t.useMemo(()=>{const u=new Map;return i.forEach(h=>{const z=u.get(h.book_page_id)??[];z.push(h),u.set(h.book_page_id,z)}),u},[i]),lt=i.length>0,Te=t.useCallback(()=>{ie.current||!ae.current||![...H.current].every(u=>L.current.has(u))||(ie.current=!0,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>m?.(e.id))}))},[e.id,m]),we=t.useCallback(u=>{H.current.has(u)&&(L.current.add(u),Te())},[Te]),Ve=t.useCallback(()=>{const u=j.current,h=u===0||u>=n.length-1?[u]:[u,Math.min(u+1,n.length-1)];return Promise.all(h.map(z=>{const Z=n[z];if(!Z)return Promise.resolve();const ne=V.current.get(Z.public_url);if(ne)return ne;const je=new Promise(fe=>{const Ee=new Image;let Ie=!1;const Ce=()=>{Ie||(Ie=!0,fe())};Ee.onload=()=>{typeof Ee.decode=="function"?Ee.decode().catch(()=>{}).finally(Ce):Ce()},Ee.onerror=Ce,Ee.decoding="async",Ee.src=Z.public_url,window.setTimeout(Ce,5e3)});return V.current.set(Z.public_url,je),je})).then(()=>{})},[n]),Xe=t.useCallback((u,h,z)=>{!s||!o||(re(null),he(""),X({pageId:u,anchorX:h,anchorY:z}))},[o,s]),$e=t.useCallback(()=>{Ne||(X(null),he(""),re(null))},[Ne]),_t=t.useCallback(async()=>{if(!(!$||!Re.trim()||!f||Ne)){ge(!0),re(null);try{await f({bookPageId:$.pageId,body:Re,anchorX:$.anchorX,anchorY:$.anchorY}),X(null),he("")}catch(u){re(u instanceof Error?u.message:"Unable to save the comment.")}finally{ge(!1)}}},[Ne,$,Re,f]),ht=t.useCallback(async u=>{if(!(!g||Ne)){ge(!0),re(null);try{await g(u)}catch(h){re(h instanceof Error?h.message:"Unable to delete the comment.")}finally{ge(!1)}}},[Ne,g]),pe=t.useCallback(()=>{O.current.forEach(u=>u.stop()),O.current=[]},[]),Oe=t.useCallback(()=>{const u=j.current===0||j.current>=n.length-1;return{width:me.width*(u?1:2),height:me.height}},[me.height,me.width,n.length]),et=t.useCallback((u,h,z)=>{const Z=B.current,ne=Oe(),je=Math.max(0,(ne.width*u-Z.width)/2),fe=Math.max(0,(ne.height*u-Z.height)/2);return{x:kt(h,-je,je),y:kt(z,-fe,fe)}},[Oe]),Fe=t.useCallback((u,h,z,Z=te.get(),ne=se.get(),je=C.get())=>{const fe=B.current,Ee=kt(u,ls,us),Ie=Ee/Math.max(1e-4,Z),Ce=h-fe.width/2,bt=z-fe.height/2,st=et(Ee,Ce-(Ce-ne)*Ie,bt-(bt-je)*Ie);return te.set(Ee),se.set(st.x),C.set(st.y),{scale:Ee,...st}},[et,se,C,te]),gt=t.useCallback(()=>{const u=B.current,h=Oe(),z=Math.min((u.width-24)/Math.max(1,h.width),(u.height-24)/Math.max(1,h.height));return kt(z,1.25,3.6)},[Oe]),rt=t.useCallback((u,h,z)=>{pe(),k.current&&(window.clearTimeout(k.current),k.current=null);const Z={width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)};B.current=Z,w.current=!0,R.current=!1,ve(!1),Ae(!0),X(null),de(!0),te.set(1),se.set(0),C.set(0);const ne=Fe(gt(),u,h,1,0,0);return z&&(te.set(1),se.set(0),C.set(0),window.requestAnimationFrame(()=>{O.current=[yt(te,ne.scale,{type:"spring",stiffness:260,damping:24,mass:.74}),yt(se,ne.x,{type:"spring",stiffness:280,damping:27,mass:.72}),yt(C,ne.y,{type:"spring",stiffness:280,damping:27,mass:.72})]})),ne},[gt,se,C,pe,Fe,te]),it=t.useCallback(()=>{!w.current||R.current||(pe(),R.current=!0,ve(!0),O.current=[yt(te,1,{type:"spring",stiffness:330,damping:28,mass:.7}),yt(se,0,{type:"spring",stiffness:330,damping:28,mass:.7}),yt(C,0,{type:"spring",stiffness:330,damping:28,mass:.7})],k.current=window.setTimeout(()=>{w.current=!1,R.current=!1,de(!1),ve(!1),te.set(1),se.set(0),C.set(0),k.current=null,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>Ae(!1))})},430))},[se,C,pe,te]),tt=t.useCallback(u=>{window.requestAnimationFrame(()=>{const h=u??y.current?.pageFlip();if(!h)return;const z=h.getCurrentPageIndex(),Z=h.getBoundsRect();j.current=z,ee(z),l?.(z),h.getOrientation()!=="landscape"?K(0):z===0?K(-(Z.pageWidth/2)):z>=n.length-1?K(Z.pageWidth/2):K(0)})},[l,n.length]);t.useLayoutEffect(()=>{const u=N.current;if(!u)return;const h=()=>{const Z=window.getComputedStyle(u),ne=Number.parseFloat(Z.paddingLeft)+Number.parseFloat(Z.paddingRight),je=Number.parseFloat(Z.paddingTop)+Number.parseFloat(Z.paddingBottom),fe=Math.max(1,u.clientWidth-ne),Ee=Math.max(1,u.clientHeight-je);if(B.current={width:fe,height:Ee},!w.current){const Ie=qn(E,fe,Ee);De(Ce=>Ce.width===Ie.width&&Ce.height===Ie.height?Ce:Ie),Q(!0)}tt()};h();const z=new ResizeObserver(h);return z.observe(u),window.addEventListener("resize",h),()=>{z.disconnect(),window.removeEventListener("resize",h)}},[q,E,tt]),t.useEffect(()=>{j.current=Y,ee(Y),K(0),w.current=!1,R.current=!1,de(!1),ve(!1),ye(!1),Ae(!1),X(null),he(""),re(null),te.set(1),se.set(0),C.set(0),I.current.time=0,b.current=null,P.current=!1},[e.id,se,C,Y,te]),t.useEffect(()=>{X(null),he(""),re(null),Ve()},[D,Ve]),t.useEffect(()=>{s||(P.current=!1,X(null),he(""),re(null))},[s]),t.useEffect(()=>{if(!q)return;const u=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=u}},[q]);const ce=t.useCallback(()=>{W.current&&(window.clearTimeout(W.current),W.current=null)},[]),Ue=t.useCallback(u=>{const h=u.target;if(h instanceof Element&&h.closest("[data-book-comment-ui]"))return;if(s&&h instanceof Element&&h.closest("[data-book-page-face]")){P.current=!0;return}if(R.current||!u.isPrimary||u.pointerType==="mouse"&&u.button!==0)return;Ve(),lt&&!s&&ye(!0);const z=window.performance.now(),Z=I.current,ne=z-Z.time>0&&z-Z.time<Hn&&Z.pointerType===u.pointerType&&Math.hypot(u.clientX-Z.x,u.clientY-Z.y)<cs,je=w.current,fe=u.currentTarget.getBoundingClientRect();ne?(ce(),I.current.time=0,P.current=!0,pe()):P.current=je,b.current={pointerId:u.pointerId,pointerType:u.pointerType,mode:ne?"zoom-slider":je?"pan":"page",startedZoomed:je,startX:u.clientX,startY:u.clientY,startPanX:se.get(),startPanY:C.get(),startScale:te.get(),anchorX:u.clientX,anchorY:u.clientY,stageCenterX:fe.left+fe.width/2,moved:!1}},[ce,s,lt,se,C,Ve,pe,te]),p=t.useCallback((u,h)=>{ce(),W.current=window.setTimeout(()=>{if(W.current=null,w.current||U.current||b.current)return;const z=y.current?.pageFlip();u<h?z?.flipPrev():z?.flipNext()},Hn)},[ce]),_=t.useCallback(u=>{const h=b.current;if(!h||h.pointerId!==u.pointerId||(Math.hypot(u.clientX-h.startX,u.clientY-h.startY)>as&&(h.moved=!0),h.mode==="page"))return;if(u.preventDefault(),h.mode==="pan"){if(!h.moved)return;const ne=et(te.get(),h.startPanX+u.clientX-h.startX,h.startPanY+u.clientY-h.startY);se.set(ne.x),C.set(ne.y);return}if(!h.moved)return;if(!w.current){const ne=rt(h.anchorX,h.anchorY,!1);h.startScale=ne.scale,h.startPanX=ne.x,h.startPanY=ne.y}const Z=h.startScale*Math.exp((h.startY-u.clientY)*.006);Fe(Z,h.anchorX,h.anchorY,h.startScale,h.startPanX,h.startPanY)},[et,rt,se,C,Fe,te]),S=t.useCallback(u=>{const h=b.current;if(!(!h||h.pointerId!==u.pointerId)){if(b.current=null,P.current=!1,ye(!1),u.type==="pointercancel"){I.current.time=0;return}if(h.mode==="zoom-slider"){h.moved?I.current.time=0:h.startedZoomed?it():rt(h.anchorX,h.anchorY,!0);return}if(h.moved){I.current.time=0,ce();return}I.current={time:window.performance.now(),x:u.clientX,y:u.clientY,pointerType:h.pointerType},h.mode==="page"&&p(u.clientX,h.stageCenterX)}},[ce,it,rt,p]);t.useEffect(()=>(window.addEventListener("pointermove",_,{passive:!1}),window.addEventListener("pointerup",S),window.addEventListener("pointercancel",S),()=>{window.removeEventListener("pointermove",_),window.removeEventListener("pointerup",S),window.removeEventListener("pointercancel",S)}),[S,_]),t.useEffect(()=>()=>{ce(),pe(),k.current&&window.clearTimeout(k.current)},[ce,pe]);const ke=t.useCallback(u=>{if(!w.current||R.current)return;u.preventDefault(),u.stopPropagation(),pe();const h=u.currentTarget.getBoundingClientRect(),z=Math.exp(-u.deltaY*.0015);Fe(te.get()*z,u.clientX-h.left,u.clientY-h.top)},[pe,Fe,te]);if(t.useEffect(()=>{n.length===0&&m?.(e.id)},[e.id,m,n.length]),n.length===0)return r.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."});const Se=r.jsx("div",{className:`public-book-stage ${d} ${q?"is-magnified":""} ${M?"is-zoom-closing":""}`,children:r.jsx("div",{ref:N,className:`public-book-viewport relative flex items-center justify-center overflow-hidden ${q?"is-magnified cursor-grab active:cursor-grabbing":"cursor-default"} ${Ct?"is-page-folding":""}`,"data-page":D,"data-zoomed":q?"true":"false",onPointerDownCapture:Ue,onMouseDownCapture:u=>{(P.current||w.current)&&(u.preventDefault(),u.stopPropagation())},onTouchStartCapture:u=>{(P.current||w.current)&&(u.preventDefault(),u.stopPropagation())},onWheel:ke,children:r.jsx(Le.div,{className:"flex h-full w-full items-center justify-center",style:{x:se,y:C,scale:te,transformOrigin:"50% 50%",willChange:"transform"},children:r.jsx("div",{className:"flex h-full w-full items-center justify-center",style:{transform:`translate3d(${_e}px, 0, 0)`,transition:"transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",willChange:"transform",pointerEvents:q?"none":"auto"},children:Pe&&r.jsx(Zr,{ref:y,className:"mx-auto",style:{margin:"0 auto"},width:me.width,height:me.height,minWidth:1,maxWidth:E.maxWidth,minHeight:1,maxHeight:E.maxHeight,size:"fixed",startPage:v.current===e.id?j.current:Y,drawShadow:!0,flippingTime:850,usePortrait:!1,startZIndex:0,autoSize:!1,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!1,disableFlipByClick:!0,onInit:u=>{j.current=u.data.page,ee(u.data.page),l?.(u.data.page),tt(u.object),ae.current=!0,Te()},onFlip:u=>{j.current=u.data,ee(u.data),l?.(u.data),tt(u.object)},onChangeState:u=>{const h=u.data==="user_fold"||u.data==="flipping";U.current=h,Qe(u.data!=="read"),h&&ce()},onChangeOrientation:u=>{tt(u.object)},children:n.map((u,h)=>r.jsx(ms,{page:u,isCover:h===0||h===n.length-1,comments:Ge.get(u.id)??[],commentsHidden:Ye||Et||q,commentMode:s,canManageComments:o,activeDraft:$,draftBody:Re,commentBusy:Ne,commentError:Je,onImageReady:()=>we(h),onPlaceComment:Xe,onDraftBodyChange:he,onSubmitDraft:()=>void _t(),onCancelDraft:$e,onDeleteComment:z=>void ht(z)},u.id))},`${e.id}-${A}-${me.width}x${me.height}`)})})})});return r.jsx("div",{className:"flex h-full w-full items-center justify-center",children:q&&typeof document<"u"?xn.createPortal(Se,document.body):Se})}function fs(){const[e,n]=t.useState(!0),[i,s]=t.useState(null),[o,a]=t.useState(!1),[d,l]=t.useState(null),m=t.useCallback(async()=>{n(!0),l(null);const{data:f,error:g}=await J.auth.getUser();if(g){s(null),a(!1),l(g.message),n(!1);return}const y=f.user??null;if(s(y),!y){a(!1),n(!1);return}try{const N=await Xi();a(N)}catch(N){a(!1),l(N instanceof Error?N.message:"Unable to verify administrator access.")}finally{n(!1)}},[]);return t.useEffect(()=>{m();const{data:f}=J.auth.onAuthStateChange(()=>{window.setTimeout(()=>{m()},0)});return()=>{f.subscription.unsubscribe()}},[m]),{loading:e,user:i,isAdmin:o,error:d,refresh:m}}const Kn="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";function hs({text:e,speed:n=100,revealSpeed:i=55}){const s=t.useRef(null),o=t.useRef(null),a=t.useRef(0),d=t.useRef(!1),l=t.useCallback(()=>{o.current!==null&&(window.clearInterval(o.current),o.current=null)},[]),m=t.useCallback(()=>Kn[Math.floor(Math.random()*Kn.length)],[]),f=t.useCallback((N=0)=>e.split("").map((v,j)=>v===" "?" ":j<N?v:m()).join(""),[m,e]),g=t.useCallback(()=>{l(),d.current=!1,s.current&&(o.current=window.setInterval(()=>{!s.current||d.current||(s.current.textContent=f())},n))},[l,f,n]),y=t.useCallback(()=>{l(),d.current=!0,a.current=0,s.current&&(o.current=window.setInterval(()=>{a.current+=1,s.current&&(s.current.textContent=f(a.current)),a.current>=e.length&&(l(),s.current&&(s.current.textContent=e))},i))},[l,f,i,e]);return t.useEffect(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches?(s.current&&(s.current.textContent=e),l):(g(),l),[l,g,e]),r.jsx("span",{className:"public-login-scramble",onMouseEnter:y,onMouseLeave:g,"aria-label":e,children:r.jsx("span",{ref:s,"aria-hidden":"true",children:e})})}const Rr="publicBookSession",Bt="publicBookReturningToIndex",Dt="publicBookReturningToIntro";function on(){if(typeof window>"u")return null;try{const e=window.sessionStorage.getItem(Rr);if(!e)return null;const n=JSON.parse(e);return typeof n.slug!="string"||n.slug.length===0||typeof n.pageIndex!="number"||!Number.isFinite(n.pageIndex)?null:{slug:n.slug,pageIndex:Math.max(0,Math.floor(n.pageIndex))}}catch{return null}}function wt(e,n){if(typeof window>"u")return;const i={slug:e,pageIndex:Math.max(0,Math.floor(n))};try{window.sessionStorage.setItem(Rr,JSON.stringify(i))}catch{}}const Tr=()=>ct(()=>import("./AdminPortal-uSHI7Y8g.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])),gs=t.lazy(Tr),bs=()=>ct(()=>import("./WatchStudio-B0a1tl8K.js"),__vite__mapDeps([8,1,2,4,5,3,7,6])),Xt=()=>bs().then(e=>e.preloadWatchStudioExperience()),en=1120,jr=180,On=140,dt=en+On,xs=jr+dt,tn=920,Zn=120,Jn=tn+On,Cn=1180,vs=6e3,ys=`
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
  contain: layout;
  isolation: isolate;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.public-book-viewport .stf__parent,
.public-book-viewport .stf__wrapper {
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
  animation: public-book-background-mix-in ${Cn}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${Cn}ms cubic-bezier(0.4, 0, 0.2, 1) both;
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
  animation-duration: ${en}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-meta.is-fast.is-entering,
.public-book-meta.is-fast.is-leaving {
  animation-duration: ${tn}ms;
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
  animation-duration: ${en}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-stage.is-fast.is-entering,
.public-book-stage.is-fast.is-leaving {
  animation-duration: ${tn}ms;
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


`;function fn(e){return e instanceof Error?e.message:"Unable to load the books."}function Ze(e){return new Promise(n=>{window.setTimeout(n,e)})}function Qn(){return new Promise(e=>{window.requestAnimationFrame(()=>e())})}function ws(e){const n=i=>Number.isFinite(i)?Math.min(255,Math.max(0,Math.round(i??255))):255;return`rgb(${n(e?.background_r)} ${n(e?.background_g)} ${n(e?.background_b)})`}function ks(e){return new Promise(n=>{const i=new Image;let s=!1;const o=()=>{s||(s=!0,window.clearTimeout(a),n())},a=window.setTimeout(o,5e3);i.onload=()=>{if(typeof i.decode=="function"){i.decode().catch(()=>{}).finally(o);return}o()},i.onerror=o,i.decoding="async",i.src=e})}async function er(e,n=0){const i=Math.min(Math.max(0,Math.floor(n)),Math.max(0,e.length-1)),s=[i-1,i,i+1,i+2].filter(a=>a>=0&&a<e.length),o=[...new Set(s)].map(a=>e[a]);await Promise.all(o.map(a=>ks(a.public_url)))}function Ss({initialSlug:e,onBack:n,onLogin:i,onThreeD:s,onBookChange:o}){const{isAdmin:a}=fs(),[d]=t.useState(()=>{const p=window.sessionStorage.getItem("gstudios:nav-continuity")==="models-to-library";return p&&window.sessionStorage.removeItem("gstudios:nav-continuity"),p}),[l,m]=t.useState([]),[f,g]=t.useState(null),[y,N]=t.useState([]),[v,j]=t.useState([]),[w,R]=t.useState(!1),[U,P]=t.useState({}),[b,I]=t.useState(!0),[W,k]=t.useState(!1),[O,B]=t.useState(null),[V,A]=t.useState(!1),[E,Y]=t.useState(!1),[ae,ie]=t.useState("outside"),[L,H]=t.useState(d),[D,ee]=t.useState("library"),[_e,K]=t.useState("outside"),[q,de]=t.useState(!1),[M,ve]=t.useState(0),[Ye,ye]=t.useState(!1),[Et,Ae]=t.useState(!1),$=t.useRef(!0),X=t.useRef(!1),Re=t.useRef(null),he=t.useRef(null),Ne=t.useRef(null),ge=t.useRef(!1),Je=t.useRef(on()),re=t.useRef(null),Ct=t.useRef(0),Qe=t.useRef("rgb(255 255 255)"),Pe=t.useRef(null),Q=t.useRef(null),me=t.useRef(null),De=t.useRef(new Set),[te,se]=t.useState([{id:0,color:Qe.current}]),C=t.useMemo(()=>l.find(p=>p.id===f)??null,[l,f]);t.useEffect(()=>{a||R(!1)},[a]),t.useEffect(()=>{!C||y.length===0||P(p=>({...p,[C.id]:{cover:y[0]?.public_url??null,lastPage:y[y.length-1]?.public_url??null}}))},[y,C]),t.useEffect(()=>{if(!V||l.length===0)return;let p=!0;return l.forEach(_=>{U[_.id]||De.current.has(_.id)||(De.current.add(_.id),at(_.id).then(S=>{p&&P(ke=>({...ke,[_.id]:{cover:S[0]?.public_url??null,lastPage:S[S.length-1]?.public_url??null}}))}).catch(()=>{}).finally(()=>{De.current.delete(_.id)}))}),()=>{p=!1}},[V,U,l]),t.useEffect(()=>{const p=ws(C);if(p===Qe.current)return;Qe.current=p;const _={id:++Ct.current,color:p};se(S=>[S[S.length-1],_]),Pe.current&&window.clearTimeout(Pe.current),Pe.current=window.setTimeout(()=>{se(S=>S.slice(-1)),Pe.current=null},Cn)},[C,C?.background_b,C?.background_g,C?.background_r]);const Ge=t.useCallback(p=>{if(Q.current===p)return Promise.resolve();const _=me.current;return _&&_.finish(),new Promise(S=>{let ke=!1;const Se=()=>{ke||(ke=!0,window.clearTimeout(u),me.current?.finish===Se&&(me.current=null),S())},u=window.setTimeout(Se,vs);me.current={bookId:p,finish:Se,timeout:u}})},[]),lt=t.useCallback(p=>{Q.current=p;const _=me.current;_?.bookId===p&&_.finish()},[]);t.useEffect(()=>{Re.current=f},[f]),t.useEffect(()=>{C&&zt({eventName:"book_open",targetType:"book",targetId:C.slug})},[C]);const Te=t.useCallback(()=>{re.current&&(window.clearTimeout(re.current),re.current=null)},[]),we=t.useCallback((p=!1)=>{Te();const _=p?Zn:jr,S=p?tn:en;de(p),K("outside"),re.current=window.setTimeout(()=>{$.current&&(K("entering"),re.current=window.setTimeout(()=>{$.current&&(K("visible"),de(!1),re.current=null)},S+On))},_)},[Te]);t.useEffect(()=>{$.current=!0;const p=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{$.current&&H(!0)})});return()=>{$.current=!1,window.cancelAnimationFrame(p),re.current&&window.clearTimeout(re.current),Pe.current&&window.clearTimeout(Pe.current),me.current&&(window.clearTimeout(me.current.timeout),me.current.finish())}},[]),t.useEffect(()=>{const p=navigator.connection;if(p?.saveData||p?.effectiveType==="slow-2g"||p?.effectiveType==="2g")return;const _=()=>{Xt()},S=window;if(S.requestIdleCallback){const Se=S.requestIdleCallback(_,{timeout:2500});return()=>S.cancelIdleCallback?.(Se)}const ke=window.setTimeout(_,1400);return()=>window.clearTimeout(ke)},[]),t.useEffect(()=>{let p=!0;return(async()=>{I(!0),B(null);try{const S=await Er();if(!p)return;m(S)}catch(S){p&&B(fn(S))}finally{p&&I(!1)}})(),()=>{p=!1}},[]);const Ve=t.useCallback(async p=>{if(!ge.current){ge.current=!0,k(!0),B(null);try{const[_,S]=await Promise.all([at(p.id),Vn(p.id)]),ke=Je.current,Se=ke?.slug===p.slug?Math.min(ke.pageIndex,Math.max(0,_.length-1)):0;if(await er(_,Se),!$.current)return;Q.current=null;const u=Ge(p.id);if(xn.flushSync(()=>{de(!1),K("outside"),g(p.id),N(_),j(S),ve(Se)}),wt(p.slug,Se),k(!1),await u,!$.current)return;we()}catch(_){$.current&&(B(fn(_)),k(!1))}finally{ge.current=!1}}},[we,Ge]),Xe=t.useCallback(async(p,_)=>{if($.current){if(X.current){he.current={book:p,updateRoute:_},A(!1);return}if(Re.current===p.id){A(!1);return}X.current=!0,ye(!0),k(!0),A(!1),B(null);try{Te(),de(!0),K("leaving");const S=at(p.id).then(async z=>(await er(z),z)),ke=Vn(p.id),[Se,u]=await Promise.all([S,ke,Ze(Jn)]);if(!$.current)return;Q.current=null;const h=Ge(p.id);if(xn.flushSync(()=>{de(!0),K("outside"),g(p.id),Re.current=p.id,N(Se),j(u),ve(0),k(!1)}),Je.current={slug:p.slug,pageIndex:0},wt(p.slug,0),_&&o?.(p.slug),await Qn(),await Qn(),await h,await Ze(Zn),!$.current)return;K("entering"),await Ze(Jn),$.current&&(K("visible"),de(!1))}catch(S){$.current&&(B(fn(S)),k(!1),de(!1),K("visible"))}finally{if(X.current=!1,$.current){ye(!1);const S=he.current;he.current=null,S&&S.book.id!==Re.current&&window.setTimeout(()=>{Ne.current?.(S.book,S.updateRoute)},24)}}}},[Te,o,Ge]);t.useEffect(()=>{Ne.current=(p,_)=>{Xe(p,_)}},[Xe]),t.useEffect(()=>{if(b||l.length===0)return;const p=e?l.find(_=>_.slug===e):null;if(!f){const _=l.find(ke=>ke.is_featured),S=p??_??l[0];Ve(S);return}p&&p.id!==f&&!X.current&&Xe(p,!1)},[l,e,Ve,b,f,Xe]);const $e=t.useCallback(async()=>{!E||X.current||(X.current=!0,ye(!0),ie("leaving"),await Ze(dt),$.current&&(Y(!1),ie("outside"),we(),await Ze(xs),X.current=!1,$.current&&ye(!1)))},[E,we]);t.useEffect(()=>{const p=_=>{if(_.key==="Escape"){if(E){$e();return}A(!1)}};return window.addEventListener("keydown",p),()=>{window.removeEventListener("keydown",p)}},[$e,E]);const _t=async()=>{if(!X.current){if(A(!1),E){await $e();return}X.current=!0,ye(!0),Tr(),!(C&&(Te(),K("leaving"),await Ze(dt),!$.current))&&(Y(!0),ie("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{$.current&&ie("entering")})}),await Ze(dt),X.current=!1,$.current&&(ie("visible"),ye(!1)))}},ht=async()=>{if(E){await $e();return}X.current||(X.current=!0,ye(!0),A(!1),H(!1),Te(),K("leaving"),C&&wt(C.slug,M),window.sessionStorage.setItem(Bt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.setItem(Dt,"true"),window.sessionStorage.removeItem("returnFromExample"),await Ze(dt),$.current&&n())},pe=async()=>{!E||X.current||(X.current=!0,ye(!0),A(!1),H(!1),ie("leaving"),C&&wt(C.slug,M),window.sessionStorage.setItem(Bt,"true"),window.sessionStorage.setItem(Dt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.removeItem("returnFromExample"),await Ze(dt),$.current&&n())},Oe=async()=>{if(X.current||E)return;ee("models"),X.current=!0,ye(!0),A(!1),Te(),K("leaving"),C&&wt(C.slug,M);const p=Xt().catch(()=>null);await Promise.all([Ze(dt),p]),$.current&&s()},et=p=>{Xe(p,!0)},Fe=t.useCallback(async p=>{if(!C||!a)throw new Error("Administrator login required.");const _=await Gi({bookId:C.id,bookPageId:p.bookPageId,body:p.body,anchorX:p.anchorX,anchorY:p.anchorY});j(S=>[...S,_])},[a,C]),gt=t.useCallback(async p=>{if(!a)throw new Error("Administrator login required.");await Ki(p),j(_=>_.filter(S=>S.id!==p))},[a]),rt=t.useCallback(p=>{ve(p),C&&(Je.current={slug:C.slug,pageIndex:p},wt(C.slug,p),zt({eventName:"book_page_view",targetType:"book_page",targetId:`${C.slug}:${p}`,valueInt:p}))},[C]),tt=`${_e==="entering"?"is-entering":_e==="visible"?"is-visible":_e==="leaving"?"is-leaving":"is-outside"}${q?" is-fast":""}`,ce=ae==="entering"?"is-entering":ae==="visible"?"is-visible":ae==="leaving"?"is-leaving":"is-outside",Ue=L?d?"is-continuing":"is-visible":Ye||Et?"is-leaving":"is-outside";return r.jsxs("div",{className:"public-book-shell fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black",style:{backgroundColor:te[0]?.color??"rgb(255 255 255)"},children:[r.jsx("style",{children:ys}),r.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:te.map((p,_)=>r.jsx("div",{className:`public-book-background-layer ${_===te.length-1?"is-current":"is-previous"}`,style:{backgroundColor:p.color}},p.id))}),V&&!E&&r.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-black/0",onClick:()=>A(!1)}),r.jsxs("div",{className:"public-book-nav fixed z-[170]",children:[r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:r.jsx("button",{type:"button",onClick:()=>void ht(),disabled:Ye,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"navigate",className:"public-book-control-column disabled:pointer-events-none disabled:opacity-40","aria-label":E?"Back to book":"Navigate",title:E?"Back to book":"Navigate",children:r.jsx("span",{children:"NAVIGATE"})})}),r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:r.jsx("button",{type:"button",onClick:()=>{ee("library"),A(p=>!p)},disabled:E,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"library",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${!E&&V&&D==="library"?"is-active":""}`,"aria-label":"Choose a book","aria-expanded":V,"aria-controls":"public-book-library",title:"Choose a book",children:r.jsx("span",{children:"LIBRARY"})})}),r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:r.jsx("button",{type:"button",onClick:()=>void _t(),disabled:Ye,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"login",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${E?"is-active":""}`,"aria-expanded":E,"aria-label":"Login",children:r.jsx("span",{children:r.jsx(hs,{text:"LOGIN"})})})}),r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:r.jsx("button",{type:"button",onClick:()=>void Oe(),onPointerEnter:()=>void Xt(),onFocus:()=>void Xt(),disabled:Ye||E,"data-analytics-event":"model_open","data-analytics-type":"model","data-analytics-id":"models",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${!E&&D==="models"?"is-active":""}`,children:r.jsx("span",{children:"MODELS"})})}),a&&r.jsx("div",{className:`public-nav-item ${Ue}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:r.jsx("button",{type:"button",onClick:()=>R(p=>!p),disabled:Ye||E,"data-analytics-event":"navigation_click","data-analytics-type":"interface","data-analytics-id":"comment-mode",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${w?"is-active":""}`,"aria-pressed":w,"aria-label":"Comment on book pages",children:r.jsx("span",{children:"COMMENT"})})})]}),r.jsxs("aside",{id:"public-book-library",className:`public-library-drawer fixed z-[150] flex flex-col ${V&&!E?"is-open pointer-events-auto":"pointer-events-none"}`,"aria-hidden":!V||E,children:[r.jsx("button",{type:"button",onClick:()=>A(!1),"data-analytics-event":"navigation_click","data-analytics-type":"interface","data-analytics-id":"library-close",className:"absolute right-5 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 active:scale-95 sm:right-8","aria-label":"Close book list",children:"×"}),r.jsx("div",{className:"public-book-scroll min-h-0 flex-1 overflow-y-auto",children:b?r.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"..."}):l.length===0?r.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):l.map(p=>{const _=p.id===f,S=U[p.id];return r.jsxs("button",{type:"button",onClick:()=>et(p),"data-analytics-event":"navigation_click","data-analytics-type":"book","data-analytics-id":p.slug,className:`public-library-book-row ${_?"is-selected":""}`,children:[r.jsxs("span",{className:"public-library-open-book","aria-hidden":"true",children:[r.jsx("span",{children:S?.lastPage&&r.jsx("img",{src:S.lastPage,alt:"",draggable:!1,loading:"lazy"})}),r.jsx("span",{children:S?.cover&&r.jsx("img",{src:S.cover,alt:"",draggable:!1,loading:"lazy"})})]}),r.jsxs("span",{className:"public-library-book-copy min-w-0",children:[r.jsx("h2",{children:p.title}),p.description&&r.jsx("p",{children:p.description})]})]},p.id)})})]}),r.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden",children:b||W&&!C?r.jsx("div",{className:`public-route-message ${L?"is-visible":"is-outside"}`,children:"..."}):O?r.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${L?"is-visible":"is-outside"}`,children:O}):l.length===0?r.jsx("div",{className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${L?"is-visible":"is-outside"}`,children:"No books are public yet."}):C?r.jsx("div",{className:"h-full w-full",children:r.jsx("div",{className:`public-book-surface flex h-full w-full items-center justify-center ${E?"is-login-muted":""}`,children:r.jsx(ps,{book:C,pages:y,comments:v,commentMode:w,canManageComments:a,initialPage:M,bookMotionClassName:tt,onPageChange:rt,onReady:lt,onCreateComment:Fe,onDeleteComment:gt},C.id)})}):null}),E&&r.jsx("div",{className:`public-login-stage fixed inset-0 z-[180] overflow-hidden bg-white ${ce}`,"aria-hidden":ae==="outside"||ae==="leaving",children:r.jsx(t.Suspense,{fallback:null,children:r.jsx(gs,{embedded:!0,surfaceReady:ae==="entering"||ae==="visible",onBack:()=>void $e(),onNavigate:()=>void pe(),onLibrary:()=>void $e(),onModels:()=>{$e().then(()=>Oe())}})})})]})}const Ir=t.createContext(void 0),Es=({children:e})=>{const[n,i]=t.useState(!1),s=()=>{i(!n)};return t.useEffect(()=>{n?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[n]),r.jsx(Ir.Provider,{value:{isDark:n,toggleTheme:s},children:e})},zo=()=>{const e=t.useContext(Ir);if(e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},tr="/assets/WolfyLight-Bs10J6iU.gif",Cs=100,_s=500,Rs=14e3,hn=400,Ts=({onComplete:e})=>{const[n,i]=t.useState(!1),[s,o]=t.useState(!1),[a,d]=t.useState(!1),[l,m]=t.useState(!1),[f,g]=t.useState({}),[y,N]=t.useState(0),[v,j]=t.useState(!0),w=t.useRef({}),R=t.useRef(null),U=t.useRef(!1),P=t.useRef(!1),{progress:b}=ri();t.useEffect(()=>{let O;const B=()=>{N(V=>{const A=b-V,E=Math.max(A*.1,A>0?.5:-.5),Y=Math.abs(A)<.5?b:V+E;return Y>=100&&setTimeout(()=>j(!1),500),Math.min(100,Math.max(0,Y))}),O=requestAnimationFrame(B)};return O=requestAnimationFrame(B),()=>cancelAnimationFrame(O)},[b]),t.useEffect(()=>{const O=window.matchMedia("(prefers-reduced-motion: reduce)");P.current=O.matches;const B=()=>P.current=O.matches;return O.addEventListener?.("change",B),()=>O.removeEventListener?.("change",B)},[]),t.useEffect(()=>{const O=new Image;O.src=tr;const B=()=>g({w:O.naturalWidth||400,h:O.naturalHeight||400});O.decode?.().then(()=>{B(),i(!0)}).catch(()=>{O.onload=()=>{B(),i(!0)}})},[]);const I=t.useCallback(()=>{if(U.current)return;if(P.current){U.current=!0,e();return}m(!0);const O=R.current;let B=!1;const V=()=>{B||(B=!0,U.current=!0,e())};if(O){const A=()=>{O.removeEventListener("animationend",A),w.current.fallback&&clearTimeout(w.current.fallback),V()};O.addEventListener("animationend",A,{once:!0}),w.current.fallback=window.setTimeout(V,hn+120)}else w.current.fallback=window.setTimeout(V,hn+50)},[e]);t.useEffect(()=>{if(!n)return;const O=w.current;return P.current?(o(!0),d(!0),O.auto=window.setTimeout(()=>I(),800)):(O.entry=window.setTimeout(()=>o(!0),Cs),O.allowExit=window.setTimeout(()=>d(!0),_s),O.auto=window.setTimeout(()=>I(),Rs)),()=>{Object.values(O).forEach(B=>B&&clearTimeout(B))}},[n,I]);const W=()=>{(a||P.current)&&I()},k=s?l?"animate-elastic-shrink":"animate-elastic-grow":"logo-hidden";return r.jsxs("div",{className:`fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${U.current?"opacity-0 pointer-events-none":"opacity-100 pointer-events-auto"}`,style:{willChange:"opacity"},onClick:W,children:[r.jsxs("div",{className:`relative ${k}`,ref:R,style:{width:"30rem",height:"30rem",display:"flex",alignItems:"center",justifyContent:"center"},children:[r.jsxs("span",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[r.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/20 blur-xl animate-pulse-ring"}),r.jsx("span",{className:"absolute w-[22rem] h-[22rem] rounded-full bg-gray-400/10 blur-xl animate-pulse-ring delay-300"})]}),r.jsx("img",{src:tr,alt:"Loading wolf",width:f.w||800,height:f.h||800,className:"object-contain relative z-10 select-none pointer-events-none",style:{width:"30rem",height:"30rem",display:"block"}})]}),v&&r.jsxs("div",{className:`mt-4 flex text-gray-700 dark:text-gray-200 text-xl font-bold transition-opacity duration-500 ${y>=100?"opacity-0":"opacity-100"}`,children:[Math.round(y),"%"]}),r.jsx("style",{children:`
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
        .animate-elastic-shrink { transform-origin: 50% 50%; animation: elastic-shrink ${hn}ms ease-in forwards; }
      `})]})},xe={};typeof window<"u"&&(window.addEventListener("keydown",e=>{xe[e.key.toLowerCase()]=!0}),window.addEventListener("keyup",e=>{xe[e.key.toLowerCase()]=!1}));const At={current:null},It=15,gn=10,js=38,nr=95,We=0,St=-174,_n=960,nn=12e4,Is=48e3,Ms=9e4,F=128,qe=900,ze=10,ut=12,Ps=4.5,As=16e3,Mr=[500,200,-300],Ns=new oe(500,150,-1e3).normalize(),Os="#fff4d6",Pr="#0b1e3a",Ls="#0a2a6a",Ar="gstudios:ocean-player-transform",Nr={value:0},mt=[];let rr=1;function Rn(){return performance.now()/1e3}function Or(e,n,i){const s=Rn();for(mt.push({id:rr,x:e,z:n,startedAt:s,...i}),rr+=1;mt.length>ze;)mt.shift();for(let o=mt.length-1;o>=0;o-=1){const a=mt[o];s-a.startedAt>a.duration+.25&&mt.splice(o,1)}}function zs(){const e={position:[0,It,0],rotationY:Math.PI};try{const n=window.sessionStorage.getItem(Ar);if(!n)return e;const i=JSON.parse(n);return!Array.isArray(i.position)||i.position.length!==3||!i.position.every(s=>typeof s=="number"&&Number.isFinite(s))||typeof i.rotationY!="number"||!Number.isFinite(i.rotationY)?e:{position:[Number(i.position[0]),ue.clamp(Number(i.position[1]),St+8,_n),Number(i.position[2])],rotationY:Number(i.rotationY)}}catch{return e}}function bn(e){if(e)try{window.sessionStorage.setItem(Ar,JSON.stringify({position:e.position.toArray(),rotationY:e.rotation.y}))}catch{}}function Ln(){const e=jn(Pn,"/caustics.png");return t.useMemo(()=>{e.wrapS=e.wrapT=An,e.minFilter=Si,e.magFilter=vn,e.colorSpace=In,e.needsUpdate=!0},[e]),e}function zn(e,n,i={}){if(e.userData.hasUnderwaterCaustics)return;const s=i.includeRipple??!0,o=i.baseLight??.045,a=i.causticsStrength??.86,d=i.lightTint??[.46,.82,1],l=e.onBeforeCompile.bind(e),m=e.customProgramCacheKey.bind(e);e.onBeforeCompile=(f,g)=>{l(f,g),f.uniforms.causticsMap={value:n},f.uniforms.causticsTime=Nr,f.uniforms.causticsRippleSampler={value:Be.texture},f.uniforms.causticsRippleCenter={value:Be.center},f.uniforms.causticsRippleWorldSize={value:qe},f.uniforms.causticsRippleTexel={value:new Nt(1/F,1/F)},f.vertexShader=`varying vec3 vCausticsWorldPosition;
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
      ${s?`vec2 causticsRippleUv =
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
        (${o.toFixed(4)} + movingCaustics * ${a.toFixed(4)});`)},e.customProgramCacheKey=()=>`${m()}-underwater-caustics-v4-${s?"ripple":"fine"}-${o}-${a}`,e.userData.hasUnderwaterCaustics=!0,e.needsUpdate=!0}class Bs{constructor(){He(this,"cells",new Map);He(this,"ready",!1)}build(n){this.clear(),n.updateWorldMatrix(!0,!0);let i=0;n.traverse(a=>{if(!(a instanceof Ot))return;const d=a.geometry.getAttribute("position");d&&(i+=d.count)});const s=Math.max(1,Math.ceil(i/As)),o=new oe;n.traverse(a=>{if(!(a instanceof Ot))return;const d=a.geometry.getAttribute("position");if(d)for(let l=0;l<d.count;l+=s){o.fromBufferAttribute(d,l),a instanceof Ei&&a.applyBoneTransform(l,o),o.applyMatrix4(a.matrixWorld);const m=this.keyFor(o.x,o.y,o.z),f=this.cells.get(m)??[];f.push(o.clone()),this.cells.set(m,f)}}),this.ready=this.cells.size>0}resolve(n,i){if(!this.ready)return!1;const s=i+Ps,o=Math.ceil(s/ut);let a=!1;for(let d=0;d<2;d+=1){const l=Math.floor(n.x/ut),m=Math.floor(n.y/ut),f=Math.floor(n.z/ut);for(let g=l-o;g<=l+o;g+=1)for(let y=m-o;y<=m+o;y+=1)for(let N=f-o;N<=f+o;N+=1){const v=this.cells.get(`${g}:${y}:${N}`);if(v)for(const j of v){const w=n.distanceToSquared(j);if(w>=s**2)continue;const R=Math.sqrt(w);R>1e-4?n.addScaledVector(n.clone().sub(j).divideScalar(R),s-R):n.y+=s,a=!0}}}return a}clear(){this.cells.clear(),this.ready=!1}keyFor(n,i,s){return`${Math.floor(n/ut)}:${Math.floor(i/ut)}:${Math.floor(s/ut)}`}}const Tn=new Bs;class Ds{constructor(){He(this,"center",new Nt);He(this,"texture");He(this,"height",new Float32Array(F**2));He(this,"velocity",new Float32Array(F**2));He(this,"nextHeight",new Float32Array(F**2));He(this,"nextVelocity",new Float32Array(F**2));He(this,"pixels",new Uint8Array(F**2*4));He(this,"accumulator",0);for(let n=0;n<this.pixels.length;n+=4)this.pixels[n]=128,this.pixels[n+1]=128,this.pixels[n+2]=128,this.pixels[n+3]=255;this.texture=new li(this.pixels,F,F,ui,di),this.texture.minFilter=vn,this.texture.magFilter=vn,this.texture.wrapS=this.texture.wrapT=mi,this.texture.colorSpace=In,this.texture.needsUpdate=!0}moveWindowTo(n,i){if((this.center.x-n)**2+(this.center.y-i)**2<180**2)return;const s=qe/(F-1),o=Math.round((n-this.center.x)/s),a=Math.round((i-this.center.y)/s);this.nextHeight.fill(0),this.nextVelocity.fill(0);for(let d=0;d<F;d+=1){const l=d+a;if(!(l<0||l>=F))for(let m=0;m<F;m+=1){const f=m+o;if(f<0||f>=F)continue;const g=d*F+m,y=l*F+f;this.nextHeight[g]=this.height[y],this.nextVelocity[g]=this.velocity[y]}}this.height.set(this.nextHeight),this.velocity.set(this.nextVelocity),this.nextHeight.fill(0),this.nextVelocity.fill(0),this.center.x+=o*s,this.center.y+=a*s,this.encodeTexture()}addRipple(n,i,s=.8,o=20){const a=(n-this.center.x)/qe+.5,d=(i-this.center.y)/qe+.5;if(a<=0||a>=1||d<=0||d>=1)return;const l=a*(F-1),m=d*(F-1),f=Math.max(2,o/qe*F),g=Math.ceil(f*2.4),y=Math.max(1,Math.floor(l-g)),N=Math.min(F-2,Math.ceil(l+g)),v=Math.max(1,Math.floor(m-g)),j=Math.min(F-2,Math.ceil(m+g));for(let w=v;w<=j;w+=1)for(let R=y;R<=N;R+=1){const U=(R-l)**2+(w-m)**2,P=Math.exp(-U/(f*f*.72));this.velocity[w*F+R]+=s*P}}displaceSphere(n,i,s){if(s<=.001)return;const o=Math.min(n.x,i.x)-s,a=Math.max(n.x,i.x)+s,d=Math.min(n.z,i.z)-s,l=Math.max(n.z,i.z)+s,m=R=>((R-this.center.x)/qe+.5)*(F-1),f=R=>((R-this.center.y)/qe+.5)*(F-1),g=Math.max(1,Math.floor(m(o))),y=Math.min(F-2,Math.ceil(m(a))),N=Math.max(1,Math.floor(f(d))),v=Math.min(F-2,Math.ceil(f(l)));if(g>y||N>v)return;const j=s*s,w=(R,U,P)=>{const b=(R-P.x)**2+(U-P.z)**2;if(b>=j)return 0;const I=Math.sqrt(j-b),W=P.y-I,k=P.y+I;return ue.clamp(We-W,0,k-W)};for(let R=N;R<=v;R+=1){const U=this.center.y+(R/(F-1)-.5)*qe;for(let P=g;P<=y;P+=1){const b=this.center.x+(P/(F-1)-.5)*qe,I=w(b,U,n),W=w(b,U,i),k=(I-W)/s;if(Math.abs(k)<1e-5)continue;const O=R*F+P;this.height[O]+=ue.clamp(k*.58,-.48,.48),this.velocity[O]+=ue.clamp(k*.1,-.08,.08)}}}step(n){this.accumulator+=Math.min(n,.05);const i=1/30;let s=!1;for(;this.accumulator>=i;){for(let o=1;o<F-1;o+=1)for(let a=1;a<F-1;a+=1){const d=o*F+a,l=this.height[d-1]+this.height[d+1]+this.height[d-F]+this.height[d+F]-this.height[d]*4,m=(this.velocity[d]+l*.22)*.986;this.nextVelocity[d]=m,this.nextHeight[d]=(this.height[d]+m*.78)*.998}[this.height,this.nextHeight]=[this.nextHeight,this.height],[this.velocity,this.nextVelocity]=[this.nextVelocity,this.velocity],this.nextHeight.fill(0),this.nextVelocity.fill(0),this.accumulator-=i,s=!0}s&&this.encodeTexture()}dispose(){this.texture.dispose()}encodeTexture(){for(let n=0;n<this.height.length;n+=1){const i=Math.round(ue.clamp(128+this.height[n]*42,0,255)),s=n*4;this.pixels[s]=i,this.pixels[s+1]=i,this.pixels[s+2]=i,this.pixels[s+3]=255}this.texture.needsUpdate=!0}}const Be=new Ds;function $s(e,n,i){let s=n-e;for(;s<-Math.PI;)s+=Math.PI*2;for(;s>Math.PI;)s-=Math.PI*2;return e+s*i}function Fs(){const e=t.useRef(null),n=jn(Pn,"/waternormals.jpeg");n.wrapS=n.wrapT=An;const i=t.useMemo(()=>new bi(nn,nn),[]),s=t.useMemo(()=>{const o=new oi(i,{textureWidth:512,textureHeight:512,clipBias:.003,waterNormals:n,sunDirection:Ns.clone(),sunColor:new Mt("#fff2cc"),waterColor:new Mt(Ls),distortionScale:10.7,alpha:.955,fog:!1}),a=o.material;return a.transparent=!0,a.depthTest=!0,a.depthWrite=!0,a.uniforms.rippleSampler={value:Be.texture},a.uniforms.rippleCenter={value:Be.center},a.uniforms.rippleWorldSize={value:qe},a.uniforms.rippleTexel={value:new Nt(1/F,1/F)},a.uniforms.surfacePulseTime={value:Rn()},a.uniforms.surfacePulseCenters={value:Array.from({length:ze},()=>new Nt)},a.uniforms.surfacePulseStarts={value:new Float32Array(ze).fill(-1e3)},a.uniforms.surfacePulseDurations={value:new Float32Array(ze).fill(1)},a.uniforms.surfacePulseRadii={value:new Float32Array(ze)},a.uniforms.surfacePulseStrengths={value:new Float32Array(ze)},a.fragmentShader=a.fragmentShader.replace("uniform vec3 waterColor;",`uniform vec3 waterColor;
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
          );`),a.needsUpdate=!0,o.renderOrder=2,o},[i,n]);return s.material.uniforms.waterColor.value.convertSRGBToLinear(),t.useEffect(()=>()=>{i.dispose(),s.material.dispose()},[i,s]),nt((o,a)=>{if(Be.step(a),e.current){const d=e.current.material;d.uniforms.time.value+=a,d.uniforms.rippleCenter.value.copy(Be.center);const l=Rn();d.uniforms.surfacePulseTime.value=l;const m=d.uniforms.surfacePulseCenters.value,f=d.uniforms.surfacePulseStarts.value,g=d.uniforms.surfacePulseDurations.value,y=d.uniforms.surfacePulseRadii.value,N=d.uniforms.surfacePulseStrengths.value;for(let v=0;v<ze;v+=1){const j=mt[v];if(!j){f[v]=-1e3,g[v]=1,y[v]=0,N[v]=0;continue}m[v].set(j.x,j.z),f[v]=j.startedAt,g[v]=j.duration,y[v]=j.radius,N[v]=j.strength}}}),r.jsx("primitive",{object:s,ref:e,"rotation-x":-Math.PI/2})}function Us(){const e=Ln(),n=t.useMemo(()=>{const i=new Mn({color:"#315057",roughness:.96,metalness:0,side:hi});return zn(i,e),i},[e]);return t.useEffect(()=>()=>n.dispose(),[n]),nt(i=>{Nr.value=i.clock.elapsedTime}),r.jsxs("mesh",{"rotation-x":-Math.PI/2,"position-y":St,renderOrder:0,receiveShadow:!0,children:[r.jsx("planeGeometry",{args:[nn,nn]}),r.jsx("primitive",{object:n,attach:"material"})]})}function Ws(){const e=t.useRef(0),n=260,i=4,s=n*(i+.55),o=t.useMemo(()=>Array.from({length:(i*2+1)**2*3},(l,m)=>{const f=Math.floor(m/3);return{relativeCellX:f%(i*2+1)-i,relativeCellZ:Math.floor(f/(i*2+1))-i,memberIndex:m%3}}),[]),a=t.useMemo(()=>{const l=new gi;return l.setAttribute("position",new dn(new Float32Array(o.length*3),3)),l.setAttribute("aSize",new dn(new Float32Array(o.length),1)),l.setAttribute("aAlpha",new dn(new Float32Array(o.length),1)),l},[o.length]),d=t.useMemo(()=>new xr({transparent:!0,depthWrite:!1,toneMapped:!1,uniforms:{visibility:{value:0}},vertexShader:`
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
        `}),[]);return t.useEffect(()=>()=>{a.dispose(),d.dispose()},[a,d]),nt(({camera:l,clock:m},f)=>{e.current=ue.damp(e.current,l.position.y<We-.45?1:0,5.2,f),d.uniforms.visibility.value=e.current;const g=a.getAttribute("position"),y=a.getAttribute("aSize"),N=a.getAttribute("aAlpha"),v=m.elapsedTime,j=We-St-7,w=At.current?.position??l.position,R=Math.floor(w.x/n),U=Math.floor(w.z/n),P=(b,I,W)=>{const k=Math.sin(b*127.1+I*311.7+W*74.7)*43758.5453;return k-Math.floor(k)};o.forEach((b,I)=>{const W=R+b.relativeCellX,k=U+b.relativeCellZ,O=P(W,k,1)>.48?3:2;if(b.memberIndex>=O){N.setX(I,0);return}const B=(W+.14+P(W,k,2)*.72)*n,V=(k+.14+P(W,k,3)*.72)*n,A=P(W,k,4)*Math.PI*2+b.memberIndex*2.1,E=B+Math.cos(A)*(3+b.memberIndex*2),Y=V+Math.sin(A)*(3+b.memberIndex*2),ae=(P(W,k,5+b.memberIndex)+b.memberIndex*.07)%1,ie=16+P(W,k,9+b.memberIndex)*10,L=4.8+P(W,k,13+b.memberIndex)*3.2,H=2.2+P(W,k,17+b.memberIndex)*2.4,D=(v/ie+ae)%1,ee=Math.sin(v*.72+A+D*Math.PI*3)*H,_e=Math.cos(v*.51+A*1.4)*H*.55,K=ue.smoothstep(D,0,.08),q=1-ue.smoothstep(D,.8,.985),de=Math.hypot(E-w.x,Y-w.z),M=1-ue.smoothstep(de,s*.72,s);g.setXYZ(I,E+ee,St+4+D*j,Y+_e),y.setX(I,L*(.82+D*.48)),N.setX(I,K*q*M*.82)}),g.needsUpdate=!0,y.needsUpdate=!0,N.needsUpdate=!0}),r.jsx("points",{geometry:a,material:d,frustumCulled:!1,renderOrder:5})}function Ys(){const e=t.useRef(null),{camera:n}=pt(),i=jn(Pn,"/waternormals.jpeg");t.useMemo(()=>{i.wrapS=i.wrapT=An,i.colorSpace=In,i.needsUpdate=!0},[i]);const s=t.useMemo(()=>new xr({uniforms:{time:{value:0},normalSampler:{value:i},rippleSampler:{value:Be.texture},rippleCenter:{value:Be.center},rippleWorldSize:{value:qe}},vertexShader:`
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
        `,side:xi,transparent:!0,depthWrite:!1,depthTest:!0}),[i]);return t.useEffect(()=>()=>s.dispose(),[s]),nt(o=>{s.uniforms.time.value=o.clock.elapsedTime,s.uniforms.rippleCenter.value.copy(Be.center),e.current&&(e.current.position.x=n.position.x,e.current.position.z=n.position.z,e.current.visible=n.position.y<We-.35)}),r.jsxs("mesh",{ref:e,"rotation-x":-Math.PI/2,"position-y":We-.22,renderOrder:3,frustumCulled:!1,children:[r.jsx("planeGeometry",{args:[16e3,16e3,128,128]}),r.jsx("primitive",{object:s,attach:"material"})]})}function Vs(){const{camera:e}=pt();return t.useEffect(()=>{const n=new yi,i=new Nt,s=new wi(new oe(0,1,0),0),o=new oe,a=d=>{document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1"&&(!d.isPrimary||d.button>0||d.target instanceof Element&&d.target.closest("button, input, textarea, select, a, [role='button'], [data-ocean-control]")||(i.set(d.clientX/window.innerWidth*2-1,-(d.clientY/window.innerHeight)*2+1),n.setFromCamera(i,e),n.ray.intersectPlane(s,o)&&(Be.addRipple(o.x,o.z,-1.05,22),Or(o.x,o.z,{duration:2.7,radius:82,strength:.72,kind:"click"}))))};return window.addEventListener("pointerdown",a,{passive:!0}),()=>window.removeEventListener("pointerdown",a)},[e]),null}function Xs(){const{camera:e,scene:n}=pt(),i=t.useRef(0),s=t.useRef(null),o=t.useMemo(()=>new Mt(Pr),[]),a=t.useMemo(()=>new Mt("#04395a"),[]),d=t.useMemo(()=>new Mt,[]),l=t.useMemo(()=>new ki("#0a5273",0),[]);return nt((m,f)=>{const g=e.position.y<We-.45;i.current=ue.damp(i.current,g?1:0,4.8,f);const y=i.current;d.lerpColors(o,a,y),n.background=d,l.density=y*.0028,n.fog=y>.003?l:null,s.current===null?s.current=g:g!==s.current&&(s.current=g,window.dispatchEvent(new CustomEvent("ocean-surface-cross",{detail:{underwater:g}})))}),t.useEffect(()=>()=>{n.fog=null,n.background=o},[o,n]),null}function Hs(){const e=t.useRef(null),{camera:n}=pt();return nt((i,s)=>{e.current&&(e.current.intensity=ue.damp(e.current.intensity,n.position.y<We-.45?.24:0,4.2,s))}),r.jsx("hemisphereLight",{ref:e,color:"#65c9f1",groundColor:"#041b2b",intensity:0})}function qs(){const e=t.useRef(null),n=t.useRef(1),{camera:i}=pt();return t.useEffect(()=>{const s=e.current?.material;s&&(s.transparent=!0,s.depthWrite=!1,s.needsUpdate=!0)},[]),nt((s,o)=>{const a=e.current?.material;a&&(n.current=ue.damp(n.current,i.position.y<We-.45?0:1,4.8,o),a.opacity=n.current,e.current.visible=n.current>.004)}),r.jsx(si,{ref:e,distance:Is,sunPosition:Mr,turbidity:.6,rayleigh:.6,mieCoefficient:.001,mieDirectionalG:.85})}function Gs(){const{scene:e}=sn("/island.gltf"),n=Ln(),i=t.useMemo(()=>{const s=e.clone(!0);return s.scale.setScalar(100),s.position.set(0,-5,-300),s.traverse(o=>{if(!(o instanceof Ot))return;const d=(Array.isArray(o.material)?o.material:[o.material]).map(l=>{const m=l.clone();return m instanceof Mn&&(m.roughness=Math.max(m.roughness,.82),m.metalness=Math.min(m.metalness,.02),m.envMapIntensity=.08,zn(m,n)),m.needsUpdate=!0,m});o.material=Array.isArray(o.material)?d:d[0],o.castShadow=!0,o.receiveShadow=!0}),s},[n,e]);return t.useLayoutEffect(()=>(Tn.build(i),()=>Tn.clear()),[i]),t.useEffect(()=>()=>{i.traverse(s=>{if(!(s instanceof Ot))return;(Array.isArray(s.material)?s.material:[s.material]).forEach(a=>a.dispose())})},[i]),r.jsx("primitive",{object:i})}function Ks(){const e=t.useRef(null),{camera:n}=pt(),{scene:i}=sn("/wolfy.glb"),s=Ln(),o=t.useMemo(()=>ai.clone(i),[i]),a=t.useMemo(()=>zs(),[]),d=Math.abs(a.position[1]-It)<.1,l=t.useRef(new oe),m=t.useRef(0),f=t.useRef(!1),g=t.useRef(0),y=t.useRef(0),N=t.useRef(new oe),v=t.useRef(0),j=t.useRef(a.position[1]),w=t.useRef(d),R=t.useRef(!d),U=t.useRef(!1),P=t.useRef(!1),b=t.useRef(new oe(0,0,1)),I=t.useRef(a.position[1]),W=t.useRef(null),k=t.useRef(new oe),O=t.useRef(new oe),B=t.useRef(new oe(0,1,0)),V=t.useMemo(()=>{o.updateWorldMatrix(!0,!0);const A=new vi().setFromObject(o);if(A.isEmpty())return{localCenter:new oe(0,.65,0),radius:6.5};const E=A.getSize(new oe).multiplyScalar(gn),Y=A.getCenter(new oe).multiplyScalar(gn),ae=Math.max(E.x,E.z)*.5,ie=E.y*.32;return{localCenter:Y,radius:ue.clamp(Math.max(ae,ie),5,14)}},[o]);return t.useEffect(()=>{o.traverse(A=>{A instanceof Ot&&A.material instanceof Mn&&(A.material=A.material.clone(),A.material.roughness=.42,A.material.metalness=.05,A.material.envMapIntensity=.35,zn(A.material,s,{includeRipple:!1,baseLight:0,causticsStrength:.78,lightTint:[1,.98,.9]}),A.castShadow=!0,A.receiveShadow=!0)})},[s,o]),t.useEffect(()=>{At.current=e.current;const A=L=>{const{x:H,z:D}=L.detail;l.current.set(H,0,D)},E=()=>{U.current||!w.current&&!R.current||(U.current=!0,R.current=!1,w.current=!1,j.current=e.current.position.y,v.current=js)},Y=L=>{const{y:H}=L.detail;m.current=ue.clamp(H,-1,1),Math.abs(m.current)>.01&&(U.current=!1,R.current=!0,w.current=!1)},ae=L=>{f.current=L.detail.active},ie=L=>{if(P.current=L.detail.enabled,!P.current){l.current.set(0,0,0),m.current=0,U.current=!1;const H=Math.abs(e.current.position.y-It)<.1;w.current=H,R.current=!H,f.current=!1,g.current=0,bn(e.current)}};return window.addEventListener("explore-joystick",A),window.addEventListener("explore-jump",E),window.addEventListener("explore-vertical",Y),window.addEventListener("explore-sprint",ae),window.addEventListener("explore-mode",ie),P.current=document.getElementById("global-sky-ocean-bg")?.getAttribute("data-explore")==="1",()=>{window.removeEventListener("explore-joystick",A),window.removeEventListener("explore-jump",E),window.removeEventListener("explore-vertical",Y),window.removeEventListener("explore-sprint",ae),window.removeEventListener("explore-mode",ie),bn(e.current),At.current===e.current&&(At.current=null)}},[]),nt((A,E)=>{if(!e.current||!P.current)return;const Y=new oe(l.current.x+(xe.arrowright||xe.d?1:0)-(xe.arrowleft||xe.a?1:0),0,l.current.z+(xe.arrowup||xe.w?1:0)-(xe.arrowdown||xe.s?1:0));Y.lengthSq()<.01&&Y.set(0,0,0);const ae=!!xe.shift||f.current;g.current=ue.damp(g.current,ae?1:0,ae?5.5:3.8,E);const ie=new oe;n.getWorldDirection(ie),ie.y=0,ie.normalize();const L=new oe().crossVectors(ie,new oe(0,1,0)).normalize(),H=new oe().addScaledVector(ie,Y.z).addScaledVector(L,Y.x);H.lengthSq()>1e-4&&H.normalize();const D=100*(1+g.current*1.65);N.current.lerp(H.multiplyScalar(D),E*6);const ee=e.current.position.clone().addScaledVector(N.current,E),_e=(xe.e?1:0)-(xe.q?1:0),K=ue.clamp(_e+m.current,-1,1);if(Math.abs(K)>.01&&(U.current=!1,R.current=!0,w.current=!1),U.current)v.current-=nr*Math.min(E,.05);else if(R.current){const M=58*(1+g.current*1.2);v.current=ue.damp(v.current,K*M,K===0?7.5:6,E)}else v.current-=nr*Math.min(E,.05);ee.y+=v.current*Math.min(E,.05);const q=U.current?j.current:It;if(!R.current&&ee.y<=q&&(ee.y=q,v.current=0,w.current=!0,U.current=!1,R.current=Math.abs(q-It)>=.1),ee.y=ue.clamp(ee.y,St+8,_n),(ee.y===St+8||ee.y===_n)&&(v.current=0),Tn.resolve(ee,5)&&(N.current.multiplyScalar(.2),v.current*=.2),e.current.position.copy(ee),Be.moveWindowTo(ee.x,ee.z),O.current.copy(V.localCenter).applyAxisAngle(B.current,e.current.rotation.y),k.current.copy(ee).add(O.current),W.current?Be.displaceSphere(W.current,k.current,V.radius):W.current=k.current.clone(),I.current>We&&k.current.y<=We||I.current<We&&k.current.y>=We){const M=k.current.y>I.current,ve=Math.max(34,V.radius*2.8);Be.addRipple(k.current.x,k.current.z,M?.46:-2.05,M?V.radius*1.6:ve),Or(k.current.x,k.current.z,{duration:M?2.2:3.5,radius:M?ve*1.55:ve*3.3,strength:M?.58:1.55,kind:M?"rise":"dive"}),window.dispatchEvent(new CustomEvent("ocean-player-splash",{detail:{submerging:!M,speed:Math.abs(v.current)}})),!M&&!U.current&&(v.current=Math.min(v.current,-72))}if(I.current=k.current.y,W.current.copy(k.current),Y.lengthSq()>.01){const M=H.clone();Y.z<-.2&&M.copy(ie),b.current.lerp(M,.15).normalize();const ve=Math.atan2(b.current.x,b.current.z);e.current.rotation.y=$s(e.current.rotation.y,ve,.15)}e.current.userData.joyX=l.current.x,y.current+=E,y.current>=.45&&(y.current=0,bn(e.current))}),r.jsx("primitive",{ref:e,object:o,scale:gn,position:a.position,rotation:[0,a.rotationY,0]})}function Zs(){const{camera:e}=pt(),n=t.useRef(0),i=t.useRef(0),s=t.useRef(!1);return t.useEffect(()=>{const o=a=>{s.current=a.detail.enabled};return window.addEventListener("explore-mode",o),()=>window.removeEventListener("explore-mode",o)},[]),nt((o,a)=>{const d=At.current;if(!d)return;i.current+=a*(s.current?1:-1),i.current=ue.clamp(i.current,0,1);const l=i.current*i.current*(3-2*i.current),f=(xe.arrowright||xe.d?1:0)-(xe.arrowleft||xe.a?1:0)+(d.userData?.joyX??0);Math.abs(f)>.05&&(n.current-=f*a*2.5);const g=new oe(0,22,70);g.applyAxisAngle(new oe(0,1,0),n.current);const y=d.position.clone().add(g),v=new oe(0,20,100).add(new oe(Math.sin(i.current*Math.PI)*20,0,0)).lerp(y,l);e.position.lerp(v,.12);const j=new oe(0,5,0),w=d.position.clone();w.y+=6,e.lookAt(j.lerp(w,l))}),null}function Js(){const e=t.useRef(null),n=t.useRef(!1);return t.useEffect(()=>{const i=new Audio("/Ocean.mp3");i.loop=!0,i.preload="auto",i.volume=0,e.current=i;const s=(m,f=2e3)=>{if(!e.current)return;const g=e.current,y=g.volume,N=performance.now(),v=j=>{const w=Math.min((j-N)/f,1);g.volume=y+(m-y)*w,w<1?requestAnimationFrame(v):m===0&&(g.pause(),g.currentTime=0)};requestAnimationFrame(v)},o=async()=>{n.current=!0;try{i.paused&&await i.play(),s(.14,2400)}catch{}},a=()=>{n.current=!1,s(0,1800)},d=m=>{m.detail.active?o():a()},l=()=>{n.current&&o()};return window.addEventListener("skyocean-audio",d),window.addEventListener("pointerdown",l,{passive:!0}),window.addEventListener("keydown",l),document.getElementById("global-sky-ocean-bg")?.getAttribute("data-audio-active")==="1"&&o(),()=>{window.removeEventListener("skyocean-audio",d),window.removeEventListener("pointerdown",l),window.removeEventListener("keydown",l),i.pause(),i.src=""}},[]),null}function Qs(){return t.useEffect(()=>{const e=new Audio("/bubble.mp3");e.preload="auto",e.volume=.24;let n=null;const i=o=>{const a=o.detail.underwater;e.pause(),e.currentTime=0,e.playbackRate=a?.9:1.08,e.play().catch(()=>{})},s=o=>{const{submerging:a,speed:d}=o.detail;if(!a)return;n??(n=new AudioContext),n.state==="suspended"&&n.resume();const l=n.currentTime,m=n.createOscillator(),f=n.createGain(),g=ue.clamp(d/70,.7,1.35);m.type="sine",m.frequency.setValueAtTime(168*g,l),m.frequency.exponentialRampToValueAtTime(54,l+.38),f.gain.setValueAtTime(1e-4,l),f.gain.exponentialRampToValueAtTime(.16*g,l+.012),f.gain.exponentialRampToValueAtTime(1e-4,l+.44),m.connect(f),f.connect(n.destination),m.start(l),m.stop(l+.46)};return window.addEventListener("ocean-surface-cross",i),window.addEventListener("ocean-player-splash",s),()=>{window.removeEventListener("ocean-surface-cross",i),window.removeEventListener("ocean-player-splash",s),e.pause(),e.src="",n&&n.close()}},[]),null}function eo(){return r.jsxs(r.Fragment,{children:[r.jsx(Js,{}),r.jsx(Qs,{}),r.jsxs(ii,{shadows:!0,dpr:[1,1.5],camera:{position:[0,20,100],fov:55,near:.1,far:Ms},gl:{antialias:!0,toneMapping:fi,toneMappingExposure:.8,outputColorSpace:pi},children:[r.jsx("color",{attach:"background",args:[Pr]}),r.jsx("directionalLight",{position:Mr,intensity:1,color:Os,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-camera-near":10,"shadow-camera-far":1800,"shadow-camera-left":-500,"shadow-camera-right":500,"shadow-camera-top":500,"shadow-camera-bottom":-500}),r.jsx("ambientLight",{intensity:.35,color:"#ffffff"}),r.jsx(Hs,{}),r.jsx(qs,{}),r.jsxs(t.Suspense,{fallback:null,children:[r.jsx(Us,{}),r.jsx(Ws,{}),r.jsx(Fs,{}),r.jsx(Ys,{}),r.jsx(Gs,{}),r.jsx(Ks,{})]}),r.jsx(Zs,{}),r.jsx(Vs,{}),r.jsx(Xs,{})]})]})}sn.preload("/wolfy.glb");sn.preload("/island.gltf");function $t(e,n){return e instanceof Error?e:typeof e=="object"&&e&&"message"in e?new Error(String(e.message)):new Error(n)}function to(e){return e.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")}async function no(){const{data:e,error:n}=await J.from("archive_sections").select("*").eq("is_visible",!0).order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw $t(n,"Unable to load the archive sections.");return e??[]}async function Bo(){const{data:e,error:n}=await J.from("archive_sections").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!0});if(n)throw $t(n,"Unable to load the archive section manager.");return e??[]}async function Do(e,n,i){const s=e.trim(),o=to(s),a=n.trim().toUpperCase().slice(0,8);if(!s||!o)throw new Error("Enter a section name.");if(!a)throw new Error("Enter a short section code.");const{data:d,error:l}=await J.from("archive_sections").insert({name:s,slug:o,code:a,sort_order:i,is_visible:!0}).select("*").single();if(l)throw $t(l,"Unable to create the archive section.");return d}async function $o(e,n){const i={...n,...n.name!==void 0?{name:n.name.trim()}:{},...n.code!==void 0?{code:n.code.trim().toUpperCase().slice(0,8)}:{}},{data:s,error:o}=await J.from("archive_sections").update(i).eq("id",e).select("*").single();if(o)throw $t(o,"Unable to save the archive section.");return s}async function Fo(e){const{error:n}=await J.from("archive_sections").delete().eq("id",e.id);if(n)throw $t(n,"Unable to delete this section. Move its books to another section first.")}const ir=[{id:"default-objects",slug:"objects",name:"Objects",code:"OBJ",sort_order:0,is_visible:!0,created_at:"",updated_at:""},{id:"default-graphics",slug:"graphics",name:"Graphics",code:"GRPH",sort_order:1,is_visible:!0,created_at:"",updated_at:""},{id:"default-concepts",slug:"concepts",name:"Concepts",code:"CNCP",sort_order:2,is_visible:!0,created_at:"",updated_at:""}],ro=`
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
`,le={splash:"splashShown",stage:"appStage",activeButton:"activeButton",searchOpen:"searchOpen",searchQuery:"searchQuery",returnFlag:"returnFromExample",snapshot:"listSnapshot",listScroll:"listScroll",exploreMode:"exploreMode"},io="Gabriel Dell'Aiuto. b. 1996. Studier Zimmer is a space for G and friends.",sr="global-spotify-player";function Ht(e,n=!1){let i=document.getElementById(sr);if(!(!i&&!e&&!n)){if(!i){i=document.createElement("div"),i.id=sr,Object.assign(i.style,{position:"fixed",bottom:"194px",left:"50%",width:"min(92vw, 430px)",zIndex:"210",overflow:"hidden",borderRadius:"12px",background:"#e6e6e6",boxShadow:"0 20px 60px rgb(0 0 0 / 0.22)",transformOrigin:"bottom",transition:"opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)"});const s=document.createElement("iframe");s.title="Spotify playlist",s.src="https://open.spotify.com/embed/playlist/5Z63kqzOn4CzWqazejJZEv?utm_source=generator&si=a41c800f68534cb7",s.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",s.allowFullscreen=!0,s.loading="lazy",s.frameBorder="0",Object.assign(s.style,{display:"block",width:"100%",height:"min(352px, calc(100dvh - 218px))",minHeight:"96px",border:"0"}),i.appendChild(s),document.body.appendChild(i)}i.style.pointerEvents=e?"auto":"none",i.style.opacity=e?"1":"0",i.style.transform=e?"translateX(-50%) translateY(0) scale(1)":"translateX(-50%) translateY(16px) scale(0.75)"}}const so=()=>{const e=rn(),i=t.useRef(sessionStorage.getItem(Dt)==="true").current,o=t.useRef(sessionStorage.getItem(Bt)==="true"||i||sessionStorage.getItem("bookOpenedFromStartup")==="true").current,d=t.useRef(o&&sessionStorage.getItem(le.returnFlag)==="true").current,[l]=t.useState(()=>on()),[m,f]=t.useState(o),[g,y]=t.useState([]),[N,v]=t.useState(!0),[j,w]=t.useState(null),[R,U]=t.useState(ir),[P,b]=t.useState(!1),I=t.useCallback(async()=>{v(!0);try{const c=await Er();y(c),w(null)}catch(c){console.error("Unable to load published books",c),w(c instanceof Error?c.message:"Unable to load the published books.")}finally{v(!1)}},[]),W=t.useCallback(async()=>{try{const c=await no();U(c),b(!0)}catch{U(ir),b(!1)}},[]);t.useEffect(()=>{I(),W();const c=()=>{I(),W()},x=()=>{document.visibilityState==="visible"&&I()};return window.addEventListener("focus",c),document.addEventListener("visibilitychange",x),()=>{window.removeEventListener("focus",c),document.removeEventListener("visibilitychange",x)}},[W,I]);const k=t.useMemo(()=>g.find(c=>c.is_featured)??g[0]??null,[g]),O=t.useMemo(()=>{if(P)return R;const c=[...R];return g.forEach(x=>{c.some(T=>T.slug===x.category)||c.push({id:`fallback-${x.category}`,slug:x.category,name:x.category.replace(/-/g," "),code:x.category.slice(0,4).toUpperCase(),sort_order:c.length,is_visible:!0,created_at:"",updated_at:""})}),c},[R,P,g]),B=t.useMemo(()=>{const c=new Map(O.map(T=>[T.slug,T])),x=T=>({id:T.id,category:c.get(T.category)?.code??T.category.slice(0,4).toUpperCase(),name:T.title,link:`/book/${encodeURIComponent(T.slug)}`,isFeatured:T.is_featured});return O.reduce((T,G)=>(T[G.slug]=g.filter(be=>be.category===G.slug).map(x),T),{})},[O,g]),V=t.useMemo(()=>Object.values(B).flat(),[B]);t.useEffect(()=>{if(typeof window>"u"||typeof document>"u")return;const c="__GLOBAL_SKY_OCEAN_BG_ROOT__",x=window,T=document.getElementById("global-sky-ocean-bg");if(x[c]){T&&(T.style.display="block",T.style.zIndex="0");return}const G=document.createElement("div");G.id="global-sky-ocean-bg",Object.assign(G.style,{position:"fixed",inset:"0",zIndex:"0",pointerEvents:"none"}),document.body.prepend(G);const be=gr.createRoot(G);be.render(r.jsx(t.Suspense,{fallback:null,children:r.jsx(eo,{})})),x[c]=be},[]);const A=i?"intro":sessionStorage.getItem(le.stage)||"intro",E=sessionStorage.getItem(le.activeButton)||null,Y=sessionStorage.getItem(le.searchOpen)==="true",ae=sessionStorage.getItem(le.searchQuery)||"",ie=sessionStorage.getItem(le.exploreMode)==="true",[L,H]=t.useState(A),[D,ee]=t.useState(E),[_e,K]=t.useState(Y),[q,de]=t.useState(ae),[M,ve]=t.useState(ie),[Ye,ye]=t.useState(!1),Et=A==="list"||!!E||Y,[Ae,$]=t.useState(Et),[X,Re]=t.useState(!1),[he,Ne]=t.useState(!1),[ge,Je]=t.useState(!1),[re,Ct]=t.useState(!1);t.useEffect(()=>{if(!re||he)return;if(o){f(!0);return}f(!1);let c=0;const x=window.requestAnimationFrame(()=>{c=window.requestAnimationFrame(()=>{f(!0)})});return()=>{window.cancelAnimationFrame(x),window.cancelAnimationFrame(c)}},[re,o,he]);const[Qe,Pe]=t.useState(!1),[Q,me]=t.useState(!1),[De,te]=t.useState(!1),[se,C]=t.useState(!1),[Ge,lt]=t.useState(!d),Te=t.useRef(null),[we,Ve]=t.useState(()=>{if(o)return!1;try{return sessionStorage.getItem("revealDone")==="true"}catch{return!1}}),Xe=t.useRef(null),$e=t.useRef(null);t.useEffect(()=>()=>{Te.current&&window.clearTimeout(Te.current)},[]),t.useEffect(()=>{if(!ge||L!=="intro"||De||Q||!we)return;const c=window.setTimeout(()=>{C(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(c)}},[De,ge,Q,we,L]),t.useEffect(()=>{if(L!=="main"&&L!=="list"||Q||!we||Ge)return;const c=window.setTimeout(()=>{lt(!0),window.dispatchEvent(new Event("mousemove"))},1160);return()=>{window.clearTimeout(c)}},[Ge,Q,we,L]);const[_t,ht]=t.useState(!1),pe=t.useRef(null),Oe=t.useRef(null),[et,Fe]=t.useState(!1);t.useEffect(()=>{if(!o)return;sessionStorage.removeItem("bookOpenedFromStartup"),sessionStorage.removeItem(Bt),sessionStorage.removeItem(Dt),sessionStorage.removeItem("revealDone"),Ve(!1),Pe(!1),document.documentElement.style.background="",document.body.style.background="";const c=document.getElementById("global-sky-ocean-bg");c&&(c.style.display="block",c.style.zIndex="0")},[o]),t.useEffect(()=>{try{sessionStorage.setItem(le.exploreMode,String(M))}catch{}window.dispatchEvent(new CustomEvent("explore-mode",{detail:{enabled:M}}));const c=document.getElementById("global-sky-ocean-bg");c&&c.setAttribute("data-explore",M?"1":"0")},[M]),t.useEffect(()=>{M||(ye(!1),Ht(!1))},[M]),t.useEffect(()=>(Ht(!1,!0),()=>{Ht(!1)}),[]),t.useEffect(()=>{const c=re&&!he&&!Q;document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active",c?"1":"0");const T=window.setTimeout(()=>{window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:c}}))},0);return()=>window.clearTimeout(T)},[re,Q,he]),t.useEffect(()=>()=>{document.getElementById("global-sky-ocean-bg")?.setAttribute("data-audio-active","0"),window.dispatchEvent(new CustomEvent("skyocean-audio",{detail:{active:!1}}))},[]),t.useEffect(()=>{sessionStorage.setItem(le.stage,L),sessionStorage.setItem(le.activeButton,D??""),sessionStorage.setItem(le.searchOpen,String(_e)),sessionStorage.setItem(le.searchQuery,q)},[L,D,_e,q]),t.useEffect(()=>{!sessionStorage.getItem(le.splash)&&L==="intro"&&!o?Ne(!0):Je(!0),Ct(!0)},[o,L]);const gt=t.useCallback(()=>{sessionStorage.setItem(le.splash,"true"),sessionStorage.setItem("bookOpenedFromStartup","true"),sessionStorage.removeItem("revealDone"),document.documentElement.style.background="white",document.body.style.background="white";const c=document.getElementById("global-sky-ocean-bg");c&&(c.style.display="none"),Ne(!1),e(k?`/book/${encodeURIComponent(k.slug)}`:"/books")},[k,e]);t.useEffect(()=>{(ge||o)&&!we&&!Qe&&!Q&&Pe(!0)},[ge,o,Q,we,Qe]);const rt=t.useCallback(()=>{window.dispatchEvent(new Event("mousemove"));try{sessionStorage.setItem("revealDone","true")}catch{}Xe.current?(Xe.current.classList.add("fade-out"),setTimeout(()=>{Pe(!1),Ve(!0)},240)):(Pe(!1),Ve(!0))},[]),it=t.useCallback(c=>{Q||($e.current=c,Pe(!1),me(!0))},[Q]),tt=t.useCallback(()=>{const c=$e.current;if(!c)return;document.documentElement.style.background="white",document.body.style.background="white";const x=document.getElementById("global-sky-ocean-bg");x&&(x.style.display="none"),e(c)},[e]),ce=t.useCallback(()=>{ee(null),K(!1),de(""),H("main")},[]),Ue=t.useCallback(()=>{$(!1)},[]),p=t.useCallback(()=>{Re(!1),Ae&&ce(),$(c=>!c),window.dispatchEvent(new Event("mousemove"))},[Ae,ce]),_=t.useCallback(()=>{if(X){Re(!1);return}ce(),$(!1),Re(!0),window.dispatchEvent(new Event("mousemove"))},[X,ce]),S=t.useMemo(()=>V.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())),[V,q]),Se=t.useCallback(()=>{if(D&&D!=="search"&&!q){const c=B[D]||[],x=V.filter(T=>!c.some(G=>G.id===T.id));return[...c,...x]}if(D==="search"&&q){const c=S,x=V.filter(T=>!c.some(G=>G.id===T.id));return[...c,...x]}return V},[D,q,B,V,S])(),u=t.useCallback(c=>{D===c?ce():(ee(c),H("list"),K(!1),de(""))},[D,ce]),h=t.useCallback(c=>{const x=Oe.current?Oe.current.scrollTop:0;sessionStorage.setItem(le.listScroll,String(x));const T={activeButton:D,searchOpen:_e,searchQuery:q,stage:L,introVisible:ge,archiveOpen:Ae};try{sessionStorage.setItem(le.snapshot,JSON.stringify(T))}catch{}sessionStorage.setItem(le.returnFlag,"true"),it(c)},[D,Ae,it,ge,_e,q,L]),z=t.useCallback(()=>{ce(),Ue(),Re(!1),te(!1),C(!1),H("intro")},[Ue,ce]),Z=t.useCallback(()=>{De||Q||(te(!0),lt(!1),Ue(),Re(!1),Te.current=window.setTimeout(()=>{H("main"),te(!1)},1160))},[Ue,De,Q]),ne=t.useCallback(()=>{!l||Q||it(`/book/${encodeURIComponent(l.slug)}`)},[it,l,Q]),je=t.useCallback(()=>{D==="search"?ce():(K(!0),H("list"),ee("search"))},[D,ce]),fe=t.useCallback(()=>{ht(!1),pe.current&&clearTimeout(pe.current),pe.current=window.setTimeout(()=>{ht(!0)},5e3)},[]);t.useEffect(()=>{const c=["mousemove","mousedown","touchstart","touchmove","keydown"];return c.forEach(x=>{window.addEventListener(x,fe)}),fe(),()=>{c.forEach(x=>{window.removeEventListener(x,fe)}),pe.current&&clearTimeout(pe.current)}},[fe]),t.useEffect(()=>{if(!re||!(sessionStorage.getItem(le.returnFlag)==="true"))return;let x=null;try{const T=sessionStorage.getItem(le.snapshot);x=T?JSON.parse(T):null}catch{}if(x){ee(x.activeButton??null),K(!!x.searchOpen),de(x.searchQuery??""),x.archiveOpen||x.stage==="list"?$(!0):$(!1),x.stage&&H(x.stage),Je(!!x.introVisible),x.stage==="list"&&Fe(!0),sessionStorage.removeItem(le.returnFlag);return}Je(!0),H("main"),$(!0),window.setTimeout(()=>{H("list"),Fe(!0),sessionStorage.removeItem(le.returnFlag)},700)},[re]),t.useEffect(()=>{if(L!=="list"||!et)return;const c=Number(sessionStorage.getItem(le.listScroll)||"0"),x=window.setTimeout(()=>{Oe.current&&(Oe.current.scrollTop=Number.isNaN(c)?0:c),Fe(!1)},0);return()=>{window.clearTimeout(x)}},[L,et]);const Ee=t.useRef(null),Ie=t.useRef(null),Ce=t.useRef(!1),bt=t.useRef(!1),st=t.useRef(!1),Rt=t.useRef(null),an=t.useRef({x:0,y:0}),Tt=t.useRef({x:0,y:0}),Ft=60,xt=t.useCallback((c,x)=>{window.dispatchEvent(new CustomEvent("explore-joystick",{detail:{x:c,z:x}}))},[]),Ut=t.useCallback(()=>{window.dispatchEvent(new CustomEvent("explore-jump"))},[]),ot=t.useCallback(c=>{window.dispatchEvent(new CustomEvent("explore-vertical",{detail:{y:c}}))},[]),Bn=t.useCallback((c,x)=>{c.preventDefault(),c.stopPropagation(),c.currentTarget.setPointerCapture(c.pointerId),ot(x)},[ot]),Wt=t.useCallback(c=>{c.preventDefault(),c.stopPropagation(),c.currentTarget.hasPointerCapture(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId),ot(0)},[ot]);t.useEffect(()=>{M||(xt(0,0),ot(0))},[M,xt,ot]),t.useEffect(()=>{if(!M)return;const c=new Set,x=()=>{window.dispatchEvent(new CustomEvent("explore-sprint",{detail:{active:c.size>=2}}))},T=be=>{be.pointerType==="touch"&&(c.add(be.pointerId),x())},G=be=>{be.pointerType==="touch"&&(c.delete(be.pointerId),x())};return window.addEventListener("pointerdown",T,!0),window.addEventListener("pointerup",G,!0),window.addEventListener("pointercancel",G,!0),()=>{window.removeEventListener("pointerdown",T,!0),window.removeEventListener("pointerup",G,!0),window.removeEventListener("pointercancel",G,!0),window.dispatchEvent(new CustomEvent("explore-sprint",{detail:{active:!1}}))}},[M]),t.useEffect(()=>{if(!M)return;const c=T=>{T.code==="Space"&&(T.preventDefault(),T.stopPropagation(),T.stopImmediatePropagation(),document.activeElement instanceof HTMLElement&&document.activeElement.blur())},x=T=>{T.code==="Space"&&(c(T),T.repeat||Ut())};return window.addEventListener("keydown",x,!0),window.addEventListener("keyup",c,!0),()=>{window.removeEventListener("keydown",x,!0),window.removeEventListener("keyup",c,!0)}},[M,Ut]);const Lr=t.useCallback(c=>{if(!M||Rt.current!==null)return;Rt.current=c.pointerId,Ce.current=!0,c.currentTarget.setPointerCapture(c.pointerId);const x=c.currentTarget.getBoundingClientRect();Tt.current={x:x.left+x.width/2,y:x.top+x.height/2},an.current={x:c.clientX,y:c.clientY},st.current=!1,bt.current=Math.hypot(c.clientX-Tt.current.x,c.clientY-Tt.current.y)<=34},[M]),zr=t.useCallback(c=>{if(!Ce.current||Rt.current!==c.pointerId||!Ie.current)return;const x=c.clientX-Tt.current.x,T=c.clientY-Tt.current.y;Math.hypot(c.clientX-an.current.x,c.clientY-an.current.y)>8&&(st.current=!0);const G=Math.hypot(x,T),be=G>Ft?Ft:G,Fn=x/(G||1)*be,Un=T/(G||1)*be;Ie.current.style.transform=`translate(${Fn}px, ${Un}px)`;const Dr=Fn/Ft,$r=-Un/Ft;xt(Dr,$r)},[xt]),Dn=t.useCallback(c=>{!Ce.current||Rt.current!==c.pointerId||(Ce.current=!1,Rt.current=null,c.currentTarget.hasPointerCapture(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId),Ie.current&&(Ie.current.style.transform="translate(0px, 0px)"),xt(0,0),c.type!=="pointercancel"&&bt.current&&!st.current&&Ut(),bt.current=!1,st.current=!1)},[xt,Ut]),Br=t.useCallback(c=>!!(D&&D!=="search"&&B[D]?.some(x=>x.id===c.id)||D==="search"&&q&&S.some(x=>x.id===c.id)),[D,B,S,q]),cn=ge&&L==="intro"?Q||De?"is-leaving":we?se?"is-visible":"is-entering":"is-outside":"is-outside",$n=(L==="main"||L==="list")&&Q?"is-leaving":we?Ge?"is-visible":"is-entering":"is-outside",Yt=L==="main"||L==="list"?$n:"is-outside",ln=L==="list"?"-15vh":Ae||X?"-42px":"0px",vt=O.length+3,Vt=c=>({animate:{y:L==="main"||L==="list"?ln:"0px"},transition:{type:"spring",stiffness:270,damping:25,mass:.74,delay:c*.025}}),jt=(c,x=vt)=>{const T=c*.055,G=Math.max(0,x-1-c)*.035,be={scale:0,opacity:0,filter:"blur(8px)",y:ln};return{initial:be,animate:Q?{...be,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:G},opacity:{duration:.16,delay:G},filter:{duration:.2,delay:G},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:G}}}:{scale:1,opacity:1,filter:"blur(0px)",y:ln},exit:{...be,transition:{scale:{type:"spring",stiffness:460,damping:25,mass:.62,delay:G},opacity:{duration:.16,delay:G},filter:{duration:.2,delay:G},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:G}}},transition:{scale:{type:"spring",stiffness:430,damping:20,mass:.7,delay:T},opacity:{duration:.2,delay:T},filter:{duration:.25,delay:T},y:{type:"spring",stiffness:270,damping:25,mass:.74,delay:c*.025}}}};return re?r.jsxs(r.Fragment,{children:[r.jsx("style",{children:ro}),he?r.jsx(Ts,{onComplete:gt}):r.jsxs("div",{className:`index-route-shell fixed inset-0 overflow-hidden z-10 ${o?"is-returning-from-book":m?"is-entered":"is-entering"}`,children:[r.jsxs("div",{className:"fixed inset-0 z-[2] bg-alpha flex items-center justify-center overflow-hidden transition-all [transition-duration:4000ms] ease-in",style:{opacity:_t?0:1},children:[r.jsxs("div",{className:`absolute inset-x-0 flex flex-col items-center justify-center text-black ${ge&&L==="intro"?"":"pointer-events-none"} ${M?"opacity-0 pointer-events-none":"opacity-100"}`,children:[r.jsxs("p",{className:`index-intro-copy intro-elastic-item ${cn} text-[16px] md:text-[16px] text-left px-10 mb-4 cursor-pointer leading-wide tracking-wide break-keep`,onClick:z,children:["Studierzimmer-Ozean",r.jsx("br",{}),"studierzimmer.ch",r.jsx("br",{})]}),r.jsxs("div",{className:"flex items-center justify-center gap-2",children:[r.jsx("button",{onClick:ne,disabled:!se||De,className:`index-intro-control intro-elastic-item item-start ${cn} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:r.jsx("span",{className:"animate-bounce",children:"back"})}),l&&r.jsx("button",{type:"button",onClick:Z,disabled:!se||Q,className:`index-intro-control intro-elastic-item item-back ${cn} px-6 py-4 text-[16px] md:text-[16px] font-normal hover:scale-110 active:scale-110 transition-all`,children:"start"})]})]}),r.jsxs("div",{className:`absolute left-1/2 w-full max-w-md -translate-x-1/2 bg-alpha px-10 select-none md:max-w-2xl ${L==="intro"?"pointer-events-none":""}`,style:{top:"calc(50% - 24px)"},children:[r.jsxs("div",{className:"index-main-control-row flex min-h-12 items-center justify-center gap-5 text-[16px] font-normal md:gap-10 md:text-[16px]",children:[r.jsx(Le.div,{...Vt(0),children:r.jsx("div",{className:`main-control-item item-back ${Yt}`,children:r.jsx("button",{onClick:z,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${M?"pointer-events-none opacity-0":"opacity-100"}`,children:"back"})})}),r.jsx(Le.div,{...Vt(1),children:r.jsx("div",{className:`main-control-item item-archive ${Yt}`,children:r.jsx("button",{type:"button",onClick:p,"aria-expanded":Ae,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${Ae?"animate-bounce":""} ${M?"pointer-events-none opacity-0":"opacity-100"}`,children:"archive"})})}),r.jsx(Le.div,{...Vt(2),children:r.jsx("div",{className:`main-control-item item-about ${Yt}`,children:r.jsx("button",{type:"button",onClick:_,"aria-expanded":X,className:`px-2 py-[0.5px] select-none transition-all hover:scale-110 active:scale-110 ${X?"animate-bounce":""} ${M?"pointer-events-none opacity-0":"opacity-100"}`,children:"about"})})}),r.jsx(Le.div,{...Vt(3),children:r.jsx("div",{className:`main-control-item item-play ${Yt}`,children:r.jsxs("button",{onClick:c=>{c.currentTarget.blur(),ve(x=>!x)},title:M?"Exit Explore":"Explore",className:`select-none transition-all hover:scale-110 active:scale-110 bg-alpha border-none flex items-center text-[16px] justify-center gap-2 focus:outline-none focus:ring-0 ${M?"translate-x-[20px] text-[black]/40 hover:scale-[2.5] scale-[2] duration-700 ease-in":"bg-alpha hover:border-none active:border-none transition-all"}`,children:[r.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",className:`w-6 h-6 spin-slow select-none ${M?"opacity-100 scale-100":"opacity-0 scale-0 transition-all"}`,children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 3v3m0 12v3M3 12h3m12 0h3"})]}),r.jsx("span",{className:`whitespace-nowrap font-normal transition-all ${M?"max-w-0 opacity-0":"max-w-[100px] opacity-100"}`,children:"play"})]})})})]}),r.jsx(Wn,{initial:!1,mode:"wait",children:Ae?r.jsxs(Le.div,{initial:!1,className:`index-archive-panel mx-auto mt-10 pb-0 text-center font-normal leading-[2] transition-opacity duration-500 ${M?"pointer-events-none opacity-0":"opacity-100"}`,children:[r.jsx(Le.div,{...jt(0,vt),className:"index-archive-featured archive-elastic-item item-featured min-h-[32px] text-[16px] md:text-[16px]",children:k?r.jsxs("button",{type:"button",onClick:()=>h(`/book/${encodeURIComponent(k.slug)}`),className:"inline-flex max-w-full items-baseline gap-2 transition-transform hover:scale-105 active:scale-105",children:[r.jsx("span",{className:"shrink-0 text-black",children:"cover"})," ",r.jsx("br",{})," ",r.jsx("br",{}),r.jsx("br",{}),r.jsx("span",{className:"truncate",children:k.title})]}):N?r.jsx("span",{className:"text-black/50",children:"..."}):j?r.jsx("button",{type:"button",onClick:()=>void I(),className:"text-black/60 bounce",children:"RETRY BOOK LIST"}):r.jsx("span",{className:"text-black/50",children:"NO PUBLISHED BOOKS"})}),r.jsxs("div",{className:"index-archive-category-row flex flex-wrap items-center justify-center gap-2 uppercase md:gap-3",children:[r.jsx(Le.div,{...jt(1,vt),className:"archive-elastic-item item-search",children:r.jsx("button",{onClick:je,className:`index-archive-category-button z-10 flex items-center text-[16px] font-normal select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${D==="search"?"animate-bounce":"bg-alpha"}`,children:"search"})}),O.map((c,x)=>r.jsx(Le.div,{...jt(x+2,vt),className:`archive-elastic-item item-${c.slug}`,children:r.jsx("button",{onClick:()=>{u(c.slug)},className:`index-archive-category-button text-[16px] font-normal uppercase select-none transition-all hover:scale-110 active:scale-110 md:text-[16px] ${D===c.slug?"animate-bounce":"bg-alpha"}`,children:c.name})},c.id))]}),r.jsx(Le.div,{...jt(vt-1,vt),className:"index-archive-search-field archive-elastic-item item-search-field flex justify-center gap-2 py-2",children:r.jsx("div",{className:`overflow-hidden transition-all duration-300 ease-in-out ${_e?"w-full opacity-100 scale-100":"w-0 opacity-0 scale-0"}`,children:r.jsx("input",{type:"text",placeholder:"search...",value:q,onChange:c=>{de(c.target.value)},className:"index-archive-search-input w-full rounded-full border bg-black/0 px-4 py-1 text-[16px] text-black placeholder:text-black/60 backdrop-blur-[1px] select-none md:text-[16px]",autoComplete:"off",inputMode:"text",spellCheck:!1})})})]},"archive-controls"):X?r.jsx(Le.div,{initial:!1,className:`mx-auto mt-10 max-w-xl pb-0 text-center leading-[1.55] ${M?"pointer-events-none opacity-0":"opacity-100"}`,children:r.jsx(Le.div,{...jt(0,2),className:"index-about-panel archive-elastic-item px-2 text-[16px] font-normal md:text-[16px]",children:r.jsx("p",{children:io})})},"about-panel"):null})]}),r.jsx("div",{className:`index-list-panel ${L==="list"?"is-list-open":"is-list-closed"} absolute py-10 w-full select-none max-w-sm md:max-w-2xl px-10 bg-alpha transition-transform duration-700 text-[16px] font-normal md:text-[16px] ease-in-out ${L==="list"?"translate-y-[45vh]":"translate-y-[100vh]"} ${M?"opacity-0 pointer-events-none":"opacity-100"}`,style:{height:"75vh"},children:r.jsxs("div",{className:`index-elastic-item item-list ${$n}`,children:[r.jsxs("div",{className:"index-list-header grid grid-cols-2 backdrop-blur-[1px] text-black border-black/40 text-[16px] font-normal md:text-[16px]",children:[r.jsx("div",{className:"py-[0.5px]",children:"TAG"}),r.jsx("div",{className:"py-[0.5px]",children:"TITLE"})]}),!N&&!j&&V.length===0?r.jsx("div",{className:"py-5 text-center text-[14px] text-black/50",children:"Publish a book in the backend to make it appear here."}):r.jsx("div",{ref:Oe,className:"index-list-scroll overflow-y-auto no-scrollbar",style:{maxHeight:"calc(30vh - 2rem)"},children:r.jsx(Wn,{initial:!1,mode:"popLayout",children:Se.map((c,x)=>{const T=Br(c);return r.jsxs(Le.div,{initial:{scale:0,opacity:0,filter:"blur(7px)"},animate:{scale:1,opacity:1,filter:"blur(0px)"},exit:{scale:0,opacity:0,filter:"blur(7px)"},whileHover:{scale:.97},whileTap:{scale:.95},transition:{scale:{type:"spring",stiffness:430,damping:23,mass:.68,delay:x*.022},opacity:{duration:.18,delay:x*.022},filter:{duration:.22,delay:x*.022}},className:`index-list-row grid origin-center grid-cols-2 text-[16px] md:text-[16px] backdrop-blur-[1px] cursor-pointer ${T?"text-black":"text-gray-700"}`,onClick:()=>{h(c.link)},children:[r.jsx("div",{className:"py-[0.5px] tracking-normal",children:c.category}),r.jsxs("div",{className:"py-[0.5px] tracking-normal leading-tight",children:[c.name,c.isFeatured?" *":""]})]},`${D??"all"}:${c.id}`)})})})]})})]}),M&&r.jsxs(r.Fragment,{children:[r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move down (Q)",onPointerDown:c=>Bn(c,-1),onPointerUp:Wt,onPointerCancel:Wt,onLostPointerCapture:()=>ot(0),className:"fixed bottom-[42px] flex h-14 w-14 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border-0 bg-white/5 text-[15px] font-normal text-white/55 shadow-sm backdrop-blur-sm",style:{left:"calc(50% - 92px)",zIndex:20},children:"Q ↓"}),r.jsx("div",{ref:Ee,"data-ocean-control":!0,onPointerDown:Lr,onPointerMove:zr,onPointerUp:Dn,onPointerCancel:Dn,role:"button","aria-label":"Move player; tap the center to jump",tabIndex:-1,className:"fixed left-1/2 bottom-[20px] -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center",style:{touchAction:"none",zIndex:20},children:r.jsx("div",{ref:Ie,className:"pointer-events-none flex w-14 h-14 items-center justify-center rounded-full bg-white/10 shadow text-white/55 text-[18px]",style:{transform:"translate(0px, 0px)",transition:"transform 120ms ease-out"},children:r.jsx("span",{"aria-hidden":"true",children:"↑"})})}),r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":"Move up (E)",onPointerDown:c=>Bn(c,1),onPointerUp:Wt,onPointerCancel:Wt,onLostPointerCapture:()=>ot(0),className:"fixed bottom-[42px] flex h-14 w-14 -translate-x-1/2 touch-none select-none items-center justify-center rounded-full border-0 bg-white/5 text-[15px] font-normal text-white/55 shadow-sm backdrop-blur-sm",style:{left:"calc(50% + 92px)",zIndex:20},children:"E ↑"}),r.jsx("button",{type:"button",tabIndex:-1,"data-ocean-control":!0,"aria-label":Ye?"Close music":"Open music","aria-expanded":Ye,onClick:()=>{ye(c=>(Ht(!c),!c))},className:`fixed bottom-[107px] left-[calc(50%+61px)] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-0 bg-white/5 text-white/55 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-white/10 active:scale-95 ${Ye?"scale-110":""}`,style:{zIndex:22},children:r.jsxs("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",className:"h-5 w-5",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round",children:[r.jsx("path",{d:"M9 18V5l10-2v13"}),r.jsx("circle",{cx:"6",cy:"18",r:"3"}),r.jsx("circle",{cx:"16",cy:"16",r:"3"})]})})]}),(!we&&(Qe||o)||Q)&&r.jsx("div",{ref:Xe,className:"reveal-overlay","aria-hidden":"true",children:r.jsxs("svg",{className:"reveal-svg",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid slice",role:"presentation",children:[r.jsx("defs",{children:r.jsxs("mask",{id:"hole-mask",children:[r.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white"}),r.jsx("circle",{className:`mask-circle ${Q?"is-closing":"is-opening"}`,cx:"50",cy:"50",r:"10",fill:"black",onAnimationEnd:Q?tt:rt})]})}),r.jsx("rect",{x:"0",y:"0",width:"100",height:"100",fill:"white",mask:"url(#hole-mask)"})]})})]})]}):null},oo=`
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
`;function ao(e){return e==="navigation_click"||e==="book_open"||e==="book_page_view"||e==="model_open"||e==="model_interaction"||e==="archive_filter"||e==="outbound_click"}function co(e){return e==="navigation"||e==="book"||e==="book_page"||e==="model"||e==="archive"||e==="external"||e==="interface"}function lo(){const e=br(),[n,i]=t.useState(()=>En()),[s,o]=t.useState(n===null),[a,d]=t.useState(!1),l=t.useCallback(m=>{is(m),i(m),o(!1),d(!1)},[]);return t.useEffect(()=>{const m=f=>{const g=f.detail;i(g)};return window.addEventListener(wn,m),()=>window.removeEventListener(wn,m)},[]),t.useEffect(()=>{n==="analytics"&&zt({eventName:"page_view",path:e.pathname})},[n,e.pathname]),t.useEffect(()=>{const m=f=>{if(En()!=="analytics")return;const g=f.target instanceof Element?f.target.closest("[data-analytics-event]"):null;if(!g)return;const y=g.dataset.analyticsEvent,N=g.dataset.analyticsType,v=g.dataset.analyticsId;!ao(y)||!co(N)||!v||zt({eventName:y,targetType:N,targetId:v})};return document.addEventListener("click",m,!0),()=>document.removeEventListener("click",m,!0)},[]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:oo}),s?r.jsxs("aside",{className:"privacy-consent-panel fixed z-[400] p-5",role:"dialog","aria-modal":"false","aria-labelledby":"privacy-consent-title",children:[r.jsxs("div",{className:"flex items-start justify-between gap-5",children:[r.jsxs("div",{children:[r.jsx("h2",{id:"privacy-consent-title",className:"text-[15px] tracking-[0.06em]",children:"PRIVACY SETTINGS"}),r.jsx("p",{className:"mt-3 max-w-[66ch] text-[12px] leading-relaxed text-black/62",children:"Optional first-party analytics help understand visits, page views and named interface clicks. The analytics table stores a random session ID, page path, device category and referring host—never email, full URLs, free text or a persistent visitor profile."})]}),n!==null&&r.jsx("button",{type:"button",className:"border-0 bg-transparent px-1 text-[16px]",onClick:()=>o(!1),"aria-label":"Close privacy settings",children:"×"})]}),r.jsx("button",{type:"button",className:"mt-3 border-0 bg-transparent p-0 text-[11px] underline underline-offset-4",onClick:()=>d(m=>!m),"aria-expanded":a,children:a?"HIDE DETAILS":"COOKIE & ANALYTICS DETAILS"}),a&&r.jsxs("div",{className:"mt-3 grid gap-3 text-[11px] leading-relaxed text-black/58 sm:grid-cols-2",children:[r.jsx("p",{children:"NECESSARY: remembers this privacy choice locally for 180 days. It does not collect usage statistics."}),r.jsx("p",{children:"ANALYTICS: creates a new random ID for this browser session and sends only the limited first-party events described above."})]}),r.jsxs("div",{className:"mt-5 grid gap-2 sm:grid-cols-2",children:[r.jsx("button",{type:"button",className:`privacy-consent-action ${n==="necessary"?"is-selected":""}`,onClick:()=>l("necessary"),children:"NECESSARY ONLY"}),r.jsx("button",{type:"button",className:`privacy-consent-action ${n==="analytics"?"is-selected":""}`,onClick:()=>l("analytics"),children:"ALLOW ANALYTICS"})]})]}):null]})}const uo=t.lazy(()=>ct(()=>import("./AdminPortal-uSHI7Y8g.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),mo=t.lazy(()=>ct(()=>import("./Archive-DSEDniaA.js"),__vite__mapDeps([9,10,1,2,6,4,5,7]))),po=t.lazy(()=>ct(()=>import("./object01-BNZCARU0.js"),__vite__mapDeps([11,10,1,2]))),fo=t.lazy(()=>ct(()=>import("./Message-5V-v1WVu.js"),__vite__mapDeps([12,1,2,7,4,5,6]))),ho=t.lazy(()=>ct(()=>import("./NotFound-DU0B5EKs.js"),__vite__mapDeps([13,1,2]))),go=t.lazy(()=>ct(()=>import("./WatchStudio-B0a1tl8K.js"),__vite__mapDeps([8,1,2,4,5,3,7,6]))),bo=new Jr,or=()=>{const e=rn(),n=()=>{window.sessionStorage.setItem(Bt,"true"),window.sessionStorage.setItem(Dt,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.removeItem("returnFromExample"),e("/")};return r.jsx(uo,{onBack:()=>e("/"),onNavigate:n,onLibrary:()=>{const i=on();e(i?`/book/${encodeURIComponent(i.slug)}`:"/books")},onModels:()=>e("/3d")})},ar=()=>{const e=rn(),{slug:n}=ni();return r.jsx(Ss,{initialSlug:n??null,onBack:()=>e("/"),onLogin:()=>e("/login"),onThreeD:()=>e("/3d"),onBookChange:i=>{e(`/book/${encodeURIComponent(i)}`,{replace:!0})}})},xo=()=>{const e=rn();return r.jsx(go,{onNavigate:()=>e("/"),onLogin:()=>e("/login"),onBack:()=>{const n=on();e(n?`/book/${encodeURIComponent(n.slug)}`:"/books")}})},vo=()=>{const{pathname:e}=br(),n=e==="/";return r.jsxs("div",{className:`fixed inset-0 overflow-hidden ${n?"bg-transparent":"bg-white dark:bg-black"}`,children:[r.jsx(Ni,{}),r.jsx(Oi,{}),r.jsx(lo,{}),r.jsx(t.Suspense,{fallback:r.jsx("div",{className:"fixed inset-0 bg-white"}),children:r.jsxs(ti,{children:[r.jsx(Ke,{path:"/",element:r.jsx(so,{})}),r.jsx(Ke,{path:"/archive",element:r.jsx(mo,{})}),r.jsx(Ke,{path:"/message",element:r.jsx(fo,{})}),r.jsx(Ke,{path:"/object01",element:r.jsx(po,{})}),r.jsx(Ke,{path:"/login",element:r.jsx(or,{})}),r.jsx(Ke,{path:"/admin",element:r.jsx(or,{})}),r.jsx(Ke,{path:"/3d",element:r.jsx(xo,{})}),r.jsx(Ke,{path:"/books",element:r.jsx(ar,{})}),r.jsx(Ke,{path:"/book/:slug",element:r.jsx(ar,{})}),r.jsx(Ke,{path:"*",element:r.jsx(ho,{})})]})})]})},yo=()=>r.jsx(Qr,{client:bo,children:r.jsx(Es,{children:r.jsx(Li,{children:r.jsx(ei,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:r.jsx(vo,{})})})})}),cr=sessionStorage.getItem("redirect");cr&&(sessionStorage.removeItem("redirect"),window.history.replaceState(null,"",cr));gr.createRoot(document.getElementById("root")).render(r.jsx(yo,{}));export{ir as D,To as M,hs as S,jo as a,at as b,Do as c,Fo as d,Vi as e,Io as f,Mo as g,Po as h,Ao as i,No as j,Lo as k,Bo as l,Oo as m,fs as n,zo as o,Ii as p,J as s,$o as u};
