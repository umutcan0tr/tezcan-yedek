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


///////////////////////////////////////////////////


///////////////////////////////////////////////////

///////////////////////////////////////////////////

///////////////////////////////////////////////////

///////////////////////////////////////////////////

client.login(ayarlar.token);