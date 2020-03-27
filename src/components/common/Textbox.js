import React, { Component } from 'react';

class Textbox extends Component{
    render(){
        return(
            <input type={this.props.typeName} className={this.props.classValue} placeholder={this.props.placeholderName} onChange={this.props.changed}></input>
        )
    }
}

export default Textbox;