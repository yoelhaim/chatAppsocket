const squelize = require("sequelize");
const env = process.env.MODE_ENV || "development";
const config = require("./config")[env];
module.exports = new squelize(
  config.database,
  config.username,
  config.password,
  config
);
