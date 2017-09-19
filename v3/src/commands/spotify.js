const { RichEmbed } = require('discord.js');
let snek = require("snekfetch");

exports.run = (bot, msg, args) => {
  if (args.length < 1) return msg.reply("Add a param!\n\npossible inputs: <https://open.spotify.com/track/4SUBEjh0WcaPXNeBpuRC7a> `spotify:track:4SUBEjh0WcaPXNeBpuRC7a` `4SUBEjh0WcaPXNeBpuRC7a`");
  
      let input = args.join(' ')
        .replace('https://open.spotify.com/track/', '')
        .replace('spotify:track:', '');
        
    snekfetch.get(`https://api.spotify.com/v1/tracks/${input}`).then((r) => {
      let data;
      
      try {
        data = JSON.parse(r.body);
      } catch(e) {
       msg.channel.send(`SpotifyAPI returned weird data, here it is: \`\`\`js\nError Code: ${e.code}\n\nTraceback: ${e.body}\`\`\``);
      }
      
      if (data['type'] === 'track') {
        let artists = [];
        
        data['artists'].forEach((artists) => {
          artists.push(artist.name);
        }, this);
        
            let duration_m = Math.floor(data.duration_ms / 60000);
            let duration_s = ((data.duration_ms % 60000) / 1000).toFixed(0);
            
            let embed = new RichEmbed()
              .setTitle("Listen now! :spotify:")
              .setDescription(`${msg.author.username} wants to listen to:`)
              .addField("Artist(s)", artists.join(', '), true)
              .addField(":spotify: Title", data.name, true)
              .addField("Explict?", `${(data.explict) ? 'This is a explict song.' : 'No'}`, true)
              .addField("Popularity", `${data.popularity}%`, true)
              .addField("Duration", `${(duration_s == 60 ? (duration_m + 1) + ':00' : duration_m + ':' + (duration_s < 10 ? '0' : '') + duration_s) + 'min'}`, true)
              .addField("Markets", `${data.name} is available on ${data.available_markets.length} markets`, true)
              .setFooter("Spotify Track info!")
              .setColor([30, 215, 96])
            msg.channel.send({embed});
      } else {
        msg.channel.send(`No info found for ${input}`);
      }
    }.catch(err => {
      msg.channel.send(`SpotifyAPI returned an error!\n\nError Code: ${err.body}\n\nTraceback: \`\`\`js\n${err.stack}\`\`\``);
    });
};