const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	commandID: '989402324415950848',
    data: new SlashCommandBuilder()
    .setName("skip")
	.setNameLocalization('zh-TW', '跳過')
    .setDescription("跳過目前歌曲"),
    run: async({client, interaction}) => {
        const queue = client.player.nodes.get(interaction.guildId)

        if (!interaction.member.voice.channelId)
			return await interaction.reply({
				content: "❌ | 請先進語音頻道!",
				ephemeral: true,
			})
		if (
			interaction.guild.members.me.voice.channelId &&
			interaction.member.voice.channelId !==
				interaction.guild.members.me.voice.channelId
		)
			return await interaction.reply({
				content:
					"❌ | 我們必須要在同一個語音頻道!",
				ephemeral: true,
			})

        if(!queue) return await interaction.reply("❌ | 清單目前沒有歌曲")
        
		queue.node.skip()

        return await interaction.reply({
            content: `⏭ | 已跳過歌曲`,
			ephemeral: true,
        })
    }
}