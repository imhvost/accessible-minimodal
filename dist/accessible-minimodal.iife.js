/*!
* accessible-minimodal v2.1.0
* https://github.com/imhvost/accessible-minimodal
*/
var AccessibleMinimodal=function(t){"use strict";const e={animationDuration:400,classes:{modal:"modal",wrapp:"modal-wrapp",body:"modal-body",active:"active",open:"open",close:"close"},disableScroll:!0,focus:{use:!0,selectors:["button:not([disabled])","a[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])",'[tabindex]:not([tabindex="-1"])','[contenteditable="true"]']},hash:{open:!1,add:!1,remove:!1},multiple:{use:!1,closePrevModal:!1},on:{beforeOpen:()=>({}),afterOpen:()=>({}),beforeClose:()=>({}),afterClose:()=>({})},outsideClose:!0,style:{use:!1,width:400,valign:"center",animation:"from-bottom"},triggersAttrs:{open:"data-modal-open",close:"data-modal-close",closeAll:"data-modal-close-all"}};return t.AccessibleMinimodal=class{config;modal;openBtn;modals;focusBtns;animated;constructor(t={}){for(const[e,o]of Object.entries(t)){const s=e;if(void 0!==o){if("object"==typeof o){const e={...o};for(const[t,o]of Object.entries(e)){void 0===o&&delete e[t]}t[s]={...e}}}else delete t[s]}this.config=Object.assign({},e,t),Object.keys(t).map((o=>{const s=o;"object"==typeof t[s]&&(this.config[s]=Object.assign({},e[s],t[s]))})),this.modal=null,this.openBtn=null,this.modals=[],this.focusBtns=[],this.animated=!1,this.init(),this.addTriggers()}init(){if(this.config.style?.use&&this.addStyles(),this.config.hash?.open){const t=window.location.hash.substring(1)??"";t&&(this.modal=document.getElementById(t),this.openModal())}}addTriggers(){document.addEventListener("click",(t=>{const e=e=>{const o=t.target;return o.getAttribute(e)?o:o.closest(`[${e}]`)},o=e(this.config.triggersAttrs?.open??"");if(o&&(t.preventDefault(),this.modal=document.getElementById(o.getAttribute(this.config.triggersAttrs?.open??"")??""),this.openBtn=o,this.focusBtns.push(this.openBtn),this.openModal()),e(this.config.triggersAttrs?.close??"")&&(t.preventDefault(),this.closeModal()),e(this.config.triggersAttrs?.closeAll??"")&&(t.preventDefault(),this.closeAllModals()),this.config.outsideClose){const e=t.target;this.modal&&e.classList.contains(this.config.classes?.wrapp??"")&&!document?.activeElement?.closest("."+this.config.classes?.body)&&(t.preventDefault(),this.closeModal(this.modal))}}))}getOnInstance(){return{modal:this.modal,openBtn:this.openBtn,config:this.config}}openModal(t){this._openModal(t)}_openModal(t,e=!0){if(this.animated)return;if(t&&(this.modal="string"==typeof t?document.querySelector(t):t,e&&this.focusBtns.push(null)),!this.modal)return console.warn("AccessibleMinimodal warn: Modal HTMLElement not found"),void(this.animated=!1);let o=0;this.config.multiple?.use?(this.modals.length&&document.removeEventListener("keydown",this.onKeydown),this.config.multiple.closePrevModal&&this.modals.length&&(this._closeModal(this.modals[this.modals.length-1],!1),e&&(o=this.config.animationDuration??0))):this.modals.length&&(this.closeModal(this.modals[this.modals.length-1]),e&&(o=this.config.animationDuration??0)),setTimeout((()=>{if(this.animated=!0,this.config.on?.beforeOpen&&(this.config.on.beforeOpen(this.getOnInstance()),this.modal?.dispatchEvent(new Event("accessible-minimodal:before-open"))),this.modal?.classList.add(this.config.classes?.open??""),this.config.disableScroll&&!this.modals.length){const t=this.getScrollbarWidth(),e=document.querySelector("html"),o=document.querySelector("body");e.style.overflow="hidden",o.style.overflow="hidden",t&&(e.style.paddingInlineEnd=`${t}px`)}this.modal&&this.modals.push(this.modal),this.config.hash?.add&&this.modal?.id&&window.history.replaceState("",location.href,"#"+this.modal.id),this.modal?.classList.add(this.config.classes?.active??""),this.modal?.setAttribute("aria-hidden","false"),setTimeout((()=>{if(this.modal?.classList.remove(this.config.classes?.open??""),this.animated=!1,this.config.focus?.use&&this.config.focus.selectors){const t=this.modal?.querySelectorAll(this.config.focus.selectors.join(", "));if(t){let e=t[0];e&&e.hasAttribute(this.config.triggersAttrs?.close??"")&&t.length>1&&(e=t[1]),e.focus()}}document.addEventListener("keydown",this.onKeydown.bind(this)),this.config.on?.afterOpen&&(this.config.on.afterOpen(this.getOnInstance()),this.modal?.dispatchEvent(new Event("accessible-minimodal:after-open")))}),this.config.animationDuration)}),o)}closeModal(t){this._closeModal(t)}_closeModal(t,e=!0,o=!1){if(this.animated&&!o)return;this.animated=!0;let s=null;if(t?s="string"==typeof t?document.querySelector(t):t:this.modal&&(s=this.modal),!s)return void(this.animated=!1);const n=this.modals.findIndex((t=>t.isSameNode(s)));e&&this.modals.splice(n,1),this.config.on?.beforeClose&&(this.config.on.beforeClose(this.getOnInstance()),this.modal?.dispatchEvent(new Event("accessible-minimodal:before-close"))),s.classList.add(this.config.classes?.close??""),s.classList.remove(this.config.classes?.active??""),s.setAttribute("aria-hidden","true"),document.removeEventListener("keydown",this.onKeydown),this.config.hash?.remove&&window.history.replaceState("",location.href,location.pathname+location.search),setTimeout((()=>{if(s?.classList.remove(this.config.classes?.close??""),this.config.disableScroll&&!this.modals.length){const t=document.querySelector("html"),e=document.querySelector("body");t.style.removeProperty("overflow"),t.style.removeProperty("padding-inline-end"),e.style.removeProperty("overflow")}if(this.config.on?.afterClose&&(this.config.on.afterClose(this.getOnInstance()),this.modal?.dispatchEvent(new Event("accessible-minimodal:after-close"))),this.config.multiple?.use&&e?this.modals.length?this.modal=this.modals[this.modals.length-1]:this.modal=null:s?.isSameNode(this.modal)&&(this.modal=null),this.animated=!1,this.config.multiple?.use&&this.config.multiple?.closePrevModal&&e&&!o&&this.modals.length&&this._openModal(this.modals.pop(),!1),this.config.focus?.use&&this.focusBtns.length)if(o){const t=this.focusBtns.find((t=>null!==t));t&&(t.focus(),this.focusBtns=[])}else{const t=this.focusBtns[n];t&&(t.focus(),e&&this.focusBtns.splice(n,1))}}),this.config.animationDuration)}closeAllModals(){this.modals.length&&this.modals.forEach((t=>{console.log(t),this._closeModal(t,!1,!0),this.modals=[]}))}getScrollbarWidth(){return window.screen.width-document.documentElement.clientWidth==0?0:window.innerWidth-document.documentElement.clientWidth}onKeydown(t){this.modal&&("Escape"===t.key&&this.closeModal(this.modal),"Tab"===t.key&&this.changeFocus(t))}changeFocus(t){if(!this.config.focus?.selectors)return;const e=this.modal?.querySelectorAll(this.config.focus.selectors.join(", "));if(!e)return;const o=e[0],s=e[e.length-1],n=t.target;t.shiftKey?n.isEqualNode(o)&&(s.focus(),t.preventDefault()):n.isEqualNode(s)&&(o.focus(),t.preventDefault())}addStyles(){const t={...this.config.classes},e=this.config.animationDuration+"ms",o=`[${this.config.triggersAttrs?.close}]`,s=(t=>{const{modal:e,wrapp:o,body:s,active:n,open:i,close:a}=t.classNames,l="--accessible-minimodal",c=(t=>{switch(t){case"top":return"0 auto auto";case"bottom":return"auto auto 0";default:return"auto"}})(t.margin??""),r=(t=>{switch(t){case"from-top":return`translateY( calc(var(${l}-translate) * -1) )`;case"from-left":return`translateX( calc(var(${l}-translate) * -1) )`;case"from-right":return`translateX(var(${l}-translate))`;case"zoom-in":return"scale(.8)";case"zoom-out":return"scale(1.2)";case"fade":return"none";default:return`translateY(var(${l}-translate))`}})(t.transform??"");return`\n:root{\n${l}-color: #333;\n${l}-bg: #fff;\n${l}-filter: rgba(0, 0, 0, .7);\n${l}-z-index: 666666;\n${l}-padding: 40px;\n${l}-border-radius: 4px;\n${l}-translate: 20px;\n${l}-scale-in: .8;\n${l}-scale-out: 1.2;\n}\n.${e} {\n  position: fixed;\n  inset: 0;\n  z-index: var(${l}-z-index);\n}\n.${e}:not(.${n}) {\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n}\n.${e}.${i},\n.${e}.${a} {\n  transition: opacity ${t.animationDuration}, visibility ${t.animationDuration};\n}\n.${e}.open .${s},\n.${e}.close .${s} {\n  transition: transform ${t.animationDuration};\n}\n.${e}.${n} .${s} {\n  transform: none;\n}\n.${o} {\n  height: 100%;\n  display: flex;\n  background-color: var(${l}-filter);\n  padding: var(${l}-padding) calc(${l}-padding / 2);\n  overflow-y: scroll;\n}\n.${s} {\n  background-color: var(${l}-bg);\n  color: var(${l}-color);\n  flex: none;\n  min-height: 0;\n  border-radius: var(${l}-border-radius);\n  width: ${t.width}px;\n  max-width: 100%;\n  margin: ${c};\n  padding: var(${l}-padding);\n  transform: ${r};\n  position: relative;\n}\n.${s} > ${t.closeSelector} {\n  position: absolute;\n  right: calc(var(${l}-padding) / 4);\n  top: calc(var(${l}-padding) / 4);\n  width: calc(var(${l}-padding) / 2);\n  height: calc(var(${l}-padding) / 2);\n  border: 0;\n  background: none;\n  cursor: pointer;\n  font-size: 0;\n}\n.${s} > ${t.closeSelector}:before,\n.${s} > ${t.closeSelector}:after {\n  content: '';\n  position: absolute;\n  width: 16px;\n  inset: 50% 0 auto 50%;\n  margin: -1px 0 0 -8px;\n  background-color: currentColor;\n  height: 2px;\n}\n.${s} > ${t.closeSelector}:before {\n  transform: rotate(45deg);\n}\n.${s} ${t.closeSelector}:after {\n  transform: rotate(-45deg);\n}\n`.replace(/\s*([:;,{}])\s*/g,"$1")})({classNames:t,animationDuration:e,margin:this.config.style?.valign,transform:this.config.style?.animation,closeSelector:o,width:this.config.style?.width});document.head.insertAdjacentHTML("beforeend",`<style>${s}</style>`),document.querySelectorAll("."+this.config.classes?.modal).forEach((t=>{t.style.removeProperty("display")}))}},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),t}({});if(globalThis.AccessibleMinimodal)for(const t of Object.keys(globalThis.AccessibleMinimodal))globalThis[t]=globalThis.AccessibleMinimodal[t];
