const kanna = [
 'https://media2.giphy.com/media/WcEvIajIk332g/giphy.gif',
 'https://media2.giphy.com/media/95RNaPUFiFtq8/giphy.gif',
 'https://media3.giphy.com/media/xUA7beFLKrpRTbOcEw/giphy.gif'
];
const { RichEmbed } = require('discord.js');

exports.run = (bot, msg) => {
  const embed = new RichEmbed()
   .setTitle(`Kanna!`)
   .setColor('ff70c6')
   .setImage('https://media2.giphy.com/media/95RNaPUFiFtq8/giphy.gif')
   .setFooter("Who doesn't like Kanna Kobayashi?")
  msg.channel.send({embed});
};