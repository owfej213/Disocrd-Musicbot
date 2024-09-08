import 'dotenv/config';
import { Collection, REST, Routes } from 'discord.js';
import { loadSlashCommands } from '../handlers/slashCommands.js';
import { loadContextCommands } from '../handlers/contextCommands.js';

const envVariables = ['BOT_TOKEN', 'BOT_ID', 'DEV_GUILD'];

for (const variable of envVariables) {
    if (!process.env[variable])
        throw new Error(`[ENV] ${variable} is missing.`);
}

const client = {
    slashCommands: new Collection(),
    contextCommands: new Collection(),
};
await loadSlashCommands(client);
await loadContextCommands(client);

const { slashDevCommands, slashOtherCommands } = client.slashCommands.reduce(
    (acc, { data }) => {
        const { command, category } = data;

        if (category === 'dev') {
            acc.slashDevCommands.push(command.toJSON());
        } else {
            acc.slashOtherCommands.push(command.toJSON());
        }

        return acc;
    },
    { slashDevCommands: [], slashOtherCommands: [] },
);

const { contextDevCommands, contextOtherCommands } =
    client.contextCommands.reduce(
        (acc, { data }) => {
            const { command, category } = data;

            if (category === 'dev') {
                acc.contextDevCommands.push(command.toJSON());
            } else {
                acc.contextOtherCommands.push(command.toJSON());
            }

            return acc;
        },
        { contextDevCommands: [], contextOtherCommands: [] },
    );

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

const registerCommand = async () => {
    try {
        const devData = await rest.put(
            Routes.applicationGuildCommands(
                process.env.BOT_ID,
                process.env.DEV_GUILD,
            ),
            { body: [...slashDevCommands, ...contextDevCommands] },
        );
        console.log(`Registered ${devData.length} dev commands.`);

        const otherData = await rest.put(
            Routes.applicationCommands(process.env.BOT_ID),
            {
                body: [...slashOtherCommands, ...contextOtherCommands],
            },
        );
        console.log(`Registered ${otherData.length} other commands.`);
    } catch (error) {
        console.error('Error register commands:', error);
    }
};
registerCommand();
