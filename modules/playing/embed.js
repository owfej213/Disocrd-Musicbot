import sourceIcons from '../../config/sourceIcons.js';
import { BaseEmbed } from '../embeds.js';

export default (queue, track) => {
    if (!track) track = queue.currentTrack;
    const repeatMode = {
        0: '關閉',
        1: '單首',
        2: '播放清單',
        3: '自動播放',
    }[queue.repeatMode];

    let playerStatus = String;
    let icon = String;

    if (!queue.node.isPlaying()) {
        playerStatus = '沒有音樂正在播放';
    } else if (queue.node.isPaused()) {
        playerStatus = '暫停中 ⏸️';
    } else {
        playerStatus = '正在播放 🎵';
    }

    if (!queue.node.isPlaying()) {
        icon = queue.player.client.user.displayAvatarURL();
    } else {
        icon =
            sourceIcons[track.source] ??
            queue.player.client.user.displayAvatarURL();
    }

    return BaseEmbed()
        .setAuthor({
            name: playerStatus,
            iconURL: icon,
        })
        .setTitle(`${track.title}`)
        .setURL(`${track.url}`)
        .setFields(
            {
                name: '**加入者**',
                value: `${track.requestedBy}`,
                inline: true,
            },
            { name: '**上傳者**', value: `${track.author}`, inline: true },
            { name: '**長度**', value: `${track.duration}`, inline: true },
            {
                name: '**音量**',
                value: `${queue.node.volume}%`,
                inline: true,
            },
            {
                name: '**重複播放模式**',
                value: `${repeatMode}`,
                inline: true,
            },
            {
                name: '**隨機播放**',
                value: `${queue.isShuffling ? '✅' : '❌'}`,
                inline: true,
            },
        )
        .setImage(
            track.source === 'soundcloud'
                ? track.thumbnail.replace('-large.jpg', '-t500x500.jpg')
                : track.thumbnail,
        );
};
