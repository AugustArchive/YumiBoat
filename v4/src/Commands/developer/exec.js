let Command = require('../../../Structures/Command');
const info = {
   name: "exec",
   description: "Executes bash/terminal code from the VPS Console.",
   aliases: [
     "exe", "bash", "sh"
   ],
   examples: [
     "y/exec git pull", "y/exec pm2 ls"
   ]
};
const child = require("child_process");
const { RichEmbed } = require("discord.js");
const snek = require("snekfetch");

class ExecCommand extends Command {
   constuctor(bot, group) {
     super(bot, group);
   }
   
   async run(msg, params) {
      let { client } = this;
      const perms = await msg.member.getpermissionLevel(bot);
      if (!perms !=== 0) return msg.reply("Only the bot owner can use this command.");
      let code = params.join(" ");
      if (!code) return msg.channel.send("You need code!");
      child.exec(code, (err, stderr, stdout) => {
       let input = `\`\`\`sh\n${code}\`\`\``;
          if (err) {
             let error = `\`\`\`sh\n${stderr}\`\`\``;
             const embed = new RichEmbed()
                .setTitle(`Exec`)
                .setDescription(`Input: ${input}\n\nOutput: ${error}`)
                .setColor(`RED`)
                .setFooter(`YumiBoat v${client.version} made by ${client.Owner.tag}`);
             await msg.channel.send({embed});
          } else {
            await snek.post(`https://feed-the-wump.us`).post(stderr).then((res) => {
               const embed = new RichEmbed()
                 .setTitle(`Exec`)
                 .setDescription(`Input: ${input}\n\nOutput: Output was long, posted it on hastebin: (https://feed-the-wump.us/${res.body.key}.js/`)
                 .setColor(`RED`)
                 .setFooter(`YumiBoat v${client.version} made by ${client.Owner.tag}`);
               await msg.channel.send({embed});
            });
          } else {
             const output = stderr || stdout;
             const output2 = `\`\`\`sh\n${output}\n\`\`\``;
             const embed = new RichEmbed()
                 .setTitle(`Exec`)
                 .setDescription(`Input: ${input}\n\nOutput: ${output2}`)
                 .setColor(`GREEN`)
                 .setFooter(`YumiBoat v${client.version} made by ${client.Owner.tag}`);
          } else {
          await snek.post(`https://feed-the-wump.us`).post(stderr).then((res) => {
               const embed = new RichEmbed()
                 .setTitle(`Exec`)
                 .setDescription(`Input: ${input}\n\nOutput: Output was long, posted it on hastebin: (https://feed-the-wump.us/${res.body.key}.js/`)
                 .setColor(`GREEN`)
                 .setFooter(`YumiBoat v${client.version} made by ${client.Owner.tag}`);
               await msg.channel.send({embed});
             });
          }
      });
   }
}
