const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    // logging: process.env.NODE_ENV === "development", // if needed, enable this for db logging
    define: {
      underscore: true,
      freezeTableName: true,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database is connected successfully.");
  } catch (err) {
    console.log("Unable to connect to the Database: ", err);
  }
};

module.exports = {
  sequelize,
  connectDB,
};
