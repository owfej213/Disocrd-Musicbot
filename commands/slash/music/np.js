import { SlashCommandBuilder } from 'discord.js';
import { nowplaying } from '../../../shared/np.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('np')
        .setNameLocalization('zh-TW', '正在播放')
        .setDescription('顯示正在播放的歌曲資訊'),
    category: 'music',
    validateVC: true,
    queueOnly: true,
};

export function execute(interaction, queue) {
    nowplaying(interaction, queue);
}
