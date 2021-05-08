module.exports = (db, type) => {
  return db.define("chat", {
    msgchat: {
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
    time: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
