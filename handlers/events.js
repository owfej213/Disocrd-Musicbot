import { useMainPlayer } from 'discord-player';
import { sync } from 'glob';

export async function loadEvents(client) {
    const eventFiles = sync('./events/**/*.js');

    for (const file of eventFiles) {
        const event = await import(`../${file}`);
        const player = useMainPlayer();

        if (!event.data?.name)
            throw new Error(
                `The event at ${file} is missing a required "data.name" property.`,
            );

        if (typeof event.execute !== 'function')
            throw new Error(
                `The event at ${file} is missing a required "execute" function.`,
            );

        const eventName = event.data.name;
        if (event.data.type === 'player') {
            player.events.on(eventName, (...args) => event.execute(...args));
        } else if (event.data.once) {
            client.once(eventName, (...args) => event.execute(...args));
        } else {
            client.on(eventName, (...args) => event.execute(...args));
        }
    }
}
