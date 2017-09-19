const { RichEmbed } = require('discord.js');

exports.run = (bot, msg, args) => {
 let shrugging = new RichEmbed()
   .setDescription(`${msg.author.username} is shrugging!`)
   .setColor('ff70c6')
   .setImage('https://uploads.disquscdn.com/images/879cbdde510096ef37be0f970c0ec64ae0f3715623aefff33a2b831c4b7744c7.gif')
 let shrugginSomeone = new RichEmbed()
   .setDescription(`${msg.author.username} is shrugging at ${args.join(" ")}`)
   .setColor('ff70c6')
   .setImage('https://vignette2.wikia.nocookie.net/kancolle/images/9/94/Renge_Shrug.gif/revision/latest?cb=20160828214839')
  
  if (args.length < 1) return msg.channel.send({embed: shrugging});
  msg.channel.send({embed: shrugginSomeone});
}