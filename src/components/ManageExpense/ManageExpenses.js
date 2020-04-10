import React, { Component } from "react";
import Axios from "axios";
import config from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthorized } from "../../utils";
import "../ManageExpense/ManageExpenses.css";

import TopMenu from "../Menu/TopMenu";
import SideMenu from "../Menu/SideMenu";

import Button from "../common/Button";
import Textbox from "../common/Textbox";
import Label from "../common/Label";
import CardHeader from "../common/CardHeader";
import DropDown from "../common/DropDown";
import Checkbox from "../common/Checkbox";

class ManageExpenses extends Component {
  state = {
    headerData: "Manage Expenses",
    categoryData: [],
    spentByUserData: [],
    userLeftData: [],
    userRightData: [],
    userData: [],
    ExpenseName: "",
    Description: "",
    Category: "0",
    SpentBy: "0",
    Amount: 0,
    isDefaultExpense : false
  };
  getCategories = async () => {
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      await Axios.get(config.urls.EXPENSE_SERVICE + "getCategory")
        .then((res) => {
          if (res.data !== null || res.data !== undefined) {
            let organisedData = [];
            res.data.map((data) => {
              organisedData.push({ id: data._id, value: data.CategoryName });
            });
            this.setState({ categoryData: organisedData });
          }
        })
        .catch((err) => {
          if (err.response !== undefined && err.response.status === 400)
            toast(err.response.data.message);
        });
    }
  };

  getUsers = async () => {
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      await Axios.get(config.urls.USER_SERVICE + "getUsers")
        .then((res) => {
          if (res.data !== null || res.data !== undefined) {
            let organisedData = [];
            res.data.map((data) => {
              organisedData.push({
                id: data._id,
                value: data.FirstName + " " + data.LastName,
                checkedValue: false,
              });
            });
            this.setState({
              spentByUserData: organisedData,
              userLeftData: organisedData,
              userData: organisedData,
            });
          }
        })
        .catch((err) => {
          if (err.response !== undefined && err.response.status === 400)
            toast(err.response.data.message);
        });
    }
  };

  componentDidMount = async () => {
    this.getCategories();
    this.getUsers();
  };

  leftCheckHandler = (event, data) => {
    var userLeftDataInternal = [];
    this.state.userLeftData.map((dataValue) => {
      if (data.id === dataValue.id) {
        dataValue.checkedValue = !data.checkedValue;
      }
      userLeftDataInternal.push(dataValue);
    });
    this.setState({ userLeftData: userLeftDataInternal });
  };

  leftClickHandler = () => {
    let userLeftSide = this.state.userLeftData;
    let userRightSide = this.state.userRightData;
    userLeftSide.map((data) => {
      if (data.checkedValue) {
        data.checkedValue = false;
        userRightSide.push(data);
      }
    });
    userLeftSide = [];
    this.state.userData.map((data) => {
      let isDataPresentInRightSide = false;
      userRightSide.map((dataValue) => {
        if (data.id === dataValue.id) {
          return (isDataPresentInRightSide = true);
        }
      });
      if (!isDataPresentInRightSide) {
        console.log(data);
        userLeftSide.push(data);
      }
    });
    this.setState({ userLeftData: userLeftSide, userRightData: userRightSide });
  };

  rightCheckHandler = (data) => {
    var userRightDataInternal = [];
    this.state.userRightData.map((dataValue) => {
      if (data.id === dataValue.id) {
        dataValue.checkedValue = !data.checkedValue;
      }
      userRightDataInternal.push(dataValue);
    });
    this.setState({ userRightData: userRightDataInternal });
    console.log(this.state.userRightData);
  };

  rightClickHandler = () => {
    let userLeftSide = this.state.userLeftData;
    let userRightSide = this.state.userRightData;
    userRightSide.map((data) => {
      if (data.checkedValue) {
        data.checkedValue = false;
        userLeftSide.push(data);
      }
    });
    userRightSide = [];
    this.state.userData.map((data) => {
      let isDataPresentInLeftSide = false;
      userLeftSide.map((dataValue) => {
        if (data.id === dataValue.id) {
          return (isDataPresentInLeftSide = true);
        }
      });
      if (!isDataPresentInLeftSide) {
        userRightSide.push(data);
      }
    });
    this.setState({ userLeftData: userLeftSide, userRightData: userRightSide });
  };

  submitHandler = async () => {
    console.log(this.state.isDefaultExpense);
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      let spentToValue = [];
      if (this.state.userRightData.length > 0) {
        this.state.userRightData.map((data) => {
          spentToValue.push(data.id);
        });
      }
      let expenseDetails = {
        spentBy: this.state.SpentBy,
        spentTo: spentToValue,
        expenseName: this.state.ExpenseName,
        expenseDescription: this.state.Description,
        defaultExpense: this.state.isDefaultExpense,
        amount: this.state.Amount,
      };
      console.log(expenseDetails);
      await Axios.post(
        config.urls.EXPENSE_SERVICE + "createExpense",
        expenseDetails
      )
        .then((res) => {
          console.log(res.data);
          if (res.data !== null || res.data !== undefined) {
            if (res.data._id !== " " && res.data._id !== undefined) {
              this.setState({
                SpentBy: "0",
                userRightData: [],
                ExpenseName: "",
                Description: "",
                Category: "",
                Amount: "0",
              });
              this.getUsers();
              toast("Expense added successfully");
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
  };
  
  defaultExpenseHandler = () => {
    if(this.state.isDefaultExpense === true)
    {
      this.setState({isDefaultExpense: false});
    }
    else
    {
      this.setState({isDefaultExpense: true});
    }
  }
  render() {
    let checkLeftSide = [];
    let checkRightSide = [];
    if (this.state.userLeftData.length > 0) {
      this.state.userLeftData.map((data) => {
        checkLeftSide.push(
          <Checkbox
            labelValue={data.value}
            idValue={"chkLeft" + data.id}
            valueInCheck={data.id}
            changeHandler={(thisValue) =>
              this.leftCheckHandler(thisValue, data)
            }
            checkedValue={data.checkedValue}
          />
        );
      });
    }
    if (this.state.userRightData.length > 0) {
      this.state.userRightData.map((data) => {
        checkRightSide.push(
          <Checkbox
            labelValue={data.value}
            idValue={"chkRight" + data.id}
            valueInCheck={data.id}
            changeHandler={() => this.rightCheckHandler(data)}
          />
        );
      });
    }

    return (
      <div>
        <TopMenu />
        <SideMenu />
        <div className="content-wrapper">
          <ToastContainer />
          <br></br>
          <section className="content">
            <div className="container-fluid">
              <div className="card card-primary">
                <CardHeader headerValue={this.state.headerData} />
                <br></br>
                <div className="col-md-12">
                  <div className="row ">
                    <div className="col-md-6">
                      <Label value="Expense Name" />
                      <Textbox
                        typeName="text"
                        classValue="form-control"
                        placeholderName="Expense Name"
                        changed={(event) =>
                          this.setState({ ExpenseName: event.target.value })
                        }
                        value={this.state.ExpenseName}
                      />
                    </div>
                    <div className="col-md-6">
                      <Label value="Description" />
                      <Textbox
                        typeName="text"
                        classValue="form-control"
                        placeholderName="Description"
                        changed={(event) =>
                          this.setState({ Description: event.target.value })
                        }
                        value={this.state.Description}
                      />
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-md-6">
                      {/* <Label value="Category" />
                      <DropDown
                        classValue="form-control"
                        dropDownData={this.state.categoryData}
                        property="Category"
                        selectedValue={this.state.Category}
                        changedHandler={(event) => {
                          this.setState({ Category: event.target.value });
                        }}
                      /> */}
                      <Label value="Spent By" />
                      <DropDown
                        classValue="form-control"
                        dropDownData={this.state.spentByUserData}
                        property="User"
                        selectedValue={this.props.SpentBy}
                        changedHandler={(event) => {
                          console.log(event.target);
                          debugger;
                          this.setState({ SpentBy: event.target.value });
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <Label value="Amount" />
                      <Textbox
                        typeName="number"
                        classValue="form-control"
                        placeholderName="Amount"
                        changed={(event) =>
                          this.setState({ Amount: event.target.value })
                        }
                        value={this.state.Amount}
                      />
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-md-6">
                      <Checkbox
                        idValue="isDefaultExpense"
                        value={this.state.isDefaultExpense}
                        changeHandler = {(data) => this.defaultExpenseHandler(this)}
                        checked = {this.state.isDefaultExpense}
                        labelValue= "Is Default Expense"
                      />
                    </div>
                  </div>
                  <br></br>
                  <Label value="Spent by (Right Side value will be added)" />
                  <div className="row">
                    <div className="col-md-5 divBody">{checkLeftSide}</div>
                    <div className="col-md-1">
                      <div className="row">
                        <Button
                          typeName="button"
                          classValue="btn btn-block btn-secondary buttonCenter"
                          value=">>"
                          click={this.leftClickHandler}
                        />
                      </div>
                      <br></br>
                      <div className="row">
                        <Button
                          typeName="button"
                          classValue="btn btn-block btn-secondary buttonCenter"
                          value="<<"
                          click={this.rightClickHandler}
                        />
                      </div>
                    </div>
                    <div className="col-md-5 divBody">
                      {checkRightSide}
                      <br></br>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="card-footer">
                  <Button
                    typeName="submit"
                    classValue="btn btn-primary"
                    value="Submit"
                    click={this.submitHandler}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ManageExpenses;
