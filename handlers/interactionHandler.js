const fs = require('fs');

module.exports = (client, path) => {
    const readslashcommands = (dir) => {
        const slashFiles = fs.readdirSync(dir);

        for (const file of slashFiles) {
            const stat = fs.lstatSync(`${dir}/${file}`);
            if (stat.isDirectory()) {
                readslashcommands(`${dir}/${file}`);
            } else {
                const slashcmd = require(`${dir}/${file}`);
                client.slashcommands.set(slashcmd.data.name, slashcmd);
            }
        }
    };
    readslashcommands(path);
};
