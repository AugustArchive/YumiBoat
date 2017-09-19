const ytdl = require('ytdl-core');

exports.run = (bot, msg, args) => {
  msg.channel.send("Resuming player!").then(connection => {
    let stream = ytdl(args.join(" "), { filter: 'audioonly' });
    let dispatcher = connection.playStream(stream);
    
    dispatcher.resume();
    msg.edit("Resumed player!");
  });
};