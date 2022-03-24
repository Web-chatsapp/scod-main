const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bans',
    category: "🚫 Admin",
    aliases: ['fetchbans'],
    description: 'Show Banned Users In A Guild',
    usage: '',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.lineReply("**you don't have permission**");

        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans)
            .map((member) => `\`${member.user.tag}\``)
            .join("\n");

        message.channel.send(
            new MessageEmbed()
                .setTitle(`List of banned users!`)
                .setDescription(bannedMembers || `no banned user found`)
                .setColor('BLUE')
        )
    }
}