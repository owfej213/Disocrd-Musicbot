import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { SuccessEmbed } from '../modules/embeds.js';
import { QueueRepeatMode } from 'discord-player';

export const data = {
    id: 'repeat',
    category: 'music',
    queueOnly: true,
    validateVC: true,
};

export async function execute(interaction, queue) {
    const status = {
        0: '關閉',
        1: '重複播放單曲',
        2: '重複播放清單',
        3: '自動播放',
    };

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('offBtn')
            .setEmoji('❌')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(queue.repeatMode === QueueRepeatMode.OFF)
            .setLabel(status[0]),
        new ButtonBuilder()
            .setCustomId('repeatTrackBtn')
            .setEmoji('🔂')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(queue.repeatMode === QueueRepeatMode.TRACK)
            .setLabel(status[1]),
        new ButtonBuilder()
            .setCustomId('repeatQueueBtn')
            .setEmoji('🔁')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(queue.repeatMode === QueueRepeatMode.QUEUE)
            .setLabel(status[2]),
        new ButtonBuilder()
            .setCustomId('autoplayBtn')
            .setEmoji('🔄')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(queue.repeatMode === QueueRepeatMode.AUTOPLAY)
            .setLabel(status[3]),
    );

    let mode = queue.repeatMode;

    await interaction.reply({
        ephemeral: true,
        embeds: [SuccessEmbed(`目前播放狀態為 ${status[mode]}`)],
        components: [row],
    });

    const message = await interaction.fetchReply();

    const collector = message.createMessageComponentCollector({
        filter: (ctx) =>
            ctx.message.id === message.id &&
            ctx.user.id === interaction.user.id,
        time: 60_000,
    });

    collector.on('collect', async (ctx) => {
        switch (ctx.customId) {
            case 'offBtn':
                queue.setRepeatMode(QueueRepeatMode.OFF);
                break;
            case 'repeatTrackBtn':
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                break;
            case 'repeatQueueBtn':
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                break;
            case 'autoplayBtn':
                queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
                break;
            default:
                break;
        }

        queue.emit('repeatChange', queue);

        mode = queue.repeatMode;

        row.components[0].setDisabled(mode === QueueRepeatMode.OFF);
        row.components[1].setDisabled(mode === QueueRepeatMode.TRACK);
        row.components[2].setDisabled(mode === QueueRepeatMode.QUEUE);
        row.components[3].setDisabled(mode === QueueRepeatMode.AUTOPLAY);

        await ctx.update({
            embeds: [SuccessEmbed(`目前播放狀態為 ${status[mode]}`)],
            components: [row],
        });
    });
    collector.on('end', () => {
        row.components.forEach((component) => component.setDisabled(true));
        interaction.editReply({ components: [row] });
    });
}
