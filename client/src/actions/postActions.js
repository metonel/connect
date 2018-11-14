import axios from "axios";
import { ADD_POST, GET_ERRORS } from "./types";

//adaugare post

export const addPost = postData => dispatch => {
  axios
    .post("/api/postare", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data //de la api vine noul post creat, ala va vi payload-ul ce il folosim in componenta react dupa ce o conectam la redux. reduxu o da in state, noi o scoatem in props si o punem in variabila, daca vrem, sa o folosim in componenta
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
