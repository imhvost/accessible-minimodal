const AccessibleMinimodal = (() => {
  const FOCUSABLE_SELECTOR = `
    button:not([disabled]),
    [href],
    input:not([disabled]):not([type="hidden"]):not([aria-hidden]),
    select:not([disabled]):not([aria-hidden]),
    textarea:not([disabled]):not([aria-hidden]),
    [tabindex]:not([tabindex="-1"]),
    [contenteditable]
  `
  const settings = {
    triggers: {
      open: 'data-modal-open',
      close: 'data-modal-close'
    },
    disableScroll: true,
    focus: true,
    outsideClose: true,
    hash: {
      open: true,
      add: true,
      remove: true
    },
    classes: {
      modal: 'modal',
      wrapp: 'modal-wrapp',
      body: 'modal-body',
      active: 'active'
    },
    style: {
      use: true,
      width: 400,
      valign: 'center',
      openAnimation: 'from-bottom',
      animationDuration: 400
    },
    on: {
      beforeOpen: function (instance) {},
      afterOpen: function (instance) {},
      beforeClose: function (instance) {},
      afterClose: function (instance) {}
    }
  }
  class MiniModal {
    constructor (settings) {
      this.modal = null
      this.backFocusNode = null
      this.openingNode = null
      this.on = settings.on
      this.animated = false
      this.config = {
        triggers: settings.triggers,
        disableScroll: settings.disableScroll,
        focus: settings.focus,
        hash: settings.hash,
        style: settings.style,
        classes: settings.classes,
        outsideClose: settings.outsideClose
      }
      this.onKeydown = this.onKeydown.bind(this)
      this.registerTriggers()
      this.addStyles()
      this.init()
    }

    init () {
      if (this.config.hash.open) {
        const hash = window.location.hash ? window.location.hash.substr(1) : ''
        if (hash) this.openModal(hash)
      }
      if (this.config.disableScroll) {
        const html = document.querySelector('html')
        this.config.disableScrollStylesDefault = {
          html: {
            overflowY: html.style.overflowY,
            paddingRight: html.style.paddingRight
          },
          body: {
            overflowY: document.body.style.overflowY
          }
        }
      }
    }

    registerTriggers () {
      const openingNodes = document.querySelectorAll(`[${this.config.triggers.open}]`)
      const closingNodes = document.querySelectorAll(`[${this.config.triggers.close}]`)
      if (openingNodes) {
        openingNodes.forEach(el => {
          el.addEventListener('click', event => {
            event.preventDefault()
            const modalId = event.target.getAttribute(this.config.triggers.open)
            this.openModal(modalId, event.target)
          })
        })
      }
      if (closingNodes) {
        closingNodes.forEach(el => {
          el.addEventListener('click', event => {
            event.preventDefault()
            if (this.modal) this.closeModal()
          })
        })
      }
      if (this.config.outsideClose) {
        const outsideCloseNode = document.querySelector('.' + this.config.classes.wrapp)
        if (outsideCloseNode) {
          outsideCloseNode.addEventListener('click', event => {
            if (!event.target.classList.contains(this.config.classes.wrapp)) return
            if (this.modal) this.closeModal()
          })
        }
      }
    }

    openModal (modalId, openingNode) {
      const animationDuration = this.getAnimationDuration()
      const timeout = this.modal ? animationDuration : 0
      if (this.modal) {
        this.closeModal(this.modal.id, false)
      }
      setTimeout(() => {
        this.modal = document.getElementById(modalId)
        if (!this.modal) return
        if (this.animated) return
        this.animated = true
        this.openingNode = openingNode
        if (!this.backFocusNode) this.backFocusNode = openingNode
        this.on.beforeOpen(this.getInstance())
        if (this.config.hash.add) {
          window.history.replaceState('', document.title, '#' + modalId)
        }
        if (this.config.disableScroll) {
          const scrollbarWidth = this.getScrollbarWidth()
          const html = document.querySelector('html')
          html.style.overflowY = 'hidden'
          html.style.paddingRight = `${scrollbarWidth}px`
          document.body.style.overflowY = 'hidden'
        }
        this.modal.classList.add(this.config.classes.active)
        this.modal.setAttribute('aria-hidden', false)
        setTimeout(() => {
          this.animated = false
          document.addEventListener('keydown', this.onKeydown)
          if (this.config.focus) {
            const focusableNodes = this.modal.querySelectorAll(FOCUSABLE_SELECTOR)
            if (!focusableNodes) return
            focusableNodes[0].focus()
          }
          this.on.afterOpen(this.getInstance())
        }, animationDuration)
      }, timeout)
    }

    closeModal (modalId, changeBackFocus = true) {
      const modal = this.modal || document.getElementById(modalId)
      if (!modal) return
      if (this.animated) return
      this.animated = true
      this.on.beforeClose(this.getInstance())
      document.removeEventListener('keydown', this.onKeydown)
      modal.classList.remove(this.config.classes.active)
      modal.setAttribute('aria-hidden', true)
      if (this.config.hash.remove) {
        window.history.replaceState('', document.title, window.location.pathname + window.location.search)
      }
      setTimeout(() => {
        this.animated = false
        if (this.config.disableScroll) {
          const html = document.querySelector('html')
          const style = this.config.disableScrollStylesDefault
          html.style.overflowY = style.html.overflowY
          html.style.paddingRight = style.html.paddingRight
          document.body.style.overflowY = style.body.overflowY
        }
        this.on.afterClose(this.getInstance())
        this.modal = null
        if (changeBackFocus && this.backFocusNode && this.config.focus) {
          this.backFocusNode.focus()
          this.backFocusNode = null
        }
      }, this.getAnimationDuration())
    }

    getAnimationDuration () {
      return settings.style.use ? settings.style.animationDuration : 0
    }

    getInstance () {
      return {
        modal: this.modal,
        openingNode: this.openingNode,
        backFocusNode: this.backFocusNode
      }
    }

    getScrollbarWidth () {
      return window.innerWidth - document.documentElement.clientWidth
    }

    onKeydown (event) {
      const key = event.keyCode
      if (key === 27) this.closeModal()
      if (key === 9) this.changeFocus(event)
    }

    changeFocus (event) {
      if (!this.config.focus) return
      const focusableNodes = this.modal.querySelectorAll(FOCUSABLE_SELECTOR)
      if (!focusableNodes) return
      const firstNode = focusableNodes[0]
      const lastNode = focusableNodes[focusableNodes.length - 1]
      if (event.shiftKey) {
        if (event.target === firstNode) {
          lastNode.focus()
          event.preventDefault()
        }
      } else if (event.target === lastNode) {
        firstNode.focus()
        event.preventDefault()
      }
    }

    addStyles () {
      if (!this.config.style.use) return
      const modal = this.config.classes.modal
      const wrapp = this.config.classes.wrapp
      const body = this.config.classes.body
      const active = this.config.classes.active
      const close = this.config.triggers.close
      const margin = getMargin(this.config.style.valign)
      const transform = getTransform(this.config.style.openAnimation)
      const animationDuration = this.getAnimationDuration()
      const style = `
      .${modal} {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 666666;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity ${animationDuration}ms, visibility ${animationDuration}ms;
        backdrop-filter: blur(5px);
      }
      .${modal}.${active} {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
      .${modal}.${active} .${body} {
        transform: none;
      }
      .${wrapp} {
        width: 100%;
        height: 100%;
        display: flex;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 40px 20px;
        overflow-y: scroll;
      }
      .${body} {
        background-color: #fff;
        flex: none;
        min-height: 1px;
        border-radius: 2px;
        width: ${this.config.style.width}px;
        max-width: 100%;
        margin: ${margin};
        padding: 20px;
        transition: ${animationDuration}ms;
        transform: ${transform};
        position: relative;
      }
      .${body} [${close}] {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 16px;
        height: 16px;
        border: 0;
        background: none;
        cursor: pointer;
      }
      .${body} [${close}]:before,
      .${body} [${close}]:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin-top: -1px;
        background-color: currentColor;
        height: 2px;
      }
      .${body} [${close}]:before {
        transform: rotate(45deg);
      }
      .${body} [${close}]:after {
        transform: rotate(-45deg);
      }      
      `
      document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`)
      function getTransform (openAnimation) {
        switch (openAnimation) {
          case 'from-top': return 'translateY(-20px)'
          case 'from-left': return 'translateX(-20px)'
          case 'from-right': return 'translateX(20px)'
          case 'zoom-in': return 'scale(.8)'
          case 'zoom-out': return 'scale(1.2)'
          case 'fade': return 'none'
          default: return 'translateY(20px)'
        }
      }
      function getMargin (valign) {
        switch (valign) {
          case 'top': return '0 auto auto'
          case 'bottom': return 'auto auto 0'
          default: return 'auto auto'
        }
      }
    }
  }
  const init = config => {
    const insideObjects = ['style', 'on', 'triggers', 'hash']
    insideObjects.forEach(name => { config[name] = Object.assign({}, settings[name], config[name]) })
    const options = Object.assign({}, settings, config)
    const modal = new MiniModal(options)
    return modal
  }
  return { init }
})()

export { AccessibleMinimodal }
