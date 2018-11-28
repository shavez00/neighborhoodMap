import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    render() {
        return (
            <Map
            google={this.props.google}
            zoom={13}
            style={mapStyles}
            initialCenter={{
             lat: 45.5233226,
             lng: -122.6798009
            }}
            >
                {this.props.venues
                            .map(myVenue => (
                                <Marker key={ myVenue.venue.id }
                                onClick={this.props.onMarkerClick}
                                name={ myVenue.venue.name }
                                position={{lat: `${ myVenue.venue.location.lat }`, lng: `${ myVenue.venue.location.lng }`}}
                                />
                            ))
                    }
                
                    <InfoWindow
                    marker={this.props.activeMarker}
                    visible={this.props.showingInfoWindow}
                    onClose={this.props.onClose}
                    >
                        <div>
                          <h4>{this.props.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxN1LlR2Bht1yUqGC673FQfj1bh0y5rT0'
})(MapContainer);




