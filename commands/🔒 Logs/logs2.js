const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "remove-logs",
  category: "🔒 Logs",
  aliases: ["logs-del", "logs-delete", "logs-remove"],
  run: async(client, message, args) => {
     if (!message.member.hasPermission("MANAGE_SERVER"))
     {
      return;
    }
message.guild.channels.cache.find(channel => channel.name === "scod-logs").delete("Logs Off");


message.reply("<a:thumbsupA:952633951279783946> Done removed the channel and logs feature both");
  }
}