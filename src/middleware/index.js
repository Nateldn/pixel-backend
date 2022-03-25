//@ts-check

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/userTable.js");

exports.hashPassword = async (req, res, next) => {
    try {
        // const pass = req.body.pass;
        // const hashedPass = await bcrypt.hash(pass, 8);
        // req.body.pass = hashedPass;
        req.body.pass = await bcrypt.hash(req.body.pass, 8);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

exports.decryptPassword = async (req, res, next) => {
  try {
    req.user = await User.findOne({ where: { username: req.body.username }});
    if (await bcrypt.compare(req.body.pass, req.user.pass)) {
      next();
    } else {
      throw new Error("Incorrect credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    const decodedToken = await jwt.verify(
      req.header("Authorization").replace("Bearer ", ""),
      process.env.SECRET
    );
    req.user = await User.findByPk(decodedToken.id);
    if (req.user) {
      next();
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};
