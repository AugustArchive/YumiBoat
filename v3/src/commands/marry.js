const { RichEmbed } = require('discord.js');

exports.run = (bot, msg, args) => {
 let marry = new RichEmbed()
   .setDescription(`${msg.author.username} is marring ${args.join(" ")}!`)
   .setColor('ff70c6')
   .setImage('http://data.whicdn.com/images/241527887/original.gif')
  
  if (args.length < 1) return msg.reply("Tag someone!");
  msg.channel.send({embed: marry});
};