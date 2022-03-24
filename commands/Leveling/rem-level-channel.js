const { MessageEmbed } = require('discord.js');

const db = require("quick.db")

module.exports = {
  name: "level-setup-disable",
  category: "Leveling",
  usage: "[prefix]level-setup-disable <#channel>",
  description: " disable leveling channel",
  aliases: ["lsd", "lvl-sp-dis"],
  run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            if(!message.author.id === message.guild.ownerID){
                const dischError = new MessageEmbed()
                .setDescription(`You don\'t have permissions to disable leveling channel`)
                .setColor("BLUE")
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

        db.delete(`scodlvlch_${message.guild.id}`, `${mentionedChannelId}`)
        db.delete(`guildLevelConfig_${message.guild.id}.levels`, 'disable')

        const embed = new MessageEmbed()
        .setAuthor('Leveling channel has been Disabled')
        .setDescription(`Successfully disable **Scod** Leveling Channel ${mentionedChannel}.`)
        .setFooter(`(Use \`level-setup-enable\` to turn on leveling feature)`)
        .setColor("BLUE")

        message.channel.send(embed)

    }
}