const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'chatbot-enable',
    category: "🤖ChatBot",
    description: "Sets chabot channel",
    usage: "[prefix]chatbot-enable <#channel>",
    aliases: [],
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            if(!message.author.id === message.guild.ownerID){
                const setchError = new MessageEmbed()
                .setDescription(`You don\'t have permissions to set chatbot channel`)
                .setColor("BLUE")
                return message.channel.send(setchError)
            }                 
        }
        const mentionedChannel = message.mentions.channels.first()
        if(!mentionedChannel) { 
            const chError = new MessageEmbed()
            .setDescription(`Please Mention a channel first.`)
            .setColor('BLUE')
            return message.channel.send(chError)
        }
        const mentionedChannelId = mentionedChannel.id

        db.set(`scodchatbotch_${message.guild.id}`, `${mentionedChannelId}`)
        db.set(`guildConfigurations_${message.guild.id}.chatbot`, 'enabled')

        const embed = new MessageEmbed()
        .setAuthor('Chatbot channel has been Enabled')
        .setDescription(`Successfully set ${mentionedChannel} as Scod chatbot Channel.`)
        .setFooter(`(Use \`chatbot-disable\` to turn off chatbot feature)`)
        .setColor("BLUE")

        message.channel.send(embed)

    }
}