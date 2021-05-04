const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "scamahackedfbinstabyadmin");
    req.userData = decode;
    next();
  } catch (e) {
    res.status(401);
    res.statusCode = 401;
    return res.json({
      message: "token expired  admin!",
    });
  }
};
