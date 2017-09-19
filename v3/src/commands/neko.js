exports.run = (bot, msg) => {
  require("snekfetch").get("https://nekos.life/api/neko").then(r => {
    msg.channel.send({
     embed: {
       image: {
         url: r.body.neko
       },
       color: 0xff70c6
       }
    })
  }).catch((e) => {
    msg.channel.send("An error has occured!\n\n❯ Error: ```js\n" + e.stack + "```");
  });
};
