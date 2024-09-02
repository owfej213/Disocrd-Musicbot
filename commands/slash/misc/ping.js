const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setNameLocalization('zh-TW', '延遲')
        .setDescription('顯示延遲'),
    run: async (interaction) => {
        return await interaction.reply(`延遲為${interaction.client.ws.ping}ms`);
    },
};
