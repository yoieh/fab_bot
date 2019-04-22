require("dotenv").config();

const Commando = require("discord.js-commando");
const path = require("path");

const client = new Commando.Client({
  commandPrefix: "/fab ",
  unknownCommandResponse: false,
  owner: process.env.OWNER,
  disableEveryone: true
});

client.registry
  .registerDefaultTypes()
  .registerGroups([["fun", "Just For fun!"]])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "/commands"));

client.on("ready", () => {
  console.log("Logged in!");
  // client.user.setGame("Game");
  // setInterval(function() {
  //   for (user of client) {
  //     console.log(user);
  //   }
  // }, 10000);
});

client.login(process.env.BOT_TOKEN);

// module.exports = bot;
