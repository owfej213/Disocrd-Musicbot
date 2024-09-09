import { SlashCommandBuilder } from 'discord.js';
import { BaseEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('np')
        .setNameLocalization('zh-TW', '正在播放')
        .setDescription('顯示正在播放的歌曲資訊'),
    category: 'music',
    validateVC: true,
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
