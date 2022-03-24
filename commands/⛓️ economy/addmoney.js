const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);

module.exports = {
   
        name: "addmoney",
        aliases: ["am"],
        category: "⛓️ economy",
        description: "Adds Money to a user",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
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

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("❌ You Do Not Have Permissions To Add Money! - [ADMINISTRATOR]");
        if (!args[0]) return message.channel.send("**Please Enter A User!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Enter A Valid User!**")
        if (!args[1]) return message.channel.send("**Please Enter A Amount!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ Your Amount Is Not A Number!**`);
        if (args[0] > 10000) return message.channel.send("**Cannot Add That Much Amount!**")
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Added ${args[1]} coins\n\nNew Balance: ${bal}`);
        message.channel.send(moneyEmbed)

    }
}