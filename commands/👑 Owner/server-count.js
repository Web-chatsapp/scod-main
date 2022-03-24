const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "servercount",
  category: "👑 Owner",
  aliases: ["svrcount"],
  cooldown: 5,
  usage: "svrc",
  description: "Shows you how much guilds i'm in",
  run: async (client, message, args, user, text, prefix) => {
    try {

      if(message.author.id != '849359686855950375') return message.channel.send('Only the owner can run this command')

      message.channel.send(new MessageEmbed()
        .setColor(`BLUE`)
        .setTitle(`Scod server count`)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`Scod is in **${client.guilds.cache.size}** Servers!`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
}
