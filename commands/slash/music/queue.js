import { SlashCommandBuilder } from 'discord.js';
import { replyQueue } from '../../../shared/queue.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('queue')
        .setNameLocalization('zh-TW', '播放清單')
        .setDescription('顯示目前的播放清單')
        .addNumberOption((option) => {
            return option
                .setName('page')
                .setDescription('輸入要找的頁數')
                .setMinValue(1);
        }),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export async function execute(interaction, queue) {
    const page = interaction.options.getNumber('page') || 1;

    await replyQueue(interaction, queue, page);
}
