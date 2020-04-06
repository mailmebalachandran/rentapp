import React, { Component } from "react";

class Textbox extends Component {
  render() {
    return (
      <input
        type={this.props.typeName}
        className={this.props.classValue}
        placeholder={this.props.placeholderName}
        onChange={this.props.changed}
        value={this.props.value}
      ></input>
    );
  }
}

export default Textbox;
