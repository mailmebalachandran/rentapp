import React, { Component } from 'react';
import TopMenu from '../Menu/TopMenu';
import SideMenu from '../Menu/SideMenu';

class DashBoard extends Component{
    render(){
        return(
            <div>
                <TopMenu />
                <SideMenu />
            </div>
        );
    }
}

export default DashBoard;