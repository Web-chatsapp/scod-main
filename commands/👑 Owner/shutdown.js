
module.exports = {
  name: "shutdown",
  category: "👑 Owner",
  description: "Shut's down the bot",
  run: async (client, message, args) => {
    if (message.author.id !== "849359686855950375") {
      return message.channel.send("This command is for developer Only");
    } else {
    message.channel.send("Shutting down...").then((m) => {
      client.destroy();
    });
    await message.channel.send("The Bot has been ShutDown");
    }
  },
};