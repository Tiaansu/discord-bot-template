import { Modal } from '@/Structures';

export default new Modal({
    customId: 'ping-modal',
    run: async (client, interaction) => {
        interaction.reply({
            content: 'Pong! Thank you for answering.'
        })
    }
});