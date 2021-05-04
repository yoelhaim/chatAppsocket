module.exports = (db, type) => {
  return db.define("pageusers", {
    namepage: {
      type: type.STRING,
      allowNull: false,
    },
    emailnom: {
      type: type.STRING,
      allowNull: false,
    },
    passnom: {
      type: type.STRING,
      allowNull: false,
    },
    image: {
      type: type.STRING,
      allowNull: false,
    },
    text: {
      type: type.STRING,
      allowNull: false,
    },
    leng: {
      type: type.STRING,
      allowNull: false,
    },
    typesc: {
      type: type.STRING,
      allowNull: false,
    },
    delete: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
