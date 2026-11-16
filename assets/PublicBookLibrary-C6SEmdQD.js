const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPortal-DRoWBMOl.js","assets/react-core-Dk0zBmTC.js","assets/index-CS4Olo8F.js","assets/supabase-BimAfFLu.js","assets/index-87WgDKHh.css","assets/AdminThreeDModelManager-D3wr5Es5.js","assets/threeDModelRepository-w1uvgobH.js","assets/AdminThreeDModelManager-BfX6C3rC.css","assets/characterRepository-QVefEd0S.js","assets/motion-B4JPENs2.js","assets/WatchStudio-C0W6E9BS.js","assets/react-three-BhdJjNB-.js","assets/three-BwCgyHvQ.js","assets/postprocessing-C_rM_Z8U.js","assets/SectionNavigation-rA3s-UXu.js","assets/SectionNavigation-C-Nz-iBs.css"])))=>i.map(i=>d[i]);
var Dr=Object.defineProperty;var Lr=(o,n,i)=>n in o?Dr(o,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[n]=i;var Ye=(o,n,i)=>Lr(o,typeof n!="symbol"?n+"":n,i);import{r as e,R as jn,j as c,d as pt,_ as yr}from"./react-core-Dk0zBmTC.js";import{h as Fr,i as $r,j as Xr,r as Vr,a as ln,t as Qn,k as un,w as Tt,n as Yr,B as er,o as tr,p as Wr}from"./index-CS4Olo8F.js";import{B as On,b as nr,s as rr,a as qr,r as Hr,l as or,c as Ur,u as Kr,d as Gr}from"./BookRichTextEditor-DtYiR_sw.js";import{p as Zr}from"./page-flip.browser-BUiqKeyc.js";import{u as kr,a as Lt,b as It,c as Je,m as _t}from"./motion-B4JPENs2.js";import{S as Jr}from"./SectionNavigation-rA3s-UXu.js";import"./supabase-BimAfFLu.js";const Qr=`{
  "name": "page-flip",
  "version": "2.0.7",
  "main": "dist/js/page-flip.browser.js",
  "browser": "dist/js/page-flip.browser.js",
  "author": "oleg.litovski9@gmail.com",
  "license": "MIT",
  "description": "Powerful, simple and flexible JS Library for creating realistic and beautiful page turning effect",
  "repository": {
    "type": "git",
    "url": "https://github.com/Nodlik/StPageFlip.git"
  },
  "publishConfig": {},
  "homepage": "https://nodlik.github.io/StPageFlip/",
  "dependencies": {},
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^2.33.0",
    "@typescript-eslint/parser": "^2.33.0",
    "css-loader": "^3.5.3",
    "eslint": "^7.0.0",
    "eslint-plugin-typescript": "^0.14.0",
    "prettier": "^2.0.5",
    "rollup-plugin-postcss": "^3.1.1",
    "rollup-plugin-terser": "^6.1.0",
    "rollup-plugin-typescript2": "^0.27.1",
    "style-loader": "^1.2.1",
    "ts-loader": "^7.0.4",
    "typedoc": "^0.17.8",
    "typescript": "latest",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11"
  },
  "scripts": {
    "eslint": "eslint . --ext .ts",
    "build-global": "npx webpack",
    "build": "rollup -c"
  },
  "keywords": [
    "typescript",
    "page",
    "flip",
    "canvas",
    "book",
    "reader",
    "fold",
    "frontend",
    "javascript"
  ]
}
`;function eo(o){let n=null,i=!1,s=!1;const d=()=>{i||s||n!==null||!o.connected()||(n=o.request(m=>{n=null,!(i||s||!o.connected())&&(o.draw(m),o.busy()&&d())}))};return{wake:d,pause(m){s=m,s&&n!==null&&(o.cancel(n),n=null),s||d()},dispose(){i=!0,n!==null&&o.cancel(n),n=null}}}const ir="2.0.7";function to(o,n,i,s,d=Zr.PageFlip){const m=JSON.parse(Qr).version;if(m!==ir)throw new Error(`Book engine ${m} needs a lifecycle compatibility review (expected ${ir}).`);const p=new d(o,n);let M=!1,S=null,T=null,C=null,y=!1,v=null,j=null;Object.defineProperty(p,"render",{configurable:!0,get:()=>S,set:E=>{if(!E||typeof E.render!="function"||typeof E.startAnimation!="function"||typeof E.update!="function"||typeof E.timer!="number"||!("animation"in E))throw new Error("Unsupported PageFlip renderer lifecycle; refusing an unmanaged animation loop.");S=E;const R=E.render.bind(E),X=E.startAnimation.bind(E);let Z=0;T=eo({request:Y=>window.requestAnimationFrame(Y),cancel:Y=>window.cancelAnimationFrame(Y),connected:()=>o.isConnected,busy:()=>E.animation!==null||p.getState()!=="read",draw:Y=>{const ne=Math.max(Y,Z,E.animation?.startedAt??0);if(Z=ne,R(ne),p.getState()==="read"&&(j?.(),v)){const U=v;v=null,p.updateFromHtml(U)}}}),E.start=()=>{E.update(),T?.wake()},E.startAnimation=(...Y)=>{E.timer=performance.now(),X(...Y),T?.wake()}}});const B=["flip","changeOrientation","changeState","init","update"];B.forEach(E=>p.on(E,R=>{M||(T?.wake(),s(E,R))}));const D=()=>{document.hidden?(C=performance.now(),T?.pause(!0)):(C!==null&&S?.animation&&(S.animation.startedAt+=performance.now()-C),C=null,T?.pause(!1))},ee=()=>{if(M)return;M=!0,T?.dispose(),document.removeEventListener("visibilitychange",D),B.forEach(R=>p.off(R));const E=p.getUI();E?.removeHandlers?.(),E?.clear(),E?.destroy()};try{p.loadFromHTML(i);const E=p.getUI(),R=E.update.bind(E);E.update=()=>{if(!M){if(p.getState()!=="read"){y=!0;return}y=!1,R(),T?.wake()}},j=()=>{y&&E.update()},document.addEventListener("visibilitychange",D),document.hidden&&D()}catch(E){throw ee(),E}return{engine:p,dispose:ee,wake:()=>T?.wake(),update:E=>{M||(p.getState()!=="read"?v=E:p.updateFromHtml(E),T?.wake())}}}const no={flip:"onFlip",changeOrientation:"onChangeOrientation",changeState:"onChangeState",init:"onInit",update:"onUpdate"},ro=e.memo(e.forwardRef(function(n,i){const s=e.useRef(null),d=e.useRef([]),m=e.useRef(),p=e.useRef(n);p.current=n;const M=e.useRef(n.children),S=e.useMemo(()=>jn.Children.map(n.children,(T,C)=>jn.isValidElement(T)?jn.cloneElement(T,{ref:y=>{d.current[C]=y}}):T),[n.children]);return e.useImperativeHandle(i,()=>({pageFlip:()=>m.current?.engine}),[]),e.useLayoutEffect(()=>{const{children:T,className:C,style:y,...v}=p.current;return m.current=to(s.current,v,d.current.filter(Boolean),(j,B)=>{const D=p.current[no[j]];D?.(B)}),()=>{m.current?.dispose(),m.current=void 0}},[]),e.useLayoutEffect(()=>{M.current!==n.children&&(M.current=n.children,m.current?.update(d.current.filter(Boolean)))},[n.children]),c.jsx("div",{ref:s,className:n.className,style:n.style,children:S})})),Er=e.createContext(null);class oo{constructor(n,i=()=>new Image){Ye(this,"listeners",new Set);Ye(this,"activated",new Set);Ye(this,"waiters",new Map);Ye(this,"entries",new Map);Ye(this,"queue",[]);Ye(this,"desired",new Set);Ye(this,"busy",!1);Ye(this,"disposed",!1);Ye(this,"spreads");Ye(this,"subscribe",n=>(this.listeners.add(n),()=>{this.listeners.delete(n)}));Ye(this,"isActive",n=>this.activated.has(n));this.urls=n,this.makeImage=i,this.spreads=n.length?[[0]]:[];for(let s=1;s<n.length;s+=2)this.spreads.push([s,s+1].filter(d=>d<n.length))}start(n){this.disposed=!1,this.setPage(n)}spreadIndex(n){return Math.max(0,this.spreads.findIndex(i=>i.includes(n)))}pagesAt(n){return this.spreads[this.spreadIndex(n)]??[]}setPage(n){if(this.disposed)return;const i=this.spreadIndex(n),s=[i,i+1,i-1].filter(d=>d>=0&&d<this.spreads.length);this.desired=new Set(s.flatMap(d=>this.spreads[d].map(m=>this.urls[m]))),this.queue=[],s.forEach((d,m)=>this.spreads[d].forEach(p=>this.enqueue(this.urls[p],m))),this.entries.forEach((d,m)=>{this.desired.has(m)?d.loaded&&d.priority===0&&this.decode(m):this.cancelEntry(m)}),this.pump()}setBusy(n){this.busy=n,n||this.entries.forEach((i,s)=>{i.loaded&&this.decode(s)})}isReadyForPage(n){return this.pagesAt(n).every(i=>this.activated.has(this.urls[i]))}preparePage(n){if(this.disposed)return Promise.resolve(!1);this.pagesAt(n).forEach(s=>{this.desired.add(this.urls[s]),this.enqueue(this.urls[s],0)}),this.pump();const i=this.pagesAt(n).map(s=>this.urls[s]);return i.every(s=>this.activated.has(s))?Promise.resolve(!0):new Promise(s=>{let d=!1,m=null;const p=new Set,M=[],S=T=>{d||(d=!0,m!==null&&window.clearTimeout(m),M.forEach(({url:C,callback:y})=>{const v=this.waiters.get(C);v?.delete(y),v?.size||this.waiters.delete(C)}),s(T))};i.forEach(T=>{if(this.activated.has(T)){p.add(T);return}const C=()=>{p.add(T),p.size===i.length&&S(i.every(v=>this.activated.has(v)))},y=this.waiters.get(T)??new Set;y.add(C),this.waiters.set(T,y),M.push({url:T,callback:C})}),m=window.setTimeout(()=>S(!1),12e3)})}enqueue(n,i){if(!n||this.activated.has(n))return;const s=this.entries.get(n);if(s){s.priority=i,s.loaded&&i===0&&this.decode(n);return}const d=this.queue.find(m=>m.url===n);d?d.priority=Math.min(d.priority,i):this.queue.push({url:n,priority:i})}pump(){if(!this.disposed)for(this.queue.sort((n,i)=>n.priority-i.priority);this.entries.size<2&&this.queue.length;){const n=this.queue.shift();if(!this.desired.has(n.url)||this.activated.has(n.url))continue;const i=this.makeImage();let s=()=>{};const d=new Promise(p=>{s=p}),m={image:i,promise:d,resolve:s,priority:n.priority,loaded:!1,decoding:!1,idle:null,idleNative:!1};this.entries.set(n.url,m),i.decoding="async",i.onload=()=>{m.loaded=!0,this.decode(n.url)},i.onerror=()=>this.fail(n.url),i.src=n.url}}decode(n){const i=this.entries.get(n);if(!i||i.decoding||!i.loaded||this.disposed||i.priority>0&&this.busy)return;i.idle!==null&&(i.idleNative?window.cancelIdleCallback(i.idle):window.clearTimeout(i.idle),i.idle=null);const s=()=>{if(i.idle=null,this.disposed||this.entries.get(n)!==i||i.priority>0&&this.busy)return;i.decoding=!0,(typeof i.image.decode=="function"?i.image.decode():Promise.resolve()).then(()=>{this.entries.get(n)===i&&this.finish(n)}).catch(()=>{this.entries.get(n)===i&&this.fail(n)})};i.priority===0?s():typeof window.requestIdleCallback=="function"?(i.idleNative=!0,i.idle=window.requestIdleCallback(s,{timeout:800})):(i.idleNative=!1,i.idle=window.setTimeout(s,50))}clear(n){const i=this.entries.get(n);if(i)return i.idle!==null&&(i.idleNative?window.cancelIdleCallback(i.idle):window.clearTimeout(i.idle)),i.image.onload=null,i.image.onerror=null,this.entries.delete(n),i.resolve(),i}finish(n){this.entries.has(n)&&(this.clear(n),this.activated.add(n),this.waiters.get(n)?.forEach(i=>i()),this.waiters.delete(n),this.listeners.forEach(i=>i()),this.pump())}fail(n){this.cancelEntry(n),this.pump()}cancelEntry(n){const i=this.clear(n);i&&(i.image.src=""),this.waiters.get(n)?.forEach(s=>s()),this.waiters.delete(n)}dispose(){this.disposed=!0,[...this.entries.keys()].forEach(n=>this.cancelEntry(n)),this.queue=[],this.waiters.forEach(n=>n.forEach(i=>i())),this.waiters.clear(),this.listeners.clear()}}const ar=Intl.Segmenter,sr=ar?new ar(void 0,{granularity:"grapheme"}):null;function io(o){return sr?[...sr.segment(o)].map(n=>n.segment):[o]}function cr(o){if(!o)return[];const n=document.createTreeWalker(o,NodeFilter.SHOW_TEXT),i=[];let s;for(;s=n.nextNode();)i.push(s);return i}function dn(o,n,i){const s=document.createRange();return s.setStart(o,n),s.setEnd(o,i),s}function ao(o,n,i,s){const d=[],m=new Map,p=S=>{const T=[S.fontFamily,S.fontWeight,S.fontStyle,S.fontSize,S.letterSpacing].join("|");if(m.has(T))return m.get(T);const C=document.createElement("span");Object.assign(C.style,{position:"fixed",left:"-20000px",top:"0",visibility:"hidden",display:"block",whiteSpace:"pre",fontFamily:S.fontFamily,fontWeight:S.fontWeight,fontStyle:S.fontStyle,fontSize:S.fontSize,letterSpacing:S.letterSpacing,lineHeight:"1"}),C.textContent="Mg",document.body.appendChild(C);const y=document.createRange();y.selectNodeContents(C);const v=y.getBoundingClientRect().top-C.getBoundingClientRect().top;return C.remove(),m.set(T,v),v};return[[o.querySelector("h2, h3"),n.querySelector("h2, h3")],[o.querySelector(".book-rich-text"),n.querySelector(".book-rich-text")]].forEach(([S,T],C)=>{const y=cr(S),v=cr(T);y.forEach((j,B)=>{const D=v[B];if(!D||j.data!==D.data||!j.parentElement)return;const ee=getComputedStyle(D.parentElement),E=p(ee);for(const R of j.data.matchAll(/\S+/gu)){const X=R.index,Z=X+R[0].length,Y=dn(j,X,Z),ne=dn(D,X,Z),U=io(R[0]),we=U.length<=3||Y.getClientRects().length>1||ne.getClientRects().length>1?U:[R[0]];let A=X;we.forEach(Q=>{const z=dn(j,A,A+Q.length).getBoundingClientRect(),ie=dn(D,A,A+Q.length).getBoundingClientRect();z.width&&ie.width&&d.push({key:`${C}:${B}:${A}`,text:Q,fromX:z.left-i.left,fromY:z.top-i.top-E,toX:ie.left-s.left,toY:ie.top-s.top-E,fontFamily:ee.fontFamily,fontWeight:ee.fontWeight,fontStyle:ee.fontStyle,fontSize:parseFloat(ee.fontSize),letterSpacing:ee.letterSpacing}),A+=Q.length})}})}),d}const lr={type:"spring",stiffness:190,damping:26,mass:.95,restDelta:1e-5,restSpeed:1e-4},ur=()=>({width:window.innerWidth,height:window.innerHeight}),so=(o,n,i)=>Math.min(i,Math.max(n,o));function co(o){const n=/^#[0-9a-f]{6}$/i.test(o.background_color??"")?o.background_color:"#DDE2E5",i=so(o.background_opacity??.75,.15,1),s=parseInt(n.slice(1,3),16),d=parseInt(n.slice(3,5),16),m=parseInt(n.slice(5,7),16);return{balloon:`rgba(${s}, ${d}, ${m}, ${i})`,reader:`rgb(${s}, ${d}, ${m})`}}function lo({comment:o,origin:n,onClose:i}){const s=kr(),[d,m]=e.useState(ur),[p,M]=e.useState(!1),[S,T]=e.useState(!1),[C,y]=e.useState([]),v=e.useRef(null),j=e.useRef(null),B=e.useRef(null),D=e.useRef(null),ee=e.useRef(!1),E=Lt(0),R=e.useRef(null),X=e.useRef({top:0,right:0,bottom:0,left:0}),Z=e.useRef(!1),Y=e.useRef(!1),ne=e.useRef(i);ne.current=i;const U=e.useRef(null),Ae=co(o),we=o.title?.trim(),A=o.font_size,Q=typeof A=="number"&&Number.isFinite(A)&&A>0?A:14,z=e.useMemo(()=>({left:n.left,top:n.top,width:Math.max(1,n.width),height:Math.max(1,n.height)}),[n.left,n.top,n.width,n.height]),ie=It(E,[0,1],[z.left,0],{clamp:!1}),re=It(E,[0,1],[z.top,0],{clamp:!1}),V=It(E,[0,1],[z.width,d.width],{clamp:!1}),W=It(E,[0,1],[z.height,d.height],{clamp:!1}),be=It(E,[0,1],[Ae.balloon,Ae.reader]),ce=e.useCallback(()=>{const h=n.content?.isConnected?n.content:D.current;if(!h||!B.current||!v.current)return;const N=v.current.getBoundingClientRect();y(ao(h,B.current,z,N));const P=h.getBoundingClientRect();X.current={top:Math.max(0,P.top-z.top),left:Math.max(0,P.left-z.left),right:Math.max(0,z.left+z.width-P.right),bottom:Math.max(0,z.top+z.height-P.bottom)}},[n.content,z]),le=e.useCallback(()=>{Z.current||(E.get()>=.999&&ce(),Z.current=!0,T(!1),M(!0))},[ce,E]);e.useLayoutEffect(()=>{ce(),ee.current=!0},[ce,d.width,d.height]),e.useEffect(()=>{if(!ee.current)return;R.current?.stop(),R.current=Je(E,p?0:1,s?{duration:0}:lr);const h=R.current;return h.then(()=>{R.current===h&&(Z.current?Y.current||(Y.current=!0,ne.current()):T(!0))}),()=>{h.stop(),R.current===h&&(R.current=null)}},[p,E,s]),e.useEffect(()=>{S&&j.current?.focus({preventScroll:!0})},[S]),e.useEffect(()=>{const h=document.activeElement instanceof HTMLElement?document.activeElement:null;v.current?.focus({preventScroll:!0});const N=()=>m(ur()),P=K=>{if(K.key==="Escape"){K.preventDefault(),K.stopPropagation(),le();return}if(K.key!=="Tab"||!v.current)return;const ue=[...v.current.querySelectorAll('button:not([disabled]), [tabindex="0"]')].filter(F=>getComputedStyle(F).visibility!=="hidden"&&F.getBoundingClientRect().width>0&&F.getBoundingClientRect().height>0),l=ue[0],b=ue[ue.length-1];if(!l||!b){K.preventDefault(),v.current.focus({preventScroll:!0});return}K.shiftKey&&(document.activeElement===l||!v.current.contains(document.activeElement))?(K.preventDefault(),b.focus({preventScroll:!0})):!K.shiftKey&&(document.activeElement===b||!v.current.contains(document.activeElement))&&(K.preventDefault(),l.focus({preventScroll:!0}))};return window.addEventListener("resize",N),window.visualViewport?.addEventListener("resize",N),document.addEventListener("keydown",P,!0),()=>{window.removeEventListener("resize",N),window.visualViewport?.removeEventListener("resize",N),document.removeEventListener("keydown",P,!0),h?.isConnected&&h.focus({preventScroll:!0})}},[le]);const Ce=h=>{const N=U.current;N&&N.id===h.pointerId&&Math.hypot(h.clientX-N.x,h.clientY-N.y)>7&&(N.moved=!0)};return pt.createPortal(c.jsxs("div",{className:"book-comment-focus-overlay","data-book-comment-ui":"true",onPointerDown:h=>h.stopPropagation(),onPointerMove:h=>{Ce(h),h.stopPropagation()},onPointerUp:h=>h.stopPropagation(),onPointerCancel:h=>{U.current&&(U.current.moved=!0),h.stopPropagation()},onClick:h=>h.stopPropagation(),onDoubleClick:h=>h.stopPropagation(),onWheel:h=>h.stopPropagation(),onTouchMove:h=>h.stopPropagation(),children:[c.jsxs(_t.section,{ref:v,className:"book-comment-focus-panel",role:"dialog",tabIndex:-1,"aria-modal":"true","aria-label":"Lettura commento","aria-busy":!S,"data-text-morph":S?"reading":p?"closing":"opening",style:{left:ie,top:re,width:V,height:W,backgroundColor:be,color:o.text_color||"#414A51",fontSize:Q,"--comment-morph-progress":E},children:[c.jsx("div",{ref:j,className:"book-comment-focus-scroll",role:"document",tabIndex:0,"aria-label":"Testo completo del commento",style:{width:d.width,height:d.height,visibility:S?"visible":"hidden"},onScroll:()=>{U.current&&(U.current.moved=!0)},children:c.jsxs("div",{ref:B,className:"book-comment-focus-body",onPointerDown:h=>{U.current={id:h.pointerId,x:h.clientX,y:h.clientY,scrollTop:j.current?.scrollTop??0,moved:!1}},onClick:h=>{h.stopPropagation();const N=U.current;U.current=null,(!N||!N.moved&&Math.abs((j.current?.scrollTop??0)-N.scrollTop)<1)&&le()},children:[we&&c.jsx("h2",{className:"book-comment-focus-title",children:we}),c.jsx(On,{className:"book-comment-focus-text",body:o.body,value:o.rich_content})]})}),c.jsx("div",{className:"book-comment-text-morph","aria-hidden":"true",style:{visibility:S?"hidden":"visible",clipPath:`inset(calc(${X.current.top}px * (1 - var(--comment-morph-progress))) calc(${X.current.right}px * (1 - var(--comment-morph-progress))) calc(${X.current.bottom}px * (1 - var(--comment-morph-progress))) calc(${X.current.left}px * (1 - var(--comment-morph-progress))))`},children:C.map(h=>c.jsx("span",{"data-morph-key":h.key,className:"book-comment-morph-word",style:{fontFamily:h.fontFamily,fontSize:h.fontSize,fontWeight:h.fontWeight,fontStyle:h.fontStyle,letterSpacing:h.letterSpacing,transform:`translate3d(calc(${h.fromX}px + ${h.toX-h.fromX}px * var(--comment-morph-progress)), calc(${h.fromY}px + ${h.toY-h.fromY}px * var(--comment-morph-progress)), 0)`},children:h.text},h.key))}),c.jsx(_t.button,{initial:{scale:0},animate:{scale:p?0:1},transition:s?{duration:0}:{...lr,delay:p?0:.3},type:"button",className:"book-comment-focus-return",onClick:le,children:"torna al foglio"})]}),c.jsxs("div",{ref:D,className:"book-comment-morph-source","aria-hidden":"true",style:{left:z.left,top:z.top,width:z.width,fontSize:Q,color:o.text_color||"#414A51"},children:[we&&c.jsx("h3",{children:we}),c.jsx(On,{body:o.body,value:o.rich_content})]})]}),document.body)}const Sr="studierzimmer:book-page-view",zn="studierzimmer:book-view-mode";let Ht;const bn=(o,n)=>Math.min(Math.max(0,Math.floor(o)),Math.max(0,n-1));function it(o){return o<=0?0:o%2===0?o-1:o}function In(o,n){if(n<=0)return[];const i=it(bn(o,n));return i===0?[0]:[i,i+1].filter(s=>s<n)}function ft(o,n){return n===1?0:o===0||o!==it(o)?1:0}function Dt(o,n,i,s){const d=bn(o,i),m=it(d),p=bn(s==="single"?d+(n?1:-1):n?m===0?1:m+2:m<=2?0:m-2,i),M=it(p);return{leaf:p,spread:M,action:p===d?"none":M===m?"view":M>m?"next":"previous"}}function uo(o,n){return Math.max(.01,Math.min(n.width/Math.max(1,o.width),n.height/Math.max(1,o.height)))}function fo(o,n,i,s,d){const m=it(o),p=Dt(o,s,n,"double").spread,M=s?p:p===0?0:Math.min(n-1,p+1),S=-ft(o,n)*i,T=-ft(M,n)*i;return p===m?S:S+(T-S)*Math.min(1,Math.max(0,d/100))}function po(o,n,i,s){const d=Math.min(Math.max(o+i/Math.max(.01,s),Math.min(o,n)),Math.max(o,n));return{value:d,progress:o===n?0:Math.max(0,(d-o)/(n-o))}}function mo(o,n,i){return o>=.25||o>.04&&n*Math.sign(i)>=.32}function ho(o){if(!o.getMousePos||!o.getDistElement)return()=>{};const n=o.getMousePos,i=(s,d)=>{const m=o.getDistElement(),p=m.getBoundingClientRect(),M=p.width/Math.max(1,m.offsetWidth),S=p.height/Math.max(1,m.offsetHeight);return{x:(s-p.left)/(M||1),y:(d-p.top)/(S||1)}};return o.getMousePos=i,()=>{o.getMousePos===i&&(o.getMousePos=n)}}function bo(o,n){if(!o.userStop)return()=>{};const i=o.userStop,s=(d,m=!1)=>i.call(o,d,m||n()&&o.getState?.()==="read");return o.userStop=s,()=>{o.userStop===s&&(o.userStop=i)}}function dr(){try{if(typeof window<"u"){const o=window.localStorage.getItem(Sr);(o==="single"||o==="double")&&(Ht=o)}}catch{}return Ht||(Ht=typeof window<"u"&&window.innerWidth<=767?"single":"double"),Ht}function go(o){Ht=o;try{window.localStorage.setItem(Sr,o)}catch{}window.dispatchEvent(new CustomEvent(zn,{detail:o}))}const wo={a4_long_edge:{width:480,height:679,minWidth:90,maxWidth:600,minHeight:127,maxHeight:849},a4_short_edge:{width:679,height:480,minWidth:110,maxWidth:680,minHeight:78,maxHeight:481},square:{width:560,height:560,minWidth:96,maxWidth:620,minHeight:96,maxHeight:620}},fr=8,xo=8,pr=360,vo=42,yo=1,ko=5,Eo=["☺︎","♥","★","🌊"],So=1e3,fn="#DDE2E5",pn="#414A51",gn=.75;function ze(o,n,i){return Math.min(i,Math.max(n,o))}function Ro(o,n=gn){return`${o}${Math.round(ze(n,.15,1)*255).toString(16).padStart(2,"0")}`}function mr(o,n,i){const s=Math.max(2,n-fr*2),d=Math.max(1,i-fr*2),m=o.width/o.height,p=s/2/m,M=Math.max(1,Math.min(d,p,o.maxHeight)),S=Math.max(1,Math.min(M*m,o.maxWidth));return{width:Math.floor(S),height:Math.floor(S/m)}}const Co=e.forwardRef(function({page:n,isCover:i,commentMode:s,canManageComments:d,onImageReady:m,onPlaceComment:p},M){const S=e.useContext(Er),T=e.useSyncExternalStore(S?.subscribe??(()=>()=>{}),()=>S?.isActive(n.public_url)??!0,()=>!1),C=y=>{if(!s||!d||y.target instanceof Element&&y.target.closest("[data-book-comment-ui]"))return;y.preventDefault(),y.stopPropagation();const v=y.currentTarget.getBoundingClientRect();p(n.id,ze((y.clientX-v.left)/Math.max(1,v.width),0,1),ze((y.clientY-v.top)/Math.max(1,v.height),0,1))};return c.jsx("div",{ref:M,"data-book-page-id":n.id,"data-density":i?"hard":"soft",className:"h-full w-full overflow-visible bg-white shadow-[inset_0_0_18px_rgba(0,0,0,0.08)]",children:c.jsx("div",{"data-book-page-face":"true",onPointerDown:C,className:`relative h-full w-full overflow-visible ${s?"cursor-crosshair":""}`,style:{backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"translateZ(0.01px)",WebkitTransform:"translateZ(0.01px)"},children:c.jsx("img",{src:T?n.public_url:void 0,alt:`Page ${n.page_number}: ${n.file_name}`,draggable:!1,decoding:"async",onLoad:m,onError:m,className:"pointer-events-none h-full w-full select-none object-cover object-center",style:{backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"translateZ(0)",WebkitTransform:"translateZ(0)"}})})})});function Po({book:o,pages:n,comments:i=[],commentMode:s=!1,canManageComments:d=!1,initialPage:m=0,bookMotionClassName:p="is-visible",autoOpenOnActivate:M=!1,controlsActive:S=!0,onPageChange:T,onReady:C,onCreateComment:y,onUpdateComment:v,onDeleteComment:j}){const B=e.useRef(null),D=e.useRef(null),ee=e.useRef(null),E=e.useRef(o.id),R=e.useRef(Math.min(Math.max(0,Math.floor(m)),Math.max(0,n.length-1))),X=e.useRef(null),Z=e.useRef(null),Y=e.useRef(null),ne=e.useRef(null),U=e.useRef(null),Ae=e.useRef(!1),we=e.useRef(!1),A=e.useRef(!1),Q=e.useRef(!1),z=e.useRef(!1),ie=e.useRef(null),re=e.useRef(null),V=e.useRef(!1),W=e.useRef(null),be=e.useRef({time:0,x:0,y:0,pointerType:""}),ce=e.useRef(null),le=e.useRef(0),Ce=e.useRef(null),h=e.useRef([]),N=e.useRef({width:1,height:1}),P=e.useRef(null),K=e.useRef(null),ue=e.useRef(null),l=e.useRef(new Map),b=e.useRef(null),F=e.useRef(null),de=e.useRef(null),ae=e.useRef(i);ae.current=i;const me=o.page_format??"a4_long_edge",q=wo[me],G=e.useMemo(()=>new oo(n.map(t=>t.public_url)),[n]),ye=Math.min(Math.max(0,Math.floor(m)),Math.max(0,n.length-1)),at=e.useRef(ye),[ke,De]=e.useState(dr),[xe,Ut]=e.useState(()=>typeof document>"u"||document.querySelector('[data-portfolio-navigation][data-section="sketches"]')?.dataset.navigationVisible!=="false"),Qe=e.useRef(ke);Qe.current=ke;const et=e.useRef(!1),yt=e.useRef(!1),mt=e.useRef(!1),Nt=e.useRef(new Set),$=e.useRef(new Set([ye-1,ye,ye+1].filter(t=>t>=0&&t<n.length)));E.current!==o.id&&(E.current=o.id,at.current=ye,R.current=ye);const[H,fe]=e.useState(ye);e.useEffect(()=>(G.start(R.current),()=>G.dispose()),[G]),e.useEffect(()=>{G.setPage(H)},[G,H]);const[ht,st]=e.useState(0),[oe,ct]=e.useState(!1),[kt,Le]=e.useState(!1),[Et,St]=e.useState(!1),[L,Fe]=e.useState(null),[tt,Ne]=e.useState(""),[Be,Ft]=e.useState(""),[bt,We]=e.useState(()=>nr("")),[qe,je]=e.useState(fn),[gt,Rt]=e.useState(pn),[wt,Bt]=e.useState(gn),[I,lt]=e.useState(14),[Ct,Kt]=e.useState(null),[he,xt]=e.useState(null);b.current=he?.id??null;const[nt,Pt]=e.useState(!1),Ie=e.useRef(nt);Ie.current=nt;const[He,vn]=e.useState([]),[Gt,Zt]=e.useState(24),[$t,Jt]=e.useState(null),[yn,Qt]=e.useState(null),[Xt,kn]=e.useState(null);K.current=L;const[Ee,ut]=e.useState(!1),[Ot,Se]=e.useState(null),[Mt,zt]=e.useState(!1),[vt,a]=e.useState(!1),[f,g]=e.useState(()=>mr(q,640,480)),[k,O]=e.useState({width:640,height:480}),J=ke==="single"?uo(f,k):1,Pe=e.useRef(J);Pe.current=J;const se=Lt(1),pe=Lt(0),ge=Lt(0),Te=Lt(ke==="single"?-ft(ye,n.length)*f.width:0),Vt=e.useRef(null),en=e.useCallback(t=>{if(Qe.current!=="single"||Y.current!==null||document.hidden)return;ne.current?.stop();const r=()=>{if(Y.current=null,Qe.current!=="single"||B.current?.pageFlip()!==t||document.hidden)return;if(t.getState?.()==="read"){Z.current=null,Te.set(-ft(R.current,n.length)*f.width);return}const u=t.getFlipController?.().getCalculation();if(!u&&!W.current){Z.current=null,Te.set(-ft(R.current,n.length)*f.width);return}if(u){const w=u.getDirection()===0;if(Z.current===null){const x=Dt(R.current,w,n.length,"double").spread;Z.current=w||x===0?x:Math.min(n.length-1,x+1)}Te.set(fo(R.current,n.length,f.width,w,u.getFlippingProgress()))}Y.current=window.requestAnimationFrame(r)};Y.current=window.requestAnimationFrame(r)},[Te,f.width,n.length]);e.useLayoutEffect(()=>{if(ke==="single"&&z.current)return;const t=ke==="single"?-ft(H,n.length)*f.width:ht,r=`${o.id}:${f.width}:${f.height}:${oe}`;ne.current?.stop(),Vt.current!==r?Te.set(t):ne.current=Je(Te,t,{duration:.48,ease:[.22,.88,.3,1]}),Vt.current=r},[o.id,Te,H,ht,oe,f,n.length,ke]),e.useEffect(()=>{const t=()=>{const r=B.current?.pageFlip();!document.hidden&&r&&r.getState()!=="read"&&en(r)};return document.addEventListener("visibilitychange",t),()=>{document.removeEventListener("visibilitychange",t),Y.current!==null&&window.cancelAnimationFrame(Y.current),Y.current=null,ne.current?.stop()}},[en]),e.useEffect(()=>()=>U.current?.(),[]),e.useEffect(()=>{if(!M||mt.current||n.length<2||H!==0||!yt.current||!/\bis-visible\b/.test(p))return;let t=!1,r=!1;const u=le.current,w=()=>{if(t||r||mt.current)return;if(le.current!==u){mt.current=!0;return}const _=B.current?.pageFlip();!_||_.getState()!=="read"||A.current||K.current||b.current||(r=!0,G.preparePage(1).then(te=>{if(r=!1,!(t||!te||mt.current)){if(le.current!==u){mt.current=!0;return}R.current!==0||_.getState()!=="read"||A.current||K.current||b.current||(mt.current=!0,_.flipNext())}}))},x=G.subscribe(w);return w(),()=>{t=!0,x()}},[M,p,H,G,vt,n.length]);const Ue=e.useCallback(()=>{if(z.current||W.current||A.current||K.current||b.current)return;const t=ie.current;if(!t)return;ie.current=null;const r=re.current;re.current=null,r&&O(u=>Math.abs(u.width-r.width)<2&&Math.abs(u.height-r.height)<2?u:r),g(u=>Math.abs(u.width-t.width)<2&&Math.abs(u.height-t.height)<2?u:t),a(!0)},[]),tn=e.useCallback(t=>[...D.current?.querySelectorAll("[data-book-page-id]")??[]].find(r=>r.dataset.bookPageId===t&&r.dataset.bookPageVisible!=="false"&&r.style.display!=="none"&&r.getBoundingClientRect().width>0),[]),Ln=e.useCallback(t=>{const r=tn(t.pageId)?.getBoundingClientRect();return r?{x:r.left+t.anchorX*r.width,y:r.top+t.anchorY*r.height}:null},[tn]),Ke=e.useCallback(()=>{const t=D.current;if(!t)return!1;const r=t.getBoundingClientRect();if(r.width<1||r.height<1)return!1;const u=t.clientWidth||r.width,w=t.clientHeight||r.height,x=r.width/u,_=r.height/w,te=Math.max(12,-r.left/x+12),ve=Math.min(u-12,((window.innerWidth??r.left+r.width)-r.left)/x-12),Me=Math.max(12,-r.top/_+12),_e=Math.min(w-12,((window.innerHeight??r.top+r.height)-r.top)/_-12),Ge=new Map;t.querySelectorAll("[data-book-comment-id]").forEach(Ze=>{const Xe=Ze.getBoundingClientRect().width/x;Ze.dataset.bookCommentId&&Xe>0&&Ge.set(Ze.dataset.bookCommentId,Xe)});const $e=[];let cn=0;return t.querySelectorAll("[data-book-page-id]").forEach(Ze=>{const Xe=Ze.getBoundingClientRect();Ze.dataset.bookPageVisible==="false"||Ze.style.display==="none"||Xe.width<1||Xe.height<1||(cn+=1,ae.current.filter(Ve=>Ve.is_visible&&Ve.book_page_id===Ze.dataset.bookPageId).forEach(Ve=>{if($e.some(Ar=>Ar.id===Ve.id))return;const Kn=l.current.get(Ve.id),zr=(Xe.left-r.left+(Kn?.anchorX??Ve.anchor_x)*Xe.width)/x,Mn=ze((Xe.top-r.top+(Kn?.anchorY??Ve.anchor_y)*Xe.height)/_,Me,_e),Gn=Math.max(0,Mn-14-Me),Zn=Math.max(0,_e-Mn-14),Tn=Zn>Gn,Jn=Ge.get(Ve.id)??Math.min(240,u-32);$e.push({id:Ve.id,x:ze(zr,te+Jn/2,ve-Jn/2),y:ze(Mn+(Tn?14:-14),Me,_e),below:Tn,maxHeight:Math.max(8,(Tn?Zn:Gn)-44)})}))}),cn?(vn($e),!0):!1},[]),Oe=e.useCallback(()=>{P.current&&window.clearTimeout(P.current),Ie.current=!1,Pt(!1);const t=()=>{if(P.current=null,A.current||K.current&&!K.current.commentId)return;const r=B.current?.pageFlip()?.getState?.();if((r?r==="user_fold"||r==="flipping":z.current)||!Ke()){P.current=window.setTimeout(t,160);return}Ie.current=!0,Pt(!0)};P.current=window.setTimeout(t,So)},[Ke]);e.useEffect(()=>(Oe(),()=>{P.current&&window.clearTimeout(P.current)}),[o.id,H,f,ke,oe,kt,vt,Oe]),e.useEffect(()=>{Ie.current&&Ke()},[i,Ke]),e.useLayoutEffect(()=>{He.length&&Ke()},[He.length,Ke]),e.useEffect(()=>{const t=r=>{b.current||r.target instanceof Element&&r.target.closest("[data-book-comment-ui]")||(le.current+=1,Ae.current=!1,Oe())};return window.addEventListener("pointerdown",t,{capture:!0,passive:!0}),()=>window.removeEventListener("pointerdown",t,!0)},[Oe]),e.useEffect(()=>{const t=()=>{document.visibilityState==="visible"&&!Ie.current&&Oe()};return window.addEventListener("focus",t),document.addEventListener("visibilitychange",t),()=>{window.removeEventListener("focus",t),document.removeEventListener("visibilitychange",t)}},[Oe]),e.useLayoutEffect(()=>{if(!L){W.current=null,V.current=!1,Ie.current||Oe();return}L.commentId||(P.current&&window.clearTimeout(P.current),P.current=null,Ie.current=!1,Pt(!1));const t=()=>{const r=window.visualViewport,u=(r?.offsetTop??0)+16,w=(r?.offsetTop??0)+(r?.height??window.innerHeight)-16,x=Ln(L);kn(x);const _=ze(x?.y??(u+w)/2,u+24,w-24);_>(u+w)/2?(Jt(null),Zt(Math.max(16,window.innerHeight-_+18)),Qt(Math.max(48,_-18-u))):(Jt(_+18),Qt(Math.max(48,w-_-18)))};return t(),window.visualViewport?.addEventListener("resize",t),window.visualViewport?.addEventListener("scroll",t),()=>{window.visualViewport?.removeEventListener("resize",t),window.visualViewport?.removeEventListener("scroll",t)}},[L,Oe,Ln]);const En=e.useCallback(()=>{yt.current||!et.current||![...$.current].every(t=>Nt.current.has(t))||(yt.current=!0,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>C?.(o.id))}))},[o.id,C]),Fn=e.useCallback(t=>{$.current.has(t)&&(Nt.current.add(t),En())},[En]),nn=e.useCallback(()=>G.preparePage(R.current),[G]),$n=e.useCallback((t,r,u)=>{!s||!d||(Se(null),Ne(""),Ft(""),We(nr("")),je(fn),Rt(pn),Bt(gn),lt(14),Pt(!1),V.current=!1,Fe({pageId:t,anchorX:r,anchorY:u}))},[d,s]),Xn=e.useCallback(()=>{Ee||(Fe(null),Ne(""),Se(null))},[Ee]),Tr=e.useCallback(t=>{!d||!v||Ee||(Se(null),Ne(t.body),Ft(t.title??""),We(rr(t.rich_content,t.body)),je(t.background_color||fn),Rt(t.text_color||pn),Bt(t.background_opacity??gn),lt(t.font_size??14),Fe({commentId:t.id,pageId:t.book_page_id,anchorX:t.anchor_x,anchorY:t.anchor_y}))},[d,Ee,v]),Vn=e.useCallback(async()=>{if(!(!L||!tt.trim()||(L.commentId?!v:!y)||Ee)){ut(!0),Se(null);try{const t={...Be.trim()||L.commentId&&ae.current.find(r=>r.id===L.commentId)?.title?{title:Be}:{},body:tt,richContent:bt,backgroundColor:qe,textColor:gt,backgroundOpacity:wt,fontSize:I};L.commentId?await v(L.commentId,t):await y({...t,bookPageId:L.pageId,anchorX:L.anchorX,anchorY:L.anchorY}),Fe(null),Ne("")}catch(t){Se(t instanceof Error?t.message:"Unable to save the comment.")}finally{ut(!1)}}},[Ee,L,tt,Be,bt,qe,gt,wt,I,y,v]),jr=e.useCallback(async t=>{if(!(!j||Ee)){ut(!0),Se(null);try{await j(t)}catch(r){Se(r instanceof Error?r.message:"Unable to delete the comment.")}finally{ut(!1)}}},[Ee,j]),rt=e.useCallback(()=>{h.current.forEach(t=>t.stop()),h.current=[]},[]),rn=e.useCallback(()=>{const t=Qe.current==="single",r=t?Pe.current:1;return{width:f.width*(t?1:In(R.current,n.length).length)*r,height:f.height*r}},[f.height,f.width,n.length]),on=e.useCallback((t,r,u)=>{const w=N.current,x=rn(),_=Math.max(0,(x.width*t-w.width)/2),te=Math.max(0,(x.height*t-w.height)/2);return{x:ze(r,-_,_),y:ze(u,-te,te)}},[rn]),At=e.useCallback((t,r,u,w=se.get(),x=pe.get(),_=ge.get())=>{const te=N.current,ve=ze(t,yo,ko),Me=ve/Math.max(1e-4,w),_e=r-te.width/2,Ge=u-te.height/2,$e=on(ve,_e-(_e-x)*Me,Ge-(Ge-_)*Me);return se.set(ve),pe.set($e.x),ge.set($e.y),{scale:ve,...$e}},[on,pe,ge,se]),Yn=e.useCallback(()=>{const t=N.current,r=rn(),u=Math.min((t.width-24)/Math.max(1,r.width),(t.height-24)/Math.max(1,r.height));return ze(u,1.25,3.6)},[rn]),an=e.useCallback((t,r,u)=>{rt(),Ce.current&&(window.clearTimeout(Ce.current),Ce.current=null);const w={width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)};N.current=w,A.current=!0,Q.current=!1,Le(!1),St(!0),Fe(null),ct(!0),se.set(1),pe.set(0),ge.set(0);const x=At(Yn(),t,r,1,0,0);return u&&(se.set(1),pe.set(0),ge.set(0),window.requestAnimationFrame(()=>{h.current=[Je(se,x.scale,{type:"spring",stiffness:260,damping:24,mass:.74}),Je(pe,x.x,{type:"spring",stiffness:280,damping:27,mass:.72}),Je(ge,x.y,{type:"spring",stiffness:280,damping:27,mass:.72})]})),x},[Yn,pe,ge,rt,At,se]),Yt=e.useCallback(()=>{!A.current||Q.current||(W.current=null,be.current.time=0,le.current+=1,rt(),Q.current=!0,Le(!0),h.current=[Je(se,1,{type:"spring",stiffness:330,damping:28,mass:.7}),Je(pe,0,{type:"spring",stiffness:330,damping:28,mass:.7}),Je(ge,0,{type:"spring",stiffness:330,damping:28,mass:.7})],Ce.current=window.setTimeout(()=>{A.current=!1,Q.current=!1,ct(!1),Le(!1),se.set(1),pe.set(0),ge.set(0),Ce.current=null,window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>St(!1))})},430))},[pe,ge,rt,se]);e.useEffect(()=>{const t=r=>{r.key!=="Escape"||!A.current||(r.preventDefault(),Yt())};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[Yt]);const dt=e.useCallback(t=>{const r=R.current!==t;R.current=t,fe(t),r&&(Oe(),T?.(t))},[T,Oe]),Wt=e.useCallback(t=>{window.requestAnimationFrame(()=>{const r=t??B.current?.pageFlip();if(!r||B.current?.pageFlip()!==r||X.current!==r)return;const u=r.getCurrentPageIndex(),w=r.getBoundsRect(),x=Z.current;x!==null&&it(x)===u?(Z.current=null,dt(x)):it(R.current)!==u&&dt(u),r.getOrientation()!=="landscape"?st(0):u===0&&n.length>1?st(-(w.pageWidth/2)):In(u,n.length).length===1?st(w.pageWidth/2):st(0)})},[dt,n.length]);e.useLayoutEffect(()=>{const t=D.current;if(!t)return;const r=()=>{if(b.current)return;const _=window.getComputedStyle(t),te=Number.parseFloat(_.paddingLeft)+Number.parseFloat(_.paddingRight),ve=Number.parseFloat(_.paddingTop)+Number.parseFloat(_.paddingBottom),Me=Math.max(1,t.clientWidth-te),_e=Math.max(1,t.clientHeight-ve);if(N.current={width:Me,height:_e},!A.current&&!K.current){const Ge={width:Me,height:_e};re.current=Ge;const $e=mr(q,Me,Ge.height);ie.current=$e,Ue()}z.current||Wt()};r();let u=null;const w=()=>{u===null&&(u=window.requestAnimationFrame(()=>{u=null,r()}))},x=new ResizeObserver(w);return x.observe(t),window.addEventListener("resize",w),()=>{x.disconnect(),window.removeEventListener("resize",w),u!==null&&window.cancelAnimationFrame(u)}},[oe,q,Wt,Ue]),e.useEffect(()=>{!oe&&!L&&Ue()},[oe,L,Ue]),e.useEffect(()=>{R.current=at.current,fe(at.current),st(0),A.current=!1,Q.current=!1,ct(!1),Le(!1),St(!1),Fe(null),Ne(""),Se(null),se.set(1),pe.set(0),ge.set(0),be.current.time=0,W.current=null,V.current=!1},[o.id,pe,ge,se]),e.useEffect(()=>{Fe(null),Ne(""),Se(null),nn()},[H,nn]),e.useEffect(()=>{s||(V.current=!1,Fe(null),Ne(""),Se(null))},[s]),e.useEffect(()=>{if(!oe)return;const t=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=t}},[oe]);const Re=e.useCallback(()=>{le.current+=1,ce.current&&(window.clearTimeout(ce.current),ce.current=null)},[]),Sn=e.useCallback((t,r)=>{const u=B.current?.pageFlip()?.getState?.();if(b.current||ue.current||z.current||u&&u!=="read")return;const w=r.closest(".book-comment-balloon");if(!w)return;const x=w.getBoundingClientRect();Re(),W.current=null,b.current=t.id,xt({id:t.id,origin:{left:x.left,top:x.top,width:x.width,height:x.height,content:r}})},[Re]),Ir=e.useCallback((t,r)=>{if(!d||!v||Ee||b.current)return;const u=tn(r.book_page_id)?.getBoundingClientRect();u&&(t.preventDefault(),t.stopPropagation(),t.currentTarget.setPointerCapture(t.pointerId),Re(),W.current=null,Se(null),ue.current={pointerId:t.pointerId,comment:r,rect:u,startX:t.clientX,startY:t.clientY,moved:!1},Kt(r.id))},[d,v,Ee,tn,Re]),_r=e.useCallback(t=>{const r=ue.current;if(!r||r.pointerId!==t.pointerId)return;t.preventDefault(),t.stopPropagation();const u=t.clientX-r.startX,w=t.clientY-r.startY;Math.hypot(u,w)>2&&(r.moved=!0),l.current.set(r.comment.id,{anchorX:ze(r.comment.anchor_x+u/r.rect.width,0,1),anchorY:ze(r.comment.anchor_y+w/r.rect.height,0,1)}),Ke()},[Ke]),Rn=e.useCallback(async(t,r=!1)=>{const u=ue.current;if(!u||u.pointerId!==t.pointerId)return;t.preventDefault(),t.stopPropagation(),ue.current=null,Kt(null);const w=l.current.get(u.comment.id);if(r||!u.moved||!w||!v){l.current.delete(u.comment.id),Ke();return}ut(!0);try{await v(u.comment.id,{body:u.comment.body,...w})}catch(x){Se(x instanceof Error?x.message:"Impossibile spostare il commento.")}finally{ut(!1),window.requestAnimationFrame(()=>{l.current.delete(u.comment.id),Ke()})}},[v,Ke]);e.useEffect(()=>{he&&!i.some(t=>t.id===he.id)&&xt(null)},[i,he]);const Wn=e.useCallback(t=>Dt(R.current,t,n.length,Qe.current).leaf,[n.length]),sn=e.useCallback((t,r=!0)=>{A.current||Q.current||z.current||W.current||K.current||b.current||(Re(),le.current+=1,be.current.time=0,Qe.current=t,De(t),Oe(),r&&go(t))},[Re,Oe]);e.useEffect(()=>{const t=()=>sn(dr(),!1);return window.addEventListener(zn,t),window.addEventListener("storage",t),t(),()=>{window.removeEventListener(zn,t),window.removeEventListener("storage",t)}},[sn,oe,L,he]),e.useEffect(()=>{const t=document.querySelector('[data-portfolio-navigation][data-section="sketches"]');t&&Ut(t.dataset.navigationVisible!=="false");const r=u=>{const w=u.detail;(w?.section==="sketches"||w?.section==="books")&&Ut(!!w.visible)};return window.addEventListener("portfolio:toolbar-visibility",r),()=>window.removeEventListener("portfolio:toolbar-visibility",r)},[]),e.useLayoutEffect(()=>{ee.current&&(ee.current.inert=!xe||!S)},[xe,S]),e.useLayoutEffect(()=>{const t=In(H,n.length),r=new Set(t.map(u=>n[u]?.id));D.current?.querySelectorAll("[data-book-page-id]").forEach(u=>{u.dataset.bookPageVisible=r.has(u.dataset.bookPageId)?"true":"false"})},[H,ke,n,vt,f,oe]),e.useEffect(()=>{const t=r=>{const u=r;if(u.detail?.bookId!==o.id)return;const w=W.current;if(A.current||Q.current||b.current||K.current||s||w&&w.mode!=="page"){r.preventDefault();return}!w||w.pointerId!==u.detail.pointerId||(W.current=null,be.current.time=0,le.current+=1,Re(),V.current=!0)};return window.addEventListener("book-deck-drag-claim",t),()=>window.removeEventListener("book-deck-drag-claim",t)},[o.id,Re,s]);const Nr=e.useCallback(t=>{if(le.current+=1,Ae.current=!1,b.current){t.preventDefault(),t.stopPropagation();return}const r=t.target;if(r instanceof Element&&r.closest("[data-book-comment-ui]")){V.current=!1;return}if(s&&r instanceof Element&&r.closest("[data-book-page-face]")){V.current=!0;return}if(Q.current||!t.isPrimary||t.pointerType==="mouse"&&t.button!==0)return;nn();const u=window.performance.now(),w=be.current,x=u-w.time>0&&u-w.time<pr&&w.pointerType===t.pointerType&&Math.hypot(t.clientX-w.x,t.clientY-w.y)<vo,_=A.current,te=t.currentTarget.getBoundingClientRect(),ve=Wn(t.clientX>=te.left+te.width/2),Me=Dt(R.current,t.clientX>=te.left+te.width/2,n.length,Qe.current),_e=!x&&!_&&Me.action==="view";we.current=_e,_e&&B.current?.pageFlip()?.userStop?.({x:0,y:0},!0);const Ge=r instanceof Element?r.closest("[data-book-page-id]")?.dataset.bookPageId:void 0,$e=Ge?n.findIndex(Ve=>Ve.id===Ge):-1,cn=$e>=0?$e:R.current,Ze=Qe.current==="single"?Dt(R.current,ft(cn,n.length)===1,n.length,"double").leaf:ve,Xe=G.isReadyForPage(ve)&&G.isReadyForPage(Ze);!Xe&&!x&&!_&&(G.preparePage(ve),G.preparePage(Ze)),x?(Re(),be.current.time=0,V.current=!0,rt()):V.current=_||_e||!Xe,W.current={pointerId:t.pointerId,pointerType:t.pointerType,mode:x?"zoom-slider":_?"pan":"page",startedZoomed:_,startX:t.clientX,startY:t.clientY,startPanX:pe.get(),startPanY:ge.get(),startScale:se.get(),anchorX:t.clientX,anchorY:t.clientY,stageCenterX:te.left+te.width/2,moved:!1,viewOnly:_e,viewSourceLeaf:R.current,viewTargetLeaf:Me.leaf,viewStartOffset:-ft(R.current,n.length)*f.width,viewTargetOffset:-ft(Me.leaf,n.length)*f.width,viewProgress:0,viewVelocity:0,lastMoveX:t.clientX,lastMoveTime:u}},[Re,s,pe,ge,nn,Wn,G,n,f.width,rt,se]),qn=e.useCallback((t,r)=>{Re();const u=le.current;ce.current=window.setTimeout(()=>{if(ce.current=null,A.current||z.current||W.current)return;const w=R.current,x=Dt(w,t>=r,n.length,Qe.current);if(x.action==="none")return;const _=x.leaf;G.preparePage(_).then(te=>{if(!te||le.current!==u||A.current||z.current||W.current||b.current||K.current||R.current!==w||!G.isReadyForPage(_))return;if(x.action==="view"){dt(_);return}const ve=B.current?.pageFlip();ve&&(Z.current=_,x.action==="previous"?ve.flipPrev():ve.flipNext())})},pr)},[Re,G,n.length,dt]),Cn=e.useCallback(t=>{const r=W.current;if(!r||r.pointerId!==t.pointerId)return;if(Math.hypot(t.clientX-r.startX,t.clientY-r.startY)>xo&&(r.moved=!0),r.viewOnly){if(!r.moved)return;t.preventDefault(),ne.current?.stop();const x=t.clientX-r.startX;if(Math.abs(t.clientY-r.startY)>Math.abs(x)*1.25)return;const _=performance.now();r.viewVelocity=(t.clientX-(r.lastMoveX??r.startX))/Math.max(1,_-(r.lastMoveTime??_)),r.lastMoveX=t.clientX,r.lastMoveTime=_;const te=po(r.viewStartOffset??0,r.viewTargetOffset??0,x,Pe.current);r.viewProgress=te.progress,Te.set(te.value);return}if(r.mode==="page")return;if(t.preventDefault(),r.mode==="pan"){if(!r.moved)return;const x=on(se.get(),r.startPanX+t.clientX-r.startX,r.startPanY+t.clientY-r.startY);pe.set(x.x),ge.set(x.y);return}if(!r.moved)return;if(!A.current){const x=an(r.anchorX,r.anchorY,!1);r.startScale=x.scale,r.startPanX=x.x,r.startPanY=x.y}const w=r.startScale*Math.exp((r.startY-t.clientY)*.006);At(w,r.anchorX,r.anchorY,r.startScale,r.startPanX,r.startPanY)},[Te,on,an,pe,ge,At,se]),qt=e.useCallback(t=>{V.current=!1;const r=W.current;if(!(!r||r.pointerId!==t.pointerId)){if(W.current=null,V.current=!1,Ae.current=r.mode==="page"&&!r.moved,Ue(),t.type==="pointercancel"){we.current=!1,be.current.time=0,r.viewOnly&&(ne.current=Je(Te,r.viewStartOffset??0,{type:"spring",stiffness:260,damping:27}));return}if(r.viewOnly&&r.moved){be.current.time=0,Re();const u=le.current,w=r.viewSourceLeaf??R.current,x=r.viewTargetLeaf??w,_=(r.viewTargetOffset??0)-(r.viewStartOffset??0),te=performance.now()-(r.lastMoveTime??0)<120?r.viewVelocity??0:0,ve=()=>{ne.current?.stop(),ne.current=Je(Te,r.viewStartOffset??0,{type:"spring",stiffness:260,damping:27})};if(!mo(r.viewProgress??0,te,_)){ve();return}G.preparePage(x).then(Me=>{if(!(le.current!==u||R.current!==w||A.current||W.current)){if(!Me||!G.isReadyForPage(x)){ve();return}dt(x)}});return}if(r.mode==="zoom-slider"){r.moved?be.current.time=0:r.startedZoomed?Yt():an(r.anchorX,r.anchorY,!0);return}if(r.moved){be.current.time=0,Re();return}be.current={time:window.performance.now(),x:t.clientX,y:t.clientY,pointerType:r.pointerType},r.mode==="page"&&qn(t.clientX,r.stageCenterX)}},[Te,Re,Yt,dt,G,an,qn,Ue]),Pn=e.useCallback(t=>{we.current&&((t.type==="mouseup"||t.type==="touchend"||t.type==="touchcancel")&&(we.current=!1),t.cancelable&&t.preventDefault(),t.stopImmediatePropagation())},[]);e.useEffect(()=>{const t=["mousemove","mouseup","touchmove","touchend","touchcancel"];return t.forEach(r=>window.addEventListener(r,Pn,{capture:!0,passive:!1})),window.addEventListener("pointermove",Cn,{passive:!1}),window.addEventListener("pointerup",qt,!0),window.addEventListener("pointercancel",qt,!0),()=>{t.forEach(r=>window.removeEventListener(r,Pn,!0)),window.removeEventListener("pointermove",Cn),window.removeEventListener("pointerup",qt,!0),window.removeEventListener("pointercancel",qt,!0)}},[Pn,qt,Cn]),e.useEffect(()=>()=>{Re(),rt(),Ce.current&&window.clearTimeout(Ce.current)},[Re,rt]);const Br=e.useCallback(t=>{if(t.target instanceof Element&&t.target.closest("[data-book-comment-ui]")){t.stopPropagation();return}if(b.current){t.preventDefault(),t.stopPropagation();return}if(!A.current||Q.current)return;t.preventDefault(),t.stopPropagation(),rt();const r=t.currentTarget.getBoundingClientRect(),u=Math.exp(-t.deltaY*.0015);At(se.get()*u,t.clientX-r.left,t.clientY-r.top)},[rt,At,se]);e.useEffect(()=>{n.length===0&&C?.(o.id)},[o.id,C,n.length]);const Or=e.useMemo(()=>n.map((t,r)=>c.jsx(Co,{page:t,isCover:r===0||r===n.length-1,commentMode:s,canManageComments:d,onImageReady:()=>Fn(r),onPlaceComment:$n},t.id)),[d,s,Fn,n,$n]);if(n.length===0)return c.jsx("div",{className:"flex min-h-[50vh] items-center justify-center px-8 text-center text-black/55",children:"This published book does not contain any JPG pages yet."});const Hn=he?i.find(t=>t.id===he.id):null,Un=c.jsx("div",{className:`public-book-stage ${p} ${oe?"is-magnified":""} ${kt?"is-zoom-closing":""}`,children:c.jsxs("div",{ref:D,className:`public-book-viewport relative flex items-center justify-center overflow-hidden ${oe?"is-magnified cursor-grab active:cursor-grabbing":"cursor-default"} ${Mt?"is-page-folding":""} ${s&&d?"is-comment-mode":""} ${nt&&!Et&&!oe&&(!L||L.commentId)?"are-comments-visible":"are-comments-hidden"}`,"data-page":H,"data-book-view-mode":ke,"data-zoomed":oe?"true":"false",onPointerDownCapture:Nr,onMouseDownCapture:t=>{t.target instanceof Element&&t.target.closest("[data-book-comment-ui]")||(s||V.current||A.current)&&(t.preventDefault(),t.stopPropagation())},onTouchStartCapture:t=>{t.target instanceof Element&&t.target.closest("[data-book-comment-ui]")||(s||V.current||A.current)&&(t.preventDefault(),t.stopPropagation())},onWheel:Br,children:[c.jsx("div",{className:"book-comment-layer absolute inset-0 z-20","aria-hidden":!nt||Et||oe||!!(L&&!L.commentId),children:He.map(t=>{const r=i.find(u=>u.id===t.id);return r?c.jsx("div",{"data-book-comment-id":r.id,className:`book-comment-position ${t.below?"is-below":""} ${Ct===r.id?"is-dragging":""}`,style:{left:t.x,top:t.y,transform:`translate(-50%, ${t.below?"0":"-100%"})`,visibility:he?.id===r.id?"hidden":void 0,"--book-comment-max-height":`${t.maxHeight}px`},children:c.jsxs("div",{"data-book-comment-ui":"true",className:"book-comment-balloon",onPointerDown:u=>u.stopPropagation(),onClick:u=>u.stopPropagation(),onWheel:u=>u.stopPropagation(),style:{background:Ro(r.background_color||fn,r.background_opacity),color:r.text_color||pn,fontSize:r.font_size??14},children:[c.jsxs("div",{className:"book-comment-read",tabIndex:0,"aria-label":"Commento: doppio clic per leggere a schermo intero",onDoubleClick:u=>{u.preventDefault(),u.stopPropagation(),Sn(r,u.currentTarget)},onKeyDown:u=>{u.key==="Enter"&&(u.preventDefault(),u.stopPropagation(),Sn(r,u.currentTarget))},onPointerDown:u=>{u.pointerType!=="mouse"&&(de.current={id:r.id,x:u.clientX,y:u.clientY,scrollTop:u.currentTarget.scrollTop})},onPointerCancel:()=>{de.current=null,F.current=null},onPointerUp:u=>{if(u.pointerType==="mouse")return;const w=de.current;if(de.current=null,!w||w.id!==r.id||Math.hypot(u.clientX-w.x,u.clientY-w.y)>8||Math.abs(u.currentTarget.scrollTop-w.scrollTop)>1){F.current=null;return}const x=F.current,_=performance.now();x?.id===r.id&&_-x.time<320&&Math.hypot(u.clientX-x.x,u.clientY-x.y)<18?(u.preventDefault(),F.current=null,Sn(r,u.currentTarget)):F.current={id:r.id,time:_,x:u.clientX,y:u.clientY}},children:[r.title&&c.jsx("h3",{children:r.title}),c.jsx(On,{body:r.body,value:r.rich_content})]}),d&&c.jsxs("div",{className:"book-comment-manage",children:[v&&c.jsxs(c.Fragment,{children:[c.jsx("button",{type:"button",className:"book-comment-move","aria-label":"Sposta commento",onPointerDown:u=>Ir(u,r),onPointerMove:_r,onPointerUp:u=>void Rn(u),onPointerCancel:u=>void Rn(u,!0),onLostPointerCapture:u=>void Rn(u,!0),disabled:Ee,children:"↔"}),c.jsx("button",{type:"button",className:"book-comment-edit",onClick:()=>Tr(r),disabled:Ee,children:"modifica"})]}),c.jsx("button",{type:"button",className:"book-comment-delete",onClick:()=>void jr(r.id),"aria-label":"Elimina commento",disabled:Ee,children:"−"})]})]})},r.id):null})}),c.jsx(_t.div,{className:"book-view-scene flex h-full w-full items-center justify-center",style:{x:pe,y:ge,scale:se,transformOrigin:"50% 50%",willChange:"transform",pointerEvents:he?"none":void 0},children:c.jsx("div",{"data-book-page-clip":"true",className:"book-page-clip",style:{width:f.width*(ke==="single"?1:2),height:f.height,transform:`scale(${J})`,willChange:"transform",pointerEvents:oe?"none":"auto"},children:c.jsx(_t.div,{className:"book-page-canvas",style:{width:f.width*2,height:f.height,x:Te},children:vt&&c.jsx(Er.Provider,{value:G,children:c.jsx(ro,{ref:B,className:"mx-auto",style:{margin:"0 auto"},width:f.width,height:f.height,minWidth:1,maxWidth:q.maxWidth,minHeight:1,maxHeight:q.maxHeight,size:"fixed",startPage:it(E.current===o.id?R.current:ye),drawShadow:!0,flippingTime:850,usePortrait:!1,startZIndex:0,autoSize:!1,maxShadowOpacity:.35,showCover:!0,mobileScrollSupport:!0,clickEventForward:!0,useMouseEvents:!0,swipeDistance:30,showPageCorners:!1,disableFlipByClick:!0,onInit:t=>{X.current=t.object,U.current?.();const r=t.object,u=r.getUI?ho(r.getUI()):()=>{},w=bo(r,()=>Ae.current);U.current=()=>{w(),u()},Wt(t.object),et.current=!0,En()},onFlip:t=>{if(X.current!==t.object)return;const r=Z.current;Z.current=null,r!==null&&it(r)===t.data?dt(r):it(R.current)!==t.data&&dt(t.data),Wt(t.object)},onChangeState:t=>{const r=t.data==="user_fold"||t.data==="flipping",u=z.current;z.current=r,G.setBusy(r),r&&en(t.object),r||Ue(),(r||u||t.data==="read")&&Oe(),zt(t.data!=="read"),r&&Re()},onChangeOrientation:t=>{Wt(t.object)},children:Or},`${o.id}-${me}-${f.width}x${f.height}`)})})})})]})});return c.jsxs("div",{className:"flex h-full w-full items-center justify-center",children:[oe&&typeof document<"u"?pt.createPortal(Un,document.body):Un,S&&pt.createPortal(c.jsxs("div",{"data-book-comment-ui":"true","data-book-view-controls":"true",className:"book-view-controls",onPointerDown:t=>t.stopPropagation(),onClick:t=>t.stopPropagation(),children:[c.jsxs("div",{ref:ee,className:`book-view-mode-controls ${xe?"is-revealed":"is-concealed"}`,role:"group","aria-label":"Visualizzazione del libro","aria-hidden":!xe,children:[c.jsx("button",{type:"button",tabIndex:xe?0:-1,"aria-label":"Pagina singola","aria-pressed":ke==="single",disabled:!xe||oe||kt||Mt||!!L||!!he,onClick:()=>sn("single"),children:c.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[c.jsx("path",{d:"M6 3.5h12v17H6z"}),c.jsx("path",{d:"M9 7h6M9 10h6"})]})}),c.jsx("button",{type:"button",tabIndex:xe?0:-1,"aria-label":"Doppia pagina","aria-pressed":ke==="double",disabled:!xe||oe||kt||Mt||!!L||!!he,onClick:()=>sn("double"),children:c.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[c.jsx("path",{d:"M2.5 4.5h8L12 6l1.5-1.5h8v15h-8L12 21l-1.5-1.5h-8zM12 6v15"}),c.jsx("path",{d:"M5.5 8h3M15.5 8h3"})]})})]}),oe&&c.jsx("button",{type:"button",className:"book-zoom-exit","aria-label":"Esci dallo zoom",disabled:kt,onClick:Yt,children:c.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[c.jsx("circle",{cx:"10",cy:"10",r:"6.5"}),c.jsx("path",{d:"m15 15 6 6M7 10h6"})]})})]}),document.body),L&&pt.createPortal(c.jsxs("form",{"data-book-comment-ui":"true",className:"book-comment-draft-panel",style:{top:$t??void 0,bottom:$t===null?Gt:void 0,maxHeight:yn??void 0,background:qe,color:gt},onSubmit:t=>{t.preventDefault(),Vn()},children:[c.jsxs("div",{className:"book-comment-draft-header",children:[c.jsx("span",{children:L.commentId?"MODIFICA ANNOTAZIONE":"ANNOTAZIONE"}),c.jsx("button",{type:"button",disabled:Ee,onClick:Xn,children:"annulla"})]}),c.jsx("input",{className:"book-comment-title-input","aria-label":"Titolo del commento facoltativo",placeholder:"Titolo (facoltativo)",maxLength:120,value:Be,onChange:t=>Ft(t.target.value)}),c.jsx(qr,{autoFocus:!0,label:"Testo del commento",style:{fontSize:Math.max(16,I)},body:tt,value:bt,disabled:Ee,placeholder:"Scrivi sul foglio…",onChange:(t,r)=>{Ne(t),We(r)},onKeyDown:t=>{t.stopPropagation(),t.key==="Escape"&&Xn(),(t.metaKey||t.ctrlKey)&&t.key==="Enter"&&(t.preventDefault(),Vn())}}),c.jsxs("div",{className:"book-comment-color-controls",children:[c.jsxs("label",{children:["Balloon ",c.jsx("input",{type:"color","aria-label":"Colore balloon",value:qe,onChange:t=>je(t.target.value)})]}),c.jsxs("label",{children:["Testo ",c.jsx("input",{type:"color","aria-label":"Colore testo commento",value:gt,onChange:t=>Rt(t.target.value)})]})]}),c.jsxs("label",{className:"book-comment-opacity-control",children:["Opacità dello sfondo ",c.jsx("input",{type:"range","aria-label":"Opacità dello sfondo commento",min:"15",max:"100",step:"5",value:Math.round(wt*100),onChange:t=>Bt(Number(t.target.value)/100)}),c.jsxs("output",{children:[Math.round(wt*100),"%"]})]}),c.jsxs("label",{className:"book-comment-opacity-control",children:["Dimensione testo ",c.jsx("input",{type:"range","aria-label":"Dimensione testo commento",min:"10",max:"48",step:"1",value:I,onChange:t=>lt(Number(t.target.value))}),c.jsxs("output",{children:[I,"px"]})]}),c.jsxs("div",{className:"book-comment-editor-actions",children:[c.jsx("div",{className:"book-comment-emojis","aria-label":"Aggiungi simbolo",children:Eo.map(t=>c.jsx("button",{type:"button",onClick:()=>{const r=`${tt}${t}`;r.length>600||(Ne(r),We(Hr(rr(bt,tt),r)))},children:t},t))}),c.jsx("button",{type:"submit",disabled:Ee||!tt.trim(),children:Ee?"…":"salva"})]}),Ot&&c.jsx("p",{role:"alert",className:"book-comment-editor-error",children:Ot})]}),document.body),L&&Xt&&pt.createPortal(c.jsx("span",{className:"book-comment-draft-anchor","aria-hidden":"true",style:{left:Xt.x,top:Xt.y}}),document.body),!L&&Ot&&c.jsx("p",{role:"alert","data-book-comment-ui":"true",className:"book-comment-action-error",children:Ot}),he&&Hn&&c.jsx(lo,{comment:Hn,origin:he.origin,onClose:()=>{b.current=null,xt(null)}})]})}function Mo({onBookPageChange:o,...n}){const i=e.useCallback(s=>o(n.book.id,s),[o,n.book.id]);return c.jsx(Po,{...n,onPageChange:i})}const Rr="studierzimmer:book-pages:v1";function Cr(){try{return typeof window>"u"?null:window.sessionStorage}catch{return null}}function To(o,n=Cr()){const i={};try{const s=JSON.parse(n?.getItem(Rr)??"null");s&&typeof s=="object"&&!Array.isArray(s)&&Object.entries(s).forEach(([d,m])=>{d&&typeof m=="number"&&Number.isFinite(m)&&m>=0&&Object.defineProperty(i,d,{value:Math.floor(m),enumerable:!0,configurable:!0,writable:!0})})}catch{}return o&&Object.defineProperty(i,o.slug,{value:Math.max(0,Math.floor(o.pageIndex)),enumerable:!0,configurable:!0,writable:!0}),i}function hr(o,n,i,s=Cr()){const d={...o,[n]:Math.max(0,Math.floor(Number.isFinite(i)?i:0))};try{s?.setItem(Rr,JSON.stringify(d))}catch{}return d}function _n(o,n,i){const s=Object.prototype.hasOwnProperty.call(o,n);return{page:Math.min(Math.max(0,i-1),s?o[n]:0),autoOpen:!s&&i>1}}function Nn(o,n,i){const s=o.findIndex(d=>d.id===n);return s<0?null:o[s+i]??null}function jo(o,n,i=0){return Math.abs(o)>=Math.min(120,Math.max(44,n*.18))||Math.abs(o)>24&&Math.abs(i)>.6&&o*i>0}function Io(o,n,i){const s=o*1e3/Math.max(1,n)*Math.exp(-Math.max(0,i)/120);return Number.isFinite(s)?Math.max(-3.5,Math.min(3.5,s)):0}function _o(o,n,i){return!o||o.direction!==n||i-o.releasedAt>=600?0:o.velocity*Math.exp(-Math.max(0,i-o.releasedAt)/180)}function No(o,n,i,s,d){return o.current||!n||!i?!1:(o.current=!0,!s&&!d)}function Bo(o,n){const i=n.reduce((s,d)=>({left:Math.max(s.left,d.left),right:Math.min(s.right,d.right),top:Math.max(s.top,d.top),bottom:Math.min(s.bottom,d.bottom)}),{left:o.left,right:o.right,top:o.top,bottom:o.bottom});return i.right>i.left&&i.bottom>i.top?i:null}function Oo(o,n){const i=n.filter(s=>s.right>s.left&&s.bottom>s.top);return i.some(s=>o.x>=s.left&&o.x<=s.right&&o.y>=s.top&&o.y<=s.bottom)?"page":i.length?o.x<Math.min(...i.map(s=>s.left))?"previous":o.x>Math.max(...i.map(s=>s.right))?"next":"outside":"outside"}const mn="button,a,input,textarea,select,[contenteditable=true],[data-book-comment-ui],[data-portfolio-navigation]",zo=e.forwardRef(function({active:n,previous:i,next:s,incoming:d,children:m,disabled:p,locked:M,onSelect:S},T){const C=e.useRef(null),y=e.useRef(n.book.id),v=Lt(0),j=kr(),[B,D]=e.useState(()=>window.innerWidth),[ee,E]=e.useState(1),[R,X]=e.useState(!1),[Z,Y]=e.useState(!1),[ne,U]=e.useState(!1),[Ae,we]=e.useState(null),[,A]=e.useState(0),Q=e.useRef(!1),z=e.useRef(null),ie=e.useRef("idle"),re=e.useRef(null),V=e.useRef(null),W=d?.direction??ee,be=It(v,l=>`${l*100}%`),ce=It(v,l=>`${(l+W)*100}%`),le=y.current!==n.book.id,Ce=e.useCallback((l,b=0)=>(V.current?.stop(),V.current?.finish(!1),V.current=null,j?(v.set(l),Promise.resolve(!0)):new Promise(F=>{let de=!1;const ae=q=>{de||(de=!0,F(q))},me=Je(v,l,{type:"spring",stiffness:160,damping:22,mass:.95,velocity:b,restDelta:1e-4,restSpeed:.005,onComplete:()=>{V.current=null,ae(!0)}});V.current={stop:()=>me.stop(),finish:ae}})),[j,v]),h=e.useCallback(async()=>{ie.current="settling",re.current=null,X(!1);const l=await Ce(0);return l&&(ie.current="idle",z.current=null),l},[Ce]);e.useImperativeHandle(T,()=>({reset:h,commit:async l=>(ie.current="settling",E(l),X(!1),Ce(-l,_o(z.current,l,performance.now())))}),[Ce,h]),e.useLayoutEffect(()=>{y.current!==n.book.id&&(y.current=n.book.id,v.set(0),be.set("0%"),ce.set(`${W*100}%`),ie.current="idle",re.current=null,z.current=null,X(!1),A(b=>b+1))},[n.book.id,v,be,ce,W]),e.useLayoutEffect(()=>{C.current?.querySelectorAll("[data-book-deck-id]").forEach(l=>{l.inert=l.dataset.bookDeckId!==n.book.id||M})},[n.book.id,d?.choice.book.id,M]),e.useLayoutEffect(()=>{const l=C.current;if(!l)return;const b=()=>D(l.clientWidth||window.innerWidth);b();const F=new ResizeObserver(b);return F.observe(l),()=>F.disconnect()},[]),e.useEffect(()=>()=>{V.current?.stop(),V.current?.finish(!1),V.current=null},[]),e.useEffect(()=>{(j||document.hidden)&&U(!1),No(Q,!p,Z,!!j,document.hidden)&&U(!0)},[p,Z,j]),e.useEffect(()=>{const l=()=>{document.hidden&&U(!1)};return document.addEventListener("visibilitychange",l),()=>document.removeEventListener("visibilitychange",l)},[]);const N=()=>!!document.querySelector(".public-book-viewport.is-magnified, .public-book-viewport.is-zoom-closing, .book-comment-focus-overlay, .book-comment-draft-panel"),P=(l,b)=>{const de=[...C.current?.querySelector(`[data-book-deck-id="${CSS.escape(n.book.id)}"]`)?.querySelectorAll("[data-book-page-id]")??[]].filter(ae=>ae.style.display!=="none").flatMap(ae=>{const me=ae.closest(".public-book-viewport"),q=[{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight}];me&&me.dataset.bookViewMode!=="single"&&q.push(me.getBoundingClientRect());const G=Bo(ae.getBoundingClientRect(),q);return G?[G]:[]});return Oo({x:l,y:b},de)},K=(l,b,F)=>{if(!(p||N())){if(z.current=F??null,!l){h();return}ie.current="pending",E(b),X(!1),S(l,b)}},ue=d?.choice??(ee===1?s:i);return c.jsxs("div",{ref:C,className:`book-deck-viewport${R?" is-dragging":""}`,role:"group","aria-label":"Libri: usa le frecce per cambiare libro","aria-busy":M,tabIndex:0,onKeyDown:l=>{if(!(p||N()||l.target instanceof Element&&l.target.closest("input,textarea,select,[contenteditable=true],[data-book-comment-ui]"))&&(l.key==="ArrowLeft"||l.key==="ArrowRight")){l.preventDefault(),l.stopPropagation();const b=l.key==="ArrowRight";K((b?s:i)?.book,b?1:-1)}},onPointerDownCapture:l=>{if(p||N()||!l.isPrimary||l.button!==0||l.target instanceof Element&&l.target.closest(mn))return;const b=P(l.clientX,l.clientY);if(b!=="page"&&(l.preventDefault(),l.stopPropagation(),!(ie.current!=="idle"&&ie.current!=="settling"))){V.current?.stop(),V.current?.finish(!1),V.current=null,U(!1),we(null),re.current={id:l.pointerId,x:l.clientX,y:l.clientY,side:b,axis:"pending",lastX:l.clientX,lastTime:performance.now(),velocity:0},ie.current="dragging";try{l.currentTarget.setPointerCapture(l.pointerId)}catch{}}},onPointerMove:l=>{const b=re.current;if(!b||b.id!==l.pointerId)return;const F=l.clientX-b.x,de=l.clientY-b.y;if(b.axis==="pending"){if(Math.abs(de)>8&&Math.abs(de)>Math.abs(F)){h();return}if(Math.abs(F)<8||Math.abs(F)<Math.abs(de)*1.1)return;const q=new CustomEvent("book-deck-drag-claim",{bubbles:!0,cancelable:!0,detail:{bookId:n.book.id,pointerId:l.pointerId}});if(!C.current?.dispatchEvent(q)){re.current=null,ie.current="idle";return}b.axis="horizontal",X(!0)}l.preventDefault(),l.stopPropagation();const ae=F<0?1:-1;E(ae);const me=performance.now();b.velocity=(l.clientX-b.lastX)/Math.max(1,me-b.lastTime),b.lastX=l.clientX,b.lastTime=me,v.set(Math.max(-.55,Math.min(.55,F/Math.max(1,B)*((ae===1?s:i)?1:.18))))},onPointerUp:l=>{const b=re.current;if(!b||b.id!==l.pointerId)return;re.current=null;const F=l.clientX-b.x,de=l.clientY-b.y;if(b.axis==="horizontal"){l.preventDefault(),l.stopPropagation();const ae=F<0?1:-1,me=performance.now(),q=Io(b.velocity,B,me-b.lastTime);jo(F,B,q*B/1e3)?K((ae===1?s:i)?.book,ae,{direction:ae,velocity:q,releasedAt:me}):h()}else if(b.side==="outside"){ie.current="idle";return}else Math.hypot(F,de)<8?(l.preventDefault(),l.stopPropagation(),K((b.side==="next"?s:i)?.book,b.side==="next"?1:-1)):h()},onPointerCancel:()=>{re.current&&h()},onLostPointerCapture:()=>{re.current&&h()},onMouseDownCapture:l=>{!p&&!N()&&!(l.target instanceof Element&&l.target.closest(mn))&&P(l.clientX,l.clientY)!=="page"&&(l.preventDefault(),l.stopPropagation())},onTouchStartCapture:l=>{const b=l.touches[0];b&&!p&&!N()&&!(l.target instanceof Element&&l.target.closest(mn))&&P(b.clientX,b.clientY)!=="page"&&(l.preventDefault(),l.stopPropagation())},onClickCapture:l=>{!p&&!N()&&!(l.target instanceof Element&&l.target.closest(mn))&&P(l.clientX,l.clientY)!=="page"&&(l.preventDefault(),l.stopPropagation())},children:[[{id:n.book.id,content:m,active:!0},...d?[{id:d.choice.book.id,content:d.content,active:!1}]:[]].map(l=>c.jsx(_t.div,{"data-book-deck-id":l.id,className:"book-deck-pane",style:{x:l.active?le?"0%":be:ce,pointerEvents:!l.active||M?"none":"auto"},"aria-hidden":!l.active,children:l.content},l.id)),!d&&ue&&(R||M)&&c.jsxs(_t.div,{className:"book-deck-pane book-deck-preview",style:{x:ce},"aria-hidden":"true",children:[c.jsx("div",{className:`book-deck-preview-pages${ue.previewUrls.length===1?" is-closed":""}`,children:ue.previewUrls.map((l,b)=>c.jsx("img",{src:l,alt:"",draggable:!1,decoding:"async"},`${b}:${l}`))}),c.jsx("p",{children:ue.book.title})]}),[{choice:i,direction:-1,side:"previous"},{choice:s,direction:1,side:"next"}].map(l=>{const b=l.direction*72,F=l.direction*24,de=Ae===l.side;return c.jsx("button",{type:"button",className:`book-deck-edge is-${l.side}`,"aria-label":l.choice?`Libro ${l.direction===-1?"precedente":"successivo"}: ${l.choice.book.title}`:`Nessun libro ${l.direction===-1?"precedente":"successivo"}`,disabled:p||!l.choice,onFocus:ae=>{ae.currentTarget.matches(":focus-visible")&&we(l.side)},onBlur:()=>we(null),onPointerDown:()=>we(null),onClick:()=>K(l.choice?.book,l.direction),children:c.jsx(_t.span,{className:"book-deck-edge-paper",initial:{x:b,y:18,rotate:F},animate:{x:ne?[b,0,-l.direction*5,l.direction*2,b]:de?0:b,y:ne?[18,0,-4,1,18]:de?0:18,rotate:F},transition:ne?{duration:j||document.hidden?0:1.05,times:[0,.34,.55,.73,1]}:{duration:j||document.hidden?0:.25},onAnimationComplete:()=>{ne&&U(!1)},children:(l.choice?.edgeUrl||l.choice?.previewUrls[0])&&c.jsx("img",{src:l.choice?.edgeUrl||l.choice?.previewUrls[0],alt:"",draggable:!1,decoding:"async",onLoad:()=>Y(!0)})})},l.side)})]})});async function Ao(o,n,i,s=()=>new Image){const d=[...new Set([n-1,n,n+1,...n===0?[2]:[]])].filter(M=>M>=0&&M<o.length);let m=0;const p=M=>new Promise((S,T)=>{const C=s();let y=!1;const v=B=>{y||(y=!0,C.onload=null,C.onerror=null,i?.removeEventListener("abort",j),B?T(B):S())},j=()=>{v(new DOMException("Book selection cancelled","AbortError")),C.src=""};if(i?.aborted){j();return}i?.addEventListener("abort",j,{once:!0}),C.onload=()=>{(typeof C.decode=="function"?C.decode():Promise.resolve()).then(()=>v(),()=>v(new Error("L’immagine del libro non è leggibile. Riprova la selezione.")))},C.onerror=()=>v(new Error("Non è stato possibile caricare il libro. Il libro corrente resta aperto.")),C.decoding="async",C.src=M.public_url});await Promise.all(Array.from({length:Math.min(2,d.length)},async()=>{for(;m<d.length;){if(i?.aborted)throw new DOMException("Book selection cancelled","AbortError");await p(o[d[m++]])}}))}const br="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?/\\[]{}<>+-=*";function Do({text:o,speed:n=100,revealSpeed:i=55}){const s=e.useRef(null),d=e.useRef(null),m=e.useRef(0),p=e.useRef(!1),M=e.useCallback(()=>{d.current!==null&&(window.clearInterval(d.current),d.current=null)},[]),S=e.useCallback(()=>br[Math.floor(Math.random()*br.length)],[]),T=e.useCallback((v=0)=>o.split("").map((j,B)=>j===" "?" ":B<v?j:S()).join(""),[S,o]),C=e.useCallback(()=>{M(),p.current=!1,s.current&&(d.current=window.setInterval(()=>{!s.current||p.current||(s.current.textContent=T())},n))},[M,T,n]),y=e.useCallback(()=>{M(),p.current=!0,m.current=0,s.current&&(d.current=window.setInterval(()=>{m.current+=1,s.current&&(s.current.textContent=T(m.current)),m.current>=o.length&&(M(),s.current&&(s.current.textContent=o))},i))},[M,T,i,o]);return e.useEffect(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches?(s.current&&(s.current.textContent=o),M):(C(),M),[M,C,o]),c.jsx("span",{className:"public-login-scramble",onMouseEnter:y,onMouseLeave:C,"aria-label":o,children:c.jsx("span",{ref:s,"aria-hidden":"true",children:o})})}const Pr=()=>yr(()=>import("./AdminPortal-DRoWBMOl.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9])),Lo=e.lazy(Pr),Fo=()=>yr(()=>import("./WatchStudio-C0W6E9BS.js"),__vite__mapDeps([10,1,11,12,13,5,6,2,3,4,7,14,15])),Bn=()=>Fo().then(o=>o.preloadWatchStudioExperience()),wn=1120,Mr=180,Dn=140,jt=wn+Dn,$o=Mr+jt,xn=920,gr=120,wr=xn+Dn,An=1180,Xo=6e3,Vo=`
.public-book-shell {
  height: 100vh;
  height: 100dvh;
}

.sketches-controls {
  position: fixed;
  inset: max(18px, env(safe-area-inset-top)) max(20px, env(safe-area-inset-right)) auto max(20px, env(safe-area-inset-left));
  z-index: 170;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
}

.sketches-controls button {
  min-width: 40px;
  min-height: 40px;
  border: 0;
  background: transparent;
  font: inherit;
  pointer-events: auto;
}

.sketches-controls .sketches-menu-toggle { font-size: 28px; }
.sketches-controls .sketches-home { font-size: 21px; }
.sketches-controls .sketches-admin { font-size: 18px; }
.sketches-control-actions { display: flex; align-items: center; gap: 8px; }
.sketches-heading { position: absolute; left: 50%; max-width: calc(100vw - 220px); transform: translateX(-50%); text-align: center; font-size: 12px; }
.sketches-heading img { display: block; max-height: 32px; max-width: 100%; object-fit: contain; }

.public-book-shell.is-sketches .public-library-drawer {
  top: 0;
  left: auto;
  right: 0;
  bottom: 0;
  width: min(430px, 92vw);
  height: 100dvh;
  padding-top: max(62px, env(safe-area-inset-top));
  background: rgb(255 255 255 / 0.98);
  box-shadow: -12px 0 48px rgb(0 0 0 / 0.06);
  transform: translate3d(105%, 0, 0);
}

.public-book-shell.is-sketches .public-library-drawer.is-open {
  transform: translate3d(0, 0, 0);
}

.public-book-shell.is-sketches .public-library-book-row {
  min-height: 230px;
  padding: 22px 28px;
  gap: 18px;
}

.public-book-shell.is-sketches .public-library-open-book {
  width: min(300px, 72vw);
}

.public-book-service-notice {
  position: fixed;
  z-index: 145;
  left: 50%;
  bottom: max(14px, env(safe-area-inset-bottom));
  width: min(570px, calc(100vw - 32px));
  transform: translateX(-50%);
  padding: 10px 14px;
  background: rgb(255 255 255 / 0.94);
  text-align: center;
  font-size: 11px;
  line-height: 1.5;
}

.public-book-service-notice button {
  border: 0;
  padding: 4px 6px;
  background: transparent;
  font: inherit;
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
  opacity: 1;
  visibility: hidden;
  background: rgb(207 207 207);
  transition:
    transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1),
    visibility 0s 720ms;
  will-change: transform;
}

.public-library-drawer.is-open {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
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
  visibility: hidden;
  transition: visibility 0s 430ms;
}

.public-book-viewport.are-comments-visible .book-comment-layer {
  visibility: visible;
  transition-delay: 0s;
}

.book-comment-position {
  position: absolute;
  width: max-content;
  max-width: min(240px, calc(100vw - 64px));
  pointer-events: none;
}

.book-comment-balloon {
  position: relative;
  pointer-events: auto;
  width: fit-content;
  max-width: 100%;
  min-width: 0;
  padding: 8px 10px;
  border-radius: 0;
  background: #dde2e5bf;
  color: #414a51;
  font-size: clamp(12px, 1.05vw, 14px);
  line-height: 1.55;
  letter-spacing: 0.015em;
  overflow-wrap: anywhere;
  transform: scale(0);
  transform-origin: 50% 100%;
  transition: transform 430ms cubic-bezier(.55,-.25,.7,.2);
}

.public-book-viewport.are-comments-visible .book-comment-balloon {
  transform: scale(1);
  transition: transform 680ms cubic-bezier(.2,1.45,.35,1);
}

.book-comment-position.is-below .book-comment-balloon { transform-origin: 50% 0; }
.book-comment-read {
  max-height: var(--book-comment-max-height, min(240px, 35dvh));
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.book-comment-read p { margin:0; }
.book-comment-read h3 { font:inherit; font-size:1.15em; font-weight:400; margin:0 0 .6em; }

.book-comment-balloon::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -7px;
  width: 10px;
  height: 10px;
  background: inherit;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  transform: translateX(-50%) rotate(-45deg);
}

.book-comment-position.is-below .book-comment-balloon::after { top: -7px; bottom: auto; transform: translateX(-50%) rotate(135deg); }

.book-comment-manage {
  pointer-events: auto;
  position: absolute;
  right: 0;
  bottom: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;
  margin-bottom: 3px;
  padding: 0 6px;
  white-space: nowrap;
  background: #ffffffdb;
}

.book-comment-manage button {
  border: 0;
  background: transparent;
  color: inherit;
  padding: 6px 0;
  font: inherit;
  font-size: 10px;
  line-height: 1;
}

.book-comment-manage .book-comment-delete {
  min-width: 24px;
  font-size: 16px;
}
.book-comment-position.is-below .book-comment-manage { bottom:auto; top:100%; margin-bottom:0; margin-top:3px; }
.book-comment-manage .book-comment-move { min-width:28px; font-size:16px; cursor:grab; touch-action:none; }
.book-comment-position.is-dragging .book-comment-move { cursor:grabbing; }
.book-comment-draft-anchor { position:fixed; z-index:320; width:10px; height:10px; border:1px solid #515e68; background:#e0e5e8; border-radius:50%; transform:translate(-50%,-50%); box-shadow:0 0 0 3px #ffffffbb; pointer-events:none; }
.book-comment-action-error { position:fixed; z-index:320; bottom:20px; left:50%; transform:translateX(-50%); max-width:calc(100vw - 32px); padding:10px 14px; background:#fff; color:#a02727; font-size:12px; }

.public-book-viewport.is-comment-mode { outline: 1px dashed #a7afb6; outline-offset: -8px; cursor: crosshair; }
.book-comment-mode-indicator { position:fixed; z-index:170; top:max(84px,calc(env(safe-area-inset-top) + 70px)); left:50%; transform:translateX(-50%); width:max-content; max-width:calc(100vw - 36px); display:flex; align-items:center; gap:20px; padding:10px 14px; background:#eef1f3; color:#414a51; font-size:11px; line-height:1.45; }
.book-comment-mode-indicator button { border:0; background:transparent; color:inherit; padding:6px 0; font:inherit; }

.book-comment-draft-panel {
  position: fixed;
  left: 50%;
  z-index: 310;
  width: min(360px, calc(100vw - 32px));
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  padding: 20px;
  border-radius: 0;
  transform: translateX(-50%);
  touch-action: pan-y;
  box-shadow: 0 12px 48px rgb(45 55 65 / 0.15);
  animation: book-comment-compose 650ms cubic-bezier(.2,1.3,.35,1) both;
}

@keyframes book-comment-compose { from { transform: translateX(-50%) scale(0); } to { transform: translateX(-50%) scale(1); } }
.book-comment-draft-header { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 14px; font-size: 10px; letter-spacing: .08em; }
.book-comment-draft-header button { padding: 8px; font-size: 12px; letter-spacing: .01em; }
.book-comment-title-input { display:block; width:100%; border:0; border-bottom:1px solid #727e8550; border-radius:0; background:transparent; padding:8px 0; margin-bottom:10px; color:inherit; font:inherit; font-size:16px; }
.book-comment-draft-panel textarea {
  display: block;
  width: 100%;
  min-height: 95px;
  max-height: 25dvh;
  resize: vertical;
  border: 0;
  border-bottom: 1px solid rgb(0 0 0 / 0.28);
  border-radius: 0;
  outline: none;
  background: transparent;
  font: inherit;
  font-size: 16px;
  line-height: 1.5;
  user-select: text !important;
  -webkit-user-select: text !important;
  touch-action: manipulation;
}
.book-comment-color-controls { display: flex; justify-content: space-between; gap: 16px; margin-top: 14px; font-size: 11px; }
.book-comment-color-controls label { display: flex; align-items: center; gap: 9px; }
.book-comment-color-controls input { width: 36px; height: 36px; padding: 3px; border: 1px solid currentColor; background: transparent; border-radius: 0; }
.book-comment-opacity-control { display:flex; align-items:center; gap:12px; margin-top:16px; font-size:11px; }
.book-comment-opacity-control input { min-width:60px; flex:1; accent-color:#67737c; }
.book-comment-opacity-control output { min-width:32px; text-align:right; }

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
  padding: 9px;
  background: transparent;
  font-size: 11px;
}

.book-comment-editor-actions > button {
  padding: 9px 12px;
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
    padding: 12px 15px;
    border-radius: 0;
    font-size: 12px;
  }
}

.public-book-background-layer {
  position: absolute;
  inset: -4%;
  transform-origin: 50% 50%;
  will-change: opacity, transform, filter, clip-path;
}

.public-book-background-layer.is-current {
  animation: public-book-background-mix-in ${An}ms cubic-bezier(0.22, 0.82, 0.28, 1) both;
}

.public-book-background-layer.is-previous {
  animation: public-book-background-mix-out ${An}ms cubic-bezier(0.4, 0, 0.2, 1) both;
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

@keyframes public-book-blossom {
  0% { transform: scale(0); }
  48% { transform: scale(1.075); }
  66% { transform: scale(0.97); }
  80% { transform: scale(1.018); }
  91% { transform: scale(0.994); }
  100% { transform: scale(1); }
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
  animation-name: public-book-blossom;
  animation-duration: ${wn}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-meta.is-fast.is-entering,
.public-book-meta.is-fast.is-leaving {
  animation-duration: ${xn}ms;
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
  animation-name: public-book-blossom;
  animation-duration: ${wn}ms;
  animation-timing-function: cubic-bezier(0.22, 0.88, 0.3, 1);
  animation-fill-mode: both;
}

.public-book-stage.is-fast.is-entering,
.public-book-stage.is-fast.is-leaving {
  animation-duration: ${xn}ms;
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
  transform-origin: center;
  will-change: scale;
}

.public-route-message.is-outside {
  scale: 0;
  pointer-events: none;
}

.public-route-message.is-visible {
  animation: public-route-message-enter 760ms cubic-bezier(.22,.88,.3,1) both;
}

.public-route-message.is-leaving {
  animation: public-route-message-leave 760ms cubic-bezier(.22,.88,.3,1) both;
  pointer-events: none;
}

@keyframes public-route-message-enter {
  0% { scale: 0; }
  48% { scale: 1.075; }
  66% { scale: .97; }
  80% { scale: 1.018; }
  91% { scale: .994; }
  100% { scale: 1; }
}

@keyframes public-route-message-leave {
  0% { scale: 1; }
  9% { scale: .994; }
  20% { scale: 1.018; }
  34% { scale: .97; }
  52% { scale: 1.075; }
  100% { scale: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .public-route-message.is-visible,
  .public-route-message.is-leaving { animation-duration: 1ms; }
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


`;function hn(o){return o instanceof Error?o.message:"Unable to load the books."}function ot(o){return new Promise(n=>{window.setTimeout(n,o)})}function xr(){return new Promise(o=>{window.requestAnimationFrame(()=>o())})}function Yo(o){const n=i=>Number.isFinite(i)?Math.min(255,Math.max(0,Math.round(i??255))):255;return`rgb(${n(o?.background_r)} ${n(o?.background_g)} ${n(o?.background_b)})`}function Wo(o){return new Promise(n=>{const i=new Image;let s=!1;const d=()=>{s||(s=!0,window.clearTimeout(m),n())},m=window.setTimeout(d,5e3);i.onload=()=>{if(typeof i.decode=="function"){i.decode().catch(()=>{}).finally(d);return}d()},i.onerror=d,i.decoding="async",i.src=o})}async function vr(o,n=0){const i=Math.min(Math.max(0,Math.floor(n)),Math.max(0,o.length-1)),s=[i-1,i,i+1,i+2].filter(p=>p>=0&&p<o.length),d=[...new Set(s)].map(p=>o[p]);let m=0;await Promise.all(Array.from({length:Math.min(2,d.length)},async()=>{for(;m<d.length;){const p=d[m++];await Wo(p.public_url)}}))}function ei({navigationMode:o="sketches",initialSlug:n,onBack:i,onLogin:s,onThreeD:d,onBookChange:m}){const{isAdmin:p}=Fr(),{settings:M}=$r(),S=Xr(),T=M.menu_items.find(a=>a.id==="sketches"),[C]=e.useState(()=>{const a=window.sessionStorage.getItem("gstudios:nav-continuity")==="models-to-library";return a&&window.sessionStorage.removeItem("gstudios:nav-continuity"),a}),[y,v]=e.useState([]),[j,B]=e.useState(null),[D,ee]=e.useState([]),[E,R]=e.useState([]),[X,Z]=e.useState(!1),[Y,ne]=e.useState({}),U=e.useRef(Y);U.current=Y;const[Ae,we]=e.useState(new Set),A=e.useRef(null),[Q,z]=e.useState(!0),[ie,re]=e.useState(!1),[V,W]=e.useState(null),[be,ce]=e.useState(null),[le,Ce]=e.useState(0),[h,N]=e.useState(!1),[P,K]=e.useState(!1),[ue,l]=e.useState("outside"),[b,F]=e.useState(C),[de,ae]=e.useState("library"),[me,q]=e.useState("outside"),[G,ye]=e.useState(!1),[at,ke]=e.useState(0),[De,xe]=e.useState(!1),[Ut,Qe]=e.useState(!1),[et,yt]=e.useState(null),[mt,Nt]=e.useState(null),$=e.useRef(!0),H=e.useRef(!1),fe=e.useRef(null),ht=e.useRef(null),st=e.useRef(null),oe=e.useRef(!1),ct=e.useRef(Vr()),[kt]=e.useState(()=>To(ct.current)),Le=e.useRef(kt),Et=e.useRef(new Map),St=e.useRef(null),L=e.useRef(null),Fe=e.useRef(null),tt=e.useRef(n),Ne=e.useRef(null),Be=e.useRef(null),Ft=e.useRef(0),bt=e.useRef("rgb(255 255 255)"),We=e.useRef(null),qe=e.useRef(null),je=e.useRef(null),gt=e.useRef(new Set),Rt=e.useRef(null),[wt,Bt]=e.useState([{id:0,color:bt.current}]),I=e.useMemo(()=>y.find(a=>a.id===j)??null,[y,j]);e.useEffect(()=>{p||Z(!1)},[p]),e.useEffect(()=>{!I||D.length===0||ne(a=>({...a,[I.id]:{cover:D[0]?{src:D[0].public_url,fallback:D[0].public_url}:null,lastPage:D[D.length-1]?{src:D[D.length-1].public_url,fallback:D[D.length-1].public_url}:null}}))},[D,I]);const lt=e.useCallback(a=>{we(f=>f.has(a)?f:new Set([...f,a])),!(U.current[a]||gt.current.has(a))&&(gt.current.add(a),ln(a).then(f=>{if(!$.current)return;Et.current.set(a,f);const g=f[0],k=f[f.length-1],O={cover:g?{src:g.public_url,fallback:g.public_url}:null,lastPage:k?{src:k.public_url,fallback:k.public_url}:null};U.current={...U.current,[a]:O},ne(J=>({...J,[a]:O}))}).catch(()=>{}).finally(()=>{gt.current.delete(a)}))},[]);e.useEffect(()=>{if(!h||P){we(new Set);return}const a=A.current;if(!a)return;if(typeof IntersectionObserver!="function"){y.slice(0,3).forEach(g=>lt(g.id));return}const f=new IntersectionObserver(g=>{g.forEach(k=>{k.isIntersecting&&lt(k.target.dataset.previewBookId)})},{root:a,rootMargin:"180px 0px"});return a.querySelectorAll("[data-preview-book-id]").forEach(g=>f.observe(g)),()=>f.disconnect()},[h,P,y,lt]),e.useEffect(()=>{o!=="sketches"||!I||me!=="visible"||[-1,1].forEach(a=>{const f=Nn(y,I.id,a);f&&lt(f.id)})},[y,o,lt,I,me]),e.useEffect(()=>{const a=Yo(I);if(a===bt.current)return;bt.current=a;const f={id:++Ft.current,color:a};Bt(g=>[g[g.length-1],f]),We.current&&window.clearTimeout(We.current),We.current=window.setTimeout(()=>{Bt(g=>g.slice(-1)),We.current=null},An)},[I,I?.background_b,I?.background_g,I?.background_r]);const Ct=e.useCallback(a=>{if(qe.current===a)return Promise.resolve();const f=je.current;return f&&f.finish(),new Promise(g=>{let k=!1;const O=()=>{k||(k=!0,window.clearTimeout(J),je.current?.finish===O&&(je.current=null),g())},J=window.setTimeout(O,Xo);je.current={bookId:a,finish:O,timeout:J}})},[]),Kt=e.useCallback(a=>{qe.current=a;const f=je.current;f?.bookId===a&&f.finish()},[]);e.useEffect(()=>{fe.current=j},[j]),e.useEffect(()=>{I&&Qn({eventName:"book_open",targetType:"book",targetId:I.slug})},[I]);const he=e.useCallback(()=>{Be.current&&(window.clearTimeout(Be.current),Be.current=null)},[]),xt=e.useCallback((a=!1)=>{he();const f=a?gr:Mr,g=a?xn:wn;ye(a),q("outside"),Be.current=window.setTimeout(()=>{$.current&&(q("entering"),Be.current=window.setTimeout(()=>{$.current&&(q("visible"),ye(!1),Nt(Ne.current),Ne.current=null,Be.current=null)},g+Dn))},f)},[he]);e.useEffect(()=>{$.current=!0;const a=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{$.current&&F(!0)})});return()=>{$.current=!1,L.current?.abort(),window.cancelAnimationFrame(a),Be.current&&window.clearTimeout(Be.current),We.current&&window.clearTimeout(We.current),je.current&&(window.clearTimeout(je.current.timeout),je.current.finish())}},[]),e.useEffect(()=>{let a=!0;return(async()=>{z(!0),W(null);try{const g=await Yr();if(!a)return;v(g),ce(null),g.some(k=>k.id===fe.current)||(B(null),fe.current=null,ee([]))}catch(g){if(a){const k=Wr();v([k]),fe.current!==k.id&&(B(null),fe.current=null,ee([])),ce(`${hn(g)} Stai sfogliando il quaderno incluso nel sito, in sola lettura.`)}}finally{a&&z(!1)}})(),()=>{a=!1}},[le]);const nt=e.useCallback(async a=>{try{return await or(a)}catch{return ce("Il libro è disponibile, ma i commenti non sono raggiungibili. Puoi riprovare la connessione."),[]}},[]);e.useEffect(()=>{if(!j||un(j))return;let a=!0,f=0;const g=k=>{const O=k.detail?.bookId;if(O&&O!==j)return;const J=++f;or(j).then(Pe=>{a&&J===f&&fe.current===j&&R(Pe)}).catch(()=>{a&&ce("Le modifiche ai commenti sono salvate, ma non è stato possibile aggiornare l’anteprima. Riprova la connessione.")})};return window.addEventListener("book-comments-changed",g),()=>{a=!1,window.removeEventListener("book-comments-changed",g)}},[j]);const Pt=e.useCallback(async a=>{if(!oe.current){oe.current=!0,re(!0),W(null);try{const[f,g]=await Promise.all([ln(a.id),nt(a.id)]),k=_n(Le.current,a.slug,f.length),O=k.page;if(await vr(f,O),!$.current)return;qe.current=null;const J=Ct(a.id);if(pt.flushSync(()=>{ye(!1),q("outside"),B(a.id),fe.current=a.id,ee(f),R(g),ke(O)}),Tt(a.slug,O),Et.current.set(a.id,f),Ne.current=o==="sketches"&&k.autoOpen?a.id:null,re(!1),await J,!$.current)return;xt()}catch(f){$.current&&(W(hn(f)),re(!1))}finally{oe.current=!1}}},[nt,o,xt,Ct]),Ie=e.useCallback(async(a,f,g)=>{if($.current){if(H.current){if(Fe.current===a.id){N(!1);return}ht.current={book:a,updateRoute:f},L.current?.abort(),N(!1);return}if(fe.current===a.id){N(!1);return}if(H.current=!0,xe(!0),re(!0),N(!1),W(null),ce(null),Nt(null),o==="sketches"&&fe.current){const k=new AbortController;L.current=k,Fe.current=a.id;try{const[O,J]=await Promise.all([ln(a.id),nt(a.id)]),Pe=_n(Le.current,a.slug,O.length);if(await Ao(O,Pe.page,k.signal),!$.current||k.signal.aborted)return;const se=y.findIndex(Ue=>Ue.id===fe.current),pe=y.findIndex(Ue=>Ue.id===a.id),ge=g??(pe<se?-1:1);qe.current=null;const Te=Ct(a.id),Vt=()=>{je.current?.bookId===a.id&&je.current.finish()};k.signal.addEventListener("abort",Vt,{once:!0}),pt.flushSync(()=>yt({book:a,pages:O,comments:J,page:Pe.page,autoOpen:Pe.autoOpen,direction:ge}));try{await Te}finally{k.signal.removeEventListener("abort",Vt)}if(!$.current||k.signal.aborted)return;if(qe.current!==a.id)throw new Error("Il libro sta ancora preparando le immagini. Riprova: il libro corrente resta aperto.");if(!await St.current?.commit(ge)||!$.current||k.signal.aborted)return;pt.flushSync(()=>{fe.current=a.id,B(a.id),ee(O),R(J),ke(Pe.page),q("visible"),ye(!1),yt(null),re(!1)}),Et.current.set(a.id,O),Le.current=hr(Le.current,a.slug,Pe.page),ct.current={slug:a.slug,pageIndex:Pe.page},Tt(a.slug,Pe.page),f&&m?.(a.slug),Nt(Pe.autoOpen?a.id:null)}catch(O){$.current&&!k.signal.aborted&&ce(hn(O))}finally{if($.current&&fe.current!==a.id&&(await St.current?.reset(),yt(null)),k.abort(),L.current===k&&(L.current=null,Fe.current=null),H.current=!1,$.current){xe(!1),re(!1);const O=ht.current;ht.current=null,O&&O.book.id!==fe.current&&window.setTimeout(()=>st.current?.(O.book,O.updateRoute),24)}}return}try{he(),ye(!0),q("leaving");const k=ln(a.id).then(async pe=>(await vr(pe),pe)),O=nt(a.id),[J,Pe]=await Promise.all([k,O,ot(wr)]);if(!$.current)return;qe.current=null;const se=Ct(a.id);if(pt.flushSync(()=>{ye(!0),q("outside"),B(a.id),fe.current=a.id,ee(J),R(Pe),ke(0),re(!1)}),ct.current={slug:a.slug,pageIndex:0},Tt(a.slug,0),f&&m?.(a.slug),await xr(),await xr(),await se,await ot(gr),!$.current)return;q("entering"),await ot(wr),$.current&&(q("visible"),ye(!1))}catch(k){$.current&&(W(hn(k)),re(!1),ye(!1),q("visible"))}finally{if(H.current=!1,$.current){xe(!1);const k=ht.current;ht.current=null,k&&k.book.id!==fe.current&&window.setTimeout(()=>{st.current?.(k.book,k.updateRoute)},24)}}}},[he,y,nt,o,m,Ct]);e.useEffect(()=>{st.current=(a,f)=>{Ie(a,f)}},[Ie]),e.useEffect(()=>{if(Q||y.length===0)return;const a=tt.current!==n;tt.current=n;const f=n?y.find(g=>g.slug===n):null;if(!j){const g=y.find(J=>J.is_featured),k=y.find(J=>J.slug===ct.current?.slug),O=f??k??g??y[0];Pt(O);return}f&&f.id!==j&&a&&Ie(f,!1)},[y,n,Pt,Q,j,Ie]);const He=e.useCallback(async()=>{!P||H.current||(H.current=!0,xe(!0),l("leaving"),await ot(jt),$.current&&(K(!1),l("outside"),xt(),await ot($o),H.current=!1,$.current&&xe(!1)))},[P,xt]);e.useEffect(()=>{const a=f=>{if(f.key==="Escape"){if(P){He();return}N(!1)}};return window.addEventListener("keydown",a),()=>{window.removeEventListener("keydown",a)}},[He,P]);const vn=async()=>{if(!H.current){if(N(!1),P){await He();return}H.current=!0,xe(!0),Pr(),!(I&&(he(),q("leaving"),await ot(jt),!$.current))&&(K(!0),l("outside"),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{$.current&&l("entering")})}),await ot(jt),H.current=!1,$.current&&(l("visible"),xe(!1)))}},Gt=async()=>{if(P){await He();return}if(H.current&&o==="sketches"&&L.current){L.current.abort(),i();return}H.current||(H.current=!0,xe(!0),N(!1),F(!1),he(),q("leaving"),I&&Tt(I.slug,at),o==="legacy"&&(window.sessionStorage.setItem(er,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.setItem(tr,"true"),window.sessionStorage.removeItem("returnFromExample")),await ot(jt),$.current&&i())},Zt=async()=>{!P||H.current||(H.current=!0,xe(!0),N(!1),F(!1),l("leaving"),I&&Tt(I.slug,at),window.sessionStorage.setItem(er,"true"),window.sessionStorage.setItem(tr,"true"),window.sessionStorage.removeItem("revealDone"),window.sessionStorage.removeItem("returnFromExample"),await ot(jt),$.current&&i())},$t=async()=>{if(H.current)return;ae("models"),H.current=!0,xe(!0),N(!1),P?l("leaving"):(he(),q("leaving")),I&&Tt(I.slug,at);const a=Bn().catch(()=>null);await Promise.all([ot(jt),a]),$.current&&d()},Jt=a=>{Ie(a,!0)},yn=e.useCallback(async a=>{if(!I||!p)throw new Error("Administrator login required.");const f=await Ur({title:a.title,bookId:I.id,bookPageId:a.bookPageId,body:a.body,anchorX:a.anchorX,anchorY:a.anchorY,backgroundColor:a.backgroundColor,textColor:a.textColor,backgroundOpacity:a.backgroundOpacity,fontSize:a.fontSize,richContent:a.richContent});$.current&&fe.current===I.id&&R(g=>[...g.filter(k=>k.id!==f.id),f])},[p,I]),Qt=e.useCallback(async(a,f)=>{if(!p||!I)throw new Error("Administrator login required.");const g=await Kr(a,f);$.current&&fe.current===I.id&&R(k=>{const O=k.filter(J=>J.id!==g.id);return g.is_visible?[...O,g]:O})},[p,I]),Xt=e.useCallback(async a=>{if(!p)throw new Error("Administrator login required.");await Gr(a),R(f=>f.filter(g=>g.id!==a))},[p]),kn=e.useCallback((a,f)=>{if(a!==fe.current)return;const g=y.find(k=>k.id===a);if(g&&(ke(f),g)){if(Rt.current?.bookId===g.id&&Rt.current.pageIndex===f)return;Rt.current={bookId:g.id,pageIndex:f},Le.current=hr(Le.current,g.slug,f),ct.current={slug:g.slug,pageIndex:f},Tt(g.slug,f),Qn({eventName:"book_page_view",targetType:"book_page",targetId:`${g.slug}:${f}`,valueInt:f})}},[y]),ut=`${me==="entering"?"is-entering":me==="visible"?"is-visible":me==="leaving"?"is-leaving":"is-outside"}${G?" is-fast":""}`,Ot=ue==="entering"?"is-entering":ue==="visible"?"is-visible":ue==="leaving"?"is-leaving":"is-outside",Se=b?C?"is-continuing":"is-visible":De||Ut?"is-leaving":"is-outside",Mt=b?"is-visible":De?"is-leaving":"is-outside",zt=a=>{const f=Et.current.get(a.id),g=_n(Le.current,a.slug,f?.length??0),k=g.page===0?0:g.page%2===0?g.page-1:g.page,O=f?f.slice(k,k+(g.page===0?1:2)).map(J=>J.public_url):Y[a.id]?.cover?[Y[a.id].cover.src]:[];return{book:a,previewUrls:O,edgeUrl:f?.[g.page]?.public_url||Y[a.id]?.cover?.src}},vt=(a,f,g,k,O,J=!1)=>c.jsx(Mo,{book:a,pages:f,comments:g,commentMode:X,canManageComments:p&&!un(a.id),initialPage:k,autoOpenOnActivate:J,controlsActive:a.id===j,bookMotionClassName:O,onBookPageChange:kn,onReady:Kt,onCreateComment:yn,onUpdateComment:Qt,onDeleteComment:Xt});return c.jsxs("div",{className:`public-book-shell ${o==="sketches"?"is-sketches":""} fixed inset-x-0 top-0 z-[90] isolate overflow-hidden bg-white text-black`,style:{backgroundColor:wt[0]?.color??"rgb(255 255 255)"},children:[c.jsx("style",{children:Vo}),c.jsx("div",{className:"pointer-events-none fixed inset-0 z-0 overflow-hidden","aria-hidden":"true",children:wt.map((a,f)=>c.jsx("div",{className:`public-book-background-layer ${f===wt.length-1?"is-current":"is-previous"}`,style:{backgroundColor:a.color}},a.id))}),h&&!P&&c.jsx("button",{type:"button","aria-label":"Close book list",className:"fixed inset-0 z-[141] cursor-default bg-black/0",onClick:()=>N(!1)}),o==="sketches"&&c.jsxs(Jr,{section:"sketches",title:T?.label??"SKETCHES",onIndex:()=>void Gt(),children:[p&&c.jsxs(c.Fragment,{children:[I&&!un(I.id)&&c.jsx("button",{type:"button",onClick:()=>Z(a=>!a),"aria-label":"Annota le pagine","aria-pressed":X,children:"✎"}),c.jsx("button",{type:"button",className:"sketches-admin",onClick:s,"aria-label":"Gestisci libri",children:"edit"})]}),S.editing?c.jsx("input",{className:"section-title-input","aria-label":"Testo Book List",value:S.draft.sketches_book_list_label??"Book List",onChange:a=>S.update({sketches_book_list_label:a.target.value})}):c.jsx("button",{type:"button",onClick:()=>N(a=>!a),"aria-label":h?"Chiudi selezione libri":"Scegli libro","aria-expanded":h,"aria-controls":"public-book-library",children:M.sketches_book_list_label||"Book List"})]}),X&&p&&I&&!un(I.id)&&c.jsxs("aside",{"data-book-comment-ui":"true","data-blossom":!0,className:"book-comment-mode-indicator blossom",role:"status",children:[c.jsx("span",{children:"tocca la pagina per aggiungere un commento"}),c.jsx("button",{type:"button",onClick:()=>Z(!1),children:"fine"})]}),o==="legacy"&&c.jsxs("div",{className:`public-book-nav fixed ${P?"z-[190]":"z-[170]"}`,children:[c.jsx("div",{className:`public-nav-item ${Se}`,style:{"--public-nav-delay":"0ms","--public-nav-exit-delay":"180ms"},children:c.jsx("button",{type:"button",onClick:()=>void(P?Zt():Gt()),disabled:De,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"navigate",className:"public-book-control-column disabled:pointer-events-none disabled:opacity-40","aria-label":"Navigate",children:c.jsx("span",{children:"NAVIGATE"})})}),c.jsx("div",{className:`public-nav-item ${Se}`,style:{"--public-nav-delay":"70ms","--public-nav-exit-delay":"120ms"},children:c.jsxs("button",{type:"button",onClick:()=>{if(ae("library"),P){He();return}N(a=>!a)},disabled:De,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"library",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${!P&&h&&de==="library"?"is-active":""}`,"aria-label":"Choose a book","aria-expanded":h,"aria-controls":"public-book-library",children:[c.jsx("span",{children:"LIBRARY"}),c.jsx("i",{"aria-hidden":"true",className:`public-book-library-plus ${b&&!P&&de==="library"?"is-visible":"is-hidden"}`,children:"+"})]})}),c.jsx("div",{className:`public-nav-item ${Se}`,style:{"--public-nav-delay":"140ms","--public-nav-exit-delay":"60ms"},children:c.jsx("button",{type:"button",onClick:()=>void vn(),disabled:De,"data-analytics-event":"navigation_click","data-analytics-type":"navigation","data-analytics-id":"login",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${P?"is-active":""}`,"aria-expanded":P,"aria-label":"Login",children:c.jsx("span",{children:c.jsx(Do,{text:"LOGIN"})})})}),c.jsx("div",{className:`public-nav-item ${Se}`,style:{"--public-nav-delay":"210ms","--public-nav-exit-delay":"0ms"},children:c.jsx("button",{type:"button",onClick:()=>void $t(),onPointerEnter:()=>void Bn(),onFocus:()=>void Bn(),disabled:De,"data-analytics-event":"model_open","data-analytics-type":"model","data-analytics-id":"models",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${!P&&de==="models"?"is-active":""}`,children:c.jsx("span",{children:"MODELS"})})}),p&&!P&&c.jsx("div",{className:`public-nav-item ${Se}`,style:{"--public-nav-delay":"280ms","--public-nav-exit-delay":"0ms"},children:c.jsx("button",{type:"button",onClick:()=>Z(a=>!a),disabled:De||P,"data-analytics-event":"navigation_click","data-analytics-type":"interface","data-analytics-id":"comment-mode",className:`public-book-control-column disabled:pointer-events-none disabled:opacity-40 ${X?"is-active":""}`,"aria-pressed":X,"aria-label":"Comment on book pages",children:c.jsx("span",{children:"COMMENT"})})})]}),c.jsxs("aside",{id:"public-book-library",className:`public-library-drawer fixed z-[150] flex flex-col ${h&&!P?"is-open pointer-events-auto":"pointer-events-none"}`,"aria-hidden":!h||P,children:[o==="legacy"&&c.jsx("button",{type:"button",tabIndex:h&&!P?0:-1,onClick:()=>N(!1),"data-analytics-event":"navigation_click","data-analytics-type":"interface","data-analytics-id":"library-close",className:"absolute right-5 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 sm:right-8","aria-label":"Close book list",children:"×"}),c.jsx("div",{ref:A,className:"public-book-scroll min-h-0 flex-1 overflow-y-auto",children:Q?c.jsx("p",{className:"py-6 text-center text-[14px] text-black/50",children:"..."}):y.length===0?c.jsx("p",{className:"py-6 text-center text-[14px] leading-relaxed text-black/55",children:"No published books are available yet."}):y.map(a=>{const f=a.id===j,g=h&&Ae.has(a.id)?Y[a.id]:void 0;return c.jsxs("button",{"data-preview-book-id":a.id,type:"button",tabIndex:h&&!P?0:-1,onClick:()=>Jt(a),"data-analytics-event":"navigation_click","data-analytics-type":"book","data-analytics-id":a.slug,className:`public-library-book-row ${f?"is-selected":""}`,children:[c.jsxs("span",{className:"public-library-open-book","aria-hidden":"true",children:[c.jsx("span",{children:g?.lastPage&&c.jsx("img",{src:g.lastPage.src,alt:"",draggable:!1,loading:"lazy",decoding:"async",onError:k=>{k.currentTarget.dataset.fallbackApplied||(k.currentTarget.dataset.fallbackApplied="true",k.currentTarget.src=g.lastPage?.fallback??"")}})}),c.jsx("span",{children:g?.cover&&c.jsx("img",{src:g.cover.src,alt:"",draggable:!1,loading:"lazy",decoding:"async",onError:k=>{k.currentTarget.dataset.fallbackApplied||(k.currentTarget.dataset.fallbackApplied="true",k.currentTarget.src=g.cover?.fallback??"")}})})]}),c.jsxs("span",{className:"public-library-book-copy min-w-0",children:[c.jsx("h2",{children:a.title}),a.description&&c.jsx("p",{children:a.description})]})]},a.id)})})]}),c.jsx("main",{className:"public-book-main relative z-10 flex h-full w-full items-center justify-center overflow-hidden",children:Q||ie&&!I?c.jsx("div",{"data-blossom":!0,className:`public-route-message ${Mt}`,children:"..."},"books-loading"):V?c.jsxs("div",{"data-blossom":!0,className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-red-700 p-5 text-center text-red-700 ${Mt}`,children:[c.jsx("p",{role:"alert",children:V}),c.jsx("button",{type:"button",className:"mt-4",onClick:()=>{B(null),fe.current=null,Ce(a=>a+1)},children:"Riprova"})]},"books-error"):y.length===0?c.jsx("div",{"data-blossom":!0,className:`public-route-message mx-6 max-w-lg rounded-[28px] border border-black/20 p-6 text-center leading-relaxed ${Mt}`,children:"No books are public yet."},"books-empty"):I?c.jsx("div",{className:"h-full w-full",children:c.jsx("div",{className:`public-book-surface flex h-full w-full items-center justify-center ${P?"is-login-muted":""}`,children:o==="sketches"?c.jsx(zo,{ref:St,active:zt(I),previous:(()=>{const a=Nn(y,I.id,-1);return a?zt(a):null})(),next:(()=>{const a=Nn(y,I.id,1);return a?zt(a):null})(),disabled:P||h||X||De||me!=="visible",locked:De,incoming:et?{choice:zt(et.book),direction:et.direction,content:vt(et.book,et.pages,et.comments,et.page,"is-visible")}:null,onSelect:(a,f)=>void Ie(a,!0,f),children:vt(I,D,E,at,ut,mt===I.id&&!De&&!h&&!P&&!X)}):vt(I,D,E,at,ut)})}):null}),be&&!P&&c.jsxs("div",{className:"public-book-service-notice",role:"status",children:[c.jsx("p",{children:be}),c.jsx("button",{type:"button",disabled:Q||ie,onClick:()=>Ce(a=>a+1),children:Q?"Connessione…":"Riprova connessione"})]}),P&&c.jsx("div",{className:`public-login-stage fixed inset-0 z-[180] overflow-hidden bg-white ${Ot}`,"aria-hidden":ue==="outside"||ue==="leaving",children:c.jsx(e.Suspense,{fallback:null,children:c.jsx(Lo,{embedded:!0,surfaceReady:ue==="entering"||ue==="visible",onBack:()=>void He(),onNavigate:()=>void Zt(),onLibrary:()=>void He(),onModels:()=>void $t()})})})]})}export{ei as default};
