import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment"; //pt formatatul datei, noi il folosim la an
import { deleteEdu } from "../../actions/profileActions";
//aici nu am folosit deloc router, pt ca la stergere in action am apelat GET_PROFILE dand payload profilu ce a venit inapoi de la api cand am sters o exp, deci numa am facut un reload la profil

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEdu(id);
  }
  render() {
    const education = this.props.eduData.map((
      edu //pt map trebuie un key
    ) => (
      <tr key={edu._id}>
        <td>{edu.scoala}</td>
        <td>{edu.tipul}</td>
        <td>
          {edu.deLa} - {edu.panaLa} {/* asta ar fi fost fara Moment*/}
          <Moment format="YYYY/MM/DD"> {edu.deLa}</Moment> -
          {edu.panaLa === null ? (
            " Still Attending"
          ) : (
            <Moment format="YYYY/MM/DD"> {edu.panaLa}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
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
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Type</th>
              <th>Duration</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEdu: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEdu }
)(Education);
