const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    commandID: '989402324269170724',
    data: new SlashCommandBuilder()
    .setName("queue")
    .setNameLocalization('zh-TW', '播放清單')
    .setDescription("顯示目前播放清單")
    .addNumberOption((option) => {
        return option.setName("page").setDescription("輸入要找的頁數").setMinValue(1)
    }),

    run: async ({client, interaction}) => {
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

        if(!queue || !queue.node.isPlaying()) return await interaction.reply("❌ | 清單目前沒有歌曲")

        const totalpage = Math.ceil(queue.tracks.size / 10) || 1

        const page = (interaction.options.getNumber("page") || 1) - 1

        if(page > totalpage) return await interaction.reply(`目前總共只有${totalpage}頁的歌曲`)
        const queueString = queue.tracks.data.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.**[${song.title}](${song.url}) \`[${song.duration}]\``
        }).join("\n")
        
        const currentSong = queue.currentTrack
        
        return await interaction.reply({
            embeds:[
                new EmbedBuilder()
                .setTitle(`播放清單`)
                .setDescription((currentSong ? `**正在播放**\n [${currentSong.title}](${currentSong.url})` : "**沒有歌曲正在播放**") +
                `\n\n${queueString}`
                )
                .setFooter({
                    text: `第${page + 1}頁，共${totalpage}頁，總共${queue.tracks.data.length + 1}首`
                })
            ]
        })
    }
}