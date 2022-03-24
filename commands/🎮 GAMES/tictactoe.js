const Discord = require("discord.js");
const db = require("quick.db");
const config = require(`../../botconfig/config.json`);

            module.exports = {
  name: "tictactoe",
  description: "Will play tictactoe game with your mentioned persom",
  usage: "tictactoe <mention>",
  aliases: ["ttt"],
  category: "🎮 GAMES",
  run: async(client, message, args) => {
    const checkingBlacklistedMembers = db.fetch(`blacklisted_${message.author.id}`)
    if (checkingBlacklistedMembers === null) {
        checkingBlacklistedMembers === false
    }

    if (checkingBlacklistedMembers === true) return message.lineReply(`You have been blacklisted from my commands. If you wish to appeal, please DM [**${ config.DMtoUnbanID}**] for more info.`);

      const checkingMaintenance = db.fetch(`maintenance`)
    if (checkingMaintenance === null) {
        checkingMaintenance === false
    }

    if (checkingMaintenance === true) return message.lineReply(`Maintenance mode is on so u can't use the bot right now, Try it again later \:)`);
 if(!message.mentions.users.first()) return message.channel.send(`Pls mention someone`)
    var mention = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(!mention)
    {
      message.channel.send("You didnt mention anyone to play with you")
      return;
      
    }

    const { tictactoe } = require('easy-games-js')
    const tic = new tictactoe(mention, message)
    tic.init({ PROVIDE_MEMBER: "Please provide a  member", ACCEPT_CHALLENGE: "{user} Do you accept this challange? if yes than type yes in this chat", DOESNT_PLAY: "looks like {user} doesnt wanna play", WICH_SIDE: "**{user}, Which Side Do You Pick? Type \`End\` To End the game!**", GAME_OVER: "Times up!", END: "end", INACTIVITY: "game ended due to inactivity!", WINNER: "Congrats u have won {winner} ", DRAW: "Its a draw"})
        }
            }