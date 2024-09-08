import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { SuccessEmbed, WarningEmbed } from '../modules/embeds.js';
import { capitalizeFirstLetter } from '../modules/utils.js';
import ffmpegFilters from '../config/ffmpegFilters.js';

export const data = {
    id: 'filters',
    category: 'music',
    queueOnly: true,
    validateVC: true,
};

export async function execute(interaction, queue) {
    const emoji = {
        clear: '🧹',
        '8D': '🎱',
        nightcore: '⏫',
        bassboost: '🗿',
        earrape: '🧨',
        normalizer: '🎛️',
        lofi: '🎧',
        reverse: '◀️',
    };

    const row1 = new ActionRowBuilder().addComponents(
        ffmpegFilters
            .slice(0, 4)
            .map((filter) =>
                new ButtonBuilder()
                    .setCustomId(`${filter}Btn`)
                    .setEmoji(emoji[filter])
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(queue.filters.ffmpeg.filters.includes(filter))
                    .setLabel(capitalizeFirstLetter(filter)),
            ),
    );

    const row2 = new ActionRowBuilder().addComponents(
        ffmpegFilters
            .slice(4)
            .map((filter) =>
                new ButtonBuilder()
                    .setCustomId(`${filter}Btn`)
                    .setEmoji(emoji[filter])
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(queue.filters.ffmpeg.filters.includes(filter))
                    .setLabel(capitalizeFirstLetter(filter)),
            ),
    );

    const filter = queue.filters.ffmpeg.filters[0];

    await interaction.reply({
        ephemeral: true,
        embeds: [
            SuccessEmbed(
                `目前Filter為 ${
                    filter ? capitalizeFirstLetter(filter) : '關閉'
                }`,
            ),
            WarningEmbed(
                '目前使用Filter可能會有意外問題\n如果音樂被跳過，請嘗試重新加入',
            ),
        ],
        components: [row1, row2],
    });

    const message = await interaction.fetchReply();

    const collector = message.createMessageComponentCollector({
        filter: (ctx) =>
            ctx.message.id === message.id &&
            ctx.user.id === interaction.user.id,
        time: 60_000,
    });

    collector.on('collect', async (ctx) => {
        const filter = ctx.customId.slice(0, -3);

        if (filter === 'clear') {
            queue.filters.ffmpeg.setFilters(false);
        } else {
            queue.filters.ffmpeg.setFilters([filter]);
        }

        ffmpegFilters.slice(0, 4).forEach((enabledFilter, index) => {
            row1.components[index].setDisabled(enabledFilter === filter);
        });

        ffmpegFilters.slice(4).forEach((enabledFilter, index) => {
            row2.components[index].setDisabled(enabledFilter === filter);
        });

        await ctx.update({
            embeds: [
                SuccessEmbed(
                    `目前Filter為 ${
                        filter === 'clear'
                            ? '關閉'
                            : capitalizeFirstLetter(filter)
                    }`,
                ),
                WarningEmbed(
                    '目前使用Filter可能會有意外問題\n如果音樂被跳過，請嘗試重新加入',
                ),
            ],
            components: [row1, row2],
        });
    });
    collector.on('end', () => {
        row1.components.forEach((component) => component.setDisabled(true));
        row2.components.forEach((component) => component.setDisabled(true));
        interaction.editReply({ components: [row1, row2] });
    });
}
