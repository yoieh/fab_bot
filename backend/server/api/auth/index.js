/**
 *
 * @param router - we assign routes and endpoint functions for each route
 *                  to this object.
 *
 * @param app     - an instance of the express app. By applying
 *                     expressApp.oauth.grant() method to an endpoint
 *                     the endpoint will return a bearer token
 *                     to the client if it provides calid credentials.
 *
 * @param authRoutesMethods - an object which contains the registration method. It
 *                           can be populated with other methods such as deleteUser()
 *                           if you decide to build out of this project's structure.
 * @return {app}
 */

const express = require("../../../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/express");
const router = express.Router();

const fs = require("fs");

module.exports = passport => {
  router.get("/", (req, res) => {
    console.log("lolol");
    res.sendStatus(200);
  });

  router.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/api/auth/signup", // redirect back to the signup page if there is an error
      failureFlash: false // allow flash messages
    })
  );

  router.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  router.get(
    "/discord",
    passport.authenticate("discord", { scope: ["identify", "connections"] })
  );

  router.get(
    "/discord/callback",
    passport.authenticate("discord", {
      successRedirect: "/profile",
      failureRedirect: "/"
    }),
    (req, res) => {
      console.log(req);
      res.redirect("/"); // Successful auth
    }
  );

  router.get("/connect/local", function(req, res) {
    // res.render("connect-local.ejs", { message: req.flash("loginMessage") });
  });

  router.post(
    "/connect/local",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/connect/local", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  router.get(
    "/connect/discord",
    passport.authorize("discord", {
      scope: ["identify", "connections", "guilds"]
    })
  );

  router.get(
    "/connect/discord/callback",
    passport.authenticate("discord", {
      successRedirect: "/profile",
      failureRedirect: "/"
    }),
    (req, res) => {
      res.redirect("/"); // Successful auth
    }
  );

  return router;
};
