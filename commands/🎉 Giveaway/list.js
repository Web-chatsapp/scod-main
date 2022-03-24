  const ms = require('ms');
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);

module.exports = {
  name: "list",
  category: "🎉 Giveaway",
  description: "It will list Giveaways of the guild",
    usage: "glist",
  aliases: ["glist", "gl"],
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

  const Discord = require("discord.js");
    let giveaways = []
    const giveaways1 = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id)
    const giveaways2 = giveaways1.filter((g) => !g.ended)
    const giveaways3 = giveaways2.forEach((thisGiveaway)=>{
        let winners = ''
        if(thisGiveaway.winnerCount == 1){
            winners = 'winner'
        }else{
            winners = 'winners'
        }
        giveaways.push(`\`${thisGiveaway.messageID}\` | <#${thisGiveaway.channelID}> | **${thisGiveaway.winnerCount}** ${winners} | Prize: **${thisGiveaway.prize}** | [Giveaway Link](https://discord.com/channels/${message.guild.id}/${thisGiveaway.channelID}/${thisGiveaway.messageID})`)
    })
    const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColor)
    .setTitle('Current Giveaways')
    .setDescription(giveaways.join('\n') || 'No giveaways are currently running')
    message.channel.send(embed)
    }
    }
