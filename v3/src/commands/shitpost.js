let emojify = require("@gaikema/emojify");
let config = require('../lib/config.json');

exports.run = (bot, msg, args) => {
    
    snekfetch.get(`https://discordbots.org/api/bots/${bot.user.id}/votes`)
   .set(`Authorization`, config.api_keys.oliyBots)
   .then(res => {
     if (!res.body.map(c => c.id).includes(msg.author.id)) return msg.reply(`You need to upvote me to get this command and others!\n__**Updoot me**__: \`y/upvote\` or <https://discordbots.org/bot/${bot.user.id}>`);

   if (args.length < 1) return msg.reply("Which argument?\n\nArguments: `message`\n\n__**NOTE**__: Can't go over 1500+ charcters!");
   
   if (args.length > 1500) {
      msg.channel.send("Command `shitpost` can use over 1500 characters!")
      return;
   }
   
   const emojifyTest = new emojify.Emojify(args.join(" "));
   
   msg.channel.send(emojifyTest.emojify());
   
   });
}

// t i m e t o g i b c r e d i t to Skweezi Leekz#2426 OwO