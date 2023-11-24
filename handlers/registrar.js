const { REST } = require('@discordjs/rest')
const { Routes }= require('discord-api-types/v9')

module.exports = (client) => {
    const rest = new REST({ version: "9" }).setToken(client.config.token);

    console.log("Deploying slash commands");

    const commandJsonData = [
		...Array.from(client.slashcommands.values()).map((c) => c.data.toJSON()),
	];

    (async () => {
		try {
			await rest.put(Routes.applicationCommands(client.config.botId), {
				body: commandJsonData,
			});
		} catch (error) {
			console.error(error);
		}
	})();
}