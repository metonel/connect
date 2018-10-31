import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      parola: "",
      errors: {} //errors e folosit doar in componenta asta, erori ii ce vine din api cu redux
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    //daca e user autentificat sa nu poata accesa manual ruta asta (/login)
    if (this.props.auth.eAutentificat) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.eAutentificat) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.erori) {
      this.setState({ errors: nextProps.erori });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }); //e.target.value da valoarea din form
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      parola: this.state.parola
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.parola
                    })}
                    placeholder="Password"
                    name="parola"
                    value={this.state.parola}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.parola}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

loginUser.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  erori: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  erori: state.erori
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
