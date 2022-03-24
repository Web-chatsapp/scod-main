const { MessageEmbed } = require('discord.js')
const config = require(`../../botconfig/config.json`);
const db = require('quick.db')

module.exports = {
    name: 'set-leave',
    category: "📲 welcome_leave",
    description: "Sets leave channel",
    usage: "[prefix]setleave <#channel>",
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
                .setDescription(`You don\'t have permissions to set leave channel`)
                .setColor("RANDOM")
                return message.channel.send(setleaveError)
            }                 
        }
        const mentionedChannel = message.mentions.channels.first()
        if(!mentionedChannel) { 
            const leaveError = new MessageEmbed()
            .setDescription(`Please Mention a channel where the leave messages will be sent.`)
            .setColor('RANDOM')
            return message.channel.send(leaveError)
        }
        const mentionedChannelId = mentionedChannel.id

        db.set(`leavechannel_${message.guild.id}`, `${mentionedChannelId}`)

      db.set(`guildConfigurations_${message.guild.id}.leave`, 'enabled')
      
        const embed = new MessageEmbed()
        .setAuthor('leave Feature has been Enabled')
        .setDescription(`Successfully set ${mentionedChannel} as leave Channel.`)
        .setColor("RANDOM")

        message.channel.send(embed)

    }
}