const { EmbedBuilder } = require('discord.js');

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

        const song = queue.currentTrack;
        if (!song) return await interaction.reply('❌ | 清單目前沒有歌曲');

        let bar = queue.node.createProgressBar({
            queue: false,
            length: 19,
        });
        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${song.title}`)
                    .setURL(`${song.url}`)
                    .setThumbnail(song.thumbnail)
                    .setDescription(bar)
                    .addFields([
                        {
                            name: '**暫停**',
                            value: `\`${
                                queue.node.isPaused() ? '開啟' : '關閉'
                            }\``,
                            inline: true,
                        },
                        {
                            name: '**重複播放**',
                            value: `\`${
                                queue.repeatMode === 1 ? '開啟' : '關閉'
                            }\``,
                            inline: true,
                        },
                        {
                            name: '**自動播放**',
                            value: `\`${
                                queue.repeatMode === 3 ? '開啟' : '關閉'
                            }\``,
                            inline: true,
                        },
                    ]),
            ],
        });
    },
};
