const routes = require("express").Router();
const { createAccount, login } = require("../controllers/auth.controler");

routes.post("/create", createAccount);
routes.post("/login", login);
module.exports = routes;
