module.exports = {
    execute: async (interaction) => {
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

        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue) return await interaction.reply('❌ | 清單目前沒有歌曲');

        queue.node.skip();

        return await interaction.reply({
            content: `:track_next: | 已跳過音樂`,
            ephemeral: true,
        });
    },
};
