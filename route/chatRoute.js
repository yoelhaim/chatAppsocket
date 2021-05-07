const express = require("express");
const routes = express.Router();
const { addchat, getchat } = require("../controllers/user.controler");
const { addRelChat, getRel } = require("../controllers/relChatModels");

routes.post("/add", addchat); ///////
routes.get("/chat/:rec/:send", getchat); //////
routes.post("/addRel", addRelChat);
routes.get("/getRel/:senderId/:receverId", getRel);

module.exports = routes;
