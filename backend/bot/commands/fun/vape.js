const { Command } = require("discord.js-commando");

module.exports = class VapeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "vape",
      group: "fun",
      memberName: "vape",
      description: "Replies with a Message.",
      examples: ["vape"]
    });
  }

  async run(msg) {
    return msg.say("V&S?");
  }
};
