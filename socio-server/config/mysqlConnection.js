const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DILECT,
  }
);

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");
    //sync the database with existing tables (will not overwrite)
    await sequelize.sync({ force: true });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
