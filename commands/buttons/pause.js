module.exports = {
	execute: async (interaction) => {
        const queue = interaction.client.player.nodes.get(interaction.guild.id);

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
        

		if (queue) {

			let y = queue.node.isPaused()

			await interaction.reply({
				content: `▶ | 歌曲已${y ? "恢復" : "暫停"}播放!`,
				ephemeral: true,
			})
			if(y){
				queue.node.resume()
			}else{
				queue.node.pause()
			}
		}
	},
}