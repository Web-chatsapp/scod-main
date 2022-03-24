const { Client, Message, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');
const { prefix } = require('../..');
const config = require(`../../botconfig/config.json`);
const db = require("quick.db");


module.exports = {
    name: "translate",
    aliases: ['ts'],
    category: "🔰 Info",
    description: "google translate",
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

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

            const query = args.slice(1).join(" ");
            if (!query) return message.reply(`Dont leave this blank! Try this: \`${prefix}translate id Hello! I'm Altmr!\``)
            const arg = args[0]

            const translated = await translate(query, { to: `${arg}` });
            const embed = new MessageEmbed()
                .setTitle("Translated!")
                .addField("Your Query", `\`\`\`fix\n${query}\`\`\``)
                .addField('Selected Language', `\`\`\`fix\n${arg}\`\`\``)
                .addField('Result', `\`\`\`fix\n${translated.text}\`\`\``)
                .setFooter(`© ${client.user.username}`)
                .setColor("#d4c5a2")
            message.channel.send(embed)

        } catch (error) {
            return message.channel.send(`Your question is invalid! Try this: \`${prefix}translate <language> <query>\``)
                .then(() => console.log(error));
        }

    }
}