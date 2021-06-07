const { MessageEmbed } = require("discord.js");
const config = require('../config.js');

module.exports = message => {

  let client = message.client;
  if(message.author.bot) return;
  if(!message.content.startsWith(config.bot.prefix)) return;
  let command = message.content.split(' ')[0].slice(config.bot.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) { cmd = client.commands.get(client.aliases.get(command)); }
  if (cmd) {
    if (perms < cmd.config.permLevel) return;
cmd.run(client, message, params, perms);
           }

};

module.exports.config = {
  name:'message'
};