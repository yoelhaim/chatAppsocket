const { relcaht } = require("../model");
const today = require("../config/date");
const httperror = require("http-errors");
const { Op } = require("sequelize");
const { json } = require("body-parser");
const users = require("../model/users");

const addRelChat = async (req, res, next) => {
  let checkData = await relcaht.findAll({
    where: {
      [Op.or]: [
        { senderId: req.body.senderId, receverId: req.body.receverId },
        { senderId: req.body.receverId, receverId: req.body.senderId },
      ],
    },
  });

  if (checkData.length < 1) {
    let body = req.body;
    await relcaht
      .create(body)
      .then((resu) => {
        res.json({ urlgroupe: resu.relId });
      })
      .catch((err) => {
        res.send(err.message);
      });
  } else {
    res.json({ urlgroupe: checkData[0].relId });
  }
};
const getRel = async (req, res, next) => {
  let checkData = await relcaht.findAll({
    order: [["time", "DESC"]],
    where: {
      [Op.or]: [
        { senderId: req.params.senderId },
        { receverId: req.params.senderId },
      ],
    },
  });
  res.send(checkData);
};
module.exports = { addRelChat, getRel };
