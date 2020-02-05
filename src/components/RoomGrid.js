import React, { Component } from 'react';
import '../App.css';

export default class RoomGrid extends Component {
	render() {
		console.log(`room grid ${this.props.roomCards}`);
		return <div className="roomGrid">{this.props.roomCards}</div>;
	}
}
