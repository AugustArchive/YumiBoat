const { RichEmbed } = require('discord.js');

exports.run = (bot, msg, args) => {
 const slapSelf = new RichEmbed()
  .setTitle(`Ouch!`)
  .setDescription(`${msg.author.username} slapped himself! That must of hurt :<`)
  .setImage('https://media.tenor.com/images/a6c2f17d9209f8f536b6b4bfbfb84686/tenor.gif')
  if (args.length < 1) return msg.channel.send({embed: slapSelf});
  const slapEmbed = new RichEmbed()
   .setTitle(`Ouch!`)
   .setDescription(`${msg.author.username} slapped ${args.join(" ")}`)
   .setImage('https://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif')
  msg.channel.send({embed: slapEmbed});
}