const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Turn = sequelize.define('turn', {    
    shoot1: {
            type: DataTypes.STRING,
            
        },
    shoot2: {
      type: DataTypes.INTEGER,
       
    },
    strike: {
      type: DataTypes.STRING,
      
    },
    spare: {
      type: DataTypes.STRING,
       
    },
  });
};
