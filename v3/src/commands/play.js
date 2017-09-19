const yt = require('ytdl-core');
const config = require('../lib/config.json');
const ytid = require('get-youtube-id');
const hd = require("humanize-duration");
const util = require("util");
const ytnode = require("youtube-node");
const ytd = new ytnode();
youtube.setKey(config.api_keys.youtube);

exports.run = (bot, msg, args) => {
  if (msg.channel.type === "dm") return msg.channel.send("can't be in a dm, soz bud.");
  if (msg.member.voiceChannel) {
      if (msg.content.split(" ").length > 1) {
          if (msg.content.split(" ").slice(1).join(" ").match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/)) {
              ytdl.getInfo(msg.content.split(" ").slice(1).join(" "), (error, callback) => {
                  if (error) return msg.channel.send("spoopy error!");
                  if (msg.member.voiceChannel.queue) {
                      if (msg.member.voiceChannel.queue.songs.length > 24) return msg.channel.send("can play only 25 songs.");
                      msg.member.voiceChannel.queue.songs[msg.member.voiceChannel.queue.songs.length] = {
                          userID: msg.author.id,
                          videoID: getyoutubeid(msg.content.split(" ").slice(1).join(" ")),
                          title: callback.title,
                          duration: humanizeduration(callback.length_seconds * 1000, {
                              language: "shortEn",
                              spacer: "",
                              round: true,
                              delimiter: "",
                              languages: {
                                  shortEn: {
                                      y: function () {
                                          return "y"
                                      },
                                      mo: function () {
                                          return "mo"
                                      },
                                      w: function () {
                                          return "w"
                                      },
                                      d: function () {
                                          return "d"
                                      },
                                      h: function () {
                                          return "h"
                                      },
                                      m: function () {
                                          return "m"
                                      },
                                      s: function () {
                                          return "s"
                                      },
                                      ms: function () {
                                          return "ms"
                                      },
                                  }
                              }
                          })
                      };
                      msg.channel.send("Added `" + callback.title + "` to the queue!\nPosition `#" + msg.member.voiceChannel.queue.songs.length "`.")
                      msg.channel.send({
                          embed: {
                              title: "Added!",
                              color: 3066993,
                              description: "Added `" + callback.title + "` to the queue. Position `#" + msg.member.voiceChannel.queue.songs.length + "`."
                          }
                      });
                  } else {
                      msg.member.voiceChannel.queue = {
                          songs: [{
                              userID: msg.author.id,
                              videoID: getyoutubeid(msg.content.split(" ").slice(1).join(" ")),
                              title: callback.title,
                              duration: humanizeduration(callback.length_seconds * 1000, {
                                  language: "shortEn",
                                  spacer: "",
                                  delimiter: "",
                                  languages: {
                                      shortEn: {
                                          y: function () {
                                              return "y"
                                          },
                                          mo: function () {
                                              return "mo"
                                          },
                                          w: function () {
                                              return "w"
                                          },
                                          d: function () {
                                              return "d"
                                          },
                                          h: function () {
                                              return "h"
                                          },
                                          m: function () {
                                              return "m"
                                          },
                                          s: function () {
                                              return "s"
                                          },
                                          ms: function () {
                                              return "ms"
                                          },
                                      }
                                  }
                              })
                          }],
                          vote_skips: [],
                          leave: false,
                          ytdl: null,
                          pipe: null
                      };
                      msg.member.voiceChannel.join().then((stream) => {
                          msg.channel.send("joined ur channel.");
                          const checkqueue = () => {
                              ytdl.getInfo(msg.member.voiceChannel.queue.songs[0].videoID, (error, info) => {
                                  if (error) {
                                      msg.channel.send("spoopy err.");
                                      return msg.member.voiceChannel.leave();
                                  }
                                  msg.channel.send("now playing **" + info.title + "**.");
                                  msg.member.voiceChannel.queue.ytdl = ytdl(msg.member.voiceChannel.queue.songs[0].videoID, {
                                      filter: "audioonly"
                                  });
                                  msg.member.voiceChannel.queue.pipe = stream.playStream(msg.member.voiceChannel.queue.ytdl);
                                  msg.member.voiceChannel.queue.pipe.once("end", () => {
                                      msg.member.voiceChannel.queue.ytdl.destroy();
                                      msg.member.voiceChannel.queue.vote_skips = [];
                                      msg.member.voiceChannel.queue.ytdl = null;
                                      msg.member.voiceChannel.queue.songs.shift();
                                      if (msg.member.voiceChannel.queue.songs.length > 0) {
                                          checkqueue();
                                      } else {
                                          delete msg.member.voiceChannel.queue;
                                          msg.member.voiceChannel.leave();
                                          msg.channel.send("queue has been completed.");
                                      }
                                  });
                                  msg.member.voiceChannel.queue.pipe.once("error", (error) => {
                                      console.error("Error while playing audio.", error);
                                      msg.member.voiceChannel.queue.songs.shift();
                                      if (msg.member.voiceChannel.queue.songs.length > 0) {
                                          msg.channel.send("skipping...");
                                          msg.member.voiceChannel.queue.pipe.end();
                                      } else {
                                          msg.member.voiceChannel.leave().then(() => {
                                              delete msg.member.voiceChannel.queue;
                                              msg.channel.send("skipping song because there is an error")
                                          }).catch(() => {
                                              msg.channel.send("unexpected error");
                                          });
                                      }
                                  });
                                  msg.member.voiceChannel.queue.ytdl.on("error", (error) => {
                                      console.error("Error while playing audio.", error);
                                      msg.member.voiceChannel.queue.songs.shift();
                                      if (msg.member.voiceChannel.queue.songs.length > 0) {
                                          msg.channel.send("skipping bc errors");
                                          msg.member.voiceChannel.queue.pipe.end();
                                      } else {
                                          msg.member.voiceChannel.leave().then(() => {
                                              delete msg.member.voiceChannel.queue;
                                              msg.channel.send("queue is empty; qutting.")
                                          }).catch(() => {
                                              msg.channel.send("an error!")
                                          });
                                      }
                                  });
                              });
                          };
                          checkqueue();
                      }).catch((e) => {
                          msg.channel.send("Can't join ur channel..");
                      });
                  }
              });
          } else {
              youtube.search(msg.content.split(" ").slice(1).join(" "), 3, { type: "video" }, (error, results) => {
                  if (error) {
                      msg.channel.send("Err");
                      return console.error("Failed to search for a video.", error);
                  }
                  msg.channel.send("Choose `1` `2` or `3`,\nTo cancel a command, do `cancel`!").then((m) => {
                      msg.channel.awaitMessages((m) => m.author.id === msg.author.id, {
                          max: 1
                      }).then((m) => {
                          if (m.first().content.toLowerCase() === "cancel") return msg.channel.send("Canceled prompt.");
                          let newevent = Object.create(msg);
                          if (m.first().content === "1") {
                              newevent.content = config.prefix + "play http://youtube.com/watch?v=" + results.items[0].id.videoId;
                              play.execute(bot, newevent, newevent.content.split(" ").slice(1));
                          } else if (m.first().content === "2") {
                              newevent.content = config.prefix + "play http://youtube.com/watch?v=" + results.items[1].id.videoId;
                              play.execute(bot, newevent, newevent.content.split(" ").slice(1));
                          } else if (m.first().content === "3") {
                              newevent.content = config.prefix + "play http://youtube.com/watch?v=" + results.items[2].id.videoId;
                              play.execute(bot, newevent, newevent.content.split(" ").slice(1));
                          } else {
                            msg.channel.send("invalid nombre")
                          }
                      });
                  });
              });
          }
      } else {
          msg.channel.send("Missing Arguments!")
      }
  } else {
      msg.channel.send({
          embed: {
              title: "Error!",
              color: 0xE50000,
              description: "You must be in a voice channel to use this command."
          }
      });
  }
}
}