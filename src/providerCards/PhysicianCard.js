import React, { Component } from 'react';
import { S3Image } from 'aws-amplify-react';

import '../App.css';

class PhysicianCard extends Component {
	addPhysicianToCallListAndUpdateDB = (provider) => {
		this.props.addToCall(provider);

		this.props.hideGrid();

		// firestore
		// 	.collection('Provider Refs')
		// 	.doc(provider.id)
		// 	.update({
		// 		onCall: true
		// 	})
		// 	.catch((err) => console.log(err));
	};
	render() {
		const { physician } = this.props;
		return (
			<div className="cardContainer">
				<div
					className="small-ImageDiv"
					onClick={() => {
						this.addPhysicianToCallListAndUpdateDB(physician);
					}}
				>
					<S3Image imgKey={physician.picture.key} />
				</div>
				<div className="providerName">{physician.name}</div>
			</div>
		);
	}
}

export default PhysicianCard;
