import React, { Component } from 'react';
import { S3Image } from 'aws-amplify-react';

import '../App.css';

class NurseCard extends Component {
	swichNurseCoveringRoomAndUpdateDB = (nurse, roomID) => {
		this.props.selectNurse(nurse, roomID);
		this.props.hideGrid();
	};

	render() {
		const { nurse, roomID } = this.props;
		return (
			<div className="cardContainer">
				<div
					className="small-ImageDiv"
					onClick={() => {
						this.swichNurseCoveringRoomAndUpdateDB(nurse, roomID);
					}}
				>
					<S3Image imgKey={nurse.picture.key} />
					{/* <img src={nurse.downloadUrl} alt={nurse.name} /> */}
				</div>
				<div className="providerName">{nurse.name}</div>
			</div>
		);
	}
}

export default NurseCard;
