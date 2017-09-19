class Events {
    constructor(bot) {
        if (!bot) throw new Error("A client must be specified.");
        this.bot = bot;
    }
}

module.exports = Events;
