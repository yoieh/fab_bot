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
 * @return {app}
 */

const express = require("express");
const router = express.Router();

module.exports = app => {
  router.use((req, res, next) => {
    console.log("Ping at Time: ", Date.now());
    next();
  });

  router.get("/", (req, res) => {
    return res.status(200).json({ message: "pong!" });
  });

  return router;
};
