const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    EmbedBuilder,
    ActionRowBuilder: row,
    ButtonBuilder: button,
    ButtonStyle,
} = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setNameLocalization('zh-TW', '播放音樂')
        .setDescription('播放音樂')
        .addStringOption((option) =>
            option
                .setName('track')
                .setDescription('輸入關鍵字/音樂網址/播放清單網址')
                .setRequired(true),
        ),
    run: async (interaction) => {
        await interaction.deferReply();

        const query = interaction.options.getString('track');

        if (!interaction.member.voice.channelId)
            return await interaction.editReply({
                content: '❌ | 請先進語音頻道!',
                ephemeral: true,
            });
        if (
            interaction.guild.members.me.voice.channelId &&
            interaction.member.voice.channelId !==
                interaction.guild.members.me.voice.channelId
        )
            return await interaction.editReply({
                content: '❌ | 我們必須要在同一個語音頻道!',
                ephemeral: true,
            });

        const queue = interaction.client.player.nodes.create(
            interaction.guild,
            {
                metadata: {
                    channel: interaction.channel,
                    requestedBy: interaction.user,
                },
                volume: 80,
                selfDeaf: false,
                leaveOnEmpty: true,
                leaveOnEnd: false,
            },
        );
        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
        } catch {
            queue.destroy();
            return await interaction.editReply({
                content: '❌ | 無法加入你的頻道!',
                ephemeral: true,
            });
        }

        const result = await interaction.client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if (result.isEmpty())
            return await interaction.editReply({
                content: `❌ | 沒有任何結果!`,
                ephemeral: true,
            });

        const embed = new EmbedBuilder();

        if (result.playlist) {
            const resultToJSON = result.toJSON();
            const count = resultToJSON.tracks.length;
            const tr = resultToJSON.playlist;
            embed
                .setTitle(tr.title)
                .setURL(tr.url)
                .setAuthor({ name: tr.author.name })
                .setThumbnail(tr.thumbnail.url)
                .addFields([
                    { name: '**數量**', value: `${count}首`, inline: true },
                    {
                        name: '**加入者**',
                        value: `${interaction.user}`,
                        inline: true,
                    },
                ]);
        } else {
            const tr = result.toJSON().tracks[0];
            embed
                .setTitle(tr.title)
                .setURL(tr.url)
                .setAuthor({ name: tr.author })
                .setThumbnail(tr.thumbnail)
                .addFields([
                    { name: '**長度**', value: `${tr.duration}`, inline: true },
                    {
                        name: '**加入者**',
                        value: `${interaction.user}`,
                        inline: true,
                    },
                ]);
        }
        result.playlist
            ? queue.addTracks(result.tracks)
            : queue.addTrack(result.tracks[0]);

        if (!queue.node.isPlaying()) queue.node.play();

        const row1 = new row().addComponents(
            new button()
                .setCustomId('back')
                .setEmoji('⏮')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('回放'),
            new button()
                .setCustomId('pause')
                .setEmoji('⏸')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('暫停'),
            new button()
                .setCustomId('loop')
                .setEmoji('🔁')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('重複播放'),
            new button()
                .setCustomId('autoplay')
                .setEmoji('🔀')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('自動播放'),
            new button()
                .setCustomId('skip')
                .setEmoji('⏭️')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('跳過'),
        );
        const row2 = new row().addComponents(
            new button()
                .setCustomId('playthis')
                .setEmoji('↩')
                .setStyle(ButtonStyle.Success)
                .setLabel('播放這首'),
            new button()
                .setCustomId('np')
                .setEmoji('▶')
                .setStyle(ButtonStyle.Success)
                .setLabel('正在播放'),
            new button()
                .setCustomId('queue')
                .setEmoji('📜')
                .setStyle(ButtonStyle.Success)
                .setLabel('清單'),
            new button()
                .setCustomId('clearqueue')
                .setEmoji('♻')
                .setStyle(ButtonStyle.Danger)
                .setLabel('清除'),
            new button()
                .setCustomId('quit')
                .setEmoji('👋')
                .setStyle(ButtonStyle.Danger)
                .setLabel('離開'),
        );
        return await interaction.editReply({
            embeds: [embed],
            components: [row1, row2],
        });
    },
};
