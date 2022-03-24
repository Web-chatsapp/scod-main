const ms = require('ms');
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);

module.exports = {
  name: "end",
  category: "🎉 Giveaway",
  description: "It ends the Giveaway",
    usage: "end <message_id> or <Giveaway_Prize_Name>",
  aliases: ["gend"],
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

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send(':x: Unable to find a giveaway for `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('✅ Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send('This giveaway has already ended!');
        } else {
            console.error(e);
            message.channel.send(':x: There was an error');
        }
    });

}}
