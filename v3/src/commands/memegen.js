let snek = require("snekfetch");
let { RichEmbed } = require("discord.js");

exports.run = (bot, msg, args) => {
   if (args.length < 1) return msg.reply("Must add 2 arguments!\n\nCommand: `y/memegen [top-like-this] [bottom-like-this`\n\nExample: `y/memegen Should-I Be-A-Doge");
    
    snek.get(`https://memegen.link/api/templates/doge/${args[0]}/${args[1]}`).then((r) => {
       let meme = JSON.parse(r.body);
       msg.channel.send({embed: {
          description: `YumiBoat Meme Generator`,
          image: {
            url: r.body.direct.usable
          }
       }
    });
    if (args.length > 3) {
        msg.channel.send("Pls, only 2 args!")
        return;
    }
  });
}