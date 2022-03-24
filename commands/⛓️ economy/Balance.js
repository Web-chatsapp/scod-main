const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);

module.exports = {
    name: "balance",
    aliases: ["bal"],
    category: "⛓️ economy",
    description: "Shows Current Balance",
    usage: "[username | nickname | mention | ID](optional)",
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

    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}`);

    if (bank === null) bank = 0;
let Total = bal + bank
    if (user) {
      let moneyEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `**${user.user.username}'s Balance**\n**Cash:** ${bal}$\n**Bank:** ${bank}\n**Total:** ${Total}`
        );
      message.channel.send(moneyEmbed);
    } else {
      return message.channel.send("**Enter A Valid User!**");
    }
  }
};