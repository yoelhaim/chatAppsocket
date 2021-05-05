const jwt = require("jsonwebtoken");
const { createError } = require("./cr");
const { users } = require("../model");

const protectSocketIo = async (socket, next) => {
  try {
    // if (!socket.handshake.headers.hasOwnProperty("x-auth-token")) {
    //   console.log(
    //     "hhhhhhhhhhhhhhhh :" + socket.handshake.headers["x-auth-token"]?.trim()
    //   );
    // }
    let token = socket.handshake.headers["x-auth-token"]?.trim();
    let payload = jwt.verify(token, "chat");
    console.log(payload.username);
    let user = await users.findOne({
      where: { username_u: payload.username_u },
    });

    if (user) {
      socket.currentUser = user;
      next();
    } else {
      console.log("kiwalo ");
    }
  } catch (err) {
    console.log("wwww :" + err.message);
    next({ message: "errrrrrrrrrrrrrrror" });
  }
};
module.exports = protectSocketIo;
