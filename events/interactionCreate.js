module.exports = {
    name:'interactionCreate',

    async execute(interaction) {

        const { client } = interaction

        if(!interaction.isCommand()) return
        
        const slashcmd = client.slashcommands.get(interaction.commandName)
        
        if(!slashcmd) return interaction.reply("無效的指令!")
    
        await slashcmd.run({client, interaction})
    }
}