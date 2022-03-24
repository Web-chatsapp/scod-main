const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'level-setup-enable',
    category: "Leveling",
    description: "Sets leveling channel",
    usage: "[prefix]level-setup-enable <#channel>",
    aliases: ["lse", "lvl-sp-enb"],
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            if(!message.author.id === message.guild.ownerID){
                const setchError = new MessageEmbed()
                .setDescription(`You don\'t have permissions to set levels channel`)
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

        db.set(`scodlvlch_${message.guild.id}`, `${mentionedChannelId}`)
        db.set(`guildLevelConfig_${message.guild.id}.levels`, 'enabled')

        const embed = new MessageEmbed()
        .setAuthor('leveling channel has been Enabled')
        .setDescription(`Successfully set ${mentionedChannel} as Scod leveling Channel.`)
        .setFooter(`(Use \`level-setup-disable\` to turn off leveling feature)`)
        .setColor("BLUE")

        message.channel.send(embed)

    }
}