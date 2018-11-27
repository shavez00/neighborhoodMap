import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import './App.css';

import GoogleMap from './GoogleMap';

class NeighborhoodMap extends React.Component {
    state = {
     
    }
    
    componentDidMount () {

    }
    
    render() {
      return (
        <div className="app">
              <GoogleMap />
        </div>
      )
    }
}

export default NeighborhoodMap
