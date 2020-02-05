import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateRoom } from '../graphql/mutations';
import { S3Image } from 'aws-amplify-react';
import '../App.css';
const bedIcon = require('../images/bed.svg');

class RoomCard extends Component {
	state = {
		contactNumberClass: 'contactNumber',
		addNewContactNumClass: 'addNewContactNumber',
		newContactNum: '',
		contactNumber: ''
	};

	componentDidMount = () => {
		const { room } = this.props;
		this.setState({ contactNumber: room.contactNumber });
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
			await API.graphql(graphqlOperation(updateRoom, { input }));
		} catch (err) {
			console.log(err);
		}
	};

	selectRoomAndShowNurseGrid = (roomID) => {
		this.props.selectRoom(roomID);
		this.props.showNurseGrid();
	};

	render() {
		const { room } = this.props;
		console.log(`Room: ${room.picture}`);
		return (
			<div className="cardContainer">
				<div className="topDivDisplay roomCard">
					<span>{room.roomNumber}</span>
					<div
						className="minusBtn"
						onClick={() => {
							return null;
						}}
					/>
				</div>
				<div className="nurse-ImageDiv" onClick={() => this.selectRoomAndShowNurseGrid(room.id)}>
					{room.picture ? <S3Image imgKey={room.picture.key} /> : <img src={bedIcon} alt="bed" />}
				</div>
				<div className="providerName">{room.providerName || 'Open'}</div>

				<div className="contactNumberContainer">
					<div className={this.state.contactNumberClass}>
						<div className="phone-small" onClick={(e) => this.changeContactBoxClass(e)} />
						<span>{this.state.contactNumber}</span>
					</div>

					<div className={this.state.addNewContactNumClass}>
						<input
							type="text"
							name="addContactNum"
							value={this.state.newContactNum}
							placeholder="Number"
							onChange={(e) => this.changeContactNumber(e)}
						/>
						<div className="arrowBtn" onClick={(e) => this.updateContactNumber(e, room.id)} />
					</div>
				</div>
			</div>
		);
	}
}

export default RoomCard;
