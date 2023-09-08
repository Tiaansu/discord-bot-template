import type {
    BaseInteraction,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder,
    SlashCommandSubcommandsOnlyBuilder
} from 'discord.js';

import type { Client } from '@/Structures';

export type SlashCommand =
    | SlashCommandBuilder
    | SlashCommandOptionsOnlyBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubCommandGroup'>;

export type RunFunction<Interaction extends BaseInteraction> = (
    client: Client,
    interaction: Interaction
) => Promise<void> | void;