import { sync } from 'glob';

export async function loadSlashCommands(client) {
    const commandFiles = sync('./commands/slash/**/*.js');

    console.log('Loading slashCommands');

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
        client.slashCommands.set(cmdName, command);
    }
}
