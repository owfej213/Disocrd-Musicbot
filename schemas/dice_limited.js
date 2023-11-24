const mongoose = require('mongoose')

const diceLimited = mongoose.Schema({
        user_id: {
            type: String,
            required: true,
        },
        guild_id: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            default: 20,
        },
    }, {
        timestamps: true
    })
    
module.exports = mongoose.model(`User-dice-limited`, diceLimited)