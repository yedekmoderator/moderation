const { MessageEmbed, Discord } = require('discord.js');

exports.run = async(client, message, args) => {

  if (!args[0]) return message.channel.send(`Kod belirtilmedi`).sil(5)
  let code = args.join(' ');
  function clean(text) {
  if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
  text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
  return text;
};
try { 
  var evaled = clean(await eval(code));
  if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Yasaklı komut");
  message.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});
} catch(err) { message.channel.send(err, {code: "js", split: true}).sil(30000) };

};

exports.config = {
  name:'eval',
  aliases: []
};