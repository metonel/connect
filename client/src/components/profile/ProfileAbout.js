import React, { Component } from "react";
import PropTypes from "prop-types";
import eGol from "../../validation/eGol";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //doar numele, fara prenume

    const nume = profile.user.nume.trim().split(" ")[0];

    const skills = profile.abilitati.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {/* <h3 className="text-center text-info">{profile.user.nume}'s Bio</h3>  puteam asa, dar numele complet*/}
            <h3 className="text-center text-info">{nume}'s Bio</h3>
            <p className="lead">
              {eGol(profile.bio) ? (
                <span>User Has No Bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
