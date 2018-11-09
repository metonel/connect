import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  //GET_ERRORS,
  CLEAR_CURRENT_PROFILE
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
