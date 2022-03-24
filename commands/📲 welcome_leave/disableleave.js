const { MessageEmbed } = require('discord.js')
const config = require(`../../botconfig/config.json`);
const db = require('quick.db')

module.exports = {
    name: 'disable-leave',
    category: "📲 welcome_leave",
    description: "disable leave channel",
    usage: "[prefix]disableleave <#channel>",
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

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            if(!message.author.id === message.guild.ownerID){
                const setleaveError = new MessageEmbed()
                .setDescription(`You don\'t have permissions to disable leave message`)
                .setColor("BLUE")
                return message.channel.send(setleaveError)
            }                 
        }
      
      db.delete(`leavechannel_${message.guild.id}`)


        const embed = new MessageEmbed()
          .setAuthor(`Leave Feature has been disabled successfully`)
        .setDescription(`Use set-leave command to turn this feature on`)
        .setColor("BLUE")

        message.channel.send(embed)

    }
}