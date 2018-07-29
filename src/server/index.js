const express = require("express");
const os = require("os");
const bot = require("./bot/");

try {
  bot();
} catch (error) {
  console.error(error);
}

const app = express();

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);
app.listen(8080, () => console.log("Listening on port 8080!"));
