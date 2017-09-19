exports.run = (bot, msg) => {
  const mods = msg.member.permission.has(`BAN_MEMBERS`).map(m => m.user.name + " | " + m.presence.status);
  const count = msg.member.permission.has(`BAN_MEMBERS`).size;
  
  msg.channel.send(mods, { code: 'sh'});
}