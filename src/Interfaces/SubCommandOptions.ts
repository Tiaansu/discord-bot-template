import type { ChatInputCommandInteraction } from 'discord.js';
import type { RunFunction } from '@/Types';

export interface SubCommandOptions {
    subCommandName: string;
    run: RunFunction<ChatInputCommandInteraction>;
};