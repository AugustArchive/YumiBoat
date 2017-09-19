const Discord = require("discord.js");
const YumiClient = require('./structures/Client');
const commandHandler = require('./utils/commandHandler');
const eventHandler = require('./utils/eventHandler');

const bot = new YumiClient({
  disableEveryone: true
});

commandHandler(bot);

eventHandler(bot);

bot.login(client.config.api_keys.Discord);

process.on('unhandledRejection', (reason, promise) => {
	console.log('Possibly Unhandled Rejection at: Promise ', promise, ' reason: ', reason.message);
});
