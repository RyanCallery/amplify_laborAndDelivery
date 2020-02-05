import React, { Component } from 'react';
import { S3Image } from 'aws-amplify-react';
import '../App.css';

class FlyOutMenuCard extends Component {
	render() {
		const { provider } = this.props;
		return (
			<div className="flyOutMenu-container">
				<div className="flyOutMenu-title">{provider.role}</div>

				<div className="flyOutMenu-flexContainer">
					<div className="flyOutMenu-imageContainer">
						<S3Image imgKey={provider.picture ? provider.picture.key : null} />
						{/* <img src={provider.downloadUrl} alt={provider.name} /> */}
					</div>

					<div className="flyOutMenu-name-contact-flexContainer">
						<div>{provider.name}</div>
						<div style={{ display: 'flex' }}>
							<div className="phone-small" style={{ marginRight: '7px' }} />
							<div>{provider.contactNumber}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FlyOutMenuCard;
