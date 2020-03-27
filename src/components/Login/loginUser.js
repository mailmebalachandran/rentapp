import React, { Component } from 'react';
import Axios from 'axios';
import 'dotenv/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

class Login extends Component{
    state = {
      UserName: "",
      Password: ""
    }

    handleSubmit = async (event) =>{
      event.preventDefault();    
      const userDetails = {
        UserName : this.state.UserName,
        Password : this.state.Password
      }
      
      await Axios.post("http://localhost:5000/userService/authenticateUser", {user : userDetails})
                 .then(res => {
                   console.log(res);
                   console.log(res.data);
                 })
                 .catch((err) => {
                  console.log(err.message);
                 });
    }


    render(){
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
                          <input type="email" className="form-control" placeholder="Email"/>
                          <div className="input-group-append">
                            <div className="input-group-text">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                          </div>
                        </div>
                        <div className="input-group mb-3">
                          <input type="password" className="form-control" placeholder="Password"/>
                          <div className="input-group-append">
                            <div className="input-group-text">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Sign In</button>
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