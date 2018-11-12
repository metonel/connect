import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment"; //pt formatatul datei, noi il folosim la an
import { deleteExp } from "../../actions/profileActions";
//aici nu am folosit deloc router, pt ca la stergere in action am apelat GET_PROFILE dand payload profilu ce a venit inapoi de la api cand am sters o exp, deci numa am facut un reload la profil

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExp(id);
  }
  render() {
    const experience = this.props.expData.map(exp => (
      <tr key={exp._id}>
        <td>{exp.companie}</td>
        <td>{exp.titlu}</td>
        <td>
          {exp.deLa} - {exp.panaLa} {/* asta ar fi fost fara Moment*/}
          <Moment format="YYYY/MM/DD"> {exp.deLa}</Moment> -
          {exp.panaLa === null ? (
            " Still Working"
          ) : (
            <Moment format="YYYY/MM/DD"> {exp.panaLa}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>{" "}
          {/*nu avem constructor asa ca facem bindu aici */}
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Work Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Duration</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExp: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExp }
)(Experience);
