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
import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";
import LoadingIndicator from "../common/LoadingIndicator";

class ManageExpenses extends Component {
  state = {
    headerData: "Manage Expenses",
    _id: "",
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
    isDefaultExpense: false,
    IsAddUser: false,
    UserButtonValue: "Add Expense",
    headerDataViewData: "Expense Details",
    expenseData: [],
    IsAdd: true,
    IsLoaded: false,
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

  getExpenses = async () => {
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      await Axios.get(config.urls.EXPENSE_SERVICE + "getExpenses")
        .then((res) => {
          if (res.data !== null || res.data !== undefined) {
            this.setState({
              expenseData: res.data,
              IsLoaded: true,
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
    this.getExpenses();
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
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      if (this.state.IsAdd) {
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
        await Axios.post(
          config.urls.EXPENSE_SERVICE + "createExpense",
          expenseDetails
        )
          .then((res) => {
            if (res.data !== null || res.data !== undefined) {
              if (res.data._id !== " " && res.data._id !== undefined) {
                this.setState({
                  SpentBy: "0",
                  userRightData: [],
                  userLeftData: [],
                  ExpenseName: "",
                  Description: "",
                  Category: "",
                  Amount: "0",
                  IsAdd: true,
                  UserButtonValue: "Add Expense",
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
      } else {
        let spentToValue = [];
        if (this.state.userRightData.length > 0) {
          this.state.userRightData.map((data) => {
            spentToValue.push(data.id);
          });
        }
        let expenseDetails = {
          _id: this.state._id,
          spentBy: this.state.SpentBy,
          spentTo: spentToValue,
          expenseName: this.state.ExpenseName,
          expenseDescription: this.state.Description,
          defaultExpense: this.state.isDefaultExpense,
          amount: this.state.Amount,
        };
        await Axios.put(
          config.urls.EXPENSE_SERVICE + "updateExpense",
          expenseDetails
        )
          .then((res) => {
            if (res.data !== null || res.data !== undefined) {
              if (res.data._id !== " " && res.data._id !== undefined) {
                this.setState({
                  SpentBy: "0",
                  userRightData: [],
                  userLeftData: [],
                  ExpenseName: "",
                  Description: "",
                  Category: "",
                  Amount: "0",
                  IsAddUser: false,
                  UserButtonValue: "Add User",
                  IsAdd: true,
                  _id: ""
                });
                toast("Expense updated successfully");
              } else {
                toast("Error in updating the Expense");
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

  defaultExpenseHandler = () => {
    if (this.state.isDefaultExpense === true) {
      this.setState({ isDefaultExpense: false });
    } else {
      this.setState({ isDefaultExpense: true });
    }
  };

  onEditClickHandler = async (data) => {
    let isAuthorised = await isAuthorized();
    if (isAuthorised) {
      await Axios.get(
        config.urls.EXPENSE_SERVICE + "getExpense?_id=" + data._id
      )
        .then((res) => {
          if (res.data !== undefined || res.data !== null) {
            this.setState({
              ExpenseName: res.data.expenseName,
              _id: res.data._id,
              Description: res.data.expenseDescription,
              isDefaultExpense: res.data.defaultExpense,
              SpentBy: res.data.spentBy,
              Amount: res.data.amount,
              IsAddUser: true,
              UserButtonValue: "View Expense",
              IsAdd: false,
            });
            let userLeftDataValue = [];
            let userRightDataValue = [];
            res.data.spentTo.map((data) => {
              this.state.userData.map((user) => {
                if (user.id === data) {
                  let isUserinRightData = false;
                  userRightDataValue.map((s) => {
                    if (s.id === user.id) return (isUserinRightData = true);
                  });
                  if (!isUserinRightData) userRightDataValue.push(user);
                }
              });
            });
            this.setState({
              userRightData: userRightDataValue,
            });
            this.state.userData.map((user) => {
              let isUserinLeftData = false;
              userRightDataValue.map((s) => {
                if (s.id === user.id) return (isUserinLeftData = true);
              });
              if (!isUserinLeftData) {
                userLeftDataValue.push(user);
              }
            });
            this.setState({
              userLeftData: userLeftDataValue,
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
      await Axios.delete(
        config.urls.EXPENSE_SERVICE + "deleteExpense?id=" + data._id
      )
        .then((res) => {
          if (res.data !== null || res.data !== undefined) {
            if (
              res.data.message !== " " &&
              res.data.message !== undefined &&
              res.data.message.toString().toLowerCase() ===
                "deleted successfully"
            ) {
              this.setState({
                IsAddUser: false,
                UserButtonValue: "Add Expense",
                _id: "",
                SpentBy: "",
                userLeftData: [],
                userRightData: [],
                Description: "",
                isDefaultExpense: false,
                ExpenseName: "",
                Amount: "0",
                IsAdd: true,
              });
              this.getExpenses();
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

  addHandler = () => {
    if (!this.state.IsAddUser) {
      this.setState({
        SpentBy: "0",
        userRightData: [],
        userLeftData: [],
        ExpenseName: "",
        Description: "",
        Category: "",
        Amount: "0",
        IsAddUser: true,
        UserButtonValue: "View Expense",
        IsAdd: true,
        _id: ""
      });
      this.getUsers();
    } else {
      this.setState({ IsAddUser: false, UserButtonValue: "Add Expense" });
    }
  };

  render() {
    let formAdd;
    let headerValuesForGrid = [
      "Expense Name",
      "Description",
      "Spent By",
      "Amount",
    ];
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

    let loadedValue;
    if (this.state.IsLoaded) {
      loadedValue = (
        <TableBody
          tableData={this.state.expenseData}
          tableValue="Manage Expense"
          editClicked={(data) => {
            this.onEditClickHandler(data);
          }}
          deleteClicked={(data) => {
            this.onDeleteClickHandler(data);
          }}
        />
      );
    } else {
      loadedValue = <LoadingIndicator />;
    }

    if (this.state.IsAddUser) {
      formAdd = (
        <form role="form">
          <div className="card-body">
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
                <Label value="Spent By" />
                <DropDown
                  classValue="form-control"
                  dropDownData={this.state.spentByUserData}
                  property="User"
                  selectedValue={this.state.SpentBy}
                  changedHandler={(event) => {
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
                  valueInCheck={this.state.isDefaultExpense}
                  changeHandler={(data) => this.defaultExpenseHandler(this)}
                  checkedValue={this.state.isDefaultExpense ? "checked" : ""}
                  labelValue="Is Default Expense"
                />
              </div>
            </div>
            <br></br>
            <Label value="Spent To (Right Side value will be added)" />
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
                </div>
                <div className="card-body table-responsive p-0 CardBodyHeightInGrid">
                  <table className="table table-head-fixed text-nowrap">
                    <TableHeader
                      headerValues={headerValuesForGrid}
                      isActionButtonEnabled="true"
                    />
                    {loadedValue}
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
          <ToastContainer />
          <br></br>
          <section className="content">
            <div className="container-fluid">
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
          </section>
        </div>
      </div>
    );
  }
}

export default ManageExpenses;
