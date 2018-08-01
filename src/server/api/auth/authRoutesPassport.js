require("dotenv").config();
const DiscordStrategy = require("passport-discord").Strategy;

const registerUser = require("../../db");

module.exports = (passport, refresh) =>
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, cb) => {
      profile.refreshToken = refreshToken;
      profile.accessToken = accessToken;

      registerUser(profile.id)
        .then(user => {
          return cb(false, user);
        })
        .catch(err => {
          console.error(err);
        });
    }
  );
