const { MessageEmbed, Client, Collection } = require("discord.js");
const fs = require('fs')
const client = (global.client = new Client({ fetchAllMembers: true }));
const config = require('./config.js');
const { JsonDatabase } = require('wio.db');
require('./util/eventLoader.js')(client);

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(dosya => {
      let props = require(`./commands/${dosya}`);
      console.log(`${props.config.name} komutu yüklendi.`);
      client.commands.set(props.config.name, props);
      props.config.aliases.forEach(alias => {
          client.aliases.set(alias, props.config.name);
      });
  });
});

fs.readdir('./events/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} event yüklenecek.`);
  files.forEach(dosya => {
      console.log(`${dosya} eventi yüklendi.`);
  });
});

client.elevation = message => {
  if (!message.guild) {
  return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === config.bot.sahip) permlvl = 4;
  return permlvl;
  };

  Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  
    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
  
    if (!format) {
      format = "dd MM yyyy | hh:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);
    
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };
    
    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);
  
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("hh") > -1) {
      if (hours > 24) hours -= 24;
      if (hours === 0) hours = 24;
      format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    };
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };

  Promise.prototype.sil = function(time) {
    if (this) this.then(s => {
        if (s.deletable) s.delete({ timeout: time * 1000 });
    });
};



client
    .login(config.bot.token)
    .then((baglandi) => console.log(`Bot Başarıyla ${client.user.tag} hesabıyla aktif edildi!`))
    .catch((err) => console.log(`Bot başlatılırken hata oluştu! ${err}`));
