const urban = require('relevant-urban');
const { RichEmbed } = require('discord.js');

exports.run = (bot, msg, args) => {
  if (args.length < 1) return msg.reply("pls, add 1 args!");
  
  urban.random(args.join(" "))
  .then(result => {
     let embed = new RichEmbed()
      .setTitle(`YumiBoat - Urban`)
      .setDescription(`**${result.word}** by **${result.author}**!`)
      .setColor("ff70c6")
      .addField(`Definition`, result.definition, true)
      .addField("Example", result.example, true)
      .addField("ThumbsUp / ThumbsDown", `\`👍\` ${result.thumbsUp} **|** \`👎\` ${result.thumbsDown}`, true)
      .setFooter(`OwO`);
    msg.channel.send({embed});
  }).catch((e) => {
     if (e.status === '404') return msg.reply("Urban didn't find shit.");
     msg.channel.send(`An error has occured!\`\`\`js\n${e.stack}\`\`\``);
  });
};