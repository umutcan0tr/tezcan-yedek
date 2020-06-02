module.exports = {
  name: "durdur",
  description: "Müziği Durdurur",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("Önce bir ses kanalına katılmanız gerekiyor!").catch(console.error);
    if (!serverQueue) return message.reply("Oyantılan Birşey Yok").catch(console.error);

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(`${message.author} ⏹ müzik Durduruldur`).catch(console.error);
  }
};
