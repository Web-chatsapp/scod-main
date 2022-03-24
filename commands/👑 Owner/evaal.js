const Discord = require('discord.js');
const { inspect } = require("util");

module.exports = {
  name: "evaal",
  aliases: "evaal",
  category: "👑 Owner",
 
  run: async (client, message, args) => {
    const bot = client;
    const owners = ["849359686855950375"]
    if(!owners.includes(message.author.id)) return;
         const code = args.join(" ");
  const token = client.token.split("").join("[^]{0,2}");
  const rev = client.token.split("").reverse().join("[^]{0,2}");
  const filter = new RegExp(`${token}|${rev}`, "g");
  try {
    let output = eval(code);
    if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
    output = inspect(output, { depth: 0, maxArrayLength: null });
    output = output.replace(filter, "TOKEN");
    if (output.length < 1950) {
        message.channel.send(`\`\`\`${output}\`\`\``);
    }
  } catch (error) {
    message.channel.send(` \`\`\`js\n${error}\`\`\` `);
 }}}
 