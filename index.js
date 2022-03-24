const ms = require("parse-ms");
const Discord = require("discord.js"); 
const colors = require("colors"); 
const Enmap = require("enmap");
const fs = require("fs");
const settings = require(`./botconfig/settings.json`);
const antiLink = require("anti-link-discord")
const AntiSpam = require("discord-anti-spam");
const dash = require(`./dashboard/settings.json`);
const express = require("express");
const app = express();
const session = require("express-session");
const config = require("./botconfig/config.json");
const db = require('quick.db')
const config1 = require('./utils/gw-config.json');
const moment = require('moment')
const { get } = require('./cc_list_test/sqlite.js')
 const fetch = require("node-fetch");

const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  shards: "auto",
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [ 
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
  intents: 32767,
  ws: { properties: { $browser: "Discord iOS" } }
});

require('./util/loadevents')(client);
client.snipes = new Discord.Collection();
client.config = config;
 client.config = config1;

const { GiveawaysManager } = require("discord-giveaways");

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./json db/giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: config1.botsCanWin,
        embedColor: config1.embedColor,
        embedColorEnd: config1.embedColorEnd,
        reaction: config1.reaction
    }
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    if (member.id !== client.user.id){
        console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
    }
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    if (member.id !== client.user.id){
        console.log(`${member.user.tag} left giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
    }
});

// MongoDB
const mongoose = require("mongoose");
mongoose.connect(config.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log("MongoDB Conneted.."));

const DisTube = require('distube')

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube.on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
	)).on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))

client.slash = new Discord.Collection();

client.settings = new Enmap({ name: "settings",dataDir: "./databases/settings"});

client.on("ready", async () => {
  console.log(`Fetching members...`);
   for (const [id, guild] of client.guilds.cache) {
    await guild.members.fetch();
   }
   console.log(`Fetched members and logged in as ${client.user.tag}!`);
   console.log(
    `Bot is ready. (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`,
  );
})

client.on("message", async message => {
  let startemojis = require("./nitro_emojis_handler/main.js")
  startemojis(client, message, db)
})

client.on("message", async message => {
  let guildConfig = db.get(`guildConfigurations_${message.guild.id}.chatbot`)
        const channelId = db.get(`scodchatbotch_${message.guild.id}`)
        if(channelId === null) return;
        if(guildConfig === null) guildConfig = 'disabled'
        if(guildConfig === 'disabled') return;
  const sender = client.channels.cache.get(channelId);
if (message.channel.name == sender.name) {
if (message.author.bot) return;
message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
if (message.content.includes(`@`)) {
return message.channel.send(`**:x: Please dont mention anyone**`);
 }
 message.channel.startTyping(2);
if (!message.content) return message.channel.send("Please say something.");
fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=Ashton`)
    .then(res => res.json())
    .then(data => {
        message.lineReply(`${data.message}`);
    });
    message.channel.stopTyping(2);
}
});

client.on('message', async (message) => {
    if (!message.guild || message.author.bot) return;
  
    const mentionedMember = message.mentions.members.first();
    if (mentionedMember) {
      const data = db.get(mentionedMember.id);
  
      if (data) {
        const [timestamp, reason] = data;
        const timeAgo = moment(timestamp).fromNow();
  
        message.lineReply(
          `${mentionedMember} is currently in afk (${timeAgo})\nReason: ${reason}`
        );
      }
    }
  
    const getData = db.get(message.author.id);
    if (getData) {
      db.delete(message.author.id);
      message.reply(`Welcome back, i have removed your afk!`).then(message.member.setNickname('')
   .catch((error) => console.log("Couldn't update " +message.author.tag+"'s nickname in server id " +message.guild.id +" server name " +message.guild.name)));
    }
  })


client.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    channel.send(`Thanks for inviting me <a:dh5_red_heart:932930326500605972> to your server, to see all the commands type: =help or =h`)
})

client.on('guildCreate', guild =>{

    const channelId = '951858950662418513'; //put your channel ID here

    const channel = client.channels.cache.get(channelId); 
     
    if(!channel) return; //If the channel is invalid it returns
    const embed = new Discord.MessageEmbed()
        .setTitle('I Joined A Guild!')
        .setDescription(`**Guild Name:** ${guild.name}\n **Guild Id:** ${guild.id}\n**Members:** ${guild.memberCount}\n **Guild owner:** ${guild.owner}`)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
    channel.send(embed);
});


client.on('guildDelete', guild =>{
    const channelId = '951859042966450216';//add your channel ID
    const channel = client.channels.cache.get(channelId); //This Gets That Channel
    
    if(!channel) return;  //If the channel is invalid it returns
    const embed = new Discord.MessageEmbed()
        .setTitle('I Left A Guild!')
        .setDescription(`**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RED')
        .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
    channel.send(embed);
});

client.on("ready", ()=>console.log("READY"));  //log when the bot gets ready
const welcome = require("./welcome");          //load the transcript.js file
welcome(client);

/**
 * @LOAD_THE_DASHBOARD - Loading the Dashbaord Module with the BotClient into it!
 */

client.on("ready", () => {
   require("./dashboard/index.js")(client);
})

const ReactionRoleManager = require("discord-reaction-role");
// Starts updating currents reaction roles
const manager1 = new ReactionRoleManager(client, {
    storage: "./json db/reaction-role.json"
});
// We now have a reactionRoleManager property to access the manager everywhere!
client.reactionRoleManager = manager1;
client.reactionRoleManager.on('reactionRoleAdded',(reactionRole,member,role,reaction) => {
  console.log(`${member.user.username} added his reaction \`${reaction}\` and won the role : ${role.name}`);
})

const alt = require("discord-anti-alt");
const account = new alt.config({
    days: 5,// only user who has less than 2 days ages will got kick
    options: "kick"
});
client.on("guildMemberAdd", async (member) => {
let antialt = db.fetch(`antialt_${member.guild.id}`);
if(antialt == "disable" || !antialt || antialt == null)
{

  return;
}

            

 let play = account.run(member);

 

});

client.on("guildMemberAdd", async (member) => {

let message2 = db.fetch(`nickm_${member.guild.id}`);
if(!message2)
{
  return;
}

   message2 = message2
    .replace("-username-", `${member.user.username}`);
   member.setNickname(message2);

});

client.on("guildMemberAdd", async (member) => {
let autor = db.fetch(`autorole_${member.guild.id}`);
if(!autor)
{
  return;
}
var role = member.guild.roles.cache.get(`${autor}`);
member.roles.add(role);



});

client.on("message", message => {

       let user = message.author;
       let timeout = "2000";
        var weekly =  db.fetch(`messagee_${message.guild.id}_${user.id}`);
   if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
   } else {
 db.add(`messages_${message.guild.id}_${user.id}`, 1); 
 let messagefetch = db.fetch(`messages_${message.guild.id}_${user.id}`); 
   let messages;
  if (messagefetch == 25) messages = 25; //Level 1
  else if (messagefetch == 65) messages = 65; // Level 2
  else if (messagefetch == 115) messages = 115; // Level 3
  else if (messagefetch == 200) messages = 200; // Level 4
  else if (messagefetch == 300) messages = 300; // Level 5
   db.set(`messagee_${message.guild.id}_${user.id}`, Date.now());
  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)
  
  }
   }     
 if(message.content.includes("scod"))
 {
     var weekly =  db.fetch(`bov_${message.member.id}`);
   if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
   } else {

 
   db.add(`broov_${message.member.id}`, 1);
     db.set(`bov_${message.member.id}`, Date.now());
   }
 }
  if(message.author.bot) return;
 
  let name = message.content.toLowerCase();
if(db.has(`${name}_${message.guild.id}`))
{
  let gettingreply = db.fetch(`${name}_${message.guild.id}`);
  
  
     message.channel.send(gettingreply)
  
}

   let data = get(message, message.guild) 
       
/*var profanity = require("profanity-hindi");
var list = require('badwords-list');
if(db.has(`swear-${message.guild.id}`) === true){ 
    var words = list.array;
      var isDirty = profanity.isMessageDirty(message.content);
    if(isDirty == true){
      message.delete();
        message.channel.send(`${message.author} Do not use bad words.`) .then(m => m.delete({ timeout : 5000 }))
        return;
    }
    var customwords = ["bc", "mc", "bhosda", "lond", "loda", "louda", "lund", "randi", "mkc", "mkb", "tmkc", "bsdk", "bhosdike", "madarchod", "chutiya", "rundi", "chutia", "choda", "chut", "gand", "gandu"];
  
    for (let i = 0; i < words.length; i++) {
        if(message.content.includes(customwords[i])){
      message.delete();
          message.channel.send(`${message.author} Do not use bad words.`)
          .then(m => m.delete({ timeout : 5000 }))
          return;
    }
        if(message.content.includes(words[i])) {
            message.delete();
            message.channel.send(`${message.author} Do not use bad words.`)
                .then(m => m.delete({ timeout : 5000 }))
        }
    }
  
}*/

   const hehe = db.fetch(`antilink_${message.guild.id}`);
      if(message.member && message.member.hasPermission('MANAGE_MESSAGES'))
       {
       }
       else {
     if(hehe == "on")
     {
   
  if (message.content.includes("http://")) {
   message.channel.send(":x: links are not allowed!!!")
    message.delete();
  }
 
 if (message.content.includes("https://")) {
   message.channel.send(":x: links are not allowed!!!")
    message.delete();
  }
    if (message.content.includes("discord.gg/")) {
       message.channel.send("No  Server invites allowed!!!")
       message.delete();
  }
  if (message.content.includes("Discord.gg/")) {
       message.channel.send("No  Server invites allowed!!!")
       message.delete();
  
     }
       }
       }

     if(db.has(`globalchat_${message.guild.id}`))
{
 
  if(message.channel.id == channelto)
  {
    if (message.content.includes("http://")) {
   message.channel.send(":x: links are not allowed!!!")
    message.delete();
  }
 
 if (message.content.includes("https://")) {
   message.channel.send(":x: links are not allowed!!!")
    message.delete();
  }
 
    if (message.content.includes("discord.gg/")) {
       message.channel.send("No  Server invites allowed!!!")
       return message.delete();
  }
  if (message.content.includes("Discord.gg/")) {
       message.channel.send("No  Server invites allowed!!!")
       return message.delete();
  
     }
      if (message.content.includes("dsc.gg/")) {
       message.channel.send("No  Server/Bot invites allowed!!!")
       return message.delete();
  
     }
      if (message.content.includes("Dsc.gg/")) {
       message.channel.send("No  Server/Bot invites allowed!!!")
       return message.delete();
  
     }
      message.delete()
  }
}
 
 /*if(msg.content === "=dm3318") {
   client.users.fetch('864441897857843200', false).then((user) =>
    {
    user.send("hiooo")
   });
 }*/

})

client.on("guildMemberRemove", async (member) => {


 let channel = db.fetch(`leavechannel_${member.guild.id}`);
 if(!channel)
 {
 
   return;
 }
 let channel1 = await client.channels.fetch(`${channel}`);
 var message1 = db.fetch(`message1234_${member.guild.id}`);

 var embed = new Discord.MessageEmbed()
.setTitle("Someone Just Left The server")
.setDescription(`${member} Just Left This server :slight_frown:`)
.addField(`Now We are of`, `${member.guild.memberCount} Members`)
.setColor(`RANDOM`)
channel1.send(embed)
}
);

fs.readdir("./event/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./event/${file}`);
    let eventName = file.split(".")[0];
     console.log(`[Event Load] loading Event ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);


[settings.antiCrash ? "antiCrash" : null, "clientvariables", "command", "events", "erelahandler", "requestreacts"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.premium = new Enmap({ name: "premium", dataDir: "./databases/premium" })
client.stats = new Enmap({ name: "stats", dataDir: "./databases/stats" })
client.settings = new Enmap({ name: "setups", dataDir: "./databases/settings" })
client.setups = new Enmap({ name: "setups", dataDir: "./databases/setups" })
client.queuesaves = new Enmap({ name: "queuesaves", dataDir: "./databases/queuesaves", ensureProps: false})
client.modActions = new Enmap({ name: 'actions', dataDir: "./databases/warns" });
client.userProfiles = new Enmap({ name: 'userProfiles', dataDir: "./databases/warns" });    

client.login(process.env.TOKEN);
