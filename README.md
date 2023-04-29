# accessible-minimodal

Accessible, lightweight (**< 4 kB gzip**), stylish modal library in JavaScript (TypeScript)

## Example

https://codepen.io/imhvost/pen/LYNazqo (with "multiple" option)

## Install

### With npm

```
npm install accessible-minimodal --save
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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-open-btn-1"
      class="modal-body"
    >
      <button
        type="button"
        class="modal-close-btn"
        aria-label="Close Modal"
        data-modal-close
      ></button>
      Modal content
    </div>
  </div>
</div>
```

---

## js

```js
export { AccessibleMinimodal } from 'accessible-minimodal';

const Modal = new AccessibleMinimodal(/* { options } */);
```

### Or include scripts

```html
<script src="accessible-minimodal.umd.js"></script>
<script>
  const Modal = new AccessibleMinimoda.AccessibleMinimodal(/* { options } */);
</script>
```

---

## Options

```typescript
{
  animationDuration?: number; /* defult: 400 */
  classes?: {
    modal?: string;  /* defult: modal */
    wrapp?: string;  /* defult: modal-wrapp */
    body?: string;   /* defult: modal-body */
    active?: string; /* defult: active */
    open?: string;   /* defult: open */
    close?: string;  /* defult: close */
  };
  disableScroll?: boolean; /* defult: true */
  focus?: {
    use?: boolean;        /* defult: true */
    selectors?: string[]; /* defult: [
                              'button:not([disabled])',
                              '[href]',
                              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                              'select:not([disabled]):not([aria-hidden])',
                              'textarea:not([disabled]):not([aria-hidden])',
                              '[tabindex]:not([tabindex="-1"])',
                              '[contenteditable="true"]',
                            ] */
  };
  hash?: {
    open?: boolean;   /* defult: false */
    add?: boolean;    /* defult: false */
    remove?: boolean; /* defult: false */
  };
  multiple?: {
    use?: boolean;            /* defult: false */
    closePrevModal?: boolean; /* defult: false */
  };
  on?: {
    beforeOpen?: (instance?: object) => void;  /* defult: () => ({}) */
    afterOpen?: (instance?: object) => void;   /* defult: () => ({}) */
    beforeClose?: (instance?: object) => void; /* defult: () => ({}) */
    afterClose?: (instance?: object) => void;  /* defult: () => ({}) */
  };
  outsideClose?: boolean; /* defult: true */
  style?: {
    use?: boolean;   /* defult: false */
    width?: number;  /* defult: 400 */
    valign?: string; /* defult: center */
    animation?:      /* defult: from-bottom */
      | 'from-bottom'
      | 'from-top'
      | 'from-left'
      | 'from-right'
      | 'zoom-in'
      | 'zoom-out'
      | 'fade';
  };
  triggersAttrs?: {
    open?: string;     /* defult: data-modal-open */
    close?: string;    /* defult: data-modal-close */
    closeAll?: string; /* defult: data-modal-close-all */
  };
}
```

---

## Methods

### Open by id

```js
Modal.openModal('my-modal');
```

### Close by id

```js
Modal.closeModal('my-modal');
```

### Close current

```js
Modal.closeModal();
```

### Close all

```js
Modal.closeAllModals();
```

### Get scrollbar width

Example of preventing displacement of position:fixed elements when scrolling is disabled:

```js
const Modal = new AccessibleMinimodal({
  on: {
    beforeOpen: instance => {
      const scrollbarWidth = instance.getScrollbarWidth();
      document.querySelector('.header').style.marginRight = `${scrollbarWidth}px`;
    },
    afterClose: () => document.querySelector('.header').style.removeProperty('margin-right')l
  }
})
```
