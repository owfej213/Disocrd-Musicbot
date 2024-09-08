import { BaseEmbed } from '../modules/embeds.js';

export function nowplaying(interaction, queue) {
    const track = queue.currentTrack;

    const embed = BaseEmbed()
        .setAuthor({ name: '正在播放 🎵' })
        .setTitle(`${track.title}`)
        .setURL(`${track.url}`)
        .setThumbnail(track.thumbnail)
        .setDescription(queue.node.createProgressBar());

    return interaction.reply({ ephemeral: true, embeds: [embed] });
}
