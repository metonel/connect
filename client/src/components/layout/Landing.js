import React, { Component } from "react";
import { Link } from "react-router-dom";
//redux
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentWillMount() {
    //daca e user autentificat sa nu poata accesa manual ruta asta (/login)
    if (this.props.auth.eAutentificat) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">You are now a developer!</h1>
                <p className="lead">
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing); //aici nu avem actiuni in redux si nu mai avem al doilea param la connect
