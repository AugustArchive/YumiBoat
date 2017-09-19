const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const config = require('../lib/config.json');

let certified = '<:certifiedbot:308880575379275776>';
const oterBotInfo = (id, msg) => {
   snekfetch.get(`https://bots.discord.pw/api/${id}`)
   .set("Authorization", config.api_keys.discordBoats)
   .then((res) => {
      const mebed = new RichEmbed()
        .setTitle(`Bot info!`)
        .setColor('ff70c6')
        .setThumbnail('https://cdn.discordapp.com/avatars/' + id + '/a_' + r.body.avatar + '.webp')
        .addField("ID:", res.body.id, true)
        .addField("Description:", res.body.description, true)
        .addField("Library:", res.body.library, true)
        .addField("Website:", `${(res.body.website) ? res.body.website : "No website."}`, true)
        .addField("Owner(s)", res.body.owner_ids.map((id) => "<@" + id + ">").join(" "), true);
    msg.channel.send({embed});
   }).catch((err) => {
       msg.channel.send(`An error has occured!\n\nError Code: ${err.code}\n\nTraceback: \`\`\`js\n${err.stack}\`\`\``);
   });
}
const botInfo = (id, msg) => {
  snekfetch.get(`https://discordbots.org/api/bots/${id}`)
  .then((r) => {
     const embed = new RichEmbed()
      .setTitle(`Bot info!`)
      .setThumbnail('https://cdn.discordapp.com/avatars/' + id + '/a_' + r.body.avatar + '.webp')
      .setColor('ff70c6')
      .addField("ID:", r.body.id, true)
      .addField("Short Description:", r.body.shortdesc, true)
      .addField("Library:", r.body.lib, true)
      .addField("Prefix:", r.body.prefix, true)
      .addField("Tag:", r.body.username + '#' + r.body.discriminator, true)
      .addField("Certified? " + certified, r.body.certifiedBot, true)
      .addField("Upvotes (Updoots!):", r.body.points, true)
      .addField("Server Count | Shards", `**${r.body.server_count || 'No server count.'}** | **${r.body.shard_count  || 'No shard count'}**`, true)
      .addField("Owners", '<@' + r.body.owners.join('>\n<@') + '>', true)
      .addField("Invite:", `[Click here](https://discordapp.com/oauth2/authorize?scope=bot&permissions=0&client_id${id}/)`, true)
      .addField("DiscordBots.org Link:", `[Link](https://discordbots.org/bot/${id})`, true)
     msg.channel.send({embed});
  }).catch((e) => {
      msg.channel.send(`An error has occured!\n\`\`\`js\n${e.stack}\`\`\`\nThis should't happen! Report it at my server! ${config.invite}`)
  });
}

exports.run = (bot, msg, args) => {
  if (args.length < 1) return msg.reply("Need 2 arguments!\n\nArgument 1: DBL or DB\n\nArgument 2: mention or id")
  
  if (msg.content.includes(` dbl`)) {
     let boat = args.join(" ");
   if(msg.mentions.users.first()) {
      botInfo(msg.mentions.users.first().id, msg);
   } else {
      botInfo(boat[0], msg);
    }
  }
  
  if (msg.content.includes(` db`)) {
           let boat = args.join(" ");
   if(msg.mentions.users.first()) {
      botInfo(msg.mentions.users.first().id, msg);
   } else {
      botInfo(boat[0], msg);
    }
  }
}