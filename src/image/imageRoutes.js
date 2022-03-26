//@ts-check

const { Router } = require("express");
// const { addUser } = require("./userControllers");
// const { hashPassword } = require("../middleware");
// const userRouter = Router();

// userRouter.post("/user", hashPassword, addUser);

// use compare and check password


// const { addUser, login, updatePassword, deleteUser } = require("../user/userFunctions");

const { addImage, getPubImages, getAllImages } = require("./imageFunctions");

const { hashPassword, decryptPassword, checkToken } = require("../middleware");
const imageRouter = Router();


// create image
imageRouter.post("/image", checkToken, addImage);
// get images (should be get really?)
imageRouter.get("/gallery/:who/:amount/:page", getPubImages);
imageRouter.get("/mygallery/:amount/:page", checkToken, getAllImages);
// logged in user is the creator of this picture?
// make image private
// update image
// delete image



// return X images starting at Y filtered by privacy OR (user AND privacy)
// imageRouter.get("/gallery", checkToken, getImages);


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