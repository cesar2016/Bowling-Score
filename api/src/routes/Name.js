const server = require('express').Router();
const e = require('express');
const { Name } = require('../db.js');


//**************************************
//|               NAME                 |
//|                                    |
//**************************************



  server.post('/', (req, res, next) => {
      console.log(req.body)       
      
    Name.create(req.body)

    .then(nombre => {
        res.send(nombre)
    })
})


 
module.exports = server;