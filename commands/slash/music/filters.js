import { SlashCommandBuilder } from 'discord.js';
import { SuccessEmbed, WarningEmbed } from '../../../modules/embeds.js';
import { capitalizeFirstLetter } from '../../../modules/utils.js';
import ffmpegFilters from '../../../config/ffmpegFilters.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('filters')
        .setNameLocalization('zh-TW', '曲風')
        .setDescription('改變歌曲風格')
        .addStringOption((option) => {
            return option
                .setName('filter')
                .setDescription('改變曲風')
                .setRequired(true)
                .addChoices(
                    ffmpegFilters.map((filter) => ({
                        name: capitalizeFirstLetter(filter),
                        value: filter,
                    })),
                );
        }),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export async function execute(interaction, queue) {
    const filter = interaction.options.getString('filter');

    await interaction.deferReply();

    if (filter === 'clear') {
        queue.filters.ffmpeg.setFilters(false);

        return interaction.editReply({
            embeds: [SuccessEmbed(`成功清除Filter`)],
        });
    } else {
        queue.filters.ffmpeg.setFilters([filter]);

        return interaction.editReply({
            embeds: [
                SuccessEmbed(`目前Filter為 ${capitalizeFirstLetter(filter)}`),
                WarningEmbed(
                    '目前使用Filter可能會有意外問題\n如果音樂被跳過，請嘗試重新加入',
                ),
            ],
        });
    }
}
