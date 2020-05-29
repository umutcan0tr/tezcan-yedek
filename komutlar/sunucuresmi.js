const Discord = require('discord.js');


exports.run = function(client, message) {

    const embed = new Discord.RichEmbed()
        .setDescription("**SUNUCU PP'si**")
        .setImage(message.guild.iconURL)

    message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucuikon','sunucu-pp'],
  permLevel: 0
};

exports.help = {
  name: 'sunucu-pp',
  description: 'Serverin iconunu gösterir',
  usage: '!sunucu-pp'
};