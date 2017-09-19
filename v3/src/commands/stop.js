exports.run = (bot, msg) => {
  const bot_channel = msg.guild.voiceConnection.channel;
  const user_channel = msg.member.voieChannel;

  if (!bot_channel) return msg.reply(":notes: **|** I'm not in your voice channel!");
  if (!user_channel) return msg.reply(":notes: **|** Your not in my voice channel!");
  if(bot_voicechannel !== user_voicechannel) return msg.channel.send(":notes: **|** I don't think your connected to my channel.");

  msg.channel.send(":notes: **|** Stopping player...")
  msg.guild.voiceConnection.disconnect();
};