const Discord = require('discord.js')
module.exports = {
    name: 'status',
    category: "👑 Owner",
    description: 'Set\'s status',
    usage: 'status <name> | <type> | <status>',
    run : async (client, message, args) => {
      if(message.author.id !== `849359686855950375`) {
        return message.channel.send("sorry, this command is only for the developer <a:Crown:954365293407395841>")
      }
      	const embed = new Discord.MessageEmbed().setColor('#FF00FF')
		await client.user.setStatus(args.join(' ')).then(
			message.channel.send(embed.setDescription(`You have successfully changed my status to  ${args.join(' ')}`))
		).catch(e => e)
     
	},
};