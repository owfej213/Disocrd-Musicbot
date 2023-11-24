const mongo = require('../../../mongo')
const userdata = require('../../../schemas/user-data')

module.exports = {
    name: 'pay',
    expertedArgs: '<@某人> <數量>',
    description: '給予某人多少錢',
    permissions: [],
    minArgs: 2,

    execute: async (message, argument) => {
        const { author } = message
        let someone = argument[0].replace(/[^0-9]/ig,"")
        let amount = Number(argument[1])
        if( !someone || !amount ){
            return message.channel.send(`${author.username} 輸入錯誤!`)
        }

        const pay = userdata(message)
        await mongo().then(async mongoose => {
            
            const me = await pay.findOne({
                _id: author.id
            })
            
            let { coin } = me
            if( coin > 0 ){
                await pay.findOneAndUpdate({
                    _id: author.id,
                }, {
                    _id: author.id,
                    coin: (coin - amount)
                }, {
                    upsert: true,
                    new: true
                })

                await pay.findOneAndUpdate({
                    _id: someone,
                }, {
                    _id: someone,
                    coin: amount
                }, {
                    upsert: true,
                    new: true
                })
                message.channel.send(`${author.username} 成功給予 ${argument[0]} ${amount}$!`)
            }else {
                message.channel.send(`${author.username} 你沒有足夠的金幣!`)
            }
        })
    }
}