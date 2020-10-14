import axios from "axios";
import {
    PRUEBA_API,
    INSER_NAME,
    INSER_POINTS,
    ALL_POINTS,
    UPDATE_RESULT,
    ALL_SCORE
   
} from "../actions/index";

const initialState = {
  info_movie: [],
  date_user: [],
  date_points: [],
  all_points: [],
  all_score: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRUEBA_API:
      return {
        ...state,
        info_movie: action.payload,
      };
    case INSER_NAME:
      return {
        ...state,
        date_user: action.payload,
      };
    case INSER_POINTS:
      return {
        ...state,
        date_points: action.payload,
      };
    case ALL_POINTS:
    return {
      ...state,
      all_points: action.payload,
    };
    case UPDATE_RESULT:
    return {
      ...state,
      all_points: action.payload,
    };
    case ALL_SCORE:
    return {
      ...state,
      all_score: action.payload,
    };
    

    default:
      return state;
  }
};////

 

export default reducer;