import { SlashCommandBuilder } from 'discord.js';
import { SuccessEmbed } from '../../../modules/embeds.js';
import { QueueRepeatMode } from 'discord-player';

export const data = {
    command: new SlashCommandBuilder()
        .setName('repeat')
        .setNameLocalization('zh-TW', '重複播放狀態')
        .setDescription('設定重複播放狀態')
        .addIntegerOption((option) => {
            return option
                .setName('repeatmode')
                .setDescription('重複播放狀態')
                .setRequired(true)
                .addChoices(
                    { name: '關閉', value: QueueRepeatMode.OFF },
                    { name: '重複播放單曲', value: QueueRepeatMode.TRACK },
                    { name: '重複播放清單', value: QueueRepeatMode.QUEUE },
                    { name: '自動播放', value: QueueRepeatMode.AUTOPLAY },
                );
        }),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export function execute(interaction, queue) {
    const mode = interaction.options.getInteger('repeatmode');
    const status = {
        0: '關閉',
        1: '重複播放單曲',
        2: '重複播放清單',
        3: '自動播放',
    };
    queue.setRepeatMode(mode);

    queue.emit('repeatChange', queue);

    return interaction.reply({
        embeds: [SuccessEmbed(`目前播放狀態為 ${status[mode]}`)],
    });
}
