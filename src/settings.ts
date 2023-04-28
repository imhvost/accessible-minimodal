interface Classes {
  modal?: string;
  wrapp?: string;
  body?: string;
  active?: string;
  open?: string;
  close?: string;
}

interface Focus {
  use?: boolean;
  selectors?: string[];
}

interface Hash {
  open?: boolean;
  add?: boolean;
  remove?: boolean;
}

interface Multiple {
  use?: boolean;
  closePrevModal?: boolean;
}

interface On {
  beforeOpen?: (instance?: object) => void;
  afterOpen?: (instance?: object) => void;
  beforeClose?: (instance?: object) => void;
  afterClose?: (instance?: object) => void;
}

interface Style {
  use?: boolean;
  width?: number;
  valign?: string;
  animation?:
    | 'from-bottom'
    | 'from-top'
    | 'from-left'
    | 'from-right'
    | 'zoom-in'
    | 'zoom-out'
    | 'fade';
}

interface TriggersAttrs {
  open?: string;
  close?: string;
  closeAll?: string;
}

interface AccessibleMinimodalSettings {
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
};

export { settingsDefault, type AccessibleMinimodalSettings, type Classes };