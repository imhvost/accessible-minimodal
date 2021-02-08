!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";n.r(e),n.d(e,"AccessibleMinimodal",(function(){return o}));const o=(()=>{const t='\n    button:not([disabled]),\n    [href],\n    input:not([disabled]):not([type="hidden"]):not([aria-hidden]),\n    select:not([disabled]):not([aria-hidden]),\n    textarea:not([disabled]):not([aria-hidden]),\n    [tabindex]:not([tabindex="-1"]),\n    [contenteditable="true"]\n  ',e={animationDuration:400,classes:{modal:"modal",wrapp:"modal-wrapp",body:"modal-body",active:"active",open:"open",close:"close"},disableScroll:!0,focus:!0,hash:{open:!1,add:!1,remove:!1},multiple:!1,on:{beforeOpen:function(t){},afterOpen:function(t){},beforeClose:function(t){},afterClose:function(t){}},outsideClose:!0,style:{use:!0,width:400,valign:"center",animation:"from-bottom"},triggers:{open:"data-modal-open",close:"data-modal-close"}};class n{constructor(t){this.modal=null,this.backFocusNode=null,this.openingNode=null,this.on=t.on,this.animated=!1,this.config={animationDuration:t.animationDuration,triggers:t.triggers,disableScroll:t.disableScroll,focus:t.focus,hash:t.hash,style:t.style,classes:t.classes,outsideClose:t.outsideClose,multiple:t.multiple},this.modals=[],this.onKeydown=this.onKeydown.bind(this),this.registerTriggers(),this.addStyles(),this.init()}init(){if(this.config.hash.open){const t=window.location.hash?window.location.hash.substr(1):"";t&&this.openModal(t)}if(this.config.disableScroll){const t=document.querySelector("html");this.config.disableScrollStylesDefault={html:{overflowY:t.style.overflowY,paddingRight:t.style.paddingRight},body:{overflowY:document.body.style.overflowY}}}}registerTriggers(){const t=document.querySelectorAll(`[${this.config.triggers.open}]`),e=document.querySelectorAll(`[${this.config.triggers.close}]`);if(t&&t.forEach(t=>{t.addEventListener("click",t=>{t.preventDefault();const e=t.currentTarget.getAttribute(this.config.triggers.open);this.openModal(e,t.currentTarget)})}),e&&e.forEach(t=>{t.addEventListener("click",t=>{t.preventDefault();const e=t.currentTarget.getAttribute(this.config.triggers.close);this.modal&&this.closeModal(e)})}),this.config.outsideClose){const t=document.querySelector("."+this.config.classes.wrapp);t&&t.forEach(t=>{t.addEventListener("click",t=>{t.target.classList.contains(this.config.classes.wrapp)&&this.modal&&this.closeModal()})})}}openModal(e,n,o=!1){const i=this.modal?this.config.animationDuration:0;if(this.modal){const t=this.modal.id;this.closeModal(this.modal.id,!1,!0),this.config.multiple&&!o&&this.modals.push(t)}setTimeout(()=>{if(this.modal=document.getElementById(e),this.modal&&!this.animated){if(this.animated=!0,this.openingNode=n,this.backFocusNode||(this.backFocusNode=n),this.on.beforeOpen(this),this.modal.classList.add(this.config.classes.open),this.config.hash.add&&window.history.replaceState("",document.title,"#"+e),this.config.disableScroll){const t=this.getScrollbarWidth(),e=document.querySelector("html");e.style.overflowY="hidden",e.style.paddingRight=t+"px",document.body.style.overflowY="hidden"}this.modal.classList.add(this.config.classes.active),this.modal.setAttribute("aria-hidden",!1),setTimeout(()=>{if(this.animated=!1,document.addEventListener("keydown",this.onKeydown),this.config.focus){const e=this.modal.querySelectorAll(t);if(!e)return;e[0].focus()}this.on.afterOpen(this),this.modal.classList.remove(this.config.classes.open)},this.config.animationDuration)}},i)}closeModal(t,e=!0,n=!1){const o=this.modal||document.getElementById(t);if(o&&!this.animated&&(this.animated=!0,this.on.beforeClose(this),o.classList.add(this.config.classes.close),document.removeEventListener("keydown",this.onKeydown),o.classList.remove(this.config.classes.active),o.setAttribute("aria-hidden",!0),this.config.hash.remove&&window.history.replaceState("",document.title,window.location.pathname+window.location.search),setTimeout(()=>{if(this.animated=!1,this.config.disableScroll){const t=document.querySelector("html"),e=this.config.disableScrollStylesDefault;t.style.overflowY=e.html.overflowY,t.style.paddingRight=e.html.paddingRight,document.body.style.overflowY=e.body.overflowY}this.on.afterClose(this),o.classList.remove(this.config.classes.close),this.modal=null,e&&this.backFocusNode&&this.config.focus&&(this.backFocusNode.focus(),this.backFocusNode=null)},this.config.animationDuration),this.config.multiple&&!n)){const t=this.modals.pop();this.openModal(t,!1,!0)}}getScrollbarWidth(){return window.innerWidth-document.documentElement.clientWidth}onKeydown(t){const e=t.keyCode;27===e&&this.closeModal(),9===e&&this.changeFocus(t)}changeFocus(e){if(!this.config.focus)return;const n=this.modal.querySelectorAll(t);if(!n)return;const o=n[0],i=n[n.length-1];e.shiftKey?e.currentTarget===o&&(i.focus(),e.preventDefault()):e.currentTarget===i&&(o.focus(),e.preventDefault())}addStyles(){if(!this.config.style.use)return;const t=this.config.classes.modal,e=this.config.classes.wrapp,n=this.config.classes.body,o=this.config.classes.active,i=this.config.triggers.close,s=function(t){switch(t){case"top":return"0 auto auto";case"bottom":return"auto auto 0";default:return"auto auto"}}(this.config.style.valign),r=function(t){switch(t){case"from-top":return"translateY(-20px)";case"from-left":return"translateX(-20px)";case"from-right":return"translateX(20px)";case"zoom-in":return"scale(.8)";case"zoom-out":return"scale(1.2)";case"fade":return"none";default:return"translateY(20px)"}}(this.config.style.animation),a=this.config.animationDuration,c=`\n.${t} {\nposition: fixed;\ntop: 0;\nright: 0;\nbottom: 0;\nleft: 0;\nz-index: 666666;\nopacity: 0;\nvisibility: hidden;\npointer-events: none;\ntransition: opacity ${a}ms, visibility ${a}ms;\n}\n.${t}.${o} {\nopacity: 1;\nvisibility: visible;\npointer-events: auto;\n}\n.${t}.${o} .${n} {\ntransform: none;\n}\n.${e} {\nwidth: 100%;\nheight: 100%;\ndisplay: flex;\nbackground-color: rgba(0, 0, 0, 0.7);\npadding: 40px 20px;\noverflow-y: scroll;\n}\n.${n} {\nbackground-color: #fff;\nflex: none;\nmin-height: 1px;\nborder-radius: 2px;\nwidth: ${this.config.style.width}px;\nmax-width: 100%;\nmargin: ${s};\npadding: 20px;\ntransition: ${a}ms;\ntransform: ${r};\nposition: relative;\n}\n.${n} [${i}] {\nposition: absolute;\nright: 10px;\ntop: 10px;\nwidth: 16px;\nheight: 16px;\nborder: 0;\nbackground: none;\ncursor: pointer;\n}\n.${n} [${i}]:before,\n.${n} [${i}]:after {\ncontent: '';\nposition: absolute;\ntop: 50%;\nleft: 0;\nright: 0;\nmargin-top: -1px;\nbackground-color: currentColor;\nheight: 2px;\n}\n.${n} [${i}]:before {\ntransform: rotate(45deg);\n}\n.${n} [${i}]:after {\ntransform: rotate(-45deg);\n}      \n`;document.head.insertAdjacentHTML("beforeend",`<style>${c}</style>`),document.querySelectorAll("."+this.config.classes.modal).forEach(t=>{t.style.display="block"})}}return{init:t=>{["style","on","triggers","hash"].forEach(n=>{t&&t[n]&&(t[n]=Object.assign({},e[n],t[n]))});const o=Object.assign({},e,t);return new n(o)}}})();window.AccessibleMinimodal=o},function(t,e,n){"use strict";n.r(e);n(2);const o=n(0).AccessibleMinimodal.init({multiple:!0,style:{width:400,openAnimation:"from-left"},on:{beforeOpen:t=>console.log(t)}});console.log(o)},function(t,e,n){var o=n(3),i=n(4);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var s={insert:"head",singleton:!1};o(i,s);t.exports=i.locals||{}},function(t,e,n){"use strict";var o,i=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},s=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),r=[];function a(t){for(var e=-1,n=0;n<r.length;n++)if(r[n].identifier===t){e=n;break}return e}function c(t,e){for(var n={},o=[],i=0;i<t.length;i++){var s=t[i],c=e.base?s[0]+e.base:s[0],l=n[c]||0,d="".concat(c," ").concat(l);n[c]=l+1;var u=a(d),f={css:s[1],media:s[2],sourceMap:s[3]};-1!==u?(r[u].references++,r[u].updater(f)):r.push({identifier:d,updater:g(f,e),references:1}),o.push(d)}return o}function l(t){var e=document.createElement("style"),o=t.attributes||{};if(void 0===o.nonce){var i=n.nc;i&&(o.nonce=i)}if(Object.keys(o).forEach((function(t){e.setAttribute(t,o[t])})),"function"==typeof t.insert)t.insert(e);else{var r=s(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var d,u=(d=[],function(t,e){return d[t]=e,d.filter(Boolean).join("\n")});function f(t,e,n,o){var i=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(t.styleSheet)t.styleSheet.cssText=u(e,i);else{var s=document.createTextNode(i),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(s,r[e]):t.appendChild(s)}}function h(t,e,n){var o=n.css,i=n.media,s=n.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),s&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var p=null,m=0;function g(t,e){var n,o,i;if(e.singleton){var s=m++;n=p||(p=l(e)),o=f.bind(null,n,s,!1),i=f.bind(null,n,s,!0)}else n=l(e),o=h.bind(null,n,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=i());var n=c(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var o=0;o<n.length;o++){var i=a(n[o]);r[i].references--}for(var s=c(t,e),l=0;l<n.length;l++){var d=a(n[l]);0===r[d].references&&(r[d].updater(),r.splice(d,1))}n=s}}}},function(t,e,n){(e=n(5)(!1)).push([t.i,"",""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var i=(r=o,a=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(c," */")),s=o.sources.map((function(t){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(t," */")}));return[n].concat(s).concat([i]).join("\n")}var r,a,c;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,o){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(o)for(var s=0;s<this.length;s++){var r=this[s][0];null!=r&&(i[r]=!0)}for(var a=0;a<t.length;a++){var c=[].concat(t[a]);o&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}}]);