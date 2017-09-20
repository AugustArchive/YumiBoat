let Command = require('../../../Structures/Command');
const info = {
   name: "exec",
   description: "Executes bash/terminal code from the VPS Console.",
   aliases: [],
   examples: ['y/eval msg.channel.send("Test");', 'y/eval console.log('shit')']
};
const { RichEmbed } = require("discord.js");
const snek = require("snekfetch");

class EvalCommand extends Command {
   constructor(bot, group, info) {
      super(bot, group, info);
   }
   
   async run(msg, params) {
      const perms = await msg.member.getPermissionsLevel(bot);
      if (perms === 0) return msg.channel.send("Only the bot owner can use this command.");
    const code = params.join(' ');
		const token = this.bot.token.replace(`-- bot token --`)
		const filter = new RegExp(`${token}`, 'g');
		const input = `\`\`\`js\n${code}\n\`\`\``;
    if (!code) {
      msg.channel.send("Didn't provide code.");
      this.bot.channels.get("").send(`[__**${msg.author.username}**__] Tried the \`eval\` command but didn't provide arguments`);
      return;
    }
    
  msg.channel.send(code { code: 'js' }).then(mes => {
    try {
      if (output instanceof Promise) output = await output;
			let type = typeof output;
			output = util.inspect(output, { depth: 0 });
			output = output.replace(filter, '[TOKEN]');
			output = `\`\`\`js\n${output}\n\`\`\``;
      
      	if (output.length < 1900) {
				const embed = new RichEmbed()
        .setTitle(`**Evaluation**`)
        .setDescription(`Type: **${type}**`)
				await msg.channel.send({ embed });
    }
  });
 }
}
