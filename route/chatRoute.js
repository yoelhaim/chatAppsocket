const express = require("express");
const routes = express.Router();
const {
  addchat,
  getchat,
  getchatHead,
  updateLast,
} = require("../controllers/user.controler");
const { addRelChat, getRel } = require("../controllers/relChatModels");

routes.post("/add", addchat); ///////
routes.get("/chat/:rec/:send", getchat); //////
routes.post("/addRel", addRelChat);
routes.get("/getRel/:senderId", getRel);
routes.get("/head/:id", getchatHead);
routes.put("/update", updateLast);

module.exports = routes;
