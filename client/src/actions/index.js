import axios from "axios";

export const PRUEBA_API = "PRUEBA_API"; 
export const INSER_NAME = "INSER_NAME" ;
export const INSER_POINTS = "INSER_POINTS";
export const ALL_POINTS = "ALL_POINTS";
export const UPDATE_RESULT = "UPDATE_RESULT";
export const ALL_SCORE = "ALL_SCORE";


export function infoMovie (apiKey, ciudad ) {          
    return function(dispatch) {        
      return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`)
        .then(result => result.data)
        .then(data => {
          dispatch({
            type: PRUEBA_API,
            payload: data
          })
          console.log("El Actions ",data)
        })
    };
     
  }

export function insertName (body) { 
  //console.log('lo que llega al actions ',body)         
  return function(dispatch) {        
    return axios.post(`http://localhost:4000/name`, body)
      .then(result => result.data)
      .then(data => {
        dispatch({   
          type: INSER_NAME,       
          payload: data
        })
        //console.log("la carga DB ",data)
      })
  };
    
}

export function insertPoints (body) { 
  //console.log('lo que llega al actions ',body)         
  return function(dispatch) {        
    return axios.post(`http://localhost:4000/turn/insert`, body)
      .then(result => result.data)
      .then(data => {
        dispatch({   
          type: INSER_POINTS,       
          payload: data
        })
        //console.log("la carga DB ",data)
      })
  };
    
}
export function allPoitns () {             
  return function(dispatch) {        
    return axios.get(`http://localhost:4000/turn`)
      .then(result => result.data)
      .then(data => {
        dispatch({   
          type: ALL_POINTS,       
          payload: data
        })
        //console.log("lOS PUNTOS DE LA DB ",data)
      })
  };
    
}

export function allScore () {             
  return function(dispatch) {        
    return axios.get(`http://localhost:4000/result`)
      .then(result => result.data)
      .then(data => {
        dispatch({   
          type: ALL_SCORE,       
          payload: data
        })
        //console.log("lOS PUNTOS DE LA DB ",data)
      })
  };
    
}

export function updateResult(id, body){
  console.log('lo que llega al action ',id, body)
  id === undefined ? id = 1 : id = id
  return function(dispatch){
    return axios.post(`http://localhost:4000/turn/updatePoint/${id}`, body)
    .then(result => result.data)
    .then((data) => {
      dispatch({
        type: UPDATE_RESULT,
        payload: data
      });
      console.log('El DATA ', data)
    })

  }
}

 