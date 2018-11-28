import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import './App.css';
import axios from 'axios';

import GoogleMap from './GoogleMap';
import Sidebar from './Sidebar';

class NeighborhoodMap extends React.Component { 
    state = {
        venues: [],
        foodType: '',
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }
    
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
    
    updateQuery = (query) => {
        if(query) {
            this.setState({
                foodType: query
            })
            this.getVenues(query);
        } else {
            this.setState({
                foodType: ''
            });
            this.getVenues('tacos');
        }
      
  }
    
    componentDidMount () {
        this.getVenues();
    }
    
    getVenues = (query = 'tacos') => {
        const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
        const parameters = {
            client_id: "K25BCW1JNBKA1IK5YOOWRBBA0N31B41LCCPN1R4T0TBBDAEH",
            client_secret: "4TGBO0KZVF1ORTSER0AO5UZVRIUT2OGE02ITXFPNZJ1JIJGA",
            query: query,
            near: 'Portland, OR',
            v: "20180101"
        }
        
        axios.get(endPoint + new URLSearchParams(parameters))
                .then(response => {
                    this.setState({
                        venues: response.data.response.groups[0].items
                    });
                })
                .catch(error => {
                    console.log("ERROR!! " + error);
                })
    }
    
    render() {
      return (
        <div className="app">
            <Sidebar 
            foodType= {this.state.foodType}
            updateQuery={this.updateQuery}
            venues = { this.state.venues.slice(0,10) }
             onMarkerClick = { this.onMarkerClick }
             onClose = { this.onClose }
             activeMarker = { this.state.activeMarker }
             showingInfoWindow = { this.state.showingInfoWindow }
             selectedPlace = { this.state.selectedPlace }
            />
            {/*<input 
                    type="text" 
                    placeholder="Search for type of food"
                    value={this.state.foodType}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />*/}
            <GoogleMap 
             venues = { this.state.venues.slice(0,10) }
             onMarkerClick = { this.onMarkerClick }
             onClose = { this.onClose }
             activeMarker = { this.state.activeMarker }
             showingInfoWindow = { this.state.showingInfoWindow }
             selectedPlace = { this.state.selectedPlace }
            />
        </div>
      )
    }
}

export default NeighborhoodMap
