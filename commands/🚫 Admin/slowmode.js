const Discord = require('discord.js');
const db = require ("quick.db");

module.exports = {
  name: "slowmode",
  category: "🚫 Admin",
  description: "Lets you set slowmode on the channel.",
  usage: "<prefix>slowmode <amout><time>",
  run: async (client, message, args) => {

    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("**you Don't Have Permissions To Do it**");

    if(args[0] === "off") {
     return message.channel.setRateLimitPerUser(0).then( message.lineReply("<a:thumbsupA:952633951279783946> Done i have removed slowmode from this channel"))
    }

    const amount = parseInt(args[0]);
    if (!message.guild.me.permissions.has("MANAGE_SERVER")) return message.channel.send("**I Don't Have Permissions To Do it**")
      if (isNaN(amount))
        return message.channel.send(" It doesn't seem to be valid number");
    if (args[0] === amount + "s") {
       if (amount > 21600) {
        message.channel.send("you cannot set slowmode more than **21600 seconds**");
        return;
      }
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send("slowmode is now " + amount + " seconds");
        return;
      } else {
        message.channel.send("slowmode is now " + amount + " second");
        return;
      }
    }
    
    if (args[0] === amount + "m") {
      if (amount > 360) {
        message.channel.send("you cannot set slowmode more than **360 minutes**");
        return;
      }
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send("slowmode is now " + amount + " minutes");
        return;
      } else {
        message.channel.send("slowmode is now " + amount + " minute");

        return;
      }
    }
    if (args[0] === amount + "h") {
      if (amount > 6) {
        message.channel.send("you cannot set slowmode more than **6 hours**");
        return;
      }
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send("slowmode is now " + amount + " hours");
        return;
      } else {
        message.channel.send("slowmode is now " + amount + " hour");
        return;
      }
    } else {
      message.channel.send(
        "You can only set seconds(s), minutes(m) and hours(h)"
      );
    }
  }
};
