const { MessageEmbed } = require('discord.js')
const config = require(`../../botconfig/config.json`);
const db = require('quick.db')

module.exports = {
    name: 'disable-welcome',
    category: `📲 welcome_leave`,
    description: "Disables the Welcome Feature",
    usage: "[prefix]disablewelcome",
    alises: [],
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
                const disablewelcomeError = new MessageEmbed()
                .setDescription(`You don\'t have permissions to set welcome channel`)
                .setColor("RANDOM")
                return message.channel.send(disablewelcomeError)
            }                 
        }
        let guildConfig = db.get(`guildConfigurations_${message.guild.id}.welcome`)
        if(guildConfig === null) guildConfig = 'disabled'
        if(guildConfig === 'disabled') {
            const disablewelcomeError2 = new MessageEmbed()
            .setDescription(`It is already disabled.`)
            .setColor("RANDOM")
            return message.channel.send(disablewelcomeError2)
        }
        db.set(`guildConfigurations_${message.guild.id}.welcome`, 'disabled')
        const embed = new MessageEmbed()
        .setAuthor(`Welcome Feature has been disabled`)
        .setDescription(`Use set-welcome command to turn this feature on`)
        .setColor("RANDOM")

        message.channel.send(embed)
    }
}