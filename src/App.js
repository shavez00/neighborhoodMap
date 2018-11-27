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
        zoom={15}
        style={mapStyles}
        initialCenter={{
         lat: 45.5233226,
         lng: -122.6798009
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxN1LlR2Bht1yUqGC673FQfj1bh0y5rT0'
})(MapContainer);
