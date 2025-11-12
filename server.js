const express = require("express");

const app = express();
require("dotenv").config();
const { connectDB, sequelize } = require("./src/config/database");
const routes = require("./app");

// port
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", routes);

const startApp = async () => {
  await connectDB();

  // ({ force: true }) - This creates the table, dropping it first if it already existed
  // ({ alter: true }) - This checks what is the current state of the table in the database

  await sequelize.sync({ alter: process.env.NODE_ENV === "development" });

  app.listen(PORT, (err) => {
    if (!err) {
      console.log("Starting Server");
    } else {
      console.log(err);
    }
  });
};

startApp()
  .then(() => {
    console.log(`Server listening at http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.log("Server Start Error");
    console.log(err);
  });

module.exports = app;
