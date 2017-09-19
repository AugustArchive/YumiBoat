const { RichEmbed } = require('discord.js');
exports.run = (bot, msg, args) => {
  if (args.length < 1) return msg.reply("Need to tag someone!")

  const embed = new RichEmbed()
    .setDescription(`${msg.author.username} is hugging ${args.join(" ")}`)
    .setColor('ff70c6')
    .setImage("https://38.media.tumblr.com/0510096e97312bf934fc782b3c6de966/tumblr_mpw8fyHfM51sokvkso1_500.gif")
  msg.channel.send({embed});
}