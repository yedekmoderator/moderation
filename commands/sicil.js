const { MessageEmbed, Message } = require('discord.js');
const { JsonDatabase } = require('wio.db');
const config = require('../config.js');
const sicil = new JsonDatabase({ databasePath: './data/Sicil.json'});
const puanlar = new JsonDatabase({ databasePath: './data/Puan.json' });

exports.run = async(client, message, args) => {

if(!message.member.roles.cache.has(config.roller.jailrol) && !message.member.roles.cache.has(config.roller.muterol) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.react(config.emoji.no);

if(member) { 
    let data = sicil.get(`sicil.${member.id}`);
    if(!data) return message.react(config.emoji.no);
    let x = data.map((value, index) => `\`${index+1}.\` **[${value.Type || "Belirtilmemiş"}]** <@${value.Staff || "Belirtilmemiş"}> \`${new Date(value.Date).toTurkishFormatDate() || "Belirtilmemiş"}\` **${value.Reason || "Belirtilmemiş"}**`)
    message.channel.send(new MessageEmbed()
    .setColor(config.embed.color)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic:true }))
    .setDescription(`${member} kullanıcısının ceza bilgileri;
    ─────────────────────────
    ${x.join("\n") || "*Kullanıcı daha önceden cezalandırılmamış..*"}`))
}
};

exports.config = {
  name:'sicil',
  aliases:["cezageçmişi","cezalar","penalties"]
};