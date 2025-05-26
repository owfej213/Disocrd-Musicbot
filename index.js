import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { YoutubeiExtractor } from 'discord-player-youtubei';
import { Player } from 'discord-player';
import { loadEvents } from './handlers/events.js';
import { QuickDB } from 'quick.db';

class ExtendedClient extends Client {
    messageCommands = new Collection();
    commands = new Collection();
    components = new Collection();
    db = new QuickDB();

    constructor(options) {
        super(options);
    }
}

const client = new ExtendedClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
});

const player = new Player(client);

await player.extractors.register(YoutubeiExtractor, {
    streamOptions: {
        highWaterMark: 1 << 25,
        quality: 'best',
        useClient: 'ANDROID',
    },
});

await loadEvents(client);

await client.login(process.env.BOT_TOKEN);
