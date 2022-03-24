const db = require("quick.db");
const Discord = require("discord.js");
const config = require(`../../botconfig/config.json`);
module.exports = {
  name: "autonick",
  category: "🎎AutoMod",
  aliases: ["auto-nick"],
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
        "You need `MANAGE GUILD` to configure the auto nick settings!"
      );
      return;
}
if(!args[0]){
  return message.reply(" pls enter a nickname like : LGT -username- OP (Username means the joiner username)")
}
    let message1 = args.join(" ");
    if(message1 !== "disable")
{
  db.set(`nickm_${message.guild.id}`, message1);
  message.channel.send(`Done Your Message Has been set n Database`);
}
if(args[0] == "disable" || args[0] == "off")
{
 db.delete(`nickm_${message.guild.id}`);
 return message.reply("done deleted the autonick feature");
}

  }}