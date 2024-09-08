import { SlashCommandBuilder } from 'discord.js';
import { SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('ping')
        .setNameLocalization('zh-TW', '延遲')
        .setDescription('顯示延遲'),
    category: 'misc',
};

export function execute(interaction) {
    return interaction.reply({
        embeds: [SuccessEmbed(`延遲為${interaction.client.ws.ping}ms`)],
    });
}
