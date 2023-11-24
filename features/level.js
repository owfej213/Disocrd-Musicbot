const mongo = require('../mongo')
const userdata = require('../schemas/user-data')

const addXP = async (message, userId, xpToAdd) => {
    const userdatas = userdata(message);
    try {
        const result = await userdatas.findOneAndUpdate({
            _id: userId
        }, {
            $inc: {
                xp: xpToAdd,
                messageCount: 1
            }
        }, {
            upsert: true,
            new: true
        });
        let { xp, level } = result;
        const needxp = Math.floor(0.005*(level**3) + 0.8*(level**2) + 10*level);
        if(xp > needxp){
            ++level;
            var reward = 100 * level;
            xp -= needxp;
            //message.channel.send(`<@${message.author.id}>升級到${level}等了!\n💰+${reward}$`)
        }
        await userdatas.updateOne({
            _id: userId
        }, {
            level,
            xp,
            $inc:{
                coin: reward || 0
            }
        }, {
            upsert: true,
            new: true
        });
    } catch(error){
        console.log(error);
    }
}
module.exports = (message) =>{
    const { member } = message;
    addXP(message, member.id, 1);
}