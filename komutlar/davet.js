const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
//

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("TezcanN BOT")
    .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("BLUE")
  .setFooter('© TezcanN', client.user.avatarURL)
  .setThumbnail("")
  .setDescription('Küfür-Reklam Engellemesi İçin Botu Kendi Sunucuna Davet Edebilirsin..')
  .setTimestamp()
  .addField("» Linkler", `[Destek Sunucusu](https://discord.gg/xfyefgh)`, false)
  .setURL('https://discord.com/oauth2/authorize?client_id=440095229626810368&scope=bot&permissions=2146958847')
  	.setThumbnail(client.user.avatarURL);

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'davet'
};