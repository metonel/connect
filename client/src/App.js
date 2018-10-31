import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //sa scriem Router in loc de BrowserRouter
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken"; //jwt_decode si asta pt a verifica daca e user logat
import { setCurrentUser } from "./actions/authActions"; //pt login si logout
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";

//verificam daca e tokenul, asta inseamna ca un user e logat, si verificam aici pt ca pe orice pagina am fi, sa se faca verificarea. daca nu faceam, cand dadeam reload nu mai era logat

if (localStorage.jwtToken) {
  //setam auth tokenul in header
  setAuthToken(localStorage.jwtToken);
  //
  const decoded = jwt_decode(localStorage.jwtToken);
  //setam eAutentificat
  //console.log(decoded);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
