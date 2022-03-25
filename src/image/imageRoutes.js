//@ts-check

const { Router } = require("express");
// const { addUser } = require("./userControllers");
// const { hashPassword } = require("../middleware");
// const userRouter = Router();

// userRouter.post("/user", hashPassword, addUser);

// use compare and check password


// const { addUser, login, updatePassword, deleteUser } = require("../user/userFunctions");

const { addImage, getImages } = require("./imageFunctions");

const { hashPassword, decryptPassword, checkToken } = require("../middleware");
const imageRouter = Router();


// create image
imageRouter.post("/image", checkToken, addImage);
imageRouter.post("/gallery", checkToken, getImages);

// return X images starting at Y filtered by privacy OR (user AND privacy)
// imageRouter.get("/image", checkToken, getImages);


// check if logged in user is owner of image
// set privacy
// return X images starting at Y filtered by privacy OR (user AND privacy)
// update image
// delete image



// userRouter.post("/user", hashPassword, addUser);
// userRouter.post("/login", decryptPassword, login);
// userRouter.get("/user", checkToken, login);
// userRouter.patch("/user", hashPassword, checkToken, updatePassword);
// userRouter.delete("/user", checkToken, deleteUser);

module.exports = imageRouter;