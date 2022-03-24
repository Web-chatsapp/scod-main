module.exports = {
    name: "nuke",
    category: "🚫 Admin",
    description: "nuke",
     botPerms: ["ADMINISTRATOR"],
    userPerms: ["ADMINISTRATOR"],
             run: async(client, message, args) => {
               if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Dont Have Permmissions To Mute Someone! - [ADMINISTRATOR]**");

            if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send("**I Don't Have Permissions To Mute Someone! - [MANAGE_GUILD]**")
            if (!args[0]) return message.channel.send("**Please Enter A User To Be Muted!**");
        const channeltonuke =message.mentions.channels.first() || message.channel;
      message.channel.send(`Nuking ${channeltonuke}`);
			const position = message.channel.position;
			const newChannel = await message.channel.clone();
			await message.channel.delete();
			newChannel.setPosition(position);
      newChannel.send(`Channel Nuked by ${message.member}`);
			return newChannel.send("https://media1.tenor.com/images/e275783c9a40b4551481a75a542cdc79/tenor.gif?itemid=3429833")
   }
}