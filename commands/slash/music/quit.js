const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	commandID: '989402324269170725',
    data: new SlashCommandBuilder()
    .setName("quit")
	.setNameLocalization('zh-TW', '離開')
    .setDescription("終止播放及清除播放清單"),
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
		if(queue) await queue.delete()
		
		return interaction.reply("👋 **|** 掰囉~")
    }
}