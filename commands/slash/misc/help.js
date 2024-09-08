import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = {
    command: new SlashCommandBuilder()
        .setName('help')
        .setDescription('列出所有指令')
        .setNameLocalization('zh-TW', '指令幫助'),
    category: 'misc',
};

export async function execute(interaction) {
    const { client } = interaction;
    const Embeds = new EmbedBuilder();
    const commands = await client.application.commands.fetch();
    commands.forEach((command) => {
        const commandData = client.slashCommands.get(command.name);
        Embeds.addFields([
            {
                name: `${
                    commandData.data.command.name_localizations[
                        interaction.locale
                    ]
                }`,
                value: `</${commandData.data.command.name}:${command.id}>\n${commandData.data.command.description}`,
                inline: true,
            },
        ]);
    });

    return interaction.reply({
        embeds: [
            Embeds.setAuthor({
                name: 'Gura指令表',
                iconURL: client.user.avatarURL(),
            }).setThumbnail(client.user.avatarURL()),
        ],
        ephemeral: true,
    });
}
