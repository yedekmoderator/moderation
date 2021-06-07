const { MessageEmbed } = require('discord.js');
const config = require('../config.js');
const { JsonDatabase } = require('wio.db');
const uyarılar = new JsonDatabase({ databasePath: './data/Uyarılar.json' });
const sicil = new JsonDatabase({ databasePath:'./data/Sicil.json'});
exports.run = async(client, message, args) => { 

if(!message.member.roles.cache.has(config.roller.uyarıcırol) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.react(config.emoji.no);

let sebep = args.slice(1).join(' ');
if(!sebep) return message.react(config.emoji.no);

uyarılar.add(`uyarılar.${member.id}`, 1);
uyarılar.push(`uyarı.${member.id}`, { 
    Staff: message.author.id,
    Reason: sebep,
    Date: Date.now()
});
sicil.push(`sicil.${member.id}`, {
    Type: "WARN",
    Staff: message.author.id,
    Reason: sebep,
    Date: Date.now()
});

let data = uyarılar.get(`uyarı.${member.id}`);
if(!data) return;
let x = await data.map((value, index) => `\`${index+1}.\` <@${value.Staff || "Belirtilmemiş"}> \`${new Date(value.Date).toTurkishFormatDate() || "Belirtilmemiş"}\` **${value.Reason || "Belirtilmemiş"}**`)

let uyarısayı = await uyarılar.get(`uyarılar.${member.id}`) || 0

message.react(config.emoji.yes);
message.channel.send(
new MessageEmbed()
.setColor(config.embed.color)
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setDescription(`
${member} üyesi ${message.author} tarafından \`${sebep}\` sebebiyle uyarıldı (\`${uyarısayı}\`);
──────────────────────────
${x.join("\n") || "*Ne yazık ki kullanıcı daha önceden uyarılmamış..*"}
`));

};

exports.config = {
    name:'uyar',
    aliases:["warn"]
}