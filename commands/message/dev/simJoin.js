import { SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    name: 'simjoin',
    category: 'dev',
    expertedArgs: '',
    description: '模擬加入伺服器',
    permissions: ['ADMINISTRATOR'],
    minArgs: 0,
};

export async function execute(message) {
    message.client.emit('guildMemberAdd', message.member);

    return message.reply({
        ephemeral: true,
        embeds: [SuccessEmbed('成功模擬加入伺服器')],
    });
}
