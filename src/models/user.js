const { DataTypes, where } = require("sequelize");
const { sequelize } = require("../config/database");
const validator = require("validator");
const History = require("./history");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.ENUM("Mr", "Ms", "Miss"),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("female", "male"),
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM("SALES", "SERVICES", "MARKETING", "HR"),
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        emailValidate(val) {
          if (!validator.isEmail(val)) {
            throw new Error("Email is not valid!");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        emailValidate(val) {
          if (!validator.isStrongPassword(val)) {
            throw new Error("Password is not strong!");
          }
        },
      },
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(History, {
  foreignKey: "fkUser",
});

User.getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  return user ? user.toJSON() : null;
};

User.updateUserById = async (data, id) => {
  return await User.update(data, {
    where: {
      id,
    },
  });
};

module.exports = User;
