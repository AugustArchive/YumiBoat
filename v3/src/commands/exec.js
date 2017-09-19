const child = require("child_process");
const config = require('../lib/config.json');

exports.run = (bot, msg, args) => {
  if (msg.author.id != '280158289667555328' && msg.author.id != '145557815287611393') return msg.reply("Need the `DEV` permission!");
  if (args.length < 1) return msg.reply("Need an argument!\n\nArgument: `code`");

  child.exec(args.join(" "), (err, stdout, stderr) => {
    if (err) return msg.channel.send(stderr, {code: 'sh'});
    msg.channel.send(stdout, {code: 'sh'});
  });
};