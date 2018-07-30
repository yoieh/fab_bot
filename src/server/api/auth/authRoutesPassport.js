require("dotenv").config();
const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");

module.exports = db => {
  passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
      },
      (accessToken, refreshToken, profile, cb) => {
        if (err) return done(err);

        // db.findOrCreate({ discordId: profile.id }, function(err, user) {
        //   return cb(err, user);
        // });

        return true;
      }
    )
  );

  return passport;
};
