const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
    name: 'autoresponse-create',
    aliases: ["create-autoresponse", "c-ar", "ar-c", "ar-create", "create-ar"],
    category: "🚫 Admin",
    run: async(client, message, args, data) => {
       
 if(!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply("**you don't have permssion to create autoresponse**");

       var name = args[0]; const response = args.slice(1).join(" ");
     if(!name){
           var errembed = new Discord.MessageEmbed()
    .setDescription("**Failed**")
    .addField("Error:", `You Didnt Gave me a Name of Your Custom Command`)
     return message.channel.send(errembed)
     }
     if(!response) {
           var errembed = new Discord.MessageEmbed()
    .setDescription("**Failed**")
    .addField("Error:", `You Didnt Gave me a Reply of Your Custom Command`)
     return message.channel.send(errembed)
     }
     if(db.has(`${name}_${message.guild.id}`)){
         var errembed = new Discord.MessageEmbed()
    .setDescription("**Failed**")
    .addField("Error:", `This Command Already Exist Please Delete it First to add New One`)
     return message.channel.send(errembed)
     }
     db.set(`${name}_${message.guild.id}`, response);
        const aembed = new Discord.MessageEmbed()
   .setDescription("**Successfull**")
   .addField("Custom Command Name to Set:", name)
   .addField("Custom Command Reply/Response to Set:", response)
   message.channel.send(aembed);
    }
}