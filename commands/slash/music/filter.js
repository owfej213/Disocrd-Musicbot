const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')
const { EqualizerConfigurationPreset } = require('discord-player')

module.exports = {
    commandID: '989402324269170718',
    data: new SlashCommandBuilder()
    .setName("filter")
    .setNameLocalization('zh-TW', '曲風')
    .setDescription("改變歌曲風格")
    .addStringOption((option) => {
        return option
            .setName("filters")
            .setDescription("改變曲風")
            .setRequired(true)
            .addChoices(
				{ name: 'Clear', value: 'clear' },
				{ name: '8D', value: '8D' },
				{ name: 'Tremolo', value: 'Tremolo' },
                { name: 'Vibrato', value: 'Vibrato' },
                { name: 'FullBass', value: 'FullBass' },
                { name: 'Dance', value: 'Dance' },
                { name: 'Soft', value: 'Soft' },
			)
    }),
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

        let filter = interaction.options.getString("filters")
        
          switch(filter.toLowerCase()){
            case "clear":
                queue.filters.filters.disable()
                queue.filters.equalizer.resetEQ()
            break;
            case "8d":
                queue.filters.filters.enable()
                queue.filters.filters.setFilters(['8D'])
            break;
            case "tremolo":
                queue.filters.filters.enable()
                queue.filters.filters.setFilters(['Tremolo'])
            break;
            case "vibrato":
                queue.filters.filters.enable()
                queue.filters.filters.setFilters(['Vibrato'])
            break;
            case "fullbass":
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.FullBass)
            break;
            case "dance":
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Dance)
            break;
            case "soft":
                queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.Soft)
            break;
            default:
                return await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle(`輸入無效!`)
                    .setDescription(`**請輸入正確的數值**`)
                ], ephemeral: true
            })
        }

        return await interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle(`成功改變曲風至${filter}!`)
                .addFields([
                    { name: '**指令**', value: `/filter <風格>`, inline: true },
                    { name: '**風格種類**', value: `\`Clear\`,\`8D\`,\`Tremolo\`,\`Vibrato\`,\`FullBass\`,\`Dance\`,\`Soft\``, inline: true },
                ])
            ]
        })
    },
}