import React, { Component } from 'react';
import SearchBar from './SearchBar';
import '../App.css';

class PhysicianGridContainer extends Component {
	render() {
		const {
			physicianGridCards,
			gridClass,
			showPhysicianGrid,
			updatePhysicianSearchBox,
			physicianSearchBox
		} = this.props;
		return (
			<div className={gridClass}>
				<SearchBar showPhysicianGrid={showPhysicianGrid} updatePhysicianSearchBox={updatePhysicianSearchBox} />
				<PhysicianGrid physicianCards={physicianGridCards} physicianSearchBox={physicianSearchBox} />
			</div>
		);
	}
}

class PhysicianGrid extends Component {
	render() {
		const { physicianCards, physicianSearchBox } = this.props;

		let obCards = physicianCards.filter((physician) => {
			return physician.props.physician.role === 'OBG';
		});

		let filteredObCards = obCards.filter((card) => {
			return card.props.physician.name.toLowerCase().indexOf(physicianSearchBox) !== -1;
		});

		let anesCards = physicianCards.filter((physician) => {
			return physician.props.physician.role === 'Anes';
		});

		let filteredAnesCards = anesCards.filter((card) => {
			return card.props.physician.name.toLowerCase().indexOf(physicianSearchBox) !== -1;
		});

		let pedsCards = physicianCards.filter((physician) => {
			return physician.props.physician.role === 'Peds';
		});

		let filteredPedsCards = pedsCards.filter((card) => {
			return card.props.physician.name.toLowerCase().indexOf(physicianSearchBox) !== -1;
		});

		return (
			<div className="selectionGrids">
				<h3>Obstetrics</h3>
				<div className="physicianGrid">{filteredObCards}</div>
				<h3>Anesthesia</h3>
				<div className="physicianGrid">{filteredAnesCards}</div>
				<h3>Pediatrics</h3>
				<div className="physicianGrid">{filteredPedsCards}</div>
			</div>
		);
	}
}

export default PhysicianGridContainer;
