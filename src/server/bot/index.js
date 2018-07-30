require("dotenv").config();

const Commando = require("discord.js-commando");
const path = require("path");

const client = new Commando.Client({
  commandPrefix: process.env.PREFIX,
  unknownCommandResponse: false,
  owner: process.env.OWNER,
  disableEveryone: true
});

const bot = () =>
  new Promise((resolve, reject) => {
    client.registry
      .registerDefaultTypes()
      .registerGroups([["fun", "Just For fun!"]])
      .registerDefaultGroups()
      .registerDefaultCommands()
      .registerCommandsIn(path.join(__dirname, "/commands"));

    client.on("ready", () => {
      console.log("Logged in!");
      // client.user.setGame("Game");
      console.log(client);
      // setInterval(function() {
      //   for (user of client) {
      //     console.log(user);
      //   }
      // }, 10000);
    });
  });

module.exports = bot;
