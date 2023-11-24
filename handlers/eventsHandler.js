const fs = require('fs')

module.exports = (client, path) => {

    const eventfiles = fs
        .readdirSync(`${path}`)
        .filter((file) => file.endsWith('.js'))

    for(const file of eventfiles ) {
        const event = require(`${path}/${file}`)
        if(event.once){
            client.on(event.name, (...arg) => event.execute(...arg, client))
        }else {
            client.on(event.name, async (...arg) =>  await event.execute(...arg, client))
        }
    }
}