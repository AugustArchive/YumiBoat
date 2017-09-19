const hd = require('humanize-duration');

exports.run = (bot, msg) => {
  msg.channel.send(`Uptime on Shard __${bot.shard.id}__: ${hd(bot.uptime, {round: true})}`);
}
