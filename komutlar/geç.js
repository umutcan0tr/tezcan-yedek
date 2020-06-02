module.exports = {
  name: "geç",
  description: "Çalmakta olan şarkıyı atla",
  async execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("Önce bir ses kanalına katılmanız gerekiyor!").catch(console.error);
    if (!serverQueue)
      return message.channel.send("There is nothing playing that I could skip for you.").catch(console.error);

    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(`${message.author} ⏭ şarkı geçildi`).catch(console.error);
  }
};
