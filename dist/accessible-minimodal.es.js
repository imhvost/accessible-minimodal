
/*!
* accessible-minimodal v2.0.20
* https://github.com/imhvost/accessible-minimodal
*/

const settingsDefault = {
  animationDuration: 400,
  classes: {
    modal: "modal",
    wrapp: "modal-wrapp",
    body: "modal-body",
    active: "active",
    open: "open",
    close: "close"
  },
  disableScroll: true,
  focus: {
    use: true,
    selectors: [
      "button:not([disabled])",
      "[href]",
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
    beforeOpen: () => ({}),
    afterOpen: () => ({}),
    beforeClose: () => ({}),
    afterClose: () => ({})
  },
  outsideClose: true,
  style: {
    use: false,
    width: 400,
    valign: "center",
    animation: "from-bottom"
  },
  triggersAttrs: {
    open: "data-modal-open",
    close: "data-modal-close",
    closeAll: "data-modal-close-all"
  }
};

const buildStyle = (props) => {
  const { modal, wrapp, body, active, open, close } = props.classNames;
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
}
.${modal}:not(.${active}) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.${modal}.${open},
.${modal}.${close} {
  transition: opacity ${props.animationDuration}, visibility ${props.animationDuration};
}
.${modal}.open .${body},
.${modal}.close .${body} {
  transition: transform ${props.animationDuration};
}
.${modal}.${active} .${body} {
  transform: none;
}
.${wrapp} {
  height: 100%;
  display: flex;
  background-color: var(${varPrefix}-filter);
  padding: var(${varPrefix}-padding) calc(${varPrefix}-padding / 2);
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
}
.${body} > ${props.closeSelector} {
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
.${body} > ${props.closeSelector}:before,
.${body} > ${props.closeSelector}:after {
  content: '';
  position: absolute;
  width: 16px;
  inset: 50% 0 auto 50%;
  margin: -1px 0 0 -8px;
  background-color: currentColor;
  height: 2px;
}
.${body} > ${props.closeSelector}:before {
  transform: rotate(45deg);
}
.${body} ${props.closeSelector}:after {
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
    this.addTriggers();
  }
  init() {
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
  addTriggers() {
    document.addEventListener("click", (event) => {
      const getTriggerNode = (triggerAttr) => {
        const target = event.target;
        if (target.getAttribute(triggerAttr)) {
          return target;
        }
        return target.closest(`[${triggerAttr}]`);
      };
      const openBtn = getTriggerNode(this.config.triggersAttrs?.open ?? "");
      if (openBtn) {
        event.preventDefault();
        this.modal = document.getElementById(
          openBtn.getAttribute(this.config.triggersAttrs?.open ?? "") ?? ""
        );
        this.openBtn = openBtn;
        this.focusBtns.push(this.openBtn);
        this.openModal();
      }
      if (getTriggerNode(this.config.triggersAttrs?.close ?? "")) {
        event.preventDefault();
        this.closeModal();
      }
      if (getTriggerNode(this.config.triggersAttrs?.closeAll ?? "")) {
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
  openModal(selector, useTimeout = true) {
    if (this.animated) {
      return;
    }
    if (selector) {
      if (typeof selector === "string") {
        this.modal = document.querySelector(selector);
      } else {
        this.modal = selector;
      }
      if (useTimeout) {
        this.focusBtns.push(null);
      }
    }
    if (!this.modal) {
      console.warn("Modal HTMLElement not found");
      this.animated = false;
      return;
    }
    let timeout = 0;
    if (this.config.multiple?.use) {
      if (this.modals.length) {
        document.removeEventListener("keydown", this.onKeydown);
      }
      if (this.config.multiple.closePrevModal && this.modals.length) {
        this.closeModal(this.modals[this.modals.length - 1], false);
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
      this.animated = true;
      if (this.config.on?.beforeOpen) {
        this.config.on.beforeOpen({ ...this });
      }
      this.modal?.classList.add(this.config.classes?.open ?? "");
      if (this.config.disableScroll && !this.modals.length) {
        const scrollbarWidth = this.getScrollbarWidth();
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        if (scrollbarWidth) {
          html.style.paddingInlineEnd = `${scrollbarWidth}px`;
        }
      }
      if (this.modal) {
        this.modals.push(this.modal);
      }
      if (this.config.hash?.add && this.modal?.id) {
        window.history.replaceState("", location.href, "#" + this.modal.id);
      }
      this.modal?.classList.add(this.config.classes?.active ?? "");
      this.modal?.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        document.addEventListener("keydown", this.onKeydown.bind(this));
        if (this.config.focus?.use && this.config.focus.selectors) {
          const focusableNodes = this.modal?.querySelectorAll(
            this.config.focus.selectors.join(", ")
          );
          if (focusableNodes) {
            let focusableNode = focusableNodes[0];
            if (focusableNode && focusableNode.hasAttribute(
              this.config.triggersAttrs?.close ?? ""
            ) && focusableNodes.length > 1) {
              focusableNode = focusableNodes[1];
            }
            focusableNode?.focus();
          }
        }
        this.modal?.classList.remove(this.config.classes?.open ?? "");
        this.animated = false;
        if (this.config.on?.afterOpen) {
          this.config.on.afterOpen({ ...this });
        }
      }, this.config.animationDuration);
    }, timeout);
  }
  closeModal(selector, removeFromModals = true, closeAll = false) {
    if (this.animated && !closeAll) {
      return;
    }
    this.animated = true;
    let closedModal = null;
    if (selector) {
      if (typeof selector === "string") {
        closedModal = document.querySelector(selector);
      } else {
        closedModal = selector;
      }
    } else {
      if (this.modal) {
        closedModal = this.modal;
      }
    }
    if (!closedModal) {
      this.animated = false;
      return;
    }
    const modalIndex = this.modals.findIndex((el) => el.isSameNode(closedModal));
    if (removeFromModals) {
      this.modals.splice(modalIndex, 1);
    }
    if (this.config.on?.beforeClose) {
      this.config.on.beforeClose({ ...this });
    }
    closedModal.classList.add(this.config.classes?.close ?? "");
    closedModal.classList.remove(this.config.classes?.active ?? "");
    closedModal.setAttribute("aria-hidden", "true");
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
      if (this.config.disableScroll && !this.modals.length) {
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        html.style.removeProperty("overflow");
        html.style.removeProperty("padding-inline-end");
        body.style.removeProperty("overflow");
      }
      if (this.config.on?.afterClose) {
        this.config.on.afterClose({ ...this });
      }
      if (this.config.multiple?.use && removeFromModals) {
        if (this.modals.length) {
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
        this.openModal(this.modals.pop(), false);
      }
      if (this.config.focus?.use && this.focusBtns.length) {
        if (closeAll) {
          const focusBtn = this.focusBtns.find((btn) => btn !== null);
          if (focusBtn) {
            focusBtn.focus();
            this.focusBtns = [];
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
    }, this.config.animationDuration);
  }
  closeAllModals() {
    if (this.modals.length) {
      this.modals.forEach((modal) => {
        console.log(modal);
        this.closeModal(modal, false, true);
        this.modals = [];
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
    const closeSelector = `[${this.config.triggersAttrs?.close}]`;
    const style = buildStyle({
      classNames,
      animationDuration,
      margin: this.config.style?.valign,
      transform: this.config.style?.animation,
      closeSelector,
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
        
