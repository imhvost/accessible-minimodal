"use strict";var x=Object.defineProperty;var A=(a,t,i)=>t in a?x(a,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[t]=i;var p=(a,t,i)=>(A(a,typeof t!="symbol"?t+"":t,i),i);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const w={animationDuration:400,classes:{modal:"modal",wrapp:"modal-wrapp",body:"modal-body",active:"active",open:"open",close:"close"},disableScroll:!0,focus:{use:!0,selectors:["button:not([disabled])","[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])",'[tabindex]:not([tabindex="-1"])','[contenteditable="true"]']},hash:{open:!1,add:!1,remove:!1},multiple:{use:!1,closePrevModal:!1},on:{beforeOpen:()=>({}),afterOpen:()=>({}),beforeClose:()=>({}),afterClose:()=>({})},outsideClose:!0,style:{use:!1,width:400,valign:"center",animation:"from-bottom"},triggersAttrs:{open:"data-modal-open",close:"data-modal-close",closeAll:"data-modal-close-all"}},B=a=>{const{modal:t,wrapp:i,body:s,active:o,open:n,close:l}=a.classNames,e="--accessible-minimodal",r=h=>{switch(h){case"top":return"0 auto auto";case"bottom":return"auto auto 0";default:return"auto"}},d=h=>{switch(h){case"from-top":return`translateY( calc(var(${e}-translate) * -1) )`;case"from-left":return`translateX( calc(var(${e}-translate) * -1) )`;case"from-right":return`translateX(var(${e}-translate))`;case"zoom-in":return"scale(.8)";case"zoom-out":return"scale(1.2)";case"fade":return"none";default:return`translateY(var(${e}l-translate))`}},c=r(a.margin??""),f=d(a.transform??"");return`
:root{
${e}-color: #333;
${e}-bg: #fff;
${e}-filter: rgba(0, 0, 0, .7);
${e}-z-index: 666666;
${e}-padding: 40px;
${e}-border-radius: 4px;
${e}-translate: 20px;
${e}-scale-in: .8;
${e}-scale-out: 1.2;
}
.${t} {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(${e}-z-index);
}
.${t}:not(.${o}) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.${t}.${n},
.${t}.${l} {
  transition: opacity ${a.animationDuration}, visibility ${a.animationDuration};
}
.${t}.open .${s},
.${t}.close .${s} {
  transition: transform 0.4s;
}
.${t}.${o} .${s} {
  transform: none;
}
.${i} {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: var(${e}-filter);
  padding: var(${e}-padding) calc(${e}-padding / 2);
  overflow-y: scroll;
}
.${s} {
  background-color: var(${e}-bg);
  color: var(${e}-color);
  flex: none;
  min-height: 1px;
  border-radius: var(${e}-border-radius);
  width: ${a.width}px;
  max-width: 100%;
  margin: ${c};
  padding: var(${e}-padding);
  transform: ${f};
  position: relative;
}
.${s} > ${a.closeSelector} {
  position: absolute;
  right: calc(var(${e}-padding) / 4);
  top: calc(var(${e}-padding) / 4);
  width: calc(var(${e}-padding) / 2);
  height: calc(var(${e}-padding) / 2);
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 0;
}
.${s} > ${a.closeSelector}:before,
.${s} > ${a.closeSelector}:after {
  content: '';
  position: absolute;
  width: 16px;
  top: 50%;
  left: 50%;
  right: 0;
  margin: -1px 0 0 -8px;
  background-color: currentColor;
  height: 2px;
}
.${s} > ${a.closeSelector}:before {
  transform: rotate(45deg);
}
.${s} ${a.closeSelector}:after {
  transform: rotate(-45deg);
}
`.replace(/\s*([:;,{}])\s*/g,"$1")};class E{constructor(t=w){p(this,"config");p(this,"modal");p(this,"openBtn");p(this,"modals");p(this,"focusBtns");p(this,"animated");for(const[i,s]of Object.entries(t)){const o=i;if(s===void 0){delete t[o];continue}if(typeof s=="object"){const n={...s};for(const[l,e]of Object.entries(n)){const r=l;e===void 0&&delete n[r]}t[o]={...n}}}this.config=Object.assign({},w,t),Object.keys(t).map(i=>{const s=i;typeof t[s]=="object"&&(this.config[s]=Object.assign({},w[s],t[s]))}),this.modal=null,this.openBtn=null,this.modals=[],this.focusBtns=[],this.animated=!1,this.init(),this.addTriggers()}init(){var t,i;if((t=this.config.style)!=null&&t.use&&this.addStyles(),(i=this.config.hash)!=null&&i.open){const s=window.location.hash.substring(1)??"";s&&(this.modal=document.getElementById(s),this.openModal())}}addTriggers(){document.addEventListener("click",t=>{var s,o,n,l,e,r,d;const i=c=>{const f=t.target;return f.getAttribute(c)?f:f.closest(`[${c}]`)};if(this.openBtn=i(((s=this.config.triggersAttrs)==null?void 0:s.open)??""),this.openBtn&&(t.preventDefault(),this.modal=document.getElementById(this.openBtn.getAttribute(((o=this.config.triggersAttrs)==null?void 0:o.open)??"")??""),this.focusBtns.push(this.openBtn),this.openModal()),i(((n=this.config.triggersAttrs)==null?void 0:n.close)??"")&&(t.preventDefault(),this.closeModal()),i(((l=this.config.triggersAttrs)==null?void 0:l.closeAll)??"")&&(t.preventDefault(),this.closeAllModals()),this.config.outsideClose){const c=t.target;this.modal&&c.classList.contains(((e=this.config.classes)==null?void 0:e.wrapp)??"")&&!((d=document==null?void 0:document.activeElement)!=null&&d.closest("."+((r=this.config.classes)==null?void 0:r.body)))&&(t.preventDefault(),this.closeModal(this.modal))}})}openModal(t,i=!0){var o;if(this.animated)return;if(t&&(typeof t=="string"?this.modal=document.querySelector(t):this.modal=t,i&&this.focusBtns.push(null)),!this.modal){console.warn("Modal HTMLElement not found"),this.animated=!1;return}let s=0;(o=this.config.multiple)!=null&&o.use?(this.modals.length&&document.removeEventListener("keydown",this.onKeydown),this.config.multiple.closePrevModal&&this.modals.length&&(this.closeModal(this.modals[this.modals.length-1],!1),i&&(s=this.config.animationDuration??0))):this.modals.length&&(this.closeModal(this.modals[this.modals.length-1]),i&&(s=this.config.animationDuration??0)),setTimeout(()=>{var n,l,e,r,d,c,f,y;if(this.animated=!0,(n=this.config.on)!=null&&n.beforeOpen&&this.config.on.beforeOpen(this),(e=this.modal)==null||e.classList.add(((l=this.config.classes)==null?void 0:l.open)??""),this.modal&&this.modals.push(this.modal),(r=this.config.hash)!=null&&r.add&&((d=this.modal)!=null&&d.id)&&window.history.replaceState("",location.href,"#"+this.modal.id),this.config.disableScroll){const h=this.getScrollbarWidth(),m=document.querySelector("html"),g=document.querySelector("body");m.style.overflow="hidden",m.style.paddingInlineEnd=`${h}px`,g.style.overflow="hidden"}(f=this.modal)==null||f.classList.add(((c=this.config.classes)==null?void 0:c.active)??""),(y=this.modal)==null||y.setAttribute("aria-hidden","false"),setTimeout(()=>{var h,m,g,u,b,S;if(document.addEventListener("keydown",this.onKeydown.bind(this)),(h=this.config.focus)!=null&&h.use&&this.config.focus.selectors){const v=(m=this.modal)==null?void 0:m.querySelectorAll(this.config.focus.selectors.join(", "));if(v){let $=v[0];$.hasAttribute(((g=this.config.triggersAttrs)==null?void 0:g.close)??"")&&v.length>1&&($=v[1]),$==null||$.focus()}}(b=this.modal)==null||b.classList.remove(((u=this.config.classes)==null?void 0:u.open)??""),this.animated=!1,(S=this.config.on)!=null&&S.afterOpen&&this.config.on.afterOpen(this)},this.config.animationDuration)},s)}closeModal(t,i=!0,s=!1){var l,e,r,d,c;if(this.animated&&!s)return;this.animated=!0;let o=null;if(t?typeof t=="string"?o=document.querySelector(t):o=t:this.modal&&(o=this.modal),!o){this.animated=!1;return}const n=this.modals.findIndex(f=>f.isSameNode(o));i&&this.modals.splice(n,1),(l=this.config.on)!=null&&l.beforeClose&&this.config.on.beforeClose(this),o.classList.add(((e=this.config.classes)==null?void 0:e.close)??""),o.classList.remove(((r=this.config.classes)==null?void 0:r.active)??""),o.setAttribute("aria-hidden","true"),document.removeEventListener("keydown",this.onKeydown),(d=this.config.hash)!=null&&d.remove&&window.history.replaceState("",location.href,location.pathname+location.search),(c=this.config.multiple)!=null&&c.use&&i?this.modals.length?this.modal=this.modals[this.modals.length-1]:this.modal=null:o!=null&&o.isSameNode(this.modal)&&(this.modal=null),setTimeout(()=>{var f,y,h,m,g;if(o==null||o.classList.remove(((f=this.config.classes)==null?void 0:f.close)??""),this.config.disableScroll&&!this.modals.length){const u=document.querySelector("html"),b=document.querySelector("body");u.style.removeProperty("overflow"),u.style.removeProperty("paddingInlineEnd"),b.style.removeProperty("overflow")}if(this.animated=!1,(y=this.config.multiple)!=null&&y.use&&((h=this.config.multiple)!=null&&h.closePrevModal)&&i&&!s&&this.modals.length&&this.openModal(this.modals.pop(),!1),(m=this.config.focus)!=null&&m.use&&this.focusBtns.length)if(s){const u=this.focusBtns.find(b=>b!==null);u&&(u.focus(),this.focusBtns=[])}else{const u=this.focusBtns[n];u&&(u.focus(),i&&this.focusBtns.splice(n,1))}(g=this.config.on)!=null&&g.afterClose&&this.config.on.afterClose(this)},this.config.animationDuration)}closeAllModals(){this.modals.length&&this.modals.forEach(t=>{this.closeModal(t,!0,!0),this.modals=[]})}getScrollbarWidth(){return window.screen.width-document.documentElement.clientWidth===0?0:window.innerWidth-document.documentElement.clientWidth}onKeydown(t){this.modal&&(t.key==="Escape"&&this.closeModal(this.modal),t.key==="Tab"&&this.changeFocus(t))}changeFocus(t){var l,e;if(!((l=this.config.focus)!=null&&l.selectors))return;const i=(e=this.modal)==null?void 0:e.querySelectorAll(this.config.focus.selectors.join(", "));if(!i)return;const s=i[0],o=i[i.length-1],n=t.target;t.shiftKey?n.isEqualNode(s)&&(o.focus(),t.preventDefault()):n.isEqualNode(o)&&(s.focus(),t.preventDefault())}addStyles(){var n,l,e,r,d;const t={...this.config.classes},i=this.config.animationDuration+"ms",s=`[${(n=this.config.triggersAttrs)==null?void 0:n.close}]`,o=B({classNames:t,animationDuration:i,margin:(l=this.config.style)==null?void 0:l.valign,transform:(e=this.config.style)==null?void 0:e.animation,closeSelector:s,width:(r=this.config.style)==null?void 0:r.width});document.head.insertAdjacentHTML("beforeend",`<style>${o}</style>`),document.querySelectorAll("."+((d=this.config.classes)==null?void 0:d.modal)).forEach(c=>{c.style.removeProperty("display")})}}exports.AccessibleMinimodal=E;
