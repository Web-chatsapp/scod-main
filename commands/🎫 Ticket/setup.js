const db = require("quick.db");
const sourcebin = require('sourcebin_js');
const Discord = require("discord.js");
const config = require(`../../botconfig/config.json`);
module.exports = {
  name: "setup-tickets",
  category: "🎫 Ticket",
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
    const log = message.guild.channels.cache.find(log => log.name === "ticket-box")
  if(log)
  {
    return message.reply("You already have setuped the ticket box")
  }
 let prefix = client.settings.get(message.guild.id, `prefix`);
      
      if (prefix === null) prefix = '=';

message.guild.channels.create(`ticket-box`, {
			permissionOverwrites: [
				
			
				{
					id: message.guild.roles.everyone,
					allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
				},
			],
			type: 'text',
		}).then(async channel => {
      const embed = new Discord.MessageEmbed()
      .setTitle(`Ticket Box`)
      .setDescription(`Do \`${prefix}new-ticket\` for creating a ticket`)
      channel.send(embed);
      let vc1 = "600";
 channel.setRateLimitPerUser(vc1, `Responsible - ${message.member}`);
 db.set(`setuped_${message.guild.id}`, channel.id);
    })
    message.reply("Done now i will only accept ticket messages from ticket-box channel")
  }}