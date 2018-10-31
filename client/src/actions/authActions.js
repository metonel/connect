import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//INREGISTRAREA

export const registerUser = (userData, history) => dispatch => {
  //ca o functie in functie, si dispatch ii functie
  axios
    .post("api/useri/inregistrare", userData) //nu trebe si http://localhost:5000 pt ca am pus asta in proxy, in package.json
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        //fiind async folosim dispatch, functie care fine din arrow funct de sus. astea de fac cu thunk
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); //err.response.data vine din api si sunt erorile definite acolo, asa le punem in this.state.erori
};

//login - user token

export const loginUser = userData => dispatch => {
  axios
    .post("api/useri/login", userData)
    .then(res => {
      //salveaza tokenu in localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //set token to auth token
      setAuthToken(token);
      //decodeaza tokenul sa scoatem date din el (useru si avatarul is in el)
      const decoded = jwt_decode(token);
      //userul care este autentificat
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
