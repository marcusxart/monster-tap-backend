const { DataTypes } = require("sequelize");

const user = (sequelize) => {
  const user = sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  user.associate = (models) => {
    user.hasOne(models.accounts);
  };
  return user;
};

module.exports = user;
