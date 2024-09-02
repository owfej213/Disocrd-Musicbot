const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setNameLocalization('zh-TW', '重複播放')
        .setDescription('重複播放')
        .addBooleanOption((option) => {
            return option
                .setName('value')
                .setDescription('開啟或關閉')
                .setRequired(true);
        }),
    run: async (interaction) => {
        if (!interaction.member.voice.channelId)
            return await interaction.reply({
                content: '❌ | 請先進語音頻道!',
                ephemeral: true,
            });
        if (
            interaction.guild.members.me.voice.channelId &&
            interaction.member.voice.channelId !==
                interaction.guild.members.me.voice.channelId
        )
            return await interaction.reply({
                content: '❌ | 我們必須要在同一個語音頻道!',
                ephemeral: true,
            });

        const queue = interaction.client.player.nodes.get(interaction.guildId);

        if (!queue) return await interaction.reply('❌ | 清單目前沒有音樂');

        const mode = interaction.options.getBoolean('value');

        queue.setRepeatMode(mode ? 1 : 0);

        return await interaction.reply(
            `:repeat: | 已${mode ? '開啟' : '關閉'}重複播放!`,
        );
    },
};
