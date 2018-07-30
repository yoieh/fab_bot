/**
 *
 * @param app - we assign routes and endpoint functions for each route
 *                  to this object.
 *
 * @return {app}
 */
module.exports = app => {
  app.get("/api/ping", (req, res) =>
    res.status(200).json({ message: "pong!" })
  );

  return app;
};
