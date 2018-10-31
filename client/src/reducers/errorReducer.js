import { GET_ERRORS } from "../actions/types";
//import { bindActionCreators } from "redux";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; //va fi err.response.data ce vin din api cu axios, din actions
    default:
      return state;
  }
}
