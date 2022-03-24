const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "embed-say",
  category: "🤓 fun",
  aliases: ["embed-say", "em-say", "emb-say"],
  description: "Make the bot say your message",
  botPerms: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {

      if (!args.join(" ")) {
      message.channel.send("Please add some text for me to repeat");
    }

        const embed = new MessageEmbed().setDescription(args.join(" "), {
      allowedMentions: { parse: ["users"] },
    }).setColor("RANDOM"); // setTitle and stuff according to your preference
        
        await message.delete(); // deleting the user message since it should be anonymous
        message.channel.send(embed);

  }
}