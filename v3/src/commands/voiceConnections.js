exports.run = (bot, msg, args) => {
  const voice = bot.voiceConnections.size;
  const voiceconnections = bot.voiceConnections.map(x => x.channel.name).join('\n');
  
  if (args.length < 1) return msg.reply("Which argument?\nCurrent arguments: `vcSize` `vcMap`");
  
  if (msg.content.includes(` vcSize`)) {
    msg.channel.send(`\`\`\`Current Voiceconnection size:\n${voice}\`\`\``);
  }
  if (msg.content.includes(` vcMap`)) {
    msg.channel.send(`\`\`\`Current Voice connections:\n${voiceconnections}\`\`\``);
  }
};