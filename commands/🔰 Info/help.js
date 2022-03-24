const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const db = require("quick.db")
const Discord = require("discord-reply");
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo"],
  cooldown: 4,
  usage: "help [Command]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, user, text, prefix) => {
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

    message.react("<a:tick:927850541059563550>");

    let emojis = ["💰", "🔰", "🤓", "🎶", "⚙️", "👀", "⛓️", "🎉", "🎎", "🎫", "🎭", "🎮", "📲", "🔎", "🔒", "🤓", "🤖"]
    try {
      if (args[0]) {
        const embed = new MessageEmbed();
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.lineReply(embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const n = 3;
          const result = [
            [],
            [],
            []
          ];
          const wordsPerLine = Math.ceil(items.length / 3);
          for (let line = 0; line < n; line++) {
            for (let i = 0; i < wordsPerLine; i++) {
              const value = items[i + line * wordsPerLine];
              if (!value) continue;
              result[line].push(value);
            }
          }

          const embed = new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`MENU 🔰 **${category.toUpperCase()} [${items.length}]**`)
            .setFooter(`To see command Descriptions and Inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.addField(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
            } catch {}
          } else {
            try {
              embed.addField(`\u200b`, `> ${result[0].join("\n> ")}`, true);
            } catch {}
            try {
              embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);
            } catch {}
            try {
              embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);
            } catch {}
          }
          return message.lineReply(embed)
        }
        if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
        if (cmd.description) embed.addField("**Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch {}
        if (cmd.cooldown) embed.addField("**Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField("**Cooldown**", `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**Usage**", `\`\`\`${config.prefix}${cmd.usage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", ee.footericon);
        }
        if (cmd.useage) {
          embed.addField("**Useage**", `\`\`\`${config.prefix}${cmd.useage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", ee.footericon);
        }
        return message.lineReply(embed);
      } else {
        let userperms = message.member.hasPermission("ADMINISTRATOR");
        let owner = config.ownerIDS.includes(message.author.id);
        let cmduser = message.author.id;

        const baseembed = new MessageEmbed()
          .setColor(ee.color)
          .setFooter("react with the right emoji!", ee.footericon)
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setTitle(`**A multipurpose bot with ${client.commands.size}+ cmds and 20+ categories **`)
         .addField(
            "• Developer",
            `\`\`\`yml\nDiscord Username: Ashton#4218 [849359686855950375]\n\`\`\``
          )
          .addField('Important Links ','**:link: [support](https://dsc.gg/scod-support-server)**  | **[invite](https://discord.com/oauth2/authorize?client_id=892740154249318470&scope=bot&permissions=8)**')
          .setDescription(`

💰  **==>** To see the **Premium** Commands

🔰  **==>** To see the **Information** Commands

🤓  **==>** To see the **Fun** Commands

🎶  **==>** To see the **Music** Commands

👀  **==>** To see the **Audio Filter** Commands

⛓️  **==>** To see the **Economy** Commands

🎉  **==>** To see the **Giveaway** Commands

🎎  **==>** To see the **Automod** Commands

🎫  **==>** To see the **Tickets** Commands

🎭  **==>** To see the **Reaction Roles** Commands

🎮  **==>** To see the **Games** Commands

📲  **==>** To see the **Welcome-and-leave** Commands

🔎  **==>** To see the **Search** Commands

🔒  **==>** To see the **logs** Commands

🤓  **==>** To see the **Fun** Commands

🤖  **==>** To see the **Chatbot** Commands
${owner == true ? `\n👑 **==>** To see the **Owner** Commands` : ""}
${userperms == true ? `\n⚙️ **==>** To see the **Settings** Commands

🚫  **==>** To see the **Administration** Commands` : ""}
`)
          .setImage("https://cdn.discordapp.com/attachments/895755486098489445/941969368227663872/standard.gif")

        sendBaseEmbed();

        async function sendBaseEmbed(basemsg) {
          try {
            let msg;
            if (basemsg) msg = await basemsg.edit(baseembed)
            else msg = await message.lineReply(baseembed);

            if (owner) emojis.push("👑")
            if (userperms) {
              emojis.push("⚙️")
              emojis.push("🚫")
            }

            for (const emoji of emojis)
              msg.react(emoji).catch(e => console.log("couldnt add reaction"))

            const filter = (reaction, user) => {
              return emojis.includes(reaction.emoji.name) && user.id === cmduser;
            };

            msg.awaitReactions(filter, {
                max: 1,
                time: 30 * 1000,
                errors: ['time']
              })
              .then(collected => {
                collected.first().users.remove(user.id).catch(error => console.error('Failed to clear reactions: '));
                var found = false;
                for (var i = 0; i < client.categories.length && !found; i++) {
                  if (client.categories[i].includes(collected.first().emoji.name)) {
                    sendCategoryEmbed(client.categories[i], msg)
                    break;
                  }
                }
              })
              .catch(e => {
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emoji.msg.ERROR} ERROR | TIME RAN OUT  `)
                  .setDescription(`\`\`\`${e.message}\`\`\``)
                ).then(msg => msg.delete({
                  timeout: 4000
                }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey)))
              });
          } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
            );
          }
        }

        function sendCategoryEmbed(category, message) {

          try {
            const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
            const n = 3;
            const result = [
              [],
              [],
              []
            ];
            const wordsPerLine = Math.ceil(items.length / 3);
            for (let line = 0; line < n; line++) {
              for (let i = 0; i < wordsPerLine; i++) {
                const value = items[i + line * wordsPerLine];
                if (!value) continue;
                result[line].push(value);
              }
            }

            const embed = new MessageEmbed()
              .setColor(ee.color)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle(`MENU 🔰 **${category.toUpperCase()} [${items.length}]**`)
              .setDescription("*To go back react with:* ⏪")
              .setFooter(`To see command descriptions and Inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

            if (category.toLowerCase().includes("custom")) {
              const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
              try {
                embed.addField(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
              } catch {}
            } else {
              try {
                embed.addField(`\u200b`, `> ${result[0].join("\n> ")}`, true);
              } catch {}
              try {
                embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);
              } catch {}
              try {
                embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);
              } catch {}
            }
            message.edit(embed).then(msg => {
              msg.react("⏪")
              emojis.push("⏪")
              const filter = (reaction, user) => {
                return emojis.includes(reaction.emoji.name) && user.id === cmduser;
              };
              msg.awaitReactions(filter, {
                  max: 1,
                  time: 60 * 1000,
                  errors: ['time']
                })
                .then(collected => {
                  collected.first().users.remove(user.id).catch(error => console.error('Failed to clear reactions: '));
                  var found = false;
                  if (collected.first().emoji.name === "⏪") return sendBaseEmbed(msg);
                  for (var i = 0; i < client.categories.length && !found; i++) {
                    if (client.categories[i].includes(collected.first().emoji.name)) {
                      sendCategoryEmbed(client.categories[i], msg)
                      break;
                    }
                  }
                })
                .catch(e => {
                  try {
                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: '));
                  } catch {
                    /* */
                  }
                });
            })
          } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
            );
          }
        }
        
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
}