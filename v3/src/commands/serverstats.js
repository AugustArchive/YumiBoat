const Discord = require('discord.js');
exports.run = function(bot, msg) {
        var bot_farms = bot.guilds.filter(g => ((g.members.filter(u => u.user.bot).size / g.memberCount) * 100) > 0.65 && g.memberCount > 100).size;
        var tiny_servers = bot.guilds.filter(g => g.memberCount < 25).size;
        var small_servers = bot.guilds.filter(g => g.memberCount < 100 && g.memberCount >= 25).size;
        var normal_servers = bot.guilds.filter(g => g.memberCount < 500 && g.memberCount >= 100).size;
        var large_servers = bot.guilds.filter(g => g.memberCount < 1000 && g.memberCount >= 500).size;
        var massive_servers = bot.guilds.filter(g => g.memberCount < 5000 && g.memberCount >= 1000).size;
     let embed = new Discord.RichEmbed()
       .setTitle("YumiBoat | Server Sizes")
       .setColor('ff70c6')
       .addField("Bot Farms:", `${bot_farms}`)
       .addField("Tiny Servers (<25):", `${tiny_servers}`, true)
       .addField("Small Servers (<100)", `${small_servers}`, true)
       .addField("Normal Servers (<500)", `${normal_servers}`, true)
       .addField("Large Servers (<1000)", `${large_servers}`, true)
       .addField("Massive Servers (<5000)", `${massive_servers}`, true)
     msg.channel.send({embed: embed})
};