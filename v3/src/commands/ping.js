const ping = [
  "a",
  "e",
  "i",
  "o",
  "u"
];
const messages = [
  "Pinging...",
  "Fuck off, I am pinging!",
  "Pinging the Discord API..."
];

exports.run = (bot, msg) => {
  msg.channel.send(`${messages[Math.floor(Math.random() * messages.length)]}`).then(m => m.edit(`P${ping[Math.floor(Math.random() * ping.length)]}ng!\n**:b:iscord API**: \`${(bot.ping).toFixed(0)}ms\` **|** **Response Time**: \`${m.createdTimestamp - msg.createdTimestamp}ms\``));
};