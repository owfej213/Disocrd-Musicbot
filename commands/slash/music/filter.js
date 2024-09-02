const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('filter')
        .setNameLocalization('zh-TW', '曲風')
        .setDescription('改變音樂風格')
        .addStringOption((option) => {
            return option
                .setName('filters')
                .setDescription('改變曲風')
                .setRequired(true)
                .addChoices(
                    { name: 'Clear', value: 'clear' },
                    { name: '8D', value: '8D' },
                    { name: 'Nightcore', value: 'nightcore' },
                    { name: 'Bassboost', value: 'bassboost' },
                    { name: 'Earrape', value: 'earrape' },
                    { name: 'Vibrato', value: 'vibrato' },
                    { name: 'Reverse', value: 'reverse' },
                );
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

        const filter = interaction.options.getString('filters');

        await queue.filters.ffmpeg.toggle(
            filter === 'clear' ? queue.filters.ffmpeg.filter : [filter],
        );

        return await interaction.reply({
            embeds: [
                new EmbedBuilder().setTitle(`成功新增Filter **${filter}**!`),
            ],
        });
    },
};
