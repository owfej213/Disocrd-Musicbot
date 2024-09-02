const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('列出所有指令')
        .setNameLocalization('zh-TW', '指令幫助'),
    run: async (interaction) => {
        const { client } = interaction;
        const Embeds = new EmbedBuilder();
        const commands = await client.application.commands.fetch();
        commands.forEach((command) => {
            const commandData = client.slashcommands.get(command.name);
            Embeds.addFields([
                {
                    name: `${
                        commandData.data.name_localizations[interaction.locale]
                    }`,
                    value: `</${commandData.data.name}:${command.id}>\n${commandData.data.description}`,
                    inline: true,
                },
            ]);
        });

        return await interaction.reply({
            embeds: [
                Embeds.setAuthor({
                    name: 'Gura指令表',
                    iconURL: client.user.avatarURL(),
                }).setThumbnail(client.user.avatarURL()),
            ],
            ephemeral: true,
        });
    },
};
