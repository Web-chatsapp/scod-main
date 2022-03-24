const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require("discord-reply");
const db = require('quick.db')
const config = require(`../../botconfig/config.json`);

module.exports = {
    name: 'afk',
    aliases: [''],
    category: '🔰 Info',
    memberpermissions: ["SEND_MESSAGES"],
    cooldown: '5',
    description: 'Put User in AFK for all servers',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
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

      
        const reason = args.join(" ") || 'No reason!';

        db.set(message.author.id, [Date.now(), reason]);

        message.lineReply(
            new MessageEmbed()
              .setDescription(`<:afk:952633076327018556> You have been set as AFK. \`${reason}\``)
               .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
              .setTimestamp()
              .setColor(`BLUE`)
        )
          message.member.setNickname(`${message.author.username} [AFK]`)
   .catch((error) => console.log("Couldn't update " +message.author.tag+"'s nickname in server id " +message.guild.id +" server name " +message.guild.name));

    }
}