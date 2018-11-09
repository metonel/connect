import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile; // asta vine din profile state din redux (in profileReducer, GET_PTOFILE care ii apelat in getCurrentProfile())

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //varifica daca utiliz logat are profil
      if (Object.keys(profile).length > 0) {
        //pe langa profile, mai avem profiles si loading, in redux->state->profile le putem vedea
        dashboardContent = <h4>continut</h4>;
      } else {
        //user fara profil
        dashboardContent = (
          <div>
            <p className="lead text-muted">bine ai venit {user.nume}</p>
            <p>nu ai detalii in profil</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              creare profil
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
