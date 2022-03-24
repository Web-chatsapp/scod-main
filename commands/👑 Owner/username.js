const Discord = require('discord.js');


module.exports = {
	name: 'username',
  category: '👑 Owner',
  aliases: ['c-name'],
	run: async(client, message, args) => {
if(message.author.id !== `849359686855950375`) {
  const embed = new Discord.MessageEmbed().setColor('YELLOW')
        return message.channel.send(embed.setDescription("sorry, this command is only for the developer <a:Crown:954365293407395841>"))
      }
		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
		await client.user.setUsername(args.join(' ')).then(
			message.channel.send(embed.setDescription('You have successfully changed my username!'))
		).catch(e => e)
    
	},
};