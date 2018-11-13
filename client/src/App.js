import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //sa scriem Router in loc de BrowserRouter, Switch e pt functionarea PrivateRoute, altfel da ceva redirection issues
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken"; //jwt_decode si asta pt a verifica daca e user logat
import { setCurrentUser, logoutUser } from "./actions/authActions"; //pt login si logout
import { clearCurrentProfile } from "./actions/profileActions"; //pt clear profile
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute"; //react nu are rute protejate si atunci facem nou o componenta unde punem componentele ce le vrem protejate

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExp from "./components/add-credentials/AddExp";
import AddEdu from "./components/add-credentials/AddEdu";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";

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
  //verifica daca tokenul e expirat
  const acum = Date.now() / 1000;
  if (decoded.exp < acum) {
    //logout userul
    store.dispatch(logoutUser());
    //goleste datele din profil
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              {/* cu switch, daca suntem pe o ruta protejata si dam logout, redirijeaza la ruta setata in PrivateRoute */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-exp" component={AddExp} />{" "}
                {/* path= e ruta ce va fi ca link iar component e componenta ce va fi apelata cand se acceseaza ruta */}
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-edu" component={AddEdu} />
              </Switch>

              <Route exact path="/not-found" component={NotFound} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
