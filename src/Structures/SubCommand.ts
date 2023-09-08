import type { ChatInputCommandInteraction } from 'discord.js';
import type { RunFunction } from '@/Types';
import type { SubCommandOptions } from '@/Interfaces';

export class SubCommand {
    public readonly subCommandName: string;
    public run: RunFunction<ChatInputCommandInteraction>;

    public constructor({ subCommandName, run }: SubCommandOptions) {
        this.subCommandName = subCommandName;
        this.run = run;
    }
}