const { RichEmbed } = require('discord.js');
let DiscordE = '#00F7FE';
let Yumi = '#ffb6c1';

exports.run = (bot, msg, args) => {
  let guild = msg.guild;
  
  if (guild.id !== '336039472250748928' && guild.id !== '332957805432799243') return msg.reply("Only moderation commands can go in My server & Discord Emoji!");
  
  if (args.length < 1) return msg.reply("Need arguments!\n**Welcome** to the modern moderation module!\nArgs1: `ban` `kick` `mute` `unmute` `unban`\nArgs2: `[REASON]`\nIf reason isn't specified; You do `y/mod reason [case] [reason]`\n\n**Discord Emoji**: Use `y/mod [mod-command]-de` to use\n\n**August's Server**: Use `y/mod [mod-command]-yumi` to use on that server.");
  
  if (args[1] === 'kick-de') {
    if (!msg.member.permission.has(`KICK_MEMBERS`)) return msg.reply("You will need to have `KICK_MEMBERS` permission.");
    const reason = args.slice(2).join(' ');
    const user = message.mentions.users.first();
    let modlog = bot.channels.get('356366894829142016');
    if (reason.length < 1) {
      reason = `No reason specified.`;
    } else {
      reason = `${reason}`;
    }
    if (!user) return msg.reply("Need to mention a user.");
    if (!msg.guild.member(user).kickable) return msg.reply('Can\'t kick that member, is he higher then me?');
    msg.guild.member(user).kick();
    
   let embed = new RichEmbed()
     .setTitle("I have kicked someone!")
     .setDescription(`Someone kicked a user!`)
     .setColor(DiscordE)
     .addField("Action", 'Kick', true)
     .addField("Responsible Moderator", msg.author.tag, true)
     .addField("Reason:", reason, true);
    return bot.channels.get(modlog).send({embed});
  }
    if (args[1] === 'kick-yumi') {
    if (!msg.member.permission.has(`KICK_MEMBERS`)) return msg.reply("You will need to have `KICK_MEMBERS` permission.");
    const reason = args.slice(2).join(' ');
    const user = message.mentions.users.first();
    let modlog = bot.channels.get('352667262450139150');
    if (reason.length < 1) {
      reason = `No reason specified.`;
    } else {
      reason = `${reason}`;
    }
    if (!user) return msg.reply("Need to mention a user.");
    if (!msg.guild.member(user).kickable) return msg.reply('Can\'t kick that member, is he higher then me?');
    msg.guild.member(user).kick();
    
   let embed = new RichEmbed()
     .setTitle("I have kicked someone!")
     .setDescription(`Someone kicked a user!`)
     .setColor(Yumi)
     .addField("Action", 'Kick', true)
     .addField("Responsible Moderator", msg.author.tag, true)
     .addField("Reason:", reason, true);
    return bot.channels.get(modlog).send({embed});
  }
  if (args[1] === 'ban-de') {
    if (!msg.member.permission.has(`BAN_MEMBERS`)) return msg.reply("You will need to have `BAN_MEMBERS` permission.");
    const reason = args.slice(2).join(' ');
    const user = message.mentions.users.first();
    let modlog = bot.channels.get('356366894829142016');
    if (reason.length < 1) {
      reason = `No reason specified.`;
    } else {
      reason = `${reason}`;
    }
    if (!user) return msg.reply("Need to mention a user.");
    if (!msg.guild.member(user).kickable) return msg.reply('Can\'t ban that member, is he higher then me?');
    msg.guild.ban(user, 2);
    
    let embed = new RichEmbed()
      .setTitle("I have banned someone!")
      .setDescription(`${msg.author.tag} banned someone!`)
      .setColor(DiscordE)
      .addField("Action", 'Un/ban', true)
      .addField("Responsible Moderator:", msg.author.tag, true)
      .addField("Reason", reason, true)
    return bot.channels.get(modlog).send({embed});
  }
    if (args[1] === 'ban-yumi') {
    if (!msg.member.permission.has(`BAN_MEMBERS`)) return msg.reply("You will need to have `BAN_MEMBERS` permission.");
    const reason = args.slice(2).join(' ');
    const user = message.mentions.users.first();
    let modlog = bot.channels.get('356366894829142016');
    if (reason.length < 1) {
      reason = `No reason specified.`;
    } else {
      reason = `${reason}`;
    }
    if (!user) return msg.reply("Need to mention a user.");
    if (!msg.guild.member(user).kickable) return msg.reply('Can\'t kick that member, is he higher then me?');
    msg.guild.ban(user, 2);
    
    let embed = new RichEmbed()
      .setTitle("I have banned someone!")
      .setDescription(`${msg.author.tag} banned someone!`)
      .setColor(Yumi)
      .addField("Action", 'Un/ban', true)
      .addField("Responsible Moderator:", msg.author.tag, true)
      .addField("Reason", reason, true)
    return bot.channels.get(modlog).send({embed});
  }
};