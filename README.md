# accessible-minimodal
Accessible, lightweight (**< 4 kB gzip**), stylish modal library in JavaScript (TypeScript)
## Example
https://codepen.io/imhvost/pen/LYNazqo (with "multiple" option)
## Install
### With npm
```
npm install accessible-minimodal --save
```
### Or include scripts
```html
<script src="accessible-minimodal.min.js"></script>
```
---
## Your html
Open button:
```html
<button id="modal-open-btn-1" data-modal-open="modal-1">Open Modal 1</button>
```
Modal:
```html
<div id="modal-1" aria-hidden="true" class="modal" style="display:none;">
  <div tabindex="-1" class="modal-wrapp">
    <div role="dialog" aria-modal="true" aria-labelledby="modal-open-btn-1" class="modal-body">
      <button type="button" class="modal-close-btn" aria-label="Close Modal" data-modal-close></button>
        Modal content
    </div>
  </div>
</div>
```
## js
```js
const modal = AccessibleMinimodal.init({
  animationDuration?: number;
  classes?: Classes;
  disableScroll?: boolean;
  focus?: Focus;
  hash?: Hash;
  multiple?: Multiple;
  on?: On;
  outsideClose?: boolean;
  style?: Style;
  triggersAttrs?: TriggersAttrs;
}

const settingsDefault: AccessibleMinimodalSettings = {
  animationDuration: 400,
  classes: {
    modal: 'modal',
    wrapp: 'modal-wrapp',
    body: 'modal-body',
    active: 'active',
    open: 'open',
    close: 'close',
  },
  disableScroll: true,
  focus: {
    use: true,
    selectors: [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ],
  },
  hash: {
    open: false,
    add: false,
    remove: false,
  },
  multiple: {
    use: false,
    closePrevModal: false,
  },
  on: {
    beforeOpen: () => ({}),
    afterOpen: () => ({}),
    beforeClose: () => ({}),
    afterClose: () => ({}),
  },
  outsideClose: true,
  style: {
    use: false,
    width: 400,
    valign: 'center',
    animation: 'from-bottom',
  },
  triggersAttrs: {
    open: 'data-modal-open',
    close: 'data-modal-close',
    closeAll: 'data-modal-close-all',
  },
})
```
## Methods
### Open by id
```js
modal.openModal('my-modal')
```
### Close by id
```js
modal.closeModal('my-modal')
```
### Close current
```js
modal.closeModal()
```
### Close all
```js
modal.closeAllModals()
```
### Get scrollbar width
Example of preventing displacement of position:fixed elements when scrolling is disabled:
```js
const modal = AccessibleMinimodal.init({
  on: {
    beforeOpen: modal => {
      const scrollbarWidth = modal.getScrollbarWidth()
      document.querySelector('.header').style.marginRight = `${scrollbarWidth}px`
    },
    afterClose: () => document.querySelector('.header').style.marginRight = 0
  }
})
```