/**
 *
 * @param app - we assign routes and endpoint functions for each route
 *                  to this object.
 *
 * @param expressApp - an instance of the express app. By applying
 *                     expressApp.oauth.grant() method to an endpoint
 *                     the endpoint will return a bearer token
 *                     to the client if it provides calid credentials.
 *
 * @param authRoutesMethods - an object which contains the registration method. It
 *                           can be populated with other methods such as deleteUser()
 *                           if you decide to build out of this project's structure.
 * @return {app}
 */

module.exports = (app, passport) => {
  app.get(
    "/api/auth/discord",
    passport.authenticate("discord", { permissions: 66321471 })
  );

  app.get(
    "/api/auth/discord/callback",
    passport.authenticate("discord", {
      failureRedirect: "/"
    }),
    function(req, res) {
      res.redirect("/secretstuff"); // Successful auth
    }
  );

  return app;
};
