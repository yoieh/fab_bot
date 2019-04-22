const { Command } = require("discord.js-commando");

module.exports = class SuckCommand extends Command {
  constructor(client) {
    super(client, {
      name: "suck",
      group: "fun",
      memberName: "suck",
      description: "Replies with a Message.",
      examples: ["suck"]
    });
  }

  async run(msg) {
    return msg.say("Suck My Duck!");
  }
};
