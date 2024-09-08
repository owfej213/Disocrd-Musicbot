import { SlashCommandBuilder } from 'discord.js';
import { ErrorEmbed, SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('volume')
        .setNameLocalization('zh-TW', '音量')
        .setDescription('調整音量')
        .addNumberOption((option) => {
            return option
                .setName('value')
                .setDescription('輸入要調整的音量大小')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(0);
        }),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export function execute(interaction, queue) {
    const volume = interaction.options.getNumber('value');

    if (volume > 100 || volume < 0)
        return interaction.reply({ embeds: [ErrorEmbed('無效的數值')] });

    queue.node.setVolume(volume);

    return interaction.reply({
        embeds: [SuccessEmbed(`🔊 音量已調整至${volume}%`)],
    });
}
