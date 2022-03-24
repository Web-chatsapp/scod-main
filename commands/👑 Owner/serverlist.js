const { Client, Message, MessageEmbed } = require('discord.js');
let ownerid = "849359686855950375";
let ownerid2 = "897066847478886430";
let ownerid3 = "873196977666523176";



module.exports = {
    name: 'serverlist',
    aliases: ['srlist'],
    category: "👑 Owner",
    description: 'Show the Server list Which client Joined...',
    usage: '',
    accessableby: "",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        if (message.author.id == ownerid || message.author.id == ownerid2 || message.author.id == ownerid3) {
            if (!message.guild.me.permissions.has("ADMINISTRATOR"))
                return message.channel
                    .send("I Dont Have Permissions")
                    .then(msg => msg.delete({ timeout: 5000 }));

            let i0 = 0;
            let i1 = 10;
            let page = 1;

            let description =
                `Total Servers - ${client.guilds.cache.size}\n\n` +
                client.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(r => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
                    .slice(0, 10)
                    .join("\n");

            let embed = new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setColor("BLUE")
                .setFooter(client.user.username)
                .setTitle(`Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
                .setDescription(description);

            let msg = await message.channel.send(embed);

            await msg.react("⬅");
            await msg.react("➡");
            await msg.react("❌");

            let collector = msg.createReactionCollector(
                (reaction, user) => user.id === message.author.id
            );

            collector.on("collect", async (reaction, user) => {
                if (reaction._emoji.name === "⬅") {
                    // Updates variables
                    i0 = i0 - 10;
                    i1 = i1 - 10;
                    page = page - 1;

                    // if there is no guild to display, delete the message
                    if (i0 + 1 < 0) {
                        console.log(i0)
                        return msg.delete();
                    }
                    if (!i0 || !i1) {
                        return msg.delete();
                    }

                    description =
                        `Total Servers - ${client.guilds.cache.size}\n\n` +
                        client.guilds.cache
                            .sort((a, b) => b.memberCount - a.memberCount)
                            .map(r => r)
                            .map(
                                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
                            )
                            .slice(i0, i1)
                            .join("\n");

                    // Update the embed with new informations
                    embed
                        .setTitle(
                            `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
                        )
                        .setDescription(description);

                    // Edit the message
                    msg.edit(embed);
                }

                if (reaction._emoji.name === "➡") {
                    // Updates variables
                    i0 = i0 + 10;
                    i1 = i1 + 10;
                    page = page + 1;

                    // if there is no guild to display, delete the message
                    if (i1 > client.guilds.cache.size + 10) {
                        return msg.delete();
                    }
                    if (!i0 || !i1) {
                        return msg.delete();
                    }

                    description =
                        `Total Servers - ${client.guilds.cache.size}\n\n` +
                        client.guilds.cache
                            .sort((a, b) => b.memberCount - a.memberCount)
                            .map(r => r)
                            .map(
                                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
                            )
                            .slice(i0, i1)
                            .join("\n");

                    // Update the embed with new informations
                    embed
                        .setTitle(
                            `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
                        )
                        .setDescription(description);

                    // Edit the message
                    msg.edit(embed);
                }

                if (reaction._emoji.name === "❌") {
                    return msg.delete();
                }

                // Remove the reaction when the user react to the message
                await reaction.users.remove(message.author.id);
            });
        } else {
            return;
        }

    }
}