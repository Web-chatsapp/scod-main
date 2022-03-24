const { Client, Message, MessageEmbed } = require('discord.js');
const config = require(`../../botconfig/config.json`);
const db = require("quick.db");

module.exports = {
    name: "avatar",
    aliases: ['av', 'pfp', 'pic'],
    category: "🔰 Info",
    description: "Get your own or someone else's avatar",
    usage: "[user mention]",
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


        const user = message.mentions.users.first() || message.author

        let av = new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.username)
            .setTitle(`Here is Avatar of ${user.tag}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription(`:frame_photo: [PNG](${user.avatarURL({ format: "png" })}) | :frame_photo: [JPG](${user.avatarURL({ format: "jpg" })}) | :frame_photo: [WEBP](${user.avatarURL({ format: 'webp' })}) |` + '\nYour PFP is Op :blush:')

        message.channel.send(av)

    }
}