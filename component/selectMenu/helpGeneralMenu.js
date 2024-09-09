import { ApplicationCommandType, EmbedBuilder } from 'discord.js';

export const data = {
    id: 'help_general_menu',
    category: 'misc',
};

export async function execute(interaction) {
    await interaction.deferUpdate();

    const category = interaction.values[0];

    const commands = await interaction.client.application.commands.fetch();

    const slashCommands = [];

    // 過濾指令分類
    commands.forEach((command) => {
        if (command.type !== ApplicationCommandType.ChatInput) return;

        const commandData = interaction.client.commands.get(command.name);

        if (commandData.data.category !== category) return;

        slashCommands.push([commandData, command.id]);
    });

    const embed = interaction.message.embeds[0];

    const commandsDescription = slashCommands
        .map(
            ([commandData, commandId]) =>
                `</${commandData.data.command.name}:${commandId}> ${commandData.data.command.description}`,
        )
        .join('\n\n');

    const newEmbed = EmbedBuilder.from(embed)
        .setTitle(category + ' 指令表')
        .setDescription(
            '使用選單查看特定指令說明\n\n' + commandsDescription + '\n',
        )
        .addFields();

    return interaction.message.edit({
        embeds: [newEmbed],
    });
}
