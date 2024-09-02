const fs = require('fs');

module.exports = (client, path) => {
    const eventfiles = fs
        .readdirSync(`${path}`)
        .filter((file) => file.endsWith('.js'));

    for (const file of eventfiles) {
        const event = require(`${path}/${file}`);
        if (event.once) {
            client.once(event.name, (...args) =>
                event.execute(...args, client),
            );
        } else {
            client.on(
                event.name,
                async (...args) => await event.execute(...args, client),
            );
        }
    }
};
