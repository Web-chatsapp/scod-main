const db = require("quick.db");
const sourcebin = require('sourcebin_js');
const Discord = require("discord.js");
const config = require(`../../botconfig/config.json`);
module.exports = {
  name: "delete-ticket",
  category: "🎫 Ticket",
  description: "It will forcely delete the ticket channel",
    usage: "delete",
  aliases: ["nikal"],
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
     if (!message.member.hasPermission("MANAGE_SERVER")) {
       return;
     }
let prefix = client.settings.get(message.guild.id, `prefix`);
      
      if (prefix === null) prefix = '=';

if(message.channel.name.includes('ticket-')) {
			message.channel.delete();
		}
		else {
			return message.reply('you cannot use this command here. Please use this command when you want to delete a ticket.');
		}

}
}
