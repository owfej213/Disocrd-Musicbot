const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	commandID: '989402324269170726',
    data: new SlashCommandBuilder()
    .setName("resume")
	.setNameLocalization('zh-TW', '恢復')
    .setDescription("恢復播放"),
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
        
        queue.node.resume()

		return await interaction.reply({
			content: "▶ | 歌曲已被恢復播放",
			ephemeral: true,
		})
    }
}