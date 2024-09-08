import { SlashCommandBuilder } from 'discord.js';
import { SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('shuffle')
        .setNameLocalization('zh-TW', '隨機播放')
        .setDescription('打亂播放清單順序'),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export function execute(interaction, queue) {
    const mode = queue.toggleShuffle();

    queue.emit('shuffleToggle', queue);

    return interaction.reply({
        embeds: [
            SuccessEmbed(mode ? '🔀 已開啟隨機播放' : '🔀 已關閉隨機播放'),
        ],
    });
}
