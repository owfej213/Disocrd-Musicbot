module.exports = {
    name: 'error',
    execute(queue, error) {
        console.log('-----DISCORD-PLAYER ERROR-----\n' + error);

        queue.metadata.channel.send(`:x: | 發生錯誤!`);
    },
};
