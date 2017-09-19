const { devID } = require('../lib/config.json');

exports.run = (bot, msg, args) => {
  if(!args || args.size < 1) return msg.reply("Provide an args!");
  if (msg.author.id != '280158289667555328' && msg.author.id != '145557815287611393') return msg.reply(":x:");
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  msg.channel.send(`:ok_hand:`);
};
