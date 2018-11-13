import React, { Component } from "react";
import eGol from "../../validation/eGol";

class ProfileHeader extends Component {
  render() {
    const profile = this.props.profile; //scoatem profile data din componenta mama Profile
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.nume}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {eGol(profile.companie) ? null : (
                  <span> la {profile.companie}</span>
                )}
              </p>
              {eGol(profile.locatie) ? null : <p>{profile.locatie}</p>}
              <p>
                {eGol(profile.website) ? null : (
                  <a className="text-white p-2" href={profile.website}>
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {eGol(profile.social && profile.social.fbk) ? null : (
                  <a className="text-white p-2" href={profile.social.fbk}>
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {eGol(profile.social && profile.social.linkedIn) ? null : (
                  <a className="text-white p-2" href={profile.social.linkedIn}>
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {eGol(profile.social && profile.social.insta) ? null : (
                  <a className="text-white p-2" href={profile.social.insta}>
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}

                {eGol(profile.social && profile.social.youtube) ? null : (
                  <a className="text-white p-2" href={profile.social.youtube}>
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
