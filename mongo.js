const mongoose = require('mongoose');
const config = require('./config.json');

module.exports = async () => {
    await mongoose.connect(config.mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return mongoose;
}