require("dotenv").config();
module.exports = {
  development: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBS,
    dialect: process.env.DIALECT,
    logging: false,
  },
};
