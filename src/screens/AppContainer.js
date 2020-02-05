import React, { Component } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createRoom, updateRoom, updateProvider } from '../graphql/mutations';
import { listProviders, listRooms } from '../graphql/queries';
import { onCreateRoom, onCreateProvider, onUpdateProvider, onUpdateRoom } from '../graphql/subscriptions';
import AppHeader from '../components/AppContainerHeader';
import PhysicianHeader from '../components/PhysicianHeader';
import MenuBtn from '../components/MenuBtn';
import OnCallProviderGrid from '../components/OnCallProviderGrid';
import RoomHeader from '../components/RoomHeader';
import RoomGrid from '../components/RoomGrid';
import FlyOutMenu from '../components/FlyOutMenu';
import PhysicianGridContainer from '../components/PhysicianGridContainer';
import NursingGridContainer from '../components/NursingGridContainer';
import OnCallMDCard from '../providerCards/OnCall_MD_Card';
import RoomCard from '../providerCards/RoomCard';
import FlyOutMenuCard from '../providerCards/FlyOutMenuCard';
import PhysicianCard from '../providerCards/PhysicianCard';
import NurseCard from '../providerCards/NurseCard';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../App.css';

export const context = React.createContext();
//<context.Provider value={{provider}}> </context.Provider>
//import context <context.Consumer>
//render props
//{(value.provider) => }

class AppContainer extends Component {
	state = {
		allProviders: [],
		onCallProviders: [],
		rooms: [],
		showFlyOutMenu: false,
		physicianGridClass: 'physicianGridContainer',
		nurseGridClass: 'nurseGridContainer',
		roomID: null,
		physicianSearchBox: '',
		nursingSearchBox: '',
		addRoomDialog: false,
		newRoomNumber: ''
	};

	componentDidMount = async () => {
		//get all Providers from DB

		this.getProviders();
		this.createProviderListener = API.graphql(graphqlOperation(onCreateProvider)).subscribe({
			next: (providerData) => {
				const newProvider = providerData.value.data.onCreateProvider;
				const prevProviders = this.state.allProviders.filter((provider) => provider.id !== newProvider.id);
				const updatedProviders = [ newProvider, ...prevProviders ];
				this.setState({ allProviders: updatedProviders });
			}
		});
		console.log(this.createProviderListener);
		this.updateProviderListener();

		try {
			const rooms = await API.graphql(graphqlOperation(listRooms));
			console.log(rooms.data.listRooms.items);
			this.setState({ rooms: sortRooms(rooms.data.listRooms.items) });
		} catch (err) {
			console.log(err);
		}

		this.createRoomListener = API.graphql(graphqlOperation(onCreateRoom)).subscribe({
			next: (roomData) => {
				const newRoom = roomData.value.data.onCreateRoom;
				const prevRooms = this.state.rooms.filter((room) => room.id !== newRoom.id);
				const updatedRooms = [ newRoom, ...prevRooms ];
				this.setState({ rooms: updatedRooms });
			}
		});
		this.updateRoomListener();
	};

	getProviders = async () => {
		try {
			const allProviders = await API.graphql(graphqlOperation(listProviders));
			console.log(allProviders);
			this.setState({ allProviders: allProviders.data.listProviders.items });
		} catch (err) {
			console.log(err);
		}
	};


	updateRoomListener = () => {
		API.graphql(graphqlOperation(onUpdateRoom)).subscribe({
			next: (roomData) => {
				const updatedRoom = roomData.value.data.onUpdateRoom;
				const prevRooms = this.state.rooms.filter((room) => room.id !== updatedRoom.id);
				const updatedRooms = [ updatedRoom, ...prevRooms ];
				this.setState({ rooms: updatedRooms });
			}
		});
	};

	updateProviderListener = () => {
		API.graphql(graphqlOperation(onUpdateProvider)).subscribe({
			next: (providerData) => {
				const updatedProvider = providerData.value.data.onUpdateProvider;
				const prevProviders = this.state.allProviders.filter((provider) => provider.id !== updatedProvider.id);
				const updatedProviders = [ updatedProvider, ...prevProviders ];
				this.setState({ allProviders: updatedProviders });
			}
		});
	};

	componentWillUnmount = () => {
		this.createProviderListener.unsubscribe();
		this.createRoomListener.unsubscribe();
		
	};
	updatePhysicianSearchBox = (value) => {
		this.setState({ physicianSearchBox: value.toLowerCase() });
	};

	updateNursingSearchBox = (value) => {
		this.setState({ nursingSearchBox: value.toLowerCase() });
	};

	removeOnCallPhysician = async (physician) => {
		const { allProviders } = this.state;

		let filterPhysician = allProviders.filter((provider) => {
			return provider.id === physician.id;
		});

		filterPhysician.onCall = false;

		let allProviders_removePhysician = allProviders.filter((provider) => {
			return provider.id !== physician.id;
		});

		this.setState({ allProviders: [ ...allProviders_removePhysician, filterPhysician ] });

		try {
			const input = {
				id: physician.id,
				onCall: false
			};
			await API.graphql(graphqlOperation(updateProvider, { input }));
		} catch (err) {
			console.log(err);
		}
	};

	addPhysicianToCallList = async (physician) => {
		const { allProviders } = this.state;

		let filterPhysician = allProviders.filter((provider) => {
			return provider.id === physician.id;
		});

		filterPhysician.onCall = true;

		let allProviders_removePhysician = allProviders.filter((provider) => {
			return provider.id !== physician.id;
		});

		this.setState({ allProviders: [ ...allProviders_removePhysician, filterPhysician ] });

		try {
			const input = {
				id: physician.id,
				onCall: true
			};
			await API.graphql(graphqlOperation(updateProvider, { input }));
		} catch (err) {
			console.log(err);
		}
	};

	selectRoomID = (roomID) => {
		this.setState({ roomID });
	};

	swtichNurseCoveringRoom = async (nurse, roomID) => {
		const { rooms } = this.state;

		let filterOutRoom = rooms.filter((room) => {
			return room.id === roomID;
		});

		let remainingRooms = rooms.filter((room) => {
			return room.id !== roomID;
		});

		filterOutRoom.name = nurse.name;
		// filterOutRoom.downloadUrl = nurse.downloadUrl;
		// filterOutRoom.provider = nurse;

		this.setState({ rooms: [ ...remainingRooms, filterOutRoom ] });
		try {
			const input = {
				id: roomID,
				providerName: nurse.name,
				picture: nurse.picture
			};
			const result = await API.graphql(graphqlOperation(updateRoom, { input }));
			console.log(`room update result: ${result}`);
		} catch (err) {
			console.log(err);
		}
	};

	createOnCall_MD_Cards = (allProviders) => {
		let onCallProviders = allProviders.filter((provider) => {
			return provider.onCall === true;
		});

		return onCallProviders.map((provider) => {
			return <OnCallMDCard key={provider.id} provider={provider} remove={this.removeOnCallPhysician} />;
		});
	};

	createRoomCards = (rooms) => {
		return rooms.map((room) => {
			return (
				<RoomCard
					key={room.id}
					room={room}
					showNurseGrid={this.showHideNurseGrid}
					selectRoom={this.selectRoomID}
				/>
			);
		});
	};

	createFlyOutMenuCards = (providers) => {
		return providers.map((provider) => {
			return <FlyOutMenuCard key={provider.id} provider={provider} />;
		});
	};

	createPhysicianGridCards = (providers) => {
		let allPhysicians = providers.filter((provider) => {
			return provider.providerType === 'physician';
		});

		return allPhysicians.map((physician) => {
			return (
				<PhysicianCard
					key={physician.id}
					physician={physician}
					addToCall={this.addPhysicianToCallList}
					hideGrid={this.showHidePhysicianGrid}
				/>
			);
		});
	};

	createNursingGridCards = (providers) => {
		let allNurses = providers.filter((provider) => {
			return provider.providerType === 'nurse';
		});

		return allNurses.map((nurse) => {
			return (
				<NurseCard
					key={nurse.id}
					nurse={nurse}
					selectNurse={this.swtichNurseCoveringRoom}
					roomID={this.state.roomID}
					hideGrid={this.showHideNurseGrid}
				/>
			);
		});
	};

	showTheFlyOutMenu = () => {
		this.setState({ showFlyOutMenu: !this.state.showFlyOutMenu });
	};

	showHidePhysicianGrid = () => {
		let currentClass = this.state.physicianGridClass;
		if (currentClass === 'physicianGridContainer show') {
			this.setState({ physicianGridClass: 'physicianGridContainer' });
		} else {
			this.setState({ physicianGridClass: 'physicianGridContainer show' });
		}
	};

	showHideNurseGrid = () => {
		console.log('show nurse');

		let currentClass = this.state.nurseGridClass;
		if (currentClass === 'nurseGridContainer show') {
			this.setState({ nurseGridClass: 'nurseGridContainer' });
		} else {
			this.setState({ nurseGridClass: 'nurseGridContainer show' });
		}
	};

	signInMessage = async (userName, password) => {};

	logOut = async () => {
		try {
			await Auth.signOut();
		} catch (err) {
			console.log(`Error signout: ${err}`);
		}
	};

	openDialog = () => {
		this.setState({ addRoomDialog: true });
	};

	closeDialog = () => {
		this.setState({ addRoomDialog: false, newRoomNumber: '' });
	};

	addNewRoomToDB = async () => {
		try {
			const input = {
				roomNumber: this.state.newRoomNumber
			};
			const result = await API.graphql(graphqlOperation(createRoom, { input }));
			console.info(`created room: id ${result.data.createRoom.id} `);
			this.closeDialog();
		} catch (err) {
			console.log(err);
			this.closeDialog();
		}
	};
	render() {
		console.log(this.state.physicianSearchBox);
		const { allProviders, rooms } = this.state;
		const onCall_MD_Cards = this.createOnCall_MD_Cards(allProviders);
		const roomCards = this.createRoomCards(rooms);
		const flyOutMenuCards = this.createFlyOutMenuCards(allProviders);
		const physicianGridCards = this.createPhysicianGridCards(allProviders);
		const nurseGridCards = this.createNursingGridCards(allProviders);
		return (
			<div className="appContainer">
				<AppHeader logOut={this.logOut} />
				<PhysicianHeader showPhysicianGrid={this.showHidePhysicianGrid} />
				<MenuBtn showFlyOut={this.showTheFlyOutMenu} />
				<OnCallProviderGrid onCall_MD_Cards={onCall_MD_Cards} />
				<RoomHeader addRoom={this.openDialog} />
				<Dialog open={this.state.addRoomDialog} onClose={this.closeDialog}>
					<DialogTitle>Add New Room</DialogTitle>
					<DialogContent>
						<DialogContentText>Add a new room to your labor floor</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Room Number"
							value={this.state.newRoomNumber}
							onChange={(e) => this.setState({ newRoomNumber: e.target.value })}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.addNewRoomToDB} disabled={!this.state.newRoomNumber}>
							Add
						</Button>
						<Button onClick={this.closeDialog}>Cancel</Button>
					</DialogActions>
				</Dialog>
				<RoomGrid roomCards={roomCards} />
				<FlyOutMenu show={this.state.showFlyOutMenu} flyOutMenuCards={flyOutMenuCards} />
				<PhysicianGridContainer
					physicianGridCards={physicianGridCards}
					gridClass={this.state.physicianGridClass}
					showPhysicianGrid={this.showHidePhysicianGrid}
					updatePhysicianSearchBox={this.updatePhysicianSearchBox}
					physicianSearchBox={this.state.physicianSearchBox}
				/>
				<NursingGridContainer
					nursingGridCards={nurseGridCards}
					gridClass={this.state.nurseGridClass}
					showNursingGrid={this.showHideNurseGrid}
					updateNursingSearchBox={this.updateNursingSearchBox}
					nursingSearchBox={this.state.nursingSearchBox}
				/>
			</div>
		);
	}
}

///Sorting function
let sortRooms = (rooms) => {
	let roomStringArray = [];
	let roomNumArray = [];
	for (let i = 0; i < rooms.length; i++) {
		if (isNaN(Number(rooms[i].roomNumber))) {
			roomStringArray.push(rooms[i]);
		} else {
			roomNumArray.push(rooms[i]);
		}
	}
	roomNumArray.sort(function(a, b) {
		var x = Number(a.roomNumber);
		var y = Number(b.roomNumber);

		if (x < y) {
			return -1;
		}
		if (x > y) {
			return 1;
		}
		return 0;
	});

	roomNumArray.map((room) => {
		let roomNum = room.roomNumber;
		let newString = 'Room ' + roomNum;
		room.roomNumber = newString;
	});
	let finalRoomArray = roomStringArray.concat(roomNumArray);
	return finalRoomArray;
};

export default AppContainer;
