import React, { Component } from 'react';
import '../App.css';

class RoomHeader extends Component {
	render() {
		return (
			<div data-text="Rooms" className="physicianHeader">
				Rooms
				<div className="plusBtn" onClick={this.props.addRoom} />
			</div>
		);
	}
}

export default RoomHeader;
