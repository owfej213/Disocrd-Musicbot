import { sync } from 'glob';

export async function loadCommands(client) {
    const commandFiles = sync('commands/**/*.js', {
        ignore: 'commands/message/**',
    });
    console.log('Loading commands');

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
        client.commands.set(cmdName, command);
    }
}
