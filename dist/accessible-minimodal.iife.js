var AccessibleMinimodal=function(g){"use strict";var M=Object.defineProperty;var E=(g,h,y)=>h in g?M(g,h,{enumerable:!0,configurable:!0,writable:!0,value:y}):g[h]=y;var $=(g,h,y)=>(E(g,typeof h!="symbol"?h+"":h,y),y);const h={animationDuration:400,classes:{modal:"modal",wrapp:"modal-wrapp",body:"modal-body",active:"active",open:"open",close:"close"},disableScroll:!0,focus:{use:!0,selectors:["button:not([disabled])","[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])",'[tabindex]:not([tabindex="-1"])','[contenteditable="true"]']},hash:{open:!1,add:!1,remove:!1},multiple:{use:!1,closePrevModal:!1},on:{beforeOpen:()=>({}),afterOpen:()=>({}),beforeClose:()=>({}),afterClose:()=>({})},outsideClose:!0,style:{use:!1,width:400,valign:"center",animation:"from-bottom"},triggersAttrs:{open:"data-modal-open",close:"data-modal-close",closeAll:"data-modal-close-all"}},y=f=>{const{modal:t,wrapp:o,body:i,active:s,open:n,close:a}=f.classNames,e="--accessible-minimodal",l=u=>{switch(u){case"top":return"0 auto auto";case"bottom":return"auto auto 0";default:return"auto"}},c=u=>{switch(u){case"from-top":return`translateY( calc(var(${e}-translate) * -1) )`;case"from-left":return`translateX( calc(var(${e}-translate) * -1) )`;case"from-right":return`translateX(var(${e}-translate))`;case"zoom-in":return"scale(.8)";case"zoom-out":return"scale(1.2)";case"fade":return"none";default:return`translateY(var(${e}l-translate))`}},r=l(f.margin??""),d=c(f.transform??"");return`
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
.${t}:not(.${s}) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.${t}.${n},
.${t}.${a} {
  transition: opacity ${f.animationDuration}, visibility ${f.animationDuration};
}
.${t}.open .${i},
.${t}.close .${i} {
  transition: transform 0.4s;
}
.${t}.${s} .${i} {
  transform: none;
}
.${o} {
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
  width: ${f.width}px;
  max-width: 100%;
  margin: ${r};
  padding: var(${e}-padding);
  transform: ${d};
  position: relative;
}
.${i} > ${f.closeSelector} {
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
.${i} > ${f.closeSelector}:before,
.${i} > ${f.closeSelector}:after {
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
.${i} > ${f.closeSelector}:before {
  transform: rotate(45deg);
}
.${i} ${f.closeSelector}:after {
  transform: rotate(-45deg);
}
`.replace(/\s*([:;,{}])\s*/g,"$1")};class B{constructor(t=h){$(this,"config");$(this,"modal");$(this,"openBtn");$(this,"modals");$(this,"focusBtns");$(this,"animated");for(const[o,i]of Object.entries(t)){const s=o;if(i===void 0){delete t[s];continue}if(typeof i=="object"){const n={...i};for(const[a,e]of Object.entries(n)){const l=a;e===void 0&&delete n[l]}t[s]={...n}}}this.config=Object.assign({},h,t),Object.keys(t).map(o=>{const i=o;typeof t[i]=="object"&&(this.config[i]=Object.assign({},h[i],t[i]))}),this.modal=null,this.openBtn=null,this.modals=[],this.focusBtns=[],this.animated=!1,this.init(),this.addTriggers()}init(){var t,o;if((t=this.config.style)!=null&&t.use&&this.addStyles(),(o=this.config.hash)!=null&&o.open){const i=window.location.hash.substring(1)??"";i&&(this.modal=document.getElementById(i),this.openModal())}}addTriggers(){document.addEventListener("click",t=>{var i,s,n,a,e,l,c;const o=r=>{const d=t.target;return d.getAttribute(r)?d:d.closest(`[${r}]`)};if(this.openBtn=o(((i=this.config.triggersAttrs)==null?void 0:i.open)??""),this.openBtn&&(t.preventDefault(),this.modal=document.getElementById(this.openBtn.getAttribute(((s=this.config.triggersAttrs)==null?void 0:s.open)??"")??""),this.focusBtns.push(this.openBtn),this.openModal()),o(((n=this.config.triggersAttrs)==null?void 0:n.close)??"")&&(t.preventDefault(),this.closeModal()),o(((a=this.config.triggersAttrs)==null?void 0:a.closeAll)??"")&&(t.preventDefault(),this.closeAllModals()),this.config.outsideClose){const r=t.target;this.modal&&r.classList.contains(((e=this.config.classes)==null?void 0:e.wrapp)??"")&&!((c=document==null?void 0:document.activeElement)!=null&&c.closest("."+((l=this.config.classes)==null?void 0:l.body)))&&(t.preventDefault(),this.closeModal(this.modal))}})}openModal(t,o=!0){var s;if(this.animated)return;if(t&&(typeof t=="string"?this.modal=document.querySelector(t):this.modal=t,o&&this.focusBtns.push(null)),!this.modal){console.warn("Modal HTMLElement not found"),this.animated=!1;return}let i=0;(s=this.config.multiple)!=null&&s.use?(this.modals.length&&document.removeEventListener("keydown",this.onKeydown),this.config.multiple.closePrevModal&&this.modals.length&&(this.closeModal(this.modals[this.modals.length-1],!1),o&&(i=this.config.animationDuration??0))):this.modals.length&&(this.closeModal(this.modals[this.modals.length-1]),o&&(i=this.config.animationDuration??0)),setTimeout(()=>{var n,a,e,l,c,r,d,v;if(this.animated=!0,(n=this.config.on)!=null&&n.beforeOpen&&this.config.on.beforeOpen(this),(e=this.modal)==null||e.classList.add(((a=this.config.classes)==null?void 0:a.open)??""),this.modal&&this.modals.push(this.modal),(l=this.config.hash)!=null&&l.add&&((c=this.modal)!=null&&c.id)&&window.history.replaceState("",location.href,"#"+this.modal.id),this.config.disableScroll){const u=this.getScrollbarWidth(),p=document.querySelector("html"),b=document.querySelector("body");p.style.overflow="hidden",p.style.paddingInlineEnd=`${u}px`,b.style.overflow="hidden"}(d=this.modal)==null||d.classList.add(((r=this.config.classes)==null?void 0:r.active)??""),(v=this.modal)==null||v.setAttribute("aria-hidden","false"),setTimeout(()=>{var u,p,b,m,w,A;if(document.addEventListener("keydown",this.onKeydown.bind(this)),(u=this.config.focus)!=null&&u.use&&this.config.focus.selectors){const x=(p=this.modal)==null?void 0:p.querySelectorAll(this.config.focus.selectors.join(", "));if(x){let S=x[0];S.hasAttribute(((b=this.config.triggersAttrs)==null?void 0:b.close)??"")&&x.length>1&&(S=x[1]),S==null||S.focus()}}(w=this.modal)==null||w.classList.remove(((m=this.config.classes)==null?void 0:m.open)??""),this.animated=!1,(A=this.config.on)!=null&&A.afterOpen&&this.config.on.afterOpen(this)},this.config.animationDuration)},i)}closeModal(t,o=!0,i=!1){var a,e,l,c,r;if(this.animated&&!i)return;this.animated=!0;let s=null;if(t?typeof t=="string"?s=document.querySelector(t):s=t:this.modal&&(s=this.modal),!s){this.animated=!1;return}const n=this.modals.findIndex(d=>d.isSameNode(s));o&&this.modals.splice(n,1),(a=this.config.on)!=null&&a.beforeClose&&this.config.on.beforeClose(this),s.classList.add(((e=this.config.classes)==null?void 0:e.close)??""),s.classList.remove(((l=this.config.classes)==null?void 0:l.active)??""),s.setAttribute("aria-hidden","true"),document.removeEventListener("keydown",this.onKeydown),(c=this.config.hash)!=null&&c.remove&&window.history.replaceState("",location.href,location.pathname+location.search),(r=this.config.multiple)!=null&&r.use&&o?this.modals.length?this.modal=this.modals[this.modals.length-1]:this.modal=null:s!=null&&s.isSameNode(this.modal)&&(this.modal=null),setTimeout(()=>{var d,v,u,p,b;if(s==null||s.classList.remove(((d=this.config.classes)==null?void 0:d.close)??""),this.config.disableScroll&&!this.modals.length){const m=document.querySelector("html"),w=document.querySelector("body");m.style.removeProperty("overflow"),m.style.removeProperty("paddingInlineEnd"),w.style.removeProperty("overflow")}if(this.animated=!1,(v=this.config.multiple)!=null&&v.use&&((u=this.config.multiple)!=null&&u.closePrevModal)&&o&&!i&&this.modals.length&&this.openModal(this.modals.pop(),!1),(p=this.config.focus)!=null&&p.use&&this.focusBtns.length)if(i){const m=this.focusBtns.find(w=>w!==null);m&&(m.focus(),this.focusBtns=[])}else{const m=this.focusBtns[n];m&&(m.focus(),o&&this.focusBtns.splice(n,1))}(b=this.config.on)!=null&&b.afterClose&&this.config.on.afterClose(this)},this.config.animationDuration)}closeAllModals(){this.modals.length&&this.modals.forEach(t=>{this.closeModal(t,!0,!0),this.modals=[]})}getScrollbarWidth(){return window.screen.width-document.documentElement.clientWidth===0?0:window.innerWidth-document.documentElement.clientWidth}onKeydown(t){this.modal&&(t.key==="Escape"&&this.closeModal(this.modal),t.key==="Tab"&&this.changeFocus(t))}changeFocus(t){var a,e;if(!((a=this.config.focus)!=null&&a.selectors))return;const o=(e=this.modal)==null?void 0:e.querySelectorAll(this.config.focus.selectors.join(", "));if(!o)return;const i=o[0],s=o[o.length-1],n=t.target;t.shiftKey?n.isEqualNode(i)&&(s.focus(),t.preventDefault()):n.isEqualNode(s)&&(i.focus(),t.preventDefault())}addStyles(){var n,a,e,l,c;const t={...this.config.classes},o=this.config.animationDuration+"ms",i=`[${(n=this.config.triggersAttrs)==null?void 0:n.close}]`,s=y({classNames:t,animationDuration:o,margin:(a=this.config.style)==null?void 0:a.valign,transform:(e=this.config.style)==null?void 0:e.animation,closeSelector:i,width:(l=this.config.style)==null?void 0:l.width});document.head.insertAdjacentHTML("beforeend",`<style>${s}</style>`),document.querySelectorAll("."+((c=this.config.classes)==null?void 0:c.modal)).forEach(r=>{r.style.removeProperty("display")})}}return g.AccessibleMinimodal=B,Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}),g}({});
