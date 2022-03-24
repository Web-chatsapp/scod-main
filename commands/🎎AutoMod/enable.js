/*const Discord = require("discord.js");
const config = require(`../../botconfig/config.json`);
const db = require("quick.db");
module.exports = {
  name: "anti-badwords",
  category: "🎎AutoMod",
  aliases: ["antibadwords", "antiwords"],
  run: async(client, message, args) => {
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
if(!message.member.hasPermission('ADMINISTRATOR')) return;
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) {return message.channel.send('I do not have permission to delete messages.')
        }
        if(db.has(`swear-${message.guild.id}`) === false) {
            await db.set(`swear-${message.guild.id}`, true)
            message.channel.send('AntiBadwords has been turned on!')

        } else {
          await db.delete(`swear-${message.guild.id}`)
           return message.channel.send('AntiBadwords has been turned off!')
        }
  }
}*/