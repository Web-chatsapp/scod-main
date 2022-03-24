const { Client, Message, MessageEmbed } = require('discord.js');
let ownerid = "849359686855950375";
let ownerid2 = "849359686855950375"


module.exports = {
    name: 'leaveserver',
    category: '👑 Owner',
    aliases: ['lvs'],
    description: 'bot can leave server by this command',
    useage: '',
    accessableby: "",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        if (message.author.id === ownerid || ownerid2) {

        const guildId = args[0];

        if (!guildId) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription("**Please Provide an Guild ID **")
                
        ).then((msg => {
            msg.delete({ timeout: 10000 })
        }))

        const guild = client.guilds.cache.find((g) => g.id === guildId)

        if (!guild) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription("** This Guild Not Found .. **")
               
        ).then((msg => {
            msg.delete({ timeout: 10000 })
        }))
        let leaved = await guild.leave()
        if (leaved) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor("RED")
                    .setAuthor(message.author.tag)
                    .setDescription(`Successfully left guild: **${guild.name}**`)
               
            )
        } 
        else {
            message.channel.send('i cant do....')
        }

        }else {
          message.channel.send('only owner can run this cmd')
        }

    }
}