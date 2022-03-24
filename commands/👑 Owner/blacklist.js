const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'blacklist',
    description: 'Blacklists a user',
    usage: 'blacklist <user>',
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
                .addField("Usage:", '`blacklist <user> `')
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            if (!User) return message.channel.send(noUser)

            let checkingBlacklisted = db.fetch(`blacklisted_${User.id}`)

            db.set(`blacklisted_${User.id}`, true)
            let blacklistedEmbed = new Discord.MessageEmbed()
                .setDescription('I have blacklisted **' + User + '**')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor("green")
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            message.channel.send(blacklistedEmbed)
            if(checkingBlacklisted === true){
                let alreadyBlacklisted = new Discord.MessageEmbed()
                .setDescription('This user is already blacklisted!')
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