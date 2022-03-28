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


// don't forget to await when calling
const isOwner = async (user, imgId) => {
  let owner = await Image.findOne({where: {id: imgId}, attributes: ["UserId"] });
  owner = owner.dataValues.UserId;
  // console.log("owner: ", owner);
  if (parseInt(user) === parseInt(owner)) {
    return true;
  } else {
    return false;
  }
}

exports.getDetails = async (req, res) => {
  try {
    // limit: parseInt(req.params.amount),
    let imgDetails = await Image.findOne({where: {id: parseInt(req.params.imgId)}, attributes: {exclude: ["img"]} });
    console.log(imgDetails);

    imgDetails.UserId = await User.findOne({where: {id: imgDetails.UserId}, attributes: ["username"] });
    imgDetails.UserId = imgDetails.UserId.username;

    // console.log("owner: ", owner);
    res.status(200).send(imgDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.getOneImage = async (req, res) => {
  try {
    // limit: parseInt(req.params.amount),
    let img = await Image.findOne({where: {id: parseInt(req.params.imgId)}});
    console.log(img);

    img.UserId = await User.findOne({
      where: {id: img.UserId},
      attributes: ["username"] });
    img.UserId = img.UserId.username;

    // console.log("owner: ", owner);
    res.status(200).send(img);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

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

    query.order = [['updatedAt', 'DESC']];
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

    query.order = [['updatedAt', 'DESC']];

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


// req.user available after checkToken
exports.deleteImage = async (req, res) => {
  try {
    let isOwnerBool = await isOwner(req.user.id, req.params.imgId);
    if (!isOwnerBool){
      throw new Error("The user is not the owner of this image.");
    }

    const deletedImage = await Image.destroy(
      {where:{id: req.params.imgId }}
      );

      if (deletedImage === 1){
        res.status(200).send({msg: "successfully deleted image"});
    } else {
        throw new Error("Did not delete");
    }

  } catch(error){
     console.log(error);
     res.status(500).send({err: error.message});
  }
};
