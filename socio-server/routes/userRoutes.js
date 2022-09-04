const express = require("express");
const userController = require("../controllers/user");
const userRouter = express.Router();

userRouter
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);
userRouter.route("/:id")
  .get(userController.getUser);

module.exports = userRouter;
