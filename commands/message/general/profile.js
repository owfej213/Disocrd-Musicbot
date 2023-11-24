const mongo = require('../../../mongo')
const userdata = require('../../../schemas/user-data')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'profile',
    aliases: ['p'],
    expertedArgs: '',
    description: '查看你的個人資料',
    permissions: [],
    minArgs: 0,

    execute: async (message) => {
        const { author } = message
        const user = userdata(message)

        await mongo().then(async () => {
            
            const result = await user.findOneAndUpdate({
                _id: author.id,
            }, {
                _id: author.id,
            }, {
                upsert: true,
                new: true
            })
            let { level, xp, coin } = result
            const nextlevel = Math.round(0.005*(level**3) + 0.8*(level**2) + 10*level)

            let Embed = new EmbedBuilder()
                .setTitle(`${message.author.username}-個人資料\n`)
                .addField(`等級`, `${level}等`, true)
                .addField(`經驗`, `${xp}/${nextlevel}`, true)
                .addField(`金幣`, `${coin}$`, true)
            message.channel.send({
                embeds:[Embed]
            })
        })
    }
}