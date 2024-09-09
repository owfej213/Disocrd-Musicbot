import { SlashCommandBuilder } from 'discord.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('avatar')
        .setNameLocalization('zh-TW', '頭像')
        .setDescription('取得使用者頭像')
        .addUserOption((option) =>
            option.setName('使用者').setDescription('成員').setRequired(true),
        ),
    category: 'other',
};

export function execute(interaction) {
    const { user } = interaction.options.getMember('使用者');
    const avatar = user.displayAvatarURL({
        extension: 'png',
        forceStatic: false,
        size: 1024,
    });
    return interaction.reply({ files: [avatar] });
}
