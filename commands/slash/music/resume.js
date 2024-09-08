import { SlashCommandBuilder } from 'discord.js';
import { ErrorEmbed, SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('resume')
        .setNameLocalization('zh-TW', '恢復')
        .setDescription('恢復歌曲播放'),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export function execute(interaction, queue) {
    if (queue.node.isPlaying())
        return interaction.reply({
            ephemeral: true,
            embeds: [ErrorEmbed('▶️ 歌曲已經是播放狀態')],
        });

    queue.node.resume();

    return interaction.reply({ embeds: [SuccessEmbed('▶️ 歌曲已恢復播放')] });
}
