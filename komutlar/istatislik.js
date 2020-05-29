const Discord = require("discord.js"); 
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(client, message, args) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

    const semo = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(':bar_chart: Statistics')
    .addField(':busts_in_silhouette: Users:', client.guilds.reduce((a, b) => a + b.memberCount, 0))
    .addField(':tv: Channnels:', client.channels.size)
    .addField(':clipboard: Servers:', client.guilds.size)
    message.channel.send(semo);
}
exports.conf = {
  enabled: true,
    guildOnly: true,
  aliases: ['statistics', 'botbilgi', 'bot-bilgi', 'bilgi-bot'],
  permLevel: 0
};

exports.help = {
  name: 'i',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'botbilgi'
};