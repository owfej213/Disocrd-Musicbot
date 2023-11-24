const mongo = require('../../../mongo')
const dice = require('../../../schemas/dice_limited')
const userdata = require('../../../schemas/user-data')

module.exports = {
    name: 'dice',
    expertedArgs: '<賭金> <數字>',
    description: '試試你的手氣!',
    detail: '猜中1~6的數字，獲得6倍金幣!\n但是有1%的機率扣掉你10%的金幣',
    permissions: [],
    minArgs: 2,
    
    execute: async (message, argument) => {
        const { author } = message

        await mongo().then(async () => {
            const limited = await dice.findOne({ user_id: author.id })
            if(limited){
                const then = new Date(limited.updatedAt).getTime()
                const now = new Date().getTime()
                const time = 1000 * 5
                const diffTime = Math.abs( now - then )
                const diff = Math.ceil( diffTime / time )
                const offsetTime = Math.abs( time - diffTime ) / 1000
                const timerSec = offsetTime % 60 << 0

                if(diff <= 1){
                    return message.channel.send(`${author.username} 你還需等待${timerSec}秒!`)
                }
            }

            await dice.findOneAndUpdate({
                user_id: author.id,
            }, {
                user_id: author.id,
            }, {
                upsert: true
            })
            const profile = userdata(message)

            const result = await profile.findOneAndUpdate({
                _id: author.id,
            }, {
                _id: author.id,
            }, {
                upsert: true,
                new: true
            })

            let final = 0
            let bet = Number(argument[0])
            let guess = Number(argument[1])
            let { coin } = result

            if( coin < bet ){
                return message.channel.send(`${author.username} 你沒有足夠的金幣!`)
            }

            if( guess > 6 || guess < 1){
                return message.channel.send(`${author.username} 請輸入1到6其中一個數字!`)
            }

            if( !bet || !guess || bet <= 0){
                return message.channel.send(`${author.username} 輸入錯誤!`)
            }

            let banker = Math.floor(Math.random() * 5) + 1
            let unlucky = Math.floor(Math.random() * 99)

            if( guess === banker ){
                final = bet * 6
            }else {
                final -= bet
            }

            if(!unlucky){
                final = ( coin * -0.1 ) << 0
            }

            await profile.updateOne({
                _id: author.id,
            }, {
                $inc:{
                    coin: final
                }
            }, {
                upsert: true
            })

            if(!unlucky){
                return message.channel.send(`🚨 ${author.username}你觸發了懲罰事件!! 🚨\n沒收 ${final}$`)
            }
            
            if(final > 0){
                return message.channel.send(`骰子結果為 ${banker} \n恭喜🎉 ${author.username} 你贏得 ${final}$`)
            }else{
                return message.channel.send(`骰子結果為 ${banker} \n你輸了 ${bet}$`)
            }
        })
    }
}