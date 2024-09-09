import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from 'discord.js';

export default () => {
    const menu = new StringSelectMenuBuilder()
        .setCustomId('help_general_menu')
        .setPlaceholder('選擇指令類別')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('音樂')
                .setDescription('播放音樂歌曲')
                .setValue('music'),
            new StringSelectMenuOptionBuilder()
                .setLabel('一般')
                .setDescription('顯示常見資訊')
                .setValue('general'),
            new StringSelectMenuOptionBuilder()
                .setLabel('其他')
                .setDescription('各種小指令')
                .setValue('other'),
        );

    const row = new ActionRowBuilder().addComponents(menu);
    return row;
};
