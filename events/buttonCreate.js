module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        const { customId: command } = interaction;

        if (!interaction.isButton()) return;

        if (!command) {
            return interaction.reply({
                content: `:x: | 發生錯誤!`,
                ephemeral: true,
            });
        }

        require(`../commands/buttons/${command}`).execute(interaction);
    },
};
