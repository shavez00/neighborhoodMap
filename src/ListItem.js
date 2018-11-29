import React from 'react';

class ListItem extends React.Component {
    render() {
        return (
            <li role="button" className="box" tabIndex="0" onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)} onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>{this.props.data.longname}</li>
        );
    }
}

export default ListItem;