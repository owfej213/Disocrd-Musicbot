import axios from 'axios';
import { SlashCommandBuilder } from 'discord.js';
import { BaseEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('dog')
        .setNameLocalization('zh-TW', '狗狗')
        .setDescription('取得狗狗圖片'),
    category: 'other',
};

export async function execute(interaction) {
    await interaction.deferReply();

    const response = await axios({
        url: 'https://dog.ceo/api/breeds/image/random',
        method: 'GET',
    });

    const dogId = response.data.message;

    const embed = BaseEmbed().setTitle('狗狗').setImage(dogId);

    return interaction.editReply({ embeds: [embed] });
}
