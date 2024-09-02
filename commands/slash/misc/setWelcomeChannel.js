const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setNameLocalization('zh-TW', '歡迎頻道')
        .setDescription('設定歡迎頻道')
        .addChannelOption((option) =>
            option
                .setName('頻道')
                .setDescription('設定歡迎頻道')
                .setRequired(true),
        ),
    run: async (interaction) => {
        const db = interaction.client.db;
        const channel = interaction.options.getChannel('頻道');

        await db.set(interaction.guildId, { welcomeChannel: channel.id });

        return await interaction.reply(`歡迎頻道已設定為 <#${channel.id}>`);
    },
};
