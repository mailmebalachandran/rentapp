import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GroupIcon extends Component{
    render(){
        return (
                <div className="input-group-append">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={this.props.iconValue} />
                  </div>
                </div>
        );
    }
}

export default GroupIcon;