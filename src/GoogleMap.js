import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };
    
    onMarkerClick = (props, marker, e) =>
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    
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
            >
                <Marker
                onClick={this.onMarkerClick}
                name={'Kenyatta International Convention Centre'}
                />
                    <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                    >
                        <div>
                          <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxN1LlR2Bht1yUqGC673FQfj1bh0y5rT0'
})(MapContainer);




