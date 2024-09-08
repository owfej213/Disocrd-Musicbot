import { sync } from 'glob';

export async function loadContextCommands(client) {
    const commandFiles = sync('./commands/contextMenus/**/*.js');

    console.log('Loading contextCommands');

    for (const file of commandFiles) {
        const command = await import(`../${file}`);

        if (!command.data?.command)
            throw new Error(
                `The command at ${file} is missing a required "data.command" property.`,
            );

        if (typeof command.execute !== 'function')
            throw new Error(
                `The command at ${file} is missing a required "execute" function.`,
            );

        const cmdName = command.data.command.name;
        client.contextCommands.set(cmdName, command);
    }
}
