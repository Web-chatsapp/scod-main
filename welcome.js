const { Client, MessageAttachment } = require("discord.js")
const db = require('quick.db')
const canvacord = require('canvacord')
const Canva = require('discord-canvas')

module.exports = (client) => {
    client.on('guildMemberAdd', (member) => {
        
        let guildConfig = db.get(`guildConfigurations_${member.guild.id}.welcome`)
        const channelId = db.get(`Welcome_Channel_${member.guild.id}`)
        if(channelId === null) return;
        if(guildConfig === null) guildConfig = 'disabled'
        if(guildConfig === 'disabled') return;

        const welcomeImage = new canvacord.Welcomer()
            .setUsername(member.user.username)
            .setMemberCount(member.guild.memberCount)
            .setDiscriminator(member.user.discriminator)
            .setAvatar(member.user.displayAvatarURL({dynamic: false, format: 'png'}))
            .setGuildName(member.guild.name)
            .setText('message', `Welcome to ${member.guild.name}. Hope you enjoy your stay 😊`)
        welcomeImage.build().then(data => {
            const welcome = new MessageAttachment(data, 'Welcome.png')
            channel.send(welcome)
        })
        
        const channel = member.guild.channels.cache.get(channelId)
        
        channel.send(`Heya <@${member.id}> <a:welcome1:952634465430147122><a:welcome2:952634486183559169> to **${member.guild.name}**`)
        member.send(`hey welcome to **${member.guild.name}**`)
        member.send(`and don't forget to join our support server: https://discord.gg/3GNKAsaxg5`)
    })
}