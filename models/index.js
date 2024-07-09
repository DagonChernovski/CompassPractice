const sequelize = require('../config/database');
const Room = require('./room');
const Person = require('./person');
const Booking = require('./booking');

// Внешние ключи и связи
Room.hasMany(Booking, { foreignKey: 'roomId' });
Person.hasMany(Booking, { foreignKey: 'personId' });

Booking.belongsTo(Room, { foreignKey: 'roomId' });
Booking.belongsTo(Person, { foreignKey: 'personId' });

// Экспорт модулей
module.exports = {
  sequelize,
  Room,
  Person,
  Booking,
};