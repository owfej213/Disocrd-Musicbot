import { SuccessEmbed } from '../modules/embeds.js';

export const data = {
    id: 'skip',
    category: 'music',
    queueOnly: true,
    validateVC: true,
};

export function execute(interaction, queue) {
    queue.node.skip();

    return interaction.reply({ embeds: [SuccessEmbed('⏭️ 已跳過歌曲')] });
}
