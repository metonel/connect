import { SET_CURRENT_USER } from "../actions/types";
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
        ...state,
        eAutentificat: !eGol(action.payload),
        user: action.payloas
      };
    default:
      return state;
  }
}
