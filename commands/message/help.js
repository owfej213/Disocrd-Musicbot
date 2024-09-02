const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'help',
    expertedArgs: '',
    description: '指令幫助',
    permissions: [],
    minArgs: 0,

    execute: async (message, argument) => {
        const embed = new EmbedBuilder()
            .setColor(39423)
            .setDescription(`請輸入斜線指令\`\`\`/help\`\`\`獲得更多指令幫助!`);
        return message.reply({ embeds: [embed] });
    },
};
