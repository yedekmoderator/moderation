const { MessageEmbed } = require('discord.js');
const config = require('../config.js');

exports.run = async(client, message, args) => { 

if(!message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let embed = new MessageEmbed().setColor(config.embed.color).setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(!kullanıcı) return message.react(config.emoji.no);

let verilecekrol = args[1];

if(!args[1]) { 
    message.channel.send(embed.setDescription(`
    Belirttiğiniz yetki geçerli değil! Lütfen aşağıdaki verilenlere göre komutu uygulayınız.
    
    Sorumluluklar;
    \`mute\` - <@&${config.roller.mutehammer}>,
    \`teyit\` - <@&${config.roller.teyitci}>,
    \`jail\` - <@&${config.roller.jailhammer}>

    Örnek kullanım;
    \`${config.bot.prefix}yetkiver <@Orchi/ID> mute\`
    \`${config.bot.prefix}yetkiver <@Orchi/ID> teyit\`
    \`${config.bot.prefix}yetkiver <@Orchi/ID> jail\`
    `))
}

if(verilecekrol === "mute") { 

kullanıcı.roles.add(config.roller.mutehammer)

message.channel.send(embed.setDescription(`<@${kullanıcı.id}> adlı üye, ${message.author} tarafından <@&${config.roller.mutehammer}> rütbesine yükseltildi!`))

}

if(verilecekrol === "teyit") { 
   
kullanıcı.roles.add(config.roller.teyitci)

message.channel.send(embed.setDescription(`<@${kullanıcı.id}> adlı üye, ${message.author} tarafından <@&${config.roller.teyitci}> rütbesine yükseltildi!`))

}

if(verilecekrol === "jail") { 
   
kullanıcı.roles.add(config.roller.jailhammer)

message.channel.send(embed.setDescription(`<@${kullanıcı.id}> adlı üye, ${message.author} tarafından <@&${config.roller.jailhammer}> rütbesine yükseltildi!`))

}

};

exports.config = {
    name:'yetkiver',
    aliases:["yetkiyükselt"]
};