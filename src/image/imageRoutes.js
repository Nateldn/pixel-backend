//@ts-check

const { Router } = require("express");

// const { addUser, login, updatePassword, deleteUser } = require("../user/userFunctions");

const { addImage, getPubImages, getAllImages, updateImage, getDetails, getOneImage } = require("./imageFunctions");

const { checkToken } = require("../middleware");
const imageRouter = Router();


// create image
imageRouter.post("/image", checkToken, addImage);
// get images (should be get really?)
imageRouter.get("/gallery/:who/:amount/:page", getPubImages);
imageRouter.get("/mygallery/:amount/:page", checkToken, getAllImages);
// make image private
// update image
imageRouter.patch("/image", checkToken, updateImage);
// returns the image details WITHOUT the actual image
imageRouter.get("/details/:imgId", getDetails);
// returns the image details WITHOUT the actual image
imageRouter.get("/image/:imgId", getOneImage);
// delete image
// imageRouter.delete("/user", checkToken, deleteImage);



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