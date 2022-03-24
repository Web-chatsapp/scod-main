const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require(`../../botconfig/config.json`);

module.exports = {
  
        name: "leaderboard",
        aliases: ['lb','rich','leaderboard'],
        category: '⛓️ economy',
        description: 'Shows Server\'s Top 10 Users of Economy Leaderboard',
        usage: ' ',
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
      const checkingBlacklistedMembers = db.fetch(`blacklisted_${message.author.id}`)
    if (checkingBlacklistedMembers === null) {
        checkingBlacklistedMembers === false
    }

    if (checkingBlacklistedMembers === true) return message.lineReply(`You have been blacklisted from my commands. If you wish to appeal, please DM [**${ config.DMtoUnbanID}**] for more info.`);

      const checkingMaintenance = db.fetch(`maintenance`)
    if (checkingMaintenance === null) {
        checkingMaintenance === false
    }

    if (checkingMaintenance === true) return message.lineReply(`Maintenance mode is on so u can't use the bot right now, Try it again later \:)`);

        let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
        if (!money.length) {
            let noEmbed = new MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setColor("GREEN")
                .setFooter("Nothing To See Here Yet!")
            return message.channel.send(noEmbed)
        };

        money.length = 10;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            finalLb += `**${money.indexOf(money[i]) + 1}. ${bot.users.cache.get(money[i].ID.split('_')[1]) ? bot.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - ${money[i].data} :dollar:\n`;
        };

        const embed = new MessageEmbed()
            .setTitle(`Leaderboard Of ${message.guild.name}`)
            .setColor("GREEN")
            .setDescription(finalLb)
            .setFooter(bot.user.tag, bot.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }
};