const { RichEmbed } = require('discord.js');

exports.run = (bot, msg) => {
  const embed = new RichEmbed()
    .setTitle(`Aqua!! <3`)
    .setImage('https://s-media-cache-ak0.pinimg.com/originals/dd/90/54/dd905457dc421f2abc5165f2cbc2cf75.gif')
    .setColor('ff70c6')
    .setFooter("Who doesn't like Aqua?")
  msg.channel.send({embed});
};