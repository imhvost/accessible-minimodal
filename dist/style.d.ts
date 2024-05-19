import { Classes } from './settings';

interface BuildStyleProps {
    classNames: Classes;
    animationDuration: string;
    width?: number;
    margin?: string;
    transform?: string;
}
export declare const buildStyle: (props: BuildStyleProps) => string;
export {};
