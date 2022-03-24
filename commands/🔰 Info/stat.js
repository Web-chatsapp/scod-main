const db = require("quick.db");
const config = require(`../../botconfig/config.json`);
const Discord = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {

  name: "botinfo",

  category: "🔰 Info",
    aliases: ['botstats', 'stats'],
    description: 'Check\'s bot\'s status',
  run: async (client, message, args, del, member) => {
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

   message.delete();
   let connectedchannelsamount = 0;
            let guilds = client.guilds.cache.map((guild) => guild);
            for (let i = 0; i < guilds.length; i++) {
                if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
            }
            message.channel.startTyping(3);
     message.channel.stopTyping(1)
     setTimeout(function(){ 
      message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Scod v${version}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField('❖〢Developer', '[Ashton#4218](https://discord.gg/users/849359686855950375)', true)
            .addField('❖〢Uptime', `${ms(client.uptime)}`, true)
            .addField('❖〢WebSocket Ping', `${client.ws.ping}ms`, true)
            .addField('❖〢Memory', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField('❖〢Guild Count', `${client.guilds.cache.size} guilds`, true)
            .addField(`❖〢User Count`, `${client.users.cache.size} users`, true)
            .addField("❖〢Voice-Channels", `${client.channels.cache.filter((ch) => ch.type === "voice").size}`, true)
                .addField("❖〢Connected Channels", `${connectedchannelsamount}`, true)
            .addField('❖〢Commands', `${client.commands.size} cmds`,true)
            .addField('❖〢Node', `${process.version} on ${process.platform} ${process.arch}`, true)
            .addField('❖〢Cached Data', `${client.users.cache.size} users\n${client.emojis.cache.size} emojis`, true)
            .addField('❖〢Discord.js', `${discordjsVersion}`, true)
            .setTimestamp()
                           .setFooter(`Requested by ${message.author.tag}`)
        );
        }, 950);
    }
}
