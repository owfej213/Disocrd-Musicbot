const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { YoutubeiExtractor } = require('discord-player-youtubei');
const { Player } = require('discord-player');
const handleEvents = require('./handlers/eventsHandler');
const handleCommands = require('./handlers/commandsHandler');
const handleInteracrion = require('./handlers/interactionHandler');
const handlePlayerEvents = require('./handlers/playerEventsHandler');
const register = require('./handlers/registrar');
const config = require('./config.json');
const { QuickDB } = require('quick.db');

const db = new QuickDB();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
});
client.db = db;
client.config = config;
client.commands = new Collection();
client.slashcommands = new Collection();
client.player = new Player(client);
client.player.extractors.register(YoutubeiExtractor, {});

handleEvents(client, `${__dirname}/events`);
handleCommands(client, `${__dirname}/commands/message`);
handleInteracrion(client, `${__dirname}/commands/slash`);
handlePlayerEvents(client, `${__dirname}/events/player`);
register(client);

client.login(config.botToken);
