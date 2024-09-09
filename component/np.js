import { BaseEmbed } from '../modules/embeds.js';

export const data = {
    id: 'np',
    category: 'music',
    queueOnly: true,
};

export function execute(interaction, queue) {
    const track = queue.currentTrack;

    const embed = BaseEmbed()
        .setAuthor({ name: '正在播放 🎵' })
        .setTitle(`${track.title}`)
        .setURL(`${track.url}`)
        .setThumbnail(track.thumbnail)
        .setDescription(queue.node.createProgressBar());

    return interaction.reply({ ephemeral: true, embeds: [embed] });
}
