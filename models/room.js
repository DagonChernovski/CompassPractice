const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
    // Define your room attributes
    name: { type: DataTypes.STRING, allowNull: false },
 });

 module.exports = Room;