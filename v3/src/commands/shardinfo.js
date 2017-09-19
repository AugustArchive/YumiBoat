const { RichEmbed } = require('discord.js');

exports.run = (bot, msg) => {
  let request = [
    bot.shard.broadcastEval('this.guilds.size').then(v => v.reduce((a, b) => a + b, 0)),
    bot.shard.broadcastEval('this.channels.size').then(v => v.reduce((a, b) => a + b, 0)),
    bot.shard.broadcastEval('this.users.size').then(v => v.reduce((a, b) => a + b, 0)),
    bot.shard.broadcastEval('(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)').then(v => v.reduce((a, b) => a + b, 0))
  ];
  Promise.all(request).then(shards => {
    bot.shard.broadcastEval('[this.shard.id, this.guilds.size, this.channels.size, this.users.size, (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2), this.voiceConnections.size]').then(results => {
     let embed = new RichEmbed()
       .setColor(`b76e79`)
       .setDescription(`**Guilds**: ${shards[0]}\n**Channels**: ${shards[1]}\n**Users**: ${shards[2]}\n**Memory Usage**: ${shards[3]}`)
       .addField("**Current Shard**", `\`\`\`prolog\n${bot.shard.id} : G: ${bot.guilds.size} | C: ${bot.channels.size} | U: ${bot.users.size} | R: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}MB | VC: ${bot.voiceConnections.size}\`\`\``)
       .addField("**All Shards**", `\`\`\`prolog\n${results.map(r=>`${r[0]}: G: ${r[1]} | C: ${r[2]} | U: ${r[3]}, | R: ${r[4]} | VC: ${r[5]}                                                            `).join('\n')}\`\`\``)
       .setFooter("Thanks Wessel <3")
      msg.channel.send({embed});
    });
  });
};