const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

// do we need that import:
const User = require("../user/userTable.js");


const Image = sequelize.define("Image", {

    title:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: "untitled"
    },

    public:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },

    img:{
        type: DataTypes.TEXT,
        allowNull: false
    } 

});

// Place this right after the schemas have been defined / before sequelize sync?
User.hasMany(Image);
Image.belongsTo(User);


module.exports = Image;