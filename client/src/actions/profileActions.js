import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
//import Axios from "axios";

//profilul curent

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading()); //pt spinneru de loading

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

//add experienta

export const addExp = (expData, history) => dispatch => {
  axios
    .post("/api/profil/exp", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//del exp

export const deleteExp = exp_id => dispatch => {
  axios
    .delete(`/api/profil/exp/${exp_id}`)
    // .then(res => history.push("/dashboard")) nu mai redirijam, apelam din nou
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data //in api cand stergem o experienta, primim inapoi profilul cu experienta stearsa
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add scoli

export const addEdu = (expData, history) => dispatch => {
  axios
    .post("/api/profil/edu", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//del scoli

export const deleteEdu = edu_id => dispatch => {
  axios
    .delete(`/api/profil/edu/${edu_id}`)
    // .then(res => history.push("/dashboard")) nu mai redirijam, apelam din nou
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data //in api cand stergem o experienta, primim inapoi profilul cu experienta stearsa
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//arata toate profilele

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading()); //pt spinneru de loading

  axios
    .get("/api/profil/all/")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES, //aici la erori am procedet diferit ! ! !
        payload: null
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
