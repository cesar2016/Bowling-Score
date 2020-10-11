import axios from "axios";
import {
    PRUEBA_API
   
} from "../actions/index";

const initialState = {
  info_movie: []
   
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRUEBA_API:
      return {
        ...state,
        info_movie: action.payload,
      };
    

    default:
      return state;
  }
};////

 

export default reducer;