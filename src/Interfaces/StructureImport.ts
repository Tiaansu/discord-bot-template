import type { ClientEvents, MessageComponentInteraction } from 'discord.js';
import type {
    Command,
    Component,
    ContextMenu,
    Event,
    Modal,
    SubCommand,
    SubCommandGroup
} from '@/Structures';

export interface StructureImport<
    Structure extends
        | Command
        | Component<MessageComponentInteraction>
        | ContextMenu
        | Event<keyof ClientEvents>
        | Modal
        | SubCommand
        | SubCommandGroup
> {
    default: Structure;
}