exports.run = (bot, msg) => {
  let guild = msg.guild;

  const { RichEmbed } = require('discord.js');
  const embed = new RichEmbed()
    .setTitle(`Server Info for ${guild.name}`)
    .setDescription("Guild Prefix: `y/`")
    .setThumbnail(guild.iconURL)
    .setColor('ff70c6')
    .addField("Server Members", guild.memberCount, true)
    .addField("Guild Owner (Tag/User)", `${guild.owner}/${guild.owner.user.tag}`, true)
    .addField("Guild Region", guild.region, true)
    .addField("Guild Roles", `\`\`\`\n${guild.roles.map(r => r.name).join(",  ")}\`\`\``, true)
    .addField("Default Channel", 'Discord changed the default channel shit.', true)
    .addField("Guild created:", guild.createdAt.toUTCString(), true)
    .setTimestamp()
    .setFooter("YumiBot — Made by August#1793")
  msg.channel.send({embed});
}
