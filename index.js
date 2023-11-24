const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const handleEvents = require("./handlers/eventsHandler");
const handleCommands = require('./handlers/commandsHandler');
const handleInteracrion = require('./handlers/interactionHandler');
const handlePlayerEvents = require('./handlers/playerEventsHandler');
const register = require('./handlers/registrar');
const config = require('./config.json');
const mongo = require('./mongo');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});
client.config = config;
client.commands = new Collection();

client.slashcommands = new Collection();
client.player = new Player(client, {
    autoRegisterExtractor: false,
    ytdlOptions: {
        highWaterMark: 1 << 25,
    }
});
client.player.extractors.loadDefault();
mongo();
handleEvents(client, `${__dirname}/events`);
handleCommands(client, `${__dirname}/commands/message`);
handleInteracrion(client, `${__dirname}/commands/slash`);
handlePlayerEvents(client, `${__dirname}/events/player`);
register(client);

client.login(config.token);