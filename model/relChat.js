module.exports = (db, type) => {
  return db.define("relcaht", {
    relId: {
      type: type.STRING,
      allowNull: false,
    },
    senderId: {
      type: type.INTEGER,
      allowNull: false,
    },
    receverId: {
      type: type.INTEGER,
      allowNull: false,
    },
    sendername: {
      type: type.STRING,
      allowNull: false,
    },
    recevername: {
      type: type.STRING,
      allowNull: false,
    },
    time: {
      type: type.STRING,
      allowNull: false,
    },
    lastmsg: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
