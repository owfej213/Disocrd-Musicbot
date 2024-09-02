module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        client.user.setActivity(`/help`);

        console.log(`Log in as ${client.user.username}!`);
    },
};
