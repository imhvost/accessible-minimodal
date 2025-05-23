
/*!
* accessible-minimodal v2.6.6
* https://github.com/imhvost/accessible-minimodal
*/

const settingsDefault = {
  animationDuration: 400,
  classes: {
    modal: "modal",
    wrapp: "modal-wrapp",
    body: "modal-body",
    closeBtn: "modal-close-btn",
    active: "active",
    open: "open",
    close: "close"
  },
  disableScroll: {
    use: true,
    jumpingElements: ""
  },
  focus: {
    use: true,
    selectors: [
      "button:not([disabled])",
      "a[href]",
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      "select:not([disabled]):not([aria-hidden])",
      "textarea:not([disabled]):not([aria-hidden])",
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ]
  },
  hash: {
    open: false,
    add: false,
    remove: false
  },
  multiple: {
    use: false,
    closePrevModal: false
  },
  on: {
    beforeOpen: void 0,
    afterOpen: void 0,
    beforeClose: void 0,
    afterClose: void 0
  },
  outsideClose: true,
  style: {
    use: false,
    width: 400,
    valign: "center",
    animation: "from-bottom"
  },
  triggers: {
    use: true,
    open: "data-modal-open",
    close: "data-modal-close",
    closeAll: "data-modal-close-all"
  }
};

const buildStyle = (props) => {
  const { modal, wrapp, body, closeBtn, active, open, close } = props.classNames;
  const varPrefix = "--accessible-minimodal";
  const getMargin = (valign) => {
    switch (valign) {
      case "top":
        return "0 auto auto";
      case "bottom":
        return "auto auto 0";
      default:
        return "auto";
    }
  };
  const getTransform = (animation) => {
    switch (animation) {
      case "from-top":
        return `translateY( calc(var(${varPrefix}-translate) * -1) )`;
      case "from-left":
        return `translateX( calc(var(${varPrefix}-translate) * -1) )`;
      case "from-right":
        return `translateX(var(${varPrefix}-translate))`;
      case "zoom-in":
        return "scale(.8)";
      case "zoom-out":
        return "scale(1.2)";
      case "fade":
        return "none";
      default:
        return `translateY(var(${varPrefix}-translate))`;
    }
  };
  const margin = getMargin(props.margin ?? "");
  const transform = getTransform(props.transform ?? "");
  const style = `
:root{
${varPrefix}-color: #333;
${varPrefix}-bg: #fff;
${varPrefix}-filter: rgba(0, 0, 0, .7);
${varPrefix}-z-index: 666666;
${varPrefix}-padding: 40px;
${varPrefix}-border-radius: 4px;
${varPrefix}-translate: 20px;
${varPrefix}-scale-in: .8;
${varPrefix}-scale-out: 1.2;
}
.${modal} {
  position: fixed;
  inset: 0;
  z-index: var(${varPrefix}-z-index);
  transition-property: opacity, visibility;
}
.${modal}:not(.${active}) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.${modal}.${open},
.${modal}.${close} {
  transition-duration: ${props.animationDuration};
}
.${modal}.${active} .${body} {
  transform: none;
}
.${wrapp} {
  height: 100%;
  display: flex;
  background-color: var(${varPrefix}-filter);
  padding: var(${varPrefix}-padding) calc(var(${varPrefix}-padding) / 2);
  overflow-y: scroll;
}
.${body} {
  background-color: var(${varPrefix}-bg);
  color: var(${varPrefix}-color);
  flex: none;
  min-height: 0;
  border-radius: var(${varPrefix}-border-radius);
  width: ${props.width}px;
  max-width: 100%;
  margin: ${margin};
  padding: var(${varPrefix}-padding);
  transform: ${transform};
  position: relative;
  transition-duration: ${props.animationDuration};
  transition-property: transform;
}
.${closeBtn} {
  position: absolute;
  right: calc(var(${varPrefix}-padding) / 4);
  top: calc(var(${varPrefix}-padding) / 4);
  width: calc(var(${varPrefix}-padding) / 2);
  height: calc(var(${varPrefix}-padding) / 2);
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 0;
}
.${closeBtn}:before,
.${closeBtn}:after {
  content: '';
  position: absolute;
  width: 16px;
  inset: 50% 0 auto 50%;
  margin: -1px 0 0 -8px;
  background-color: currentColor;
  height: 2px;
}
.${closeBtn}:before {
  transform: rotate(45deg);
}
.${closeBtn}:after {
  transform: rotate(-45deg);
}
`;
  return style.replace(/\s*([:;,{}])\s*/g, "$1");
};

class AccessibleMinimodal {
  config;
  modal;
  openBtn;
  modals;
  focusBtns;
  animated;
  constructor(settings = {}) {
    for (const [key, value] of Object.entries(settings)) {
      const key_ = key;
      if (value === void 0) {
        delete settings[key_];
        continue;
      }
      if (typeof value === "object") {
        const value_ = { ...value };
        for (const [k, v] of Object.entries(value_)) {
          const k_ = k;
          if (v === void 0) {
            delete value_[k_];
          }
        }
        settings[key_] = {
          ...value_
        };
      }
    }
    this.config = Object.assign({}, settingsDefault, settings);
    Object.keys(settings).map((key) => {
      const key_ = key;
      if (typeof settings[key_] === "object") {
        this.config[key_] = Object.assign({}, settingsDefault[key_], settings[key_]);
      }
    });
    this.modal = null;
    this.openBtn = null;
    this.modals = [];
    this.focusBtns = [];
    this.animated = false;
    this.init();
  }
  init() {
    if (this.config.triggers?.use) {
      this.addTriggers();
    }
    if (this.config.style?.use) {
      this.addStyles();
    }
    if (this.config.hash?.open) {
      const hash = window.location.hash.substring(1) ?? "";
      if (hash) {
        this.modal = document.getElementById(hash);
        this.openModal();
      }
    }
  }
  addTriggers(triggers) {
    triggers = triggers || this.config.triggers;
    document.addEventListener("click", (event) => {
      const getTriggerNode = (triggerAttr) => {
        if (!triggerAttr) {
          return null;
        }
        const target = event.target;
        if (target.getAttribute(triggerAttr)) {
          return target;
        }
        return target.closest(`[${triggerAttr}]`);
      };
      const openBtn = getTriggerNode(triggers?.open ?? "");
      if (openBtn) {
        event.preventDefault();
        this.modal = document.getElementById(
          openBtn.getAttribute(triggers?.open ?? "") ?? ""
        );
        this.openBtn = openBtn;
        this.focusBtns.push(this.openBtn);
        this.openModal();
      }
      if (getTriggerNode(triggers?.close ?? "")) {
        event.preventDefault();
        this.closeModal();
      }
      if (getTriggerNode(triggers?.closeAll ?? "")) {
        event.preventDefault();
        this.closeAllModals();
      }
      if (this.config.outsideClose) {
        const target = event.target;
        if (this.modal && target.classList.contains(this.config.classes?.wrapp ?? "") && !document?.activeElement?.closest("." + this.config.classes?.body)) {
          event.preventDefault();
          this.closeModal(this.modal);
        }
      }
    });
  }
  getOnInstance() {
    return {
      modal: this.modal,
      openBtn: this.openBtn
    };
  }
  openModal(selector) {
    this._openModal(selector);
  }
  _openModal(selector, useTimeout = true) {
    if (this.animated) {
      return;
    }
    if (selector) {
      if (typeof selector === "string") {
        this.modal = document.getElementById(selector);
      } else {
        this.modal = selector;
      }
      if (useTimeout) {
        this.focusBtns.push(null);
      }
    }
    if (!this.modal) {
      console.warn("AccessibleMinimodal warn: Modal HTMLElement not found");
      return;
    }
    const isCancel = this.modal?.dispatchEvent(
      new Event("accessible-minimodal:before-open", {
        cancelable: true
      })
    );
    if (!isCancel) {
      return;
    }
    this.animated = true;
    if (this.config.on?.beforeOpen) {
      this.config.on.beforeOpen(this.getOnInstance());
    }
    let timeout = 0;
    if (this.config.multiple?.use) {
      if (this.modals.length) {
        document.removeEventListener("keydown", this.onKeydown);
      }
      if (this.config.multiple.closePrevModal && this.modals.length) {
        this._closeModal(this.modals[this.modals.length - 1], false);
        if (useTimeout) {
          timeout = this.config.animationDuration ?? 0;
        }
      }
    } else if (this.modals.length) {
      this.closeModal(this.modals[this.modals.length - 1]);
      if (useTimeout) {
        timeout = this.config.animationDuration ?? 0;
      }
    }
    setTimeout(() => {
      this.modal?.classList.add(this.config.classes?.open ?? "");
      if (this.config.disableScroll?.use && !this.modals.length) {
        const scrollbarWidth = this.getScrollbarWidth();
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        if (scrollbarWidth) {
          html.style.paddingInlineEnd = `${scrollbarWidth}px`;
          const { jumpingElements } = this.config.disableScroll;
          if (jumpingElements) {
            if (Array.isArray(jumpingElements) && jumpingElements.length) {
              jumpingElements.forEach(
                (el) => el.style.marginInlineEnd = `${scrollbarWidth}px`
              );
            } else if (typeof jumpingElements === "string") {
              document.querySelectorAll(jumpingElements).forEach(
                (el) => el.style.marginInlineEnd = `${scrollbarWidth}px`
              );
            }
          }
        }
      }
      if (this.modal) {
        this.modals.push(this.modal);
      }
      if (this.config.hash?.add && this.modal?.id) {
        window.history.replaceState("", location.href, "#" + this.modal.id);
      }
      this.modal?.classList.add(this.config.classes?.active ?? "");
      setTimeout(() => {
        this.modal?.classList.remove(this.config.classes?.open ?? "");
        this.animated = false;
        if (this.config.focus?.use && this.config.focus.selectors) {
          const focusableNodes = this.modal?.querySelectorAll(
            this.config.focus.selectors.join(", ")
          );
          if (focusableNodes) {
            let focusableNode = focusableNodes[0];
            if (focusableNode && focusableNode.hasAttribute(this.config.triggers?.close ?? "") && focusableNodes.length > 1) {
              focusableNode = focusableNodes[1];
            }
            if (focusableNode) {
              focusableNode.focus();
            }
          }
        }
        document.addEventListener("keydown", this.onKeydown.bind(this));
        this.modal?.dispatchEvent(new Event("accessible-minimodal:after-open"));
        if (this.config.on?.afterOpen) {
          this.config.on.afterOpen(this.getOnInstance());
        }
      }, this.config.animationDuration);
    }, timeout);
  }
  closeModal(selector) {
    this._closeModal(selector);
  }
  _closeModal(selector, removeFromModals = true, closeAll = false) {
    if (this.animated && !closeAll) {
      return;
    }
    let closedModal = null;
    if (selector) {
      if (typeof selector === "string") {
        closedModal = document.getElementById(selector);
      } else {
        closedModal = selector;
      }
    } else {
      if (this.modal) {
        closedModal = this.modal;
      }
    }
    if (!closedModal) {
      return;
    }
    const isCancel = this.modal?.dispatchEvent(
      new Event("accessible-minimodal:before-close", { cancelable: true })
    );
    if (!isCancel) {
      return;
    }
    this.animated = true;
    if (this.config.on?.beforeClose) {
      this.config.on.beforeClose(this.getOnInstance());
    }
    const modalIndex = this.modals.findIndex((el) => el.isSameNode(closedModal));
    if (removeFromModals && !closeAll) {
      this.modals.splice(modalIndex, 1);
    }
    closedModal.classList.add(this.config.classes?.close ?? "");
    closedModal.classList.remove(this.config.classes?.active ?? "");
    document.removeEventListener("keydown", this.onKeydown);
    if (this.config.hash?.remove) {
      window.history.replaceState(
        "",
        location.href,
        location.pathname + location.search
      );
    }
    setTimeout(() => {
      closedModal?.classList.remove(this.config.classes?.close ?? "");
      this.modal?.dispatchEvent(new Event("accessible-minimodal:after-close"));
      if (this.config.on?.afterClose) {
        this.config.on.afterClose(this.getOnInstance());
      }
      if (this.config.multiple?.use && removeFromModals) {
        if (this.modals.length) {
          if (closeAll) {
            this.modals.pop();
          }
          this.modal = this.modals[this.modals.length - 1];
        } else {
          this.modal = null;
        }
      } else {
        if (closedModal?.isSameNode(this.modal)) {
          this.modal = null;
        }
      }
      this.animated = false;
      if (this.config.multiple?.use && this.config.multiple?.closePrevModal && removeFromModals && !closeAll && this.modals.length) {
        this._openModal(this.modals.pop(), false);
      }
      if (this.focusBtns.length) {
        if (closeAll) {
          const focusBtn = this.focusBtns.find((btn) => btn !== null);
          if (focusBtn) {
            focusBtn.focus();
          }
        } else {
          const focusBtn = this.focusBtns[modalIndex];
          if (focusBtn) {
            focusBtn.focus();
            if (removeFromModals) {
              this.focusBtns.splice(modalIndex, 1);
            }
          }
        }
      }
      if (this.config.disableScroll?.use && !this.modals.length) {
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        html.style.removeProperty("overflow");
        html.style.removeProperty("padding-inline-end");
        body.style.removeProperty("overflow");
        const { jumpingElements } = this.config.disableScroll;
        if (jumpingElements) {
          if (Array.isArray(jumpingElements) && jumpingElements.length) {
            jumpingElements.forEach(
              (el) => el.style.removeProperty("margin-inline-end")
            );
          } else if (typeof jumpingElements === "string") {
            document.querySelectorAll(jumpingElements).forEach(
              (el) => el.style.removeProperty("margin-inline-end")
            );
          }
        }
      }
      if (closeAll) {
        this.focusBtns = [];
        this.modals = [];
        this.modal = null;
      }
    }, this.config.animationDuration);
  }
  closeAllModals() {
    if (this.modals.length) {
      this.modals.forEach((modal) => {
        this._closeModal(modal, true, true);
      });
    }
  }
  getScrollbarWidth() {
    return window.screen.width - document.documentElement.clientWidth === 0 ? 0 : window.innerWidth - document.documentElement.clientWidth;
  }
  onKeydown(event) {
    if (!this.modal) {
      return;
    }
    if (event.key === "Escape") {
      this.closeModal(this.modal);
    }
    if (event.key === "Tab") {
      this.changeFocus(event);
    }
  }
  changeFocus(event) {
    if (!this.config.focus?.selectors) {
      return;
    }
    const focusableNodes = this.modal?.querySelectorAll(
      this.config.focus.selectors.join(", ")
    );
    if (!focusableNodes) {
      return;
    }
    const firstNode = focusableNodes[0];
    const lastNode = focusableNodes[focusableNodes.length - 1];
    const target = event.target;
    if (event.shiftKey) {
      if (target.isEqualNode(firstNode)) {
        lastNode.focus();
        event.preventDefault();
      }
    } else if (target.isEqualNode(lastNode)) {
      firstNode.focus();
      event.preventDefault();
    }
  }
  addStyles() {
    const classNames = { ...this.config.classes };
    const animationDuration = this.config.animationDuration + "ms";
    const style = buildStyle({
      classNames,
      animationDuration,
      margin: this.config.style?.valign,
      transform: this.config.style?.animation,
      width: this.config.style?.width
    });
    document.head.insertAdjacentHTML("beforeend", `<style>${style}</style>`);
    document.querySelectorAll("." + this.config.classes?.modal).forEach((el) => {
      el.style.removeProperty("display");
    });
  }
}

export { AccessibleMinimodal };

          if (globalThis.AccessibleMinimodal) {
            for (const key of Object.keys(globalThis.AccessibleMinimodal)) {
              globalThis[key] = globalThis.AccessibleMinimodal[key]
            }
          }
        
