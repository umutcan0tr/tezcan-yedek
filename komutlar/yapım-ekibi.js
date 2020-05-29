const Discord = require("discord.js")

exports.run = (client, message, args) => {
var embed = new Discord.RichEmbed()

.setTitle(`REGİSTER`)
.setAuthor(`Bot Bilgi`,message.author.avatarURL,)
.setColor("RANDOM")
.setThumbnail(client.user.avatarURL) 
.addField(` **Botun Kullanıcı Sayısı**`,client.users.size) 
.addField(` **Botun Olduğu Sunucu Sayısı**`,client.guilds.size) 
.addField(` **Bottaki Komut Sayısı**`,client.commands.size)
.addField(` **Sahip**`, `<@505426486954819585> <a:bits:681880891160657920>`,true) 
.addField(` **Botun Geliştiricisi**`,`<@529613090132852746> <a:bits:681880891160657920>`,true)
.addField(` **Botun Geliştiricisi**`,`<@679694797270810642> <a:bits:681880891160657920>`,true)
.addField(` **Botun Geliştiricisi**`,`<@650000804186554399> <a:bits:681880891160657920>`,true)
.addField(` **Bot Discord.js Versiyon**`,Discord.version)
.addField(` **Bot İd**`,client.user.id) 
.setTimestamp()
message.channel.sendEmbed(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yapımekibi"],
  permLevel: 0
};

exports.help = {
  name: 'yapımekibi',
  description: 'Yapım Ekibini Gösterir',
  usage: '!yapımekibi'
};