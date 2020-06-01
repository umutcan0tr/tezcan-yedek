const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require('chalk');
client.queue = new Map();
const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");
require("./util/eventLoader")(client);

///////////
const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
///////////

client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

////////////////////////

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

///////////////////////////////////////////////////

client.on("message", async message => {
    let afk_kullanici = message.mentions.users.first() || message.author;
    if(message.content.startsWith("!afk")) return; //! yazan yeri kendi botunuzun prefixi ile değiştirin.
  if (message.author.bot === true) return;
    if(message.content.includes(`<@${afk_kullanici.id}>`))
        if(await db.fetch(`afks_${afk_kullanici.id}`)) {
                message.channel.send(`**${client.users.get(afk_kullanici.id).tag}** adlı kullanıcı şuanda AFK! \n**Sebep:** \n${await db.fetch(`afks_${afk_kullanici.id}`)}`)
        }
        if(await db.fetch(`afks_${message.author.id}`)) {
                message.reply("başarıyla AFK modundan çıktın!")
            db.delete(`afks_${message.author.id}`)
        }
});

///////////////////////////////////////////////////

client.on("message",message => {
  if(!message.author.bot) return;
  db.fetch(`usohbet_${message.channel.id}`).then(usdurum => {
    if(!usdurum || usdurum === 'pasif') return;
    else {
      message.delete(3500)
    }
})})

///////////////////////////////////////////////////

client.on('guildMemberAdd', member => {
  db.fetch(`autoRole_${member.guild.id}`).then(i => {
 try {
 member.addRole(member.guild.roles.find("name", i))
} catch (e) {
 console.log('Rol veremedim...')
}
})
});

///////////////////////////////////////////////////

client.on("message", async message => {

if( message.content === "sa" || message.content === "Sa" || message.content === "Selamın Aleyküm" || message.content === "selamın aleyküm" || message.content === "sea" || message.content === "Sea") {

let gold = require("quick.db").fetch(`tios_gold${message.author.id}`)
if (gold === "gold") {

  const embed = new Discord.RichEmbed()
  .setColor("GOLD")
  .setDescription(" Hizaya Geçin Bu Bir **Gold** Üye ! ")
  message.channel.send({embed})

  } else {

return;

  }
}
})

///////////////////////////////////////////////////

client.on('guildMemberAdd', member => {
 let guvenlik= db.fetch(`bottemizle_${member.guild.id}`)
    if (!guvenlik) return;
    if(member.user.bot !==true){
    } else {
   member.kick(member) 
  }  
  });

///////////////////////////////////////////////////

client.on("message", async msg => {
  db.fetch(`kufur_${msg.guild.id}`).then(i => {
if (i == 'Açık') {
        const kufur = ["discord.gg","https//",".com",".xyz",".net"];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  
     
               
               msg.delete(); 
             

                  return msg.reply('Reklam yapmamalısın.').then(msg => msg.delete(3000));
             }
          } catch(err) {
            console.log(err);
          }
        } } else if (i == 'Kapalı') {

}

})
});

///////////////////////////////////////////////////

client.on("message", async msg => {


  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'sa' || 
msg.content.toLowerCase() == 'Selam Naber') {
          try {

                  return msg.reply('Aleyküm Selam')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
    
    }
    if (!i) return;

    });

///////////////////////////////////////////////////

client.on("message", async msg => {
  db.fetch(`kufur_${msg.guild.id}`).then(i => {
if (i == 'Açık') {
        const kufur = ["amk","a.m.k","am","a.m","m.k","mk","orosbu çocugu","orospu çocugu","o.ç","oç","oc","o.c","orosbu","orospu","veledi","zina","sikerim","sıkerım","s.i.k.e.r.i.m","s.ı.k.e.r.ı.m","piç","pıc","p.i.ç","p.ı.c","orosbu evladı","orospu evladı","amına koyayım","babanı sikim","sik","s.ik","si.k","s.i.k"];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  
     
               
               msg.delete(); 
             

                  return msg.reply('Küfür etme amına kodumun salağı.').then(msg => msg.delete(3000));
             }
          } catch(err) {
            console.log(err);
          }
        } } else if (i == 'Kapalı') {

}

})
});

///////////////////////////////////////////////////

//consts (for glitch)
// GEREKLİ YERLER

app.get("/", (request, response) => {
  console.log(
    ` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
// GEREKLİ YERLER
// -------------------------------------------------------------

const Jimp = require("jimp");
var prefix = ayarlar.prefix;


// ISIM \\
const isimloz = "BETA!";
const oynuyorloz = "BETA! ";
// ISIM \\

// KOMUTLAR \\
const yardımloz = "yardım";
const playloz = "çal";
const skiploz = "geç";
const playingloz = "çalan-ne";
const volumeloz = "ses";
const queueloz = "sıra";
const stoploz = "bitir";
const pauseloz = "durdur";
const goloz = "devam";
// KOMUTLAR \\


//////////////////////////////////
////////////////////////
// Müzik Komutu // // API KODU DC DE //

const { GOOGLE_API_KEY } = require("./anahtarlar.json");
const YouTube = require("simple-youtube-api");
const queue = new Map();
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require("ytdl-core");

client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);

  if (command === `${playloz}`) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(
            ":warning: | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız."
          )
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel
        .sendEmbed(new Discord.RichEmbed())
        .setTitle(
          `**✅ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`
        );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;

                    msg.delete()
  msg.channel.send("Müzik Aramayı Onaylıyormusunuz?").then(async function(sentEmbed) {
    const emojiArray = ["✅"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === msg.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("end", () => sentEmbed.edit("İşlem iptal oldu!"));
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
  
                  msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setTitle(`${isimloz} | Şarkı Seçimi`)
              .setDescription(
                `${videos
                  .map(video2 => `**${++index} -** ${video2.title}`)
                  .join("\n")}`
              )
              .setFooter(
                "Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir."
              )
              .setColor("0x36393E")
          );

      }
    });
  }); 
          
          msg.delete(5000);
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.sendEmbed(
              new Discord.RichEmbed()
                .setColor("0x36393E")
                .setDescription(
                  ":warning: | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**."
                )
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setColor("0x36393E")
              .setDescription(":( | **Aradaım Fakat Hiç Bir Sonuç Çıkmadı**")
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === `${skiploz}`) {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(
              "<a:frograinbow:488978511474982933> | **Lütfen öncelikle sesli bir kanala katılınız**."
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(
            "<a:frograinbow:488978511474982933> | **Hiç Bir Müzik Çalmamakta**"
          )
      );
    serverQueue.connection.dispatcher.end("**Müziği Geçtim!**");
    return undefined;
  } else if(command === `${yardımloz}`){
      msg.delete();
  const baslik = client.emojis.get('699733250947416085'); // Başlık Emojisinin ID'si Buraya
  const emoji = client.emojis.get('705027827707281428'); // Komutların Başına Gelcek ID Buraya
  
  const yardım = new Discord.RichEmbed()
.setDescription(`
${baslik} **GENEL KOMUTLAR** ${baslik}

[${emoji}] !çal <- Müziği Bulur Ve Çalar.

[${emoji}] !bitir <- Müziği Bitirir.

[${emoji}] !durdur  <- Müziği Durdurur.

[${emoji}] !geç  <- Müzik Atlar Bi Sonraki Müzigi Açar.

[${emoji}] !ses  <- Ses Seviyesini Belirler.
`,true);
  
  msg.channel.send(yardım);
} else if (command === `${stoploz}`) {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(
              "**:warning: | Lütfen öncelikle sesli bir kanala katılınız.**"
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(":warning: **| Hiç Bir Müzik Çalmamakta**")
      );
    msg.channel.send(
      `:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`
    );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("**Müzik Bitti**");
    return undefined;
  } else if (command === `${volumeloz}`) {
    msg.delete()
      msg.channel.send(new Discord.RichEmbed()
          .setTitle(`:warning: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
          .setColor("RANDOM")).then(async function(sentEmbed) {
    const emojiArray = ["0️⃣", "5️⃣", "💯"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === msg.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    await sentEmbed.react(emojiArray[1]).catch(function() {});
    await sentEmbed.react(emojiArray[2]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("end", () => sentEmbed.edit("İşlem iptal oldu!"));
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "0️⃣") {
  
            serverQueue.volume = "0";
    serverQueue.connection.dispatcher.setVolumeLogarithmic(0 / 5);
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(`:hammer:  Ses Seviyesi Ayarlanıyor: **0**`)
        .setColor("RANDOM")
    );

      }
            if (reaction.emoji.name === "5️⃣") {

                    serverQueue.volume = "5";
    serverQueue.connection.dispatcher.setVolumeLogarithmic(5 / 5);
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(`:hammer:  Ses Seviyesi Ayarlanıyor: **5**`)
        .setColor("RANDOM")
    );

      }
            if (reaction.emoji.name === "💯") {

                    serverQueue.volume = "100";
    serverQueue.connection.dispatcher.setVolumeLogarithmic(100 / 5);
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(`:hammer:  Ses Seviyesi Ayarlanıyor: **100**`)
        .setColor("RANDOM")
    );

      }
    });
  }); 
  } else if (command === `${playingloz}`) {
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(":warning: | **Çalan Müzik Bulunmamakta**")
          .setColor("RANDOM")
      );
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`${isimloz} | Çalan`)
        .addField(
          "Başlık",
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`,
          true
        )
        .addField(
          "Süre",
          `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`,
          true
        )
    );
  } else if (command === `${queue}`) {
    let index = 0;
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(":warning: | **Sırada Müzik Bulunmamakta**")
          .setColor("RANDOM")
      );
    return msg.channel
      .sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(`${isimloz} | Şarkı Kuyruğu`)
          .setDescription(
            `${serverQueue.songs
              .map(song => `**${++index} -** ${song.title}`)
              .join("\n")}`
          )
      )
      .addField("Şu anda çalınan: " + `${serverQueue.songs[0].title}`);
  } else if (command === `${pauseloz}`) {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.send(":warning: | **Çalan Müzik Bulunmamakta**");
  } else if (command === `${goloz}`) {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(":warning: ** | Çalan Müzik Bulunmamakta.**")
        .setColor("RANDOM")
    );
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    views: video.views
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
      );
      queue.delete(msg.guild.id);
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
          )
          .setColor("RANDOM")
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(
          `:arrow_heading_up:  **${song.title}** Adlı Müzik Kuyruğa Eklendi!`
        )
        .setColor("RANDOM")
    );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === " :x:  | **Yayın Akış Hızı Yeterli Değil.**")
        console.log("Müzik Bitti.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.sendEmbed(
    new Discord.RichEmbed()
      .setTitle(
        `**${isimloz} | 🎙 Müzik Başladı**`,
        `https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`
      )
      .setThumbnail(
        `https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`
      )
      .addField("\nBaşlık", `[${song.title}](${song.url})`, true)
      .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
      .addField("Süre", `${song.durationm}:${song.durations}`, true)
      .setColor("RANDOM")
  );
}

//////////////////

client.on("ready", () => {
    console.log(`${isimloz} Artık Hazır.`);
    client.user.setActivity(`${oynuyorloz}`, {type: "LISTENING"})
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);


///////////////////////////////////////////////////


///////////////////////////////////////////////////

///////////////////////////////////////////////////

///////////////////////////////////////////////////

///////////////////////////////////////////////////

client.login(ayarlar.token);