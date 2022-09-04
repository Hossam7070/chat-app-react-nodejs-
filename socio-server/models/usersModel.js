const { DataTypes } = require("sequelize");
const useBcrypt = require("sequelize-bcrypt");
const sequelize = require("../config/mysqlConnection");
// USER SCHEMA
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email:  {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: { type: DataTypes.TEXT },
});

// hash password pre save
useBcrypt(User, {
  field: "password",
  rounds: 10,
});

// USER MODEL DB HANDLERS --->
User.createNewUser = async function (data) {
  try {
    const newUser = await this.create(data);
    delete newUser.dataValues.password;
    return newUser;
  } catch (e) {
    e.message = "Error creating user";
    throw new Error(e);
  }
};
User.findUserById = async function (id) {
  try {
    const user = await this.findByPk(id);
    return user.dataValues;
  } catch (e) {
    e.message = "cant find user with id";
    throw new Error(e);
  }
};
User.find = async function () {
  try {
    const users = await this.findAll();
    return users;
  } catch (e) {
    e.message = "cant find users";
    throw new Error(e);
  }
};

module.exports = User;
