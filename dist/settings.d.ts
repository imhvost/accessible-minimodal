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
    animation?: 'from-bottom' | 'from-top' | 'from-left' | 'from-right' | 'zoom-in' | 'zoom-out' | 'fade';
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
declare const settingsDefault: AccessibleMinimodalSettings;
export { settingsDefault, type AccessibleMinimodalSettings, type Classes };