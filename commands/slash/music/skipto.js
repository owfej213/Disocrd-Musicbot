const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    commandID: '989402324415950849',
    data: new SlashCommandBuilder()
    .setName("skipto")
    .setNameLocalization('zh-TW', '跳至目標')
    .setDescription("跳到指定編號的歌曲")
    .addNumberOption((option) => {
        return option.setName("number").setDescription("輸入要跳到的歌曲編號").setMinValue(1).setRequired(true)
    }),
    run: async({client, interaction}) => {
        const queue = client.player.nodes.get(interaction.guildId)
        
        const trackNum = interaction.options.getNumber("number")
        
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
        
        if(trackNum > queue.tracks.size) return await interaction.reply("❌ | 輸入錯誤")
        queue.node.skipTo(trackNum - 1)
        return await interaction.reply(`已跳過${trackNum}首歌曲!`)
    }
}