const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'hack',
    category: "🤓 fun",
    aliases: ['fakehack'],
    description: 'fake hack someone',
    args: true,
    useage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        var ips = [
            '10.313.523.502.00.1',
            '25.537.753.462.29.2',
            '21.175.866.974.07.08',
            '32.653.587.825.35.5',
            '12.172.764.781.22.8',
            '91.723.242.452.09.3',
            '92.743.116.896.85.6',
            '84.091.000.853.54.7',
            '51.071.124.129.12.0'
        ]
        var pass = [
            '3318446',
            '7864654191',
            'vfdsfv6ds64646',
            'lol1254665',
            'heheheh647656546',
            'fdsfsdf6545456',
            
        ]
        var ipadress = ips[Math.floor(Math.random() * ips.length)];
        var pass1 = pass[Math.floor(Math.random() * pass.length)];

        if (!args[0]) return message.channel.send(
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription('**Who do you want to hack?\nTag Please**')
      
        )
        const Hacking = args.slice(0).join(" ") && args.shift().toLowerCase()

        let msg = await message.channel.send(
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription(`**Hacking ${Hacking}**`)
         
        )
        let time = 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Finding discord gmail ${Hacking}... `)
           
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Gmail: ${Hacking}@gmail.com`)
         
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Getting user password`)
          
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Password: ${pass1}`)
             
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Getting account access...`)
               
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Collecting data...  `)
             
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Hacking all accounts linked to ${Hacking}@gmail.com....`)
               
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Finding ip address...`)
             
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Ip: ${ipadress}`)
              
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Information collected...`)
                
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Downloading virus  `)
             
            )
        }, time)
        time += 1500
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`<a:foxieLoading:925426054875713556> Destroying friends list`)
              
            )
        }, time)
        time += 1900
        setTimeout(function () {
          msg.edit(
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription(`<a:foxieLoading:925426054875713556> Getting results be patient...`)
       
          )
        }, time)
        time += 3000
        setTimeout(function () {
          msg.edit(
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription(`User ${Hacking} is Hacked By ${message.author.tag} Hehe`)
           
          )
        }, time)
         time += 3000
        setTimeout(function () {
          msg.edit(
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription(`User ${Hacking} is Hacked By ${message.author.tag} Hehe`)
            
          )
        }, time)
    }
}