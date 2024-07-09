const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:kenzo4tenma@localhost:5432/classes_db', {
  dialect: 'postgres',
});

module.exports = sequelize;