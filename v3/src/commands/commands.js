const { RichEmbed } = require('discord.js');
const config = require('../lib/config.json');

exports.run = (bot, msg) => {
  const otherEmbed = new RichEmbed()
    .setTitle(`YumiBoat Help`)
    .setDescription(":sos: If your lost, If your lost, I sent a DM")
    .setColor('ff70c6')
    .addField(":desktop: Website", 'https://yumibot.party/', true)
    .addField(":question: Support Server?", config.invite, true)
    .addField(":grey_question: I have a bug/question!", `Good! Sented this these people a dm!\n<@280158289667555328> or <@145557815287611393>`, true)
    .setTimestamp()
    .setFooter("Look in DM's if forgot!")
    msg.channel.send({embed:otherEmbed});
    
    let oliy = '<:oliy:327462998610280448>';
    let francis = '<:francis:327464171211849728>';
  const embed = new RichEmbed()
    .setTitle(`YumiBot — Commands`)
    .setDescription("Use `y/` as a prefix.\nCommand Usage: `y/[command]`")
    .setThumbnail(bot.user.avatarURL)
    .setColor('ff70c6')
    .addField(":rofl: — Fun", '`neko` `ascii` `slots`', true)
    .addField(":frame_photo: — Action", '`hug` `kiss` `aqua` `kanna`', true)
    .addField(":hammer_pick: — Developer", '`eval` `exec` `ginvite`', true)
    .addField(`${oliy} — Upvoters`, '`clever` `shitpost`', true)
    .addField(":gear: — Utility", '`serverinfo` `botinfo` `voiceConnections` `github`', true)
    .addField(":musical_note: — Music Module", '`play` `stop`')
    .addField(":video_game: — Video Game Module", '`rl` `minecraft`')
    .setTimestamp()
    .setFooter(`YumiBot — Made by August#1793`)
  msg.author.send({embed:embed}).catch((e) => {
      msg.channel.send("Do you have dm's off? :thinking:")
      console.error();
    });
}