const db = require("quick.db");
const sourcebin = require('sourcebin_js');
const Discord = require("discord.js");
const config = require(`../../botconfig/config.json`);
module.exports = {
  name: "remove-ticket",
  category: "🎫 Ticket",
  description: "Remove a person from a ticket",
    usage: "remove <mention/user_dev_ID>",
  aliases: [],
  run: async(client, message, args, data, db) => {
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
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`Incorrect Usage! Correct Usage:${prefix}remove <member>`);
			}
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: false,
					SEND_MESSAGES: false,
					ATTACH_FILES: false,
					READ_MESSAGE_HISTORY: false,
				}).then(() => {
					message.channel.send(`Successfully removed ${member} from ${message.channel}`);
				});
			}
			catch(e) {
				return message.channel.send('An error occurred, please try again!');
			}
		}

}
}
