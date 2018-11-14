import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";
//import { bindActionCreators } from "redux";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; //va fi err.response.data ce vin din api cu axios, din actions
    case CLEAR_ERRORS:
      return {}; //daca ob erori ii gol, inseamna ca nu is erori
    default:
      return state;
  }
}
