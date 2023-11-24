const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	commandID: '989402324269170721',
    data: new SlashCommandBuilder()
    .setName("pause")
	.setNameLocalization('zh-TW', '暫停')
    .setDescription("暫停播放"),
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
        
        queue.node.pause()
		
		return await interaction.reply({
			content: `⏸ **|** 歌曲已暫停!`,
			ephemeral: true,
		})
    }
}