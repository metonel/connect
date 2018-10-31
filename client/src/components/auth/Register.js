import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"; //pt redirectionare dupa logare.
import classnames from "classnames";
import { connect } from "react-redux"; //pentru a conecta redux la componenta asta
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      nume: "",
      email: "",
      parola: "",
      parola2: "",
      erori: {}
    };

    this.onChange = this.onChange.bind(this); //pt a lua valoarea din campul formului, trebuie sa legam this din form cu this din onChange, altfel nu stie ce e this-ul din onChange. se poate face aici pt toate 4 sau separat pt fiecare in campul din form cu  onChange={this.onChange.bind(this)}
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    //daca e user autentificat sa nu poata accesa manual ruta asta (/login)
    if (this.props.auth.eAutentificat) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    //am mapat erorile in mapStateToProps
    if (nextProps.erori) {
      this.setState({ erori: nextProps.erori });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }); //e.target.value da valoarea din form
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      nume: this.state.nume,
      email: this.state.email,
      parola: this.state.parola,
      parola2: this.state.parola2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { erori } = this.state; //fara component receive props, puteam folosi aici this.props pt ca in mapStateToProps le-am mapat

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": erori.nume
                      })} //promu parametru is clasele ce id by default, in param 2 clasa se aplica numai daca exista erori.nume
                      placeholder="Name"
                      name="nume"
                      value={this.state.nume}
                      onChange={this.onChange}
                    />
                    {erori.nume && (
                      <div className="invalid-feedback">{erori.nume}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": erori.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />

                    {erori.email && (
                      <div className="invalid-feedback">{erori.email}</div>
                    )}

                    <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": erori.parola
                      })}
                      placeholder="Password"
                      name="parola"
                      value={this.state.parola}
                      onChange={this.onChange}
                    />
                    {erori.parola && (
                      <div className="invalid-feedback">{erori.parola}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": erori.parola2
                      })}
                      placeholder="Confirm Password"
                      name="parola2"
                      value={this.state.parola2}
                      onChange={this.onChange}
                    />

                    {erori.parola2 && (
                      <div className="invalid-feedback">{erori.parola2}</div>
                    )}
                  </div>
                  <input
                    type="submit"
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

Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  erori: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, //asta vine din reducers/index (root reducer, unde is pusi toti reducerii), da ii legat de authReducer
  erori: state.erori //this.props.erori
}); //sa putem accesa din alte componente state-ul, cu this.props.user sau this.props.eAutenfificat

export default connect(
  mapStateToProps,
  { registerUser } //actions
)(withRouter(Register));
