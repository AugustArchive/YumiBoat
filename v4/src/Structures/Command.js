const fs = require("fs");

class Command {
   constructor(bot, info, group) {
      this.contructor.validateInfo(bot, info, group);
      this.client = bot;
      this.name = info.name;
      this.description = info.description;
      this.aliases = info.aliases;
      this.examples = info.examples;
      this.group = group;
   }

   /**
    * @static
    */

    static validateInfo(bot, info, group) {
        if (!bot) throw new SyntaxError("A client shold be specified.");
        if (typeof info !== 'object') throw new TypeError("Command info must be a object.");
        if (typeof info.name !== 'string') throw new TypeError("Command name must be a string!");
        if (info.name !== info.name.toLowerCase()) throw new Error("All command names must be lowercased.");
        if (typeof info.description !== 'string') throw new TypeError("Command description must be a string!");
        if (info.aliases && (!Array.isArray(info.aliases) || info.aliases.some(ali => typeof ali !== 'string'))) {
            throw new RangeError("Command aliases must be lowercased.");
        }
        if (!info.examples) throw new SyntaxError("All examples must be specified.");
        if (info.examples && (!Array.isArray(info.examples) || info.examples.some(ali => typeof ali !== 'string'))) {
            throw new RangeError("Command examples must be an Array of strings!");
        }
        if (typeof group !== 'string') throw new TypeError("Group names must be a string.");
    }

    readFileAsync(path) {
      return new Promise((resolve, reject) => {
         fs.readFile(path, (err, result) => {
            if (err) return reject(err);
            resolve(result);
         });
      });
    }
}

module.exports = Command;
