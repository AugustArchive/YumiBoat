exports.run = function(client, message, args, logger) {
    if(!client.guilds.filter(g => ((g.members.filter(u => u.user.bot).size / g.memberCount) * 100) > 0.65 && g.memberCount > 100)) return msg.channel.send(`\🤖\` **${msg.author.username}** \`|\` No more bot farms! ayy`)
    msg.channel.send(`[10 Max.] All bot farms:\n\n${client.guilds.filter(g => ((g.members.filter(u => u.user.bot).size / g.memberCount) * 100) > 0.65 && g.memberCount > 100).map(c=>`[${c.memberCount} Members] ${c.name}`).slice(0, 10).join('\n')}`, {code : 'css'})
};