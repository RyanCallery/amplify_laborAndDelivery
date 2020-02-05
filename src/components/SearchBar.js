import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

class SearchBar extends Component {
	state = {
		search: ''
	};

	updateSearch = (e) => {
		const { updatePhysicianSearchBox } = this.props;
		this.setState({ search: e.target.value });
		updatePhysicianSearchBox(e.target.value);
	};

	render() {
		const { showPhysicianGrid } = this.props;
		return (
			<div className="searchBarContainer">
				<div
					className="closeBox"
					onClick={(e) => {
						showPhysicianGrid();
					}}
				>
					X
				</div>

				<input type="text" value={this.state.search} placeholder="Search..." onChange={this.updateSearch} />

				<NavLink to="/addProvider">
					<button>Add Provider</button>
				</NavLink>
			</div>
		);
	}
}

export default SearchBar;
