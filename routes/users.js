const { getUsers } = require("../controllers/users");
const userRouter = require("express").Router();

userRouter.get("/", getUsers);

module.exports = userRouter;
