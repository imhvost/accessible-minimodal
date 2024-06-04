import { AccessibleMinimodalSettings, TriggersAttrs } from './settings';

export declare class AccessibleMinimodal {
    config: AccessibleMinimodalSettings;
    modal: HTMLElement | null;
    openBtn: HTMLElement | null;
    modals: HTMLElement[];
    focusBtns: Array<HTMLElement | null>;
    animated: boolean;
    constructor(settings?: AccessibleMinimodalSettings);
    protected init(): void;
    addTriggers(triggers?: TriggersAttrs): void;
    private getOnInstance;
    openModal(selector?: string | HTMLElement | null): void;
    private _openModal;
    closeModal(selector?: string | HTMLElement | null): void;
    private _closeModal;
    closeAllModals(): void;
    getScrollbarWidth(): number;
    protected onKeydown(event: KeyboardEvent): void;
    protected changeFocus(event: KeyboardEvent): void;
    protected addStyles(): void;
}
