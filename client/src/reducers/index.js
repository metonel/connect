//root reducer

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer, //in componente cand o sa folosim ceva din authReducer o sa apelam cu this.props.auth
  erori: errorReducer,
  profile: profileReducer,
  post: postReducer
});
