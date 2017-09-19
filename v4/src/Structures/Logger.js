const winston = require("winston");
const fs = require("fs");

class Logger {
   constructor(shardID){
       this.shardID = shardID;
       if (!fs.existsSync('logs')) {
           fs.mkdirSync('temp');
       }
       this.winston = new winston.Logger({
           transports: [
            // colorize console!
              new winston.transports.Console({
                  timestamp: this.tsFormat,
                  colorize: true,
                  level: info
              }),
              new winston.transports.File({
                  filename: `temp/logging/YumiBoat_shard-${shardID}`,
                  timestamp: this.tsFormat,
                  level: debug
              })
           ]
       });
   }

   tsFormat() {
       return new Date().toUTCString();
   }

   info(content) {
       this.winston.log('info', `[YUMIBOAT] [Shard: ${this.shardID.id}] - ${content}`);
   }

   error(content) {
       this.winston.log('error', `[YUMIBOAT] [Shard: ${this.shardID.id}] - ${content}`);
   }

   debug(content) {
    this.winston.log('error', `[YUMIBOAT] [Shard: ${this.shardID.id}] - ${content}`);
  }
}

module.exports = Logger;
