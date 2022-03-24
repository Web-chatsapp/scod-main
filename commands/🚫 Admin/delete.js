const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
    name: 'autoresponse-delete',
    aliases: ["delete-autoresponse", "del-ar", "ar-del"],
    category: "🚫 Admin",
    run: async(client, message, args, data) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) 
        return message.lineReply("**you don't have permssion to delete autoresponse**");;

        var name = args[0];

        if(!name) 
        {
                var errembed = new Discord.MessageEmbed()
    .setDescription("**Failed**")
    .addField("Error:", `You Didnt Gave me a Name of Your Custom Command To Delete`)
     return message.channel.send(errembed)
        }
        let todel = db.fetch(`${args[0]}_${message.guild.id}`)
        if(!todel){
                var errembed = new Discord.MessageEmbed()
    .setDescription("**Failed**")
    .addField("Error:", `That Command Didnt Exist`)
     return message.channel.send(errembed)
        }
             
        const aembed = new Discord.MessageEmbed()
   .setDescription("**Successfull**")
   .addField("Custom Command Name to Delete:", name)
   .addField("Custom Command Reply/Response to Delete:", todel)
   message.channel.send(aembed);
    db.delete(`${name}_${message.guild.id}`);

    }
}