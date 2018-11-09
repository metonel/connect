import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
//import Axios from "axios";

//profilul curent

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get("/api/profil")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE, //poate fi un user inregistrat dar care nu are profil
        payload: {}
      })
    );
};

//creare profil
export const createProfile = (profileData, history) => dispatch => {
  //history ii pt redirect
  axios
    .post("/api/profil", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS, //trimite la errorReducer
        payload: err.response.data
      })
    );
};

//delete account & profile

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you shure? This can NOT be undone!")) {
    axios
      .delete("/api/profil")
      .then(res =>
        dispatch({
          //seteaza userul curent la ob gol
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//profile loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//clear profile la logout
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
