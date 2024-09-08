import { SlashCommandBuilder } from 'discord.js';
import { SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('skip')
        .setNameLocalization('zh-TW', '跳過')
        .setDescription('跳過目前音樂'),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export function execute(interaction, queue) {
    queue.node.skip();

    return interaction.reply({ embeds: [SuccessEmbed('⏭️ 已跳過歌曲')] });
}
