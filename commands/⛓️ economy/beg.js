const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const config = require(`../../botconfig/config.json`);

module.exports = {
 
        name: "beg",
        noalias: [""],
        category: "⛓️ economy",
        description: "Beg for money",
        usage: " ",
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

        let user = message.author;

        let timeout = 120000;
        let amount = 20;

        let beg = await db.fetch(`beg_${user.id}`);

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You've begged and received ${amount} coins`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.add(`begs_${user.id}`, 1)
            db.set(`beg_${user.id}`, Date.now())


        }
    }
};