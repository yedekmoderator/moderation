const { MessageEmbed } = require('discord.js');
const config = require('../config.js');
const { JsonDatabase } = require('wio.db');
const sicil = new JsonDatabase({ databasePath: './data/Sicil.json' });
const puanlar = new JsonDatabase({ databasePath: './data/Puan.json' });
const jail = new JsonDatabase({ databasePath:'./data/Jail.json'});

exports.run = async(client, message, args) => { 

if(!message.member.roles.cache.has(config.roller.mutehammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.react(config.emoji.no);

let sebep = args.slice(1).join(' ');
if(!sebep) return message.react(config.emoji.no);

message.guild.members.cache.get(member.id).roles.cache.forEach(y => jail.push(`rolleri.${member.id}`, y.id))

member.roles.set([config.roller.jailrol]);
    message.react(config.emoji.yes);
    message.channel.send(
    new MessageEmbed()
    .setColor(config.embed.color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
    .setDescription(`
    ${member} üyesi karantinaya atıldı;
    ─────────────────────────
    \`•\` Yetkili: <@${message.author.id}>
    \`•\` Cezalandırma sebebi: \`${sebep}\`
    \`•\` Cezalandırma tarihi: \`${new Date().toTurkishFormatDate()}\`
    `)
    );
    client.channels.cache.get(config.kanallar.cezapuanlog).send(`${member} ${message.author} tarafından aldığı ceza yüzünden **${config.puan.jailpuan}** ceza puanı aldı.`)
    puanlar.add(`cezapuan.${member.id}`, config.puan.jailpuan);
    puanlar.add(`yetkilipuan.${message.author.id}`, config.puan.jailpuan);
    sicil.push(`sicil.${member.id}`, {
        Type: "JAİL",
        Staff: message.author.id,
        Date: Date.now(),
        Reason: sebep,
    })
};

exports.config = {
    name:'jail',
    aliases:["karantina"]
};