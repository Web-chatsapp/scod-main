const db = require("quick.db");
const Discord = require("discord.js")
const config = require(`../../botconfig/config.json`);
module.exports = {
  name: "anti-alt",
  category: "🎎AutoMod",
  aliases: ["antialt"],
  run: async(client, message, args) => {
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
       if (!message.member.hasPermission("MANAGE_GUILD"))
    {
       message.channel.send(
        "You need `MANAGE GUILD` to configure the anti alt settings!"
      );
      return;
}
 var wchannel = args[0];
 if(!wchannel)
 {
   return message.reply("Please Give me enable or disable")
 }
 if(wchannel == "enable")
 {
   db.set(`antialt_${message.guild.id}`, wchannel);
   message.reply(`OK now anti-alt is enabled`);
   return;
 }
 else if(wchannel == "disable")
 {
   db.delete(`antialt_${message.guild.id}`);
   message.reply(`OK now anti-alt is disabled`);
   return;
 }else {
 return message.reply("You didnt enter enable or disable")
 }


  }
}