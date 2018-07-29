const { Command } = require("discord.js-commando");

module.exports = class DiceRollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "roll",
      group: "fun",
      memberName: "roll",
      description: "Rolls a Dice 1 to 6",
      examples: ["roll"]
    });
  }

  async run(msg, args) {
    var roll = Math.floor(Math.random() * 6) + 1;
    return msg.say(msg.member.user.username + " rolled a " + roll, {
      tts: true
    });
  }
};
