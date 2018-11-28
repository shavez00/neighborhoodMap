import React, { Component } from 'react';
import ListItem from './ListItem';
import { InfoWindow } from 'google-maps-react';

class VenueList extends React.Component { 
    render() {
        return (
                <div className='venues'>
                <ol className ="venueList">
                    {this.props.venues && this.props.venues.map((myVenue, idx) => 
                    <ListItem key={idx} {...myVenue}
                    onMarkerClick = { this.props.onMarkerClick }
                    onClose = { this.props.onClose }
                    activeMarker = { this.props.activeMarker }
                    showingInfoWindow = { this.props.showingInfoWindow }
                    selectedPlace = { this.props.selectedPlace }
                    onClick={this.props.onMarkerClick}
                     />)}
                </ol>
                <InfoWindow
                    marker={this.props.activeMarker}
                    visible={this.props.showingInfoWindow}
                    onClose={this.props.onClose}
                    >
                        <div>
                          <h4>{this.props.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                    </div>
        )
    }
}

export default VenueList
