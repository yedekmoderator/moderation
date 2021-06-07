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

let y = await jail.fetch(`rolleri.${member.id}`)

message.guild.members.cache.get(member.id).roles.add(y)

member.roles.remove(config.roller.jailrol);
    message.react(config.emoji.yes);
    message.channel.send(
    new MessageEmbed()
    .setColor(config.embed.color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
    .setDescription(`${member} üyesinin karantina cezası ${message.author} tarafından kaldırıldı.`)
    );
puanlar.add(`yetkilipuan.${message.author.id}`, 5);
sicil.push(`sicil.${member.id}`, {
    Type: "UNJAİL",
    Staff: message.author.id,
    Date: Date.now(),
    Reason: " ",
})
jail.delete(`rolleri.${member.id}`);
};

exports.config = {
    name:'unjail',
    aliases:["karantinaaç"]
};