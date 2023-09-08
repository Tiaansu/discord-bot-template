import { Component } from '@/Structures';
import { ButtonInteraction } from 'discord.js';

export default new Component<ButtonInteraction>({
    customId: 'ping-btn',
    run: async (client, interaction) => {
        interaction.reply({
            content: 'Pong! Thank you for clicking'
        });
    }
});