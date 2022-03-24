const db = require("quick.db");
const config = require(`../../botconfig/config.json`);
   module.exports = {
  name: "reaction-role-remove",
  category: "🎭Reaction_Roles",
  aliases: ["reactionrole-remove"],
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
     if(!message.member.hasPermission("ADMINISTRATOR"))
{
  return;
} 
    if(!args[0])
    {
      return message.reply("Please Give me MessageID");
    }
    if(!args[1])
    {
      return message.reply("PLease Give me an emoji to remove that reaction");
    }
client.reactionRoleManager.delete({
          messageID: args[0],
          reaction: args[1],
        });
message.channel.send(`Done deleted the reaction roles`);
 

return;
}}
  