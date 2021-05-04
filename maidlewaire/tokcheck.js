const jwt = require("jsonwebtoken");
const { users } = require("../model");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "scamahackedfbinsta");
    req.userData = decode;
    u = decode.username;
    const user = await users.findOne({ where: { username_u: u } });

    req.user = user;

    next();
  } catch (e) {
    next(createError.Unauthorized("token expired"));
  }
};
