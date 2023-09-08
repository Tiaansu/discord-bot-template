import type { ContextMenuCommandBuilder } from 'discord.js';
import type { ContextMenuTypes, ContextMenuRunFunction } from '@/Types';

export interface ContextMenuOptions {
    data: ContextMenuCommandBuilder;
    run: ContextMenuRunFunction<ContextMenuTypes>;
};