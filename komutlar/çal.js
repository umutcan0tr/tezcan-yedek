const { Util } = require("discord.js");
const { play } = require("../include/play");
const { YOUTUBE_API_KEY } = require("../config.json");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "çal",
  description: "Müizk Çalar",
  async execute(message, args) {
    const { channel } = message.member.voice;

    if (!args.length) return message.reply("Kullanım: !play <YouTube URL | Video Adı>").catch(console.error);
    if (!channel) return message.reply("Önce Bir Ses Kanalına Girmeniz Gerek").catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("Ses Kanalına Girmek İçin İznim Yok");
    if (!permissions.has("SPEAK"))
      return message.reply("Bu ses kanalında konuşamıyorum, uygun izinlere sahip olduğumdan emin olun!");

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    const serverQueue = message.client.queue.get(message.guild.id);
    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.title,
          url: songInfo.video_url,
          duration: songInfo.length_seconds
        };
      } catch (error) {
        if (error.message.includes("copyright")) {
          return message
            .reply("⛔ Video, telif hakkı koruması nedeniyle oynatılamadı ⛔")
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1);
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          title: songInfo.title,
          url: songInfo.video_url,
          duration: songInfo.length_seconds
        };
      } catch (error) {
        console.error(error);
      }
    }

    if (serverQueue) {
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`Kanala katılamadı: ${error}`).catch(console.error);
      }
    }
  }
};
