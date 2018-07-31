const { Command } = require("discord.js-commando");

module.exports = class SuckCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dickbut",
      group: "fun",
      memberName: "dickbut",
      description: "Renders ascii dickbutt",
      examples: ["dickbut"]
    });
  }

  async run(msg) {
    const dickBut = `
░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░▄▀▀▀▀▄░░░
░░░░░░░░░░▄▀░░▄░▄░█░░
░▄▄░░░░░▄▀░░░░▄▄▄▄█░░
█░░▀▄░▄▀░░░░░░░░░░█░░
░▀▄░░▀▄░░░░█░░░░░░█░░
░░░▀▄░░▀░░░█░░░░░░█░░
░░░▄▀░░░░░░█░░░░▄▀░░░
░░░▀▄▀▄▄▀░░█▀░▄▀░░░░░
░░░░░░░░█▀▀█▀▀░░░░░░░
░░░░░░░░▀▀░▀▀░░░░░░░░`;

    return msg.say(dickBut);
  }
};
