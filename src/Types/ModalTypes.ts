import type { ModalSubmitInteraction } from 'discord.js';
import type { Client } from '@/Structures';

export type ModalRunFunction = (
    client: Client,
    interaction: ModalSubmitInteraction
) => Promise<void> | void;