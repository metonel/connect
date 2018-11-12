import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom"; //pt redirect dintr-un action, avem nevoie de withRouter
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEdu } from "../../actions/profileActions";

class AddEdu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoala: "",
      tipul: "",
      specializare: "",
      deLa: "",
      panaLa: "",
      curent: false,
      descriere: "",
      erori: {},
      disabled: "" //sa faca disabled campul panaLa daca curent e true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.erori) {
      this.setState({ erori: nextProps.erori });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const eduData = {
      scoala: this.state.scoala,
      tipul: this.state.tipul,
      specializare: this.state.specializare,
      deLa: this.state.deLa,
      panaLa: this.state.panaLa,
      curent: this.state.curent,
      descriere: this.state.descriere
    };
    this.props.addEdu(eduData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const erori = this.state.erori;
    return (
      <div className="add-edu">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp or course you have attended
              </p>
              <small className="d-block pb-3">* -required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="scoala"
                  value={this.state.scoala}
                  onChange={this.onChange}
                  error={erori.scoala}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="tipul"
                  value={this.state.tipul}
                  onChange={this.onChange}
                  error={erori.tipul}
                />
                <TextFieldGroup
                  placeholder="Field of Study"
                  name="specializare"
                  value={this.state.specializare}
                  onChange={this.onChange}
                  error={erori.specializarea}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="deLa"
                  value={this.state.deLa}
                  onChange={this.onChange}
                  error={erori.deLa}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="panaLa"
                  value={this.state.panaLa}
                  onChange={this.onChange}
                  error={erori.panaLa}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-inpot"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Check If This Still Is Your Current Job
                  </label>
                  {/* htmlFor ii din react */}
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="descriere"
                  value={this.state.descriere}
                  onChange={this.onChange}
                  error={erori.descriere}
                  info="Tell us about the knowledge you have gained"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEdu.propTypes = {
  profile: PropTypes.object.isRequired,
  erori: PropTypes.object.isRequired,
  addEdu: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  erori: state.erori
});

export default connect(
  mapStateToProps,
  { addEdu }
)(withRouter(AddEdu));
