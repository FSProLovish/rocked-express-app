const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const validator = require("validator");

const Video = sequelize.define(
  "video",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        urlValidate(val) {
          if (!validator.isURL(val)) {
            throw new Error("Url is not valid!");
          }
        },
      },
    },
  },
  {
    timestamps: true,
    createdAt: "publishDate",
  }
);

Video.getVideoById = async (id, attributes) => {
  const video = await Video.findOne({
    where: {
      id,
    },
    attributes,
  });
  return video ? video.toJSON() : null;
};

module.exports = Video;
