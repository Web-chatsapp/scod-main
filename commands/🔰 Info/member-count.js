const { MessageEmbed, Discord } = require('discord.js');
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);

module.exports = {
    name: 'membercount',
    category: "🔰 Info",
    aliases: ["mc"],
    description: 'Use this command to get the guild"s member information.',
    usage: "membercount",
    run: async (client, message, args, funcs) => {

        try {
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

            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Server Member Info')
                .setDescription(` Total Members - ${message.guild.memberCount}`)
            message.channel.send(embed);
        } catch (e) {
            console.error;
            message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
        }

    }
}