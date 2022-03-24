const db = require("quick.db");
const Discord = require("discord.js")
const config = require(`../../botconfig/config.json`);
module.exports = {
  name: "autorole",
   description: "It set your server role to give if any member joined",
    usage: "autorole",
  category: "🎎AutoMod",
  aliases: ["a-r", "auto-role"],
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
     if (message.member.hasPermission("MANAGE_SERVER")) {
      if (message.content.includes("@everyone")) {
        return message.reply("Everyone is already automatically given by discord");
      }
    
if(!args[0])
{
  return message.reply("Hey You didnt Gave me role to add when a member joins the server, Usage : **autorole @role**");
}
if(args[0] == "disable" || args[0] == "off")
{
 
  db.delete(`autorole_${message.guild.id}`);
  return message.reply("Done i have Disabled auto role in your server enable it by adding any role");
}
else {
  var role1 = message.mentions.roles.first().id;
    if(!role1)
    {
    var role1 = args[0];
    }
message.reply(`Ok Now i will give this role when someone joins this server role - ${role1}`)
db.set(`autorole_${message.guild.id}`, role1);
}
     }
  }
}
