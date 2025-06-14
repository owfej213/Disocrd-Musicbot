import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { ErrorEmbed, SuccessEmbed } from '../../../modules/embeds.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('welcome')
        .setNameLocalization('zh-TW', '歡迎頻道')
        .setDescription('設定歡迎頻道')
        .addChannelOption((option) =>
            option
                .setName('頻道')
                .setDescription('設定歡迎頻道')
                .setRequired(true),
        ),
    category: 'other',
};

export async function execute(interaction) {
    if (
        !interaction.member.permissions.has(
            PermissionsBitField.Flags.ManageRoles,
        )
    ) {
        return await interaction.reply({
            embeds: [ErrorEmbed(`你必須要有管理權限才能使用此功能`)],
            ephemeral: true,
        });
    }

    const db = interaction.client.db;

    const channel = interaction.options.getChannel('頻道');

    await db.set(interaction.guildId, { welcomeChannel: channel.id });

    return await interaction.reply({
        embeds: [SuccessEmbed(`歡迎頻道已設定為 <#${channel.id}>`)],
    });
}
