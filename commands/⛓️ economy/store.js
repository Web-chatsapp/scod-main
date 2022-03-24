const { MessageEmbed } = require('discord.js');
const { default_prefix } = require('../../botconfig/config.json');
const db = require('quick.db');
const config = require(`../../botconfig/config.json`);

module.exports = {
   
        name: "shop",
        noalias: [""],
        category: "⛓️ economy",
        description: "Shows list of items",
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

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);
let g = [1 , 2, 3, 4, null]
        if (fetched === null) {
            prefix = default_prefix
        } else {
            prefix = fetched
        }
 

     let embed = new MessageEmbed()
            .setDescription(`** SHOP: **\n PadLock: \`500$\`\n you can use padlock to keep your wallet safe [${prefix}buy/${prefix}sell PadLock]\n\n LapTop: \`800$\`
 you can use laptop to earn some money online 💰
[${prefix}buy/${prefix}sell Laptop] \n\nFishing Rod: \`1600$\` 
 you can buy some fish and earn some money. 
[${prefix}buy/${prefix}sell Fishing Rod]\n\nHunting Rifle: \`2000$\`
 with hunting rifle you can catch some animal and earn money . [${prefix}buy/${prefix}sell Hunting Rifle]\n\nBank Note: \`2600$\`
 you can increase storage of your bank to 100 to 5000. [${prefix}buy/${prefix}sell Bank Note]
 `)
            .setColor("BLUE")
        .setFooter(`Requested By ${message.author.username}`)
        message.channel.send(embed)
      if(args[0] === "2"){
        
        }
    }
}