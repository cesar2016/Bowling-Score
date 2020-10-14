const server = require('express').Router();
const { Turn, Result } = require('../db.js');
const { Op } = require('sequelize');

////////////////////////////
//    		/TURN	////
////////////////////////////

 

server.post('/insert', (req, res) => {/// Inser de los puntos del turno
	 
	const {turno, shoot} = req.body; 	

	console.log(" a ver el turno", turno)
	
	if(shoot == 10){	// aca solo entra si se metio un STRIKE			
		 
		if(turno === null){//IF 1

			console.log("Entro if 1")

		const shoot = { 
			shoot1: req.body.shoot,
			shoot2: 0, // Aca me salteo el 2 tiro del primer turno
			strike: true //anotamos el STRIKE
		 } 
		 Turn.create(shoot)
		 
		.then(point => {
			res.send(point)
 
		})
					
			Result.create({resultTurn: 10, turnId: turno})//Aca le meto 10 a la tabla result						 
		}
			Result.findOne({ where: { id: turno } })
			.then(TurnoAnt => {	
					

			if(turno == 1){
				if(TurnoAnt.resultTurn == 10){//IF 2
					console.log("Entro if 2")
					console.log('turno 1 tubo ', TurnoAnt.resultTurn)
			 
				// UPDETEAR el turno anterior
				 Result.update({resultTurn: 30}, {where: {id: turno} })
				 Result.create({resultTurn: 60})

				 const shoot = { 
					shoot1: 60,
					shoot2: 0, // Aca me salteo el 2 tiro del primer turno
					strike: true //anotamos el STRIKE
				 } 

				 Turn.create(shoot)				 
				 Turn.findOne({ where: { id: turno } })
				.then(TurnoAnt => {
					TurnoAnt.update({shoot1: 30, shoot2: 0})
				})		 

				
				}
				if(TurnoAnt.resultTurn != 10){// IF 3
					console.log("Entro if 3")
					console.log('el turno 1 no hizo strike')
					Result.create({resultTurn: 10})

					const shoot = { 
						shoot1: 10,
						shoot2: 0, // Aca me salteo el 2 tiro del primer turno
						strike: true //anotamos el STRIKE
					} 
					
					Turn.create(shoot)

				}
			}		

			 if(turno > 1){
				if(TurnoAnt.resultTurn == 10){//IF 4
					console.log("Entro if 4")
					console.log('El turno ya es mayor a uno')
					console.log('en anterior hubo strike')

					const sumando = parseInt(TurnoAnt.resultTurn) + 10

					Turn.findOne({ where: { id: turno } })
					.then(TurnoAnt => {
						TurnoAnt.update({shoot1: sumando, shoot2: 0})
					})
					Result.findOne({ where: { id: turno } })
					.then(TurnoAnt => {
						TurnoAnt.update({shoot1: sumando, shoot2: 0})
					})
					


					Result.create({resultTurn: 10})
					const shoot = { 
					shoot1: 10,
					shoot2: 0, // Aca me salteo el 2 tiro del primer turno
					strike: true //anotamos el STRIKE
					} 
					Turn.create(shoot)


					
				}

				if(TurnoAnt.resultTurn < 10 ){//if 5
					console.log("Entro if 5")
					console.log('El turno ya es mayor a uno')
					console.log('Y MENOR DE 10', TurnoAnt.resultTurn)
					
					Result.create({resultTurn: 10})
					const shoot = { 
					shoot1: 10,
					shoot2: 0, // Aca me salteo el 2 tiro del primer turno
					strike: true //anotamos el STRIKE
					} 
					Turn.create(shoot)

					
				}

				if(TurnoAnt.resultTurn == 60 || TurnoAnt.resultTurn == 90 || TurnoAnt.resultTurn == 120 || TurnoAnt.resultTurn == 150 ||
					TurnoAnt.resultTurn == 180 || TurnoAnt.resultTurn == 120 || TurnoAnt.resultTurn == 240 || TurnoAnt.resultTurn == 270 || TurnoAnt.resultTurn == 300 ){//IF 6
						console.log("Entro if 6")

					const sumando = parseInt(TurnoAnt.resultTurn) + 30
					Result.create({resultTurn: sumando})
					const shoot = { 
					shoot1: sumando,
					shoot2: 0, // Aca me salteo el 2 tiro del primer turno
					strike: true //anotamos el STRIKE
					} 
					Turn.create(shoot)

				}

			 } 
		 
		})//end. Turn.finOne
		
	}
				if(shoot != 10){/// MEtemos 10 al result si meteun STRIKE
					const shoot = { 
						shoot1: req.body.shoot 
						
						} 
						Turn.create(shoot)
						
						.then(point => {
							res.send(point) 
						})
				}

				return
		
})



server.post('/updatePoint/:id', (req, res) => {
		const { id }  = req.params  

		Turn.findOne({ where: { id: id } })
		.then(Turno => {
			res.send(Turno) 
			Turno.update({
				shoot2: req.body.shoot		 
			})
			
			Result.findOne({ where: { id: id-1 } })
			.then(TurnoAntRes => {
				console.log('El RES ATERIOR ',TurnoAntRes)

			})
		
		var sumaTurno = parseInt(Turno.shoot1) + parseInt(Turno.shoot2)
		Result.create({resultTurn: sumaTurno })
		
		var sumaStrike = parseInt(Turno.shoot1) + parseInt(Turno.shoot2)

		Turn.findOne({ where: { id: id-1 } })
		.then(TurnoAnt => {
			

			if(TurnoAnt.strike != null && TurnoAnt.shoot1 == 10){//IF Si Hubo strike antes
				console.log('la suma ', sumaStrike)
				console.log('El Strike', id - 1)
				console.log('LA suma anterior', TurnoAnt.shoot1)
				console.log('la suma de ahora', sumaTurno)				

				// UPDETEAR el turno anterior
				var suma = parseInt(sumaTurno) + 10
				Result.update({resultTurn: suma}, {where: {id: id-1} })
				Turn.update({shoot1: suma}, {where: {id: id-1} })			
				
			}

			Turn.findOne({ where: { id: id-1 } })
			.then(TurnoAntRes => {
				 
			console.log("A VERRRRR",TurnoAntRes.shoot1)
			if(TurnoAntRes.shoot1 == 60 || TurnoAntRes.shoot1 == 90 || TurnoAntRes.shoot1 == 120 || TurnoAntRes.shoot1 == 150 ||
				TurnoAntRes.shoot1 == 180 || TurnoAntRes.shoot1 == 120 || TurnoAntRes.shoot1 == 240 || TurnoAntRes.shoot1 == 270 || TurnoAntRes.shoot1 == 300 ){//IF 6

				console.log("entro el if 6", sumaTurno, TurnoAnt.shoot1)
				var suma = parseInt(sumaTurno) + parseInt(TurnoAnt.shoot1)
				Result.update({resultTurn: suma}, {where: {id: id-1} })
				Turn.update({shoot1: suma}, {where: {id: id-1} })

			}

			})


		})

			 
		})

		return

		
})



server.get("/", (req, res, next) => {
	Turn.findAll({
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

//////////////////////////////////////////////////////

  

module.exports = server;
