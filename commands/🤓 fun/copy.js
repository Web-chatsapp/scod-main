const discord = require("discord.js");
const config = require("../../botconfig/config.json");
const db = require("quick.db");
module.exports = {
  name: "copy",
  description: "Makes a webhook to impersonate someone",
  category: "🤓 fun",
  args: true,
  botpermission: ["MANAGE_WEBHOOKS"],
  usage: 'copy <@mention> <text to be said>',
  run: async (client, message, args, prefix) => {
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
      if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
       return message.lineReply("<a:wrong:952628851266166804> I don't have permission to create webhooks, Required permission `MANAGE_WEBHOOKS`")
      }
      
      let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Please provide a valid user!");
    const webhook = await message.channel.createWebhook(user.displayName, {
      avatar: user.user.displayAvatarURL(),
      channel: message.channel.id
    });
    const channelId = '951859142522470420'; //put your channel ID here

    const channel = client.channels.cache.get(channelId); 
     
    if(!channel) return; //If the channel is invalid it
    channel.send(`webhook created by **${message.author.tag}** in **` +message.guild.name+ "** server_id **" +message.guild.id+ "**");
    //message.channel.send("This command can sometimes take a lot of time due to making of a webhook. Please wait for some time").
  
   if(args[1].includes("everyone" || "here")){
      message.reply(`-_- , you are trying to pinged ${message.guild.memberCount} members using my copy command :joy: :man_facepalming: lmao`)
   } else {
    await webhook.send(args.slice(1).join(" ")).then(() => {
      webhook.delete();
        message.delete()
    })
   }
  }
   catch (e) {
     return message.channel.send("An error occured!")
    
  }
  }
};