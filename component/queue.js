import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { BaseEmbed, ErrorEmbed } from '../modules/embeds.js';

export const data = {
    id: 'queue',
    category: 'music',
    queueOnly: true,
    validateVC: true,
};

export async function execute(interaction, queue) {
    const songsData = queue.tracks.data;

    const itemPrePage = 10;

    const maxPage = Math.ceil(songsData.length / itemPrePage);

    if (maxPage === 0)
        return interaction.reply({
            ephemeral: true,
            embeds: [ErrorEmbed(`目前沒有待播歌曲`)],
        });

    const embeds = [];

    for (let page = 0; page < maxPage; page++) {
        const start = page * itemPrePage;
        const end = Math.min(start + itemPrePage, songsData.length);
        const tracks = songsData.slice(start, end);
        const embed = BaseEmbed()
            .setAuthor({
                iconURL: queue.player.client.user.displayAvatarURL(),
                name: '播放清單',
            })
            .setDescription(
                tracks
                    .map((track, index) => {
                        return `**${start + index + 1}**. [${track.title}](${
                            track.url
                        }) \`[${track.duration}]\``;
                    })
                    .join('\n'),
            )
            .setFooter({
                text: `第${page + 1}頁，共${maxPage}頁，總共${
                    songsData.length
                }首`,
            });
        embeds.push(embed);
    }

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('firstBtn')
            .setEmoji('⏪')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId('previousBtn')
            .setEmoji('◀️')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId('nextBtn')
            .setEmoji('▶️')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(maxPage <= 1),
        new ButtonBuilder()
            .setCustomId('lastBtn')
            .setEmoji('⏩')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(maxPage <= 1),
    );

    await interaction.reply({
        ephemeral: true,
        embeds: [embeds[0]],
        components: [row],
    });

    const message = await interaction.fetchReply();

    const collector = message.createMessageComponentCollector({
        filter: (ctx) =>
            ctx.message.id === message.id &&
            ctx.user.id === interaction.user.id,
        time: 60_000,
    });

    let currentPage = 0;

    collector.on('collect', async (ctx) => {
        switch (ctx.customId) {
            case 'firstBtn':
                currentPage = 0;
                break;
            case 'previousBtn':
                if (currentPage > 0) currentPage--;
                break;
            case 'nextBtn':
                if (currentPage < embeds.length - 1) currentPage++;
                break;
            case 'lastBtn':
                currentPage = embeds.length - 1;
                break;
            default:
                break;
        }

        row.components[0].setDisabled(currentPage === 0);
        row.components[1].setDisabled(currentPage === 0);
        row.components[2].setDisabled(currentPage === embeds.length - 1);
        row.components[3].setDisabled(currentPage === embeds.length - 1);

        await ctx.update({
            embeds: [embeds[currentPage]],
            components: [row],
        });
    });
    collector.on('end', () => {
        row.components.forEach((component) => component.setDisabled(true));
        interaction.editReply({ components: [row] });
    });
}
