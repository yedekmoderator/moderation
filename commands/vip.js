const Discord = require('discord.js');
const config = require('../config.js');

exports.run = async (client, message, args) => {

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!member) return message.react(config.emoji.no);
  if(member.roles.cache.has(config.roller.vip)) return message.react(config.emoji.no);

  message.channel.send(new Discord.MessageEmbed().setDescription(`${member}, kişisine <@&${config.roller.vip}> rolü başarıyla verildi.`));

}
  exports.config = {
    name:'vip',
    aliases: ['vipver']
  };