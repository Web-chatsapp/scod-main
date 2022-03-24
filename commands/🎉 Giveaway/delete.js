const ms = require('ms');
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);

module.exports = {
  name: "gdelete",
  category: "🎉 Giveaway",
  description: "It will delete the Giveaway",
    usage: "gdelete <message_id>",
  aliases: ["gcancel", "gdelete"],
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



  // If the member doesn't have enough permissions
     if (!message.member.hasPermission("MANAGE_GUILD"))
    {
       message.channel.send(
        "You need `MANAGE GUILD` to Access this Command!"
      );
      return;
}


    if(!args[0]){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    let messageID = args[0];
        client.giveawaysManager.delete(messageID).then(() => {
            message.channel.send("✅ Giveaway deleted!");
        }).catch((err) => {
            message.channel.send(":x: No giveaway found for \`${messageID}\`, please check you have the right message and try again.");
        });
}}
