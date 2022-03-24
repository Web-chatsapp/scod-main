const db = require("quick.db");
const sourcebin = require('sourcebin_js');
const Discord = require("discord.js");
const config = require(`../../botconfig/config.json`);
module.exports = {
  name: "open-ticket",
  category: "🎫 Ticket",
  description: "Re-open a ticket",
    usage: "open",
  aliases: ["re-open"],
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
    
    let prefix = client.settings.get(message.guild.id, `prefix`);
      
      if (prefix === null) prefix = '=';

if (message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			try {
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				})
					.then(() => {
						message.channel.send(`Successfully re-opened ${message.channel}`);
					});
			}
			catch (e) {
				return message.channel.send('An error occurred, please try again!');
			}
		}
		else {
			return message.reply(
				'you cannot use this command here. Please use this command on a closed ticket.',
			);
		}

}
}
