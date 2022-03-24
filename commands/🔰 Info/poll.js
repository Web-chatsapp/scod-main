const Discord = module.require("discord.js");
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);

module.exports = {
  name: "poll",
   category: "🔰 Info",
  description: "Start a Poll",
  userPerms: ["MANAGE_SERVER"],
  run: async (client, message, args) => {
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

    const pll = args.join(" ");
    if (!message.member.hasPermission("MANAGE_SERVER")) {
 message.lineReply("You don't have enough Permissions");
    }
    if (!pll) {
      return message.channel.send("Enter some text for the Poll");
    }
    let embed = new Discord.MessageEmbed()
      .setTitle("Poll Time")
      .setDescription(`${pll}`)
      .setFooter(`Started by ${message.author.username}`)
      .setColor("RANDOM");
    message.channel
      .send(embed)
      .then(function (message, str) {
        message.react("👍");
        message.react("👎");
      })
      .catch(function () {});
  },
};