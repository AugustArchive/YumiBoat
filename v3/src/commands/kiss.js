const Discord = require('discord.js');
exports.run = (bot, msg, args) => {
if (args.length < 1) return msg.reply("Need to tag someone!")
  const embed = new Discord.RichEmbed()
    .setDescription(`${msg.author.username} is kissing ${args.join(" ")}`)
    .setColor('ff70c6')
    .setImage("https://31.media.tumblr.com/tumblr_ma2bpr3VDk1qbayl8o1_500.gif")
  msg.channel.send({embed});
}
