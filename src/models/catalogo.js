const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const Catalogo = sequelize.define('Catalogo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster:{

        type: DataTypes.STRING,
        allowNull: false,
    },
    resumen:{

        type: DataTypes.STRING,
        allowNull: false,
    },
    temporadas:{

        type: DataTypes.INTEGER,
        allowNull: true,
    },
    categoria:{

        type: DataTypes.STRING,
        allowNull: false,
    },
    genero:{

        type: DataTypes.STRING,
        allowNull: false,
    },
    reparto:{

        type: DataTypes.STRING,
        allowNull: false,
    }
},
         {
  tableName: 'Vista_trailerflix',
  timestamps: false,
  treatAsView:true,
});

module.exports = Catalogo;