import React, { Component } from 'react';

import '../App.css';

export default class AppContainerHeader extends Component {
	render() {
		return (
			<div className="appContainer-header">
				<button className="logOutBtn" onClick={() => this.props.logOut()}>
					Logout
				</button>
			</div>
		);
	}
}
