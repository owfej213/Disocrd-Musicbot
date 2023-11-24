const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')
const fs = require('fs')

module.exports = {
    commandID:"1157691917744746577",
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("列出所有指令")
    .setNameLocalization('zh-TW', '指令幫助'),
    run: async ({client, interaction}) => {
        const Embeds = new EmbedBuilder();
        const readCommands = dir => {
            const files = fs.readdirSync(dir);
            for(const file of files){
                const stat = fs.lstatSync(`${dir}/${file}`);
                if(stat.isDirectory()){
                    readCommands(`${dir}/${file}`)
                }else{
                    const command = require(`${dir}/${file}`);
                    Embeds
                        .addFields([
                            {  
                                name: `${command.data.name_localizations[interaction.locale]}`,
                                value: `</${command.data.name}:${command.commandID}>\n${command.data.description}`,
                                inline: true,
                        },
                    ]);
                }
            }
        }
        readCommands(__dirname);
        await client.application.fetch();
        return await interaction.reply({
            embeds:[
                Embeds
                    .setTitle(`Gura指令表`)
                    .setAuthor({name:'Rentolly', iconURL: `${client.application.owner.avatarURL()}`})
            ],
            ephemeral: true,
        });
    }
}