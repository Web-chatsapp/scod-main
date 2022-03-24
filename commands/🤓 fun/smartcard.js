const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Canvas = require("canvas");
module.exports = {
  name: "simpcard",
   category: "🤓 fun",
  aliases: [],
  description: "",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.guild.me.permissions.has("SEND_MESSAGES")) return;
    const member = message.mentions.members.first() || message.member;
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    let bg = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/765926464628719627/855686984042938368/Simp_Pop_Cat.png"
    );

    const canvas = Canvas.createCanvas(775, 575);
    const ctx = canvas.getContext(`2d`);

    ctx.drawImage(bg, 0, 0, 775, 575);
    ctx.drawImage(avatar, 30, 50, 303, 455);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "simpcard.jpg"
    );
    message.channel.send({files: [attachment]});
  },
};
