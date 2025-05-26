import axios from 'axios';
import { SlashCommandBuilder } from 'discord.js';
import { BaseEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('cat')
        .setNameLocalization('zh-TW', '貓咪')
        .setDescription('取得貓咪圖片'),
    category: 'other',
};

export async function execute(interaction) {
    await interaction.deferReply();

    const response = await axios({
        url: 'https://cataas.com/cat',
        method: 'GET',
    });

    const catId = response.data._id;

    const embed = BaseEmbed()
        .setTitle('貓咪')
        .setImage(`https://cataas.com/cat/${catId}`);

    return interaction.editReply({ embeds: [embed] });
}
