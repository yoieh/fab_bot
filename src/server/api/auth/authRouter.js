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

const express = require("express");
const router = express.Router();

module.exports = (app, passport) => {
  router.get("/", (req, res) => res.send(200));

  router.get(
    "/discord",
    passport.authenticate("discord", { scope: "connections" })
  );

  router.get(
    "/discord/callback",
    passport.authenticate("discord", {
      failureRedirect: "/"
    }),
    (req, res) => {
      console.log(req, res);
      //res.redirect("/secretstuff"); // Successful auth
    }
  );

  return router;
};
