const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    commandID: '989402324269170720',
    data: new SlashCommandBuilder()
    .setName("np")
    .setNameLocalization('zh-TW', '正在播放')
    .setDescription("顯示目前播放歌曲的詳細資訊"),
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

        const song = queue.currentTrack
        let bar = queue.node.createProgressBar({
            queue: false,
            length: 19
        })
        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${song.title}`)
                .setURL(`${song.url}`)
                .setThumbnail(song.thumbnail)
                .setDescription(bar)
            ]
        })
    }
}