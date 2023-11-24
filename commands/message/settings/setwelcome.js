const WelcomeSchema = require('../../../schemas/welcome')

const cache = new Map()

const loadData = async () => {
    const results = await WelcomeSchema.find()
    
    for ( const result of results ){
        cache.set(result._id, result.ChannelId)
    }
}

module.exports = {
    name: 'setwelcome',
    aliases: [],
    expertedArgs: '',
    description: '設定加入頻道',
    permissions: ['ADMINISTRATOR'],
    minArgs: 0,

    execute: async (message) => {
        const { guild, channel } = message
        
        await WelcomeSchema.findOneAndUpdate({
            _id: guild.id
        },{
            _id: guild.id,
            ChannelId: channel.id
        },{
            upsert: true
        })

        cache.set(guild._id, channel.ChannelId)

        message.reply('頻道已設定!')
    }
}

let done = false

module.exports.getChannelId = async (guildId) => {
    if(!done){
        await loadData()
        done = true
    }
    return cache.get(guildId)
}