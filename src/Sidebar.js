import React, { Component } from 'react';
import VenueList from './VenueList';

class Sidebar extends React.Component { 
    render() {
      return (
        <div className="sidebar">
            <input 
                    type="text" 
                    placeholder="Search for type of food"
                    value={this.props.foodType}
                    onChange={(event) => this.props.updateQuery(event.target.value)}
                />
            <VenueList 
                venues = { this.props.venues }
                onMarkerClick = { this.props.onMarkerClick }
                onClose = { this.props.onClose }
                activeMarker = { this.props.activeMarker }
                showingInfoWindow = { this.props.showingInfoWindow }
                selectedPlace = { this.props.selectedPlace }
            />
        </div>
      )
    }
}

export default Sidebar


