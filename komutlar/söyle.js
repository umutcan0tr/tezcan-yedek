const Discord = require('discord.js');
 const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {
    if(message.author.id !== ayarlar.sahip) {
  if(message.author.id !== 'İDNİZ')//Bot Sahibi'nin ıdsi
 
      
      return;
  }
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  message.channel.send(mesaj);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yaz', 'söyle'],
  permLevel: 0
};

exports.help = {
  name: 'yaz',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: '!yaz [yazdırmak istediğiniz şey]'
};