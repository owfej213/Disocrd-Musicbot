module.exports = {
    name: 'playerError',
    execute(queue, error) {
        console.log('-----DISCORD-PLAYER PLAYERERROR-----\n' + error);

        queue.metadata.channel.send(`:x: | 發生錯誤!`);
    },
};
