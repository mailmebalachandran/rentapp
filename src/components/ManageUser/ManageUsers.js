import React, { Component } from "react";
import Axios from "axios";
import config from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Label from "../common/Label";
import CardHeader from "../common/CardHeader";
import Textbox from "../common/Textbox";
import Button from "../common/Button";
import TopMenu from "../Menu/TopMenu";
import SideMenu from "../Menu/SideMenu";
import "./ManageUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";
import { isAuthorized } from "../../utils";

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerData: "Manage Users",
      _id: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      PhoneNumber: "",
      EmailId: "",
      UserName: "",
      Password: "",
      ConfirmPassword: "",
      IsAddUser: false,
      UserButtonValue: "Add User",
      headerDataViewData: "Users List",
      UserData: [],
      IsAdd: true,
    };
  }

  getUsers = async () => {
    let userAuth;
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      userAuth = {
        access_token: JSON.parse(localStorage.getItem("userAuth")).access_token,
      };
      Axios.defaults.headers.common["Authorization"] =
        "bearer " + userAuth.access_token;
      await Axios.get(config.urls.USER_SERVICE + "getUsers")
        .then((res) => {
          this.setState({ userData: res.data });
        })
        .catch((err) => {
          if (err.response !== undefined && err.response.status === 400)
            toast(err.response.data.message);
          //else
          // this.props.history.push('/Error');
        });
    }
  };

  componentDidMount = async () => {
    this.getUsers();
  };

  phoneNumberChanged = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ PhoneNumber: event.target.value });
    } else {
      toast("Only numbers are to be entered");
    }
  };

  submitHandler = async (event) => {
    event.preventDefault();
    if (this.state.Password !== this.state.ConfirmPassword) {
      toast("Password and Confirm Password should be same");
      return;
    }
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      if (!this.state.IsAdd) {
        let userDetails = {
          _id: this.state._id,
          FirstName: this.state.FirstName,
          MiddleName: this.state.MiddleName,
          LastName: this.state.LastName,
          PhoneNumber: this.state.PhoneNumber,
          EmailId: this.state.EmailId,
          UserName: this.state.UserName,
          Password: this.state.Password,
        };

        await Axios.put(config.urls.USER_SERVICE + "updateUser", userDetails)
          .then((res) => {
            if (res.data !== null || res.data !== undefined) {
              if (res.data._id !== " " && res.data._id !== undefined) {
                this.setState({
                  IsAddUser: false,
                  UserButtonValue: "Add User",
                  _id: "",
                  FirstName: "",
                  MiddleName: "",
                  LastName: "",
                  PhoneNumber: "",
                  EmailId: "",
                  UserName: "",
                  Password: "",
                  ConfirmPassword: "",
                  IsAdd: true,
                });
                this.getUsers();
              } else {
                toast("Error in updating the user");
              }
            }
          })
          .catch((err) => {
            if (err.response.status === 400) {
              toast(err.response.data.message);
            }
          });
      } else {
        let userDetails = {
          FirstName: this.state.FirstName,
          MiddleName: this.state.MiddleName,
          LastName: this.state.LastName,
          PhoneNumber: this.state.PhoneNumber,
          EmailId: this.state.EmailId,
          UserName: this.state.UserName,
          Password: this.state.Password,
        };

        await Axios.post(config.urls.USER_SERVICE + "saveUser", userDetails)
          .then((res) => {
            if (res.data !== null || res.data !== undefined) {
              if (res.data._id !== " " && res.data._id !== undefined) {
                this.setState({
                  IsAddUser: false,
                  UserButtonValue: "Add User",
                  _id: "",
                  FirstName: "",
                  MiddleName: "",
                  LastName: "",
                  PhoneNumber: "",
                  EmailId: "",
                  UserName: "",
                  Password: "",
                  ConfirmPassword: "",
                  IsAdd: true,
                });
                this.getUsers();
              } else {
                toast("Error in saving the user");
              }
            }
          })
          .catch((err) => {
            if (err.response.status === 400) {
              toast(err.response.data.message);
            }
          });
      }
    }
  };

  addHandler = () => {
    if (!this.state.IsAddUser)
      this.setState({ IsAddUser: true, UserButtonValue: "View User" });
    else this.setState({ IsAddUser: false, UserButtonValue: "Add User" });
  };

  onEditClickHandler = async (data) => {
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      await Axios.get(config.urls.USER_SERVICE + "getUser?_id=" + data._id)
        .then((res) => {
          if (res.data !== undefined || res.data !== null) {
            this.setState({
              FirstName: res.data.FirstName,
              _id: res.data._id,
              MiddleName: res.data.MiddleName,
              LastName: res.data.LastName,
              PhoneNumber: res.data.PhoneNumber,
              EmailId: res.data.EmailId,
              UserName: res.data.UserName,
              Password: res.data.Password,
              ConfirmPassword: res.data.Password,
              IsAddUser: true,
              UserButtonValue: "View User",
              IsAdd: false,
            });
          }
        })
        .catch((err) => {
          if (err.response !== undefined && err.response.status === 400)
            toast(err.response.data.message);
          //else
          // this.props.history.push('/Error');
        });
    }
  };

  onDeleteClickHandler = async (data) => {
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      debugger
      await Axios.delete(
        config.urls.USER_SERVICE + "deleteUser?_id=" + data._id
      )
        .then((res) => {
          console.log(res.data);
          if (res.data !== null || res.data !== undefined) {
            if (
              res.data.message !== " " &&
              res.data.message !== undefined &&
              res.data.message.toString().toLowerCase() ===
                "deleted successfully"
            ) {
              this.setState({
                IsAddUser: false,
                UserButtonValue: "Add User",
                _id: "",
                FirstName: "",
                MiddleName: "",
                LastName: "",
                PhoneNumber: "",
                EmailId: "",
                UserName: "",
                Password: "",
                ConfirmPassword: "",
                IsAdd: true,
              });
              this.getUsers();
              toast(res.data.message);
            } else {
              toast("Error in deleting the user");
            }
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast(err.response.data.message);
          }
        });
    }
  };

  render() {
    let formAdd;
    let headerValuesForGrid = ["Name", "Phone Number", "Email Id", "UserName"];
    if (this.state.IsAddUser) {
      formAdd = (
        <form role="form">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <Label
                    forValue="FirstName"
                    value="First Name"
                    style="text-align:left;"
                  />
                  <Textbox
                    typeName="text"
                    classValue="form-control"
                    placeholderName="First Name"
                    changed={(event) => {
                      this.setState({ FirstName: event.target.value });
                    }}
                    value={this.state.FirstName}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Label forValue="MiddleName" value="Middle Name" />
                  <Textbox
                    typeName="text"
                    classValue="form-control"
                    placeholderName="Middle Name"
                    value={this.state.MiddleName}
                    changed={(event) => {
                      this.setState({ MiddleName: event.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Label forValue="LastName" value="Last Name" />
                  <Textbox
                    typeName="text"
                    classValue="form-control"
                    placeholderName="Last Name"
                    value={this.state.LastName}
                    changed={(event) => {
                      this.setState({ LastName: event.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Label forValue="PhoneNumber" value="Phone Number" />
                  <Textbox
                    typeName="text"
                    classValue="form-control"
                    placeholderName="Phone Number"
                    changed={this.phoneNumberChanged}
                    value={this.state.PhoneNumber}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label forValue="EmailId" value="Email Id" />
                  <Textbox
                    typeName="text"
                    classValue="form-control"
                    placeholderName="Email Id"
                    changed={(event) => {
                      this.setState({ EmailId: event.target.value });
                    }}
                    value={this.state.EmailId}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <Label forValue="UserName" value="User Name" />
                  <Textbox
                    typeName="text"
                    classValue="form-control"
                    placeholderName="User Name"
                    changed={(event) => {
                      this.setState({ UserName: event.target.value });
                    }}
                    value={this.state.UserName}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Label forValue="Password" value="Password" />
                  <Textbox
                    typeName="password"
                    classValue="form-control"
                    placeholderName="Password"
                    changed={(event) => {
                      this.setState({ Password: event.target.value });
                    }}
                    value={this.state.Password}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label forValue="ConfirmPassword" value="Confirm Password" />
                  <Textbox
                    typeName="password"
                    classValue="form-control"
                    placeholderName="Confirm Password"
                    changed={(event) => {
                      this.setState({ ConfirmPassword: event.target.value });
                    }}
                    value={this.state.ConfirmPassword}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Button
              typeName="submit"
              classValue="btn btn-primary"
              value="Submit"
              click={this.submitHandler}
            />
          </div>
        </form>
      );
    } else {
      formAdd = (
        <div className="row">
          <div className="col-12">
            <div className="col-12">
              <br></br>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    {this.state.headerDataViewData}
                  </h3>
                  <div className="card-tools">
                    <div className="input-group input-group-sm SearchTextboxInGrid">
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Search"
                      />

                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body table-responsive p-0 CardBodyHeightInGrid">
                  <table className="table table-head-fixed text-nowrap">
                    <TableHeader
                      headerValues={headerValuesForGrid}
                      isActionButtonEnabled="true"
                    />
                    <TableBody
                      tableData={this.state.userData}
                      editClicked={(data) => {
                        this.onEditClickHandler(data);
                      }}
                      deleteClicked={(data) => {
                        this.onDeleteClickHandler(data);
                      }}
                    />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <TopMenu />
        <SideMenu />
        <div className="content-wrapper">
          <br></br>
          <section className="content">
            <ToastContainer />
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-primary">
                    <CardHeader headerValue={this.state.headerData} />
                    <br></br>
                    <div className="row">
                      <div className="col-md-10"></div>
                      <div className="col-md-2 float-right">
                        <Button
                          typeName="button"
                          classValue="btn btn-primary"
                          value={this.state.UserButtonValue}
                          click={this.addHandler}
                        />
                      </div>
                    </div>
                    {formAdd}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default ManageUsers;
