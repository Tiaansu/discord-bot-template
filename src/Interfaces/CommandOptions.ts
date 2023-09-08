import type { AutocompleteInteraction, ChatInputCommandInteraction } from 'discord.js';
import type { RunFunction, SlashCommand } from '@/Types';

export interface CommandOptions {
    data: SlashCommand;
    cooldown?: number;
    autocomplete?: RunFunction<AutocompleteInteraction>;
    run?: RunFunction<ChatInputCommandInteraction>;
};