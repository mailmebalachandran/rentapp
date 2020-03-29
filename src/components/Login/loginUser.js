import React, { Component } from 'react';
import Axios from 'axios';
import config from "../../config"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

class Login extends Component {
  state = {
    UserName: "",
    Password: "",
    isError: false,
    errorMessage: ""
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const userDetails = {
      UserName: this.state.UserName,
      Password: this.state.Password
    }

    await Axios.post(config.urls.USER_SERVICE + "authenticateUser", userDetails)
      .then(res => {
        this.setState({
          isError: false
        })
        localStorage.setItem("userContext", JSON.stringify(res.data))
      })
      .catch((err) => {
        this.setState({
          isError: true,
          errorMessage: err.response.data.message
        })
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderError = () => {

  }


  render() {
    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a><b>Admin</b>LTE</a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign In</p>
              <div className="input-group mb-3">
                {this.state.isError ?
                  (
                    <p className="alert alert-danger">{this.state.errorMessage}</p>
                  ) : ""}
              </div>

              <div className="input-group mb-3">
                <input type="email"
                  className="form-control"
                  placeholder="Email"
                  name="UserName"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password"
                  className="form-control"
                  placeholder="Password"
                  name="Password"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit"
                    className="btn btn-primary btn-block"
                    onClick={this.handleSubmit}>
                    Sign In
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login