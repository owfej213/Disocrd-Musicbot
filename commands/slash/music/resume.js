const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setNameLocalization('zh-TW', '恢復')
        .setDescription('恢復音樂播放'),
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

        queue.node.resume();

        return await interaction.reply(`:arrow_forward: | 音樂已恢復播放!`);
    },
};
