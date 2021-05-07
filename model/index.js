const squelize = require("sequelize");
const db = require("../config/database");
const chatm = require("./chat");
const usersm = require("./users");
const rel = require("./relChat");

const chat = chatm(db, squelize);
const relcaht = rel(db, squelize);
const users = usersm(db, squelize);
chat.belongsTo(users);

db.sync({
  force: false,
})
  .then((result) => {
    console.log("success created");
  })
  .catch((err) => {});
module.exports = { users, chat, relcaht };
