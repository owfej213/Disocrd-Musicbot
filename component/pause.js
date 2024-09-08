import { SuccessEmbed } from '../modules/embeds.js';

export const data = {
    id: 'pause',
    category: 'music',
    queueOnly: true,
    validateVC: true,
};

export function execute(interaction, queue) {
    let isPaused = queue.node.isPaused();

    isPaused ? queue.node.resume() : queue.node.pause();

    return interaction.reply({
        embeds: [
            SuccessEmbed(isPaused ? '▶️ 歌曲已恢復播放' : '⏸️ 歌曲已暫停播放'),
        ],
    });
}
