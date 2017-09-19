exports.run = (bot, msg) =>{
  if (msg.author.id != '280158289667555328') return msg.reply(":x:");
  
  msg.channel.send("Restarting!").then(() => {
    console.log(`[REBOOT] My dev told me to restart myself!`)
    process.exit();
  });
};