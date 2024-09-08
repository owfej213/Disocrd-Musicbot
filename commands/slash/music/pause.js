import { SlashCommandBuilder } from 'discord.js';
import { ErrorEmbed, SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('pause')
        .setNameLocalization('zh-TW', '暫停')
        .setDescription('暫停歌曲播放'),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export function execute(interaction, queue) {
    if (queue.node.isPaused())
        return interaction.reply({
            ephemeral: true,
            embeds: [ErrorEmbed('⏸️ 歌曲已經是暫停狀態')],
        });

    queue.node.pause();

    return interaction.reply({ embeds: [SuccessEmbed('⏸️ 歌曲已暫停播放')] });
}
