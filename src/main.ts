import { settingsDefault } from './settings';
import type { AccessibleMinimodalSettings } from './settings';
import { buildStyle } from './style';

export class AccessibleMinimodal {
  config: AccessibleMinimodalSettings;
  modal: HTMLElement | null;
  openBtn: HTMLElement | null;
  modals: HTMLElement[];
  focusBtns: Array<HTMLElement | null>;
  animated: boolean;
  constructor(settings: AccessibleMinimodalSettings = {}) {
    for (const [key, value] of Object.entries(settings)) {
      const key_ = key as keyof AccessibleMinimodalSettings;
      if (value === undefined) {
        delete settings[key_];
        continue;
      }
      if (typeof value === 'object') {
        const value_ = { ...(value as object) };
        for (const [k, v] of Object.entries(value_)) {
          const k_ = k as keyof object;
          if (v === undefined) {
            delete value_[k_];
          }
        }
        (settings[key_] as AccessibleMinimodalSettings[typeof key_]) = {
          ...value_,
        };
      }
    }

    this.config = Object.assign({}, settingsDefault, settings);
    Object.keys(settings).map(key => {
      const key_ = key as keyof AccessibleMinimodalSettings;
      if (typeof settings[key_] === 'object') {
        (this.config[key_] as AccessibleMinimodalSettings[typeof key_]) =
          Object.assign({}, settingsDefault[key_], settings[key_]);
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

  protected init() {
    if (this.config.style?.use) {
      this.addStyles();
    }
    if (this.config.hash?.open) {
      const hash = window.location.hash.substring(1) ?? '';
      if (hash) {
        this.modal = document.getElementById(hash);
        this.openModal();
      }
    }
  }

  private addTriggers() {
    document.addEventListener('click', (event: Event) => {
      const getTriggerNode = (triggerAttr: string): HTMLElement | null => {
        const target = event.target as HTMLElement;
        if (target.getAttribute(triggerAttr)) {
          return target;
        }
        return target.closest(`[${triggerAttr}]`);
      };
      const openBtn = getTriggerNode(this.config.triggersAttrs?.open ?? '');
      if (openBtn) {
        event.preventDefault();
        this.modal = document.getElementById(
          openBtn.getAttribute(this.config.triggersAttrs?.open ?? '') ?? ''
        );
        this.openBtn = openBtn;
        this.focusBtns.push(this.openBtn);
        this.openModal();
      }
      if (getTriggerNode(this.config.triggersAttrs?.close ?? '')) {
        event.preventDefault();
        this.closeModal();
      }
      if (getTriggerNode(this.config.triggersAttrs?.closeAll ?? '')) {
        event.preventDefault();
        this.closeAllModals();
      }
      if (this.config.outsideClose) {
        const target = event.target as HTMLElement;
        if (
          this.modal &&
          target.classList.contains(this.config.classes?.wrapp ?? '') &&
          !document?.activeElement?.closest('.' + this.config.classes?.body)
        ) {
          event.preventDefault();
          this.closeModal(this.modal);
        }
      }
    });
  }

  private getOnInstance() {
    return {
      modal: this.modal,
      openBtn: this.openBtn,
      config: this.config,
    };
  }

  public openModal(selector?: string | HTMLElement) {
    this._openModal(selector);
  }

  private _openModal(selector?: string | HTMLElement, useTimeout = true) {
    if (this.animated) {
      return;
    }

    if (selector) {
      if (typeof selector === 'string') {
        this.modal = document.querySelector(selector);
      } else {
        this.modal = selector;
      }
      if (useTimeout) {
        this.focusBtns.push(null);
      }
    }
    if (!this.modal) {
      console.warn('AccessibleMinimodal warn: Modal HTMLElement not found');
      this.animated = false;
      return;
    }

    let timeout = 0;

    if (this.config.multiple?.use) {
      if (this.modals.length) {
        document.removeEventListener('keydown', this.onKeydown);
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
      this.animated = true;

      if (this.config.on?.beforeOpen) {
        this.config.on.beforeOpen(this.getOnInstance());
        this.modal?.dispatchEvent(
          new Event('accessible-minimodal:before-open')
        );
      }

      this.modal?.classList.add(this.config.classes?.open ?? '');

      if (this.config.disableScroll?.use && !this.modals.length) {
        const scrollbarWidth = this.getScrollbarWidth();
        const html = document.querySelector('html') as HTMLElement;
        const body = document.querySelector('body') as HTMLElement;
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        if (scrollbarWidth) {
          html.style.paddingInlineEnd = `${scrollbarWidth}px`;
          const { jumpingElements } = this.config.disableScroll;
          if (jumpingElements) {
            if (Array.isArray(jumpingElements) && jumpingElements.length) {
              jumpingElements.forEach(
                el => (el.style.marginInlineEnd = `${scrollbarWidth}px`)
              );
            } else if (typeof jumpingElements === 'string') {
              document
                .querySelectorAll(jumpingElements)
                .forEach(
                  el =>
                    ((
                      el as HTMLElement
                    ).style.marginInlineEnd = `${scrollbarWidth}px`)
                );
            }
          }
        }
      }

      if (this.modal) {
        this.modals.push(this.modal);
      }

      if (this.config.hash?.add && this.modal?.id) {
        window.history.replaceState('', location.href, '#' + this.modal.id);
      }

      this.modal?.classList.add(this.config.classes?.active ?? '');
      this.modal?.setAttribute('aria-hidden', 'false');

      setTimeout(() => {
        this.modal?.classList.remove(this.config.classes?.open ?? '');

        this.animated = false;
        if (this.config.focus?.use && this.config.focus.selectors) {
          const focusableNodes = this.modal?.querySelectorAll(
            this.config.focus.selectors.join(', ')
          );

          if (focusableNodes) {
            let focusableNode = focusableNodes[0];

            if (
              focusableNode &&
              focusableNode.hasAttribute(
                this.config.triggersAttrs?.close ?? ''
              ) &&
              focusableNodes.length > 1
            ) {
              focusableNode = focusableNodes[1];
            }
            if (focusableNode) {
              (focusableNode as HTMLElement).focus();
            }
          }
        }

        document.addEventListener('keydown', this.onKeydown.bind(this));

        if (this.config.on?.afterOpen) {
          this.config.on.afterOpen(this.getOnInstance());
          this.modal?.dispatchEvent(
            new Event('accessible-minimodal:after-open')
          );
        }
      }, this.config.animationDuration);
    }, timeout);
  }

  public closeModal(selector?: string | HTMLElement) {
    this._closeModal(selector);
  }

  private _closeModal(
    selector?: string | HTMLElement,
    removeFromModals = true,
    closeAll = false
  ) {
    if (this.animated && !closeAll) {
      return;
    }

    this.animated = true;
    let closedModal: HTMLElement | null = null;
    if (selector) {
      if (typeof selector === 'string') {
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

    const modalIndex = this.modals.findIndex(el => el.isSameNode(closedModal));
    if (removeFromModals) {
      this.modals.splice(modalIndex, 1);
    }

    if (this.config.on?.beforeClose) {
      this.config.on.beforeClose(this.getOnInstance());
      this.modal?.dispatchEvent(new Event('accessible-minimodal:before-close'));
    }

    closedModal.classList.add(this.config.classes?.close ?? '');
    closedModal.classList.remove(this.config.classes?.active ?? '');
    closedModal.setAttribute('aria-hidden', 'true');

    document.removeEventListener('keydown', this.onKeydown);

    if (this.config.hash?.remove) {
      window.history.replaceState(
        '',
        location.href,
        location.pathname + location.search
      );
    }

    setTimeout(() => {
      closedModal?.classList.remove(this.config.classes?.close ?? '');

      if (this.config.on?.afterClose) {
        this.config.on.afterClose(this.getOnInstance());
        this.modal?.dispatchEvent(
          new Event('accessible-minimodal:after-close')
        );
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

      if (
        this.config.multiple?.use &&
        this.config.multiple?.closePrevModal &&
        removeFromModals &&
        !closeAll &&
        this.modals.length
      ) {
        this._openModal(this.modals.pop(), false);
      }

      if (this.config.focus?.use && this.focusBtns.length) {
        if (closeAll) {
          const focusBtn = this.focusBtns.find(btn => btn !== null);
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

      if (this.config.disableScroll?.use && !this.modals.length) {
        const html = document.querySelector('html') as HTMLElement;
        const body = document.querySelector('body') as HTMLElement;
        html.style.removeProperty('overflow');
        html.style.removeProperty('padding-inline-end');
        body.style.removeProperty('overflow');
        const { jumpingElements } = this.config.disableScroll;
        if (jumpingElements) {
          if (Array.isArray(jumpingElements) && jumpingElements.length) {
            jumpingElements.forEach(el =>
              el.style.removeProperty('margin-inline-end')
            );
          } else if (typeof jumpingElements === 'string') {
            document
              .querySelectorAll(jumpingElements)
              .forEach(el =>
                (el as HTMLElement).style.removeProperty('margin-inline-end')
              );
          }
        }
      }
    }, this.config.animationDuration);
  }

  public closeAllModals() {
    if (this.modals.length) {
      this.modals.forEach(modal => {
        this._closeModal(modal, false, true);
        this.modals = [];
      });
    }
  }

  public getScrollbarWidth(): number {
    return window.screen.width - document.documentElement.clientWidth === 0
      ? 0
      : window.innerWidth - document.documentElement.clientWidth;
  }

  protected onKeydown(event: KeyboardEvent) {
    if (!this.modal) {
      return;
    }
    if (event.key === 'Escape') {
      this.closeModal(this.modal);
    }
    if (event.key === 'Tab') {
      this.changeFocus(event);
    }
  }

  protected changeFocus(event: KeyboardEvent) {
    if (!this.config.focus?.selectors) {
      return;
    }
    const focusableNodes = this.modal?.querySelectorAll(
      this.config.focus.selectors.join(', ')
    );
    if (!focusableNodes) {
      return;
    }
    const firstNode = focusableNodes[0] as HTMLElement;
    const lastNode = focusableNodes[focusableNodes.length - 1] as HTMLElement;
    const target = event.target as HTMLElement;

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

  protected addStyles() {
    const classNames = { ...this.config.classes };
    const animationDuration = this.config.animationDuration + 'ms';
    const closeSelector = `[${this.config.triggersAttrs?.close}]`;

    const style = buildStyle({
      classNames: classNames,
      animationDuration: animationDuration,
      margin: this.config.style?.valign,
      transform: this.config.style?.animation,
      closeSelector: closeSelector,
      width: this.config.style?.width,
    });

    document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`);
    document.querySelectorAll('.' + this.config.classes?.modal).forEach(el => {
      (el as HTMLElement).style.removeProperty('display');
    });
  }
}
