const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client()
module.exports = {
    name: 'eval',
    category: '👑 Owner',
    run: async (client, message, args) => {
        if(message.author.id !== `849359686855950375`) {
  const embed = new Discord.MessageEmbed().setColor('YELLOW')
        return message.channel.send(embed.setDescription("sorry, this command is only for the developer"))
      }
      if(message.content.includes("token")) {
        return message.channel.send("token chudana hai niklo peheli fursat me")
      }
        const embed = new MessageEmbed()
            .setTitle('Evaluating...')
        const msg = await message.channel.send(embed);
        try {
            const data = eval(args.join(' ').replace(/```/g, ''));
            const embed = new MessageEmbed()
                .setTitle('output:')
                .setDescription(await data)
            .setColor('GREEN')
            await msg.edit(embed)
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (e) {
            const embed = new MessageEmbed()
                .setTitle('error')
                .setDescription(e)
                .setColor("#FF0000")
            return await msg.edit(embed);
        }
    }
}