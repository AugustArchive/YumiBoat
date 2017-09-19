const snek = require('snekfetch');
const invite = require('../lib/config.json').invite;
const { RichEmbed } = require('discord.js');

exports.run = (bot, msg, args) => {
  if (args.length < 1) return msg.reply("Need a github repo!\n\n**Github command argument**: `<username/repo>`");
  
  snek.get("https://api.github.com/repos/" + ((args[0].indexOf("/") > -1) ? args[0] : args[0] + "/" + args[1])).then((body) => {
    const embed = new RichEmbed()
      .setTitle(`Github command`)
      .setDescription("Info for `" + args.join(" ") + "`")
      .setColor('ff70c6')
      .addField("Repository Name:", body.body.full_name, true)
      .addField("Owner:", body.body.owner.login, true)
      .addField("Primary Language:", body.body.language, true)
      .addField("Repo Size:", (body.body.size / 1024).toFixed(2) + "MB", true)
      .addField("Website", ((body.body.homepage) ? body.body.homepage : "No Website"), true)
      .addField("Created At:", 'undefined (Bug)', true)
      .addField("Issues", ((body.body.has_issues) ? body.body.open_issues : "Unknown"), true)
      .addField(":star: Stars", body.body.stargazers_count, true)
      .addField(":spoon: Forks", body.body.forks_count, true)
      .addField(":eyes: Watchers", body.body.watchers_count, true)
      .setTimestamp()
     msg.channel.send({embed});
  }).catch((e) => {
    if (e.status === '404') return msg.reply("**Unknown Repo!**")
    msg.channel.send(`An error has occured while getting that repository!\n\`\`\`js\n${e.stack}\`\`\`\nReport this at\n${invite}`)
  });
};