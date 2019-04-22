module.exports = (app, passport) => {
  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401);
  };

  const authRouter = require("./auth")(passport);

  app.use("/api/auth", authRouter);

  const testRouter = require("./test")();

  app.use("/api/test", testRouter);
};
