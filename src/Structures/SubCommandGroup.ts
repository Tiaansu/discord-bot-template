import type { ChatInputCommandInteraction } from 'discord.js';
import type { SubCommandGroupOptions } from '@/Interfaces';
import type { RunFunction } from '@/Types';

export class SubCommandGroup {
    public readonly subCommandGroupName: string;
    public run: RunFunction<ChatInputCommandInteraction>;

    public constructor({ subCommandGroupName, run }: SubCommandGroupOptions) {
        this.subCommandGroupName = subCommandGroupName;
        this.run = run;
    }
}