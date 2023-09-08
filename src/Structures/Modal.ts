import type { ModalOptions } from '@/Interfaces';
import type { ModalRunFunction } from '@/Types';

export class Modal {
    public readonly customId: string;
    public run: ModalRunFunction;

    public constructor({ customId, run }: ModalOptions) {
        this.customId = customId;
        this.run = run;
    }
};