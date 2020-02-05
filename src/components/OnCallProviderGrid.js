import React, { Component } from 'react';
import '../App.css';

class OnCallProviderGrid extends Component {
	render() {
		return <div className="onCallProviderGrid">{this.props.onCall_MD_Cards}</div>;
	}
}

export default OnCallProviderGrid;
