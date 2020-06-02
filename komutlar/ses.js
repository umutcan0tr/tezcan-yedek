module.exports = {
  name: "ses",
  description: "Botun Ses Seviyesini Ayarlarsınız",
  execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("Önce bir ses kanalına katılmanız gerekiyor!").catch(console.error);
    if (!serverQueue) return message.reply("Oynatılan Bir Şey Yok").catch(console.error);

    if (!args[0])
      return message.reply(`🔊 The current volume is: **${serverQueue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Ses seviyesini ayarlamak için lütfen bir sayı kullanın.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Please use a number between 0 - 100.").catch(console.error);

    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return serverQueue.textChannel.send(`Ses Ayarlandı: **${args[0]}%**`).catch(console.error);
  }
};
