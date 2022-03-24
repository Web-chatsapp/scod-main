const { MessageEmbed } = require('discord.js')
const config = require(`../../botconfig/config.json`);
const db = require('quick.db')

module.exports = {
    name: 'set-welcome',
    category: "📲 welcome_leave",
    description: "Sets welcome channel",
    usage: "[prefix]setwelcome <#channel>",
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
                const setwelcomeError = new MessageEmbed()
                .setDescription(`You don\'t have permissions to set welcome channel`)
                .setColor("RANDOM")
                return message.channel.send(setwelcomeError)
            }                 
        }
        const mentionedChannel = message.mentions.channels.first()
        if(!mentionedChannel) { 
            const welcomeError = new MessageEmbed()
            .setDescription(`Please Mention a channel where the Welcome messages will be sent.`)
            .setColor('RANDOM')
            return message.channel.send(welcomeError)
        }
        const mentionedChannelId = mentionedChannel.id

        db.set(`Welcome_Channel_${message.guild.id}`, `${mentionedChannelId}`)
        db.set(`guildConfigurations_${message.guild.id}.welcome`, 'enabled')

        const embed = new MessageEmbed()
        .setAuthor('Welcome Feature has been Enabled')
        .setDescription(`Successfully set ${mentionedChannel} as Welcome Channel.`)
        .setFooter(`(Use \`disable-welcome\` to turn off welcome feature)`)
        .setColor("RANDOM")

        message.channel.send(embed)

    }
}