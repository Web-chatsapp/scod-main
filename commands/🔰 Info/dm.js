const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);

module.exports = {
    name: 'dm',
    category: "🔰 Info",
    aliases: ['senddm'],
    description: 'DM the mentioned user',
    usage: 'dm [message]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
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

        let msg = args.slice(1).join(' ');
        let user = message.mentions.users.first() || message.client.users.cache.get(args[0])
        if (!user) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription('You must mention someone or provide a valid UserID for me to dm them.')
             
        )

        if (msg.length < 1) msg = 'Blank message. . .';

        const embed = new MessageEmbed()
            .setColor(Math.floor(Math.random() * 16777215))
            .setTimestamp()
            .setTitle(`You have a new message from ${message.author.username}!`)
            .setAuthor(message.author.tag)
            .setThumbnail(user.displayAvatarURL())
            .addField('Remember:', `Do not reply to me because ${message.author.username} will not recieve the reply, take your stuff to their dms instead :)`)
            .addField(`${message.author.username}'s message:`, msg)
            
        user.send(embed).catch(e => {
            if (e) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor("RED")
                        .setAuthor(user.tag)
                        .setDescription("That user unfortunately locked their DMs")
                        
                )
            } else {
                message.channel.send(
                    new MessageEmbed()
                        .setColor("RED")
                        .setAuthor(user.tag)
                        .setDescription("Successfully sent your message").then(message =>  message.delete(3000))
                        
                )
            }
        });
    }
}