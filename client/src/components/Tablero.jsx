import React, { useState, useEffect  } from 'react';
import { connect } from "react-redux";
import { insertName, insertPoints, allPoitns, updateResult, allScore} from "../actions/index";

import {
    
   Navbar,      
   NavbarBrand, 
   Nav, 
   NavItem, 
   NavLink,
   Button,
   Toast, 
   ToastBody, 
   ToastHeader,
   Alert,
   Table,
   Row, 
   Form, 
   FormGroup, 
   Label,
   Input,
   Col,
   InputGroupAddon,
   InputGroup
  } from 'reactstrap';
  

const Header = ({ insertName, date_user, insertPoints, date_points, all_points, allPoitns, updateResult, allScore, all_score}) => {

  var namePlay = localStorage.getItem('name');
 
  useEffect(() => {    
    allPoitns();
    allScore();  
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
    
     if(inputP.shoot > 10){
      alert('Ups! ingrese un valor menor que 10')
      return

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

  var sumadorScore = 0;
  return (
    <div className='container-fluid'>
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">B O W L I N G</NavbarBrand>          
        </Navbar>      
      </div>  


      { namePlay ?<Alert id="title" color="primary">
       <h3> WELCOMO THE GAME {namePlay} </h3>
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
        <Col id="formularioP" >
        <h3>Insert Points Turn</h3>
        <form onSubmit={handleSubmitP}>
          <InputGroup>          
            <Input name='shoot' id="shoot" onChange={handleChangeP} required />
            <InputGroupAddon addonType="append">
              <Button color="danger">Send</Button>
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
  allScore: () => dispatch(allScore()) 
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

 