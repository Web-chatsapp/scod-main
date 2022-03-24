const Discord = require("discord.js")
const AmeClient = require("amethyste-api");
const config = require("../../botconfig/config.json")
module.exports = {
  name: "vs",
  description: "Sends a vs photo of mentioned person ",
    usage: "vs",
  category: "🤓 fun",
  aliases: ["versus"],
  run: async(client, message, args, data, db) => {
 
let AmeAPI = new AmeClient(config.imageapi);
const users = [
   message.author,
		  message.mentions.users.first() || message.author
]

if(users[1] == message.author)
{
  const user1 = client.users.cache.get("849359686855950375");
  var buffer = await AmeAPI.generate("vs", { avatar: user1.displayAvatarURL({ format: "png", size: 512 }), url: users[1].displayAvatarURL({ format: "png", size: 512 }) });
}
 if(users[1] != message.author)
 {
	var buffer = await AmeAPI.generate("vs", { avatar: users[0].displayAvatarURL({ format: "png", size: 512 }), url: users[1].displayAvatarURL({ format: "png", size: 512 }) });
 }

			const attachment = new Discord.MessageAttachment(buffer, "approved.png");
		message.channel.send(attachment);

	}
}

