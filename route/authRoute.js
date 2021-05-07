const routes = require("express").Router();
const {
  createAccount,
  login,
  getUser,
} = require("../controllers/auth.controler");

routes.post("/create", createAccount);
routes.post("/login", login);
routes.get("/user/:id", getUser);
module.exports = routes;
