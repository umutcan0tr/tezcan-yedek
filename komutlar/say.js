const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
   const currentSize = message.guild.members.filter(m => m.voiceChannel).size;

    let aktif = message.guild.members.filter(m => m.presence.status !== "offline").size
 
  
  const semo = new Discord.RichEmbed()
  .setThumbnail(message.author.avatarURL)
  .setAuthor(`${message.guild.name} Anlık Bilgileri` , message.author.avatarURL)
  .addField(`**Toplam Üye :** `  , `\`` + message.guild.memberCount + `\``)
  .addField(`**Sesli Kanalda Olanlar :**` , `\`` + currentSize + `\``)
  .addField(`**Sunucudaki Aktif Üye :**` , `\`` + aktif + `\``)
return message.channel.send(semo)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kackisi'],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'Sunucu Bilgisi.',
  usage: 'say'
};