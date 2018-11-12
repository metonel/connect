import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom"; //pt redirect dintr-un action, avem nevoie de withRouter
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExp } from "../../actions/profileActions";

class AddExp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companie: "",
      titlu: "",
      locatie: "",
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
    const expData = {
      companie: this.state.companie,
      titlu: this.state.titlu,
      locatie: this.state.locatie,
      deLa: this.state.deLa,
      panaLa: this.state.panaLa,
      curent: this.state.curent,
      descriere: this.state.descriere
    };
    this.props.addExp(expData, this.props.history);
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
      <div className="add-exp">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or
                currently have
              </p>
              <small className="d-block pb-3">* -required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="companie"
                  value={this.state.companie}
                  onChange={this.onChange}
                  error={erori.companie}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="titlu"
                  value={this.state.titlu}
                  onChange={this.onChange}
                  error={erori.titlu}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="locatie"
                  value={this.state.locatie}
                  onChange={this.onChange}
                  error={erori.locatie}
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
                  placeholder="Job Description"
                  name="descriere"
                  value={this.state.descriere}
                  onChange={this.onChange}
                  error={erori.descriere}
                  info="Tell us about the position"
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

AddExp.propTypes = {
  profile: PropTypes.object.isRequired,
  erori: PropTypes.object.isRequired,
  addExp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  erori: state.erori
});

export default connect(
  mapStateToProps,
  { addExp }
)(withRouter(AddExp));
