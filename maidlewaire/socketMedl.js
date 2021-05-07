const jwt = require("jsonwebtoken");
const { users } = require("../model");

const protectSocketIo = async (socket, next) => {
  try {
    if (!socket.handshake.headers.hasOwnProperty("x-auth-token")) {
      throw Error("error data");
    }
    let token = socket.handshake.headers["x-auth-token"]?.trim();

    let payload = jwt.verify(token, "chat");
    console.log(payload.username);
    let user = await users.findOne({
      where: { username_u: payload.username_u },
    });

    if (!user) {
      throw Error("error get User");
    }
    socket.currentUser = user;
    next();
  } catch (err) {
    next({ message: JSON.stringify(err) });
  }
};
module.exports = protectSocketIo;
