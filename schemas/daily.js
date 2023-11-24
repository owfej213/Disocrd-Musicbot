const mongoose = require('mongoose')

const dailyRewardsSchema = mongoose.Schema({
        user_id: {
            type: String,
            required: true,
        },
        guild_id: {
            type: String,
            required: true,
        },
        dice_limited: {
            type: Number,
            default: 10,
        },
    }, {
        timestamps: true
    })
    
module.exports = mongoose.model(`User-daily`, dailyRewardsSchema)