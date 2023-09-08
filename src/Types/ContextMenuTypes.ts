import type {
    ContextMenuCommandInteraction,
    Interaction,
    UserContextMenuCommandInteraction,
    MessageContextMenuCommandInteraction
} from 'discord.js';
import type { Client } from '@/Structures';

export type ContextMenuTypes =
    & ContextMenuCommandInteraction
    & UserContextMenuCommandInteraction
    | MessageContextMenuCommandInteraction
    & Interaction

export type ContextMenuRunFunction<ContextMenuType extends ContextMenuTypes> = (
    client: Client,
    interaction: ContextMenuType
) => Promise<void> | void;