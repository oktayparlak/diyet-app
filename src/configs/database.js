const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres:123456@localhost:5432/diyetapp', {
  logging: false,
});

module.exports = sequelize;
