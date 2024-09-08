import { SlashCommandBuilder } from 'discord.js';
import { SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('quit')
        .setNameLocalization('zh-TW', '離開')
        .setDescription('離開語音頻道'),
    category: 'music',
    validateVC: true,
};

export function execute(interaction, queue) {
    if (queue) queue.delete();

    return interaction.reply({ embeds: [SuccessEmbed('👋 掰掰~')] });
}
