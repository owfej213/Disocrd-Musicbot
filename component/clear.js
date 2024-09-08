import { SuccessEmbed } from '../modules/embeds.js';

export const data = {
    id: 'clear',
    category: 'music',
    queueOnly: true,
    validateVC: true,
};

export async function execute(interaction, queue) {
    queue.tracks.clear();

    return await interaction.reply({
        embeds: [SuccessEmbed('♻️ 清除成功')],
    });
}
