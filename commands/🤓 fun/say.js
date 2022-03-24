const Discord = require("discord.js");

module.exports = {
  name: "say",
  category: "🤓 fun",
  description: "Make the bot say your message",
  botPerms: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    if (!args.join(" ")) {
      message.channel.send("Please add some text for me to repeat");
    }
    message.channel.send(args.join(" "), {
      allowedMentions: { parse: ["users"] },
    });
    message.delete();
  },
};