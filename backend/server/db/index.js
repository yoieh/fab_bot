const bytewise = require("bytewise");

const level = require("level");
const sublevel = require("level-sublevel");

const db = sublevel(level("./src/db", { valueEncoding: "json" }));
const userDB = db.sublevel("users", {
  // keyEncoding: "binary",
  valueEncoding: "json"
});

const bcrypt = require("bcrypt");

const PREFIX = "user:";

const genTimestamp = dt => {
  var d = dt || new Date();
  return { unixtime: d.getTime(), hrtime: process.hrtime() };
};

// Turn an id into a key
const k = id => bytewise.encode([PREFIX, id]);

// Turn a key into an email
const dk = k => bytewise.decode(k)[1];

const encryptPassword = password => bcrypt.hashSync(password, 10);

const validPassword = (email, password) =>
  new Promise((resolve, reject) => {
    findUser(`local:${email}`)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          resolve(user);
        } else {
          reject(new Error("Wrong email or password"));
        }
      })
      .catch(err => {
        if (err && err.name == "NotFoundError") {
          reject(new Error("Wrong email or password"));
        } else {
          reject(err);
        }
      });
  });

const registerDiscord = async (id, user) => {
  return await addUser(`discord:${id}`, { ...user, type: ["discord"] });
};

const registerUser = async (email, password) => {
  password = encryptPassword(password);
  return await addUser(`local:${email}`, { email, password, type: ["local"] });
};

const findUser = id =>
  new Promise((resolve, reject) => {
    userDB.get(k(id), (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });

const addUser = (id, obj) =>
  new Promise((resolve, reject) => {
    userDB.get(k(id), (err, user) => {
      if (err && err.name == "NotFoundError") {
        const d = new Date();
        const userObj = {
          id: id,
          key: k(id),
          ...obj,
          createdTimestamp: genTimestamp(d),
          modifiedTimestamp: genTimestamp(d)
        };

        userDB.put(k(id), userObj, err => {
          if (err) return reject(err);
          resolve(userObj);
        });
      } else if (err) {
        return reject(err);
      } else {
        return reject(new Error(`User ${id} exists`));
      }
    });
  });

const connectUser = (id, connectedData) =>
  new Promise((resolve, reject) => {
    let key = null;
    const stream = userDB.createKeyStream();
    stream
      .on("data", data => {
        if (data == k(id)) {
          key = data;
        }
      })
      .on("error", function(err) {
        reject(err);
      })
      .on("close", function() {
        if (key) {
          userDB.get(key, (err, data) => {
            if (err) reject(err);
            userDB.put(key, { ...data, connectedData }, err => {
              if (err) reject(err);
              userDB.get(key, (err, data) => {
                if (err) reject(err);
                resolve(data);
              });
            });
          });
        } else {
          userNew = addUser(id)
            .then(user => user)
            .catch(err => reject(err));
        }
      });
  });

module.exports = {
  getId: k,
  userDB: userDB,
  db: db,
  registerUser: registerUser,
  findUser: findUser,
  registerDiscord: registerDiscord,
  generateHash: encryptPassword,
  validPassword: validPassword,
  connectUser: connectUser
};
