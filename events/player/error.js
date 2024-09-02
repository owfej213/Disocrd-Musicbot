module.exports = {
    name: 'error',
    execute(queue, error) {
        console.log(error);
        queue.metadata.channel.send(`:x: | 發生錯誤!`);
    },
};
