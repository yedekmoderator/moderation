const { MessageEmbed } = require('discord.js');
const config = require('../config.js');
const { JsonDatabase } = require('wio.db');
const sicil = new JsonDatabase({ databasePath: './data/Sicil.json' });
const puanlar = new JsonDatabase({ databasePath: './data/Puan.json' });

exports.run = async(client, message, args) => { 

if(!message.member.roles.cache.has(config.roller.mutehammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.react(config.emoji.no);

let sebep = args.slice(1).join(' ');
if(!sebep) return message.react(config.emoji.no);

message.guild.members.cache.get(member.id).ban({ reason:sebep });
message.react(config.emoji.yes);
message.channel.send(
new MessageEmbed()
.setColor(config.embed.color)
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setDescription(`
${member} üyesi sunucudan yasaklandı;
─────────────────────────
\`•\` Yetkili: <@${message.author.id}>
\`•\` Banlanma sebebi: \`${sebep}\`
\`•\` Banlanma tarihi: \`${new Date().toTurkishFormatDate()}\`
`)
);

};

exports.config = {
    name:'ban',
    aliases:["infaz","yasakla"]
}