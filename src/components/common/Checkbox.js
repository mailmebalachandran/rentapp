import React, { Component } from "react";

class Checkbox extends Component {
  render() {
    return (
      <div>
        <input
          type="checkbox"
          id={this.props.idValue}
          value={this.props.valueInCheck}
          onChange= {() => this.props.changeHandler(this)}
          checked= {this.props.checkedValue}
        />
        <label for={this.props.idValue}  onChange= {this.props.changeHandler}>
    {this.props.labelValue}
        </label>
      </div>
    );
  }
}

export default Checkbox;