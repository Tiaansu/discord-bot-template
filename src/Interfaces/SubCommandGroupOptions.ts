import type { ChatInputCommandInteraction } from 'discord.js';
import type { RunFunction } from '@/Types';

export interface SubCommandGroupOptions {
    subCommandGroupName: string;
    run: RunFunction<ChatInputCommandInteraction>;
};