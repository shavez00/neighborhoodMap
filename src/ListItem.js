import React, { Component } from 'react';


class ListItem extends React.Component { 
    render() {
        return (
                <li className ="listItem" 
                onClick={this.props.onMarkerClick}
                >
                    {this.props.venue.name}
                </li>
        )
    }
}

export default ListItem
