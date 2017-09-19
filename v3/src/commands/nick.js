exports.run = (bot, msg, args) => {
   if (args.length < 1) return msg.reply("Need an argument!\nArgument: `nickname`.");

   msg.guild.me.setNickname(args.join(" "));

   msg.channel.send(`Changed my nickname to \`${args.join(" ")}\``);
}