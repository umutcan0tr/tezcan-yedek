module.exports = {
  name: "çık",
  description: "Bot Çıakr Ve Durdur",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply("Çalınan Birşey Yok").catch(console.error);
    return message
      .reply(
        `📃 **Song queue**

${serverQueue.songs.map((song, index) => index + 1 + ". " + song.title).join("\n")}

Now playing: **${serverQueue.songs[0].title}**
		`,
        { split: true }
      )
      .catch(console.error);
  }
};
