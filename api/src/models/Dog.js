const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.STRING(10),
      validate: {
        isAlphanumeric: true,
        len: [10]
      },
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      validate: {
        len: [3, 50]
      },
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      validate: {
        is: /[0-9]+\s-\s[0-9]+/i 
      },
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      validate: {
        is: /[0-9]+\s-\s[0-9]+/i 
      },
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT
    },
  },{
    timestamps: false
  });
};
