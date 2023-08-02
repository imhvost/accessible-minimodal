import type { AccessibleMinimodalSettings } from './settings';
export declare class AccessibleMinimodal {
    config: AccessibleMinimodalSettings;
    modal: HTMLElement | null;
    openBtn: HTMLElement | null;
    modals: HTMLElement[];
    focusBtns: Array<HTMLElement | null>;
    animated: boolean;
    constructor(settings?: AccessibleMinimodalSettings);
    protected init(): void;
    private addTriggers;
    openModal(selector?: string | HTMLElement, useTimeout?: boolean, callback?: () => void): void;
    closeModal(selector?: string | HTMLElement, removeFromModals?: boolean, closeAll?: boolean, callback?: () => void): void;
    closeAllModals(): void;
    getScrollbarWidth(): number;
    protected onKeydown(event: KeyboardEvent): void;
    protected changeFocus(event: KeyboardEvent): void;
    protected addStyles(): void;
}
