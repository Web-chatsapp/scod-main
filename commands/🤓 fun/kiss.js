const discord = require("discord.js");
const random = require("something-random-on-discord").Random

module.exports = {
  name: "kiss",
  category: "🤓 fun",
  description: "Kiss someone",
  run: async (client, message, args) => {
    
    let target = message.mentions.members.first()
    
    let data = await random.getAnimeImgURL("kiss");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`${message.author.username} kisses ${target.user.username}`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};