const { scama, users, victims } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httperror = require("http-errors");

const createAccount = async (req, res) => {
  try {
    let username_u = req.body.username_u;
    let email = req.body.email;

    let checkname = await users.findAll({
      where: { username_u: username_u },
    });
    let checkemail = await users.findAll({
      where: { email: email },
    });

    if (checkname.length > 0) {
      res.json({
        message: "error create already username_u",
      });
    } else if (checkemail.length > 0) {
      res.statusCode = 505;
      res.json({
        code: 505,
        message: "error create already email",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          res.statusCode = 404;
          return res.json({
            code: 404,
            message: "error  passsword  hash",
          });
        } else {
          await users
            .create({
              username_u: req.body.username_u,
              password: hash,
              email: req.body.email,
              block: 0,
            })
            .then((data) => {
              const token = jwt.sign(
                { email: req.body.email, username_u: username_u },
                "scamahackedfbinsta",
                // config.secret,
                {
                  expiresIn: 86400, // expires in 24 hours
                }
              );
              res.statusCode = 200;
              res.json({
                code: 200,
                message: "succefully create",
                username_u: data.username_u,
                email: data.email,
                token: token,
                id: data.id,
              });
            })
            .catch((error) => {
              res.statusCode = 500;
              res.json({
                code: 500,
                message: "error create " + error.message,
              });
            });
        }
      });
    }
  } catch (error) {
    res.json({
      message: "error database  hhahaha" + error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    let auth = await users.findAll({
      where: { username_u: req.body.username_u },
    });
    if (auth.length > 0) {
      bcrypt.compare(
        req.body.password,
        auth[0].password,
        async (err, result) => {
          if (err) {
            return res.json({
              message: "password incroccet",
            });
            res.status(404);
          }
          if (result) {
            let times = Date.now();
            users.update(
              {
                fcm: times,
              },
              { where: { username_u: auth[0].username_u } }
            );
            let codesekret;
            if (auth[0].member == 1) {
              codesekret = "chat";
            } else {
              codesekret = "chat";
            }
            const token = jwt.sign(
              {
                email: auth[0].email,
                username_u: auth[0].username_u,
                id: auth[0].id,
              },
              codesekret,
              //   config.secret,
              {
                expiresIn: 86400, // expires in 24 hours
              }
            );

            return (
              res.json({
                code: 200,
                message: "successfully login account ",
                token: token,
                username: auth[0].username_u,
                email: auth[0].email,
                id: auth[0].id,
                createdAt: auth[0].createdAt,
                updatedAt: auth[0].updatedAt,

                user: {
                  token: token,
                  username: auth[0].username_u,
                  email: auth[0].email,
                  id: auth[0].id,
                  createdAt: auth[0].createdAt,
                  updatedAt: auth[0].updatedAt,
                },
              }),
              (res.statusCode = 200)
            );
          } else {
            return res.json({ code: 404, message: "info incorrect " });
          }
        }
      );
    } else {
      res.statusCode = 404;
      res.json({ message: "error login", code: 404 });
    }
  } catch (error) {
    res.statusCode = 404;
    res.json({
      message: "error msg" + error,
    });
  }
};
module.exports = { createAccount, login };
