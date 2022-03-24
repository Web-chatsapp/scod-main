const Discord = module.require("discord.js");

module.exports = {
  name: "meme",
  category: "🤓 fun",
  description: "Sends a random meme",
  botPerms: ["ATTTACH_FILES"],
  run: async (client, message, args) => {
    var num = Math.floor(Math.random() * (500 - 1) + 1);
    message.channel.send({
      files: [
        {
          attachment: `https://ctk-api.herokuapp.com/meme/${num}`,
          name: "meme.jpg",
        },
      ],
    });
  },
};