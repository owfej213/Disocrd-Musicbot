module.exports = {
	name: "playerError",
	execute(queue, error) {
		console.log(error)
		queue.metadata.channel.send(`:x: | 發生錯誤!`)
	},
}