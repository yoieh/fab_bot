const http = require("http"),
  express = require("express"),
  terminus = require("@godaddy/terminus"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  passport = require("passport"),
  refresh = require("passport-oauth2-refresh"),
  app = express();

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(200).json({ message: "not logged in :(" });
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(express.static("dist"));

/* set the bodyParser to parse the urlencoded post data */
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

const discordStart = require("./api/auth/authRoutesPassport")(
  passport,
  refresh
);

refresh.use(discordStart);
discordPassport = passport.use(discordStart);

app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const authRouter = require("./api/auth/authRouter")(app, discordPassport);

app.use("/api/auth", authRouter);

const testRoute = require("./api/test")(app);

app.use("/api/ping", checkAuth, testRoute);

const server = http.createServer(app);

const onSignal = _ => {
  console.log("server is starting cleanup");
  // start cleanup of resource, like databases or file descriptors
};

const onHealthCheck = async _ => {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
};

terminus(server, {
  signal: "SIGINT",
  healthChecks: {
    "/healthcheck": onHealthCheck
  },
  onSignal
});

server.listen(8080, () => console.log("Listening on port 8080!"));
