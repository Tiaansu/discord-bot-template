import { Component } from '@/Structures';
import { StringSelectMenuInteraction } from 'discord.js';

export default new Component<StringSelectMenuInteraction>({
    customId: 'ping-select-menu',
    run: async (client, interaction) => {
        interaction.reply({
            content: `Pong! You chose ${interaction.values.join(', ')}`
        });
    }
});