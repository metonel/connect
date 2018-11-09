import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

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

  onSubmit(e) {
    e.preventDefault();
    console.log("submit clicked");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { erori, displaySocialInputs } = this.state;
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
            erori={erori.twitter}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            erori={erori.linkedin}
          />

          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            erori={erori.youtube}
          />

          <InputGroup
            placeholder="Youtube Profile URL"
            name="insta"
            icon="fab fa-instagram"
            value={this.state.insta}
            onChange={this.onChange}
            erori={erori.insta}
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
                <h1 className="display-4 text-center">Creaza profil</h1>
                <p className="lead text-center">
                  completeaza informatiile pentru a-ti face prfilul mai relevant
                </p>
                <small className="d-block pb-3">*-campuri necesare</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    erori={erori.handle}
                    info="A unique handle would be usefull (it can be changed later)"
                  />

                  <SelectListGroup
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    options={options}
                    erori={erori.status}
                    info="Give us an ideea where you are at in your career"
                  />

                  <TextFieldGroup
                    placeholder="Company"
                    name="companie"
                    value={this.state.companie}
                    onChange={this.onChange}
                    erori={erori.companie}
                    info="Could be your own company or the one you work for"
                  />

                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    erori={erori.website}
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
                    erori={erori.abilitati}
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
  eorori: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  erori: state.erori
});

export default connect(mapStateToProps)(CreateProfile);
