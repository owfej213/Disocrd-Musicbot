import { BaseEmbed } from '../../modules/embeds.js';

export const data = {
    name: 'help',
    category: 'misc',
    expertedArgs: '',
    description: '指令幫助',
    permissions: [],
    minArgs: 0,
};

export async function execute(message) {
    const embed = BaseEmbed().setDescription(
        `請輸入斜線指令\`\`\`/help\`\`\`獲得更多指令幫助!`,
    );
    return message.reply({ embeds: [embed] });
}
