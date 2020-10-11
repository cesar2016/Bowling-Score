const server = require('express').Router();
const { Order } = require('../db.js');

//GET--> Obtiene todas las ordenes existentes

server.get('/', (req, res, next) => { 

  Order.findAll()
    .then(order => {
        res.send(order);
    })
    .catch(next)
});

//GET --> Obtener una orden por su ID

server.get('/:id', (req, res, next) => {
  Order.findAll({
    where: {clientId: req.params.id}
  })
  .then(order => {
    res.send(order)
  })
  .catch(next)
})

module.exports = server;