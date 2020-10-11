import axios from "axios";

export const PRUEBA_API = "PRUEBA_API";  


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

export function cargardb () {          
  return function(dispatch) {        
    return axios.post(`http://localhost:3005/registerhd`)
      .then(result => result.data)
      .then(data => {
        dispatch({          
          payload: data
        })
        console.log("la carga DB ",data)
      })
  };
    
}
