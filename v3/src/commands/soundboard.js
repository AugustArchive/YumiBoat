const { RichEmbed } = require("discord.js");
let ytdl = require("ytdl-core");

exports.run = (bot, msg, args) => {
  let memey = new RichEmbed()
    .setTitle(`YumiBoat - Soundboard`)
    .setDescription("Welcome to my soundboard functionality.")
    .addField("Current Memes:", '`England Is My City` `England Is My Owl City`', true)
    .addField("**NOTE(s)**:", 'Suggest some at my support server!\nAll soundboard stuff does: `y/soundboard [meme]`!', true)
    .setFooter(`Have fun.`);
  if (args.length < 1) return msg.channel.send({embed: memey});

  if (msg.content.includes(` england is my city`)) {
    let voiceChan = msg.member.voiceChannel;

    if (!voiceChan) return msg.reply("If you wanna meme out, go to a voice channel!");

    voiceChan.join()
    .then(connection => {
        let stream = ytdl("https://www.youtube.com/watch?v=a-5VCZyAMz0", { filter: 'audioonly', quality: 'highest'});
        let dispatcher = connection.playStream(stream);

        msg.channel.send(`[**SOUNDBOARD**] Now playing **England is my city** meme!`);

        dispatcher.on("end", () => {
            msg.channel.send(`[**SOUNDBOARD**] Ending meme, now leaving voice channel.`)
            voiceChan.leave();
        });

        dispatcher.on("error", (err) => {
          msg.channel.send(`[**SOUNDBOARD**] Soundboard gave a error!\n\nError Code: ${e.code}\n\nTraceback: \`\`\`js\n${e.stack}\`\`\``);
          console.log(`[SOUNDBOARD] [COMMAND ERROR] An error has occured!\n\n${e.stack}`)
          bot.channels.get("").send(e.stack, { code: 'js'});
        });
    });
  }

  if (msg.content.includes(` england is my owl city`)) {
    let voiceChan = msg.member.voiceChannel;

    if (!voiceChan) return msg.reply("If you wanna meme out, go to a voice channel!");

    voiceChan.join()
    .then(connection => {
        let stream = ytdl("https://www.youtube.com/watch?v=Xc8jeG7BDp0", { filter: 'audioonly', quality: 'highest'});
        let dispatcher = connection.playStream(stream);

        msg.channel.send(`[**SOUNDBOARD**] Now playing **England is my owl city** meme!`);

        dispatcher.on("end", () => {
            msg.channel.send(`[**SOUNDBOARD**] Ending meme, now leaving voice channel.`)
            voiceChan.leave();
        });

        dispatcher.on("error", (err) => {
          msg.channel.send(`[**SOUNDBOARD**] Soundboard gave a error!\n\nError Code: ${e.code}\n\nTraceback: \`\`\`js\n${e.stack}\`\`\``);
          console.log(`[SOUNDBOARD] [COMMAND ERROR] An error has occured!\n\n${e.stack}`)
          bot.channels.get("").send(e.stack, { code: 'js'});
        });
    });
  }
}