module.exports = {
    name:'ready',
    once: true,

    async execute(client) {
      client.user.setActivity(`${client.config.prefix}help`);

      console.log(`Log in as ${client.user.username}!`);
    }
}