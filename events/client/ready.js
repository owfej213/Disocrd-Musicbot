import { Events } from 'discord.js';
import { loadSlashCommands } from '../../handlers/slashCommands.js';
import { loadComponents } from '../../handlers/component.js';
import { loadMessageCommands } from '../../handlers/messageCommands.js';
import { loadContextCommands } from '../../handlers/contextCommands.js';

export const data = {
    name: Events.ClientReady,
    once: true,
};

export async function execute(client) {
    await loadContextCommands(client);
    await loadSlashCommands(client);
    await loadComponents(client);
    await loadMessageCommands(client);

    client.user.setActivity(`/help`);

    console.log(`Log in as ${client.user.username}!`);
}
