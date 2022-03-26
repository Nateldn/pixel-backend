//@ts-check

const jwt = require("jsonwebtoken");
const User = require("../user/userTable");
const Image = require("./imageTable");



// ACTUAL SEQUELIZE FUNCTIONS

// exports.addUser = async (userObj) => {
//     try {
//         await User.create(userObj);
//     } catch (error) {
//         console.log(error);
//     }
// };

const isOwner = async (user, imgId) => {
  console.log("user: ", user, "\nimgId: ", imgId);
  // let attributes = "UserId";
  let owner = await Image.findOne({where: {id: imgId}, attributes: ["UserId"] });
  console.log("owner: ", owner.dataValues.UserId);
  let ownerId = owner.dataValues.UserId;
  console.log("owner: ", ownerId);
  // Model.findAll({
  //   attributes: ['foo', 'bar']
  // });


  if (parseInt(user) === parseInt(ownerId)) {
    return true;
  } else {
    return false;
  }
}



// req.user available after checkToken
// requires img: dataURL (options: public boool, title: string)
exports.addImage = async (req, res) => {
  try {
    req.body.UserId = req.user.id;
    const newImage = await Image.create(req.body);
    res.status(200).send({ imgId: newImage.id, imgTitle: newImage.title, imgPublic: newImage.public});
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

// return X public images starting at Yth image
exports.getPubImages = async (req, res) => {
  try {
    let query = { 
      limit: parseInt(req.params.amount),
      offset: 0,
      where: {public: true}
    };
      
    if (req.params.page != 1) {
      query.offset = req.params.amount * (req.params.page - 1) ;
    };

    if (req.params.who !== "all") {
      let user = await User.findOne({where: {username: req.params.who}});
      query.where.UserId = user.id;
    };

    const imagePack = await Image.findAndCountAll(query);

    res.status(200).send({ imagePack });

  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

// return X images by the user logged in starting at Yth image
exports.getAllImages = async (req, res) => {
  try {
    let query = { 
      limit: parseInt(req.params.amount),
      offset: 0,
      where: {UserId: req.user.id}
    };
      
    if (req.params.page != 1) {
      query.offset = req.params.amount * (req.params.page - 1) ;
    };

    const imagePack = await Image.findAndCountAll(query);

    res.status(200).send({ imagePack });

  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

// req.user available after checkToken
exports.updateImage = async (req, res) => {
  try {
    let isOwnerBool = await isOwner(req.user.id, req.body.id);
    if (!isOwnerBool){
      throw new Error("The user is not the owner of this image.");
    }
    
    // const updateUser = await User.update(
    //   {pass: req.body.pass},
    //   {where:{id: req.user.id }}

    const updatedImage = await Image.update(
      req.body,
      {where:{id: req.body.id }}
      );

      if (updatedImage[0] === 1){
          res.status(200).send({msg: "successfully updated image"});
        } else {
          throw new Error("Did not update");
        }
    } catch(error){
     console.log(error);
     res.status(500).send({err: error.message});
    }
};









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


