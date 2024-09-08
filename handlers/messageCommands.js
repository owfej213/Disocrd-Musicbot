import { sync } from 'glob';

export async function loadMessageCommands(client) {
    const commandFiles = sync('./commands/message/**/*.js');

    console.log('Loading message commands');

    for (const file of commandFiles) {
        const command = await import(`../${file}`);

        if (!command.data?.name)
            throw new Error(
                `The command at ${file} is missing a required "data.name" property.`,
            );

        if (typeof command.execute !== 'function')
            throw new Error(
                `The command at ${file} is missing a required "execute" function.`,
            );

        const cmdName = command.data.name;
        client.messageCommands.set(cmdName, command);
    }
}
