const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const Categorias = sequelize.define('Categorias', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
  tableName: 'categorias',
  timestamps: false,
  treatAsView:false,
});

module.exports = Categorias;