const discord = require("discord.js");
const random = require("something-random-on-discord").Random

module.exports = {
  name: "cry",
  category: "🤓 fun",
  description: "Cry with gif",
  run: async (client, message, args) => {
    
    let data = await random.getAnimeImgURL("cry");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`Please talk with ${message.author.username} they are crying`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};