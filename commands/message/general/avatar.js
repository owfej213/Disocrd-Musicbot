module.exports = {
    name: 'avatar',
    expertedArgs: '<目標ID>',
    description: '偷走別人的頭像',
    permissions: [],
    minArgs: 1,

    execute: async (message, argument) => {
        try {
            const user = await message.client.users.fetch(argument[0]);
            const avatar = user.displayAvatarURL({
                extension: 'png',
                forceStatic: false,
                size: 1024,
            });
            return message.reply({files: [avatar]});
        }catch{
            return message.reply('ID輸入錯誤!');
        }
    }
}