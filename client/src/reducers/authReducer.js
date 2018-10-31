import { SET_CURRENT_USER } from "../actions/types"; //ii dispatched din authActions, prin types
import eGol from "../validation/eGol";

const initialState = {
  eAutentificat: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (
    action.type //aici testam ce actiune va fi dispathc-uita la reducer
  ) {
    case SET_CURRENT_USER:
      return {
        ...state, //folosim spread oper ca sa adaugam la state, nu sa schimbam
        eAutentificat: !eGol(action.payload), //true daca nu e gol, false daca e gol
        user: action.payload
      }; //facand asa, cand delogam putem apela reducerul asta fara user in actions si atunci seteaza returneaza state cu userul obiect gol, adica revine la initialState
    default:
      return state;
  }
}
