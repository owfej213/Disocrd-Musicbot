const fs = require('fs');

module.exports = (client, path) => {
    const eventFiles = fs
        .readdirSync(`${path}`)
        .filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`${path}/${file}`);
        client.player.on(
            event.name,
            async (...args) => await event.execute(...args, client),
        );
    }
};
