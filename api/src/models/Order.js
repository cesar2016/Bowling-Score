const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Order = sequelize.define('order', {
    dateA: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    dateB: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    commentA: {
      type: DataTypes.STRING,
    },
    commentB: {
      type: DataTypes.STRING,
    },
    coste: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
