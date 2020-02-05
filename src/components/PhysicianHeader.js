import React, { Component } from 'react';
import '../App.css';

class PhysicianHeader extends Component {
	render() {
		const { showPhysicianGrid } = this.props;
		return (
			<div data-text="Physicians" className="physicianHeader">
				Physicians
				<div
					className="plusBtn"
					onClick={(e) => {
						showPhysicianGrid();
					}}
				/>
			</div>
		);
	}
}

export default PhysicianHeader;
