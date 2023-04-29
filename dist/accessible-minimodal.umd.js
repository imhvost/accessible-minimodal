(function(h,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(h=typeof globalThis<"u"?globalThis:h||self,l(h.AccessibleMinimodal={}))})(this,function(h){"use strict";var M=Object.defineProperty;var E=(h,l,y)=>l in h?M(h,l,{enumerable:!0,configurable:!0,writable:!0,value:y}):h[l]=y;var $=(h,l,y)=>(E(h,typeof l!="symbol"?l+"":l,y),y);const l={animationDuration:400,classes:{modal:"modal",wrapp:"modal-wrapp",body:"modal-body",active:"active",open:"open",close:"close"},disableScroll:!0,focus:{use:!0,selectors:["button:not([disabled])","[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])",'[tabindex]:not([tabindex="-1"])','[contenteditable="true"]']},hash:{open:!1,add:!1,remove:!1},multiple:{use:!1,closePrevModal:!1},on:{beforeOpen:()=>({}),afterOpen:()=>({}),beforeClose:()=>({}),afterClose:()=>({})},outsideClose:!0,style:{use:!1,width:400,valign:"center",animation:"from-bottom"},triggersAttrs:{open:"data-modal-open",close:"data-modal-close",closeAll:"data-modal-close-all"}},y=u=>{const{modal:t,wrapp:s,body:i,active:o,open:n,close:a}=u.classNames,e="--accessible-minimodal",c=m=>{switch(m){case"top":return"0 auto auto";case"bottom":return"auto auto 0";default:return"auto"}},d=m=>{switch(m){case"from-top":return`translateY( calc(var(${e}-translate) * -1) )`;case"from-left":return`translateX( calc(var(${e}-translate) * -1) )`;case"from-right":return`translateX(var(${e}-translate))`;case"zoom-in":return"scale(.8)";case"zoom-out":return"scale(1.2)";case"fade":return"none";default:return`translateY(var(${e}l-translate))`}},r=c(u.margin??""),f=d(u.transform??"");return`
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
.${t}.${a} {
  transition: opacity ${u.animationDuration}, visibility ${u.animationDuration};
}
.${t}.open .${i},
.${t}.close .${i} {
  transition: transform 0.4s;
}
.${t}.${o} .${i} {
  transform: none;
}
.${s} {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: var(${e}-filter);
  padding: var(${e}-padding) calc(${e}-padding / 2);
  overflow-y: scroll;
}
.${i} {
  background-color: var(${e}-bg);
  color: var(${e}-color);
  flex: none;
  min-height: 1px;
  border-radius: var(${e}-border-radius);
  width: ${u.width}px;
  max-width: 100%;
  margin: ${r};
  padding: var(${e}-padding);
  transform: ${f};
  position: relative;
}
.${i} > ${u.closeSelector} {
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
.${i} > ${u.closeSelector}:before,
.${i} > ${u.closeSelector}:after {
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
.${i} > ${u.closeSelector}:before {
  transform: rotate(45deg);
}
.${i} ${u.closeSelector}:after {
  transform: rotate(-45deg);
}
`.replace(/\s*([:;,{}])\s*/g,"$1")};class B{constructor(t=l){$(this,"config");$(this,"modal");$(this,"openBtn");$(this,"modals");$(this,"focusBtns");$(this,"animated");for(const[s,i]of Object.entries(t)){const o=s;if(i===void 0){delete t[o];continue}if(typeof i=="object"){const n={...i};for(const[a,e]of Object.entries(n)){const c=a;e===void 0&&delete n[c]}t[o]={...n}}}this.config=Object.assign({},l,t),Object.keys(t).map(s=>{const i=s;typeof t[i]=="object"&&(this.config[i]=Object.assign({},l[i],t[i]))}),this.modal=null,this.openBtn=null,this.modals=[],this.focusBtns=[],this.animated=!1,this.init(),this.addTriggers()}init(){var t,s;if((t=this.config.style)!=null&&t.use&&this.addStyles(),(s=this.config.hash)!=null&&s.open){const i=window.location.hash.substring(1)??"";i&&(this.modal=document.getElementById(i),this.openModal())}}addTriggers(){document.addEventListener("click",t=>{var i,o,n,a,e,c,d;const s=r=>{const f=t.target;return f.getAttribute(r)?f:f.closest(`[${r}]`)};if(this.openBtn=s(((i=this.config.triggersAttrs)==null?void 0:i.open)??""),this.openBtn&&(t.preventDefault(),this.modal=document.getElementById(this.openBtn.getAttribute(((o=this.config.triggersAttrs)==null?void 0:o.open)??"")??""),this.focusBtns.push(this.openBtn),this.openModal()),s(((n=this.config.triggersAttrs)==null?void 0:n.close)??"")&&(t.preventDefault(),this.closeModal()),s(((a=this.config.triggersAttrs)==null?void 0:a.closeAll)??"")&&(t.preventDefault(),this.closeAllModals()),this.config.outsideClose){const r=t.target;this.modal&&r.classList.contains(((e=this.config.classes)==null?void 0:e.wrapp)??"")&&!((d=document==null?void 0:document.activeElement)!=null&&d.closest("."+((c=this.config.classes)==null?void 0:c.body)))&&(t.preventDefault(),this.closeModal(this.modal))}})}openModal(t,s=!0){var o;if(this.animated)return;if(t&&(typeof t=="string"?this.modal=document.querySelector(t):this.modal=t,s&&this.focusBtns.push(null)),!this.modal){console.warn("Modal HTMLElement not found"),this.animated=!1;return}let i=0;(o=this.config.multiple)!=null&&o.use?(this.modals.length&&document.removeEventListener("keydown",this.onKeydown),this.config.multiple.closePrevModal&&this.modals.length&&(this.closeModal(this.modals[this.modals.length-1],!1),s&&(i=this.config.animationDuration??0))):this.modals.length&&(this.closeModal(this.modals[this.modals.length-1]),s&&(i=this.config.animationDuration??0)),setTimeout(()=>{var n,a,e,c,d,r,f,v;if(this.animated=!0,(n=this.config.on)!=null&&n.beforeOpen&&this.config.on.beforeOpen(this),(e=this.modal)==null||e.classList.add(((a=this.config.classes)==null?void 0:a.open)??""),this.modal&&this.modals.push(this.modal),(c=this.config.hash)!=null&&c.add&&((d=this.modal)!=null&&d.id)&&window.history.replaceState("",location.href,"#"+this.modal.id),this.config.disableScroll){const m=this.getScrollbarWidth(),p=document.querySelector("html"),b=document.querySelector("body");p.style.overflow="hidden",p.style.paddingInlineEnd=`${m}px`,b.style.overflow="hidden"}(f=this.modal)==null||f.classList.add(((r=this.config.classes)==null?void 0:r.active)??""),(v=this.modal)==null||v.setAttribute("aria-hidden","false"),setTimeout(()=>{var m,p,b,g,w,A;if(document.addEventListener("keydown",this.onKeydown.bind(this)),(m=this.config.focus)!=null&&m.use&&this.config.focus.selectors){const x=(p=this.modal)==null?void 0:p.querySelectorAll(this.config.focus.selectors.join(", "));if(x){let S=x[0];S.hasAttribute(((b=this.config.triggersAttrs)==null?void 0:b.close)??"")&&x.length>1&&(S=x[1]),S==null||S.focus()}}(w=this.modal)==null||w.classList.remove(((g=this.config.classes)==null?void 0:g.open)??""),this.animated=!1,(A=this.config.on)!=null&&A.afterOpen&&this.config.on.afterOpen(this)},this.config.animationDuration)},i)}closeModal(t,s=!0,i=!1){var a,e,c,d,r;if(this.animated&&!i)return;this.animated=!0;let o=null;if(t?typeof t=="string"?o=document.querySelector(t):o=t:this.modal&&(o=this.modal),!o){this.animated=!1;return}const n=this.modals.findIndex(f=>f.isSameNode(o));s&&this.modals.splice(n,1),(a=this.config.on)!=null&&a.beforeClose&&this.config.on.beforeClose(this),o.classList.add(((e=this.config.classes)==null?void 0:e.close)??""),o.classList.remove(((c=this.config.classes)==null?void 0:c.active)??""),o.setAttribute("aria-hidden","true"),document.removeEventListener("keydown",this.onKeydown),(d=this.config.hash)!=null&&d.remove&&window.history.replaceState("",location.href,location.pathname+location.search),(r=this.config.multiple)!=null&&r.use&&s?this.modals.length?this.modal=this.modals[this.modals.length-1]:this.modal=null:o!=null&&o.isSameNode(this.modal)&&(this.modal=null),setTimeout(()=>{var f,v,m,p,b;if(o==null||o.classList.remove(((f=this.config.classes)==null?void 0:f.close)??""),this.config.disableScroll&&!this.modals.length){const g=document.querySelector("html"),w=document.querySelector("body");g.style.removeProperty("overflow"),g.style.removeProperty("paddingInlineEnd"),w.style.removeProperty("overflow")}if(this.animated=!1,(v=this.config.multiple)!=null&&v.use&&((m=this.config.multiple)!=null&&m.closePrevModal)&&s&&!i&&this.modals.length&&this.openModal(this.modals.pop(),!1),(p=this.config.focus)!=null&&p.use&&this.focusBtns.length)if(i){const g=this.focusBtns.find(w=>w!==null);g&&(g.focus(),this.focusBtns=[])}else{const g=this.focusBtns[n];g&&(g.focus(),s&&this.focusBtns.splice(n,1))}(b=this.config.on)!=null&&b.afterClose&&this.config.on.afterClose(this)},this.config.animationDuration)}closeAllModals(){this.modals.length&&this.modals.forEach(t=>{this.closeModal(t,!0,!0),this.modals=[]})}getScrollbarWidth(){return window.screen.width-document.documentElement.clientWidth===0?0:window.innerWidth-document.documentElement.clientWidth}onKeydown(t){this.modal&&(t.key==="Escape"&&this.closeModal(this.modal),t.key==="Tab"&&this.changeFocus(t))}changeFocus(t){var a,e;if(!((a=this.config.focus)!=null&&a.selectors))return;const s=(e=this.modal)==null?void 0:e.querySelectorAll(this.config.focus.selectors.join(", "));if(!s)return;const i=s[0],o=s[s.length-1],n=t.target;t.shiftKey?n.isEqualNode(i)&&(o.focus(),t.preventDefault()):n.isEqualNode(o)&&(i.focus(),t.preventDefault())}addStyles(){var n,a,e,c,d;const t={...this.config.classes},s=this.config.animationDuration+"ms",i=`[${(n=this.config.triggersAttrs)==null?void 0:n.close}]`,o=y({classNames:t,animationDuration:s,margin:(a=this.config.style)==null?void 0:a.valign,transform:(e=this.config.style)==null?void 0:e.animation,closeSelector:i,width:(c=this.config.style)==null?void 0:c.width});document.head.insertAdjacentHTML("beforeend",`<style>${o}</style>`),document.querySelectorAll("."+((d=this.config.classes)==null?void 0:d.modal)).forEach(r=>{r.style.removeProperty("display")})}}h.AccessibleMinimodal=B,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
