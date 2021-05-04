const { chat, users } = require("../model");
const today = require("../config/date");
const httperror = require("http-errors");

module.exports = {
  addchat: async (req, res) => {
    try {
      let body = req.body;
      await chat
        .create(body)
        .then((resul) => {
          res.send(resul);
        })
        .catch((err) => {
          res.send("ddd " + err);
        });
    } catch (err) {
      res.json({
        message: "error" + err,
      });
    }
  },

  getchat: async (req, res, next) => {
    try {
      const chats = await chat.findAll({
        include: [users],
      });
      res.send(chats);
    } catch (error) {
      res.json({ error });
    }
  },
  /// all data
};
