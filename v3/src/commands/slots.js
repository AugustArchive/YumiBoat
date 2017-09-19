const { RichEmbed } = require('discord.js');
const config = require('../lib/config.json');
const photo = '<:photoblobs:318013782662053888>';
const oliy = '<:oliy:327462998610280448>';
const francis = '<:francis:327464171211849728>';

exports.run = (bot, msg) => {
   let slots = [
    `__**SLOT MACHINE**__\n\n${photo} ${oliy} ${francis}\n:shit: :shit: :shit: :arrow_backward:\n${photo} ${oliy} ${francis}\n\n\`Aww shit, you just lost!\``,
    `__**SLOT MACHINE**__\n\n${photo} ${francis} ${oliy}\n:shit: :shit: :rosette: :arrow_backward:\n${photo} ${francis} ${oliy}\n\n\`Not your lucky day?\``,
    `__**SLOT MACHINE**__\n\n${oliy} ${francis} ${photo}\n:shit: :rosette: :rosette: :arrow_backward:\n${francis} ${oliy} ${photo}\n\n\`Almost there boy!\``,
    `__**SLOT MACHINE**__\n\n${francis} ${oliy} ${photo}\n:rosette: :rosette: :rosette: :arrow_backward:\n${oliy} ${francis} ${photo}\n\`You Motherfu- I mean, good job! You win!\` :smiley:`
   ];
     msg.channel.send(`${slots[Math.floor(Math.random() * slots.length)]}`);
};