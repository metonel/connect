import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";

//adaugare post

export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  //   const postare = {
  //     text: postData.text,
  //     nume: "Toni",
  //     avatar:
  //       "//www.gravatar.com/avatar/e51890743ddb3b9e19110baf582becfe?s=200&r=pg&d=mm",
  //     user: "5be699074930d214680c9ae4"
  //   };
  axios
    .post("/api/postari", postData)
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

//CAUTA post

export const getPosts = () => dispatch => {
  dispatch(setPostLoading);
  axios
    .get("/api/postari")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data //de la api vin tpate post-urile
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//stergere toate posturile

export const deletePost = id => dispatch => {
  axios
    .delete(`/api/postari/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id //in reducer o sa stergem postul local din array-ul posts, unde se si adauga un post nou cand ii creat
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//adauga like

export const addLike = id => dispatch => {
  axios
    .post(`/api/postari/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//sterge like

export const remLike = id => dispatch => {
  axios
    .post(`/api/postari/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//CAUTA post

export const getPost = id => dispatch => {
  dispatch(setPostLoading);
  axios
    .get(`/api/postari/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data //de la api vine post-u
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

//adaugare comentariu

export const addComment = (postId, commData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/postari/comment/${postId}`, commData)
    .then(res =>
      dispatch({
        type: GET_POST,
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

//sterge comentariu

export const deleteComm = (postId, commId) => dispatch => {
  axios
    .delete(`/api/postari/comment/${postId}/${commId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
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

// loadingul

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// sterge erorile (cand da o eroare si dupa o corectam, la text trimite la api, da in componenta nu sterge eroarea si ramane clasa din bootstrap si mesajul)

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
