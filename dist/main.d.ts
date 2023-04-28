import { AccessibleMinimodalSettings } from './settings';
export default class AccessibleMinimodal {
    config: AccessibleMinimodalSettings;
    modal: HTMLElement | null;
    openBtn: HTMLElement | null;
    modals: HTMLElement[];
    focusBtns: Array<HTMLElement | null>;
    animated: boolean;
    constructor(settings: AccessibleMinimodalSettings);
    protected init(): void;
    private addTriggers;
    openModal(selector?: string | HTMLElement, useTimeout?: boolean): void;
    closeModal(selector?: string | HTMLElement, removeFromModals?: boolean, closeAll?: boolean): void;
    closeAllModals(): void;
    getScrollbarWidth(): number;
    protected onKeydown(event: KeyboardEvent): void;
    protected changeFocus(event: KeyboardEvent): void;
    protected addStyles(): void;
}
