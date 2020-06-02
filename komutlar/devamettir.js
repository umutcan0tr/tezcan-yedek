module.exports = {
  name: "devamettir",
  description: "Şu anda müzik çalmaya devam et",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("Önce bir ses kanalına katılmanız gerekiyor!").catch(console.error);

    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return serverQueue.textChannel.send(`${message.author} ▶ müzik devam ediyor`).catch(console.error);
    }
    return message.reply("Oynatılıcak Birşey Yok.").catch(console.error);
  }
};
