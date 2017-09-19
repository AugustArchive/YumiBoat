const { RichEmbed } = require('discord.js');

exports.run = (bot, msg) => {
  let naegin = 'https://cdn.discordapp.com/attachments/265156286406983680/355602638378762240/1504257238874.jpg';
  
  const embed = new RichEmbed()
    .setTitle(`Naegin!`)
    .setDescription(`This is August's Boytoy smh (<@279335770467205120>)`)
    .setImage(naegin)
  msg.channel.send({embed});
};