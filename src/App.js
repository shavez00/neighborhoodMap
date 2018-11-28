import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import './App.css';
import axios from 'axios';

import GoogleMap from './GoogleMap';

class NeighborhoodMap extends React.Component { 
    state = {
        venues: [],
        foodType: ''
    }
    
    updateQuery = (query) => {
      this.setState({
          foodType: query
      })
      this.getVenues(query);
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
            <input 
                    type="text" 
                    placeholder="Search for type of food"
                    value={this.state.foodType}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
            <GoogleMap 
             venues = { this.state.venues }
            />
        </div>
      )
    }
}

export default NeighborhoodMap
