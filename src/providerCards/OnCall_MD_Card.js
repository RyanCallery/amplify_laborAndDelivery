import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateProvider } from '../graphql/mutations';
import { S3Image } from 'aws-amplify-react';
import '../App.css';

class OnCall_MD_Card extends Component {
	state = {
		contactNumberClass: 'contactNumber',
		addNewContactNumClass: 'addNewContactNumber',
		newContactNum: '',
		contactNumber: ''
	};

	componentDidMount = () => {
		const { provider } = this.props;
		this.setState({ contactNumber: provider.contactNumber });
	};

	changeContactNumber = (e) => {
		e.preventDefault();
		this.setState({ newContactNum: e.target.value });
	};

	changeContactBoxClass = (e) => {
		e.preventDefault();
		this.setState({
			contactNumberClass:
				this.state.contactNumberClass === 'contactNumber' ? 'contactNumber hide' : 'contactNumber',
			addNewContactNumClass:
				this.state.addNewContactNumClass === 'addNewContactNumber'
					? 'addNewContactNumber show'
					: 'addNewContactNumber'
		});
	};

	updateContactNumber = async (e, id) => {
		this.setState({ contactNumber: this.state.newContactNum });
		this.changeContactBoxClass(e);

		try {
			const input = {
				id,
				contactNumber: this.state.newContactNum
			};
			await API.graphql(graphqlOperation(updateProvider, { input }));
		} catch (err) {
			console.log(err);
		}
	};

	removeOnCallProviderFromUIAndFromDB = (provider) => {
		this.props.remove(provider);
	};

	render() {
		const { provider } = this.props;
		return (
			<div className="cardContainer">
				<div className="topDivDisplay onCallCard">
					<span>{provider.role}</span>
					<div
						className="minusBtn"
						onClick={() => {
							this.removeOnCallProviderFromUIAndFromDB(provider);
						}}
					/>
				</div>
				<div className="md-onCall-ImageDiv">
					<S3Image imgKey={provider.picture ? provider.picture.key : null} />
					{/* <img src={provider.downloadUrl} alt={provider.name} /> */}
				</div>
				<div className="providerName">{provider.name}</div>

				<div className="contactNumberContainer">
					<div className="contactNumber-holder">
						<div className={this.state.contactNumberClass}>
							<div className="phone-small" onClick={(e) => this.changeContactBoxClass(e)} />
							<span>{this.state.contactNumber}</span>
						</div>
					</div>

					<div className={this.state.addNewContactNumClass}>
						<input
							type="text"
							name="addContactNum"
							value={this.state.newContactNum}
							placeholder="Number"
							onChange={(e) => this.changeContactNumber(e)}
						/>
						<div className="arrowBtn" onClick={(e) => this.updateContactNumber(e, provider.id)} />
					</div>
				</div>
			</div>
		);
	}
}

export default OnCall_MD_Card;
