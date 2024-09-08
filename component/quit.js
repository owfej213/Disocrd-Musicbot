import { SuccessEmbed } from '../modules/embeds.js';

export const data = {
    id: 'quit',
    category: 'music',
    validateVC: true,
};

export function execute(interaction, queue) {
    if (queue) queue.delete();

    return interaction.reply({
        embeds: [SuccessEmbed('👋 掰掰~')],
    });
}
