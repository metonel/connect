import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { exp, edu } = this.props;

    const expItems = exp.map(expItem => (
      <li key={expItem._id} className="lisy-group-item">
        <h4>{expItem.companie}</h4>
        <p>
          <Moment format="YY/MM/DD">{expItem.deLa}</Moment> -{" "}
          {expItem.panaLa === null ? (
            " Current"
          ) : (
            <Moment format="YY/MM/DD">{expItem.panaLa}</Moment>
          )}
        </p>
        <p>
          <strong>Position: </strong> {expItem.titlu}
        </p>
        <p>
          {expItem.locatie === "" ? null : (
            <span>
              <strong>Location: </strong>
              {expItem.locatie}
            </span>
          )}
        </p>
        <p>
          {expItem.descriere === "" ? null : (
            <span>
              <strong>Description: </strong>
              {expItem.descriere}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = edu.map(eduItem => (
      <li key={eduItem._id} className="lisy-group-item">
        <h4>{eduItem.scoala}</h4>
        <p>
          <Moment format="YY/MM/DD">{eduItem.deLa}</Moment> -{" "}
          {eduItem.panaLa === null ? (
            " Current"
          ) : (
            <Moment format="YY/MM/DD">{eduItem.panaLa}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong> {eduItem.tipul}
        </p>
        <p>
          {eduItem.specializare === "" ? null : (
            <span>
              <strong>Specialization: </strong>
              {eduItem.specializare}
            </span>
          )}
        </p>
        <p>
          {eduItem.descriere === "" ? null : (
            <span>
              <strong>Description: </strong>
              {eduItem.descriere}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
