const server = require('express').Router();
const { Client } = require('../db.js');
const { Op } = require('sequelize');

////////////////////////////
//    		/clients	////
////////////////////////////


server.get('/', (req, res, next) => {
	Client.findAll()
		.then(clientes => {
			res.send(clientes);
		})
		.catch(next);
});

server.get('/search', (req, res) => {
	const cliente = req.query.cliente
	Client.findAll({
		where: {
			[Op.or]: [{ cliente: { [Op.like]: `%${cliente}%`} }]
		}
	}).then(data => res.send(data))
	.catch(err => console.log(err))
})


server.post('/register', (req, res) => {
	Client.create(req.body.data)
	.then(data => res.send(data))
	.catch(err => console.log(err))
})

server.put('/updateClient/:id', (req, res) => {
	const { name, email, phoneA, phoneB, city, address} = req.body;
	Client.findOne({
		where: req.params.id
	}).then(cliente => {
		cliente.update({
			name,
			email,
			phoneA,
			phoneB,
			city,
			address
		})
	})
})

server.delete('/deleteClient/:id', (req, res) => {
	Client.findOne({
		where: {
			id: req.params.id
		}
	}).then(cliente => {
		var aux = cliente
		cliente.destroy()
		res.send(aux).status(201)
	})
	.catch(err => console.log(err))
})



module.exports = server;
