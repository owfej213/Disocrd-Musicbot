import { Events } from 'discord.js';
import { loadCommands } from '../../handlers/commands.js';
import { loadComponents } from '../../handlers/component.js';
import { loadMessageCommands } from '../../handlers/messageCommands.js';

export const data = {
    name: Events.ClientReady,
    once: true,
};

export async function execute(client) {
    await loadCommands(client);
    await loadComponents(client);
    await loadMessageCommands(client);

    client.user.setActivity(`/help`);

    console.log(`Log in as ${client.user.username}!`);
}
