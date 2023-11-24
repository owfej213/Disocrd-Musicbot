const { SlashCommandBuilder } = require('@discordjs/builders')
const { ActionRowBuilder: row, ButtonBuilder: button, OAuth2Scopes, PermissionFlagsBits, ButtonStyle  } = require('discord.js')

module.exports = {
    commandID: '1030049933069398076',
    data: new SlashCommandBuilder()
    .setName("invite")
    .setNameLocalization('zh-TW', '邀請連結')
    .setDescription("產生邀請連結"),
    run: async({client, interaction}) => {

        const invite = await client.generateInvite({
            permissions: [
                PermissionFlagsBits.Administrator
            ],
            scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands]
        })

        const rw = new row().addComponents(
            new button().setURL(invite).setStyle(ButtonStyle.Link).setLabel("邀請連結")
		)

        return await interaction.reply({
            components: [rw],
            ephemeral: true,
        })
    }
}