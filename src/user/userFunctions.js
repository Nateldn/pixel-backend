//@ts-check

const jwt = require("jsonwebtoken");
const userRouter = require("./userRoutes");
const User = require("./userTable");



// ACTUAL SEQUELIZE FUNCTIONS

// exports.addUser = async (userObj) => {
//     try {
//         await User.create(userObj);
//     } catch (error) {
//         console.log(error);
//     }
// };

exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ id: newUser.id }, process.env.SECRET);
    // res.status(200).send({ user: newUser.username, token });
    res.status(200).send({ user: newUser.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.login = async (req, res) => {
  try {
     const token = await jwt.sign({id: req.user.id}, process.env.SECRET);
     res.status(200).send({ user: req.user.username, token, userImg: req.user.img });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};



exports.updatePass = async (req, res ) =>{
     try{
       const updateUser = await User.update(
        {pass: req.body.pass},
         {where:{id: req.user.id }}
  
         );
         console.log(updateUser)
         if (updateUser[0] === 1){
           res.status(200).send({msg: "successfully update user"});
         } else {
           throw new Error("Did not update");
         }
     } catch(error){
      console.log(error);
       res.status(500).send({err: error.message});
     }

    };




exports.deleteUser = async (req, res) => {
     try{ 
    const deleteUser = await User.destroy({
         where:{id: req.user.id }});
         console.log(deleteUser)
       if ( deleteUser === 1){
       res.status(200).send({ msg: "user deleted" });
     } else {
         throw new Error("Did not delete");
       }
     } catch (error) {
       console.log(error);
      res.status(500).send({ err: error.message });
     }
   };

  
  
   exports.updateImageProfile = async (req, res ) =>{
    try{
      const updateUserprofile = await User.update(
       {img:req.body.img},
        {where:{id: req.user.id }}
 
        );
        console.log(updateUserprofile)
        if (updateUserprofile[0] === 1){
          res.status(200).send({msg: "successfully update profile"});
        } else {
          throw new Error("Did not update profile");
        }
    } catch(error){
     console.log(error);
      res.status(500).send({err: error.message});
    }

   };


 