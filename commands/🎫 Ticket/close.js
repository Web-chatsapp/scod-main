const db = require("quick.db");
const config = require(`../../botconfig/config.json`);
const sourcebin = require('sourcebin_js');
const Discord = require("discord.js");
module.exports = {
  name: "close-ticket",
  category: "🎫 Ticket",
  description: "It will close the ticket ticket",
    usage: "close",
  aliases: [],
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

if(message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(message.member.hasPermission('ADMINISTRATOR') || message.channel.name === `ticket-${message.author.id}`) {
				message.channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: ' ',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Chat transcript for ${message.channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('An error occurred, please try again!');
					}

					const embed = new Discord.MessageEmbed()
						.setDescription(`[\`📄 View\`](${response.url})`)
						.setColor('GREEN');
					member.send('Here is a transcript of your ticket, please click the link below to view the transcript', embed);
				}).then(() => {
					try {
						message.channel.updateOverwrite(member.user, {
							VIEW_CHANNEL: false,
							SEND_MESSAGES: false,
							ATTACH_FILES: false,
							READ_MESSAGE_HISTORY: false,
						}).then(() => {
							message.channel.send(`Successfully closed ${message.channel}`);
						});
					}
					catch(e) {
						return message.channel.send('An error occurred, please try again!');
					}
				});
			}
		}
		else {
			return message.reply('you cannot use this command here. Please use this command when you\'re closing a ticket.');
		}

}
}
