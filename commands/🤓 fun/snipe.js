const Discord = require('discord.js')

module.exports = {
    name: "snipe",
    category: "🤓 fun",
    aliases: ["snipe"],

run: async (client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
        if(!msg) return message.lineReply("<a:wrong:952628851266166804> There is nothing to snipe");
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setDescription(`🚮 Message sent by **${msg.author}** deleted in <#${message.channel.id}> \n**__Content:__**\n${msg.content}`)
    .setFooter('Sniped')
    .setColor("GREEN")
    .setTimestamp();
    return message.channel.send(embed); 
}
}