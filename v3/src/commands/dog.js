const snekfetch = require('snekfetch');
const logger = require('../lib/Logger.js');

exports.run = (bot, msg) => {
  snekfetch.get('http://random.dog/woof.json').then(r => {
    msg.channel.send({
      embed: {
        color: 0x008000,
        author: {
         name: 'Lovely dogs :3',
         icon_url: bot.user.avatarURL
     },
       image: { url: r.body.file }
      }
    }).catch(err => {
      msg.channel.send(`An error has occured!\n\`\`\`js\n${err.body}\`\`\``);
      logger.error(err.body + "fix!");
    });
  });
}
