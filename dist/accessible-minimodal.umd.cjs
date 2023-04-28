(function(f,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(f=typeof globalThis<"u"?globalThis:f||self,l(f["accessible-minimodal"]={}))})(this,function(f){"use strict";var E=Object.defineProperty;var M=(f,l,p)=>l in f?E(f,l,{enumerable:!0,configurable:!0,writable:!0,value:p}):f[l]=p;var w=(f,l,p)=>(M(f,typeof l!="symbol"?l+"":l,p),p);const l={animationDuration:400,classes:{modal:"modal",wrapp:"modal-wrapp",body:"modal-body",active:"active",open:"open",close:"close"},disableScroll:!0,focus:{use:!0,selectors:["button:not([disabled])","[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])",'[tabindex]:not([tabindex="-1"])','[contenteditable="true"]']},hash:{open:!1,add:!1,remove:!1},multiple:{use:!1,closePrevModal:!1},on:{beforeOpen:()=>({}),afterOpen:()=>({}),beforeClose:()=>({}),afterClose:()=>({})},outsideClose:!0,style:{use:!1,width:400,valign:"center",animation:"from-bottom"},triggersAttrs:{open:"data-modal-open",close:"data-modal-close",closeAll:"data-modal-close-all"}},p=h=>{const{modal:e,wrapp:s,body:t,active:i,open:o,close:n}=h.classNames,a=g=>{switch(g){case"top":return"0 auto auto";case"bottom":return"auto auto 0";default:return"auto"}},c=g=>{switch(g){case"from-top":return"translateY( calc(var(--accessible-minimodal-translate) * -1) )";case"from-left":return"translateX( calc(var(--accessible-minimodal-translate) * -1) )";case"from-right":return"translateX(var(--accessible-minimodal-translate))";case"zoom-in":return"scale(.8)";case"zoom-out":return"scale(1.2)";case"fade":return"none";default:return"translateY(var(--accessible-minimodal-translate))"}},r=a(h.margin??""),d=c(h.transform??"");return`
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
.${e} {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--accessible-minimodal-z-index);
}
.${e}:not(.${i}) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.${e}.${o},
.${e}.${n} {
  transition: opacity ${h.animationDuration}, visibility ${h.animationDuration};
}
.${e}.open .${t},
.${e}.close .${t} {
  transition: transform 0.4s;
}
.${e}.${i} .${t} {
  transform: none;
}
.${s} {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: var(--accessible-minimodal-filter);
  padding: var(--accessible-minimodal-padding) calc(--accessible-minimodal-padding / 2);
  overflow-y: scroll;
}
.${t} {
  background-color: var(--accessible-minimodal-bg);
  color: var(--accessible-minimodal-color);
  flex: none;
  min-height: 1px;
  border-radius: var(--accessible-minimodal-border-radius);
  width: ${h.width}px;
  max-width: 100%;
  margin: ${r};
  padding: var(--accessible-minimodal-padding);
  transform: ${d};
  position: relative;
}
.${t} > ${h.closeSelector} {
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
.${t} > ${h.closeSelector}:before,
.${t} > ${h.closeSelector}:after {
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
.${t} > ${h.closeSelector}:before {
  transform: rotate(45deg);
}
.${t} ${h.closeSelector}:after {
  transform: rotate(-45deg);
}
`.replace(/\s*([:;,{}])\s*/g,"$1")};class B{constructor(e=l){w(this,"config");w(this,"modal");w(this,"openBtn");w(this,"modals");w(this,"focusBtns");w(this,"animated");for(const[s,t]of Object.entries(e)){const i=s;if(t===void 0){delete e[i];continue}if(typeof t=="object"){const o={...t};for(const[n,a]of Object.entries(o)){const c=n;a===void 0&&delete o[c]}e[i]={...o}}}this.config=Object.assign({},l,e),Object.keys(e).map(s=>{const t=s;typeof e[t]=="object"&&(this.config[t]=Object.assign({},l[t],e[t]))}),this.modal=null,this.openBtn=null,this.modals=[],this.focusBtns=[],this.animated=!1,this.init(),this.addTriggers()}init(){var e,s;if((e=this.config.style)!=null&&e.use&&this.addStyles(),(s=this.config.hash)!=null&&s.open){const t=window.location.hash.substring(1)??"";t&&(this.modal=document.getElementById(t),this.openModal())}}addTriggers(){document.addEventListener("click",e=>{var t,i,o,n,a,c,r;const s=d=>{const m=e.target;return m.getAttribute(d)?m:m.closest(`[${d}]`)};if(this.openBtn=s(((t=this.config.triggersAttrs)==null?void 0:t.open)??""),this.openBtn&&(e.preventDefault(),this.modal=document.getElementById(this.openBtn.getAttribute(((i=this.config.triggersAttrs)==null?void 0:i.open)??"")??""),this.focusBtns.push(this.openBtn),this.openModal()),s(((o=this.config.triggersAttrs)==null?void 0:o.close)??"")&&(e.preventDefault(),this.closeModal()),s(((n=this.config.triggersAttrs)==null?void 0:n.closeAll)??"")&&(e.preventDefault(),this.closeAllModals()),this.config.outsideClose){const d=e.target;this.modal&&d.classList.contains(((a=this.config.classes)==null?void 0:a.wrapp)??"")&&!((r=document==null?void 0:document.activeElement)!=null&&r.closest("."+((c=this.config.classes)==null?void 0:c.body)))&&(e.preventDefault(),this.closeModal(this.modal))}})}openModal(e,s=!0){var i;if(this.animated)return;if(e&&(typeof e=="string"?this.modal=document.querySelector(e):this.modal=e,s&&this.focusBtns.push(null)),!this.modal){console.warn("Modal HTMLElement not found"),this.animated=!1;return}let t=0;(i=this.config.multiple)!=null&&i.use?(this.modals.length&&document.removeEventListener("keydown",this.onKeydown),this.config.multiple.closePrevModal&&this.modals.length&&(this.closeModal(this.modals[this.modals.length-1],!1),s&&(t=this.config.animationDuration??0))):this.modals.length&&(this.closeModal(this.modals[this.modals.length-1]),s&&(t=this.config.animationDuration??0)),setTimeout(()=>{var o,n,a,c,r,d,m,g;if(this.animated=!0,(o=this.config.on)!=null&&o.beforeOpen&&this.config.on.beforeOpen(this),(a=this.modal)==null||a.classList.add(((n=this.config.classes)==null?void 0:n.open)??""),this.modal&&this.modals.push(this.modal),(c=this.config.hash)!=null&&c.add&&((r=this.modal)!=null&&r.id)&&window.history.replaceState("",location.href,"#"+this.modal.id),this.config.disableScroll){const y=this.getScrollbarWidth(),b=document.querySelector("html"),v=document.querySelector("body");b.style.overflow="hidden",b.style.paddingInlineEnd=`${y}px`,v.style.overflow="hidden"}(m=this.modal)==null||m.classList.add(((d=this.config.classes)==null?void 0:d.active)??""),(g=this.modal)==null||g.setAttribute("aria-hidden","false"),setTimeout(()=>{var y,b,v,u,$,A;if(document.addEventListener("keydown",this.onKeydown.bind(this)),(y=this.config.focus)!=null&&y.use&&this.config.focus.selectors){const x=(b=this.modal)==null?void 0:b.querySelectorAll(this.config.focus.selectors.join(", "));if(x){let S=x[0];S.hasAttribute(((v=this.config.triggersAttrs)==null?void 0:v.close)??"")&&x.length>1&&(S=x[1]),S==null||S.focus()}}($=this.modal)==null||$.classList.remove(((u=this.config.classes)==null?void 0:u.open)??""),this.animated=!1,(A=this.config.on)!=null&&A.afterOpen&&this.config.on.afterOpen(this)},this.config.animationDuration)},t)}closeModal(e,s=!0,t=!1){var n,a,c,r,d;if(this.animated&&!t)return;this.animated=!0;let i=null;if(e?typeof e=="string"?i=document.querySelector(e):i=e:this.modal&&(i=this.modal),!i){this.animated=!1;return}const o=this.modals.findIndex(m=>m.isSameNode(i));s&&this.modals.splice(o,1),(n=this.config.on)!=null&&n.beforeClose&&this.config.on.beforeClose(this),i.classList.add(((a=this.config.classes)==null?void 0:a.close)??""),i.classList.remove(((c=this.config.classes)==null?void 0:c.active)??""),i.setAttribute("aria-hidden","true"),document.removeEventListener("keydown",this.onKeydown),(r=this.config.hash)!=null&&r.remove&&window.history.replaceState("",location.href,location.pathname+location.search),(d=this.config.multiple)!=null&&d.use&&s?this.modals.length?this.modal=this.modals[this.modals.length-1]:this.modal=null:i!=null&&i.isSameNode(this.modal)&&(this.modal=null),setTimeout(()=>{var m,g,y,b,v;if(i==null||i.classList.remove(((m=this.config.classes)==null?void 0:m.close)??""),this.config.disableScroll&&!this.modals.length){const u=document.querySelector("html"),$=document.querySelector("body");u.style.removeProperty("overflow"),u.style.removeProperty("paddingInlineEnd"),$.style.removeProperty("overflow")}if(this.animated=!1,(g=this.config.multiple)!=null&&g.use&&((y=this.config.multiple)!=null&&y.closePrevModal)&&s&&!t&&this.modals.length&&this.openModal(this.modals.pop(),!1),(b=this.config.focus)!=null&&b.use&&this.focusBtns.length)if(t){const u=this.focusBtns.find($=>$!==null);u&&(u.focus(),this.focusBtns=[])}else{const u=this.focusBtns[o];u&&(u.focus(),s&&this.focusBtns.splice(o,1))}(v=this.config.on)!=null&&v.afterClose&&this.config.on.afterClose(this)},this.config.animationDuration)}closeAllModals(){this.modals.length&&this.modals.forEach(e=>{this.closeModal(e,!0,!0),this.modals=[]})}getScrollbarWidth(){return window.screen.width-document.documentElement.clientWidth===0?0:window.innerWidth-document.documentElement.clientWidth}onKeydown(e){this.modal&&(e.key==="Escape"&&this.closeModal(this.modal),e.key==="Tab"&&this.changeFocus(e))}changeFocus(e){var n,a;if(!((n=this.config.focus)!=null&&n.selectors))return;const s=(a=this.modal)==null?void 0:a.querySelectorAll(this.config.focus.selectors.join(", "));if(!s)return;const t=s[0],i=s[s.length-1],o=e.target;e.shiftKey?o.isEqualNode(t)&&(i.focus(),e.preventDefault()):o.isEqualNode(i)&&(t.focus(),e.preventDefault())}addStyles(){var o,n,a,c,r;const e={...this.config.classes},s=this.config.animationDuration+"ms",t=`[${(o=this.config.triggersAttrs)==null?void 0:o.close}]`,i=p({classNames:e,animationDuration:s,margin:(n=this.config.style)==null?void 0:n.valign,transform:(a=this.config.style)==null?void 0:a.animation,closeSelector:t,width:(c=this.config.style)==null?void 0:c.width});document.head.insertAdjacentHTML("beforeend",`<style>${i}</style>`),document.querySelectorAll("."+((r=this.config.classes)==null?void 0:r.modal)).forEach(d=>{d.style.removeProperty("display")})}}f.AccessibleMinimodal=B,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"})});
