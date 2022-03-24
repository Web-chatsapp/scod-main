const {
  MessageEmbed
} = require(`discord.js`);
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `removedj`,
  aliases: [`deletedj`],
  category: `⚙️ Settings`,
  description: `Let's you DELETE a DJ ROLE`,
  usage: `removedj @ROLE`,
  memberpermissions: [`ADMINISTRATOR`],
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
      let role = message.mentions.roles.first();
    
      if (!role)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please add a Role via ping, @role!`)
        );
  
      try {
        message.guild.roles.cache.get(role.id);
      } catch {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | It seems that the Role does not exist in this Server!`)
        );
      }

      if (!client.settings.get(message.guild.id, `djroles`).includes(role.id))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | This Role is already a DJ-ROLE!`)
        );

      client.settings.remove(message.guild.id, role.id, `djroles`);
     
      let leftb = ``;
      if (client.settings.get(message.guild.id, `djroles`).join(``) === ``) leftb = `no Dj Roles, aka All Users are Djs`
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
          leftb += `<@&` + client.settings.get(message.guild.id, `djroles`)[i] + `> | `
        }
   
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | Removed the DJ ROLE \`${role.name}\``)
        .setDescription(`All left Dj Roles:\n> ${leftb.substr(0, leftb.length - 3)}`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};
