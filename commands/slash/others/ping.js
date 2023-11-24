const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    commandID: '989402324269170722',
    data: new SlashCommandBuilder()
    .setName("ping")
    .setNameLocalization('zh-TW', '延遲')
    .setDescription("顯示延遲"),
    run: async({client, interaction}) => {

        return await interaction.reply({
			content: `延遲為${client.ws.ping}ms`,
			ephemeral: true,
		})
    }
}