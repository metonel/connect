import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      companie: "",
      website: "",
      locatie: "",
      status: "",
      abilitati: "",
      git: "",
      bio: "",
      twitter: "",
      fbk: "",
      linkedin: "",
      youtube: "",
      insta: "",
      erori: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.erori) {
      //asta vine din mapStateToProps
      this.setState({ erori: nextProps.erori }); //prima variabila erori ii cea folosita in componenta, o legam la erori primita din errReducer, daca vine cu erori. cu setState, punem erori in state ca sa le scoatem din state ca variabila in int componentei
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      companie: this.state.hacompaniendle,
      website: this.state.website,
      locatie: this.state.locatie,
      status: this.state.handle,
      abilitati: this.state.abilitati,
      git: this.state.git,
      bio: this.state.bio,
      twitter: this.twitter,
      fbk: this.state.fbk,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      insta: this.state.insta
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { erori, displaySocialInputs } = this.state; //aici scoatem din state sa folosim in componenta datele primite
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={erori.twitter}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={erori.linkedin}
          />

          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={erori.youtube}
          />

          <InputGroup
            placeholder="Youtube Profile URL"
            name="insta"
            icon="fab fa-instagram"
            value={this.state.insta}
            onChange={this.onChange}
            error={erori.insta}
          />
        </div>
      );
    }

    //optiuni pt campul status
    const options = [
      { label: "Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or learning", value: "Student or learning" },
      { label: "Instructor or teacher", value: "Instructor or teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create Profile</h1>
                <p className="lead text-center">
                  fill out the the info below to make your profile more relevant
                </p>
                <small className="d-block pb-3">* -required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={erori.handle} //in componenta TextFieldGroup ii error, in componenta curenta ii erori (care ia valoarea din reducer)
                    info="A unique handle would be usefull (it can be changed later)"
                  />

                  <SelectListGroup
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    options={options}
                    error={erori.status}
                    info="Give us an ideea where you are at in your career"
                  />

                  <TextFieldGroup
                    placeholder="Company"
                    name="companie"
                    value={this.state.companie}
                    onChange={this.onChange}
                    error={erori.companie}
                    info="Could be your own company or the one you work for"
                  />

                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={erori.website}
                    info="Cpuld be your own website or a company"
                  />

                  <TextFieldGroup
                    placeholder="Location"
                    name="locatie"
                    value={this.state.locatie}
                    onChange={this.onChange}
                    erori={erori.locatie}
                    info="City and state (eg. Boston, MA)"
                  />

                  <TextFieldGroup
                    placeholder="* Skills"
                    name="abilitati"
                    value={this.state.abilitati}
                    onChange={this.onChange}
                    error={erori.abilitati}
                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                  />

                  <TextFieldGroup
                    placeholder="Github Username"
                    name="git"
                    value={this.state.git}
                    onChange={this.onChange}
                    erori={erori.git}
                    info="If you want your last repos and a Github link, provode us your username"
                  />

                  <TextAreaFieldGroup
                    placeholder="short bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    erori={erori.bio}
                    info="Tell us a little about yourself"
                  />

                  <div className="mb-3">
                    <button
                      type="button" //daca nu punem type o sa il vada ca si submit si va trimite profilu cand apasam toggle pt social media
                      onClick={() => {
                        this.setState(prevState => ({
                          displaySocialInputs: !prevState.displaySocialInputs //toggle
                        }));
                      }}
                      className="btn btn-light"
                    >
                      Add Social Network Links
                    </button>
                    <span className="text-muted">Optional</span>
                  </div>
                  {socialInputs}
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  erori: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  erori: state.erori //ascultam daca se emite din errorReducer ceva (se emite din action, prin type)
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile)); //facem redirijaare cu history si avem nevoie de withRouter sa mearga
