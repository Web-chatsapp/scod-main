const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json')


module.exports = {
    name: 'delchannel',
    category: "🚫 Admin",
    aliases: ['delch', 'deletechannel'],
    description: 'Delete Channels From your Server',
    usage: 'createchat <name>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            return message.channel.send("You don't have enough Permissions")
        }
        const fetchedChannel = message.mentions.channels.first();
        if (!fetchedChannel) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setAuthor(message.author.tag)
                    .setTitle(`Usage: ${config.prefix}delchannel <channel>`)
            )
        }
        fetchedChannel.delete()

        const embed = new MessageEmbed()
            .setTitle(`Channel ${fetchedChannel} has been deleted`)
            .setAuthor(message.author.tag)
            .setColor("BLUE")

        await message.channel.send(embed);
    }
}