const config = require('../lib/config.json');
exports.run = (bot, msg, args) => {
  if (msg.author.id != '280158289667555328') return msg.reply("Need to be a dev to send invite codes ;3");
  if (args.length < 1) return msg.reply("Need to add a guild id!");
  
  if (!bot.guilds.get(args.join(" "))) return msg.reply("No guild has been found. (**They need to be in my servers owo**)");
  
  try {
    bot.guilds.get(args.join(" ")).channels.find('name', 'general').createInvite({maxUses: 1}).then((inv) => {
      msg.channel.send(`**Invite Code**: discord.gg/${inv.code}`);
    });
  } catch (err) {
    msg.channel.send(`An error :eyes:\n\`\`\`js\n${err}\`\`\``);
  }
}