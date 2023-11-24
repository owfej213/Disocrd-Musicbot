const mongoose = require('mongoose')

const WelcomeSchema = mongoose.Schema({
        _id: {
            type: String,
            required: true,
        },
        ChannelId: {
            type: String,
            required: true,
        },
    })
    
module.exports = mongoose.model(`Welcome-Canvas`, WelcomeSchema)