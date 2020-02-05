import React, { Component } from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createProvider } from '../graphql/mutations';
import aws_exports from '../aws-exports';
import { NavLink } from 'react-router-dom';
import { Fab, TextField, Select, InputLabel, MenuItem, FormControl, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { PhotoPicker } from 'aws-amplify-react';
import '../App.css';

const initialState = {
	name: '',
	providerType: '',
	providerRole: '',
	imagePreview: '',
	image: '',
	isUploading: false
};

const formControlStyle = {
	minWidth: 120
};
export default class AddProviderScreen extends Component {
	state = {
		...initialState
	};

	handleAddNewProvider = async () => {
		try {
			this.setState({ isUploading: true });
			let providerRole = this.state.providerRole;
			const visibility = 'public';
			const providerType =
				providerRole === 'OBG' || providerRole === 'Anes' || providerRole === 'Peds' ? 'physician' : 'nurse';
			this.setState({ providerType });
			const providerName = this.state.name;
			const fileName = `/${visibility}/${providerName}/${this.state.image.name}`;
			const uploadedFile = await Storage.put(fileName, this.state.image.file, {
				contentType: this.state.image.type
			});
			const file = {
				key: uploadedFile.key,
				bucket: aws_exports.aws_user_files_s3_bucket,
				region: aws_exports.aws_project_region
			};
			console.log(`uploaded file: ${uploadedFile.key}`);
			const input = {
				name: this.state.name,
				providerType: this.state.providerType,
				role: this.state.providerRole,
				picture: file,
				onCall: false
			};
			const result = await API.graphql(graphqlOperation(createProvider, { input }));
			console.log('Created product', result);
			this.setState({ ...initialState });
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { name, providerType, imagePreview, isUploading, image, providerRole } = this.state;
		return (
			<div className="addNewProviderScreen">
				<div>
					<NavLink to="/">
						<button style={{ position: 'absolute', top: '10px', right: '15px' }} className="logOutBtn">
							Back
						</button>
					</NavLink>

					{/* class="MuiInputBase-input MuiInput-input" */}

					<div className="loginBox">
						<h2 style={{ color: 'white' }}>Add New Provider</h2>
						<div>
							<form>
								<TextField
									inputProps={{ style: { fontSize: 30 } }}
									label="Name"
									fullWidth
									color="primary"
									value={name}
									onChange={(e) => this.setState({ name: e.target.value })}
								/>
								<br />
								<FormControl style={formControlStyle}>
									<InputLabel>Specialty</InputLabel>
									<Select
										fullWidth
										variant="standard"
										value={providerRole}
										onChange={(e) => this.setState({ providerRole: e.target.value })}
									>
										<MenuItem value={'OBG'}>Obstetrics</MenuItem>
										<MenuItem value={'Anes'}>Anesthesia</MenuItem>
										<MenuItem value={'Peds'}>Pediatrics</MenuItem>
										<MenuItem value={'nurse'}>Nursing</MenuItem>
									</Select>
								</FormControl>
							</form>
							{imagePreview && <img className="image-preview" src={imagePreview} alt="Preview" />}
							<PhotoPicker
								preview="hidden"
								onLoad={(url) => this.setState({ imagePreview: url })}
								onPick={(file) => this.setState({ image: file })}
								theme={{
									formContainer: {
										margin: 0,
										padding: '0.8em'
									},
									photePickerButton: {
										display: 'none'
									}
								}}
							/>

							<Fab color="default" onClick={this.handleAddNewProvider}>
								<AddIcon />
							</Fab>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
