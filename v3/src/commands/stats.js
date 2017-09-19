const Discord = require('discord.js');
const os = require('os');
const hd = require('humanize-duration');
const version = 'v4.0.0';

exports.run = (bot, msg) => {
  const embed = new Discord.RichEmbed()
    .setTitle("YumiBot — Stats")
    .setColor('ff70c6')
    .setDescription(`❯ Uptime on Shard __${bot.shard.id}__: ${hd(bot.uptime, {round: true})}`)
    .addField("❯ Misc", `
    ❯ Guilds: ${bot.guilds.size}
    ❯ Shards (C/T): ${bot.shard.id}/${bot.shard.count}
    ❯ Users: ${bot.users.size}
    ❯ Channels: ${bot.channels.size}
    ❯ Voice Connections: ${bot.voiceConnections.size}`, true)
    .addField("❯ VPS", `
    ❯ VPS OS: Linux
    ❯ Node.js Version: ${process.version}
    ❯ Discord.js Version: v${Discord.version}
    ❯ Library: [Discord.js](https://discord.js.org)
    ❯ YumiBot Version: ${version}
    ❯ Developers: August#1793`, true)
    .addField("❯ Links", `
    ❯ Website: https://yumibot.party/
    ❯ Commands: \`y/commands\` or https://yumibot.party/commands/
    ❯ Github Repo: https://github.com/ohlookitsAugust/YumiBoat/
    ❯ Credits:
       - iDerp: Helping me to get Yumi's website working
       - Main Developers: Making Yumi she is today.
       - Desiree (Desii): TO make Yumi Python.
       - People who added Yumi: Thanks to all!`, true)
    .setTimestamp()
    .setFooter(`YumiBot — Made by August#1793`)
    msg.channel.send({embed});
}
