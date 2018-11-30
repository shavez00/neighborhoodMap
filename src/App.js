import React, {Component} from 'react';
import VenueList from './VenueList';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'map': '',
            'infowindow': '',
            'prevmarker': '',
            'venues': []
        };

        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

    componentDidMount() {
        window.initMap = this.initMap;
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDxN1LlR2Bht1yUqGC673FQfj1bh0y5rT0&callback=initMap')
    }

    initMap() {
        var self = this;

        var mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
        var map = new window.google.maps.Map(mapview, {
            center: {lat: 45.5219717, lng: -122.681265},
            zoom: 12,
            mapTypeControl: false
        });

        var InfoWindow = new window.google.maps.InfoWindow({});

        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            self.closeInfoWindow();
        });

        this.setState({
            'map': map,
            'infowindow': InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            self.state.map.setCenter(center);
        });

        window.google.maps.event.addListener(map, 'click', function () {
            self.closeInfoWindow();
        });

        const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
        const parameters = {
            client_id: "K25BCW1JNBKA1IK5YOOWRBBA0N31B41LCCPN1R4T0TBBDAEH",
            client_secret: "4TGBO0KZVF1ORTSER0AO5UZVRIUT2OGE02ITXFPNZJ1JIJGA",
            query: 'tacos',
            near: 'Portland, OR',
            v: "20180101"
        };
        let arrayOfVenueObjects = [];
        let venueObject = {
            name: '',
            address: '',
            lat: '',
            lng: ''
        };
        axios.get(endPoint + new URLSearchParams(parameters))
                .then(response => {
                    response.data.response.groups[0].items
                        .slice(0, 10)
                            .forEach(venues => {
                                const venue = Object.create(venueObject);
                                venue.name = venues.venue.name;
                                venue.address = venues.venue.location.address;
                                venue.lat = venues.venue.location.lat;
                                venue.lng = venues.venue.location.lng;
                                venue.longname = venue.name;
                                venue.marker = new window.google.maps.Marker({
                                    position: new window.google.maps.LatLng(venue.lat, venue.lng),
                                    animation: window.google.maps.Animation.DROP,
                                    map: map
                                });
                                venue.marker.addListener('click', function () {
                                    self.openInfoWindow(venue.marker);
                                });
                                arrayOfVenueObjects.push(venue);
                            });
                            this.setState({
                                venues: arrayOfVenueObjects
                            });
                })
                .catch(error => {
                    console.log("ERROR!! " + error);
                });
    }

    openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'prevmarker': marker
        });
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
    }

    getMarkerInfo(marker) {
        var self = this;
        var clientId = "K25BCW1JNBKA1IK5YOOWRBBA0N31B41LCCPN1R4T0TBBDAEH";
        var clientSecret = "4TGBO0KZVF1ORTSER0AO5UZVRIUT2OGE02ITXFPNZJ1JIJGA";
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20180107&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        self.state.infowindow.setContent("Sorry data can't be loaded");
                        return;
                    }
                    
                    response.json().then(function (data) {
                        var location_data = data.response.venues[0];
                        var venueName = '<b>Restaurant Name: </b>' + location_data.name + '<br>';
                        var venueAddress = '<b>Restaurant Address: </b>' + location_data.location.address + '<br>';
                        var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
                        self.state.infowindow.setContent(venueName + venueAddress + readMore);
                    });
                }
            )
            .catch(function (err) {
                self.state.infowindow.setContent("Sorry data can't be loaded");
            });
    }

    closeInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({
            'prevmarker': ''
        });
        this.state.infowindow.close();
    }

    render() {
        return (
            <div>
                <VenueList role='application' key="100" venues={this.state.venues} openInfoWindow={this.openInfoWindow}
                              closeInfoWindow={this.closeInfoWindow}/>
                <div id="map"></div>
            </div>
        );
    }
}

export default App;

function loadMapJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps can't be loaded");
    };
    ref.parentNode.insertBefore(script, ref);
}