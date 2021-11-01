const AccessibleMinimodal = (() => {
  const FOCUSABLE_SELECTOR = `
    button:not([disabled]),
    [href],
    input:not([disabled]):not([type="hidden"]):not([aria-hidden]),
    select:not([disabled]):not([aria-hidden]),
    textarea:not([disabled]):not([aria-hidden]),
    [tabindex]:not([tabindex="-1"]),
    [contenteditable="true"]
  `
  const settings = {
    animationDuration: 400,
    classes: {
      modal: 'modal',
      wrapp: 'modal-wrapp',
      body: 'modal-body',
      active: 'active',
      open: 'open',
      close: 'close'
    },
    disableScroll: true,
    focus: true,
    hash: {
      open: false,
      add: false,
      remove: false
    },
    multiple: false,
    multipleClosePrev: true,
    on: {
      beforeOpen: function (instance) {},
      afterOpen: function (instance) {},
      beforeClose: function (instance) {},
      afterClose: function (instance) {}
    },
    outsideClose: true,
    style: {
      use: true,
      width: 400,
      valign: 'center',
      animation: 'from-bottom'
    },
    triggers: {
      open: 'data-modal-open',
      close: 'data-modal-close',
      closeAll: 'data-modal-close-all'
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
        animationDuration: settings.animationDuration,
        triggers: settings.triggers,
        disableScroll: settings.disableScroll,
        focus: settings.focus,
        hash: settings.hash,
        style: settings.style,
        classes: settings.classes,
        outsideClose: settings.outsideClose,
        multiple: settings.multiple,
        multipleClosePrev: settings.multipleClosePrev
      }
      this.modals = []
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
      document.addEventListener('click', event => {
        if (event.target.getAttribute(this.config.triggers.closeAll) !== null || event.target.closest(`[${this.config.triggers.closeAll}]`)) {
          event.preventDefault()
          this.closeAllModals()
        }
        if (event.target.getAttribute(this.config.triggers.open) || event.target.closest(`[${this.config.triggers.open}]`)) {
          event.preventDefault()
          const openingNode = event.target.getAttribute(this.config.triggers.open) ? event.target : event.target.closest(`[${this.config.triggers.open}]`)
          const modalId = openingNode.getAttribute(this.config.triggers.open)
          this.openModal(modalId, openingNode)
        }
        if (event.target.getAttribute(this.config.triggers.close) !== null || event.target.closest(`[${this.config.triggers.close}]`)) {
          event.preventDefault()
          const modalId = event.target.getAttribute(this.config.triggers.close) || event.target.closest(`[${this.config.triggers.close}]`).getAttribute(this.config.triggers.close)
          if (this.modal) this.closeModal(modalId)
        }
        if (this.config.outsideClose && event.target.classList.contains(this.config.classes.wrapp)) {
          event.preventDefault()
          if (this.modal) this.closeModal(this.modal.id)
        }
      }, false)
    }

    openModal (modalId, openingNode, preventMultiple = false) {
      let timeout = this.modal ? this.config.animationDuration : 0
      if (this.modal) {
        const parentModalId = this.modal.id
        if (this.config.multiple && !preventMultiple) {
          if (this.config.multipleClosePrev) {
            this.closeModal(this.modal.id, false, true)
          } else {
            timeout = 0
          }
          this.modals.push(parentModalId)
        } else {
          this.closeModal(this.modal.id, false, true)
        }
      }
      setTimeout(() => {
        this.modal = document.getElementById(modalId)
        if (!this.modal) return
        if (this.animated) return
        this.on.beforeOpen(this)
        this.animated = true
        this.openingNode = openingNode
        if (!this.backFocusNode) this.backFocusNode = openingNode
        this.modal.classList.add(this.config.classes.open)
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
          this.on.afterOpen(this)
          this.modal.classList.remove(this.config.classes.open)
        }, this.config.animationDuration)
      }, timeout)
    }

    closeModal (modalId, changeBackFocus = true, preventMultiple = false, closeAll = false) {
      const modal = modalId ? document.getElementById(modalId) : this.modal
      if (!modal) return
      if (this.animated && !closeAll) return
      this.animated = true
      this.on.beforeClose(this)
      modal.classList.add(this.config.classes.close)
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
        this.on.afterClose(this)
        modal.classList.remove(this.config.classes.close)
        this.modal = null
        if (changeBackFocus && this.backFocusNode && this.config.focus) {
          this.backFocusNode.focus()
          this.backFocusNode = null
        }
      }, this.config.animationDuration)
      if (this.config.multiple && !preventMultiple && !closeAll) {
        const parentModalId = this.modals.pop()
        this.openModal(parentModalId, false, true)
      }
    }

    closeAllModals () {
      if (this.config.multiple && !this.config.multipleClosePrev) {
        if (this.modals) {
          this.modals.forEach(modalId => {
            this.closeModal(modalId, false, true, true)
          })
          this.modals = []
        }
      }
      this.closeModal(false, false, false, true)
    }

    getScrollbarWidth () {
      return window.screen.width - document.documentElement.clientWidth === 0 ? 0 : window.innerWidth - document.documentElement.clientWidth
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
      const transform = getTransform(this.config.style.animation)
      const animationDuration = this.config.animationDuration
      const style =
`
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
      document.querySelectorAll('.' + this.config.classes.modal).forEach(el => {
        el.style.display = 'block'
      })
      function getTransform (animation) {
        switch (animation) {
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
    const insideObjects = ['style', 'on', 'triggers', 'hash', 'classes']
    insideObjects.forEach(name => {
      if (config && config[name]) {
        config[name] = Object.assign({}, settings[name], config[name])
      }
    })
    const options = Object.assign({}, settings, config)
    const modal = new MiniModal(options)
    return modal
  }
  return { init }
})()

export { AccessibleMinimodal }
window.AccessibleMinimodal = AccessibleMinimodal
