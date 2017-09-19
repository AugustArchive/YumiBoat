const Kitsu = require('kitsu.js');
const kitsu  = new Kitsu();
exports.run = (client, msg, params) => {
    if (params.length < 1) return msg.reply('You must add a word to search for');
    msg.channel.send(":ok_hand: Fetching anime from Kitsu!").then(message => {
    kitsu.searchAnime(params.join(" "))
      .then(result => {
          const filter = message => {
            if(message.content === "1" || message.content === "2" || message.content === "3" || message.content === "4" || message.content === "5") {
              return true
            } else {
              return false
            }
          }
          msg.channel.send(`__**Anime Search Query**__\nFound some anime! Choose \`1-5\` to choose! Choose wisely :eyes:\n1: ${result[0].titles.english}/${result[0].titles.japanese}\n2: ${result[1].titles.english}/${result[1].titles.japanese}\n3: ${result[2].titles.english}/${result[2].titles.japanese}\n4: ${result[3].titles.english}/${result[3].titles.japanese}\n5: ${result[4].titles.english}/${result[4].titles.japanese}`)
          msg.channel.awaitMessages(filter, {
              "max": 20,
              "maxMatches": 1,
              "time": 60000,
              "errors": ['time']
              }).then(message => {
                if (message.size === 0) return
                const number = Number(message.first().content) - 1
                msg.channel.send(`Anime Search Query!\n\n**Titles:**\n**Japanese**: ${result[number].titles.japanese}\n**English**: ${result[number].titles.english}\n\n**Show Type**: ${result[number].showType}\n\n**Popularity Rank**: ${result[number].popularityRank}\n\n**Synopsis**: ${result[number].synopsis}`)
              })
            .catch(() => msg.reply("Command Canceled due to timer!"))
        })
      .catch(() => {
          message.edit("Did you spell the anime right? I couldn't get your search query!")
          msg.react("❓")
          }
        );
    })
}