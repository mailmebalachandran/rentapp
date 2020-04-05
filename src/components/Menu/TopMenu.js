import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

class TopMenu extends Component{
    render(){
        return(
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#">
                        <FontAwesomeIcon icon={faBars} /></a>
                    </li>
                </ul>  
            </nav>
        );
    }
}

export default TopMenu;