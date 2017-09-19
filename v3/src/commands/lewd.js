exports.run = (bot, msg) => {
  if (!msg.channel.nsfw) return msg.reply("Only in NSFW channels OwO");
  
  if (msg.channel.nsfw) {
  require("snekfetch").get(`https://nekos.life/api/lewd/neko`).then((body) => {
    msg.channel.send({
      embed: {
        color: 0xff70c6,
        image: {
          url: body.body.neko
        },
       footer: {
        text: `OwO! Mew!`
       }
      }
    })
  }).catch((e) => {
    msg.channel.send(`:x: An error has occred while processing command!\nError Code:\n\`\`\`js\n${e.stack}\`\`\`\nJoin the support server with \`y/commands\`!`);
    console.error();
  });
 }
};