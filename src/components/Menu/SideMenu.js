import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import config from "../../config";

class SideMenu extends Component{
  state = {
    UserName : ""
  };

  authenticateWithRefreshToken = (userAuth) => {
    Axios.post(config.urls.AUTH_SERVICE + "authenticateWithrefreshtoken", userAuth)
           .then(res => {
            localStorage.setItem("userAuth", JSON.stringify(res.data));
           })
           .catch((err) => {
             console.log(err.response);
           })
  }

  decodeToken = (userAuth) => {
    Axios.post(config.urls.AUTH_SERVICE + "decodeToken", userAuth)
         .then(res => {
            if(res.data.user !== null || res.data.user !== undefined)
            {
              this.setState({UserName:res.data.user.FirstName});
            }
            if(res.data.status === 403){
              userAuth = { "refresh_token" : JSON.parse(localStorage.getItem("userAuth")).refresh_token};
            }})
        .catch((err) => {
          console.log(err.response);
        });
  }

  componentDidMount = async () =>{
    let userAuth = { "access_token" : JSON.parse(localStorage.getItem("userAuth")).access_token};
    let isAuthorised = this.decodeToken(userAuth);
    if(!isAuthorised)
    {
      userAuth = { "refresh_token" : JSON.parse(localStorage.getItem("userAuth")).refresh_token};
      this.authenticateWithRefreshToken(userAuth);
      userAuth = { "access_token" : JSON.parse(localStorage.getItem("userAuth")).access_token};
      this.decodeToken(userAuth);
    }
  }

  render(){
        return(
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <Link to='/dashboard' className="brand-link">
      <img src={require('../../assets/images/Logo.png')} className="brand-image img-circle elevation-3" alt="logo" />
      <span className="brand-text font-weight-light">Rent Management</span>
    </Link>
    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src={require('../../assets/images/user.jpg')} className="img-circle elevation-2" alt="User Logo"></img>
        </div>
        <div className="info">
        <a href="#" className="d-block">{this.state.UserName}</a>
        </div>
      </div>
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item">
            <Link to='/ManageUsers' className="nav-link">
              <i className="nav-icon fas fa-th"></i>
              <p>
                Manage Users
              </p>
            </Link>
          </li>
          <li className="nav-item">
            <a href="pages/calendar.html" className="nav-link">
              <i className="nav-icon fas fa-calendar-alt"></i>
              <p>
                Manage Expenses
                <span className="badge badge-info right">2</span>
              </p>
            </a>
          </li>
          <li className="nav-item">
            <Link to='/' className="nav-link">
              <i className="nav-icon far fa-image"></i>
              <p>
                Logout
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
            </div>
        );
    }
}

export default SideMenu; 