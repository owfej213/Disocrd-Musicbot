import { Events } from 'discord.js';
import 'dotenv/config';

export const data = {
    name: Events.MessageCreate,
};

export function execute(message) {
    if (message.author.bot || !message.guild) return;

    const { client, member, content } = message;

    if (content.startsWith(process.env.PREFIX)) {
        //以空格分割指令
        const argument = content.split(/[ ]+/);

        //去掉指令的開頭
        const Name = argument
            .shift()
            .toLowerCase()
            .replace(process.env.PREFIX, '');
        console.log(Name);

        //確認有這個指令
        const command =
            client.messageCommands.get(Name) ||
            client.messageCommands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(Name),
            );

        if (!command) return;

        const {
            name,
            aliases,
            permissions = [],
            permissionError = '你沒有權限執行',
            minArgs = 0,
            expertedArgs,
        } = command;

        //確保使用者擁有特定身分
        for (const permission of permissions) {
            if (!member.permissions.has(permission)) {
                return message.reply(permissionError);
            }
        }

        //確保使用者輸入正確指令參數數量
        if (argument < minArgs) {
            return message.reply(
                `輸入錯誤! 請使用${name}${
                    aliases ? `(${aliases})` : ''
                } ${expertedArgs}`,
            );
        }

        //開始處理指令
        try {
            command.execute(message, argument, client);
        } catch (err) {
            console.error(err);
        }
    }
}
