const db = require("quick.db");
const config = require(`../../botconfig/config.json`);
   module.exports = {
  name: "reaction-role",
  category: "🎭Reaction_Roles",
  aliases: ["rr", "reactionrole"],
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
      return message.reply("You Didnt Give me an emoji Here is order to do - ${prefix}rr 🎉 6969696969 @role\n So First is Emoji to add\n Second is Message-id to add\n Third is Role To Ping or Enter Role ID");
    }
    if(!args[1])
    {
      return message.reply("You Didnt Give me a Message ID to add this You can send An embed Message By Bot only And add Reaction role to it");
    }
  var role2 = message.mentions.roles.first();
  

if(!role2)
{
  var role2 = args[2];
  var role2 = message.guild.roles.cache.get(role2);
  console.log("not mentioned");
}

if(!role2)
{
  return message.reply("You Didnt Gave me a role");
}
client.reactionRoleManager.create({
      messageID: args[1],
      channel: message.channel,
      reaction: args[0],
      role: role2
})
message.channel.send(`Done It will take sometime to Add your server in database Please wait`);
 await message.delete();

return;
}}
  