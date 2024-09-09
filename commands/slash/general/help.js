import 'dotenv/config';
import { SlashCommandBuilder } from 'discord.js';
import helpMenu from '../../../modules/help/helpMenu.js';
import { BaseEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('help')
        .setDescription('列出所有指令')
        .setNameLocalization('zh-TW', '指令幫助'),
    category: 'general',
};

export async function execute(interaction) {
    const { client } = interaction;

    const ownerUser = await client.users.fetch(process.env.OWNER_ID);

    const embed = BaseEmbed()
        .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
        })
        .setTitle('指令表')
        .setDescription('使用選單選擇指令分類')
        .setThumbnail(client.user.avatarURL())
        .setFooter({
            text: `Made by ${ownerUser.username}`,
            iconURL: ownerUser.avatarURL(),
        });

    const menu = helpMenu();

    return interaction.reply({
        embeds: [embed],
        components: [menu],
    });
}
