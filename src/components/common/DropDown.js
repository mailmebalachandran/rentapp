import React, { Component } from "react";

class DropDown extends Component {
  render() {
    let selectValues = [];
    selectValues.push(<option id="0">Select {this.props.property}</option>)
    if (
      this.props.dropDownData != undefined ||
      this.props.dropDownData != null
    ) {
      this.props.dropDownData.map((data) => {
        selectValues.push(<option value={data.id}>{data.value}</option>);
      });
    }
return (<select className={this.props.classValue} value={this.props.selectedValue} onChange={this.props.changedHandler}>{selectValues}</select>);
  }
}

export default DropDown;
