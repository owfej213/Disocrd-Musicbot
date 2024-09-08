import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default (queue) => {
    const backBtn = new ButtonBuilder()
        .setCustomId('back')
        .setEmoji('⏮')
        .setStyle(ButtonStyle.Secondary);

    const pauseBtn = new ButtonBuilder()
        .setCustomId('pause')
        .setEmoji(queue.node.isPaused() ? '▶️' : '⏸️')
        .setStyle(ButtonStyle.Secondary);

    const loopBtn = new ButtonBuilder()
        .setCustomId('repeat')
        .setEmoji('🔁')
        .setStyle(ButtonStyle.Secondary);

    const skipBtn = new ButtonBuilder()
        .setCustomId('skip')
        .setEmoji('⏭️')
        .setStyle(ButtonStyle.Secondary);

    const shuffleBtn = new ButtonBuilder()
        .setCustomId('shuffle')
        .setEmoji('🔀')
        .setStyle(ButtonStyle.Secondary);

    const nowplayingBtn = new ButtonBuilder()
        .setCustomId('np')
        .setEmoji('ℹ️')
        .setStyle(ButtonStyle.Success);

    const queueBtn = new ButtonBuilder()
        .setCustomId('queue')
        .setEmoji('📜')
        .setStyle(ButtonStyle.Success);

    const filtersBtn = new ButtonBuilder()
        .setCustomId('filters')
        .setEmoji('⚙️')
        .setStyle(ButtonStyle.Success);

    const clearQueueBtn = new ButtonBuilder()
        .setCustomId('clear')
        .setEmoji('♻️')
        .setStyle(ButtonStyle.Danger);

    const quitBtn = new ButtonBuilder()
        .setCustomId('quit')
        .setEmoji('👋')
        .setStyle(ButtonStyle.Danger);

    const row1 = new ActionRowBuilder().addComponents(
        backBtn,
        pauseBtn,
        loopBtn,
        shuffleBtn,
        skipBtn,
    );
    const row2 = new ActionRowBuilder().addComponents(
        nowplayingBtn,
        queueBtn,
        filtersBtn,
        clearQueueBtn,
        quitBtn,
    );
    return [row1, row2];
};
