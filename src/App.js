import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import './App.css';

import MainPage from './MainPage';

class NeighborhoodMap extends React.Component {
    state = {
     
    }
    
    componentDidMount () {

    }
    
    render() {
      return (
        <div className="app">
              <MainPage />
        </div>
      )
    }
}

export default NeighborhoodMap
