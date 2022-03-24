const Discord = require('discord.js');
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);
module.exports = {
  name: "messages",
  category: "🔰 Info",
  description: "it will count how much messages u have send in this server",
    usage: "messages",
  aliases: ["msgs"],
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

let user = message.mentions.users.first() || message.author;

 let messagefetch = db.fetch(`messages_${message.guild.id}_${user.id}`)
    let levelfetch = db.fetch(`level_${message.guild.id}_${user.id}`)

    if(messagefetch == null) messagefetch = '0';
    if(levelfetch == null) levelfetch = '0';

    const embed = new Discord.MessageEmbed()
    .setDescription(`${user}, You Are Level: \`${levelfetch}\` & Have Sent: \`${messagefetch}\` Messages`)
.setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    message.lineReply(embed)


  }
}
