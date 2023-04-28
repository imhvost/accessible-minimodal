"use strict";var x=Object.defineProperty;var B=(n,t,i)=>t in n?x(n,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[t]=i;var p=(n,t,i)=>(B(n,typeof t!="symbol"?t+"":t,i),i);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const S={animationDuration:400,classes:{modal:"modal",wrapp:"modal-wrapp",body:"modal-body",active:"active",open:"open",close:"close"},disableScroll:!0,focus:{use:!0,selectors:["button:not([disabled])","[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])",'[tabindex]:not([tabindex="-1"])','[contenteditable="true"]']},hash:{open:!1,add:!1,remove:!1},multiple:{use:!1,closePrevModal:!1},on:{beforeOpen:()=>({}),afterOpen:()=>({}),beforeClose:()=>({}),afterClose:()=>({})},outsideClose:!0,style:{use:!1,width:400,valign:"center",animation:"from-bottom"},triggersAttrs:{open:"data-modal-open",close:"data-modal-close",closeAll:"data-modal-close-all"}},A=n=>{const{modal:t,wrapp:i,body:e,active:s,open:o,close:a}=n.classNames,l=m=>{switch(m){case"top":return"0 auto auto";case"bottom":return"auto auto 0";default:return"auto"}},c=m=>{switch(m){case"from-top":return"translateY( calc(var(--accessible-minimodal-translate) * -1) )";case"from-left":return"translateX( calc(var(--accessible-minimodal-translate) * -1) )";case"from-right":return"translateX(var(--accessible-minimodal-translate))";case"zoom-in":return"scale(.8)";case"zoom-out":return"scale(1.2)";case"fade":return"none";default:return"translateY(var(--accessible-minimodal-translate))"}},d=l(n.margin??""),r=c(n.transform??"");return`
:root{
  --accessible-minimodal-color: #333;
  --accessible-minimodal-bg: #fff;
  --accessible-minimodal-filter: rgba(0, 0, 0, .7);
  --accessible-minimodal-z-index: 666666;
  --accessible-minimodal-padding: 40px;
  --accessible-minimodal-border-radius: 4px;
  --accessible-minimodal-translate: 20px;
  --accessible-minimodal-scale-in: .8;
  --accessible-minimodal-scale-out: 1.2;
}
.${t} {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--accessible-minimodal-z-index);
}
.${t}:not(.${s}) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.${t}.${o},
.${t}.${a} {
  transition: opacity ${n.animationDuration}, visibility ${n.animationDuration};
}
.${t}.open .${e},
.${t}.close .${e} {
  transition: transform 0.4s;
}
.${t}.${s} .${e} {
  transform: none;
}
.${i} {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: var(--accessible-minimodal-filter);
  padding: var(--accessible-minimodal-padding) calc(--accessible-minimodal-padding / 2);
  overflow-y: scroll;
}
.${e} {
  background-color: var(--accessible-minimodal-bg);
  color: var(--accessible-minimodal-color);
  flex: none;
  min-height: 1px;
  border-radius: var(--accessible-minimodal-border-radius);
  width: ${n.width}px;
  max-width: 100%;
  margin: ${d};
  padding: var(--accessible-minimodal-padding);
  transform: ${r};
  position: relative;
}
.${e} > ${n.closeSelector} {
  position: absolute;
  right: calc(var(--accessible-minimodal-padding) / 4);
  top: calc(var(--accessible-minimodal-padding) / 4);
  width: calc(var(--accessible-minimodal-padding) / 2);
  height: calc(var(--accessible-minimodal-padding) / 2);
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 0;
}
.${e} > ${n.closeSelector}:before,
.${e} > ${n.closeSelector}:after {
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
.${e} > ${n.closeSelector}:before {
  transform: rotate(45deg);
}
.${e} ${n.closeSelector}:after {
  transform: rotate(-45deg);
}
`.replace(/\s*([:;,{}])\s*/g,"$1")};class E{constructor(t){p(this,"config");p(this,"modal");p(this,"openBtn");p(this,"modals");p(this,"focusBtns");p(this,"animated");for(const[i,e]of Object.entries(t)){const s=i;if(e===void 0){delete t[s];continue}if(typeof e=="object"){const o={...e};for(const[a,l]of Object.entries(o)){const c=a;l===void 0&&delete o[c]}t[s]={...o}}}this.config=Object.assign({},S,t),Object.keys(t).map(i=>{const e=i;typeof t[e]=="object"&&(this.config[e]=Object.assign({},S[e],t[e]))}),this.modal=null,this.openBtn=null,this.modals=[],this.focusBtns=[],this.animated=!1,this.init(),this.addTriggers()}init(){var t,i;if((t=this.config.style)!=null&&t.use&&this.addStyles(),(i=this.config.hash)!=null&&i.open){const e=window.location.hash.substring(1)??"";e&&(this.modal=document.getElementById(e),this.openModal())}}addTriggers(){document.addEventListener("click",t=>{var e,s,o,a,l,c,d;const i=r=>{const f=t.target;return f.getAttribute(r)?f:f.closest(`[${r}]`)};if(this.openBtn=i(((e=this.config.triggersAttrs)==null?void 0:e.open)??""),this.openBtn&&(t.preventDefault(),this.modal=document.getElementById(this.openBtn.getAttribute(((s=this.config.triggersAttrs)==null?void 0:s.open)??"")??""),this.focusBtns.push(this.openBtn),this.openModal()),i(((o=this.config.triggersAttrs)==null?void 0:o.close)??"")&&(t.preventDefault(),this.closeModal()),i(((a=this.config.triggersAttrs)==null?void 0:a.closeAll)??"")&&(t.preventDefault(),this.closeAllModals()),this.config.outsideClose){const r=t.target;this.modal&&r.classList.contains(((l=this.config.classes)==null?void 0:l.wrapp)??"")&&!((d=document==null?void 0:document.activeElement)!=null&&d.closest("."+((c=this.config.classes)==null?void 0:c.body)))&&(t.preventDefault(),this.closeModal(this.modal))}})}openModal(t,i=!0){var s;if(this.animated)return;if(t&&(typeof t=="string"?this.modal=document.querySelector(t):this.modal=t,i&&this.focusBtns.push(null)),!this.modal){console.warn("Modal HTMLElement not found"),this.animated=!1;return}let e=0;(s=this.config.multiple)!=null&&s.use?(this.modals.length&&document.removeEventListener("keydown",this.onKeydown),this.config.multiple.closePrevModal&&this.modals.length&&(this.closeModal(this.modals[this.modals.length-1],!1),i&&(e=this.config.animationDuration??0))):this.modals.length&&(this.closeModal(this.modals[this.modals.length-1]),i&&(e=this.config.animationDuration??0)),setTimeout(()=>{var o,a,l,c,d,r,f,m;if(this.animated=!0,(o=this.config.on)!=null&&o.beforeOpen&&this.config.on.beforeOpen(this),(l=this.modal)==null||l.classList.add(((a=this.config.classes)==null?void 0:a.open)??""),this.modal&&this.modals.push(this.modal),(c=this.config.hash)!=null&&c.add&&((d=this.modal)!=null&&d.id)&&window.history.replaceState("",location.href,"#"+this.modal.id),this.config.disableScroll){const g=this.getScrollbarWidth(),u=document.querySelector("html"),b=document.querySelector("body");u.style.overflow="hidden",u.style.paddingInlineEnd=`${g}px`,b.style.overflow="hidden"}(f=this.modal)==null||f.classList.add(((r=this.config.classes)==null?void 0:r.active)??""),(m=this.modal)==null||m.setAttribute("aria-hidden","false"),setTimeout(()=>{var g,u,b,h,y,$;if(document.addEventListener("keydown",this.onKeydown.bind(this)),(g=this.config.focus)!=null&&g.use&&this.config.focus.selectors){const w=(u=this.modal)==null?void 0:u.querySelectorAll(this.config.focus.selectors.join(", "));if(w){let v=w[0];v.hasAttribute(((b=this.config.triggersAttrs)==null?void 0:b.close)??"")&&w.length>1&&(v=w[1]),v==null||v.focus()}}(y=this.modal)==null||y.classList.remove(((h=this.config.classes)==null?void 0:h.open)??""),this.animated=!1,($=this.config.on)!=null&&$.afterOpen&&this.config.on.afterOpen(this)},this.config.animationDuration)},e)}closeModal(t,i=!0,e=!1){var a,l,c,d,r;if(this.animated&&!e)return;this.animated=!0;let s=null;if(t?typeof t=="string"?s=document.querySelector(t):s=t:this.modal&&(s=this.modal),!s){this.animated=!1;return}const o=this.modals.findIndex(f=>f.isSameNode(s));i&&this.modals.splice(o,1),(a=this.config.on)!=null&&a.beforeClose&&this.config.on.beforeClose(this),s.classList.add(((l=this.config.classes)==null?void 0:l.close)??""),s.classList.remove(((c=this.config.classes)==null?void 0:c.active)??""),s.setAttribute("aria-hidden","true"),document.removeEventListener("keydown",this.onKeydown),(d=this.config.hash)!=null&&d.remove&&window.history.replaceState("",location.href,location.pathname+location.search),(r=this.config.multiple)!=null&&r.use&&i?this.modals.length?this.modal=this.modals[this.modals.length-1]:this.modal=null:s!=null&&s.isSameNode(this.modal)&&(this.modal=null),setTimeout(()=>{var f,m,g,u,b;if(s==null||s.classList.remove(((f=this.config.classes)==null?void 0:f.close)??""),this.config.disableScroll&&!this.modals.length){const h=document.querySelector("html"),y=document.querySelector("body");h.style.removeProperty("overflow"),h.style.removeProperty("paddingInlineEnd"),y.style.removeProperty("overflow")}if(this.animated=!1,(m=this.config.multiple)!=null&&m.use&&((g=this.config.multiple)!=null&&g.closePrevModal)&&i&&!e&&this.modals.length&&this.openModal(this.modals.pop(),!1),(u=this.config.focus)!=null&&u.use&&this.focusBtns.length)if(e){const h=this.focusBtns.find(y=>y!==null);h&&(h.focus(),this.focusBtns=[])}else{const h=this.focusBtns[o];h&&(h.focus(),i&&this.focusBtns.splice(o,1))}(b=this.config.on)!=null&&b.afterClose&&this.config.on.afterClose(this)},this.config.animationDuration)}closeAllModals(){this.modals.length&&this.modals.forEach(t=>{this.closeModal(t,!0,!0),this.modals=[]})}getScrollbarWidth(){return window.screen.width-document.documentElement.clientWidth===0?0:window.innerWidth-document.documentElement.clientWidth}onKeydown(t){this.modal&&(t.key==="Escape"&&this.closeModal(this.modal),t.key==="Tab"&&this.changeFocus(t))}changeFocus(t){var a,l;if(!((a=this.config.focus)!=null&&a.selectors))return;const i=(l=this.modal)==null?void 0:l.querySelectorAll(this.config.focus.selectors.join(", "));if(!i)return;const e=i[0],s=i[i.length-1],o=t.target;t.shiftKey?o.isEqualNode(e)&&(s.focus(),t.preventDefault()):o.isEqualNode(s)&&(e.focus(),t.preventDefault())}addStyles(){var o,a,l,c,d;const t={...this.config.classes},i=this.config.animationDuration+"ms",e=`[${(o=this.config.triggersAttrs)==null?void 0:o.close}]`,s=A({classNames:t,animationDuration:i,margin:(a=this.config.style)==null?void 0:a.valign,transform:(l=this.config.style)==null?void 0:l.animation,closeSelector:e,width:(c=this.config.style)==null?void 0:c.width});document.head.insertAdjacentHTML("beforeend",`<style>${s}</style>`),document.querySelectorAll("."+((d=this.config.classes)==null?void 0:d.modal)).forEach(r=>{r.style.removeProperty("display")})}}exports.test=E;
