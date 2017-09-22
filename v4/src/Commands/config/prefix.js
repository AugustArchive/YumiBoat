const Command = require('../../Structures/Command');
let sql = require('sqlite');
sql.open('../../Database/Yumi');

class PrefixCommand extends Command {
   constructor() {
       super(); 
   }
  
  async run(msg, params) {
    
  }
}

module.exports = PrefixCommand;
