module.exports = (db, type) => {
  return db.define("chat", {
    msgchat: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
