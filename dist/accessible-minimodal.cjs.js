/*!
* accessible-minimodal v2.5.2
* https://github.com/imhvost/accessible-minimodal
*/
"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t={animationDuration:400,classes:{modal:"modal",wrapp:"modal-wrapp",body:"modal-body",closeBtn:"modal-close-btn",active:"active",open:"open",close:"close"},disableScroll:{use:!0,jumpingElements:""},focus:{use:!0,selectors:["button:not([disabled])","a[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])",'[tabindex]:not([tabindex="-1"])','[contenteditable="true"]']},hash:{open:!1,add:!1,remove:!1},multiple:{use:!1,closePrevModal:!1},on:{beforeOpen:()=>!0,afterOpen:()=>({}),beforeClose:()=>!0,afterClose:()=>({})},outsideClose:!0,style:{use:!1,width:400,valign:"center",animation:"from-bottom"},triggersAttrs:{open:"data-modal-open",close:"data-modal-close",closeAll:"data-modal-close-all"}};if(exports.AccessibleMinimodal=class{config;modal;openBtn;modals;focusBtns;animated;constructor(e={}){for(const[t,n]of Object.entries(e)){const o=t;if(void 0!==n){if("object"==typeof n){const t={...n};for(const[e,n]of Object.entries(t)){void 0===n&&delete t[e]}e[o]={...t}}}else delete e[o]}this.config=Object.assign({},t,e),Object.keys(e).map((n=>{const o=n;"object"==typeof e[o]&&(this.config[o]=Object.assign({},t[o],e[o]))})),this.modal=null,this.openBtn=null,this.modals=[],this.focusBtns=[],this.animated=!1,this.init(),this.addTriggers()}init(){if(this.config.style?.use&&this.addStyles(),this.config.hash?.open){const t=window.location.hash.substring(1)??"";t&&(this.modal=document.getElementById(t),this.openModal())}}addTriggers(){document.addEventListener("click",(t=>{const e=e=>{const n=t.target;return n.getAttribute(e)?n:n.closest(`[${e}]`)},n=e(this.config.triggersAttrs?.open??"");if(n&&(t.preventDefault(),this.modal=document.getElementById(n.getAttribute(this.config.triggersAttrs?.open??"")??""),this.openBtn=n,this.focusBtns.push(this.openBtn),this.openModal()),e(this.config.triggersAttrs?.close??"")&&(t.preventDefault(),this.closeModal()),e(this.config.triggersAttrs?.closeAll??"")&&(t.preventDefault(),this.closeAllModals()),this.config.outsideClose){const e=t.target;this.modal&&e.classList.contains(this.config.classes?.wrapp??"")&&!document?.activeElement?.closest("."+this.config.classes?.body)&&(t.preventDefault(),this.closeModal(this.modal))}}))}getOnInstance(){return{modal:this.modal,openBtn:this.openBtn}}openModal(t){this._openModal(t)}_openModal(t,e=!0){if(this.animated)return;if(t&&(this.modal="string"==typeof t?document.getElementById(t):t,e&&this.focusBtns.push(null)),!this.modal)return void console.warn("AccessibleMinimodal warn: Modal HTMLElement not found");if(this.config.on?.beforeOpen){this.config.on.beforeOpen(this.getOnInstance());const t=this.modal?.dispatchEvent(new Event("accessible-minimodal:before-open",{cancelable:!0}));if(!t)return}this.animated=!0;let n=0;this.config.multiple?.use?(this.modals.length&&document.removeEventListener("keydown",this.onKeydown),this.config.multiple.closePrevModal&&this.modals.length&&(this._closeModal(this.modals[this.modals.length-1],!1),e&&(n=this.config.animationDuration??0))):this.modals.length&&(this.closeModal(this.modals[this.modals.length-1]),e&&(n=this.config.animationDuration??0)),setTimeout((()=>{if(this.modal?.classList.add(this.config.classes?.open??""),this.config.disableScroll?.use&&!this.modals.length){const t=this.getScrollbarWidth(),e=document.querySelector("html"),n=document.querySelector("body");if(e.style.overflow="hidden",n.style.overflow="hidden",t){e.style.paddingInlineEnd=`${t}px`;const{jumpingElements:n}=this.config.disableScroll;n&&(Array.isArray(n)&&n.length?n.forEach((e=>e.style.marginInlineEnd=`${t}px`)):"string"==typeof n&&document.querySelectorAll(n).forEach((e=>e.style.marginInlineEnd=`${t}px`)))}}this.modal&&this.modals.push(this.modal),this.config.hash?.add&&this.modal?.id&&window.history.replaceState("",location.href,"#"+this.modal.id),this.modal?.classList.add(this.config.classes?.active??""),this.modal?.setAttribute("aria-hidden","false"),setTimeout((()=>{if(this.modal?.classList.remove(this.config.classes?.open??""),this.animated=!1,this.config.focus?.use&&this.config.focus.selectors){const t=this.modal?.querySelectorAll(this.config.focus.selectors.join(", "));if(t){let e=t[0];e&&e.hasAttribute(this.config.triggersAttrs?.close??"")&&t.length>1&&(e=t[1]),e&&e.focus()}}document.addEventListener("keydown",this.onKeydown.bind(this)),this.config.on?.afterOpen&&(this.config.on.afterOpen(this.getOnInstance()),this.modal?.dispatchEvent(new Event("accessible-minimodal:after-open")))}),this.config.animationDuration)}),n)}closeModal(t){this._closeModal(t)}_closeModal(t,e=!0,n=!1){let o=null;if(t?o="string"==typeof t?document.getElementById(t):t:this.modal&&(o=this.modal),!o)return;if(this.config.on?.beforeClose){this.config.on.beforeClose(this.getOnInstance());const t=this.modal?.dispatchEvent(new Event("accessible-minimodal:before-close",{cancelable:!0}));if(!t)return}this.animated=!0;const s=this.modals.findIndex((t=>t.isSameNode(o)));e&&!n&&this.modals.splice(s,1),o.classList.add(this.config.classes?.close??""),o.classList.remove(this.config.classes?.active??""),o.setAttribute("aria-hidden","true"),document.removeEventListener("keydown",this.onKeydown),this.config.hash?.remove&&window.history.replaceState("",location.href,location.pathname+location.search),setTimeout((()=>{if(o?.classList.remove(this.config.classes?.close??""),this.config.on?.afterClose&&(this.config.on.afterClose(this.getOnInstance()),this.modal?.dispatchEvent(new Event("accessible-minimodal:after-close"))),this.config.multiple?.use&&e?this.modals.length?(n&&this.modals.pop(),this.modal=this.modals[this.modals.length-1]):this.modal=null:o?.isSameNode(this.modal)&&(this.modal=null),this.animated=!1,this.config.multiple?.use&&this.config.multiple?.closePrevModal&&e&&!n&&this.modals.length&&this._openModal(this.modals.pop(),!1),this.config.focus?.use&&this.focusBtns.length)if(n){const t=this.focusBtns.find((t=>null!==t));t&&(t.focus(),this.focusBtns=[])}else{const t=this.focusBtns[s];t&&(t.focus(),e&&this.focusBtns.splice(s,1))}if(this.config.disableScroll?.use&&!this.modals.length){const t=document.querySelector("html"),e=document.querySelector("body");t.style.removeProperty("overflow"),t.style.removeProperty("padding-inline-end"),e.style.removeProperty("overflow");const{jumpingElements:n}=this.config.disableScroll;n&&(Array.isArray(n)&&n.length?n.forEach((t=>t.style.removeProperty("margin-inline-end"))):"string"==typeof n&&document.querySelectorAll(n).forEach((t=>t.style.removeProperty("margin-inline-end"))))}}),this.config.animationDuration)}closeAllModals(){this.modals.length&&this.modals.forEach((t=>{this._closeModal(t,!0,!0)}))}getScrollbarWidth(){return window.screen.width-document.documentElement.clientWidth==0?0:window.innerWidth-document.documentElement.clientWidth}onKeydown(t){this.modal&&("Escape"===t.key&&this.closeModal(this.modal),"Tab"===t.key&&this.changeFocus(t))}changeFocus(t){if(!this.config.focus?.selectors)return;const e=this.modal?.querySelectorAll(this.config.focus.selectors.join(", "));if(!e)return;const n=e[0],o=e[e.length-1],s=t.target;t.shiftKey?s.isEqualNode(n)&&(o.focus(),t.preventDefault()):s.isEqualNode(o)&&(n.focus(),t.preventDefault())}addStyles(){const t=(t=>{const{modal:e,wrapp:n,body:o,closeBtn:s,active:i,open:a,close:l}=t.classNames,r="--accessible-minimodal",c=(t=>{switch(t){case"top":return"0 auto auto";case"bottom":return"auto auto 0";default:return"auto"}})(t.margin??""),d=(t=>{switch(t){case"from-top":return`translateY( calc(var(${r}-translate) * -1) )`;case"from-left":return`translateX( calc(var(${r}-translate) * -1) )`;case"from-right":return`translateX(var(${r}-translate))`;case"zoom-in":return"scale(.8)";case"zoom-out":return"scale(1.2)";case"fade":return"none";default:return`translateY(var(${r}-translate))`}})(t.transform??"");return`\n:root{\n${r}-color: #333;\n${r}-bg: #fff;\n${r}-filter: rgba(0, 0, 0, .7);\n${r}-z-index: 666666;\n${r}-padding: 40px;\n${r}-border-radius: 4px;\n${r}-translate: 20px;\n${r}-scale-in: .8;\n${r}-scale-out: 1.2;\n}\n.${e} {\n  position: fixed;\n  inset: 0;\n  z-index: var(${r}-z-index);\n}\n.${e}:not(.${i}) {\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n}\n.${e}.${a},\n.${e}.${l} {\n  transition: opacity ${t.animationDuration}, visibility ${t.animationDuration};\n}\n.${e}.open .${o},\n.${e}.close .${o} {\n  transition: transform ${t.animationDuration};\n}\n.${e}.${i} .${o} {\n  transform: none;\n}\n.${n} {\n  height: 100%;\n  display: flex;\n  background-color: var(${r}-filter);\n  padding: var(${r}-padding) calc(${r}-padding / 2);\n  overflow-y: scroll;\n}\n.${o} {\n  background-color: var(${r}-bg);\n  color: var(${r}-color);\n  flex: none;\n  min-height: 0;\n  border-radius: var(${r}-border-radius);\n  width: ${t.width}px;\n  max-width: 100%;\n  margin: ${c};\n  padding: var(${r}-padding);\n  transform: ${d};\n  position: relative;\n}\n.${s} {\n  position: absolute;\n  right: calc(var(${r}-padding) / 4);\n  top: calc(var(${r}-padding) / 4);\n  width: calc(var(${r}-padding) / 2);\n  height: calc(var(${r}-padding) / 2);\n  border: 0;\n  background: none;\n  cursor: pointer;\n  font-size: 0;\n}\n.${s}:before,\n.${s}:after {\n  content: '';\n  position: absolute;\n  width: 16px;\n  inset: 50% 0 auto 50%;\n  margin: -1px 0 0 -8px;\n  background-color: currentColor;\n  height: 2px;\n}\n.${s}:before {\n  transform: rotate(45deg);\n}\n.${s}:after {\n  transform: rotate(-45deg);\n}\n`.replace(/\s*([:;,{}])\s*/g,"$1")})({classNames:{...this.config.classes},animationDuration:this.config.animationDuration+"ms",margin:this.config.style?.valign,transform:this.config.style?.animation,width:this.config.style?.width});document.head.insertAdjacentHTML("beforeend",`<style>${t}</style>`),document.querySelectorAll("."+this.config.classes?.modal).forEach((t=>{t.style.removeProperty("display")}))}},globalThis.AccessibleMinimodal)for(const e of Object.keys(globalThis.AccessibleMinimodal))globalThis[e]=globalThis.AccessibleMinimodal[e];
