const sql = require('sqlite');
let config = require('../lib/config.json');
sql.open('../database/YumiDB.sqlite');
exports.run = (bot, msg, args) => {
  if (msg.channel.type === 'dm') return;
  sql.get(`SELECT * FROM guilds WHERE guildID = ${msg.guild.id}`).then(guild => {
    if (!guild) {
      msg.channel.send("**Adding " + msg.guild.name + "to the database!**")
    } else {
      if (msg.content.includes(` prefix`)) {
          if (msg.member.permissions.has(`ADMINISTRATOR`) && msg.author.id != '280158289667555328' && msg.author.id != '145557815287611393') return msg.reply("You don't has permissions to change my prefix\n\n**Permission Needed**: `ADMIN`");
          let prefix = msg.content.split(" ").slice(2).join(" ")
          if (!prefix) {
              msg.channel.send(`Changed prefix to \`${guild.prefix}\` to \`y/\`.`)
              return sql.run(`UPDATE guilds SET prefix = 'y/' WHERE guildID = ${msg.guild.id}`)
          }
      }
      if(prefix === guild.prefix) return msg.reply("That's the prefix!");
      msg.channel.send(`Prefix: \`${guild.prefix}\` -> New Prefix: \`${prefix}\``)
      sql.run(`UPDATE guilds SET prefix = '${prefix}' WHERE guildID = ${msg.guild.id}`)
    }
  })
};