import React, { useState, useEffect  } from 'react';
import { connect } from "react-redux";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


import { insertName, insertPoints, allPoitns, updateResult, allScore, reset} from "../actions/index";

import {    
   Navbar,      
   NavbarBrand,     
   Button,   
   Alert,
   Table,
   Row,    
   Input,
   Col,
   InputGroupAddon,
   InputGroup   
  } from 'reactstrap';
   
  
const shootsTurn = [] // Array que contiene los disparos para comprovara valores
const Header = ({ insertName, date_user, insertPoints, date_points, all_points, allPoitns, updateResult, allScore, all_score, reset}) => {

  var namePlay = localStorage.getItem('name'); 
 
  useEffect(() => {    
    allPoitns();
    allScore();  
    reset();
    },[])

  const [input, setInput] = useState({ namePlayer: "" });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const [inputP, setInputP] = useState({ shoot: "" });

  const handleChangeP = (e) => {
    setInputP({
      ...inputP,
      [e.target.name]: e.target.value,
    });
  };

   
  

  const handleSubmit = (e) => {//////Setear Name
    e.preventDefault(); 
    allScore(); 
    
    insertName(input); //Function que inserta el nombre  
    localStorage.setItem('name', input.namePlayer);   
     
  }; 
  
  
  const handleSubmitP = (e) => {//////Meter puntos
    e.preventDefault();       
    allScore(); 
    

    if(all_points.length  == 10){
    const turn = all_points.map((turns)=>{
      return turns.id

    }) 
    const fin = turn.find(element => element == 10);
    console.log('EL TURNOOOOOO ',fin)
    if(fin){
      Swal.fire({
        title: 'THE END!!!',
        text: 'El Juego termino, gracias por tu visita',
        imageUrl: 'https://st2.depositphotos.com/3261171/6623/i/450/depositphotos_66237665-stock-photo-woman-holding-a-bowling-ball.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      return
    }
  }
     
    
    if(inputP.shoot > 10){
      
     Swal.fire({
      icon: 'error',
      title: 'Ups...!!!',
      text: 'Debe ingresar un valor menor que 10',
       
    })
     return
    }
    shootsTurn.push(inputP.shoot)      
    console.log(shootsTurn)

    
    if(shootsTurn.length == 2){
     
      const sumaShots = parseInt(shootsTurn[0]) + parseInt(inputP.shoot)
      //console.log('La SUma ',sumaShots)

      if(sumaShots > 10){ 
        
       Swal.fire({
        icon: 'error',
        title: 'Ups...!!!',
        text: 'Debes ingresar un numero que sumado al anterior sea igual a diez o menor a 10',
         
      })
       //console.log("Te Borra el segundo deja primero", sumaShots)
       shootsTurn.pop()
       return
        }        

      if(sumaShots < 11){
        shootsTurn.length = 0;
      }    
         
    }

    if(shootsTurn.length == 1 && parseInt(shootsTurn[0]) == 10){

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'STRIKE!!!',
          showConfirmButton: false,
          timer: 1000
        })
        
        shootsTurn.length = 0;      
      
    }

    
    
    if(all_points.length === undefined) {

      var obj ={
        shoot: inputP.shoot,
        turno: null
      }

          insertPoints(obj); //Function que inserta PUNTO DEL TURNO 
          document.getElementById("shoot").value='';
          document.getElementById("shoot").placeholder='Ingresa el siguiente resultado';   
          allPoitns()
          allPoitns() 

      return
     }      

     
     var maxIdTable = all_points.map((table)=>{//Obtengo el ultimo valor para hacer update
          return table.id      
       })
       global.id = maxIdTable.length // Globalizamos el MAximo iD Sin shoot2
              
       
       for (let i = 0; i < all_points.length; i++) {
         const element = all_points[i];       

        if(element.id === global.id && element.shoot2 === null){  

            updateResult(global.id, inputP) //function que inserta el segundo tiro
            document.getElementById("shoot").value='';
            document.getElementById("shoot").placeholder='Ingresa el siguiente resultado'; 
            allPoitns()
            allPoitns() 
            allPoitns() 
        }
       
      

        if(element.id === global.id && element.shoot2 != null ){

            var obj ={
              shoot: inputP.shoot,
              turno: global.id
            }
            insertPoints(obj); //Function que inserta el Puntos en primer tiro            
            document.getElementById("shoot").value='';
            document.getElementById("shoot").placeholder='Ingresa el siguiente resultado';   
            allPoitns()
            allPoitns()
            allPoitns() 
        }
       }  
       
  };

   function reiniciar() {
    
    Swal.fire({
      title: 'REFRESH',
      text: "Do you want to restart the scoreboard?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Rebooted Success',
          reset(),         
          allPoitns(),
          allPoitns(),
          window.location.reload()
           
        )
      }
    })

     
   }
  

  var sumadorScore = 0;
  return (
    <div className='container-fluid'>
      <div>
        <Navbar color="danger" light expand="md">
          <NavbarBrand href="/">B O W L I N G</NavbarBrand> 
          <img src="https://lh3.googleusercontent.com/proxy/Fcgixrhn6H0qnOmpAu5ZnOLBVbri-rdEZSBk0bnW01GVHP7ZfShSEJ-P8wBTCB_3me3esVGOxPrXwUZ7i9EmF6IdDHECRKFn2b84DCld0fRuf0asNR5lsg" width="50" height="50" alt=""></img>           
        </Navbar>      
      </div>
        

      { namePlay ?<Alert id="title" color="light">
       <h4> WELCOME TO THE GAME, {namePlay.toUpperCase()} 
        <pan> </pan> <img src="https://media.istockphoto.com/vectors/man-bowling-gamer-icon-vector-outline-illustration-vector-id1200653150?k=6&m=1200653150&s=170667a&w=0&h=gMdtn8F1poANbB-ozsdny2nq01vYY70AeE-p3FjYXnI=" width="30" height="30" alt=""></img>  
       </h4>         
      </Alert>: null}
      { namePlay ?  <Table id="tablet" bordered dark>       
        <thead> 
          <tr>                     
            <th><h1>1</h1></th>
            <th><h1>2</h1></th>
            <th><h1>3</h1></th>
            <th><h1>4</h1></th>
            <th><h1>5</h1></th>
            <th><h1>6</h1></th>
            <th><h1>7</h1></th>
            <th><h1>8</h1></th>
            <th><h1>9</h1></th>
            <th><h1>10</h1></th>            
             
          </tr>
        </thead>
         
        <tbody>

        { all_points.length > 0 ? all_points.map((table)=>{
          
          if(parseInt(table.shoot2) || parseInt(table.shoot2) == 0 ){
          sumadorScore += parseInt(table.shoot1) + parseInt(table.shoot2)  
          } 
         return ( 
          
         <td align="right" id="celda">            
             <tr>
              <td>{table.strike ? 'X' : table.shoot1}</td>
              <td>{table.shoot2 == 0 ? '' : table.shoot2}</td>             
             </tr>
             <hr/>
             <h3 align="center">{
             
             table.shoot2 === null ? table.shoot1
             : global.strikes = parseInt(table.shoot1) + parseInt(table.shoot2)                     
             
             }</h3>


              
          </td> 
            

          )
          }): null         
          
          }
           
        </tbody>
        <tfoot>
            <tr>

              {all_score.length ? all_score.map((score)=>{                

                if(score.resultTurn == 30 || score.resultTurn == 60 || score.resultTurn == 90
                  || score.resultTurn == 120 || score.resultTurn == 150 || score.resultTurn == 180
                  || score.resultTurn == 210 || score.resultTurn == 240 || score.resultTurn == 270
                  || score.resultTurn == 300 ){
                 global.score =  score.resultTurn
                }else{

                  global.score = null
                }

              }): null} 
              
                <td colspan="10"><strong>TOTAL SCORE {global.score}<h1>  
                  {global.score ? global.score : sumadorScore}
                  </h1></strong></td>                 
            </tr>
        </tfoot>
        
        </Table>
        
         : null }


      <hr></hr>
      <Row>
        <Col></Col>
        {!namePlay ?        
        <Col id="formulario"> 
          <h3>Name Palyer</h3>        
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Input name='namePlayer' id="namePlayer" onChange={handleChange}/>
              <InputGroupAddon addonType="append">
                <Button color="danger">Send</Button>
              </InputGroupAddon>
              </InputGroup>
            </form>
        </Col>
        : null  
         }          
             
        {namePlay ?
        <Col id="formularioP">
        <h3>Insert Points Turn <Button onClick={reiniciar} color="light">Reiniciar DB</Button></h3>
        <form onSubmit={handleSubmitP}>
          <InputGroup>          
            <Input name='shoot' id="shoot" onChange={handleChangeP} required />
            <InputGroupAddon addonType="append">
              <Button color="primary">Send</Button>              
            </InputGroupAddon>
          </InputGroup>
        </form>
        
        </Col>
        : null  
          }
        <Col></Col>        
      </Row>
            
       
       
       
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  
return {      
  insertName: (input) => dispatch(insertName(input)),
  insertPoints: (inputP) => dispatch(insertPoints(inputP)),
  allPoitns: () => dispatch(allPoitns()),
  updateResult: (globalID, inputP) => dispatch(updateResult(global.id, inputP)),
  allScore: () => dispatch(allScore()),  
  reset: () => dispatch(reset())
}
}

const mapStateToProps = state => {
  return {
      date_user: state.date_user,
      date_points: state.date_points,
      all_points: state.all_points,
      all_score: state.all_score
       
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

 