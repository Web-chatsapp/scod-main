const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const { Canvas } = require("canvacord");
module.exports = {
  name: "shit",
  category: '🤓 fun',
  usage: 'shit',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.guild.me.permissions.has("SEND_MESSAGES")) return;
    const user = message.mentions.users.first() || message.author;

    const avatar = user.displayAvatarURL({ format: "png" });

    const image = await Canvas.shit(avatar);

    message.channel.send({files: [new MessageAttachment(image, "shit.png")]});
  },
};
