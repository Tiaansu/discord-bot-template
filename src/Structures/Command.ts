import type { AutocompleteInteraction, ChatInputCommandInteraction } from 'discord.js';
import type { RunFunction, SlashCommand } from '@/Types';
import type { CommandOptions } from '@/Interfaces';

export class Command {
    public readonly data: SlashCommand;
    public readonly cooldown?: number;
    public autocomplete?: RunFunction<AutocompleteInteraction>;
    public run?: RunFunction<ChatInputCommandInteraction>;

    public constructor({ data, cooldown, autocomplete, run }: CommandOptions) {
        this.data = data;
        this.cooldown = cooldown;
        this.autocomplete = autocomplete;
        this.run = run;
    }
};