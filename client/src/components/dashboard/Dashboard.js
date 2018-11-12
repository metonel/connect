import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions"; //asta ii componenta aia de sus ii actiune
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelete(e) {
    this.props.deleteAccount();
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
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profil/${profile.handle}`}> {user.nume}</Link>
            </p>
            <ProfileActions />

            <Experience expData={profile.experienta} />

            <Education eduData={profile.educatie} />

            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDelete.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        //user fara profil
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.nume}</p>
            <p>currently you have no profile created</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Your Prolfile Now
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
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
