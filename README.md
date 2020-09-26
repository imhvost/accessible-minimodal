# accessible-minimodal
Accessible, lightweight, stylish modal library in pure JavaScript
## Example
### html
```html
<button id="modal-open-btn-1" data-modal-open="modal-1">Open Modal 1</button>

<div 
  id="modal-1"
  aria-hidden="true"
  class="modal"
  style="display:none;">
  <div
    tabindex="-1" 
    class="modal-wrapp">
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-open-btn-1"
      class="modal-body">
      <div class="modal-title">This is modal</div>
      <button
        type="button"
        class="modal-close-btn close"
        aria-label="Close Modal"
        data-modal-close></button>
      <label aria-label="Input">
        <input type="text" placeholder="Input">
      </label>
      <label aria-label="Input">
        <input type="text" placeholder="Input">
      </label>
      <button>Button</button>
      <button id="modal-open-btn-2" data-modal-open="modal-2">Modal 2</button>
    </div>
  </div>
</div>
```
