const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
const db = require('quick.db')
    if (!message.member.hasPermissions ('KICK_MEMBERS')) return message.channel.send("Komudu Kullanmak İçin Kick Members Yetkisine Sahip Olmalısın.")
    const mod = message.author;
       const modlog = db.fetch(`modlogKK_${message.guild.id}`)
  if (!modlog) return message.reply('Mod log kanalı ayarlamamışsınız.');
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send(`Kullanıcıyı Bulamıyorum`)
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!reason) return message.channel.send('Sebebi yazmayı unuttun herhalde.')
    let muterole = message.guild.roles.find(`name`, "Juke | Susturma");
  if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "JUKE | Susturma",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
message.channel.send(`**${user.user.username}**, ${message.author} tarafından **${reason}** sebebiyle susturuldu!`)

    await (user.addRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor('Eylem: Mute')
            .addField('Kullanıcı', `<@${user.id}>`)
            .addField('Sebep', `${reason}`)
            .addField('Moderatör', `${mod}`)
            .setColor('RANDOM')
         return message.guild.channels.get(modlog).send(muteembed)
  
  
}

exports.conf = {
    aliases: ['sustur'],
    permLevel: 2
};

module.exports.help = {
    name: "mute",
    description: "Etiketlenen Kişiye Mute Atar",
    usage: "mute [kullanıcı] [sebep]"
}