import React, { Component } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class TableBody extends Component {
  render() {
    let tableValues = [];
    if (this.props.tableData != null || this.props.tableData !== undefined) {
      if (this.props.tableValue === "Manage User") {
        this.props.tableData.map((data) => {
          tableValues.push(
            <tr userId={data._id}>
              <td>{data.FirstName + " " + data.LastName}</td>
              <td>{data.EmailId}</td>
              <td>{data.PhoneNumber}</td>
              <td>{data.UserName}</td>
              <td>
                <Button
                  typeName="button"
                  classValue="btn btn-block btn-primary"
                  click={() => {
                    this.props.editClicked(data);
                  }}
                  value="Edit"
                />
              </td>
              <td>
                <Button
                  typeName="button"
                  classValue="btn btn-block btn-danger"
                  click={() => {
                    this.props.deleteClicked(data);
                  }}
                  value="Delete"
                />
              </td>
            </tr>
          );
        });
      } else if (this.props.tableValue === "Manage Expense") {
        this.props.tableData.map((data) => {
          tableValues.push(
            <tr>
              <td>{data.expenseName}</td>
              <td>{data.expenseDescription}</td>
              <td>{data.spentByUserName}</td>
              <td>{data.amount}</td>
              <td>
                <Button
                  typeName="button"
                  classValue="btn btn-block btn-primary"
                  click={() => {
                    this.props.editClicked(data);
                  }}
                  value="Edit"
                />
              </td>
              <td>
                <Button
                  typeName="button"
                  classValue="btn btn-block btn-danger"
                  click={() => {
                    this.props.deleteClicked(data);
                  }}
                  value="Delete"
                />
              </td>
            </tr>
          );
        });
      } else if (this.props.tableValue === "Dashboard") {
        if (this.props.tableData.length > 0) {
          this.props.tableData.map((data) => {
            tableValues.push(
              <tr>
                <td>{data.UserName}</td>
                <td>{data.TotalAmount}</td>
                <td>
                  <a href="#" className="text-muted">
                    <FontAwesomeIcon icon={faSearch} />
                  </a>
                </td>
              </tr>
            );
          });
        }
        else{
          tableValues.push(<tr><td colspan="3">No Data Found</td></tr>)
        }
      }
    }
    return <tbody>{tableValues}</tbody>;
  }
}

export default TableBody;
