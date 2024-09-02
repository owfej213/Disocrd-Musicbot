// const level = require("../features/level");

const vaildPermission = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS",
];

module.exports = {
  name: "messageCreate",

  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.guild) return;

    //level(message)

    const { member, content } = message;

    if (content.startsWith(client.config.prefix)) {
      //以空格分割指令
      const argument = content.split(/[ ]+/);

      //去掉指令的開頭
      const Name = argument
        .shift()
        .toLowerCase()
        .replace(client.config.prefix, "");
      //確認有這個指令
      const command =
        client.commands.get(Name) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(Name)
        );

      if (!command) return;

      const {
        name,
        aliases,
        permissions,
        permissionError = "你沒有權限執行",
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
            aliases ? `(${aliases})` : ""
          } ${expertedArgs}`
        );
      }

      //開始處理指令
      try {
        command.execute(message, argument, client);
      } catch (err) {
        console.error(err);
      }
    }
  },
};
