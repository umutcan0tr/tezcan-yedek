const Discord = require("discord.js");


exports.run = (client, message, args) => {
  if (message.author.id != "505426486954819585")//Bot Sahibinin ID'si
    return message.reply(":x: Bu Komutu Sadece yapımcım Kullanabilir!");

  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(":warning: Uyarı :warning:", "Bu  Komutu Özel Mesajlarda Kullanamazsın!");
    return message.author.sendEmbed(ozelmesajuyari);
  }

  let guild = message.guild;
  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.reply(":x: Bir Mesaj Yazmalısın!");
  if (message.mentions.users.size < 1)
    return message
      .reply(":x: Kime Mesaj Atmam Gerektiğini Yazmalısın!")

      .catch(console.error);

  message.delete();
  message.reply(":white_check_mark: Mesaj Gönderildi!");


  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(`**🎆 Kurucudan Gelen Mesajınız var 🎆**`)
    .setTimestamp()
    .setDescription(reason);

 


 return user.send(embed);


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dmat","dmat"],
  permlevel: 4
};
exports.help = {
  name: "mesajat",
  description: "Bir kullanıcıya özeldenmesaj yollar.",
  usage: "!mesajat"
};