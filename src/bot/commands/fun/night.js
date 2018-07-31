const { Command } = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "night",
      group: "fun",
      memberName: "night",
      description: "Replies with a night message.",
      examples: ["/fab night BigBudda"]
    });
  }

  async run(msg, args) {
    return msg.say(`Goodnight and sleep tight! Don't let "${args}" bite`);
  }
};
