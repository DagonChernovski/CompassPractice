const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Room = require('./room');
const Person = require('./person');

const Booking = sequelize.define('Booking', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
});

Booking.belongsTo(Room, { foreignKey: 'roomId' });
Booking.belongsTo(Person, { foreignKey: 'personId' });

module.exports = Booking;