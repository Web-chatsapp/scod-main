const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
const db = require("quick.db");
module.exports = {
  name: "togglepruning",
  aliases: ["toggleprunning", "pruning", "prunning"],
  category: "⚙️ Settings",
  description: "Toggles pruning. If its true a message of playing a new track will be sent, even if your afk. If false it wont send any message if a new Track plays! | Default: true aka send new Track information",
  usage: "togglepruning",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    try {
      const checkingBlacklistedMembers = db.fetch(`blacklisted_${message.author.id}`)
    if (checkingBlacklistedMembers === null) {
        checkingBlacklistedMembers === false
    }

    if (checkingBlacklistedMembers === true) return message.lineReply(`You have been blacklisted from my commands. If you wish to appeal, please DM [**${ config.DMtoUnbanID}**] for more info.`);

      const checkingMaintenance = db.fetch(`maintenance`)
    if (checkingMaintenance === null) {
        checkingMaintenance === false
    }

    if (checkingMaintenance === true) return message.lineReply(`Maintenance mode is on so u can't use the bot right now, Try it again later \:)`);
      //set the new prefix
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, `pruning`), `pruning`);
      //return success embed
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | ${client.settings.get(message.guild.id, `pruning`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.ERROR} Disabled`} Pruning`)
        .setDescription(`I will now ${client.settings.get(message.guild.id, `pruning`) ? `` : `not`} send a message with Track Information, if I am on "AFK"`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`${e.message}`)
      );
    }
  }
};
