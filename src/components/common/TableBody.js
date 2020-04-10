import React, { Component } from "react";
import Button from "./Button";

class TableBody extends Component {
  render() {
    let tableValues = [];
    if(this.props.tableData != null || this.props.tableData !== undefined)
    {
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
                click={() => {this.props.editClicked(data)}}
                value="Edit"
              />
            </td>
            <td>
              <Button
                typeName="button"
                classValue="btn btn-block btn-danger"
                click={() => {this.props.deleteClicked(data)}}
                value="Delete"
              />
            </td>
          </tr>
        );
      });
    }
    return <tbody>{tableValues}</tbody>;
  }
}

export default TableBody;
