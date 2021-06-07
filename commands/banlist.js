const Discord = require('discord.js');
const config = require('../config.js');

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('BAN_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.emoji.no);

  try {
    message.guild.fetchBans()
    .then(bans => {
      message.channel.send(`
⛔ \` > \` Sunucudan yasaklanmış kişiler (\`Toplam ${bans.size} yasaklama\`);

${bans.map(c => `${c.user.id} \`|\` **${c.user.username}#${c.user.discriminator}**`).join("\n")}
`)
    });
    } catch (err) {
     console.log(err)
    };
};

exports.config = {
  name:'banlist',
  aliases: ['ban-list', 'banliste']
};