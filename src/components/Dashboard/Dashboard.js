import React, { Component } from "react";
import Axios from "axios";
import TopMenu from "../Menu/TopMenu";
import SideMenu from "../Menu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { isAuthorized } from "../../utils";
import config from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";

class DashBoard extends Component {
  state = {
    userRegistrationCount: 0,
    thisMonth: "",
    thisMonthAmount: "0",
    userThisMonthDetails: [],
    monthDetails: []
  };

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
          this.setState({ userRegistrationCount: res.data.length });
        })
        .catch((err) => {
          if (err.response !== undefined && err.response.status === 400)
            toast(err.response.data.message);
        });
    }
  };

  getDashBoard = async (month, year) => {
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      await Axios.get(
        config.urls.EXPENSE_SERVICE + "getDashboardBasedOnMonth?month=" + month + "&year=" + year
      )
        .then((res) => {
          if (res.data !== null || res.data !== undefined) {
            let months = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            let TotalAmount =0;
            res.data.map((data) => {
              TotalAmount += data.TotalAmount
            })
            this.setState({ userThisMonthDetails: res.data, thisMonth: months[month -1], thisMonthAmount: TotalAmount });

          }
        })
        .catch((err) => {
          if (err.response !== undefined && err.response.status === 400)
            toast(err.response.data.message);
        });
    }
  };

  componentDidMount = () => {
    this.getUsers();
    let currentDate = new Date();
    let month = currentDate.getMonth() +1;
    let year = currentDate.getFullYear();
    this.getDashBoard(month, year);
    this.getMonthDetails();

  };

  getMonthDetails = () => {
    let currentDate = new Date();
    let count = 0;
    let monthDetails = [];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = currentDate.getMonth() + 1; i >= 1; i--) {
      if (count < 3) {
        monthDetails.push({
          monthValue: i,
          monthName: months[i - 1],
          year: currentDate.getFullYear(),
        });
        count++;
      } else {
        break;
      }
    }
    if (count != 3) {
      for (let i = 12; i >= 1; i--) {
        if (count < 3) {
          monthDetails.push({
            monthValue: i,
            monthName: months[i - 1],
            year: currentDate.getFullYear() - 1,
          });
          count++;
        } else {
          break;
        }
      }
    }
    this.setState({ monthDetails: monthDetails });
  };

  changeHandler = async (event) => {
    let value = event.target.value;
    if (value !== undefined || value !== null) {
      this.getDashBoard(value.split(' ')[0],value.split(' ')[1])
    }
  };

  render() {
    let headerValues = ["User Name", "Price", "More"];
    let monthDropdown = [];
    this.state.monthDetails.map((data) => {
      monthDropdown.push(
        <option value={data.monthValue + " " + data.year}>
          {data.monthName + ", " + data.year}
        </option>
      );
    });

    return (
      <div>
        <TopMenu />
        <SideMenu />
        <ToastContainer />
        <div className="content-wrapper">
          <br></br>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{this.state.thisMonthAmount} INR</h3>
                      <p>Month ( {this.state.thisMonth} )</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag"></i>
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{this.state.userRegistrationCount}</h3>
                      <p>User Registrations</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add"></i>
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>65</h3>
                      <p>Unique Visitors</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph"></i>
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <br></br>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-header border-0">
                      <h3 className="card-title">Monthwise Details</h3>
                      <div className="card-tools">
                        <select
                          className="form-control"
                          onChange={this.changeHandler}
                          value={this.state.month}
                        >
                          {monthDropdown}
                        </select>
                      </div>
                    </div>
                    <div className="card-body table-responsive p-0">
                      <table className="table table-striped table-valign-middle">
                        <TableHeader
                          headerValues={headerValues}
                          isActionButtonEnabled="false"
                        />
                        <TableBody
                          tableData={this.state.userThisMonthDetails}
                          tableValue="Dashboard"
                        />
                      </table>
                    </div>
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

export default DashBoard;
