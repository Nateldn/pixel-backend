//@ts-check


const { Router } = require("express");
// const { addUser } = require("./userControllers");
// const { hashPassword } = require("../middleware");
// const userRouter = Router();

// userRouter.post("/user", hashPassword, addUser);

// use compare and check password


const { addUser,login,updatePass, deleteUser } = require("./userFunctions");
const { hashPassword, decryptPassword, checkToken } = require("../middleware");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.post("/login", decryptPassword, login);
userRouter.get("/user", checkToken, login);
userRouter.patch("/user", hashPassword, checkToken, updatePass);
userRouter.delete("/user", checkToken, deleteUser);

module.exports = userRouter;