import React, { Component } from 'react';
import '../App.css';

class FlyOutMenu extends Component {
	render() {
		let showOrHideMenu;
		const { show, flyOutMenuCards } = this.props;

		showOrHideMenu = show ? 'flyOutMenu show' : 'flyOutMenu';

		return (
			<div className={showOrHideMenu}>
				<div className="flyOutMenu-header">
					<h3>Other Staff</h3>
				</div>
				{flyOutMenuCards}
			</div>
		);
	}
}

export default FlyOutMenu;
