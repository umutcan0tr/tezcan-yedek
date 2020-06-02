module.exports = {
  name: "durdur",
  description: "Çalmakta olan müziği duraklat",
  execute(message) {
    if (!message.member.voice.channel)
      return message.reply("Önce Bir Ses Kanalına Girmeniz Gerek").catch(console.error);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return serverQueue.textChannel.send(`${message.author} ⏸ paused the music.`).catch(console.error);
    }
    return message.reply("Oynanacak bir şey yok.").catch(console.error);
  }
};
