import React, { Component } from 'react';

class Button extends Component{
        render(){
           return (
                <button type={this.props.typeName} className={this.props.classValue} onClick={this.props.click}>{this.props.value}</button>
           );
        }
}

export default Button;