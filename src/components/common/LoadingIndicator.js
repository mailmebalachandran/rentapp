import React, { Component } from 'react';
import loadingGif from '../../assets/images/loading.gif';

class LoadingIndicator extends Component{
    render(){
        return(
            <div><img src={loadingGif} alt="Loading..." /></div>
        );
    }
}

export default LoadingIndicator;