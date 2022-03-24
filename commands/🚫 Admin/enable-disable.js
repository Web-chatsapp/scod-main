const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "nitro-emojis",
  category: "🚫 Admin",
  aliases: ["nitro-emojis"],
  run: async(client, message, args) => {

   if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("you don't have enough permission to enable/disable nitro-emojis");
   if(args[0] === "enable") {
       db.set(`nitroemoji_${message.guild.id}`, true)
           var aembed1 = new Discord.MessageEmbed()
   .setDescription("**Successfull**")
   .addField("Now Nitro Emojis:", "Enabled")
   return message.channel.send(aembed1);
   }
   else if(args[0] === "disable") {
     db.delete(`nitroemoji_${message.guild.id}`, false)
           var aembed2 = new Discord.MessageEmbed()
   .setDescription("**Successfull**")
   .addField("Now Nitro Emojis:", "Disable")
    return message.channel.send(aembed2);
   } else {
     var aembed3 = new Discord.MessageEmbed()
   .setDescription("**Invalid query only enable or disable is allowed**")
    return message.channel.send(aembed3);
   }
   

  }
}
