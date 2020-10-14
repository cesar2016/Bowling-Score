const server = require('express').Router();
const { Result, turn } = require('../db.js');

server.post('/insResult', (req, res) => {/// Inser de los puntos del turno
	const { turnId, resultTurn } = req.body		 

	console.log(turnId, resultTurn)
		Result.create({turnId, resultTurn})
		 
		.then(point => {
			res.send(point)
		})

})

server.put('/updateResult/:id', (req, res) => {
	const {id} = req.params;
	const {body} = req;

	Result.findAll({ where: { turnId: id } })
		.then(turno => {
			res.send(turno) 
 
		})
 
 });

 server.get("/", (req, res, next) => {
	Result.findAll({
	  order: [["id", "ASC"]]	   
	})
	.then((datos) => {
		if (datos.length === 0) {
		  return res.send({ message: "No hay datos aun" });
		}
		return res.send(datos);
	  })
	  .catch((error) => next(error));
  });




module.exports = server;