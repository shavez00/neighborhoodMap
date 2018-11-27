import React, { Component } from 'react';
import logo from './logo.svg';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './App.css';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxN1LlR2Bht1yUqGC673FQfj1bh0y5rT0'
})(MapContainer);
