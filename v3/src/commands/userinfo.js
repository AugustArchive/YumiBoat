const { RichEmbed } = require('discord.js');
exports.run = (bot, msg, args) => {
   if (args.length < 1) return msg.reply("You will need a argument.\nArgument: `user | @mention`.");
   
   let user = msg.mentions.users.first() || msg.author;
   
   let status = {
    online: '<:online:313956277808005120> Online',
	idle: '<:away:313956277220802560> Idle',
	dnd: '<:dnd:313956276893646850> Do Not Disturb (DND)',
    offline: '<:offline:313956277237710868> Offline.'
   }

   let trueorfalse = [
    "This person is not ",
    "This person is "
   ]

   let nick = msg.member.nickname;

   let embed = new RichEmbed()
     .setColor(user.displayHexColor)
     .setTitle(`Userinfo on ${user.tag}`)
     .setDescription("Some infomation on " + user.tag + "'s info.")
     .addField("Discord.", `
     ❯ Mutant Guilds: ${bot.guilds.filter(c => c.members.get(user.user.id)).size} out of ${bot.guilds.size}
     ❯ User: ${user.tag}
     ❯ Nickname?: ${nick}
     `, true)
     .setFooter(`This will be edited.`);
   msg.channel.send({embed});
};