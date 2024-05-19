import { AccessibleMinimodalSettings } from './settings';

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
    private getOnInstance;
    openModal(selector?: string | HTMLElement): void;
    private _openModal;
    closeModal(selector?: string | HTMLElement): void;
    private _closeModal;
    closeAllModals(): void;
    getScrollbarWidth(): number;
    protected onKeydown(event: KeyboardEvent): void;
    protected changeFocus(event: KeyboardEvent): void;
    protected addStyles(): void;
}
