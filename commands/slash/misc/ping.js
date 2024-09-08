import { SlashCommandBuilder } from 'discord.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('ping')
        .setNameLocalization('zh-TW', '延遲')
        .setDescription('顯示延遲'),
    category: 'misc',
};

export function execute(interaction) {
    return interaction.reply(`延遲為${interaction.client.ws.ping}ms`);
}
