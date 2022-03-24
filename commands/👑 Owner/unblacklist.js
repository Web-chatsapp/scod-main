const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'unblacklist',
    description: 'Unblacklists a user',
    usage: 'unblacklist <user>',
    category: '👑 Owner',

    run: async(client, message, args) => {
        if (message.author.id === "849359686855950375") {
            let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
            let noUser = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor("RED")
                .setDescription('Please provide a valid user')
                .addField("Usage:", '`unblacklist <user> `')
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            if (!User) return message.channel.send(noUser)

            let checkingBlacklisted = db.has(`blacklisted_${User.id}`)

            db.delete(`blacklisted_${User.id}`, false)
            let blacklistedEmbed = new Discord.MessageEmbed()
                .setDescription('I have unblacklisted **' + User + '**')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor("green")
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            message.channel.send(blacklistedEmbed)
            if(checkingBlacklisted === false){
                let alreadyBlacklisted = new Discord.MessageEmbed()
                .setDescription('This user is already unblacklisted!')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor("red")
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            return message.channel.send(alreadyBlacklisted)
            }
            
        } else {
            let cannotUse = new Discord.MessageEmbed()
                .setDescription('You cannot use this command. Only **OWNERS** can use this.')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor('red')
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(cannotUse)
        }
    }
}