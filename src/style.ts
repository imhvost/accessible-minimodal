import type { Classes } from './settings';

interface BuildStyleProps {
  classNames: Classes;
  animationDuration: string;
  width?: number;
  margin?: string;
  transform?: string;
  closeSelector: string;
}

export const buildStyle = (props: BuildStyleProps) => {
  const { modal, wrapp, body, active, open, close } = props.classNames;
  const getMargin = (valign: string) => {
    switch (valign) {
      case 'top':
        return '0 auto auto';
      case 'bottom':
        return 'auto auto 0';
      default:
        return 'auto';
    }
  };
  const getTransform = (animation: string) => {
    switch (animation) {
      case 'from-top':
        return 'translateY( calc(var(--accessible-minimodal-translate) * -1) )';
      case 'from-left':
        return 'translateX( calc(var(--accessible-minimodal-translate) * -1) )';
      case 'from-right':
        return 'translateX(var(--accessible-minimodal-translate))';
      case 'zoom-in':
        return 'scale(.8)';
      case 'zoom-out':
        return 'scale(1.2)';
      case 'fade':
        return 'none';
      default:
        return 'translateY(var(--accessible-minimodal-translate))';
    }
  };
  const margin = getMargin(props.margin ?? '');
  const transform = getTransform(props.transform ?? '');
  const style = `
:root{
  --accessible-minimodal-color: #333;
  --accessible-minimodal-bg: #fff;
  --accessible-minimodal-filter: rgba(0, 0, 0, .7);
  --accessible-minimodal-z-index: 666666;
  --accessible-minimodal-padding: 40px;
  --accessible-minimodal-border-radius: 4px;
  --accessible-minimodal-translate: 20px;
  --accessible-minimodal-scale-in: .8;
  --accessible-minimodal-scale-out: 1.2;
}
.${modal} {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--accessible-minimodal-z-index);
}
.${modal}:not(.${active}) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.${modal}.${open},
.${modal}.${close} {
  transition: opacity ${props.animationDuration}, visibility ${props.animationDuration};
}
.${modal}.open .${body},
.${modal}.close .${body} {
  transition: transform 0.4s;
}
.${modal}.${active} .${body} {
  transform: none;
}
.${wrapp} {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: var(--accessible-minimodal-filter);
  padding: var(--accessible-minimodal-padding) calc(--accessible-minimodal-padding / 2);
  overflow-y: scroll;
}
.${body} {
  background-color: var(--accessible-minimodal-bg);
  color: var(--accessible-minimodal-color);
  flex: none;
  min-height: 1px;
  border-radius: var(--accessible-minimodal-border-radius);
  width: ${props.width}px;
  max-width: 100%;
  margin: ${margin};
  padding: var(--accessible-minimodal-padding);
  transform: ${transform};
  position: relative;
}
.${body} > ${props.closeSelector} {
  position: absolute;
  right: calc(var(--accessible-minimodal-padding) / 4);
  top: calc(var(--accessible-minimodal-padding) / 4);
  width: calc(var(--accessible-minimodal-padding) / 2);
  height: calc(var(--accessible-minimodal-padding) / 2);
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 0;
}
.${body} > ${props.closeSelector}:before,
.${body} > ${props.closeSelector}:after {
  content: '';
  position: absolute;
  width: 16px;
  top: 50%;
  left: 50%;
  right: 0;
  margin: -1px 0 0 -8px;
  background-color: currentColor;
  height: 2px;
}
.${body} > ${props.closeSelector}:before {
  transform: rotate(45deg);
}
.${body} ${props.closeSelector}:after {
  transform: rotate(-45deg);
}
`;

  return style.replace(/\s*([:;,{}])\s*/g, '$1');
};
