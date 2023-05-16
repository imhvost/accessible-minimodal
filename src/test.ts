import { AccessibleMinimodal } from './index';
const Modal = new AccessibleMinimodal({
  animationDuration: undefined,
  on: {
    beforeOpen: undefined,
    afterOpen: instance => {
      console.log('afterOpen', instance);
    },
    beforeClose: instance => {
      console.log('beforeClose', instance);
    },
    afterClose: instance => {
      console.log('afterClose', instance);
    },
  },
  style: {
    use: true,
    width: undefined,
  },
  multiple: {
    use: true,
    closePrevModal: true,
  },
});

console.log(Modal);
