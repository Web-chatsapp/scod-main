const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
const db = require("quick.db");
module.exports = {
  name: "toggleplaymessage",
  aliases: ["toggleplaymsg", "playmessage", "playmsg"],
  category: "⚙️ Settings",
  description: "Toggles playmessage (same as pruning...). If its true a message of playing a new track will be sent, even if your afk. If false it wont send any message if a new Track plays! | Default: true aka send new Track information",
  usage: "toggleplaymessage",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    //run the code of togglepruning
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
    let {
      run
    } = require("./togglepruning");
    run(client, message, args);
  }
};
