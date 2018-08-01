const level = require("level");
const sublevel = require("level-sublevel");

const db = sublevel(level("./src/db", { valueEncoding: "json" }));

const userTypesDB = db.sublevel("userTypes");
const userDB = db.sublevel("users");

// userTypes.put("discord", { name: "Discord user" }, err => {
//   if (err) throw err;
// });

const findOrCreate = (db, key, obj) => {
  return new Promise((resolve, reject) => {
    db.get(key, (err, value) => {
      if (!err) {
        resolve({ key, value });
      } else {
        db.put(key, obj, err => {
          if (err) reject(err);
          db.get(key, (err, value) => {
            if (err) reject(err);
            resolve({ key, value });
          });
        });
      }
    });
  });
};

const createDiscordUserType = () =>
  findOrCreate(userTypesDB, "Discord", { name: "Discord User" });

const registerUser = async (id, user) => {
  const userType = await createDiscordUserType();
  return await findOrCreate(userDB, id, { type: userType.key, ...user });
};

module.exports = registerUser;

// const findOrCreate = ({ discordId }) => {
//   db.put("user", { type: "user", discordId: discordId }, function(err) {
//     if (err) throw err;

//     db.get("user", function(err, value) {
//       if (err) throw err;
//       console.log(value);
//     });
//   });
// };
