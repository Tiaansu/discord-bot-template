import type { MessageComponentInteraction } from 'discord.js';
import type { RunFunction } from '@/Types';

export interface ComponentOptions<Interaction extends MessageComponentInteraction> {
    customId: string;
    run: RunFunction<Interaction>;
};