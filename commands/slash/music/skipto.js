import { SlashCommandBuilder } from 'discord.js';
import { ErrorEmbed, SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('skipto')
        .setNameLocalization('zh-TW', '跳至目標')
        .setDescription('跳到指定編號的歌曲')
        .addNumberOption((option) => {
            return option
                .setName('number')
                .setDescription('輸入要跳到的歌曲編號')
                .setRequired(true)
                .setMinValue(1);
        }),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export function execute(interaction, queue) {
    const trackNum = interaction.options.getNumber('number');

    if (trackNum > queue.tracks.size)
        return interaction.reply({ embeds: [ErrorEmbed('輸入錯誤')] });

    queue.node.skipTo(trackNum - 1);

    return interaction.reply({
        embeds: [SuccessEmbed(`已跳過${trackNum}首歌曲`)],
    });
}
