let clever = require("cleverbot-node");
const Clever = new clever;
let cfg = require("../lib/config.json");
let snekfetch = require("snekfetch");

exports.run = (bot, msg, args) => {
 snekfetch.get(`https://discordbots.org/api/bots/${bot.user.id}/votes`)
   .set(`Authorization`, cfg.api_keys.oliyBots)
   .then(res => {
     if (!res.body.map(c => c.id).includes(msg.author.id)) return msg.reply(`You need to upvote me to get this command and others!\n__**Updoot me**__: \`y/upvote\` or <https://discordbots.org/bot/${bot.user.id}>`);
     
     Clever.configure({
         botapi: cfg.api_keys.clever
     });
      Clever.write(args.join(" "), (response) => {
          msg.channel.startTyping()
          setInterval(() => {
            msg.channel.send(response.output).catch(console.error);
            msg.channel.stopTyping()
         }, Math.random() * (1 - 3) + 1 * 1000);
      });
   });
}

// Credit to Hansen! <3