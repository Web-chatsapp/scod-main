const Discord = require("discord.js");

module.exports = {
  name: "announce",
  category: "🚫 Admin",
  description: "Make an Announcemnet in your Server",
  userPerms: ["MANAGE_MESSAGES"],
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  run: async (client, message, args) => {
if (!message.member.permissions.has('MANAGE_SERVER')) { return message.channel.send("Permission required `MANAGE_SERVER` for you"); }

    if (!message.guild.me.hasPermission('MANAGE_SERVER')) { return message.channel.send("Permission required `MANAGE_SERVER` for me"); }
    
    const anchannel = message.mentions.channels.first();
    if (!anchannel) {
      return message.channel.send("`Usage: =announce <channel> <msg>`");
    }
    if (!args.slice(1).join(" ")) {
      return message.channel.send(
        "Please add some text to make an Announcement"
      );
    }

    let embed = new Discord.MessageEmbed()
      .setTitle(`<:FC_ann:953173591573270578> New Server Announcement`)
      .setDescription(args.slice(1).join(" "), {
        allowedMentions: { parse: ["users"] },
      })
      .setColor("RANDOM")
      .setFooter(`Announcement by ${message.author.username}`);
    anchannel.send(embed);

    let anembed = new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`Announcement has been sent to ${anchannel}`)
      .setColor("RANDOM");

    message.channel.send(anembed);
    message.delete();
  },
};