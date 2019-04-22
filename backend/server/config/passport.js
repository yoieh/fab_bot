require("dotenv").config();
const DiscordStrategy = require("passport-discord").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const db = require("../db");

module.exports = (passport, refresh) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.findUser(id).then(user => done(null, user));
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        process.nextTick(_ => {
          if (req.user) {
            const user = req.user;
            if (user.type && !user.type.find(t => t === "local")) {
              password = db.generateHash(password);
              db.connectUser(user.id, { password, email }).then(user => {
                done(false, user);
              });
            } else {
              done(new Error("User already exists"));
            }
          } else {
            db.registerUser(email, password)
              .then(user => done(false, user))
              .catch(err => done(err, email));
          }
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        process.nextTick(_ => {
          db.validPassword(email, password)
            .then(user => done(false, user))
            .catch(err => done(err, null));
        });
      }
    )
  );

  passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, token, profile, done) => {
        process.nextTick(_ => {
          if (req.user) {
            const user = req.user;
            db.connectUser(user.id, {
              discord: { accessToken, refreshToken, token, profile }
            })
              .then(user => {
                done(false, user);
              })
              .catch(err => {
                done(err, null);
              });
          } else {
            db.registerDiscord(profile.id, {
              discord: { accessToken, refreshToken, token, profile }
            })
              .then(user => {
                done(false, user);
              })
              .catch(err => {
                done(err, null);
              });
          }
        });
      }
    )
  );
};
