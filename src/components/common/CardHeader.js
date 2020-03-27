import React, { Component } from 'react';

class CardHeader extends Component{
    render(){
        return(
            <div className="card-header">
            <h3 className="card-title">{this.props.headerValue}</h3>
        </div>
        )
    }
}

export default CardHeader;