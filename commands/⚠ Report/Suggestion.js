const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);


module.exports = {
  name: "botsuggest",
  category: "⚠ Report",
  description: "To suggest any feature",
    usage: "suggest",
  aliases: ["botsuggestion"],
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
if(!args[0])
{
  message.channel.send("PLease Give me Something to report!!")
  return;
}
let args1 = args.join(' ');
const channel = client.channels.cache.get("951859842987995157")
const embed = new MessageEmbed()
.setDescription(`**Suggest Reported**\n Reporter : <@!${message.member.id}>\n Suggestion : ${args1}\n GUild : ${message.guild.name}`)
channel.send(embed)
message.channel.send("Done your suggestion report has been sent to the developers!!")



  }
}
