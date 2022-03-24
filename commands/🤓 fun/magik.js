const Discord = require("discord.js")
const AmeClient = require("amethyste-api");
const config = require("../../botconfig/config.json")
module.exports = {
  name: "magik",
  description: "Sends a magik photo of mentioned person ",
    usage: "magik",
  category: "🤓 fun",
  aliases: [],
  run: async(client, message, args, data, db) => {
 
let AmeAPI = new AmeClient(config.imageapi);
const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
 
		const buffer = await AmeAPI.generate("magik", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
		const attachment = new Discord.MessageAttachment(buffer, "approved.png");
	
		message.channel.send(attachment);

	}
}

