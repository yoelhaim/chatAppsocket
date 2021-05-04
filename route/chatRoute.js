const express = require("express");
const routes = express.Router();
const { addchat, getchat } = require("../controllers/user.controler");

routes.post("/add", addchat);///////
routes.get("/chat", getchat);//////

module.exports = routes;
