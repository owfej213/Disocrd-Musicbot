const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setNameLocalization('zh-TW', '音量')
        .setDescription('調整音樂音量')
        .addNumberOption((option) => {
            return option
                .setName('value')
                .setDescription('輸入要調整的音量大小')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(0);
        }),
    run: async (interaction) => {
        const volume = interaction.options.getNumber('value');

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

        if (volume > 100 || volume < 0)
            return await interaction.reply('無效的數值!');

        await queue.node.setVolume(volume);

        return await interaction.reply(`:sound: | 音量已調整至${volume}%!`);
    },
};
