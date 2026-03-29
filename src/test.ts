import { AccessibleMinimodal } from './index';
const Modal = new AccessibleMinimodal({
  animationDuration: undefined,
  on: {
    beforeOpen: instance => {
      console.log('beforeOpen', instance);
    },
    afterOpen: instance => {
      console.log('afterOpen', instance);
    },
    beforeClose: instance => {
      console.log('beforeClose', instance);
    },
    afterClose: instance => {
      console.log(Modal, instance);
    },
  },
  style: {
    use: true,
    width: undefined,
  },
  disableScroll: {
    jumpingElements: [document.querySelector('.fixed') as HTMLElement],
  },
  multiple: {
    // use: true,
    // closePrevModal: true,
  },
  hash: {
    open: true,
    add: true,
    remove: true,
  },
  triggers: {
    // use: false,
  },
  focus: {
    use: false,
  },
});

console.log(Modal);

// Modal.openModal('modal');
// Modal.addTriggers({
//   open: 'data-modal-open',
// });

document
  .getElementById('modal')
  ?.addEventListener('accessible-minimodal:before-open', e => {
    console.log('accessible-minimodal:before-open', e.currentTarget);
  });

// Modal.openModal('#modal');
