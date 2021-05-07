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
  });
};
