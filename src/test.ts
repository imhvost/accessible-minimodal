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
    use: true,
    // closePrevModal: true,
  },
  triggers: {
    // use: false,
  },
});

console.log(Modal);
// Modal.addTriggers({
//   open: 'data-modal-open',
// });

document
  .getElementById('modal')
  ?.addEventListener('accessible-minimodal:after-close', e => {
    console.log('accessible-minimodal:after-close', e.currentTarget);
  });

// Modal.openModal('#modal');
