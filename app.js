const express = require('express');
const { sequelize } = require('./models');
const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

const startServer = async () => {
  try {
    await sequelize.sync({ force: true }); // Создание таблиц, если их еще нет
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();