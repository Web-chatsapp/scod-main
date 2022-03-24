const { MessageEmbed } = require('discord.js');

const db = require("quick.db")

module.exports = {
  name: "chatbot-disable",
  category: "🤖ChatBot",
  usage: "chatbot-disable <#channel>",
  description: " disable chatbot channel",
  run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            if(!message.author.id === message.guild.ownerID){
                const dischError = new MessageEmbed()
                .setDescription(`You don\'t have permissions to disable chatbot channel`)
                .setColor("RANDOM")
                return message.channel.send(dischError)
            }                 
        }
        const mentionedChannel = message.mentions.channels.first()
        if(!mentionedChannel) { 
            const chError = new MessageEmbed()
            .setDescription(`Please Mention a channel first.`)
            .setColor('RANDOM')
            return message.channel.send(chError)
        }
        const mentionedChannelId = mentionedChannel.id

        db.delete(`scodchatbotch_${message.guild.id}`, `${mentionedChannelId}`)
        db.delete(`guildConfigurations_${message.guild.id}.chatbot`, 'disable')

        const embed = new MessageEmbed()
        .setAuthor('Chatbot channel has been Disabled')
        .setDescription(`Successfully disable **Scod** chatbot Channel ${mentionedChannel}.`)
        .setFooter(`(Use \`chatbot-enable\` to turn on chatbot feature)`)
        .setColor("RANDOM")

        message.channel.send(embed)

    }
}