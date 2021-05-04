module.exports = (db, type) => {
  return db.define("users", {
    username_u: {
      type: type.STRING,
      allowNull: false,
    },
    email: {
      type: type.STRING,
      allowNull: false,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    block: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
