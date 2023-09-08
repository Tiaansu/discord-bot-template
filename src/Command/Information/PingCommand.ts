import { Command } from '@/Structures';
import { SlashCommandBuilder } from 'discord.js';

export default new Command({
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping'),
    run: async (client, interaction) => {
        interaction.reply({
            content: 'Pong'
        });
    }
});