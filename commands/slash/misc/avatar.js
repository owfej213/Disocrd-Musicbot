const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setNameLocalization('zh-TW', '頭像')
        .setDescription('取得使用者頭貼')
        .addUserOption((option) =>
            option.setName('使用者').setDescription('成員').setRequired(true),
        ),
    run: async (interaction) => {
        const { user } = interaction.options.getMember('使用者');
        const avatar = user.displayAvatarURL({
            extension: 'png',
            forceStatic: false,
            size: 1024,
        });
        return message.reply({ files: [avatar] });
    },
};
