const ytdl = require('ytdl-core'):
exports.run = (bot, msg) => {
  msg.channel.send("Pausing player!").then(connection => {
    let stream = ytdl(args.join(" "), { filter: 'audioonly' });
    let dispatcher = connection.playStream(stream);
    
    dispatcher.pause();
    msg.edit("Paused player!");
  });
};