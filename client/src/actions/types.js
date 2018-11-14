export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_PROFILE = "GET_PROFILE";

//export const GET_PROFILES = "PROFILE_NOT_FOUND"; ala de jos era asa inainte si dadea erori cand useru era imediat dupa logare sau delogare si se accesa profilele, da dupa refresh la pagina erau aratate iar. stergea profiles din state, cred..

export const GET_PROFILES = "GET_PROFILES";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND";
export const CLEAR_CURRENT_PROFILE = "CLEAR_CURRENT_PROFILE"; // si asta era PROFILE_NOT_FOUND si eroarea era la logout, da nu se observa in aplicatie
export const POST_LOADING = "POST_LOADING";
export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
