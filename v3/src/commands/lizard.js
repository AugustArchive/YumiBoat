const snekfetch = require('snekfetch');

exports.run = (bot, msg) => {
  snekfetch.get('https://nekos.life/api/lizard').then(r => {
    msg.channel.send({
      embed: {
        color: 0xff70c6,
        author: {
         name: 'Lovely lizards o.O',
         icon_url: bot.user.avatarURL
     },
       image: { url: r.body.url }
      }
    }).catch(err => {
      msg.channel.send(`An error has occured!\n\`\`\`js\n${err.body}\`\`\``);
      console.error();
    });
  });
}
