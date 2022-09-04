const User = require("../models/usersModel");
const validator = require("../util/validator");

exports.createUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    if (!username || username.length === 0 || !validator.isString(username)) {
      throw Error("username must be a string");
    }
    if (!password || password.length === 0) {
      throw Error("password is required");
    }
    if (!email || email.length === 0 || !validator.isEmail(email)) {
      throw Error("email must be a valid");
    }

    const newUser = await User.createNewUser({ username, password, email });

    res.json(newUser);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};
exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id || id.length === 0) {
      throw Error("id is required");
    }
    const user = await User.findUserById(id);
    res.status(200).json(user);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
};
