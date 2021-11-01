# accessible-minimodal
Accessible, lightweight (**< 8 kB**), stylish modal library in pure JavaScript
## Example
https://codepen.io/imhvost/pen/LYNazqo (with "multiple" option)
## Install
### npm
```
npm install accessible-minimodal --save
```
### or include scripts
```html
<script src="accessible-minimodal.min.js"></script>
```
## html
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
    open: true,
    add: true,
    remove: true
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
    valign: 'center', // center, top, bottom
    animation: 'from-bottom', // from-bottom, from-top, from-left, from-right, zoom-in, zoom-out, fade
  },
  triggers: {
    open: 'data-modal-open',
    close: 'data-modal-close',
    closeAll: 'data-modal-close-all'
  }
})
```
## methods
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