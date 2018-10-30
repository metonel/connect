import { createStore, applyMiddleware, compose } from "redux"; //cu compose putem folosi mai multi enhancements
import thunk from "redux-thunk";
import rootReducer from "./reducers"; //in director e index.js, daca il denumeam altfel trebuia specificat si fisieru, dar fiind index.js il ia automat, acolo ii combineReducers unde se combina toti reducerii si ala ii considerat rootReducer

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
); //spread operator

export default store;
