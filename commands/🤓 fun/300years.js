const Discord = require("discord.js")
const AmeClient = require("amethyste-api");
const config = require("../../botconfig/config.json")
module.exports = {
  name: "3000yr",
  category: "🤓 fun",
  description: "Sends a 3000yrs photo of mentioned person ",
    usage: "3000yrs",
  aliases: ["3000yrs", "3000"],
  run: async(client, message, args, data, db) => {
 
let AmeAPI = new AmeClient(config.imageapi);
const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
 
		const buffer = await AmeAPI.generate("3000years", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
		const attachment = new Discord.MessageAttachment(buffer, "approved.png");
	
		message.channel.send(attachment);

	}
}

