const Discord = require('discord.js');
exports.run = (client, message, args) => {
if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Bu komutu kullanman için \`Üye Yasakla\` Yetkisine sahip olan gerek!`);
  let guild = message.guild;
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  if (reason.length < 1) return message.channel.send('Örnek kullanım: `?uyar @alper Kural İhlali`');
  if (message.mentions.users.size < 1) return message.channel.send('Örnek kullanım: `?uyar @alper Kural İhlali`')
  message.channel.send("Kullanıcı, Başarıyla uyarıldı.");
user.send(`**${message.guild.name}** adlı sunucuda uyarıldınız!\n*Sebep:* \`\`\`${reason}\`\`\``);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
    kategori: "Yetkili",

  aliases: ['uyar','uyarı', 'warn'],
  permlevel: 0
};

exports.help = {
  name: 'uyarı',
  usage: 'uyarı <@kullanıcı> <sebep>'
};