const mongo = require('../../../mongo')
const daily = require('../../../schemas/daily')
const userdata = require('../../../schemas/user-data')

module.exports = {
    name: 'daily',
    expertedArgs: '',
    description: '領取你的每日獎勵',
    permissions: [],
    minArgs: 0,

    execute: async (message) => {
        const { member, author } = message
        const profile = userdata(message)
        const obj = {
            user_id: author.id,
            guild_id: message.guild.id
        }

        await mongo().then(async () => {
            
            const result = await daily.findOne(obj)

            if(result){
                const then = new Date(result.updatedAt).getTime()
                const now = new Date().getTime()
                const day = 1000 * 60 * 60 * 24
                const diffTime = Math.abs( now - then )
                const diffDay = Math.ceil( diffTime / day )
                const offsetTime = Math.abs( day - diffTime ) / 1000
                const timerSec = offsetTime % 60 << 0
                const timerMin = ( offsetTime / 60 ) % 60 << 0
                const timerHour = offsetTime / 60 / 60 << 0
                const timer = `${timerHour}時 ${timerMin}分 ${timerSec}秒`

                if(diffDay <= 1){
                    return message.channel.send(`${message.author.username} 你的每日獎勵還在冷卻中!\n還需等待 ` + timer)
                }
            }

            await daily.findOneAndUpdate(obj, obj, {
                upsert: true
            })

            await profile.findOneAndUpdate({
                _id: author.id,
            }, {
                $inc:{
                    'coin': 100
                }
            }, {
                upsert: true
            })

            message.channel.send(`${message.author.username} 成功領取每日獎勵!\n💰+100$`)
        })
    }
}