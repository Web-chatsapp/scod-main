const Discord = require('discord.js')
const { instagramUser } = require("popcat-wrapper")

  module.exports = {
  name: 'instagram',
  category: "🔎 search",
  run: async (client, message, args) => {

    if(!message.guild.me.permissions.has("SEND_MESSAGES")) return;
    
    const username = args.join('_');
    if (!username) return message.channel.send("Provide a name to search for!")
    try {
    const account = await instagramUser(username)

    const embed = new Discord.MessageEmbed()
      .setColor('4169e1')
      .setTitle(account.username)
      .setURL(`https://instagram.com/${username}`)
      .setThumbnail(account.profile_pic)
      .addField('Username', account.username, true)
      .addField('Full Name', account.full_name, true)
      .addField('Biography', account.biography)
      .addField('Posts', account.posts, true)
      .addField("Followers", account.followers, true)
      .addField('Following', account.following, true)
      .addField('Private?', account.private, true)
      .addField('Reels', account.reels, true)
      .addField('Verified', account.verified, true);
    message.channel.send(embed)
    } catch (error) {
      message.channel.send("Not a valid user!")
    }
  }
}