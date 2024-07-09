const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('classes_db', 'postgres', 'kenzo4tenma', {
  host: 'localhost',
  dialect: 'postgres',
});

// Определение моделей
const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
}, {timestamps: false,});

const Person = sequelize.define('Person', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: DataTypes.STRING, allowNull: false },
}, {timestamps: false,});

const Booking = sequelize.define('Booking', {
    personId: { type: DataTypes.INTEGER, allowNull: false },
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
}, {timestamps: false,});

// Связи между моделями
Room.hasMany(Booking);
Booking.belongsTo(Room);
Person.hasMany(Booking);
Booking.belongsTo(Person);

module.exports = { sequelize, Room, Person, Booking };