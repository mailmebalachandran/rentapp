import React, { Component } from 'react';

class Label extends Component{
    render(){
        return(
            <label>{this.props.value}</label>
            )
    }
}

export default Label;