let Deezer = require("deezer-node-api");
let DZ = new Deezer();
let { RichEmbed } = require("discord.js");

exports.run = (bot, msg, args) => {
   if (args.length < 1) return msg.reply("Must provide arguments!\n\nArgs 1: `song`\n\nArgs 2: `search`");
   
   if (msg.content.includes(` song`)) {
      dz.findTracks(args.join(" ")).then((result) => {
         let embed = new RichEmbed()
           .setTitle(`${msg.author.username} searched up for: ${result[0].name}`)
           .setDescription(`Link: ${result[0].link}`)
           .addField("Deezer Rank:", result[0].rank, true)
           .addField("Duration", result[0].duration + " seconds", true)
           .addField("Explicit?", result.data[0].explicit_lyrics, true)
           .setFooter(`Infomation came from the Deezer API!`)
        msg.channel.send({embed});
      }).catch((e) => {
        if (e.code === '404') {
           msg.channel.send(`**NO results found!**`)
           return;
        }
        
        msg.channel.send(`Error :eyes:\n\nError Code: ${e.code}\n\nTraceback: \`\`\`js\n${e.stack}\`\`\``);
      });
   }
}