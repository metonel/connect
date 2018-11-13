import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import eGol from "../../validation/eGol";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props; //asta vine din componenta mama, Profiles, si nu ne mai trebe redux aici
    return (
      <div classNames="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />{" "}
            {/* am facut ceva populate cu mongoose in backend */}
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.nume}</h3>
            <p>
              {profile.status}{" "}
              {eGol(profile.companie) ? null : (
                <span> at {profile.companie} </span>
              )}
            </p>
            <p>
              {eGol(profile.locatie) ? null : <span>{profile.locatie}</span>}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-md-block d-none">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.abilitati.slice(0, 4).map((abilitate, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {abilitate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
