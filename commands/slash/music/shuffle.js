const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	commandID: '989402324269170727',
    data: new SlashCommandBuilder()
    .setName("shuffle")
	.setNameLocalization('zh-TW', '打亂')
    .setDescription("打亂播放順序"),
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
        
        queue.tracks.shuffle()

		return await interaction.reply({
			content: `🔀 **|** 已打亂順序!`,
			ephemeral: true,
		})
    }
}