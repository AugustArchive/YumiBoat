const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const config = require('../lib/config.json');

exports.run = (bot, msg) => {
  snekfetch.get(`https://discordbots.org/api/bots/${bot.user.id}/votes`)
  .set("Authorization", config.api_keys.oliyBots)
  .then(r => {
    msg.channel.send(`__Upvote YumiBot__\nWhy? Because: \`\`\`asciidoc\n= Why to upvote Yumi?=\nRewards :: Access to upvoter commands etc. More rewards soon!\`\`\`\nJoin these ${r.body.length} upvoters today!\n<https://discordbots.org/bot/${bot.user.id}>`);
  }).catch((e) => {
      msg.channel.send(`__Upvote YumiBot__\nWhy? Because: \`\`\`asciidoc\n= Why to upvote Yumi?=\nRewards :: Access to upvoter commands, etc. More rewards soon!\`\`\`\nJoin today!\n<https://discordbots.org/bot/${bot.user.id}>`);
  });
};