import React, {Component} from 'react';
import ListItem from './ListItem';

class VenueList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'locations': [],
            'query': '',
            'suggestions': true,
        };

        this.filterLocations = this.filterLocations.bind(this);
        this.toggleSuggestions = this.toggleSuggestions.bind(this);
    }

    filterLocations(event) {
        this.props.closeInfoWindow();
        const {value} = event.target;
        var locations = [];
        this.props.venues.forEach(function (location) {
            if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                location.marker.setVisible(true);
                locations.push(location);
            } else {
                location.marker.setVisible(false);
            }
        });

        this.setState({
            'locations': locations,
            'query': value
        });
    }

    componentWillMount() {
        this.setState({
            'locations': this.props.venues
        });
    }

    toggleSuggestions() {
        this.setState({
            'suggestions': !this.state.suggestions
        });
    }

    render() {
        const venues = (this.state.locations.length === 0) ?  this.props.venues :  this.state.locations;
        var locationlist = venues.map(function (listItem, index) {
            return (
                <ListItem key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem}/>
            );
        }, this);

        return (
            <div className="search">
                <input role="search" aria-labelledby="filter" id="search-field" className="search-field" type="text" placeholder="Filter"
                       value={this.state.query} onChange={this.filterLocations}/>
                <ul>
                    {this.state.suggestions && locationlist}
                </ul>
                <button className="button" onClick={this.toggleSuggestions}>Show/Hide Suggestions</button>
            </div>
        );
    }
}

export default VenueList;