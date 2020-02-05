import React, { Component } from 'react';
import SearchBarNurse from './SearchBar_Nurse';
import '../App.css';

class NursingGridContainer extends Component {
	render() {
		const { nursingGridCards, gridClass, showNursingGrid, updateNursingSearchBox, nursingSearchBox } = this.props;
		return (
			<div className={gridClass}>
				<SearchBarNurse showNursingGrid={showNursingGrid} updateNursingSearchBox={updateNursingSearchBox} />
				<NursingGrid nursingCards={nursingGridCards} nursingSearchBox={nursingSearchBox} />
			</div>
		);
	}
}

class NursingGrid extends Component {
	render() {
		const { nursingCards, nursingSearchBox } = this.props;

		let filteredNursingCards = nursingCards.filter((card) => {
			return card.props.nurse.name.toLowerCase().indexOf(nursingSearchBox) !== -1;
		});

		return <div className="nurseGrid">{filteredNursingCards}</div>;
	}
}

export default NursingGridContainer;
