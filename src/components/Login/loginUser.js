import React, { Component } from 'react';
import Axios from 'axios';
import config from "../../config"
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Textbox from '../common/Textbox';
import Button from '../common/Button';
import GroupIcon from '../common/GroupIcon';
import Row from '../common/Row';

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
        localStorage.setItem("userAuth", JSON.stringify(res.data));
        this.props.history.push('/dashboard');
      })
      .catch((err) => {
        console.log(err.response);
        if(err.response != undefined && err.response.status === 400)
          toast(err.response.data.message);
        //else
         // this.props.history.push('/Error');
      });
  }

  render() {
    return (
      <div>
        <ToastContainer />
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a><b>Rent</b>App</a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign In</p>
              <div className="input-group mb-3">
                <Textbox typeName="email" 
                         classValue="form-control"
                         placeholderName= "Email"
                         changed = {(event) => {
                          this.setState({UserName : event.target.value})}} />
                <GroupIcon iconValue={faEnvelope} />
              </div>
              <div className="input-group mb-3">
                <Textbox typeName="password"
                         classValue="form-control"
                         placeholderName="Password"
                         changed={(event) => {
                          this.setState({Password : event.target.value})}}  />
                <GroupIcon iconValue={faLock} />
              </div>
              <Row>
                <div className="col-12">
                  <Button typeName="submit"
                          classValue="btn btn-primary btn-block"
                          click={this.handleSubmit}
                          value="Sign In" />
                </div>
              </Row>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Login