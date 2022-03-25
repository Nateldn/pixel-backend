//@ts-check

const jwt = require("jsonwebtoken");
const Image = require("./imageTable");



// ACTUAL SEQUELIZE FUNCTIONS

// exports.addUser = async (userObj) => {
//     try {
//         await User.create(userObj);
//     } catch (error) {
//         console.log(error);
//     }
// };


// req.user available after 
// requires img: dataURL (options: public boool, title: string)
exports.addImage = async (req, res) => {
  try {
    // const tempImage = {img: req.body.img, public: true, title: "titled", UserId: req.user.id};
    req.body.UserId = req.user.id;
    // const newImage = await Image.create(tempImage);
    const newImage = await Image.create(req.body);
    res.status(200).send({ imgID: newImage.id, imgTitle: newImage.title, imgPublic: newImage.public, imgCreator: newImage.UserId});
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

// return X images starting at Y filtered by privacy OR (user AND privacy)

// using findAndCountAll
exports.getImages = async (req, res) => {
  try {
    // imageRouter.post("/gallery/:amount/:page", checkToken, getImages);

      const imagePack = Image.findAndCountAll({

        // req.params.amount;
        // req.params.page;

        limit: 2,
        offset: 3,
        where: {}, // conditions
      });
    res.status(200).send({ imagePack });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};


  
  // which will return the count before an array of rows found
  // {
  // "count": 3,
  // "rows": [
  // {
  // "id": 3,
  // "title": "This is the title of the object",
  





// exports.updateUser = async (inputObj) => {
//     try {
//         return await User.update({ pass: inputObj.newPass }, {
//             where: {
//               actor: inputObj.oldActor
//             }
//           });
//     } catch (error) {
//         console.log(error, "It did not update")
//     }
// };

// exports.deleteUser = async (filterObj) => {
//     try {
//         return await User.destroy({
//             where: filterObj});
//     } catch (error) {
//         console.log(error, "It did not update")
//     }
// };





// MONGOOSE CONTROLLERS
// NEED ADAPTATION

// exports.addUser = async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);
//     const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
//     res.status(200).send({ user: newUser.username, token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ err: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     res.status(200).send({ user: req.user.username });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ err: error.message });
//   }
// };

// exports.updatePassword = async (req, res) => {
//   try {
//     const updatedUser = await User.updateOne(
//       { username: req.user.username },
//       { password: req.body.password }
//     );
//     if (updatedUser.modifiedCount > 0) {
//       res.status(200).send({ msg: "Successfully updated user" });
//     } else {
//       throw new Error("Did not update");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ err: error.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.destroy(
//       { username: req.user.username }
//     );
//     console.log(deletedUser);
//     if (deletedUser.deletedCount > 0) {
//       res.status(200).send({ msg: "Successfully deleted user" });
//     } else {
//       throw new Error("Did not delete user");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ err: error.message });
//   }
// };


