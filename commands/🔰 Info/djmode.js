const {
  MessageEmbed
} = require("discord.js");
const db = require("quick.db");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "djmode",
  category: "🔰 Info",
  aliases: ["djonlymode"],
  cooldown: 5,
  usage: "djmode",
  description: "Shows if there is a DJ-Only Mode / not and all Dj Settings..",
  run: async (client, message, args, user, text, prefix) => {
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

      //create the string of all djs and if he is a dj then set it to true
      let isdj = false;
      let leftb = "";
      if (client.settings.get(message.guild.id, `djroles`).join("") === "")
        leftb = "no Dj Roles, aka all Users are Djs  "
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
          if (message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
          if (!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
          leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + ">\n"
        }

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle("💢 Dj Mode")
        .setDescription("If a Command is listed here, and at least one role exists, then it means that you have to have this Role, in order to be able to use these listed Commands")
        .addField("⚠️ Dj Only Commands active for:", `\`${client.settings.get(message.guild.id, `djonlycmds`).sort(function(a, b){if(a < b) { return -1; }if(a > b) { return 1; }  return 0;}).join("`, `")}\``.substr(0, 1024))
        .addField("🎧 Dj Roles", `${leftb ? leftb.length < 0 ? "no Dj Roles, aka all Users are Djs" : leftb.substr(0, leftb.length-2) : "no Dj Roles, aka all Users are Djs"}`, true)
        .setFooter(ee.footertext, ee.footericon)
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
