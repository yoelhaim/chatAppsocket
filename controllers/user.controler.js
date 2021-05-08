const { chat, users, relcaht } = require("../model");
const today = require("../config/date");
const httperror = require("http-errors");
const { Op } = require("sequelize");
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
      if (parseInt(req.params.send) != req.user.id) {
        throw httperror.Forbidden("not permission user");
      }
      const chats = await chat.findAll({
        where: {
          [Op.or]: [
            { senderId: req.params.send, receverId: req.params.rec },
            { senderId: req.params.rec, receverId: req.params.send },
          ],
        },
        include: [users],
      });
      res.send(chats);
    } catch (error) {
      next(error);
    }
  },

  getchatHead: async (req, res, next) => {
    try {
      // if (parseInt(req.params.send) != req.user.id) {
      //   throw httperror.Forbidden("not permission user");
      // }
      const chats = await chat.findAll({
        order: [["time", "DESC"]],

        where: {
          [Op.or]: [{ senderId: req.params.id }, { receverId: req.params.id }],
          receverId: { [Op.ne]: req.params.id },
        },
        // attributes: ['receverId'],
        group: ["receverId"],
        include: [
          {
            // Notice `include` takes an ARRAY
            model: users,
          },
        ],
      });
      res.send(chats);
    } catch (error) {
      // next(error);
    }
  },
  /// all data

  updateLast: async (req, res, next) => {
    try {
      // if (parseInt(req.params.send) != req.user.id) {
      //   throw httperror.Forbidden("not permission user");
      // }
      await relcaht
        .update(
          {
            lastmsg: req.body.lastmsg,
            time: req.body.time,
          },
          {
            where: {
              senderId: req.body.senderId,
              receverId: req.body.receverId,
            },
          }
        )
        .then((resu) => {
          res.send(resu);
        })
        .catch((err) => {
          res.send(err.message);
        });
    } catch (error) {
      // next(error);
    }
  },
};
