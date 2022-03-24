const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const User = sequelize.define("Image", {

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

module.exports = User;