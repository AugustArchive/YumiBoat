/**
__   __                   _ ______                _
\ \ / /                  (_)| ___ \              | |
\ V /  _   _  _ __ ___   _ | |_/ /  ___    __ _ | |_
\ /  | | | || '_ ` _ \ | || ___ \ / _ \  / _` || __|
| |  | |_| || | | | | || || |_/ /| (_) || (_| || |_
\_/   \__,_||_| |_| |_||_|\____/  \___/  \__,_| \__|


  * @file - Yumi's main file.
  * @author - ohlookitsAugust#1793
**/
const { Client } = require('discord.js');
const logger = require('./lib/logger.js');
const config = require('./lib/config.json');
const bot = new Client({
  disableEveryone: true,
  autoReconnect: true,
  disabledEvents: [
    'TYPING_START',
    'RELATIONSHIP_ADD',
    'RELATIONSHIP_REMOVE'
  ]
});
const snekfetch = require('snekfetch');
// let prefix = 'y/';
// const sql = require('sqlite');
// sql.open('./Database/YumiDB.sqlite');

var StatsD = require('node-dogstatsd').StatsD;
var dogstatsd = new StatsD();


function postServerStats() {
   // post to discordbots.org
   snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
   .set("Authorization", config.api_keys.oliyBots)
   .send({
     server_count: bot.guilds.size,
     shard_id: bot.shard.id,
     shard_count: bot.shard.count
   })
   .then(logger.info(`[discordbots.org] Posted Stats!`))
   .catch(e => logger.error(e.body))

   // post to bots.discord.pw
   snekfetch.post(`https://bots.discord.pw/api/bots/${bot.user.id}/stats`)
   .set("Authorization", config.api_keys.discordBoats)
   .send({
     server_count: bot.guilds.size
   })
   .then(logger.info(`[bots.discord.pw] Posted Stats!`))
   .catch(e => logger.error(e.body))
   
   snekfetch.post(`http://discord.services/api/bots/${bot.user.id}`)
   .set("Key", config.api_keys.directory)
   .send({ guild_count: bot.guilds.size })
   .then(logger.info(`[discord.services] Posted Stats!`))
   .catch(e => logger.error(e.body))
}

function setGame() {
  let games = [
    "With August! OwO",
    `On ${bot.guilds.size} guilds on ${bot.shard.id}!`,
    "With a ball of yarn!",
    "With Aqua-sama",
    "With Mio-chan",
    "Facing Ayana",
    "With my Lucario plush!",
    "With my Umbreon plushie!",
    "With Wessel! OwO",
    "With Hansen! OwO",
    "With Desii! OwO",
    "With Mantaro-chan",
    "When will Rem notice me?",
    "Snekfetch is bae, Snekfetch is life. <3",
    "Discord.js is bae.",
    "Eris? Thinking..",
    "Tsukasa is better then me!",
    "Facing Dyno",
    "Mee6 is meh.",
    "Warm milk is nice."
  ];
  bot.user.setPresence({
    status: 'online',
    afk: 'false',
    game: {
      name: `y/help | ${games[Math.floor(Math.random() * games.length)]} [${bot.shard.id}]`,
      type: 0
    }
  });
}


bot.on('ready', () => {
  setGame();
  postServerStats();
  bot.setInterval(setGame, 50000);
  bot.setInterval(collectBotStats, 5000)
  bot.setInterval(collectTechStats, 5000)
  logger.info(`[READY] YumiBot is ready on Shard ${bot.shard.id}!`);
  dogstatsd.increment('yumiboat.core.ready', 1)
});

bot.on('guildCreate', guild => {
   postServerStats();
   bot.channels.get('358052869515116548').send(`Joined a new server! ;D\nGuild Name (ID): ${guild.name} (${guild.id})`)
   logger.info(`[GUILD] Joined a new server! ;D\nGuild Name (ID): ${guild.name} (${guild.id})`)
   dogstatsd.increment('yumiboat.guild.join', 1)
});
bot.on('guildDelete', guild => {
  postServerStats();
  bot.channels.get('358052869515116548').send(`Lefted a new server! D:\nGuild Name (ID): ${guild.name} (${guild.id})`)
  logger.info(`[GUILD] Lefted a new server! D:\nGuild Name (ID): ${guild.name} (${guild.id})`)
  dogstatsd.increment('yumiboat.guild.left', 1)
});

bot.on('message', msg => {
  dogstatsd.increment('yumiboat.core.messages.seen')
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) return;

  const args = msg.content.split(" ");
  const command = args.shift().slice(config.prefix.length)

  try {
     collectCommandStats();
     let commandFile = require(`./commands/${command}.js`)
     commandFile.run(bot, msg, args)
     dogstatsd.increment('yumiboat.core.commands.run', 1)
    } catch (err) {
      logger.error(`[COMMAND ERR] Command Error!\n${err.stack}`);
      dogstatsd.increment('yumiboat.core.commands.error', 1)
   }
});

bot.on('error', e => {
    logger.error(e.stack);
    dogstatsd.increment('yumiboat.core.error', 1)
});
bot.on('warn', e => { 
    logger.warn(e.stack) 
    dogstatsd.increment('yumiboat.core.warn', 1)
});
process.on('unhandledRejection', e => {
  logger.error(`[UNHANDLEDREJECTION] ${e.stack}`);
  dogstatsd.increment('yumiboat.core.unhandledRejection', 1)
});

bot.login(config.api_keys.Discord);

function collectCommandStats() {
    dogstatsd.increment('yumiboat.core.commands.total')
}

async function collectBotStats() {
    dogstatsd.gauge('yumiboat.core.guilds.total', bot.guilds.size)
	dogstatsd.gauge('yumiboat.core.users.total', bot.users.size)
	dogstatsd.gauge('yumiboat.core.music.voiceConnections.total', bot.voiceConnections.size)
	
}

async function collectTechStats() {
    let memUsage = process.memoryUsage()
	dogstatsd.gauge('yumiboat.core.ram.rss', (memUsage.rss / 1048576).toFixed())
	dogstatsd.gauge('yumiboat.core.ram.heapUsed', (memUsage.heapUsed / 1048576).toFixed())
}