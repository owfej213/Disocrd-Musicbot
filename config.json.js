require('dotenv').config();

module.exports = {
    botToken: process.env.botToken,
    botId: process.env.botId,
    ownerId: process.env.ownerId,
    testGuildId: process.env.testGuildId,
    prefix: process.env.prefix,
};
