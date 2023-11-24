const fs = require('fs')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'help',
    aliases: ['h'],
    expertedArgs: '',
    description: '查看指令表',
    permissions: [],
    minArgs: 0,
    
    execute: async (message, argument) => {
        const prefix = message.client.config.prefix
        const Embeds = new EmbedBuilder()
        let category = ''
        let descriptions = ''
        let exist = false
        let existfile = false
        if(argument[0]){
            const CommandsDisplay = (dir) => {
                const files = fs.readdirSync(dir)
                for(const file of files){
                    const stat = fs.lstatSync(`${dir}/${file}`)
                    if(stat.isDirectory()){
                        if(file === argument[0].toLowerCase()){
                            exist = true
                            Embeds
                                .setTitle(argument[0].toLowerCase())
                            CommandsDisplay(`${dir}/${file}`)
                            return
                        }
                        CommandsDisplay(`${dir}/${file}`)
                    }else if (stat.isFile()){
                        const command = require(`${dir}/${file}`)
                        const { name, aliases, description, expertedArgs, detail } = command
                        if(exist){
                            Embeds
                            .addFields([
                                { name: `**${prefix}${name}**`, value: `${description}`, inline: true },
                            ])
                        }
                        if(file.replace('.js', '') === argument[0].toLowerCase()){
                            existfile = true
                            Embeds
                                .setTitle(argument[0].toLowerCase())
                                .setDescription(`${detail ? `${detail}` : `${description}`}`)
                                .addFields([
                                    { name: `**用法**`, value: `${prefix}${name} ${aliases ? `(${aliases})` : ""} ${expertedArgs}`},
                                ])
                            return
                        }
                    }
                }
            }
            CommandsDisplay(__dirname)
        }else{
            exist = true
            Embeds
                .setTitle(`指令表`)
                .setDescription(`使用\`${prefix}help <分類/指令>\`查看細節`)
            const CommandsDisplay = (dir) => {
                const files = fs.readdirSync(dir)
                for(const file of files){
                    const stat = fs.lstatSync(`${dir}/${file}`)
                    if(stat.isDirectory()){
                        category = file
                        CommandsDisplay(`${dir}/${file}`)
                    }else if (file !== 'help.js'){
                        const command = require(`${dir}/${file}`)
                        const { name } = command
                        descriptions += `\`${name}\` `
                    }
                }
                if(category){
                    Embeds
                        .addFields([
                            { name: category, value: descriptions},
                        ])
                }
                category = ''
                descriptions = ''
            }
            CommandsDisplay(__dirname)
        }
        
        if(!exist && !existfile){
            return message.channel.send(`指令不存在!`)
        }
        message.channel.send({
            embeds:[Embeds],
        })
    }
}