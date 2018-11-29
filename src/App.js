import React, {Component} from 'react';
import LocationList from './LocationList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'alllocations': [
               {
                    'name': "¿Por Qué No?",
                    'type': "Mexican Restaurant",
                    'latitude': 45.51209727572414,
                    'longitude': -122.61433943252604,
                    'streetAddress': "4635 SE Hawthorne Blvd"
                },
                {
                    'name': "El Nutri Taco",
                    'type': "Mexican Restaurant",
                    'latitude': 45.559026593114076,
                    'longitude': -122.64325388733518,
                    'streetAddress': "2124 NE Alberta St"
                },
                {
                    'name': "Uno Mas Taquiza",
                    'type': "Mexican Restaurant",
                    'latitude': 45.5228155161896,
                    'longitude': -122.69049808685563,
                    'streetAddress': "1914 W Burnside St"
                },
                {
                    'name': "King Burrito Mexican Food",
                    'type': "Mexican Restaurant",
                    'latitude': 45.5769701,
                    'longitude': -122.6971121,
                    'streetAddress': "2924 N Lombard St"
                },
                {
                    'name': "Stella Taco",
                    'type': "Mexican Restaurant",
                    'latitude': 45.50476385234975,
                    'longitude': -122.63408334581044,
                    'streetAddress': "3060 SE Division St"
                },
                {
                    'name': "Casa del Matador",
                    'type': "Mexican Restaurant",
                    'latitude': 45.533266616749515,
                    'longitude': -122.69858007164554,
                    'streetAddress': "1438 NW 23rd Ave"
                },
                {
                    'name': "Los Gorditos",
                    'type': "Mexican Restaurant",
                    'latitude': 45.52433080115418,
                    'longitude': -122.68068808050818,
                    'streetAddress': "922 NW Davis St"
                },
                {
                    'name': "Cruzroom",
                    'type': "Mexican Restaurant",
                    'latitude': 45.559030305772076,
                    'longitude': -122.64120920870587,
                    'streetAddress': "2338 NE Alberta St"
                },
                {
                    'name': "Santeria",
                    'type': "Mexican Restaurant",
                    'latitude': 45.52252375441655,
                    'longitude': -122.67796380808184,
                    'streetAddress': "703 SW Ankeny St"
                },
                {
                    'name': "Robo Taco",
                    'type': "Mexican Restaurant",
                    'latitude': 45.517259048127535,
                    'longitude': -122.65952411694495,
                    'streetAddress': "607 SE Morrison St"
                }
            ],
            'map': '',
            'infowindow': '',
            'prevmarker': ''
        };

        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

    componentDidMount() {
        window.initMap = this.initMap;
        var message;
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

        var alllocations = [];
        this.state.alllocations.forEach(function (location) {
            var longname = location.name + ' - ' + location.type;
            var marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function () {
                self.openInfoWindow(marker);
            });

            location.longname = longname;
            location.marker = marker;
            location.display = true;
            alllocations.push(location);
        });
        this.setState({
            'alllocations': alllocations
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

                    // Examine the text in the response
                    response.json().then(function (data) {
                        var location_data = data.response.venues[0];
                        var verified = '<b>Verified Location: </b>' + (location_data.verified ? 'Yes' : 'No') + '<br>';
                        var checkinsCount = '<b>Number of CheckIn: </b>' + location_data.stats.checkinsCount + '<br>';
                        var usersCount = '<b>Number of Users: </b>' + location_data.stats.usersCount + '<br>';
                        var tipCount = '<b>Number of Tips: </b>' + location_data.stats.tipCount + '<br>';
                        var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
                        self.state.infowindow.setContent(checkinsCount + usersCount + tipCount + verified + readMore);
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
        console.log(this.state.allocations);
        return (
            <div>
                <LocationList key="100" alllocations={this.state.alllocations} openInfoWindow={this.openInfoWindow}
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