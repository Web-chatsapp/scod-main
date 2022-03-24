const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "set-logs",
  category: "🔒 Logs",
  aliases: ["logs-set"],
  run: async(client, message, args) => {
     if (!message.member.hasPermission("MANAGE_SERVER"))
     {
      return message.reply("you don't have permission to do that");
    }
message.guild.channels.create('scod-logs', {
  type: 'text',
  permissionOverwrites: [
     {
       id: message.guild.roles.everyone.id,
       deny: ['VIEW_CHANNEL'],
    },
  ],
})
message.reply("<a:thumbsupA:952633951279783946> Done created a channe named scod-logs and the logs will be send there");
  }
}