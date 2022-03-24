const googleIt = require('google-it');
let Discord = require("discord.js");

module.exports = {
  name: "google",
  category: "🔎 search",
  description: "Search For results on google",
  run: async(client, message, args) => {

  if(!message.guild.me.permissions.has("SEND_MESSAGES")) return;
      
      
 const embed = new Discord.MessageEmbed()
 .setTitle("**Here is what I found!!**")
 .setColor("YELLOW")
 .setFooter(`Requested by : ${message.author.tag}`)
 .setTimestamp()
 

 googleIt({'query': args.join(' ')}).then(results => {
 results.forEach(function(item, index) { 
 embed.addField((index + 1) + ": " + item.title, "<" + item.link + ">");
 });
 
 message.channel.send(embed);
 })
 }
}