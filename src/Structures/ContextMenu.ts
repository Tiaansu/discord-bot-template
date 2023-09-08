import type { ContextMenuCommandBuilder } from 'discord.js';
import type { ContextMenuOptions } from '@/Interfaces';
import type { ContextMenuRunFunction, ContextMenuTypes } from '@/Types';

export class ContextMenu {
    public readonly data: ContextMenuCommandBuilder;
    public run: ContextMenuRunFunction<ContextMenuTypes>;

    public constructor({ data, run }: ContextMenuOptions) {
        this.data = data;
        this.run = run;
    }
};