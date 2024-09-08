import { SlashCommandBuilder } from 'discord.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('welcome')
        .setNameLocalization('zh-TW', '歡迎頻道')
        .setDescription('設定歡迎頻道')
        .addChannelOption((option) =>
            option
                .setName('頻道')
                .setDescription('設定歡迎頻道')
                .setRequired(true),
        ),
    category: 'misc',
};

export async function execute(interaction) {
    const db = interaction.client.db;
    const channel = interaction.options.getChannel('頻道');

    await db.set(interaction.guildId, { welcomeChannel: channel.id });

    return await interaction.reply(`歡迎頻道已設定為 <#${channel.id}>`);
}
