const express = require("express");
const routes = express.Router();
const {
  dashBoard,
  getUsers,
  updateUsers,
  rowData,
} = require("../controllers/user.controler");
routes.get("/rowData", rowData);
routes.get("/user/:id?", getUsers);
routes.get("/dash/:id", dashBoard);
routes.put("/update/:id", updateUsers);
module.exports = routes;
