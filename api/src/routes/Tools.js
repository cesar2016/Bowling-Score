const server = require('express').Router();
const e = require('express');
const { Tools } = require('../db.js');


//**************************************
//|                                    |
//|                                    |
//**************************************
server.get('/', (req, res, next) => {
    Tools.findAll()
    .then(tools => {
        res.send(tools)
    })
    .catch(err => console.log(err))
})

server.get('/:id', (req, res, next) => {
    const { id } = req.params
    Tools.findOne({where: {id}})
    .then(tool => {
        res.send(tool)
    })
    .catch(next)
}) 

/* server.post('/', (req, res, next) => {
    Tools.create(req.body)
})

server.post() */
module.exports = server;