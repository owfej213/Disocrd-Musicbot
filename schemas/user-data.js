const mongoose = require('mongoose')

const userData = mongoose.Schema({
        _id: {
            type: String,
            required: true,
        },
        messageCount: {
            type: Number,
            required: true,
        },
        xp: {
            type: Number,
            default: 0,
        },
        level: {
            type: Number,
            default: 1,
        },
        coin: {
            type: Number,
            default: 0,
        },
    })
    
module.exports = (message) => {
    const { guild } = message

    var Admin

    if (mongoose.models.Admin) {
        Admin = mongoose.model(`Guild-${guild.name}-${guild.id}`)
    } else {
        Admin = mongoose.model(`Guild-${guild.name}-${guild.id}`, userData)
    }
    return Admin
}