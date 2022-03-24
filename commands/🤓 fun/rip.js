const Discord = require("discord.js")
const AmeClient = require("amethyste-api");
const config = require("../../botconfig/config.json")
module.exports = {
  name: "rip",
  aliases: ["died", ""],
  category: "🤓 fun",
  description: "Shows RIP create with user avatar",
  usage: "rip <user>",
  run: async (client, message, args, data, db) => {
    
   let AmeAPI = new AmeClient(config.imageapi);
const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
 
		const buffer = await AmeAPI.generate("rip", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
		const attachment = new Discord.MessageAttachment(buffer, "approved.png");
	
		message.channel.send(attachment);
  }
};