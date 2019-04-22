const http = require("http"),
  express = require("express"),
  morgan = require("morgan"),
  terminus = require("@godaddy/terminus"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  passport = require("passport"),
  refresh = require("passport-oauth2-refresh"),
  session = require("express-session"),
  app = express();

const LevelStore = require("level-session-store")(session);

require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.static("build"));

/* set the bodyParser to parse the urlencoded post data */
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    store: new LevelStore("./src/db/level-session-store"),
    saveUninitialized: false,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// refresh.use(discordStart);
// discordPassport = passport.use(discordStart);

require("./api")(app, passport);

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
