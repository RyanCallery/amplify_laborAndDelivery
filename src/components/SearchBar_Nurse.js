import React, { Component } from 'react';
import '../App.css';

class SearchBarNurse extends Component {
	state = {
		search: ''
	};

	updateSearch = (e) => {
		const { updateNursingSearchBox } = this.props;
		this.setState({ search: e.target.value });
		updateNursingSearchBox(e.target.value);
	};

	render() {
		const { showNursingGrid } = this.props;
		return (
			<div className="searchBarContainer">
				<div
					className="closeBox"
					onClick={(e) => {
						showNursingGrid();
					}}
				>
					X
				</div>

				<input type="text" value={this.state.search} placeholder="Search..." onChange={this.updateSearch} />
			</div>
		);
	}
}

export default SearchBarNurse;
