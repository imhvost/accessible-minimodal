# accessible-minimodal

Accessible, lightweight (**≈ 3 kB gzip**), stylish JavaScript (TypeScript) modal library.

## Example

**https://imhvost.github.io/accessible-minimodal.html**

## Install

```
npm install accessible-minimodal --save
```

---

## Your html

Open button:

```html
<!-- Open Button -->
<button id="modal-open-btn" data-modal-open="modal">Open Modal</button>

<!-- Modal -->
<div id="modal" aria-hidden="true" class="modal">
  <div tabindex="-1" class="modal-wrapp">
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-open-btn"
      class="modal-body"
    >
      <!-- Close Button -->
      <button
        type="button"
        class="modal-close-btn"
        aria-label="Close Modal"
        data-modal-close
      ></button>
      <!-- Modal Content -->
    </div>
  </div>
</div>
```

---

## js

```js
import { AccessibleMinimodal } from 'accessible-minimodal';

const Modal = new AccessibleMinimodal(/* { options } */);
```

### Or include scripts

```html
<script src="accessible-minimodal.umd.js"></script>
<script>
  const Modal = new AccessibleMinimodal(/* { options } */);
</script>
```

---

## Options

```typescript
interface AccessibleMinimodalSettings {
  animationDuration?: number /* defult: 400 */;
  classes?: {
    modal?: string /* defult: modal */;
    wrapp?: string /* defult: modal-wrapp */;
    body?: string /* defult: modal-body */;
    active?: string /* defult: active */;
    open?: string /* defult: open */;
    close?: string /* defult: close */;
  };
  disableScroll?:{
    use: boolean, /* defult: true */
    jumpingElements?: string | HTMLElement[]; /* defult: '' */;
  };
  focus?: {
    use?: boolean /* defult: true */;
    selectors?: string[] /* defult:
                            [
                              'button:not([disabled])',
                              '[href]',
                              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                              'select:not([disabled]):not([aria-hidden])',
                              'textarea:not([disabled]):not([aria-hidden])',
                              '[tabindex]:not([tabindex="-1"])',
                              '[contenteditable="true"]',
                            ]
                          */;
  };
  hash?: {
    open?: boolean /* defult: false */;
    add?: boolean /* defult: false */;
    remove?: boolean /* defult: false */;
  };
  multiple?: {
    use?: boolean /* defult: false */;
    closePrevModal?: boolean /* defult: false */;
  };
  on?: {
    beforeOpen?: (instance?: object) => void /* defult: () => true
                                                use return false for prevent open
                                              */;
    afterOpen?: (instance?: object) => void /* defult: () => ({}) */;
    beforeClose?: (instance?: object) => void /* defult: () => true
                                                  use return false for prevent close
                                              */;
    afterClose?: (instance?: object) => void /* defult: () => ({}) */;
  };
  outsideClose?: boolean /* defult: true */;
  style?: {
    use?: boolean /* defult: false */;
    width?: number /* defult: 400 */;
    valign?: string /* defult: center */;
    animation?: /* defult: from-bottom */
    | 'from-bottom'
      | 'from-top'
      | 'from-left'
      | 'from-right'
      | 'zoom-in'
      | 'zoom-out'
      | 'fade';
  };
  triggersAttrs?: {
    open?: string /* defult: data-modal-open */;
    close?: string /* defult: data-modal-close */;
    closeAll?: string /* defult: data-modal-close-all */;
  };
}
```

---

## Methods

#### Open by id:

```js
Modal.openModal('#my-modal');
```

#### Close by id:

```js
Modal.closeModal('#my-modal');
```

#### Close current modal:

```js
Modal.closeModal();
```

#### Close all modals:

```js
Modal.closeAllModals();
```

#### Get scrollbar width:

Example of preventing displacement of position:fixed elements when scrolling is disabled:

```js
const Modal = new AccessibleMinimodal({
  disableScroll: {
    jumpingElements: '.fixed-elements',
  },
});
```

---

## Events

- `accessible-minimodal:before-open`
- `accessible-minimodal:after-open`
- `accessible-minimodal:before-close`
- `accessible-minimodal:after-close`

Example:

```javascript
document
  .getElementById('modal')
  ?.addEventListener('accessible-minimodal:before-close', e => {
    console.log('accessible-minimodal:before-close');
    // use e.preventDefault() for prevent close
  });
```
