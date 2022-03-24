const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const User = sequelize.define("User", {
    UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        

    },
    pass:{
        type:DataTypes.STRING

    },

    img:{
        type: DataTypes.STRING
    } 
});

module.exports = User;