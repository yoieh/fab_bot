const http = require("http");
const express = require("express");
const terminus = require("@godaddy/terminus");

const bodyParser = require("body-parser");

const app = express();

app.use(express.static("dist"));

/* set the bodyParser to parse the urlencoded post data */
app.use(bodyParser.urlencoded({ extended: true }));

const pingRouter = require("./api/test/pingRouter")(app);

const authRoutesPassport = require("./api/auth/authRoutesPassport")(
  (db = null)
);

const authRouter = require("./api/auth/authRouter")(app, authRoutesPassport);

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
