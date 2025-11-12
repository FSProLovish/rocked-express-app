const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const History = sequelize.define(
  "history",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fkUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    fkVideo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "video",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = History;
