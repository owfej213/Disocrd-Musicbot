import { SuccessEmbed } from '../modules/embeds.js';

export const data = {
    id: 'shuffle',
    category: 'music',
    queueOnly: true,
    validateVC: true,
};

export function execute(interaction, queue) {
    const mode = queue.toggleShuffle();

    queue.emit('shuffleToggle', queue);

    return interaction.reply({
        embeds: [
            SuccessEmbed(mode ? '🔀 已開啟隨機播放' : '🔀 已關閉隨機播放'),
        ],
    });
}
