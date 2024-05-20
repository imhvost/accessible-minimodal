import type { Classes } from './settings';

interface BuildStyleProps {
  classNames: Classes;
  animationDuration: string;
  width?: number;
  margin?: string;
  transform?: string;
}

export const buildStyle = (props: BuildStyleProps) => {
  const { modal, wrapp, body, closeBtn, active, open, close } =
    props.classNames;
  const varPrefix = '--accessible-minimodal';
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
        return `translateY( calc(var(${varPrefix}-translate) * -1) )`;
      case 'from-left':
        return `translateX( calc(var(${varPrefix}-translate) * -1) )`;
      case 'from-right':
        return `translateX(var(${varPrefix}-translate))`;
      case 'zoom-in':
        return 'scale(.8)';
      case 'zoom-out':
        return 'scale(1.2)';
      case 'fade':
        return 'none';
      default:
        return `translateY(var(${varPrefix}-translate))`;
    }
  };
  const margin = getMargin(props.margin ?? '');
  const transform = getTransform(props.transform ?? '');

  const style = `
:root{
${varPrefix}-color: #333;
${varPrefix}-bg: #fff;
${varPrefix}-filter: rgba(0, 0, 0, .7);
${varPrefix}-z-index: 666666;
${varPrefix}-padding: 40px;
${varPrefix}-border-radius: 4px;
${varPrefix}-translate: 20px;
${varPrefix}-scale-in: .8;
${varPrefix}-scale-out: 1.2;
}
.${modal} {
  position: fixed;
  inset: 0;
  z-index: var(${varPrefix}-z-index);
  transition-property: opacity, visibility;
}
.${modal}:not(.${active}) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.${modal}.${open},
.${modal}.${close} {
  transition-duration: ${props.animationDuration};
}
.${modal}.${active} .${body} {
  transform: none;
}
.${wrapp} {
  height: 100%;
  display: flex;
  background-color: var(${varPrefix}-filter);
  padding: var(${varPrefix}-padding) calc(var(${varPrefix}-padding) / 2);
  overflow-y: scroll;
}
.${body} {
  background-color: var(${varPrefix}-bg);
  color: var(${varPrefix}-color);
  flex: none;
  min-height: 0;
  border-radius: var(${varPrefix}-border-radius);
  width: ${props.width}px;
  max-width: 100%;
  margin: ${margin};
  padding: var(${varPrefix}-padding);
  transform: ${transform};
  position: relative;
  transition-duration: ${props.animationDuration};
  transition-property: transform;
}
.${closeBtn} {
  position: absolute;
  right: calc(var(${varPrefix}-padding) / 4);
  top: calc(var(${varPrefix}-padding) / 4);
  width: calc(var(${varPrefix}-padding) / 2);
  height: calc(var(${varPrefix}-padding) / 2);
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 0;
}
.${closeBtn}:before,
.${closeBtn}:after {
  content: '';
  position: absolute;
  width: 16px;
  inset: 50% 0 auto 50%;
  margin: -1px 0 0 -8px;
  background-color: currentColor;
  height: 2px;
}
.${closeBtn}:before {
  transform: rotate(45deg);
}
.${closeBtn}:after {
  transform: rotate(-45deg);
}
`;

  return style.replace(/\s*([:;,{}])\s*/g, '$1');
};
