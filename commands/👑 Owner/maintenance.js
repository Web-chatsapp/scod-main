const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'maintenance',
    description: 'maintenance mode',
    usage: '<prefix>maintenance on',
    category: '👑 Owner',

    run: async(client, message, args) => {
        if(message.author.id !== `849359686855950375`) {
        return message.channel.send("sorry, this command is only for my owner <a:Crown:954365293407395841>")
      }
        
      
       if(args[0] === "on") {
         db.set(`maintenance`, true)
         const embed = new Discord.MessageEmbed()
         .setDescription("<a:Tick5:952163786901557248> successfully maintenance mode is on")
         .setColor("BLUE")
       return message.lineReply(embed)
         
       } else if(args[0] === "off"){
         db.delete(`maintenance`, false)
         const embed1 = new Discord.MessageEmbed()
         .setDescription("<a:Tick5:952163786901557248> successfully maintenance mode is off")
         .setColor("BLUE")
         return message.lineReply(embed1)
       } else {
         const embed2 = new Discord.MessageEmbed()
         .setDescription("<a:wrong:952628851266166804> only on/off is allowed, like `=maintenance on` and for off `=maintenance off` ")
         .setColor("BLUE")
         return message.lineReply(embed2)
       }
        }
}