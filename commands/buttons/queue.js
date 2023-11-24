const { EmbedBuilder } = require('discord.js')

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

        if(!queue || !queue.node.isPlaying()) return await interaction.reply("❌ | 清單目前沒有歌曲")

        const queueString = queue.tracks.data.slice(0, 10).map((song, i) => {
            return `**${i + 1}.**[${song.title}](${song.url}) \`[${song.duration}]\``
        }).join("\n")
        
        const currentSong = queue.currentTrack
        
        return await interaction.reply({
            embeds:[
                new EmbedBuilder()
                .setTitle(`播放清單`)
                .setDescription((
                    currentSong 
                    ? `**正在播放**\n [${currentSong.title}](${currentSong.url})` 
                    : "**沒有歌曲正在播放**")
                    + `\n\n${queueString}`
                )
            ]
        })
	}
}