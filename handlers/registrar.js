const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

module.exports = (client) => {
    const rest = new REST({ version: '10' }).setToken(client.config.botToken);

    console.log('Deploying slash commands');

    const commandJsonData = [
        ...Array.from(client.slashcommands.values()).map((c) =>
            c.data.toJSON(),
        ),
    ];

    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.config.botId), {
                body: commandJsonData,
            });
            // 新增指令在伺服器(測試用)
            // await rest.put(
            //     Routes.applicationGuildCommands(
            //         client.config.botId,
            //         client.config.testGuildId,
            //     ),
            //     {
            //         body: commandJsonData,
            //     },
            // );
        } catch (error) {
            console.error(error);
        }
    })();
};
